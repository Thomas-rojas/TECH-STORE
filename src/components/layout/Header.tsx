import { Logo } from '@/components/layout/Logo'
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from '@/components/ui/Icons'
import { HEADER_LINKS } from '@/constants/nav'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/utils/cn'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export function Header() {
  const { itemCount } = useCart()
  const openCart = useUiStore((state) => state.openCart)
  const openMobileNav = useUiStore((state) => state.openMobileNav)
  const openSearch = useUiStore((state) => state.openSearch)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-500',
        scrolled
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

        <nav className="pointer-events-none absolute inset-x-0 hidden justify-center lg:flex">
          <div className="pointer-events-auto flex items-center gap-9">
            {HEADER_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[13px] font-medium tracking-wide transition ${
                    isActive
                      ? 'text-white underline decoration-white decoration-1 underline-offset-8'
                      : 'text-white/75 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
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
