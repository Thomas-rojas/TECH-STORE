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
  if (colors.length === 0 && capacities.length === 0) return null

  return (
    <div className="mt-10 space-y-9">
      {colors.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-ink-800">Color</p>
          <p className="mt-1 text-sm text-ink-400">{color}</p>
          <div className="mt-4 flex flex-wrap gap-3.5">
            {colors.map((item) => {
              const selected = color === item.name
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={selected}
                  onClick={() => onColorChange(item.name)}
                  className={cn(
                    'relative size-10 rounded-full transition duration-300 ease-out',
                    'ring-2 ring-offset-2 ring-offset-surface',
                    selected
                      ? 'scale-105 ring-ink-800'
                      : 'ring-transparent hover:scale-105 hover:ring-ink-300',
                  )}
                  style={{
                    backgroundColor: item.hex,
                    boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.12)',
                  }}
                />
              )
            })}
          </div>
        </div>
      ) : null}

      {capacities.length > 0 ? (
        <div>
          <p className="text-sm font-medium text-ink-800">Almacenamiento</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {capacities.map((item) => {
              const selected = capacity === item
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onCapacityChange(item)}
                  className={cn(
                    'rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition duration-300 ease-out',
                    selected
                      ? 'bg-ink-900 text-ink-50 shadow-[0_10px_28px_rgba(35,31,31,0.16)]'
                      : 'bg-ink-100 text-ink-600 hover:bg-ink-200 hover:text-ink-800',
                  )}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
