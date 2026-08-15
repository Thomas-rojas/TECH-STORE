import type { SortOption } from '@/constants/catalog'

export interface CatalogFilters {
  query: string
  categorySlug: string | null
  brands: string[]
  minPrice: number | null
  maxPrice: number | null
  inStockOnly: boolean
  sort: SortOption
  page: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export const DEFAULT_CATALOG_FILTERS: CatalogFilters = {
  query: '',
  categorySlug: null,
  brands: [],
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  sort: 'featured',
  page: 1,
}
