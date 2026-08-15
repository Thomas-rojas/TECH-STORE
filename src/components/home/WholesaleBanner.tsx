import { Button } from '@/components/ui/Button'
import { appConfig } from '@/config/app'

export function WholesaleBanner() {
  return (
    <section id="mayorista" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-ink-800 px-8 py-16 text-center text-white sm:px-16">
          <p className="text-sm font-medium text-brand-300">Al por mayor</p>
          <h2 className="font-display mt-4 text-3xl sm:text-5xl">Compras al por mayor de tecnología</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.35] text-white/70">
            Los negocios deben hacerse con solidez, estructura y garantía real. Queremos que nuestros
            clientes crezcan con confianza.
          </p>
          <div className="mt-8">
            <a href={`mailto:${appConfig.supportEmail}?subject=Compra%20mayorista%20ImportCAS`}>
              <Button size="lg">Contáctanos</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
