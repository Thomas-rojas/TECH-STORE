import { Logo } from '@/components/layout/Logo'
import { BagIcon, ChevronIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/Icons'
import { NAV_DEPARTMENTS } from '@/constants/nav'
import { ROUTES, catalogBrandPath, catalogPath } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const { itemCount } = useCart()
  const openCart = useUiStore((state) => state.openCart)
  const openMobileNav = useUiStore((state) => state.openMobileNav)
  const openSearch = useUiStore((state) => state.openSearch)
  const [scrolled, setScrolled] = useState(false)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenSlug(null)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!openSlug) return

    function onPointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSlug(null)
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenSlug(null)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openSlug])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500',
        scrolled || openSlug
          ? 'border-b border-white/10 bg-ink-950/40 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-white lg:hidden"
            onClick={openMobileNav}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </button>
          <Logo />
        </div>

        <nav ref={navRef} className="pointer-events-none absolute inset-x-0 hidden justify-center lg:flex">
          <div className="pointer-events-auto flex items-center gap-2">
            {NAV_DEPARTMENTS.map((department) => {
              const isOpen = openSlug === department.slug
              return (
                <div key={department.slug} className="relative">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="menu"
                    onClick={() => setOpenSlug(isOpen ? null : department.slug)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 text-[13px] font-medium tracking-wide transition',
                      isOpen ? 'text-white' : 'text-white/75 hover:text-white',
                    )}
                  >
                    {department.label}
                    <ChevronIcon
                      direction="down"
                      className={cn('size-3.5 opacity-70 transition', isOpen && 'rotate-180')}
                    />
                  </button>

                  {isOpen ? (
                    <div
                      role="menu"
                      className="absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 rounded-2xl border border-white/10 bg-ink-950/95 p-2 shadow-2xl backdrop-blur-md"
                    >
                      <Link
                        to={catalogPath(department.slug)}
                        role="menuitem"
                        className="block rounded-xl px-3 py-2.5 text-[13px] text-white/70 transition hover:bg-white/5 hover:text-white"
                      >
                        Ver todos
                      </Link>
                      {department.brands.map((brand) => (
                        <Link
                          key={brand}
                          to={catalogBrandPath(department.slug, brand)}
                          role="menuitem"
                          className="block rounded-xl px-3 py-2.5 text-[13px] text-white/70 transition hover:bg-white/5 hover:text-white"
                        >
                          {brand}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <button
            type="button"
            onClick={openSearch}
            className="text-white/90 transition hover:text-white"
            aria-label="Buscar"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative text-white/90 transition hover:text-white"
            aria-label="Carrito"
          >
            <BagIcon />
            {itemCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-white" />
            ) : null}
          </button>
          <Link
            to={ROUTES.wishlist}
            className="text-white/90 transition hover:text-white"
            aria-label="Cuenta"
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  )
}
