import { cn } from '@/utils/cn'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ className, label, id, ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
      {label ? <span>{label}</span> : null}
      <input
        id={id}
        className={cn(
          'h-12 border-b border-white/15 bg-transparent px-0 text-sm font-normal tracking-normal text-white outline-none transition placeholder:text-ink-500 focus:border-white/50',
          className,
        )}
        {...props}
      />
    </label>
  )
}
