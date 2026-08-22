import { paymentConfig } from '../../../config/payments'
import { env } from '../../../config/env'
import { AppError } from '../../../utils/errors'
import type { PaymentProvider } from '../interfaces/PaymentProvider'
import type { WebhookResult } from '../payment.types'

/**
 * Bold — payment link / button.
 * Docs: https://developers.bold.co
 *
 * TODO: set BOLD_API_KEY, BOLD_SECRET_KEY, BOLD_WEBHOOK_SECRET in BACKEND/.env
 */
export const boldProvider: PaymentProvider = {
  id: 'bold',

  async createPayment(ctx) {
    const { configured, baseUrl, apiKey, secretKey, mode } = paymentConfig.bold

    if (!configured) {
      return {
        checkoutUrl: `${env.FRONTEND_URL}/checkout?orderId=${ctx.orderId}&provider=bold&mock=1`,
        externalId: `bold_mock_${ctx.paymentId}`,
        clientPayload: {
          mock: true,
          mode,
          // TODO: return Bold payment link / widget payload
        },
        raw: { mock: true },
      }
    }

    // TODO: confirm Bold payments/links endpoint path for Colombia
    const response = await fetch(`${baseUrl}/online/link/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `x-api-key ${apiKey}`,
        'x-api-secret': secretKey,
      },
      body: JSON.stringify({
        amount_type: 'CLOSE',
        amount: {
          total_amount: ctx.amount,
          currency: ctx.currency,
        },
        description: `Pedido ${ctx.orderNumber}`,
        reference: ctx.orderId,
        callback_url: ctx.returnUrl,
        notification_url: ctx.notificationUrl,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new AppError(502, 'Bold rechazó el link de pago', text)
    }

    const data = (await response.json()) as {
      payload?: { payment_id?: string; url?: string }
      payment_id?: string
      url?: string
    }

    const externalId = data.payload?.payment_id ?? data.payment_id
    const checkoutUrl = data.payload?.url ?? data.url

    return {
      checkoutUrl,
      externalId,
      clientPayload: { paymentId: externalId },
      raw: data,
    }
  },

  async checkStatus(externalId) {
    const { configured, baseUrl, apiKey, secretKey } = paymentConfig.bold
    if (!configured) {
      return { status: 'pending', externalId, raw: { mock: true } }
    }

    // TODO: official Bold payment status endpoint
    const response = await fetch(`${baseUrl}/online/payment/v1/${externalId}`, {
      headers: {
        Authorization: `x-api-key ${apiKey}`,
        'x-api-secret': secretKey,
      },
    })
    if (!response.ok) return { status: 'pending', externalId }
    const data = (await response.json()) as { status?: string; payload?: { status?: string } }
    const status = String(data.payload?.status ?? data.status ?? '').toLowerCase()
    if (['approved', 'sale_complete', 'paid'].includes(status)) {
      return { status: 'approved', externalId, raw: data }
    }
    if (['rejected', 'failed', 'cancelled'].includes(status)) {
      return { status: 'rejected', externalId, raw: data }
    }
    return { status: 'pending', externalId, raw: data }
  },

  async handleWebhook(headers, body): Promise<WebhookResult> {
    const secret = paymentConfig.bold.webhookSecret
    if (secret) {
      const signature = headers['x-bold-signature'] ?? headers['x-signature']
      if (!signature) throw new AppError(401, 'Webhook Bold sin firma')
      // TODO: HMAC verify with BOLD_WEBHOOK_SECRET
    }

    const payload = body as {
      reference?: string
      payment_id?: string
      status?: string
      payload?: { status?: string; reference?: string }
    }
    const statusRaw = String(payload.payload?.status ?? payload.status ?? '').toLowerCase()
    const status =
      ['approved', 'sale_complete', 'paid'].includes(statusRaw)
        ? 'approved'
        : ['rejected', 'failed', 'cancelled'].includes(statusRaw)
          ? 'rejected'
          : 'processing'

    return {
      handled: true,
      status,
      orderId: payload.reference ?? payload.payload?.reference,
      message: payload.payment_id,
    }
  },
}
