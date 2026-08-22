import { BrandCurves } from '@/components/brand/BrandCurves'
import { Button } from '@/components/ui/Button'
import { heroSlides } from '@/data/home'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const INTERVAL_MS = 5600

export function HomeHero() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [titleShine, setTitleShine] = useState(false)
  const titleRef = useRef<HTMLSpanElement>(null)
  const slide = heroSlides[index]

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || paused) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [paused, index])

  useEffect(() => {
    const node = titleRef.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (canHover) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setTitleShine(true)
        observer.disconnect()
      },
      { threshold: 0.55 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!titleShine) return
    const timer = window.setTimeout(() => setTitleShine(false), 1400)
    return () => window.clearTimeout(timer)
  }, [titleShine])

  return (
    <section
      className="relative overflow-hidden bg-surface"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <BrandCurves />
      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6 lg:pt-28 xl:gap-10">
        <div className="relative z-10 order-2 text-center lg:order-1 lg:text-left">
          <p className="eyebrow">ImportCAS · Colombia</p>
          <h1 className="font-display mt-4 max-w-xl text-[2.45rem] sm:text-5xl lg:text-[4.1rem]">
            <span
              ref={titleRef}
              className={cn('hero-title-shine', titleShine && 'is-shining')}
            >
              Tu acceso directo
              <span className="mt-1 block">a la tecnología</span>
            </span>
          </h1>
          <p className="text-subheading mx-auto mt-5 max-w-md text-base text-ink-500 lg:mx-0">
            Confianza, Claridad y Tranquilidad. Apple con seguridad y variedad — y también Alexa, sonido y
            gaming.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link to={ROUTES.catalog}>
              <Button size="lg">Ir al catálogo</Button>
            </Link>
            <Link to="/#mayorista">
              <Button size="lg" variant="outline">
                ¿Eres mayorista?
              </Button>
            </Link>
          </div>
          <div className="relative mt-10 min-h-[4.75rem]">
            {heroSlides.map((item, slideIndex) => {
              const active = slideIndex === index
              return (
                <div
                  key={item.id}
                  className={cn(
                    'absolute inset-x-0 transition duration-700 lg:inset-x-auto lg:max-w-md',
                    active ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
                  )}
                >
                  <p className="inline-flex rounded-full bg-lima/90 px-3 py-1 text-[11px] text-ui uppercase tracking-[0.12em] text-on-brand shadow-[0_0_18px_rgb(223_247_65_/_0.35)]">
                    {item.eyebrow}
                  </p>
                  <p className="text-subheading mt-3 text-base text-ink-800">{item.title}</p>
                  <p className="text-body mt-1 text-sm text-ink-500">{item.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="relative z-10 order-1 mx-auto w-full max-w-[560px] lg:order-2 lg:max-w-none lg:translate-x-2 lg:-rotate-1">
          <div className="absolute -left-6 top-10 hidden size-24 rounded-full bg-lima/70 blur-[2px] lg:block" aria-hidden />
          <div className="absolute -right-4 bottom-16 hidden size-16 rounded-full bg-peri-500/40 lg:block" aria-hidden />
          <Link
            to={slide.href}
            className="glow-ring relative block aspect-square overflow-hidden rounded-[42px] bg-surface/40 shadow-[0_30px_80px_rgb(96_121_209_/_0.22)] backdrop-blur-sm transition duration-500 hover:scale-[1.02] hover:shadow-[0_36px_90px_rgb(102_201_207_/_0.32)]"
          >
            <div className="product-stage-glow" aria-hidden />
            {heroSlides.map((item, slideIndex) => {
              const active = slideIndex === index
              return (
                <img
                  key={item.id}
                  src={item.image}
                  alt={item.eyebrow}
                  aria-hidden={active ? undefined : true}
                  className={cn(
                    'absolute inset-0 m-auto h-full w-full object-contain object-center p-8 transition duration-700 ease-out sm:p-12',
                    active ? 'scale-100 opacity-100' : 'scale-90 opacity-0',
                  )}
                />
              )
            })}
          </Link>
          <div className="mt-6 flex items-center justify-center gap-3">
            {heroSlides.map((item, slideIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.eyebrow}
                aria-current={slideIndex === index ? 'true' : undefined}
                onClick={() => setIndex(slideIndex)}
                className={cn(
                  'size-14 overflow-hidden rounded-2xl bg-ink-100/80 ring-2 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:scale-105',
                  slideIndex === index
                    ? 'ring-lima shadow-[0_0_20px_rgb(223_247_65_/_0.45)]'
                    : 'ring-transparent hover:ring-brand-400',
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
