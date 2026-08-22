import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'play'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'brand-gradient-cta btn-glow text-on-brand hover:brightness-[1.04] hover:scale-[1.03] active:scale-[0.98]',
  secondary: 'bg-ink-200 text-ink-800 hover:bg-ink-300 hover:scale-[1.02]',
  ghost: 'bg-transparent text-ink-500 hover:text-peri-600',
  outline:
    'border-2 border-brand-400/70 bg-surface/70 text-ink-800 backdrop-blur-sm hover:border-lima hover:shadow-[0_0_24px_rgb(223_247_65_/_0.28)] hover:scale-[1.02]',
  play: 'border border-ink-300 bg-transparent text-ink-800 hover:border-peri-500',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'min-h-14 px-9 text-[15px]',
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full text-ui transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:brightness-100',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
