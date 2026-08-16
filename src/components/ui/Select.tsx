import { cn } from '@/utils/cn'
import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({ className, label, children, ...props }: SelectProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
      {label ? <span>{label}</span> : null}
      <select
        className={cn(
          'h-11 border-b border-black/15 bg-surface px-0 text-sm font-normal tracking-normal text-ink-900 outline-none focus:border-ink-900',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}
