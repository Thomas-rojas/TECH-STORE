import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { HEADER_LINKS } from '@/constants/nav'
import { ROUTES } from '@/constants/routes'
import { useUiStore } from '@/stores/ui.store'
import { Link } from 'react-router-dom'

export function MobileNav() {
  const open = useUiStore((state) => state.isMobileNavOpen)
  const close = useUiStore((state) => state.closeMobileNav)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-ink-950/80" aria-label="Cerrar menú" onClick={close} />
      <div className="relative z-10 flex h-full w-80 max-w-[85%] flex-col border-r border-white/[0.06] bg-ink-950 p-8">
        <div className="mb-16 flex items-center justify-between">
          <Logo />
          <button type="button" onClick={close} className="text-[10px] uppercase tracking-[0.28em] text-ink-400">
            Cerrar
          </button>
        </div>
        <nav className="grid gap-1">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={close}
              className="py-3 text-[15px] font-medium text-white/80 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={ROUTES.wishlist}
            onClick={close}
            className="py-3 text-[15px] font-medium text-white/80 hover:text-white"
          >
            Favoritos
          </Link>
          <Link
            to={ROUTES.cart}
            onClick={close}
            className="py-3 text-[15px] font-medium text-white/80 hover:text-white"
          >
            Carrito
          </Link>
        </nav>
        <SocialLinks className="mt-auto pt-16" />
      </div>
    </div>
  )
}
