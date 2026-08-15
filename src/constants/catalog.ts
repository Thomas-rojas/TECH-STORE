export const SORT_OPTIONS = {
  featured: 'featured',
  priceAsc: 'price-asc',
  priceDesc: 'price-desc',
  rating: 'rating',
  newest: 'newest',
} as const

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS]

export const SORT_LABELS: Record<SortOption, string> = {
  featured: 'Destacados',
  'price-asc': 'Precio: menor a mayor',
  'price-desc': 'Precio: mayor a menor',
  rating: 'Mejor valorados',
  newest: 'Más recientes',
}

export const DEFAULT_SORT: SortOption = SORT_OPTIONS.featured

export const PRICE_RANGES = [
  { id: 'all', label: 'Todos los precios', min: null, max: null },
  { id: 'lt300', label: 'Menos de $300', min: null, max: 299 },
  { id: '300-800', label: '$300 – $800', min: 300, max: 800 },
  { id: '800-1200', label: '$800 – $1,200', min: 800, max: 1200 },
  { id: 'gt1200', label: 'Más de $1,200', min: 1201, max: null },
] as const

export type PriceRangeId = (typeof PRICE_RANGES)[number]['id']
