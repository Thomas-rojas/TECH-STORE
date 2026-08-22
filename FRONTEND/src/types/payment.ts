/** Mirrors BACKEND/src/modules/payments/payment.types.ts */

export type PaymentProviderId = 'mercado_pago' | 'addi' | 'bold'

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'refunded'

export interface PaymentLineItem {
  productId: string
  quantity: number
}

export interface PaymentCustomer {
  name: string
  email: string
  phone: string
  city: string
  address: string
}

export interface CreatePaymentRequest {
  items: PaymentLineItem[]
  customer: PaymentCustomer
  promoCode?: string
  notes?: string
  channel?: 'retail' | 'wholesale'
  expectedTotal?: number
  returnUrl?: string
  cancelUrl?: string
}

export interface CreatePaymentResult {
  orderId: string
  orderNumber: string
  paymentId: string
  provider: PaymentProviderId
  status: PaymentStatus
  amount: number
  currency: string
  checkoutUrl?: string
  clientPayload?: Record<string, unknown>
}

export interface PaymentStatusResult {
  orderId: string
  orderNumber: string
  orderStatus: string
  paymentId: string
  provider: PaymentProviderId
  status: PaymentStatus
  amount: number
  checkoutUrl?: string | null
}
