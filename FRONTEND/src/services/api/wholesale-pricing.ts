import type { Product } from '@/types/product'
import type { WholesaleDiscount, WholesaleQuote } from '@/types/wholesale'

function matches(rule: WholesaleDiscount, product: Product): boolean {
  if (rule.scope === 'all') return true
  if (rule.scope === 'category') return product.categoryId === rule.categoryId
  return product.id === rule.productId
}

function applyRule(retail: number, rule: WholesaleDiscount): number {
  const next =
    rule.type === 'percent' ? Math.round(retail * (1 - rule.value / 100)) : Math.max(0, retail - rule.value)
  return Math.min(retail, Math.max(0, next))
}

function specificity(rule: WholesaleDiscount): number {
  if (rule.scope === 'product') return 3
  if (rule.scope === 'category') return 2
  return 1
}

export function pickWholesaleRule(
  product: Product,
  quantity: number,
  discounts: WholesaleDiscount[],
): WholesaleDiscount | null {
  const eligible = discounts.filter(
    (rule) => rule.active && quantity >= Math.max(1, rule.minQuantity) && matches(rule, product),
  )
  if (eligible.length === 0) return null

  const maxSpec = Math.max(...eligible.map(specificity))
  const pool = eligible.filter((rule) => specificity(rule) === maxSpec)

  return pool.reduce((best, rule) => {
    const bestPrice = applyRule(product.price, best)
    const nextPrice = applyRule(product.price, rule)
    return nextPrice < bestPrice ? rule : best
  })
}

export function quoteWholesale(
  product: Product,
  quantity: number,
  discounts: WholesaleDiscount[],
  prices: Record<string, number> = {},
): WholesaleQuote {
  const qty = Math.max(1, quantity)
  const retail = product.price
  const explicit = prices[product.id]
  const hasExplicit = typeof explicit === 'number' && explicit > 0
  const rule = hasExplicit ? null : pickWholesaleRule(product, qty, discounts)
  const unitPrice = hasExplicit
    ? Math.min(retail, Math.round(explicit))
    : rule
      ? applyRule(retail, rule)
      : retail
  const saved = Math.max(0, (retail - unitPrice) * qty)
  const percent = retail > 0 ? Math.round(((retail - unitPrice) / retail) * 100) : 0

  return {
    retail,
    unitPrice,
    quantity: qty,
    lineTotal: unitPrice * qty,
    saved,
    percent,
    ruleName: hasExplicit ? 'Precio mayorista' : rule?.name,
  }
}
