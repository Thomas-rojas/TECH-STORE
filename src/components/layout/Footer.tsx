import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { appConfig } from '@/config/app'
import { FOOTER_LINKS } from '@/constants/nav'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.06] bg-ink-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
            Tecnología seleccionada. Sin ruido.
          </p>
          <SocialLinks className="mt-8" />
        </div>
        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-400">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-ink-500">
          © {new Date().getFullYear()} {appConfig.name}
        </p>
      </div>
    </footer>
  )
}
