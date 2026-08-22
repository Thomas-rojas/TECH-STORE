import { BrandCurves } from '@/components/brand/BrandCurves'
import { isWholesaleApproved } from '@/auth/permissions'
import { Button } from '@/components/ui/Button'
import { IMAGES } from '@/constants/images'
import { ROUTES } from '@/constants/routes'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useUiStore } from '@/stores/ui.store'
import { Link } from 'react-router-dom'

export function WholesaleBanner() {
  const session = useCustomerAuthStore((state) => state.session)
  const openAuth = useUiStore((state) => state.openAuth)
  const approved = isWholesaleApproved(session)

  return (
    <section id="mayorista" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] px-8 py-14 sm:px-12 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-8 lg:px-16 lg:py-16">
          <div className="absolute inset-0 brand-gradient-mint opacity-90" aria-hidden />
          <BrandCurves className="opacity-70" />
          <div className="relative z-10 text-center lg:text-left">
            <p className="inline-flex rounded-full bg-lima px-3 py-1 text-[11px] text-ui uppercase tracking-[0.14em] text-on-brand shadow-[0_0_20px_rgb(223_247_65_/_0.45)]">
              Al por mayor
            </p>
            <h2 className="font-display mt-5 text-3xl text-ink-900 sm:text-5xl">
              Compras al por mayor de tecnología
            </h2>
            <p className="text-subheading mx-auto mt-5 max-w-xl text-base text-ink-700 lg:mx-0">
              Los negocios deben hacerse con solidez, estructura y garantía real. Solicita acceso mayorista
              y, al aprobarte, verás precios especiales y cantidades.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              {approved ? (
                <Link to={ROUTES.wholesale}>
                  <Button size="lg">Ir al panel mayorista</Button>
                </Link>
              ) : session ? (
                <Link to={ROUTES.account}>
                  <Button size="lg">Solicitar acceso mayorista</Button>
                </Link>
              ) : (
                <Button size="lg" onClick={openAuth}>
                  Solicitar acceso mayorista
                </Button>
              )}
            </div>
          </div>

          <div className="relative mx-auto mt-12 flex max-w-md items-center justify-center lg:mt-0 lg:max-w-none">
            <div className="absolute inset-[12%] rounded-full bg-lima/40 blur-3xl" aria-hidden />
            <img
              src={IMAGES.macbookPro}
              alt=""
              className="relative z-10 w-[90%] object-contain drop-shadow-[0_32px_56px_rgba(26,24,22,0.28)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
