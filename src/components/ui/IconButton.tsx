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
          ? 'bg-brand-500 text-white hover:bg-brand-600'
          : 'border border-white/20 text-white hover:border-white/40',
        className,
      )}
      {...props}
    />
  )
}
