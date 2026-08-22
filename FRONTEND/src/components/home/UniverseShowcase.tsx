import { Reveal } from '@/components/shared/Reveal'
import { universePanels } from '@/data/home'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

export function UniverseShowcase() {
  return (
    <section className="relative overflow-hidden py-24 section-wash">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-center">Más que un teléfono</p>
          <h2 className="font-display mt-3 text-center text-3xl sm:text-5xl">
            <span className="text-gradient">Distintos productos.</span>{' '}
            <span className="text-ink-800">Un mismo cuidado.</span>
          </h2>
          <p className="text-subheading mx-auto mt-5 max-w-lg text-center text-sm text-ink-500">
            Apple, Alexa, sonido y gaming. Cuatro universos, el mismo inventario y la misma claridad.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {universePanels.map((panel, index) => (
            <Reveal key={panel.id} delayMs={index * 80}>
              <Link
                to={panel.href}
                className="group relative flex flex-col overflow-hidden rounded-[32px] bg-surface/80 px-8 pb-8 pt-9 shadow-[0_18px_48px_rgb(90_126_204_/_0.1)] ring-1 ring-brand-300/20 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_28px_64px_rgb(102_201_207_/_0.22)] hover:ring-lima/50"
              >
                <span className="absolute -right-8 -top-8 size-32 rounded-full bg-brand-300/25 blur-2xl transition group-hover:bg-lima/30" aria-hidden />
                <p className="text-meta relative text-[11px] uppercase tracking-[0.16em] text-brand-600">
                  {panel.kicker}
                </p>
                <h3 className="font-display relative mt-3 text-[1.65rem] text-ink-800">{panel.title}</h3>
                <p className="text-body relative mt-2 max-w-sm text-sm text-ink-500">{panel.body}</p>
                <div className="relative mt-10 flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[22px] bg-gradient-to-br from-ink-100 via-surface to-mint/30">
                  <img
                    src={panel.image}
                    alt=""
                    className={cn(
                      'max-h-[78%] max-w-[78%] object-contain object-center transition duration-700 group-hover:scale-[1.06]',
                      'zoom' in panel ? panel.zoom : null,
                    )}
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
