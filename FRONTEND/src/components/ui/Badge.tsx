import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

type BadgeTone = 'brand' | 'neutral' | 'success' | 'warning' | 'sale'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

const tones: Record<BadgeTone, string> = {
  brand: 'bg-lima text-on-brand shadow-[0_0_18px_rgb(223_247_65_/_0.4)]',
  neutral: 'bg-ink-200 text-ink-600',
  success: 'bg-mint/50 text-ink-800',
  warning: 'bg-lima/80 text-on-brand',
  sale: 'offer-pill-coral text-white',
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] text-ui uppercase tracking-[0.1em]',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
