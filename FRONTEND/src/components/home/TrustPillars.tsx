import { Reveal } from '@/components/shared/Reveal'
import { trustPillars } from '@/data/home'

export function TrustPillars() {
  return (
    <section className="relative overflow-hidden py-24 section-wash">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-center">Facilitamos tu acceso a la tecnología del mundo</p>
          <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl sm:text-5xl">
            <span className="text-gradient">Generamos confianza</span>{' '}
            <span className="text-ink-800">y crecimiento</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {trustPillars.map((pillar, index) => (
            <Reveal key={pillar.title} delayMs={index * 90}>
              <article className="rounded-[28px] bg-surface/80 px-8 py-10 shadow-[0_16px_40px_rgb(96_121_209_/_0.1)] ring-1 ring-brand-300/25 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_56px_rgb(102_201_207_/_0.2)] hover:ring-lima/50">
                <div className="mb-5 size-3 rounded-full bg-lima shadow-[0_0_16px_rgb(223_247_65_/_0.6)]" aria-hidden />
                <h3 className="font-display text-2xl text-ink-800">{pillar.title}</h3>
                <p className="text-body mt-4 text-sm text-ink-500">{pillar.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
