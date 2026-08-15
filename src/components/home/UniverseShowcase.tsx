import { universePanels } from '@/data/home'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

export function UniverseShowcase() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-center">Más que un teléfono</p>
        <h2 className="font-display mt-3 text-center text-3xl text-ink-800 sm:text-5xl">
          Distintos productos. Un mismo cuidado.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-center text-sm leading-[1.45] text-ink-500">
          Apple, Alexa, sonido y gaming. Cuatro universos, el mismo inventario y la misma claridad.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {universePanels.map((panel) => (
            <Link
              key={panel.id}
              to={panel.href}
              className="group flex flex-col rounded-[28px] bg-ink-100 px-8 pb-8 pt-9 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_28px_64px_rgba(89,83,80,0.08)]"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-400">
                {panel.kicker}
              </p>
              <h3 className="font-display mt-3 text-[1.65rem] text-ink-800">{panel.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-[1.45] text-ink-500">{panel.body}</p>
              <div className="mt-10 flex aspect-[5/4] items-center justify-center overflow-hidden rounded-[20px] bg-white">
                <img
                  src={panel.image}
                  alt=""
                  className={cn(
                    'max-h-[78%] max-w-[78%] object-contain object-center transition duration-700 group-hover:scale-[1.04]',
                    'zoom' in panel ? panel.zoom : null,
                  )}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
