import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.controller'
import { cartRouter } from '../modules/cart/cart.controller'
import { ordersRouter } from '../modules/orders/orders.controller'
import { paymentsRouter } from '../modules/payments/payment.controller'
import { categoriesRouter, productsRouter } from '../modules/products/products.controller'
import { usersRouter } from '../modules/users/users.controller'
import { adminRouter } from '../modules/admin/admin.controller'

export const apiRouter = Router()

apiRouter.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'importcas-api', ts: new Date().toISOString() })
})

apiRouter.use('/auth', authRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/categories', categoriesRouter)
apiRouter.use('/cart', cartRouter)
apiRouter.use('/orders', ordersRouter)
apiRouter.use('/payments', paymentsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/admin', adminRouter)
