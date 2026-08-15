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
          'h-12 border-b border-black/15 bg-transparent px-0 text-sm font-normal tracking-normal text-ink-900 outline-none transition placeholder:text-ink-400 focus:border-ink-900',
          className,
        )}
        {...props}
      />
    </label>
  )
}
