import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { ChevronIcon } from '@/components/ui/Icons'
import { NAV_DEPARTMENTS } from '@/constants/nav'
import { ROUTES, catalogPath } from '@/constants/routes'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function MobileNav() {
  const open = useUiStore((state) => state.isMobileNavOpen)
  const close = useUiStore((state) => state.closeMobileNav)
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Cerrar menú" onClick={close} />
      <div className="relative z-10 flex h-full w-80 max-w-[85%] flex-col border-r border-black/[0.06] bg-white p-8">
        <div className="mb-16 flex items-center justify-between">
          <Logo className="text-ink-900" wordmarkClassName="text-ink-900" />
          <button type="button" onClick={close} className="text-[10px] uppercase tracking-[0.28em] text-ink-400">
            Cerrar
          </button>
        </div>
        <nav className="grid gap-1">
          {NAV_DEPARTMENTS.map((department) => {
            const isOpen = openSlug === department.slug
            return (
              <div key={department.slug}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenSlug(isOpen ? null : department.slug)}
                  className="flex w-full items-center justify-between py-3 text-left text-[15px] font-medium text-ink-800 hover:text-ink-900"
                >
                  {department.label}
                  <ChevronIcon
                    direction="down"
                    className={cn('size-4 text-ink-400 transition', isOpen && 'rotate-180')}
                  />
                </button>
                {isOpen ? (
                  <div className="mb-2 ml-1 grid gap-1 border-l border-black/10 pl-4">
                    <Link
                      to={catalogPath(department.slug)}
                      onClick={close}
                      className="py-2 text-sm text-ink-500 hover:text-ink-900"
                    >
                      Ver todos
                    </Link>
                    {department.items
                      .filter((entry) => !entry.label.toLowerCase().includes('todo'))
                      .map((entry) => (
                      <Link
                        key={entry.href}
                        to={entry.href}
                        onClick={close}
                        className="py-2 text-sm text-ink-500 hover:text-ink-900"
                      >
                        {entry.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
          <Link
            to="/#mayorista"
            onClick={close}
            className="py-3 text-[15px] font-medium text-ink-800 hover:text-ink-900"
          >
            Al por mayor
          </Link>
          <Link
            to={ROUTES.wishlist}
            onClick={close}
            className="py-3 text-[15px] font-medium text-ink-800 hover:text-ink-900"
          >
            Favoritos
          </Link>
          <Link
            to={ROUTES.cart}
            onClick={close}
            className="py-3 text-[15px] font-medium text-ink-800 hover:text-ink-900"
          >
            Carrito
          </Link>
        </nav>
        <SocialLinks className="mt-auto pt-16" />
      </div>
    </div>
  )
}
