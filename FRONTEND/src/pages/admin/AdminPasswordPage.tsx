import { AdminInput, AdminNotice } from '@/components/admin/AdminField'
import { Button } from '@/components/ui/Button'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useState, type FormEvent } from 'react'

export function AdminPasswordPage() {
  const changeOwnPassword = useCustomerAuthStore((state) => state.changeOwnPassword)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (next.trim() !== confirm.trim()) {
      setError('La nueva clave y la repetición no coinciden.')
      return
    }

    const result = changeOwnPassword(current, next)
    if (result === 'wrong') {
      setError('La clave actual no es correcta.')
      return
    }
    if (result === 'short') {
      setError('La nueva clave debe tener al menos 4 caracteres.')
      return
    }

    setCurrent('')
    setNext('')
    setConfirm('')
    setMessage('Clave cambiada. La próxima vez que entres, usa esta nueva clave.')
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Cambiar clave</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Esta es la clave de tu cuenta de administrador. Escríbela en un lugar seguro: no se puede
          recuperar por correo.
        </p>
      </div>

      {message ? <AdminNotice>{message}</AdminNotice> : null}
      {error ? <p className="rounded-2xl bg-offer/10 px-4 py-3 text-sm font-medium text-offer">{error}</p> : null}

      <div className="space-y-5 rounded-3xl bg-surface p-5 sm:p-6">
        <AdminInput
          label="Clave actual"
          type="password"
          value={current}
          onChange={(event) => setCurrent(event.target.value)}
          autoComplete="current-password"
          required
        />
        <AdminInput
          label="Nueva clave"
          type="password"
          hint="Mínimo 4 caracteres. Puede ser una palabra fácil de recordar."
          value={next}
          onChange={(event) => setNext(event.target.value)}
          autoComplete="new-password"
          required
        />
        <AdminInput
          label="Repite la nueva clave"
          type="password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          autoComplete="new-password"
          required
        />
      </div>

      <Button type="submit" size="lg">
        Guardar nueva clave
      </Button>
    </form>
  )
}
