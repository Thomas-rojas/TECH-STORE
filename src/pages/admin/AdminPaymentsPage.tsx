import { AdminInput, AdminNotice, AdminTextarea } from '@/components/admin/AdminField'
import { StatusPill } from '@/components/admin/StatusPill'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { useAdminStore } from '@/stores/admin.store'
import type { PaymentMethod } from '@/types/admin'
import { uid } from '@/utils/format'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function AdminPaymentsPage() {
  const methods = useAdminStore((state) => state.paymentMethods)
  const upsert = useAdminStore((state) => state.upsertPaymentMethod)
  const [editing, setEditing] = useState<PaymentMethod | null>(null)
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState('')

  function saveMethod() {
    if (!editing?.name.trim()) {
      setMessage('El medio de pago necesita un nombre.')
      return
    }
    upsert(editing)
    setEditing(null)
    setMessage('Medio de pago actualizado. El cliente lo verá al pagar si está encendido.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Medios de pago</h1>
        <p className="mt-1 text-sm text-ink-500">
          Enciende o apaga cómo te pueden pagar. En efectivo puedes dejar un descuento automático.
        </p>
      </div>
      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <ul className="space-y-3">
        {methods.map((method) => (
          <li key={method.id} className="rounded-3xl bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-900">{method.name}</p>
                <p className="mt-1 max-w-xl text-sm text-ink-500">{method.instructions}</p>
                {method.cashDiscountPercent > 0 ? (
                  <p className="mt-2 text-sm font-medium text-ink-700">
                    Descuento automático: {method.cashDiscountPercent}%
                  </p>
                ) : null}
              </div>
              <StatusPill
                status={method.enabled ? 'on' : 'off'}
                label={method.enabled ? 'Visible al cliente' : 'Oculto'}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  upsert({ ...method, enabled: !method.enabled })
                  setMessage(method.enabled ? `${method.name} quedó oculto.` : `${method.name} ya se puede usar.`)
                }}
              >
                {method.enabled ? 'Ocultar' : 'Mostrar'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(method)}>
                Editar instrucciones
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 rounded-3xl bg-white p-5 sm:flex-row sm:items-end">
        <AdminInput
          label="Agregar otro medio (Nequi, Daviplata, etc.)"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Nombre del medio"
        />
        <Button
          onClick={() => {
            if (!newName.trim()) return
            upsert({
              id: uid('pay'),
              name: newName.trim(),
              enabled: true,
              instructions: 'El cliente elige este medio al pagar. Completa las instrucciones con Editar.',
              cashDiscountPercent: 0,
            })
            setNewName('')
            setMessage('Medio de pago agregado. Ahora edita las instrucciones.')
          }}
        >
          Agregar
        </Button>
      </div>

      {editing ? (
        <div className="space-y-4 rounded-3xl bg-white p-5">
          <h2 className="font-display text-2xl font-semibold">Editar {editing.name}</h2>
          <AdminInput
            label="Nombre que ve el cliente"
            value={editing.name}
            onChange={(event) => setEditing({ ...editing, name: event.target.value })}
          />
          <AdminTextarea
            label="Instrucciones"
            hint="Texto corto: qué debe hacer el cliente después de elegir este pago."
            value={editing.instructions}
            onChange={(event) => setEditing({ ...editing, instructions: event.target.value })}
          />
          {editing.id === 'cash' ? (
            <AdminInput
              label="Descuento automático por efectivo (%)"
              hint="Ejemplo: 5. Se resta solo al elegir este medio."
              type="number"
              min={0}
              max={40}
              value={String(editing.cashDiscountPercent)}
              onChange={(event) =>
                setEditing({ ...editing, cashDiscountPercent: Number(event.target.value) || 0 })
              }
            />
          ) : null}
          <div className="flex gap-3">
            <Button onClick={saveMethod}>Guardar</Button>
            <Button variant="secondary" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      ) : null}

      <Link
        to={ROUTES.adminPassword}
        className="block rounded-3xl bg-surface px-5 py-4 text-sm text-ink-500 transition hover:bg-ink-200 hover:text-ink-800"
      >
        ¿Quieres cambiar la clave del panel? Hazlo en <span className="font-semibold text-ink-800">Cambiar clave</span>.
      </Link>
    </div>
  )
}
