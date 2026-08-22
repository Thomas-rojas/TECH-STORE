import { Router } from 'express'
import { z } from 'zod'
import { optionalAuth } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import type { PaymentProviderId } from './payment.types'
import * as paymentService from './payment.service'

const providerParam = z.object({
  provider: z.enum(['mercado_pago', 'addi', 'bold']),
})

const createBody = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    city: z.string().min(2),
    address: z.string().min(5),
  }),
  promoCode: z.string().optional(),
  notes: z.string().optional(),
  channel: z.enum(['retail', 'wholesale']).optional(),
  expectedTotal: z.number().int().nonnegative().optional(),
  returnUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
})

export const paymentsRouter = Router()

paymentsRouter.post(
  '/:provider/create',
  optionalAuth,
  validate(providerParam, 'params'),
  validate(createBody),
  async (req, res, next) => {
    try {
      const { provider } = req.params as { provider: PaymentProviderId }
      const result = await paymentService.createPayment(provider, req.body, req.user?.id)
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  },
)

paymentsRouter.post('/:provider/webhook', validate(providerParam, 'params'), async (req, res, next) => {
  try {
    const { provider } = req.params as { provider: PaymentProviderId }
    const result = await paymentService.handleProviderWebhook(provider, req.headers, req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

paymentsRouter.get('/:orderId/status', async (req, res, next) => {
  try {
    const result = await paymentService.getPaymentStatusByOrderId(req.params.orderId)
    res.json(result)
  } catch (error) {
    next(error)
  }
})
