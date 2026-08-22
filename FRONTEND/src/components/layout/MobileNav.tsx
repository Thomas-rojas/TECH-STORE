import { Logo } from '@/components/layout/Logo'
import { SocialLinks } from '@/components/layout/SocialLinks'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { ChevronIcon } from '@/components/ui/Icons'
import { canAccessAdminPanel, isWholesaleApproved } from '@/auth/permissions'
import { NAV_DEPARTMENTS } from '@/constants/nav'
import { ROUTES, catalogPath } from '@/constants/routes'
import { usePresence } from '@/hooks/usePresence'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function MobileNav() {
  const open = useUiStore((state) => state.isMobileNavOpen)
  const close = useUiStore((state) => state.closeMobileNav)
  const { mounted, entered } = usePresence(open, 320)
  const openAuth = useUiStore((state) => state.openAuth)
  const session = useCustomerAuthStore((state) => state.session)
  const logout = useCustomerAuthStore((state) => state.logout)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const admin = canAccessAdminPanel(session)
  const wholesale = isWholesaleApproved(session)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className={cn('drawer-backdrop', entered && 'is-open')}
        aria-label="Cerrar menú"
        onClick={close}
      />
      <div className={cn('drawer-panel relative z-10 flex h-full w-80 max-w-[85%] flex-col border-r border-black/[0.06] bg-surface p-8', entered && 'is-open')}>
        <div className="mb-12 flex items-center justify-between gap-3">
          <Logo className="text-ink-900" wordmarkClassName="text-ink-900" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button type="button" onClick={close} className="text-[10px] uppercase tracking-[0.28em] text-ink-400 transition hover:text-ink-800">
              Cerrar
            </button>
          </div>
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
                  className="flex w-full items-center justify-between py-3 text-left text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
                >
                  {department.label}
                  <ChevronIcon
                    direction="down"
                    className={cn('size-4 text-ink-400 transition duration-300 ease-out', isOpen && 'rotate-180')}
                  />
                </button>
                <div className={cn('nav-accordion', isOpen && 'is-open')}>
                  <div>
                    <div className="mb-2 ml-1 grid gap-1 border-l border-black/10 pl-4">
                      <Link
                        to={catalogPath(department.slug)}
                        onClick={close}
                        className="py-2 text-sm text-ink-500 transition hover:text-ink-900"
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
                            className="py-2 text-sm text-ink-500 transition hover:text-ink-900"
                          >
                            {entry.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <Link
            to="/#mayorista"
            onClick={close}
            className="py-3 text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
          >
            Al por mayor
          </Link>
          <Link
            to={ROUTES.wishlist}
            onClick={close}
            className="py-3 text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
          >
            Favoritos
          </Link>
          {session ? (
            <>
              <Link
                to={ROUTES.account}
                onClick={close}
                className="py-3 text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
              >
                Mi cuenta
              </Link>
              {admin ? (
                <Link
                  to={ROUTES.admin}
                  onClick={close}
                  className="py-3 text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
                >
                  Panel administrador
                </Link>
              ) : null}
              {wholesale ? (
                <Link
                  to={ROUTES.wholesale}
                  onClick={close}
                  className="py-3 text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
                >
                  Panel mayorista
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  logout()
                  close()
                }}
                className="py-3 text-left text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
              >
                Cerrar sesión ({session.name.split(' ')[0]})
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                close()
                openAuth()
              }}
              className="py-3 text-left text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
            >
              Iniciar sesión
            </button>
          )}
          <Link
            to={ROUTES.cart}
            onClick={close}
            className="py-3 text-[15px] font-medium text-ink-800 transition hover:text-ink-900"
          >
            Carrito
          </Link>
        </nav>
        <SocialLinks className="mt-auto pt-16" />
      </div>
    </div>
  )
}
