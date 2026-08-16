import { AdminNotice, AdminTextarea } from '@/components/admin/AdminField'
import { StatusPill } from '@/components/admin/StatusPill'
import { Button } from '@/components/ui/Button'
import { CASH_STATUS_LABEL } from '@/constants/admin'
import { ROUTES } from '@/constants/routes'
import { useAdminStore } from '@/stores/admin.store'
import { formatCurrency, formatDate } from '@/utils/format'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export function AdminCashRequestsPage() {
  const requests = useAdminStore((state) => state.cashRequests)
  const decide = useAdminStore((state) => state.decideCashRequest)
  const [filter, setFilter] = useState<'pendiente' | 'todas'>('pendiente')
  const [note, setNote] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  const visible = useMemo(
    () => (filter === 'todas' ? requests : requests.filter((item) => item.status === 'pendiente')),
    [requests, filter],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Descuento en efectivo</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-500">
          Cuando alguien paga en efectivo y pide un descuento extra, llega aquí. Aprueba o rechaza
          con un toque. Si apruebas, el total del pedido se actualiza solo.
        </p>
      </div>
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-medium ${filter === 'pendiente' ? 'bg-brand-500' : 'bg-white'}`}
          onClick={() => setFilter('pendiente')}
        >
          Pendientes
        </button>
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-medium ${filter === 'todas' ? 'bg-brand-500' : 'bg-white'}`}
          onClick={() => setFilter('todas')}
        >
          Todas
        </button>
      </div>

      {visible.length === 0 ? (
        <AdminNotice>No hay solicitudes en esta lista.</AdminNotice>
      ) : null}

      <ul className="space-y-4">
        {visible.map((request) => (
          <li key={request.id} className="rounded-3xl bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-900">{request.customerName}</p>
                <p className="text-sm text-ink-500">
                  {request.email} · {request.phone}
                </p>
                <p className="mt-1 text-xs text-ink-400">{formatDate(request.createdAt)}</p>
              </div>
              <StatusPill status={request.status} label={CASH_STATUS_LABEL[request.status]} />
            </div>
            <p className="mt-4 rounded-2xl bg-ink-100 px-4 py-3 text-sm leading-relaxed text-ink-700">
              {request.message}
            </p>
            <p className="mt-3 text-sm text-ink-600">
              Pide <strong>{request.requestedPercent}%</strong> extra · Pedido{' '}
              {request.orderNumber ?? 'sin número'} · Total actual {formatCurrency(request.orderTotal)}
            </p>
            {request.orderId ? (
              <Link to={ROUTES.adminOrders} className="mt-2 inline-block text-sm text-peri-600">
                Ver pedidos
              </Link>
            ) : null}
            {request.status === 'pendiente' ? (
              <div className="mt-4 space-y-3">
                <AdminTextarea
                  label="Nota para ti (opcional)"
                  value={note[request.id] ?? ''}
                  onChange={(event) => setNote((current) => ({ ...current, [request.id]: event.target.value }))}
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => {
                      decide(request.id, 'aprobada', note[request.id] ?? '')
                      setMessage(`Aprobaste el descuento de ${request.customerName}.`)
                    }}
                  >
                    Aprobar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      decide(request.id, 'rechazada', note[request.id] ?? '')
                      setMessage(`Rechazaste la solicitud de ${request.customerName}.`)
                    }}
                  >
                    Rechazar
                  </Button>
                </div>
              </div>
            ) : request.adminNote ? (
              <p className="mt-3 text-sm text-ink-500">Nota: {request.adminNote}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
