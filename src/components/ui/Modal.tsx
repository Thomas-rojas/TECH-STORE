import { cn } from '@/utils/cn'
import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Modal({ open, title, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 flex h-full w-full max-w-md flex-col border-l border-black/[0.06] bg-white',
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-center justify-between border-b border-black/[0.06] px-6 py-6">
          <h2 id="modal-title" className="font-display text-2xl font-medium text-ink-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[10px] uppercase tracking-[0.28em] text-ink-400 hover:text-ink-900"
          >
            Cerrar
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
