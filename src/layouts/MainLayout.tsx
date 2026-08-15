import { CartDrawer } from '@/components/layout/CartDrawer'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { SearchOverlay } from '@/components/layout/SearchOverlay'
import { ROUTES } from '@/constants/routes'
import { Outlet, useLocation } from 'react-router-dom'

export function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home

  return (
    <div className="flex min-h-screen flex-col bg-ink-950 text-ink-50">
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
