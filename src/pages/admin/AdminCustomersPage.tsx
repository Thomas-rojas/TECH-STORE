import { AdminNotice } from '@/components/admin/AdminField'
import { StatusPill } from '@/components/admin/StatusPill'
import { Button } from '@/components/ui/Button'
import { useAdminStore } from '@/stores/admin.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { ROLE_LABEL, WHOLESALE_STATUS_LABEL } from '@/types/roles'
import { formatCurrency, formatDate } from '@/utils/format'
import { useMemo, useState } from 'react'

export function AdminCustomersPage() {
  const accounts = useCustomerAuthStore((state) => state.accounts)
  const setRole = useCustomerAuthStore((state) => state.setRole)
  const decide = useCustomerAuthStore((state) => state.decideWholesale)
  const removeAccount = useCustomerAuthStore((state) => state.removeAccount)
  const crm = useAdminStore((state) => state.customers)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'todos' | 'customer' | 'wholesale' | 'admin' | 'pending'>('todos')
  const [message, setMessage] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return accounts.filter((account) => {
      if (filter === 'pending' && account.wholesaleStatus !== 'pending') return false
      if (filter === 'wholesale' && account.role !== 'wholesale') return false
      if (filter === 'customer' && account.role !== 'customer') return false
      if (filter === 'admin' && account.role !== 'admin') return false
      if (!q) return true
      return `${account.name} ${account.email} ${account.phone} ${account.identification}`.toLowerCase().includes(q)
    })
  }, [accounts, query, filter])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Clientes</h1>
        <p className="mt-1 text-sm text-ink-500">
          Usuarios con cuenta: administradores, clientes normales y mayoristas. Cada rol solo ve lo que le corresponde.
        </p>
      </div>
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <div className="flex flex-wrap gap-2">
        {(
          [
            ['todos', 'Todos'],
            ['customer', 'Normales'],
            ['wholesale', 'Mayoristas'],
            ['admin', 'Administradores'],
            ['pending', 'Pendientes'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filter === id ? 'bg-brand-500 text-on-brand' : 'bg-surface text-ink-600 hover:bg-ink-200 hover:text-ink-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por nombre, correo, teléfono o identificación"
        className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-base outline-none focus:border-brand-600"
      />

      {visible.length === 0 ? <AdminNotice>No hay usuarios en esta lista.</AdminNotice> : null}

      <ul className="space-y-3">
        {visible.map((account) => (
          <li key={account.id} className="rounded-3xl bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-900">{account.name}</p>
                <p className="text-sm text-ink-500">
                  {account.email} · {account.phone} · {account.idType} {account.identification}
                </p>
                <p className="mt-1 text-xs text-ink-400">Desde {formatDate(account.createdAt)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusPill
                  status={account.role === 'customer' ? 'nuevo' : 'activa'}
                  label={ROLE_LABEL[account.role]}
                />
                <StatusPill
                  status={account.wholesaleStatus === 'approved' ? 'aprobada' : account.wholesaleStatus}
                  label={WHOLESALE_STATUS_LABEL[account.wholesaleStatus]}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {account.role === 'admin' ? (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    if (!setRole(account.id, 'customer')) {
                      setMessage('Debe quedar al menos un administrador.')
                      return
                    }
                    setMessage(`${account.name} volvió a cliente normal.`)
                  }}
                >
                  Quitar administrador
                </Button>
              ) : (
                <>
                  {account.role === 'customer' ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        setRole(account.id, 'wholesale')
                        setMessage(`${account.name} ahora es mayorista.`)
                      }}
                    >
                      Hacer mayorista
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setRole(account.id, 'customer')
                        setMessage(`${account.name} volvió a cliente normal.`)
                      }}
                    >
                      Pasar a cliente normal
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (window.confirm(`¿Dar a ${account.name} acceso de administrador?`)) {
                        setRole(account.id, 'admin')
                        setMessage(`${account.name} ahora es administrador.`)
                      }
                    }}
                  >
                    Hacer administrador
                  </Button>
                </>
              )}
              {account.wholesaleStatus === 'pending' && account.role !== 'admin' ? (
                <>
                  <Button
                    size="sm"
                    onClick={() => {
                      decide(account.id, 'approved')
                      setMessage(`Aprobaste a ${account.name}.`)
                    }}
                  >
                    Aprobar solicitud
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      decide(account.id, 'rejected')
                      setMessage(`Rechazaste a ${account.name}.`)
                    }}
                  >
                    Rechazar
                  </Button>
                </>
              ) : null}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (window.confirm(`¿Eliminar la cuenta de ${account.name}?`)) {
                    const before = accounts.length
                    removeAccount(account.id)
                    setMessage(
                      useCustomerAuthStore.getState().accounts.length === before
                        ? 'No se puede eliminar el último administrador.'
                        : 'Cuenta eliminada.',
                    )
                  }
                }}
              >
                Eliminar cuenta
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {crm.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-semibold">Compradores sin cuenta</h2>
          <p className="text-sm text-ink-500">Personas que pidieron sin registrarse.</p>
          {crm.map((customer) => (
            <div key={customer.id} className="rounded-3xl bg-white p-5">
              <p className="font-semibold">{customer.name}</p>
              <p className="text-sm text-ink-500">
                {customer.email} · {customer.phone || 'Sin teléfono'} · {customer.orderCount} pedido(s) ·{' '}
                {formatCurrency(customer.totalSpent)}
              </p>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  )
}
