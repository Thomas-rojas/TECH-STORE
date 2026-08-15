import { appConfig } from '@/config/app'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat(appConfig.locale, {
    style: 'currency',
    currency: appConfig.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDiscount(price: number, compareAtPrice: number): number {
  if (compareAtPrice <= price) return 0
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

export function formatStockLabel(stock: number): string {
  if (stock <= 0) return 'Agotado'
  if (stock <= 5) return `Últimas ${stock} unidades`
  return 'En stock'
}
