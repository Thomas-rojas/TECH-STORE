import { exploreItems } from '@/data/home'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

export function CategoryCarousel() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-center">Un universo, no una sola marca</p>
        <h2 className="font-display mt-3 text-center text-3xl text-ink-800 sm:text-5xl">
          Explora por categoría
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-[1.45] text-ink-500">
          Apple completo —computadores, teléfonos, tablets, AirPods y accesorios— más Alexa, sonido y
          PCs gaming.
        </p>

        <ul className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {exploreItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.href}
                className="group flex flex-col items-center rounded-[28px] bg-ink-100 px-4 pb-6 pt-5 text-center transition duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_24px_60px_rgba(89,83,80,0.1)]"
              >
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={cn(
                      'h-[78%] w-[78%] object-center drop-shadow-[0_12px_24px_rgba(35,31,31,0.1)] transition duration-500 group-hover:scale-[1.06]',
                      'cover' in item && item.cover ? 'object-cover' : 'object-contain',
                      item.zoom,
                    )}
                  />
                </div>
                <p className="font-product mt-4 text-[13px] font-semibold tracking-wide text-ink-700 transition group-hover:text-peri-600">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
