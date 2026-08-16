import { Logo } from '@/components/layout/Logo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { BagIcon, ChevronIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/Icons'
import { canAccessAdminPanel, isWholesaleApproved } from '@/auth/permissions'
import { NAV_DEPARTMENTS } from '@/constants/nav'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const { itemCount } = useCart()
  const openCart = useUiStore((state) => state.openCart)
  const openMobileNav = useUiStore((state) => state.openMobileNav)
  const openSearch = useUiStore((state) => state.openSearch)
  const openAuth = useUiStore((state) => state.openAuth)
  const session = useCustomerAuthStore((state) => state.session)
  const logout = useCustomerAuthStore((state) => state.logout)
  const [scrolled, setScrolled] = useState(false)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [accountOpen, setAccountOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number>(0)
  const location = useLocation()
  const admin = canAccessAdminPanel(session)
  const wholesale = isWholesaleApproved(session)
  const firstName = session?.name.split(' ')[0]

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current)
  }, [])

  useEffect(() => {
    setOpenSlug(null)
    setAccountOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!openSlug && !accountOpen) return

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (navRef.current && !navRef.current.contains(target)) setOpenSlug(null)
      if (accountRef.current && !accountRef.current.contains(target)) setAccountOpen(false)
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenSlug(null)
        setAccountOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openSlug, accountOpen])

  function openDepartment(slug: string) {
    window.clearTimeout(closeTimer.current)
    setAccountOpen(false)
    setOpenSlug(slug)
  }

  function scheduleNavClose() {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenSlug(null), 220)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b text-ink-800 transition-all duration-300 ease-out',
        scrolled || openSlug
          ? 'border-black/[0.06] bg-ink-100/95 shadow-[0_8px_24px_rgba(89,83,80,0.08)] backdrop-blur-xl'
          : 'border-black/[0.05] bg-ink-100/90 backdrop-blur-xl',
      )}
    >
      <button
        type="button"
        className={cn('nav-veil', openSlug && 'is-open')}
        aria-label="Cerrar menú"
        tabIndex={openSlug ? 0 : -1}
        onClick={() => setOpenSlug(null)}
      />
      <div className="relative z-40 mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-ink-500 transition duration-200 hover:text-ink-800 lg:hidden"
            onClick={openMobileNav}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </button>
          <Logo />
        </div>

        <nav
          ref={navRef}
          className="pointer-events-none absolute inset-x-0 hidden justify-center lg:flex"
          onMouseLeave={scheduleNavClose}
        >
          <div className="pointer-events-auto flex items-center gap-2" onMouseEnter={() => window.clearTimeout(closeTimer.current)}>
            {NAV_DEPARTMENTS.map((department) => {
              const isOpen = openSlug === department.slug
              return (
                <div
                  key={department.slug}
                  className="relative"
                  onMouseEnter={() => openDepartment(department.slug)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => setOpenSlug(isOpen ? null : department.slug)}
                    className={cn(
                      'flex items-center gap-0.5 px-1.5 py-2 text-[12px] font-medium tracking-wide transition duration-300 sm:px-2',
                      isOpen ? 'text-ink-800' : 'text-ink-500 hover:text-peri-600',
                    )}
                  >
                    {department.label}
                    <ChevronIcon
                      direction="down"
                      className={cn('size-3.5 opacity-70 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]', isOpen && 'rotate-180')}
                    />
                  </button>

                  <div
                    role="menu"
                    className={cn(
                      'nav-flyout rounded-2xl border border-black/[0.06] bg-surface/95 p-2 shadow-[0_24px_60px_rgba(35,31,31,0.16)] backdrop-blur-xl',
                      isOpen && 'is-open',
                    )}
                  >
                    {department.items.map((entry, index) => (
                      <Link
                        key={entry.href}
                        to={entry.href}
                        role="menuitem"
                        style={{ '--i': index } as CSSProperties}
                        className="nav-flyout-item block rounded-xl px-3 py-2.5 text-[13px] text-ink-500 transition duration-200 hover:bg-ink-200 hover:text-ink-900"
                      >
                        {entry.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <ThemeToggle />
          <button
            type="button"
            onClick={openSearch}
            className="text-ink-500 transition duration-200 hover:text-peri-600"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative text-ink-500 transition duration-200 hover:text-peri-600"
            aria-label="Carrito"
          >
            <BagIcon />
            {itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-peri-500" />
            ) : null}
          </button>
          <div ref={accountRef} className="relative">
            <button
              type="button"
              onClick={() => {
                if (session) {
                  setAccountOpen((open) => !open)
                  return
                }
                openAuth()
              }}
              className="text-ink-500 transition duration-200 hover:text-peri-600"
              aria-label={session ? 'Mi cuenta' : 'Iniciar sesión'}
            >
              <UserIcon />
            </button>
            <div
              className={cn(
                'nav-flyout nav-flyout-end rounded-2xl border border-black/[0.06] bg-surface/95 p-4 shadow-[0_24px_60px_rgba(35,31,31,0.16)] backdrop-blur-xl',
                accountOpen && session && 'is-open',
              )}
            >
              {session ? (
                <>
                  <p className="text-sm font-semibold text-ink-900">Hola, {firstName}</p>
                  <p className="mt-1 text-xs text-ink-400">{session.identification}</p>
                  <Link
                    to={ROUTES.account}
                    className="mt-3 block text-sm text-ink-600 transition hover:text-peri-600"
                    onClick={() => setAccountOpen(false)}
                  >
                    Mi cuenta
                  </Link>
                  {admin ? (
                    <Link
                      to={ROUTES.admin}
                      className="mt-2 block text-sm text-ink-600 transition hover:text-peri-600"
                      onClick={() => setAccountOpen(false)}
                    >
                      Panel administrador
                    </Link>
                  ) : wholesale ? (
                    <Link
                      to={ROUTES.wholesale}
                      className="mt-2 block text-sm text-ink-600 transition hover:text-peri-600"
                      onClick={() => setAccountOpen(false)}
                    >
                      Panel mayorista
                    </Link>
                  ) : (
                    <Link
                      to={ROUTES.account}
                      className="mt-2 block text-sm text-ink-600 transition hover:text-peri-600"
                      onClick={() => setAccountOpen(false)}
                    >
                      {session.wholesaleStatus === 'pending' ? 'Solicitud mayorista' : '¿Compras por mayor?'}
                    </Link>
                  )}
                  <button
                    type="button"
                    className="mt-4 w-full rounded-full bg-ink-100 py-2 text-sm font-medium text-ink-700 transition hover:bg-ink-200"
                    onClick={() => {
                      logout()
                      setAccountOpen(false)
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
