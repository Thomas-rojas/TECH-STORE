import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

type BadgeTone = 'brand' | 'neutral' | 'success' | 'warning' | 'sale'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
}

const tones: Record<BadgeTone, string> = {
  brand: 'text-brand-400',
  neutral: 'text-ink-300',
  success: 'text-ink-300',
  warning: 'text-ink-300',
  sale: 'text-brand-400',
}

export function Badge({ className, tone = 'neutral', ...props }: BadgeProps) {
  return (
    <span
      className={cn('text-xs font-medium text-white/80', tones[tone], className)}
      {...props}
    />
  )
}
