import { brands, homeStats } from '@/data/home'
import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'

function formatStat(value: number, grouped: boolean | undefined, suffix: string): string {
  const number = grouped ? new Intl.NumberFormat('es-ES').format(value) : String(value)
  return `${number}${suffix}`
}

function StatValue({
  target,
  suffix,
  grouped,
  active,
  delay,
}: {
  target: number
  suffix: string
  grouped?: boolean
  active: boolean
  delay: number
}) {
  const value = useCountUp(target, active, 1800, delay)
  return <>{formatStat(value, grouped, suffix)}</>
}

export function StatsBrands() {
  const { ref, inView } = useInView<HTMLElement>(0.35)

  return (
    <section ref={ref} className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {homeStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl text-ink-800 sm:text-4xl">
                <StatValue
                  target={stat.target}
                  suffix={stat.suffix}
                  grouped={stat.grouped}
                  active={inView}
                  delay={index * 140}
                />
              </p>
              <p className="mt-2 text-sm text-ink-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-ink-500">
          {brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
