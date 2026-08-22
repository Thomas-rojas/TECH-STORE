import { env } from '../../config/env'
import { supabase } from '../../database/supabase'
import { AppError } from '../../utils/errors'
import { getPaymentProvider } from './payment.registry'
import type {
  CreatePaymentRequest,
  CreatePaymentResult,
  PaymentProviderId,
  PaymentStatus,
  PaymentStatusResult,
} from './payment.types'
import type { DbPayment, DbProduct } from '../../types/database'

const PROVIDER_LABEL: Record<PaymentProviderId, string> = {
  mercado_pago: 'Mercado Pago',
  addi: 'Addi',
  bold: 'Bold',
}

function nextOrderNumber() {
  const stamp = Date.now().toString(36).toUpperCase()
  const rand = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, '0')
  return `IC-${stamp}-${rand}`
}

export async function createPayment(
  providerId: PaymentProviderId,
  input: CreatePaymentRequest,
  userId?: string,
): Promise<CreatePaymentResult> {
  if (!input.items?.length) throw new AppError(400, 'El carrito está vacío')

  const productIds = input.items.map((item) => item.productId)
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .in('id', productIds)
    .eq('active', true)
  if (productsError) throw new AppError(500, productsError.message)

  const byId = new Map((products as DbProduct[]).map((product) => [product.id, product]))
  let subtotal = 0
  const linePayload: Array<{
    product_id: string
    name: string
    quantity: number
    unit_price: number
  }> = []

  for (const item of input.items) {
    const product = byId.get(item.productId)
    if (!product) throw new AppError(400, `Producto no encontrado: ${item.productId}`)
    if (item.quantity < 1) throw new AppError(400, 'Cantidad inválida')
    if (product.stock < item.quantity) {
      throw new AppError(400, `Stock insuficiente para ${product.name}`)
    }
    subtotal += product.price * item.quantity
    linePayload.push({
      product_id: product.id,
      name: product.name,
      quantity: item.quantity,
      unit_price: product.price,
    })
  }

  let discount = 0
  if (input.promoCode) {
    const { data: promo } = await supabase
      .from('promotions')
      .select('*')
      .eq('code', input.promoCode.trim().toUpperCase())
      .eq('active', true)
      .maybeSingle()
    if (promo) {
      discount =
        promo.type === 'percent'
          ? Math.round((subtotal * promo.value) / 100)
          : Math.min(subtotal, promo.value)
    }
  }

  const total = Math.max(0, subtotal - discount)
  if (input.expectedTotal != null && input.expectedTotal !== total) {
    throw new AppError(400, 'El total no coincide con el servidor', {
      expectedTotal: input.expectedTotal,
      serverTotal: total,
    })
  }

  const provider = getPaymentProvider(providerId)
  const orderNumber = nextOrderNumber()

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      number: orderNumber,
      user_id: userId ?? null,
      customer_name: input.customer.name,
      customer_email: input.customer.email,
      customer_phone: input.customer.phone,
      customer_city: input.customer.city,
      customer_address: input.customer.address,
      subtotal,
      discount,
      total,
      status: 'nuevo',
      channel: input.channel === 'wholesale' ? 'wholesale' : 'retail',
      payment_provider: providerId,
      payment_method_name: PROVIDER_LABEL[providerId],
      promo_code: input.promoCode?.trim().toUpperCase() || null,
      notes: input.notes ?? '',
    })
    .select('*')
    .single()
  if (orderError || !order) throw new AppError(500, orderError?.message ?? 'No se pudo crear la orden')

  const { error: itemsError } = await supabase.from('order_items').insert(
    linePayload.map((line) => ({ ...line, order_id: order.id })),
  )
  if (itemsError) throw new AppError(500, itemsError.message)

  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      order_id: order.id,
      provider: providerId,
      status: 'pending',
      amount: total,
      currency: 'COP',
    })
    .select('*')
    .single()
  if (paymentError || !payment) {
    throw new AppError(500, paymentError?.message ?? 'No se pudo crear el pago')
  }

  const returnUrl =
    input.returnUrl ?? `${env.FRONTEND_URL}/checkout?orderId=${order.id}&status=return`
  const cancelUrl =
    input.cancelUrl ?? `${env.FRONTEND_URL}/checkout?orderId=${order.id}&status=cancel`
  const notificationUrl = `${env.APP_PUBLIC_URL}/api/payments/${providerId}/webhook`

  const providerResult = await provider.createPayment({
    orderId: order.id,
    orderNumber: order.number,
    paymentId: payment.id,
    amount: total,
    currency: 'COP',
    customer: input.customer,
    items: linePayload.map((line) => ({
      title: line.name,
      quantity: line.quantity,
      unitPrice: line.unit_price,
    })),
    returnUrl,
    cancelUrl,
    notificationUrl,
  })

  const { data: updated, error: updateError } = await supabase
    .from('payments')
    .update({
      status: 'processing',
      external_id: providerResult.externalId ?? null,
      checkout_url: providerResult.checkoutUrl ?? null,
      raw_create_response: providerResult.raw ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', payment.id)
    .select('*')
    .single()
  if (updateError || !updated) throw new AppError(500, updateError?.message ?? 'Pago no actualizado')

  for (const line of linePayload) {
    const product = byId.get(line.product_id)!
    await supabase
      .from('products')
      .update({ stock: product.stock - line.quantity })
      .eq('id', line.product_id)
  }

  return {
    orderId: order.id,
    orderNumber: order.number,
    paymentId: updated.id,
    provider: providerId,
    status: updated.status,
    amount: updated.amount,
    currency: updated.currency,
    checkoutUrl: updated.checkout_url ?? undefined,
    clientPayload: providerResult.clientPayload,
  }
}

export async function getPaymentStatusByOrderId(orderId: string): Promise<PaymentStatusResult> {
  const { data: order } = await supabase.from('orders').select('*').eq('id', orderId).maybeSingle()
  if (!order) throw new AppError(404, 'Orden o pago no encontrado')

  const { data: payments } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: false })
    .limit(1)
  const payment = payments?.[0] as DbPayment | undefined
  if (!payment) throw new AppError(404, 'Orden o pago no encontrado')

  const provider = getPaymentProvider(payment.provider)
  let status = payment.status
  let orderStatus = order.status

  if (payment.external_id && status !== 'approved' && status !== 'rejected') {
    const remote = await provider.checkStatus(payment.external_id)
    if (remote.status !== status) {
      status = remote.status
      await supabase
        .from('payments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', payment.id)
      if (remote.status === 'approved') {
        orderStatus = 'preparando'
        await supabase.from('orders').update({ status: 'preparando' }).eq('id', order.id)
      }
      if (remote.status === 'rejected' || remote.status === 'cancelled') {
        orderStatus = 'cancelado'
        await supabase.from('orders').update({ status: 'cancelado' }).eq('id', order.id)
      }
    }
  }

  return {
    orderId: order.id,
    orderNumber: order.number,
    orderStatus,
    paymentId: payment.id,
    provider: payment.provider,
    status,
    amount: payment.amount,
    checkoutUrl: payment.checkout_url,
  }
}

