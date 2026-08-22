import type {
  CreatePaymentRequest,
  CreatePaymentResult,
  PaymentProviderId,
  PaymentStatus,
  WebhookResult,
} from '../payment.types'

export interface ProviderCreateContext {
  orderId: string
  orderNumber: string
  paymentId: string
  amount: number
  currency: string
  customer: CreatePaymentRequest['customer']
  items: Array<{ title: string; quantity: number; unitPrice: number }>
  returnUrl: string
  cancelUrl: string
  notificationUrl: string
}

export interface ProviderStatusResult {
  status: PaymentStatus
  externalId?: string
  raw?: unknown
}

/**
 * Strategy interface shared by Mercado Pago, Addi and Bold.
 * Add a fourth gateway by implementing this interface and registering it in the registry.
 */
export interface PaymentProvider {
  readonly id: PaymentProviderId
  createPayment(ctx: ProviderCreateContext): Promise<{
    checkoutUrl?: string
    externalId?: string
    clientPayload?: Record<string, unknown>
    raw?: unknown
  }>
  checkStatus(externalId: string): Promise<ProviderStatusResult>
  /**
   * Validate webhook authenticity (signature / secret) and map to internal status.
   * Must throw AppError(401/400) if the webhook is not authentic.
   */
  handleWebhook(
    headers: Record<string, string | string[] | undefined>,
    body: unknown,
  ): Promise<WebhookResult>
}

export type { CreatePaymentResult }
