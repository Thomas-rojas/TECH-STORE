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
    <div className="flex min-h-screen flex-col bg-ink-100 text-ink-800">
      <Header />
      <MobileNav />
      <SearchOverlay />
      <CartDrawer />
      <main className={isHome ? 'flex-1' : 'flex-1 pt-20'}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
