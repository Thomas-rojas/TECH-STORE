import { Logo } from '@/components/layout/Logo'
import { ROUTES } from '@/constants/routes'
import { Link, Outlet } from 'react-router-dom'

export function CheckoutLayout() {
  return (
    <div className="min-h-screen bg-white text-ink-900">
      <header className="border-b border-black/[0.06] bg-ink-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Logo />
          <Link to={ROUTES.cart} className="text-sm font-medium text-ink-500 hover:text-peri-600">
            Volver al carrito
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}
