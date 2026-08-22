import { paymentConfig } from '../../../config/payments'
import { env } from '../../../config/env'
import { AppError } from '../../../utils/errors'
import type { PaymentProvider } from '../interfaces/PaymentProvider'
import type { WebhookResult } from '../payment.types'

/**
 * Addi — buy now, pay later / credit pre-approval.
 * Connects with the site "Pide tu cupo" flow.
 *
 * TODO: set ADDI_API_KEY, ADDI_API_SECRET, ADDI_MERCHANT_ID, ADDI_WEBHOOK_SECRET in BACKEND/.env
 * TODO: confirm exact endpoints with Addi partner docs for Colombia
 */
export const addiProvider: PaymentProvider = {
  id: 'addi',

  async createPayment(ctx) {
    const { configured, baseUrl, apiKey, apiSecret, merchantId, mode } = paymentConfig.addi

    if (!configured) {
      return {
        checkoutUrl: `${env.FRONTEND_URL}/checkout?orderId=${ctx.orderId}&provider=addi&mock=1`,
        externalId: `addi_mock_${ctx.paymentId}`,
        clientPayload: {
          mock: true,
          mode,
          merchantId: merchantId || null,
        },
        raw: { mock: true },
      }
    }

    // TODO: replace path with official Addi create-application / checkout endpoint
    const response = await fetch(`${baseUrl}/v1/online-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
        'X-API-Secret': apiSecret,
      },
      body: JSON.stringify({
        merchantId,
        orderId: ctx.orderId,
        amount: ctx.amount,
        currency: ctx.currency,
        customer: ctx.customer,
        items: ctx.items,
        redirectUrl: ctx.returnUrl,
        webhookUrl: ctx.notificationUrl,
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new AppError(502, 'Addi rechazó la solicitud de crédito', text)
    }

    const data = (await response.json()) as {
      id?: string
      applicationId?: string
      redirectUrl?: string
      checkoutUrl?: string
    }

    return {
      checkoutUrl: data.redirectUrl ?? data.checkoutUrl,
      externalId: data.applicationId ?? data.id,
      clientPayload: { applicationId: data.applicationId ?? data.id },
      raw: data,
    }
  },

  async checkStatus(externalId) {
    const { configured, baseUrl, apiKey, apiSecret } = paymentConfig.addi
    if (!configured) {
      return { status: 'pending', externalId, raw: { mock: true } }
    }

    const response = await fetch(`${baseUrl}/v1/online-applications/${externalId}`, {
      headers: {
        'X-API-Key': apiKey,
        'X-API-Secret': apiSecret,
      },
    })
    if (!response.ok) return { status: 'pending', externalId }
    const data = (await response.json()) as { status?: string }
    const status = String(data.status ?? '').toLowerCase()
    if (['approved', 'accepted', 'confirmed'].includes(status)) {
      return { status: 'approved', externalId, raw: data }
    }
    if (['rejected', 'declined', 'cancelled'].includes(status)) {
      return { status: 'rejected', externalId, raw: data }
    }
    return { status: 'pending', externalId, raw: data }
  },

  async handleWebhook(headers, body): Promise<WebhookResult> {
    const secret = paymentConfig.addi.webhookSecret
    if (secret) {
      const signature = headers['x-addi-signature'] ?? headers['x-signature']
      if (!signature) throw new AppError(401, 'Webhook Addi sin firma')
      // TODO: HMAC verify with ADDI_WEBHOOK_SECRET
    }

    const payload = body as { applicationId?: string; orderId?: string; status?: string }
    const statusRaw = String(payload.status ?? '').toLowerCase()
    const status =
      statusRaw === 'approved' || statusRaw === 'accepted'
        ? 'approved'
        : statusRaw === 'rejected' || statusRaw === 'declined'
          ? 'rejected'
          : 'processing'

    return {
      handled: true,
      status,
      orderId: payload.orderId,
      message: payload.applicationId,
    }
  },
}
