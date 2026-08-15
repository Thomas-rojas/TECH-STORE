import type { ProductColor } from '@/data/productStories'
import { cn } from '@/utils/cn'

interface ProductOptionsProps {
  colors: ProductColor[]
  capacities: string[]
  color: string
  capacity: string
  onColorChange: (name: string) => void
  onCapacityChange: (value: string) => void
}

export function ProductOptions({
  colors,
  capacities,
  color,
  capacity,
  onColorChange,
  onCapacityChange,
}: ProductOptionsProps) {
  return (
    <div className="mt-10 space-y-8">
      {colors.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-white">Color</p>
          <p className="mt-1 text-sm text-ink-400">{color}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {colors.map((item) => (
              <button
                key={item.name}
                type="button"
                aria-label={item.name}
                onClick={() => onColorChange(item.name)}
                className={cn(
                  'size-8 rounded-full border-2 transition',
                  color === item.name ? 'border-white' : 'border-transparent',
                )}
                style={{ backgroundColor: item.hex, boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / 0.15)' }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {capacities.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-white">Capacidad</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {capacities.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onCapacityChange(item)}
                className={cn(
                  'rounded-xl border px-3 py-3 text-sm font-medium transition',
                  capacity === item
                    ? 'border-white text-white'
                    : 'border-white/15 text-ink-300 hover:border-white/40',
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
