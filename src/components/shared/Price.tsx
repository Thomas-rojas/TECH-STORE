import { formatCurrency, formatDiscount } from '@/utils/format'
import { cn } from '@/utils/cn'

interface PriceProps {
  price: number
  compareAtPrice?: number
  priceMax?: number
  priceFrom?: boolean
  size?: 'sm' | 'md' | 'lg'
  showSavings?: boolean
}

export function Price({
  price,
  compareAtPrice,
  priceMax,
  priceFrom = false,
  size = 'md',
  showSavings = false,
}: PriceProps) {
  const discount = compareAtPrice ? formatDiscount(price, compareAtPrice) : 0
  const onSale = Boolean(compareAtPrice && discount > 0 && !priceMax)
  const priceClass = size === 'lg' ? 'text-[28px]' : size === 'sm' ? 'text-sm' : 'text-[19px]'
  const display =
    priceMax && priceMax > price
      ? `${formatCurrency(price)} – ${formatCurrency(priceMax)}`
      : formatCurrency(price)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        {priceFrom && !priceMax ? (
          <span className="text-[12px] font-medium text-ink-400">Desde</span>
        ) : null}
        <span
          className={cn(
            'font-product font-semibold',
            onSale ? 'text-offer-gradient' : 'text-ink-800',
            priceClass,
          )}
        >
          {display}
        </span>
        {onSale ? (
          <span className="font-product text-[13px] text-ink-400 line-through">
            {formatCurrency(compareAtPrice!)}
          </span>
        ) : null}
      </div>
      {showSavings && onSale ? (
        <p className="text-offer-gradient text-[12px] font-semibold">
          Ahorras {formatCurrency(compareAtPrice! - price)}
        </p>
      ) : null}
    </div>
  )
}
