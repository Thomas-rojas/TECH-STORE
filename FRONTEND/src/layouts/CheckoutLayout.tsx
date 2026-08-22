import { Logo } from '@/components/layout/Logo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { ROUTES } from '@/constants/routes'
import { Link, Outlet } from 'react-router-dom'

export function CheckoutLayout() {
  return (
    <div className="min-h-screen bg-ink-100 text-ink-900">
      <header className="border-b border-black/[0.06] bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to={ROUTES.cart} className="text-sm font-medium text-ink-500 transition hover:text-peri-600">
              Volver al carrito
            </Link>
          </div>
        </div>
      </header>
      <main className="page-fade mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}
