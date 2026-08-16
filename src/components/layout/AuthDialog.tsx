import { canAccessAdminPanel } from '@/auth/permissions'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { usePresence } from '@/hooks/usePresence'
import { ID_TYPES, type IdType } from '@/types/customer-auth'
import { useAdminStore } from '@/stores/admin.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useUiStore } from '@/stores/ui.store'
import { uid } from '@/utils/format'
import { cn } from '@/utils/cn'
import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

const fieldClass =
  'h-12 w-full rounded-xl border border-black/10 bg-ink-100 px-4 text-sm text-ink-900 outline-none transition duration-200 placeholder:text-ink-300 focus:border-brand-600 focus:bg-surface'

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-left">
      <span className="text-sm font-semibold text-ink-800">
        {label}
        <span className="text-brand-700">*</span>
      </span>
      {hint ? <span className="text-xs font-normal text-ink-400">{hint}</span> : null}
      {children}
    </label>
  )
}

export function AuthDialog() {
  const open = useUiStore((state) => state.isAuthOpen)
  const close = useUiStore((state) => state.closeAuth)
  const { mounted, entered } = usePresence(open, 280)
  const navigate = useNavigate()
  const login = useCustomerAuthStore((state) => state.login)
  const register = useCustomerAuthStore((state) => state.register)
  const upsertCustomer = useAdminStore((state) => state.upsertCustomer)
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [error, setError] = useState('')
  const [identification, setIdentification] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [idType, setIdType] = useState<IdType>('Cédula')
  const [requestWholesale, setRequestWholesale] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    setError('')
    setPassword('')
  }, [open, tab])

  function onLogin(event: FormEvent) {
    event.preventDefault()
    const result = login(identification, password)
    if (result === 'not-found') {
      setError('No encontramos esa identificación. Regístrate para crear tu cuenta.')
      return
    }
    if (result === 'wrong') {
      setError('La contraseña no coincide.')
      return
    }
    close()
    const account = useCustomerAuthStore.getState().session
    if (canAccessAdminPanel(account)) {
      void navigate(ROUTES.admin)
    }
  }

  function onRegister(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim() || !identification.trim()) {
      setError('Completa todos los campos.')
      return
    }
    const result = register({ name, email, phone, idType, identification, requestWholesale })
    if (result === 'id-taken') {
      setError('Esa identificación ya tiene una cuenta. Inicia sesión.')
      return
    }
    if (result === 'email-taken') {
      setError('Ese correo ya está registrado.')
      return
    }
    upsertCustomer({
      id: uid('cus'),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: '',
      notes: `${idType} ${identification.trim()}${requestWholesale ? ' · Solicita mayorista' : ''}`,
      createdAt: new Date().toISOString(),
      orderCount: 0,
      totalSpent: 0,
    })
    close()
  }

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className={cn('drawer-backdrop', entered && 'is-open')}
        aria-label="Cerrar"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className={cn(
          'modal-card relative z-10 flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-t-3xl bg-surface px-5 py-6 shadow-[0_24px_80px_rgba(35,31,31,0.18)] sm:rounded-3xl sm:px-7 sm:py-8',
          entered && 'is-open',
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 id="auth-title" className="font-display text-2xl font-semibold text-ink-900">
            Tu cuenta
          </h2>
          <button
            type="button"
            onClick={close}
            className="text-xs font-medium text-ink-400 hover:text-ink-800"
          >
            Cerrar
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={cn(
              'h-11 rounded-xl text-sm font-semibold transition',
              tab === 'login'
                ? 'bg-brand-500 text-on-brand'
                : 'border border-black/10 bg-surface text-ink-500 hover:border-brand-400 hover:text-ink-900',
            )}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={cn(
              'h-11 rounded-xl text-sm font-semibold transition',
              tab === 'register'
                ? 'bg-brand-500 text-on-brand'
                : 'border border-black/10 bg-surface text-ink-500 hover:border-brand-400 hover:text-ink-900',
            )}
          >
            Registrarme
          </button>
        </div>

        {error ? <p className="mb-4 text-sm font-medium text-offer">{error}</p> : null}

        {tab === 'login' ? (
          <form className="space-y-5" onSubmit={onLogin}>
            <Field label="Identificación">
              <input
                className={fieldClass}
                value={identification}
                onChange={(event) => setIdentification(event.target.value)}
                inputMode="numeric"
                autoComplete="username"
                required
              />
            </Field>
            <Field
              label="Contraseña"
              hint="(por defecto es tu identificación si te registraste)"
            >
              <input
                className={fieldClass}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </Field>
            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={onRegister}>
            <Field label="Nombre completo">
              <input
                className={fieldClass}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                required
              />
            </Field>
            <Field label="Email">
              <input
                className={fieldClass}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </Field>
            <Field label="Celular (requerido)">
              <input
                className={fieldClass}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-[0.95fr_1.05fr]">
              <Field label="Tipo de identificación">
                <select
                  className={fieldClass}
                  value={idType}
                  onChange={(event) => setIdType(event.target.value as IdType)}
                >
                  {ID_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Identificación">
                <input
                  className={fieldClass}
                  value={identification}
                  onChange={(event) => setIdentification(event.target.value)}
                  inputMode="numeric"
                  required
                />
              </Field>
            </div>
            <p className="text-xs text-ink-400">La contraseña será tu número de identificación.</p>
            <label className="flex items-start gap-3 rounded-2xl bg-ink-100 p-4 text-sm text-ink-700">
              <input
                type="checkbox"
                className="mt-1"
                checked={requestWholesale}
                onChange={(event) => setRequestWholesale(event.target.checked)}
              />
              <span>
                <span className="font-semibold">¿Compras por mayor?</span>
                <span className="mt-1 block text-ink-500">
                  Si marcas esta casilla, el administrador revisa tu solicitud. Cuando te aprueben, entras al panel mayorista.
                </span>
              </span>
            </label>
            <Button type="submit" className="w-full" size="lg">
              Crear cuenta y entrar
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
