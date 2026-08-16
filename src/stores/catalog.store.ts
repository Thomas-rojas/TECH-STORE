import { products as seedProducts } from '@/data/products'
import { localStorageService } from '@/services/storage/local-storage'
import { STORAGE_KEYS } from '@/constants/storage-keys'
import type { Product } from '@/types/product'
import { create } from 'zustand'

interface CatalogStore {
  products: Product[]
  revision: number
  upsert: (product: Product) => void
  remove: (id: string) => void
  setPrice: (id: string, price: number, compareAtPrice?: number | null) => void
  adjustPrices: (ids: string[], percent: number) => void
  restore: () => void
}

function persist(products: Product[]): Product[] {
  localStorageService.write(STORAGE_KEYS.catalog, products)
  return products
}

const STOCK_AVIF = new Set([
  'echo-pop',
  'echo-show-5',
  'echo-show-8',
  'echo-spot',
  'bose-s1',
  'roku',
  'sony-wh',
  'asus-rog',
  'msi-gaming',
  'legion',
])

const STOCK_PNG = new Set(['echo-dot'])
const STOCK_PNG_TO_JPG = new Set(['ipad-mini', 'echo-studio', 'lark', 'laptop-top'])

function restoreImagePath(src: string): string {
  const match = src.match(/\/products\/([^/?]+)\.(png|jpe?g|avif)$/i)
  if (!match) return src
  const name = match[1]
  if (STOCK_AVIF.has(name)) return `/products/${name}.avif`
  if (STOCK_PNG.has(name)) return `/products/${name}.png`
  if (STOCK_PNG_TO_JPG.has(name) && !src.endsWith('.jpg')) return `/products/${name}.jpg`
  return src
}

function isStockProductImage(src: string): boolean {
  return src.startsWith('/products/')
}

function reconcileImages(saved: Product[]): Product[] {
  const seedBySlug = new Map(seedProducts.map((item) => [item.slug, item]))
  return saved.map((item) => {
    const seed = seedBySlug.get(item.slug)
    if (seed && item.images.every(isStockProductImage)) {
      return { ...item, images: [...seed.images] }
    }
    return { ...item, images: item.images.map(restoreImagePath) }
  })
}

function loadProducts(): Product[] {
  const saved = localStorageService.read<Product[] | null>(STORAGE_KEYS.catalog, null)
  if (saved && Array.isArray(saved) && saved.length > 0) {
    return persist(reconcileImages(saved))
  }
  return persist(seedProducts.map((item) => ({ ...item })))
}

export const useCatalogStore = create<CatalogStore>((set, get) => ({
  products: loadProducts(),
  revision: 1,

  upsert: (product) => {
    const current = get().products
    const exists = current.some((item) => item.id === product.id)
    const products = exists
      ? current.map((item) => (item.id === product.id ? product : item))
      : [product, ...current]
    set({ products: persist(products), revision: get().revision + 1 })
  },

  remove: (id) => {
    const products = persist(get().products.filter((item) => item.id !== id))
    set({ products, revision: get().revision + 1 })
  },

  setPrice: (id, price, compareAtPrice) => {
    const products = persist(
      get().products.map((item) => {
        if (item.id !== id) return item
        const next: Product = { ...item, price }
        if (compareAtPrice === null) {
          delete next.compareAtPrice
        } else if (typeof compareAtPrice === 'number') {
          next.compareAtPrice = compareAtPrice
        }
        return next
      }),
    )
    set({ products, revision: get().revision + 1 })
  },

  adjustPrices: (ids, percent) => {
    const idSet = new Set(ids)
    const factor = 1 + percent / 100
    const products = persist(
      get().products.map((item) => {
        if (!idSet.has(item.id)) return item
        const next: Product = {
          ...item,
          price: Math.max(0, Math.round(item.price * factor)),
        }
        if (item.compareAtPrice) {
          next.compareAtPrice = Math.max(0, Math.round(item.compareAtPrice * factor))
        }
        return next
      }),
    )
    set({ products, revision: get().revision + 1 })
  },

  restore: () => {
    set({
      products: persist(seedProducts.map((item) => ({ ...item }))),
      revision: get().revision + 1,
    })
  },
}))
