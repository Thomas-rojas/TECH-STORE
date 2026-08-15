import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

type BadgeTone = 'brand' | 'neutral' | 'success' | 'warning' | 'sale'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

const tones: Record<BadgeTone, string> = {
  brand: 'text-brand-500',
  neutral: 'text-ink-500',
  success: 'text-ink-500',
  warning: 'text-ink-500',
  sale: 'text-brand-500',
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn('text-xs font-medium text-ink-500', tones[tone], className)}
      {...props}
    />
  )
}
