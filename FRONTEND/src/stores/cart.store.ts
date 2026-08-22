import { appConfig } from '@/config/app'
import { cartStorage } from '@/services/storage/cart.storage'
import type { CartItem } from '@/types/cart'
import { create } from 'zustand'

interface CartStore {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
}

function persist(items: CartItem[]): CartItem[] {
  cartStorage.save(items)
  return items
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: cartStorage.load(),

  addItem: (productId, quantity = 1) => {
    const current = get().items
    const existing = current.find((item) => item.productId === productId)
    const nextQuantity = Math.min(
      appConfig.cart.maxQuantityPerItem,
      (existing?.quantity ?? 0) + quantity,
    )

    const items = existing
      ? current.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQuantity } : item,
        )
      : [...current, { productId, quantity: nextQuantity }]

    set({ items: persist(items) })
  },

  setQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    const capped = Math.min(appConfig.cart.maxQuantityPerItem, quantity)
    const items = get().items.map((item) =>
      item.productId === productId ? { ...item, quantity: capped } : item,
    )
    set({ items: persist(items) })
  },

  removeItem: (productId) => {
    set({ items: persist(get().items.filter((item) => item.productId !== productId)) })
  },

  clear: () => {
    cartStorage.clear()
    set({ items: [] })
  },
}))
