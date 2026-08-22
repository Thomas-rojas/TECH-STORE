import { env } from './env'
import type { PaymentProviderId } from '../modules/payments/payment.types'

export interface ProviderConfig {
  configured: boolean
  mode: 'sandbox' | 'production'
}

export const paymentConfig = {
  mercado_pago: {
    accessToken: env.MP_ACCESS_TOKEN,
    publicKey: env.MP_PUBLIC_KEY,
    webhookSecret: env.MP_WEBHOOK_SECRET,
    mode: env.MP_MODE,
    get configured() {
      return Boolean(env.MP_ACCESS_TOKEN)
    },
  },
  addi: {
    apiKey: env.ADDI_API_KEY,
    apiSecret: env.ADDI_API_SECRET,
    merchantId: env.ADDI_MERCHANT_ID,
    webhookSecret: env.ADDI_WEBHOOK_SECRET,
    baseUrl: env.ADDI_BASE_URL,
    mode: env.ADDI_MODE,
    get configured() {
      return Boolean(env.ADDI_API_KEY && env.ADDI_API_SECRET)
    },
  },
  bold: {
    apiKey: env.BOLD_API_KEY,
    secretKey: env.BOLD_SECRET_KEY,
    webhookSecret: env.BOLD_WEBHOOK_SECRET,
    baseUrl: env.BOLD_BASE_URL,
    mode: env.BOLD_MODE,
    get configured() {
      return Boolean(env.BOLD_API_KEY && env.BOLD_SECRET_KEY)
    },
  },
} as const

export function getProviderConfig(provider: PaymentProviderId): ProviderConfig {
  const cfg = paymentConfig[provider]
  return { configured: cfg.configured, mode: cfg.mode }
}
