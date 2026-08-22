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

export function parseMoney(value: string): number {
  const digits = value.replace(/[^\d]/g, '')
  if (!digits) return 0
  return Number(digits)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat(appConfig.locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}
