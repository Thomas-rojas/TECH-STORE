import { Logo } from '@/components/layout/Logo'
import { ROUTES } from '@/constants/routes'
import { Link, Outlet } from 'react-router-dom'

export function CheckoutLayout() {
  return (
    <div className="min-h-screen bg-ink-950 text-ink-50">
      <header className="border-b border-white/[0.04] bg-ink-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Logo />
          <Link to={ROUTES.cart} className="text-sm font-medium text-ink-300 hover:text-white">
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
