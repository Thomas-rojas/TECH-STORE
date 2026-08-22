import { cn } from '@/utils/cn'

const tones: Record<string, string> = {
  nuevo: 'bg-brand-100 text-on-brand',
  preparando: 'bg-lima/60 text-on-brand',
  enviado: 'bg-peri-400/20 text-peri-600',
  entregado: 'bg-mint/70 text-on-brand',
  cancelado: 'bg-ink-200 text-ink-500',
  pendiente: 'bg-lima/70 text-on-brand',
  aprobada: 'bg-mint/80 text-on-brand',
  rechazada: 'bg-offer/15 text-offer',
  activa: 'bg-mint/80 text-on-brand',
  inactiva: 'bg-ink-200 text-ink-500',
  on: 'bg-mint/80 text-on-brand',
  off: 'bg-ink-200 text-ink-500',
}

export function StatusPill({
  status,
  label,
}: {
  status: string
  label: string
}) {
  return (
    <span
      className={cn(
        'text-ui inline-flex rounded-full px-3 py-1 text-xs',
        tones[status] ?? 'bg-ink-200 text-ink-600',
      )}
    >
      {label}
    </span>
  )
}