export async function handleProviderWebhook(
  providerId: PaymentProviderId,
  headers: Record<string, string | string[] | undefined>,
  body: unknown,
) {
  const provider = getPaymentProvider(providerId)
  const result = await provider.handleWebhook(headers, body)
  if (!result.handled) return result

  let payment: DbPayment | null = null

  if (result.paymentId) {
    const { data } = await supabase.from('payments').select('*').eq('id', result.paymentId).maybeSingle()
    payment = data
  }
  if (!payment && result.orderId) {
    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('order_id', result.orderId)
      .eq('provider', providerId)
      .order('created_at', { ascending: false })
      .limit(1)
    payment = data?.[0] ?? null
  }
  if (!payment && result.message) {
    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('external_id', result.message)
      .eq('provider', providerId)
      .maybeSingle()
    payment = data
  }

  if (!payment && typeof result.message === 'string' && result.message.includes(':')) {
    const externalId = result.message.split(':').pop()
    if (externalId) {
      const remote = await provider.checkStatus(externalId)
      const { data } = await supabase
        .from('payments')
        .select('*')
        .eq('external_id', externalId)
        .eq('provider', providerId)
        .maybeSingle()
      payment = data
      if (payment && remote.status) result.status = remote.status
    }
  }

  if (!payment) {
    return { ...result, message: result.message ?? 'Pago no localizado aún' }
  }

  const nextStatus = (result.status ?? payment.status) as PaymentStatus
  await supabase
    .from('payments')
    .update({
      status: nextStatus,
      raw_webhook_payload: body as object,
      ...(result.message && !payment.external_id ? { external_id: result.message } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('id', payment.id)

  if (nextStatus === 'approved') {
    await supabase.from('orders').update({ status: 'preparando' }).eq('id', payment.order_id)
  }
  if (nextStatus === 'rejected' || nextStatus === 'cancelled') {
    await supabase.from('orders').update({ status: 'cancelado' }).eq('id', payment.order_id)
  }

  return {
    ...result,
    paymentId: payment.id,
    orderId: payment.order_id,
    status: nextStatus,
  }
}
