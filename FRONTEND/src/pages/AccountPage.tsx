import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/constants/routes'
import { canAccessAdminPanel, canRequestWholesale, isWholesaleApproved } from '@/auth/permissions'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useUiStore } from '@/stores/ui.store'
import { ROLE_LABEL, WHOLESALE_STATUS_LABEL } from '@/types/roles'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function AccountPage() {
  const session = useCustomerAuthStore((state) => state.session)
  const requestWholesale = useCustomerAuthStore((state) => state.requestWholesale)
  const updateAccount = useCustomerAuthStore((state) => state.updateAccount)
  const openAuth = useUiStore((state) => state.openAuth)
  const [name, setName] = useState(session?.name ?? '')
  const [phone, setPhone] = useState(session?.phone ?? '')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState('')

  if (!session) {
    return (
      <Container className="py-20">
        <h1 className="font-display text-3xl font-semibold">Tu cuenta</h1>
        <p className="mt-3 text-ink-500">Inicia sesión para ver tu perfil y pedir acceso mayorista.</p>
        <Button className="mt-6" onClick={openAuth}>
          Iniciar sesión
        </Button>
      </Container>
    )
  }

  return (
    <Container className="max-w-xl space-y-8 py-16">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Tu cuenta</h1>
        <p className="mt-2 text-sm text-ink-500">
          {ROLE_LABEL[session.role]} · {WHOLESALE_STATUS_LABEL[session.wholesaleStatus]}
        </p>
      </div>

      {message ? <p className="rounded-2xl bg-brand-50 px-4 py-3 text-sm text-ink-700">{message}</p> : null}

      <div className="space-y-4 rounded-3xl bg-surface p-6">
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Nombre
          <input
            className="h-12 rounded-xl border border-black/10 px-4 font-normal"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold">
          Celular
          <input
            className="h-12 rounded-xl border border-black/10 px-4 font-normal"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <p className="text-sm text-ink-400">Correo: {session.email}</p>
        <Button
          onClick={() => {
            updateAccount(session.id, { name: name.trim(), phone: phone.trim() })
            setMessage('Datos guardados.')
          }}
        >
          Guardar perfil
        </Button>
      </div>

      {canAccessAdminPanel(session) ? (
        <div className="space-y-4 rounded-3xl bg-surface p-6">
          <h2 className="font-display text-2xl font-semibold">Administración</h2>
          <p className="text-sm text-ink-500">Tienes acceso al panel para gestionar la tienda.</p>
          <Link to={ROUTES.admin} className="inline-block">
            <Button>Ir al panel administrador</Button>
          </Link>
        </div>
      ) : (
      <div className="space-y-4 rounded-3xl bg-surface p-6">
        <h2 className="font-display text-2xl font-semibold">¿Compras por mayor?</h2>
        {isWholesaleApproved(session) ? (
          <div>
            <p className="text-sm text-ink-500">Tu cuenta mayorista está activa.</p>
            <Link to={ROUTES.wholesale} className="mt-4 inline-block">
              <Button>Ir al panel mayorista</Button>
            </Link>
          </div>
        ) : session.wholesaleStatus === 'pending' ? (
          <p className="text-sm text-ink-500">
            Ya enviamos tu solicitud. El administrador la revisa y te habilita el panel.
          </p>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-ink-500">
              Si compras para reventa o para tu negocio, pide acceso. Verás precios especiales cuando te
              aprueben.
            </p>
            <textarea
              className="min-h-24 w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
              placeholder="Cuéntanos tu negocio (opcional)"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <Button
              disabled={!canRequestWholesale(session)}
              onClick={() => {
                const result = requestWholesale(note)
                if (result === 'ok') setMessage('Solicitud enviada. Te avisamos al aprobarla.')
              }}
            >
              Solicitar acceso mayorista
            </Button>
          </>
        )}
        </div>
      )}
    </Container>
  )
}
