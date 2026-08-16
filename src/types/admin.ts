export type OrderStatus = 'nuevo' | 'preparando' | 'enviado' | 'entregado' | 'cancelado'

export type CashRequestStatus = 'pendiente' | 'aprobada' | 'rechazada'

export type PromoType = 'percent' | 'fixed'

export type PromoScope = 'all' | 'category' | 'product'

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  unitPrice: number
}

export interface OrderCustomer {
  name: string
  email: string
  phone: string
  city: string
  address: string
}

export interface StoreOrder {
  id: string
  number: string
  createdAt: string
  customer: OrderCustomer
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  paymentMethodId: string
  paymentMethodName: string
  status: OrderStatus
  notes: string
  promoCode?: string
  cashRequestId?: string
  channel?: 'retail' | 'wholesale'
}

export interface StoreCustomer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  notes: string
  createdAt: string
  orderCount: number
  totalSpent: number
}

export interface Promotion {
  id: string
  name: string
  code: string
  type: PromoType
  value: number
  scope: PromoScope
  categoryId?: string
  productId?: string
  active: boolean
  requiresCode: boolean
  note: string
}

export interface PaymentMethod {
  id: string
  name: string
  enabled: boolean
  instructions: string
  cashDiscountPercent: number
}

export interface CashDiscountRequest {
  id: string
  createdAt: string
  customerName: string
  email: string
  phone: string
  orderId?: string
  orderNumber?: string
  orderTotal: number
  requestedPercent: number
  message: string
  status: CashRequestStatus
  adminNote: string
  decidedAt?: string
}

export interface CheckoutPayload {
  customer: OrderCustomer
  paymentMethodId: string
  promoCode?: string
  notes?: string
  requestCashDiscount?: boolean
  cashDiscountPercent?: number
  cashMessage?: string
  channel?: 'retail' | 'wholesale'
}
