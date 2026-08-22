import { AuthDialog } from '@/components/layout/AuthDialog'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { SearchOverlay } from '@/components/layout/SearchOverlay'
import { ROUTES } from '@/constants/routes'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export function MainLayout() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === ROUTES.home

  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(hash.slice(1))
    if (!target) return
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink-800">
      <Header />
      <MobileNav />
      <SearchOverlay />
      <CartDrawer />
      <AuthDialog />
      <main key={pathname} className={isHome ? 'page-fade flex-1' : 'page-fade flex-1 pt-[4.5rem] sm:pt-[4.75rem] lg:pt-20'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
