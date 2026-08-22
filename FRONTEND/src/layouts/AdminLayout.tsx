import { RequireAdmin } from '@/auth/RequireAdmin'
import { AdminNav } from '@/components/admin/AdminNav'
import { Logo } from '@/components/layout/Logo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { ROUTES } from '@/constants/routes'
import { usePresence } from '@/hooks/usePresence'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { cn } from '@/utils/cn'
import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

export function AdminLayout() {
  const logout = useCustomerAuthStore((state) => state.logout)
  const [menuOpen, setMenuOpen] = useState(false)
  const menu = usePresence(menuOpen, 320)
  const location = useLocation()

  return (
    <RequireAdmin>
      <div className="min-h-screen bg-ink-100 text-ink-900">
        <header className="sticky top-0 z-20 border-b border-black/[0.06] bg-surface">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Logo className="text-ink-800" wordmarkClassName="text-ink-800" />
            </div>
            <div className="flex items-center gap-2 text-sm sm:gap-3">
              <ThemeToggle />
              <Link to={ROUTES.adminPassword} className="hidden text-ink-500 transition hover:text-peri-600 sm:inline">
                Cambiar clave
              </Link>
              <Link to={ROUTES.home} className="hidden text-ink-500 transition hover:text-peri-600 sm:inline">
                Ver tienda
              </Link>
              <button
                type="button"
                className="rounded-full bg-ink-100 px-4 py-2 font-medium text-ink-700 transition hover:bg-ink-200"
                onClick={logout}
              >
                Salir
              </button>
              <button
                type="button"
                className="rounded-full bg-ink-100 px-4 py-2 font-medium transition hover:bg-ink-200 lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
              >
                Menú
              </button>
            </div>
          </div>
        </header>

        {menu.mounted ? (
          <div className="fixed inset-0 z-30 lg:hidden">
            <button
              type="button"
              className={cn('drawer-backdrop', menu.entered && 'is-open')}
              aria-label="Cerrar menú"
              onClick={() => setMenuOpen(false)}
            />
            <div className={cn('drawer-panel relative z-10 w-72 max-w-[85%] bg-surface p-5 shadow-xl', menu.entered && 'is-open')}>
              <AdminNav onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-400">
              ¿Qué quieres hacer?
            </p>
            <AdminNav />
          </aside>
          <main key={location.pathname} className="page-fade min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </RequireAdmin>
  )
}
