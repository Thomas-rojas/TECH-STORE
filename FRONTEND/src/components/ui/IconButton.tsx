import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid'
}

export function IconButton({ className, variant = 'outline', ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full transition duration-300',
        variant === 'solid'
          ? 'bg-brand-500 text-ink-800 hover:bg-brand-400'
          : 'border border-ink-300 text-ink-800 hover:border-peri-500',
        className,
      )}
      {...props}
    />
  )
}
