import { appConfig } from '@/config/app'
import { categories } from '@/data/categories'
import { bestsellerSlugs } from '@/data/home'
import { useCatalogStore } from '@/stores/catalog.store'
import type { SortOption } from '@/constants/catalog'
import type { CatalogFilters, PaginatedResult } from '@/types/catalog'
import type { Product } from '@/types/product'

function catalog(): Product[] {
  return useCatalogStore.getState().products
}

function delay(ms = 180): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function matchesFilters(product: Product, filters: CatalogFilters): boolean {
  const query = filters.query.trim().toLowerCase()
  if (query) {
    const haystack = `${product.name} ${product.brand} ${product.shortDescription}`.toLowerCase()
    if (!haystack.includes(query)) return false
  }

  if (filters.categorySlug) {
    const category = categories.find((item) => item.slug === filters.categorySlug)
    if (!category || product.categoryId !== category.id) return false
  }

  if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
    return false
  }

  if (filters.minPrice !== null && product.price < filters.minPrice) return false
  if (filters.maxPrice !== null && product.price > filters.maxPrice) return false
  if (filters.inStockOnly && product.stock <= 0) return false

  return true
}

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const next = [...items]

  switch (sort) {
    case 'rating':
      return next.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return next.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    default:
      return next.sort((a, b) => Number(b.featured) - Number(a.featured))
  }
}

export const productsService = {
  async list(filters: CatalogFilters): Promise<PaginatedResult<Product>> {
    await delay()
    const filtered = sortProducts(
      catalog().filter((product) => matchesFilters(product, filters)),
      filters.sort,
    )
    const pageSize = appConfig.catalog.pageSize
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
    const page = Math.min(filters.page, pageCount)
    const start = (page - 1) * pageSize

    return {
      items: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
      pageCount,
    }
  },

  async getBySlug(slug: string): Promise<Product | null> {
    await delay()
    return catalog().find((product) => product.slug === slug) ?? null
  },

  async getByIds(ids: string[]): Promise<Product[]> {
    await delay()
    const idSet = new Set(ids)
    return catalog().filter((product) => idSet.has(product.id))
  },

  async getFeatured(limit = 8): Promise<Product[]> {
    await delay()
    const all = catalog()
    const bySlug = new Map(all.map((product) => [product.slug, product]))
    const bestsellers = bestsellerSlugs
      .map((slug) => bySlug.get(slug))
      .filter((product): product is Product => Boolean(product))
    if (bestsellers.length > 0) return bestsellers.slice(0, limit)
    return all.filter((product) => product.featured).slice(0, limit)
  },

  async getRelated(categoryId: string, excludeId: string, limit = 3): Promise<Product[]> {
    await delay(80)
    return catalog()
      .filter((product) => product.categoryId === categoryId && product.id !== excludeId)
      .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
      .slice(0, limit)
  },

  getBrands(): string[] {
    return [...new Set(catalog().map((product) => product.brand))].sort()
  },

  getPriceBounds(): { min: number; max: number } {
    const prices = catalog().map((product) => product.price)
    if (prices.length === 0) return { min: 0, max: 0 }
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  },
}
