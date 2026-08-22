import { BrandCurves } from '@/components/brand/BrandCurves'
import { Reveal } from '@/components/shared/Reveal'
import { exploreItems } from '@/data/home'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

export function CategoryCarousel() {
  return (
    <section className="relative overflow-hidden py-28">
      <BrandCurves className="opacity-80" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-center">Un universo, no una sola marca</p>
          <h2 className="font-display mt-3 text-center text-3xl sm:text-5xl">
            <span className="text-gradient">Explora por categoría</span>
          </h2>
          <p className="text-subheading mx-auto mt-5 max-w-xl text-center text-sm text-ink-500">
            Apple completo —computadores, teléfonos, tablets, AirPods y accesorios— más Alexa, sonido y
            PCs gaming.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {exploreItems.map((item, index) => (
            <li key={item.id}>
              <Reveal delayMs={index * 60}>
                <Link
                  to={item.href}
                  className="group flex flex-col items-center rounded-[28px] bg-surface/70 px-4 pb-6 pt-5 text-center shadow-[0_12px_36px_rgb(96_121_209_/_0.08)] ring-1 ring-brand-300/25 backdrop-blur-sm transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_24px_56px_rgb(102_201_207_/_0.22)] hover:ring-lima/60"
                >
                  <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-brand-100 via-surface to-mint/40">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={cn(
                        'h-[78%] w-[78%] object-center drop-shadow-[0_12px_24px_rgba(35,31,31,0.12)] transition duration-500 group-hover:scale-[1.08]',
                        'cover' in item && item.cover ? 'object-cover' : 'object-contain',
                        item.zoom,
                      )}
                    />
                  </div>
                  <p className="text-subheading mt-4 text-[13px] tracking-wide text-ink-700 transition group-hover:text-peri-600">
                    {item.name}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
