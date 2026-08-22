import type { SpecGroup } from '@/data/specSheets'
import { cn } from '@/utils/cn'

interface SpecSheetProps {
  groups: SpecGroup[]
  productName?: string
}

export function SpecSheet({ groups, productName }: SpecSheetProps) {
  if (groups.length === 0) return null

  return (
    <section className="mt-28 pb-8">
      <div className="max-w-[980px]">
        <h2 className="font-display text-3xl text-ink-800 sm:text-5xl">
          Especificaciones técnicas
        </h2>
        {productName ? <p className="text-subheading mt-3 text-base text-ink-500 sm:text-lg">{productName}</p> : null}

        <div className="mt-12">
          {groups.map((group, index) => (
            <details
              key={group.title}
              open={index === 0}
              className="group border-t border-black/10"
            >
              <summary
                className={cn(
                  'flex cursor-pointer list-none items-center justify-between gap-6 py-6 sm:py-7',
                  'marker:hidden [&::-webkit-details-marker]:hidden',
                )}
              >
                <h3 className="text-heading text-xl text-ink-800 sm:text-2xl">
                  {group.title}
                </h3>
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-black/15 text-ink-800 transition-transform duration-200 group-open:rotate-45 sm:size-9"
                >
                  <PlusMark />
                </span>
              </summary>

              <ul className="max-w-xl space-y-2 pb-9 text-[16px] leading-[1.47] text-ink-500 sm:pb-11">
                {group.rows.map((row) => (
                  <li key={`${group.title}-${row.label}`}>
                    {formatSpecLine(row.label, row.value)}
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </section>
  )
}

function formatSpecLine(label: string, value: string): string {
  if (value === 'Sí' || value === 'No' || value.length <= 8) {
    return `${label}: ${value}`
  }
  if (value.toLowerCase().includes(label.toLowerCase())) {
    return value
  }
  return `${label}: ${value}`
}

function PlusMark() {
  return (
    <svg viewBox="0 0 12 12" className="size-3.5" fill="none">
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}
