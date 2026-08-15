import { trustPillars } from '@/data/home'

export function TrustPillars() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-center">Facilitamos tu acceso a la tecnología del mundo</p>
        <h2 className="font-display mx-auto mt-3 max-w-3xl text-center text-3xl text-ink-800 sm:text-5xl">
          Generamos confianza y crecimiento
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {trustPillars.map((pillar) => (
            <article key={pillar.title} className="rounded-[28px] bg-ink-100 px-8 py-10">
              <h3 className="font-display text-2xl text-ink-800">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-[1.35] text-ink-500">{pillar.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
