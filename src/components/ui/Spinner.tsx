import { cn } from '@/utils/cn'

interface SpinnerProps {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      className={cn(
        'inline-block size-6 animate-spin rounded-full border-2 border-white/10 border-t-brand-400',
        className,
      )}
      aria-label="Cargando"
    />
  )
}
