import { STORAGE_KEYS } from '@/constants/storage-keys'
import { localStorageService } from '@/services/storage/local-storage'

export const wishlistStorage = {
  load(): string[] {
    return localStorageService.read<string[]>(STORAGE_KEYS.wishlist, [])
  },

  save(productIds: string[]): void {
    localStorageService.write(STORAGE_KEYS.wishlist, productIds)
  },

  clear(): void {
    localStorageService.remove(STORAGE_KEYS.wishlist)
  },
}
