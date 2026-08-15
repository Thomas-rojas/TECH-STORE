import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'play'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-500 text-ink-800 hover:bg-brand-400',
  secondary: 'bg-ink-100 text-ink-800 hover:bg-ink-200',
  ghost: 'bg-transparent text-ink-500 hover:text-peri-600',
  outline: 'border border-ink-300 bg-transparent text-ink-800 hover:border-peri-500',
  play: 'border border-ink-300 bg-transparent text-ink-800 hover:border-peri-500',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-[15px]',
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
        'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-normal transition duration-200 disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
