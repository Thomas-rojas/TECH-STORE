import { AdminNotice, AdminTextarea } from '@/components/admin/AdminField'
import { StatusPill } from '@/components/admin/StatusPill'
import { Button } from '@/components/ui/Button'
import { ORDER_STATUS_LABEL } from '@/constants/admin'
import { useAdminStore } from '@/stores/admin.store'
import type { OrderStatus } from '@/types/admin'
import { formatCurrency, formatDate } from '@/utils/format'
import { useMemo, useState } from 'react'

const STATUSES: OrderStatus[] = ['nuevo', 'preparando', 'enviado', 'entregado', 'cancelado']

export function AdminOrdersPage() {
  const orders = useAdminStore((state) => state.orders)
  const setStatus = useAdminStore((state) => state.setOrderStatus)
  const saveNotes = useAdminStore((state) => state.saveOrderNotes)
  const [filter, setFilter] = useState<'todos' | OrderStatus>('todos')
  const [openId, setOpenId] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [message, setMessage] = useState('')

  const visible = useMemo(
    () => (filter === 'todos' ? orders : orders.filter((order) => order.status === filter)),
    [orders, filter],
  )

  const selected = orders.find((order) => order.id === openId) ?? null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Pedidos</h1>
        <p className="mt-1 text-sm text-ink-500">
          Abre un pedido para ver qué pidió la persona y cambiar el estado: nuevo, preparando, enviado…
        </p>
      </div>
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <div className="flex flex-wrap gap-2">
        {(['todos', ...STATUSES] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filter === status ? 'bg-brand-500 text-on-brand' : 'bg-surface text-ink-600 hover:bg-ink-200 hover:text-ink-900'
            }`}
          >
            {status === 'todos' ? 'Todos' : ORDER_STATUS_LABEL[status]}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {visible.map((order) => (
          <li key={order.id}>
            <button
              type="button"
              className="flex w-full flex-col gap-2 rounded-3xl bg-white p-5 text-left sm:flex-row sm:items-center sm:justify-between"
              onClick={() => {
                setOpenId(order.id)
                setNotes(order.notes)
              }}
            >
              <div>
                <p className="font-semibold text-ink-900">
                  {order.number} · {order.customer.name}
                </p>
                <p className="text-sm text-ink-500">
                  {formatDate(order.createdAt)} · {order.paymentMethodName}
                  {order.channel === 'wholesale' ? ' · Mayorista' : ''}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium">{formatCurrency(order.total)}</span>
                {order.channel === 'wholesale' ? (
                  <StatusPill status="activa" label="Mayorista" />
                ) : null}
                <StatusPill status={order.status} label={ORDER_STATUS_LABEL[order.status]} />
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selected ? (
        <div className="rounded-3xl bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">{selected.number}</h2>
              <p className="mt-1 text-sm text-ink-500">{formatDate(selected.createdAt)}</p>
            </div>
            <button type="button" className="text-sm text-ink-400" onClick={() => setOpenId(null)}>
              Cerrar
            </button>
          </div>
          <dl className="mt-5 grid gap-2 text-sm">
            <div>
              <dt className="text-ink-400">Cliente</dt>
              <dd className="font-medium">
                {selected.customer.name} · {selected.customer.phone}
              </dd>
              <dd className="text-ink-500">
                {selected.customer.email} · {selected.customer.city}
              </dd>
              <dd className="text-ink-500">{selected.customer.address}</dd>
            </div>
          </dl>
          <ul className="mt-5 space-y-2 text-sm">
            {selected.items.map((item) => (
              <li key={`${item.productId}-${item.name}`} className="flex justify-between gap-3">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-black/[0.06] pt-4 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(selected.subtotal)}</span>
            </p>
            <p className="flex justify-between">
              <span>Descuento {selected.promoCode ? `(${selected.promoCode})` : ''}</span>
              <span>- {formatCurrency(selected.discount)}</span>
            </p>
            <p className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(selected.total)}</span>
            </p>
            <p className="text-ink-500">Pago: {selected.paymentMethodName}</p>
          </div>
          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold">Estado del pedido</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={selected.status === status ? 'primary' : 'secondary'}
                  onClick={() => {
                    setStatus(selected.id, status)
                    setMessage(`Pedido ${selected.number} ahora está: ${ORDER_STATUS_LABEL[status]}.`)
                  }}
                >
                  {ORDER_STATUS_LABEL[status]}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-5">
            <AdminTextarea
              label="Notas internas"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
            <Button
              className="mt-3"
              variant="secondary"
              onClick={() => {
                saveNotes(selected.id, notes)
                setMessage('Notas guardadas.')
              }}
            >
              Guardar notas
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
