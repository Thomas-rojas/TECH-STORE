import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../../database/supabase'
import { requireAuth, requireRoles } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { AppError } from '../../utils/errors'
import type { DbOrder, DbOrderItem } from '../../types/database'

function mapOrder(order: DbOrder, items: DbOrderItem[]) {
  return {
    id: order.id,
    number: order.number,
    createdAt: order.created_at,
    customer: {
      name: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone,
      city: order.customer_city,
      address: order.customer_address,
    },
    items: items.map((item) => ({
      productId: item.product_id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
    })),
    subtotal: order.subtotal,
    discount: order.discount,
    total: order.total,
    paymentMethodId: order.payment_provider ?? '',
    paymentMethodName: order.payment_method_name,
    status: order.status,
    notes: order.notes,
    promoCode: order.promo_code ?? undefined,
    channel: order.channel,
  }
}

async function withItems(order: DbOrder) {
  const { data: items } = await supabase.from('order_items').select('*').eq('order_id', order.id)
  return mapOrder(order, items ?? [])
}

export const ordersRouter = Router()

ordersRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('created_at', { ascending: false })
    if (error) throw new AppError(500, error.message)
    const items = await Promise.all((orders ?? []).map(withItems))
    res.json({ items })
  } catch (error) {
    next(error)
  }
})

ordersRouter.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const { data: order } = await supabase.from('orders').select('*').eq('id', req.params.id).maybeSingle()
    if (!order) throw new AppError(404, 'Orden no encontrada')
    if (req.user!.role !== 'admin' && order.user_id !== req.user!.id) {
      throw new AppError(403, 'No autorizado')
    }
    res.json({ order: await withItems(order) })
  } catch (error) {
    next(error)
  }
})

ordersRouter.get('/', requireAuth, requireRoles('admin'), async (_req, res, next) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200)
    if (error) throw new AppError(500, error.message)
    const items = await Promise.all((orders ?? []).map(withItems))
    res.json({ items })
  } catch (error) {
    next(error)
  }
})

ordersRouter.patch(
  '/:id/status',
  requireAuth,
  requireRoles('admin'),
  validate(
    z.object({
      status: z.enum(['nuevo', 'preparando', 'enviado', 'entregado', 'cancelado']),
    }),
  ),
  async (req, res, next) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status: req.body.status, updated_at: new Date().toISOString() })
        .eq('id', req.params.id)
        .select('*')
        .single()
      if (error || !data) throw new AppError(404, error?.message ?? 'Orden no encontrada')
      res.json({ order: await withItems(data) })
    } catch (error) {
      next(error)
    }
  },
)
