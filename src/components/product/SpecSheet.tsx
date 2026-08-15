import type { SpecGroup } from '@/data/specSheets'
import { cn } from '@/utils/cn'

interface SpecSheetProps {
  groups: SpecGroup[]
  productName?: string
}

export function SpecSheet({ groups, productName }: SpecSheetProps) {
  if (groups.length === 0) return null

  return (
    <section className="mt-32 pb-8">
      <div className="max-w-[980px]">
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-[56px] sm:leading-none">
          Especificaciones técnicas
        </h2>
        {productName ? <p className="mt-4 text-xl text-ink-300">{productName}</p> : null}

        <div className="mt-16">
          {groups.map((group, index) => (
            <details
              key={group.title}
              open={index === 0}
              className="group border-t border-white/25"
            >
              <summary
                className={cn(
                  'flex cursor-pointer list-none items-center justify-between gap-6 py-7 sm:py-8',
                  'marker:hidden [&::-webkit-details-marker]:hidden',
                )}
              >
                <h3 className="text-[22px] font-semibold tracking-tight text-white sm:text-[28px]">
                  {group.title}
                </h3>
                <span
                  aria-hidden
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-transform duration-200 group-open:rotate-45 sm:size-9"
                >
                  <PlusMark />
                </span>
              </summary>

              <ul className="max-w-xl space-y-2 pb-10 text-[17px] leading-[1.47] text-white sm:pb-12">
                {group.rows.map((row) => (
                  <li key={`${group.title}-${row.label}`}>
                    {formatSpecLine(row.label, row.value)}
                  </li>
                ))}
              </ul>
            </details>
          ))}
          <div className="border-t border-white/25" />
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
