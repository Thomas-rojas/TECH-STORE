import { paymentConfig } from '../../../config/payments'
import { env } from '../../../config/env'
import { AppError } from '../../../utils/errors'
import type { PaymentProvider } from '../interfaces/PaymentProvider'
import type { WebhookResult } from '../payment.types'

/**
 * Mercado Pago — Checkout Pro preferences.
 * Docs: https://www.mercadopago.com.co/developers/es/docs/checkout-pro/landing
 *
 * TODO: set MP_ACCESS_TOKEN, MP_PUBLIC_KEY, MP_WEBHOOK_SECRET in BACKEND/.env
 */
export const mercadoPagoProvider: PaymentProvider = {
  id: 'mercado_pago',

  async createPayment(ctx) {
    const { accessToken, configured, mode } = paymentConfig.mercado_pago
    if (!configured) {
      // Dev fallback so the API stays testable without credentials
      return {
        checkoutUrl: `${env.FRONTEND_URL}/checkout?orderId=${ctx.orderId}&provider=mercado_pago&mock=1`,
        externalId: `mp_mock_${ctx.paymentId}`,
        clientPayload: {
          mock: true,
          mode,
          // TODO: replace mock with Preference API response (init_point)
          publicKey: paymentConfig.mercado_pago.publicKey || null,
        },
        raw: { mock: true },
      }
    }

    // TODO: POST https://api.mercadopago.com/checkout/preferences
    // Authorization: Bearer ${accessToken}
    const preferenceBody = {
      external_reference: ctx.orderId,
      notification_url: ctx.notificationUrl,
      back_urls: {
        success: ctx.returnUrl,
        pending: ctx.returnUrl,
        failure: ctx.cancelUrl,
      },
      auto_return: 'approved',
      items: ctx.items.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        currency_id: 'COP',
      })),
      payer: {
        name: ctx.customer.name,
        email: ctx.customer.email,
        phone: { number: ctx.customer.phone },
      },
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferenceBody),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new AppError(502, 'Mercado Pago rechazó la preferencia', text)
    }

    const data = (await response.json()) as {
      id: string
      init_point?: string
      sandbox_init_point?: string
    }

    return {
      checkoutUrl: mode === 'sandbox' ? data.sandbox_init_point ?? data.init_point : data.init_point,
      externalId: data.id,
      clientPayload: { preferenceId: data.id },
      raw: data,
    }
  },

  async checkStatus(externalId) {
    const { accessToken, configured } = paymentConfig.mercado_pago
    if (!configured) {
      return { status: 'pending', externalId, raw: { mock: true } }
    }

    // TODO: refine with Payments API GET /v1/payments/:id when using Checkout API
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${externalId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!response.ok) {
      return { status: 'pending', externalId }
    }
    const data = (await response.json()) as { status?: string }
    const map: Record<string, 'approved' | 'rejected' | 'pending' | 'cancelled' | 'refunded'> = {
      approved: 'approved',
      rejected: 'rejected',
      cancelled: 'cancelled',
      refunded: 'refunded',
      pending: 'pending',
      in_process: 'pending',
    }
    return {
      status: map[data.status ?? 'pending'] ?? 'pending',
      externalId,
      raw: data,
    }
  },

  async handleWebhook(headers, body): Promise<WebhookResult> {
    const secret = paymentConfig.mercado_pago.webhookSecret
    // TODO: validate x-signature according to MP docs when MP_WEBHOOK_SECRET is set
    if (secret) {
      const signature = headers['x-signature']
      if (!signature) {
        throw new AppError(401, 'Webhook Mercado Pago sin firma')
      }
      // TODO: implement HMAC validation with secret + request-id + data.id
    }

    const payload = body as {
      type?: string
      action?: string
      data?: { id?: string }
    }

    if (!payload?.data?.id) {
      return { handled: false, message: 'Evento ignorado' }
    }

    // Status resolved asynchronously via checkStatus in payment.service
    return {
      handled: true,
      status: 'processing',
      message: `mp:${payload.type ?? payload.action ?? 'notify'}:${payload.data.id}`,
    }
  },
}
