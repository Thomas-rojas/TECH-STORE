import { Router } from 'express'
import { requireAuth, requireRoles } from '../../middlewares/auth'
import { getProviderConfig, paymentConfig } from '../../config/payments'
import { listPaymentProviders } from '../payments/payment.registry'
import { supabase } from '../../database/supabase'
import { AppError } from '../../utils/errors'

export const adminRouter = Router()

adminRouter.use(requireAuth, requireRoles('admin'))

adminRouter.get('/dashboard', async (_req, res, next) => {
  try {
    const [orders, products, customers, revenueRows] = await Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }).eq('active', true),
      supabase
        .from('users')
        .select('id', { count: 'exact', head: true })
        .in('role', ['customer', 'wholesale']),
      supabase.from('orders').select('total').neq('status', 'cancelado'),
    ])

    const revenue = (revenueRows.data ?? []).reduce(
      (sum, row) => sum + ((row as { total?: number }).total ?? 0),
      0,
    )

    res.json({
      ordersCount: orders.count ?? 0,
      productsCount: products.count ?? 0,
      customersCount: customers.count ?? 0,
      revenue,
    })
  } catch (error) {
    next(error)
  }
})

adminRouter.get('/payment-providers', (_req, res) => {
  res.json({
    items: listPaymentProviders().map((id) => ({
      id,
      ...getProviderConfig(id),
      hasCredentials: paymentConfig[id].configured,
    })),
  })
})

adminRouter.get('/promotions', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new AppError(500, error.message)
    res.json({ items: data ?? [] })
  } catch (error) {
    next(error)
  }
})
