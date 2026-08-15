import type { Product } from '@/types/product'

export interface CartItem {
  productId: string
  quantity: number
}

export interface CartLine extends CartItem {
  product: Product
}
