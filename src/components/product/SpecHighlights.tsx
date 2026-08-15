import type { SpecHighlight } from '@/data/specSheets'

interface SpecHighlightsProps {
  items: SpecHighlight[]
}

export function SpecHighlights({ items }: SpecHighlightsProps) {
  if (items.length === 0) return null

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
        Características clave
      </h2>
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <li key={item.label} className="rounded-2xl bg-ink-100 px-5 py-8 text-center">
            <p className="text-2xl font-semibold text-ink-900 sm:text-3xl">{item.value}</p>
            <p className="mt-2 text-sm text-ink-400">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
