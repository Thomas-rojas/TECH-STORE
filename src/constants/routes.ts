export const ROUTES = {
  home: '/',
  catalog: '/catalogo',
  category: '/catalogo/:categorySlug',
  product: '/producto/:slug',
  cart: '/carrito',
  checkout: '/checkout',
  wishlist: '/favoritos',
  privacy: '/privacidad',
  terms: '/terminos',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export function catalogPath(categorySlug?: string): string {
  if (!categorySlug) return ROUTES.catalog
  return `/catalogo/${categorySlug}`
}

export function productPath(slug: string): string {
  return `/producto/${slug}`
}

export function searchPath(query: string): string {
  const params = new URLSearchParams({ q: query })
  return `${ROUTES.catalog}?${params.toString()}`
}
