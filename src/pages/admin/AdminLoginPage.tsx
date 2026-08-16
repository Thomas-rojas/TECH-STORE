import { canAccessAdminPanel } from '@/auth/permissions'
import { AdminInput } from '@/components/admin/AdminField'
import { Logo } from '@/components/layout/Logo'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { ADMIN_DEFAULT_IDENTIFICATION, ADMIN_DEFAULT_PASSWORD } from '@/constants/admin'
import { ROUTES } from '@/constants/routes'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export function AdminLoginPage() {
  const session = useCustomerAuthStore((state) => state.session)
  const login = useCustomerAuthStore((state) => state.login)
  const navigate = useNavigate()
  const [identification, setIdentification] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (canAccessAdminPanel(session)) {
    return <Navigate to={ROUTES.admin} replace />
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const result = login(identification, password)
    if (result === 'not-found') {
      setError('No encontramos esa identificación.')
      return
    }
    if (result === 'wrong') {
      setError('La contraseña no coincide.')
      return
    }
    const account = useCustomerAuthStore.getState().session
    if (!canAccessAdminPanel(account)) {
      void navigate(ROUTES.home)
      return
    }
    void navigate(ROUTES.admin)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-100 px-4">
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-md space-y-6 rounded-3xl bg-surface p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
      >
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <Logo className="text-ink-800" wordmarkClassName="text-ink-800" />
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">Panel de la tienda</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-500">
            Entra con una cuenta de administrador. Los clientes normales siguen usando el inicio de
            sesión de la tienda.
          </p>
        </div>
        <AdminInput
          label="Identificación"
          value={identification}
          onChange={(event) => {
            setIdentification(event.target.value)
            setError('')
          }}
          autoComplete="username"
        />
        <AdminInput
          label="Contraseña"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setError('')
          }}
          hint={`Cuenta inicial: ${ADMIN_DEFAULT_IDENTIFICATION} / ${ADMIN_DEFAULT_PASSWORD}. Luego cámbiala en Cambiar clave.`}
          autoComplete="current-password"
        />
        {error ? <p className="text-sm font-medium text-offer">{error}</p> : null}
        <Button type="submit" className="w-full" size="lg">
          Entrar al panel
        </Button>
        <Link to={ROUTES.home} className="block text-center text-sm text-ink-400 transition hover:text-peri-600">
          Volver a la tienda
        </Link>
      </form>
    </div>
  )
}
