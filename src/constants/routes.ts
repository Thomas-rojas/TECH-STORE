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
  admin: '/admin',
  adminLogin: '/admin/entrar',
  adminProducts: '/admin/productos',
  adminPrices: '/admin/precios',
  adminPromos: '/admin/promociones',
  adminOrders: '/admin/pedidos',
  adminCustomers: '/admin/clientes',
  adminPayments: '/admin/pagos',
  adminCash: '/admin/efectivo',
  adminPassword: '/admin/clave',
  adminWholesale: '/admin/mayorista',
  account: '/cuenta',
  wholesale: '/mayorista',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

export function catalogPath(categorySlug?: string): string {
  if (!categorySlug) return ROUTES.catalog
  return `/catalogo/${categorySlug}`
}

export function catalogBrandPath(categorySlug: string, brand?: string): string {
  const path = catalogPath(categorySlug)
  if (!brand) return path
  return `${path}?marca=${encodeURIComponent(brand)}`
}

export function productPath(slug: string): string {
  return `/producto/${slug}`
}

export function searchPath(query: string): string {
  const params = new URLSearchParams({ q: query })
  return `${ROUTES.catalog}?${params.toString()}`
}
