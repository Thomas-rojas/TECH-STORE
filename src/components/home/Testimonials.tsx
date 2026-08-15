import { testimonials } from '@/data/home'
import { useEffect, useState } from 'react'

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-peri-500" aria-label={`${value} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="size-3.5 fill-current" aria-hidden>
          <path d="M10 1.5 12.6 7l6 .5-4.6 4 1.4 5.8L10 14.4 4.6 17.3 6 11.5 1.4 7.5l6-.5L10 1.5Z" />
        </svg>
      ))}
    </span>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length

  useEffect(() => {
    if (paused || total <= 1) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [paused, total])

  return (
    <section className="pb-12 pt-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="eyebrow text-center">Confían en nosotros</p>
        <h2 className="font-display mt-3 text-center text-3xl text-ink-800 sm:text-4xl">
          Más de 300 clientes satisfechos
        </h2>
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-500">
          <Stars value={5} />
          <span className="font-product font-semibold text-ink-800">4.96</span>
          <span>estrellas · testimonios verificados</span>
        </p>

        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {testimonials.map((item) => (
              <article key={item.id} className="w-full shrink-0 px-2 text-center">
                <img
                  src={item.avatar}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="mx-auto size-14 rounded-full object-cover"
                />
                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">
                  “{item.quote}”
                </p>
                <p className="mt-8 text-sm font-medium text-ink-900">{item.name}</p>
                <p className="mt-1 text-sm text-ink-400">{item.role}</p>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {item.verified ? (
                    <span className="rounded-full bg-mint/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-700">
                      Verificado
                    </span>
                  ) : null}
                  <span className="text-xs text-ink-500">{item.product}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Opinión ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
              className={`h-1.5 rounded-full transition-all ${
                itemIndex === index ? 'w-6 bg-peri-500' : 'w-1.5 bg-ink-300 hover:bg-ink-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
