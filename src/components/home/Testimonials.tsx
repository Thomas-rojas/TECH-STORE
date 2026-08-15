import { testimonials } from '@/data/home'
import { useEffect, useState } from 'react'

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
    <section className="pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Opiniones
        </h2>

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
                <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-200 sm:text-xl">
                  “{item.quote}”
                </p>
                <p className="mt-8 text-sm font-medium text-white">{item.name}</p>
                <p className="mt-1 text-sm text-ink-400">{item.role}</p>
                <p className="mt-2 text-xs text-ink-500">{item.product}</p>
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
                itemIndex === index ? 'w-6 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
