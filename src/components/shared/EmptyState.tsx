import { Button } from '@/components/ui/Button'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      {icon ? <div className="mb-4 text-3xl">{icon}</div> : null}
      <h2 className="font-display text-3xl font-medium text-ink-900">{title}</h2>
      <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-ink-400">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-8" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  )
}
