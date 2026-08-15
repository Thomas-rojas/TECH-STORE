import { formatCurrency, formatDiscount } from '@/utils/format'

interface PriceProps {
  price: number
  compareAtPrice?: number
  size?: 'sm' | 'md' | 'lg'
}

export function Price({ price, compareAtPrice, size = 'md' }: PriceProps) {
  const discount = compareAtPrice ? formatDiscount(price, compareAtPrice) : 0
  const priceClass =
    size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-sm' : 'text-base'

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span className={`tracking-wide text-ink-50 ${priceClass}`}>
        {formatCurrency(price)}
      </span>
      {compareAtPrice && discount > 0 ? (
        <span className="text-sm text-ink-500 line-through">
          {formatCurrency(compareAtPrice)}
        </span>
      ) : null}
    </div>
  )
}
