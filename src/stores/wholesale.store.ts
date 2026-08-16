import { STORAGE_KEYS } from '@/constants/storage-keys'
import { localStorageService } from '@/services/storage/local-storage'
import type { WholesaleDiscount } from '@/types/wholesale'
import { uid } from '@/utils/format'
import { create } from 'zustand'

interface WholesalePersisted {
  version: number
  discounts: WholesaleDiscount[]
  prices: Record<string, number>
}

interface WholesaleStore {
  discounts: WholesaleDiscount[]
  prices: Record<string, number>
  upsertDiscount: (rule: WholesaleDiscount) => void
  removeDiscount: (id: string) => void
  setProductPrice: (productId: string, price: number | null) => void
  setProductPrices: (next: Record<string, number>) => void
}

const VERSION = 2

function persist(state: Pick<WholesalePersisted, 'discounts' | 'prices'>): void {
  localStorageService.write(STORAGE_KEYS.wholesale, {
    version: VERSION,
    discounts: state.discounts,
    prices: state.prices,
  } satisfies WholesalePersisted)
}

function load(): Pick<WholesalePersisted, 'discounts' | 'prices'> {
  const saved = localStorageService.read<WholesalePersisted | WholesaleDiscount[] | null>(
    STORAGE_KEYS.wholesale,
    null,
  )
  if (Array.isArray(saved)) return { discounts: saved, prices: {} }
  if (saved && Array.isArray(saved.discounts)) {
    return { discounts: saved.discounts, prices: saved.prices ?? {} }
  }
  return { discounts: [], prices: {} }
}

export function emptyWholesaleDiscount(): WholesaleDiscount {
  return {
    id: uid('wd'),
    name: '',
    type: 'percent',
    value: 10,
    scope: 'all',
    minQuantity: 1,
    active: true,
    note: '',
  }
}

export const useWholesaleStore = create<WholesaleStore>((set, get) => ({
  ...load(),

  upsertDiscount: (rule) => {
    const current = get().discounts
    const exists = current.some((item) => item.id === rule.id)
    const discounts = exists
      ? current.map((item) => (item.id === rule.id ? rule : item))
      : [rule, ...current]
    persist({ discounts, prices: get().prices })
    set({ discounts })
  },

  removeDiscount: (id) => {
    const discounts = get().discounts.filter((item) => item.id !== id)
    persist({ discounts, prices: get().prices })
    set({ discounts })
  },

  setProductPrice: (productId, price) => {
    const prices = { ...get().prices }
    if (price === null || price <= 0) delete prices[productId]
    else prices[productId] = Math.round(price)
    persist({ discounts: get().discounts, prices })
    set({ prices })
  },

  setProductPrices: (next) => {
    persist({ discounts: get().discounts, prices: next })
    set({ prices: next })
  },
}))
