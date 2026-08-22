import { cn } from '@/utils/cn'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ className, label, id, ...props }: InputProps) {
  return (
    <label className="text-meta flex w-full flex-col gap-2 text-[11px] uppercase tracking-[0.16em] text-ink-400">
      {label ? <span>{label}</span> : null}
      <input
        id={id}
        className={cn(
          'text-body h-12 border-b border-black/15 bg-transparent px-0 text-sm text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-ink-900',
          className,
        )}
        {...props}
      />
    </label>
  )
}
