import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { appConfig } from '@/config/app'
import { FOOTER_LINKS, HEADER_LINKS } from '@/constants/nav'
import { ROUTES } from '@/constants/routes'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/[0.06] bg-ink-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Logo className="text-ink-800" wordmarkClassName="text-ink-800" />
          <p className="mt-4 max-w-sm text-sm leading-[1.45] text-ink-500">
            Tu acceso directo a la tecnología en Colombia: Confianza, Claridad y Tranquilidad.
          </p>
          <SocialLinks className="mt-8" />
        </div>
        <nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">Links rápidos</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-ink-500">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-peri-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-400">
            Categorías importantes
          </p>
          <ul className="mt-4 grid gap-2.5 text-sm text-ink-500">
            {HEADER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-peri-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-black/[0.05] py-6 text-center text-sm text-ink-400">
        © {new Date().getFullYear()} {appConfig.name} · Seguridad en cada compra
        <span className="mx-2">·</span>
        <Link to={ROUTES.adminLogin} className="hover:text-peri-600">
          Administración
        </Link>
      </div>
    </footer>
  )
}
