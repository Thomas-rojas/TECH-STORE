import { wishlistStorage } from '@/services/storage/wishlist.storage'
import { create } from 'zustand'

interface WishlistStore {
  productIds: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
}

function persist(productIds: string[]): string[] {
  wishlistStorage.save(productIds)
  return productIds
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  productIds: wishlistStorage.load(),

  toggle: (productId) => {
    const current = get().productIds
    const productIds = current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]
    set({ productIds: persist(productIds) })
  },

  has: (productId) => get().productIds.includes(productId),
}))
