import { appConfig } from '@/config/app'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import type { SortOption } from '@/constants/catalog'
import type { CatalogFilters, PaginatedResult } from '@/types/catalog'
import type { Product } from '@/types/product'

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
    case 'price-asc':
      return next.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return next.sort((a, b) => b.price - a.price)
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
      products.filter((product) => matchesFilters(product, filters)),
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
    return products.find((product) => product.slug === slug) ?? null
  },

  async getByIds(ids: string[]): Promise<Product[]> {
    await delay()
    const idSet = new Set(ids)
    return products.filter((product) => idSet.has(product.id))
  },

  async getFeatured(limit = 8): Promise<Product[]> {
    await delay()
    return products.filter((product) => product.featured).slice(0, limit)
  },

  getBrands(): string[] {
    return [...new Set(products.map((product) => product.brand))].sort()
  },

  getPriceBounds(): { min: number; max: number } {
    const prices = products.map((product) => product.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  },
}
