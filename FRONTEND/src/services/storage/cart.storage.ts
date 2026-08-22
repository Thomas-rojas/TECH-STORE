import { STORAGE_KEYS } from '@/constants/storage-keys'
import { localStorageService } from '@/services/storage/local-storage'
import type { CartItem } from '@/types/cart'

export const cartStorage = {
  load(): CartItem[] {
    return localStorageService.read<CartItem[]>(STORAGE_KEYS.cart, [])
  },

  save(items: CartItem[]): void {
    localStorageService.write(STORAGE_KEYS.cart, items)
  },

  clear(): void {
    localStorageService.remove(STORAGE_KEYS.cart)
  },
}
