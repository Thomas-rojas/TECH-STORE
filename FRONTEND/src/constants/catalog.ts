export const SORT_OPTIONS = {
  featured: 'featured',
  rating: 'rating',
  newest: 'newest',
} as const

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

export const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Destacados',
  rating: 'Mejor valorados',
  newest: 'Más recientes',
}

export const DEFAULT_SORT: SortOption = SORT_OPTIONS.featured

export const PRICE_RANGES = [
  { id: 'all', label: 'Todos los precios', min: null, max: null },
  { id: 'lt500', label: 'Hasta $500.000', min: null, max: 500_000 },
  { id: '500-2m', label: '$500.000 – $2.000.000', min: 500_000, max: 2_000_000 },
  { id: '2m-5m', label: '$2.000.000 – $5.000.000', min: 2_000_000, max: 5_000_000 },
  { id: 'gt5m', label: 'Más de $5.000.000', min: 5_000_001, max: null },
] as const

export type PriceRangeId = (typeof PRICE_RANGES)[number]['id']
