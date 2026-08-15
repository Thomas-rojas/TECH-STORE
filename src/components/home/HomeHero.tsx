import { BrandCurves } from '@/components/brand/BrandCurves'
import { Button } from '@/components/ui/Button'
import { heroSlides } from '@/data/home'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const INTERVAL_MS = 5600

export function HomeHero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = heroSlides[index]

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [paused, index])

  return (
    <section
      className="relative overflow-hidden bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <BrandCurves className="opacity-70" />
      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-16 lg:pt-32">
        <div className="relative z-10 text-center lg:text-left">
          <p className="eyebrow">ImportCAS · Colombia</p>
          <h1 className="font-display mt-4 max-w-xl text-[2.35rem] text-ink-800 sm:text-6xl lg:text-[4.25rem]">
            Tu acceso directo a la tecnología
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-[1.4] text-ink-500 lg:mx-0">
            Confianza, Claridad y Tranquilidad. Apple con seguridad y variedad — y también Alexa, sonido y
            gaming.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to={ROUTES.catalog}>
              <Button size="lg">Ir al catálogo</Button>
            </Link>
            <Link to="/#mayorista">
              <Button size="lg" variant="outline">
                ¿Eres mayorista?
              </Button>
            </Link>
          </div>
          <div className="relative mt-10 min-h-[4.5rem]">
            {heroSlides.map((item, slideIndex) => {
              const active = slideIndex === index
              return (
                <div
                  key={item.id}
                  className={cn(
                    'absolute inset-x-0 transition duration-700 lg:inset-x-auto lg:max-w-md',
                    active ? 'opacity-100' : 'pointer-events-none opacity-0',
                  )}
                >
                  <p className="font-product text-sm font-semibold text-ink-800">{item.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{item.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[480px] lg:max-w-none">
          <Link
            to={slide.href}
            className="relative block aspect-square overflow-hidden rounded-[36px] bg-ink-100"
          >
            {heroSlides.map((item, slideIndex) => {
              const active = slideIndex === index
              return (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.eyebrow}
                  aria-hidden={active ? undefined : true}
                  className={cn(
                    'absolute inset-0 m-auto h-full w-full object-contain object-center p-10 transition duration-700 ease-out sm:p-14',
                    active ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
                  )}
                />
              )
            })}
          </Link>
          <div className="mt-5 flex items-center justify-center gap-3">
            {heroSlides.map((item, slideIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.eyebrow}
                aria-current={slideIndex === index ? 'true' : undefined}
                onClick={() => setIndex(slideIndex)}
                className={cn(
                  'size-14 overflow-hidden rounded-2xl bg-ink-100 ring-2 transition',
                  slideIndex === index ? 'ring-peri-500' : 'ring-transparent hover:ring-brand-300',
                )}
              >
                <img src={item.image} alt="" className="h-full w-full object-contain p-1.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
