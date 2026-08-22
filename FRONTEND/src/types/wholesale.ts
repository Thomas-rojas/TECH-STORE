import type { PromoScope, PromoType } from '@/types/admin'

export interface WholesaleDiscount {
  id: string
  name: string
  type: PromoType
  value: number
  scope: PromoScope
  categoryId?: string
  productId?: string
  minQuantity: number
  active: boolean
  note: string
}

export interface WholesaleQuote {
  retail: number
  unitPrice: number
  quantity: number
  lineTotal: number
  saved: number
  percent: number
  ruleName?: string
}
