import { cn } from '@/utils/cn'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

export const adminControlClass =
  'h-12 w-full rounded-xl border border-black/10 bg-surface px-4 text-base text-ink-900 outline-none transition duration-200 placeholder:text-ink-300 focus:border-brand-600'

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-left">
      <span className="text-sm font-semibold text-ink-800">{label}</span>
      {hint ? <span className="-mt-0.5 text-xs leading-snug text-ink-400">{hint}</span> : null}
      {children}
    </label>
  )
}

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function AdminInput({ label, hint, className, ...props }: AdminInputProps) {
  return (
    <AdminField label={label} hint={hint}>
      <input className={cn(adminControlClass, className)} {...props} />
    </AdminField>
  )
}

interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string
}

export function AdminSelect({ label, hint, className, children, ...props }: AdminSelectProps) {
  return (
    <AdminField label={label} hint={hint}>
      <select className={cn(adminControlClass, className)} {...props}>
        {children}
      </select>
    </AdminField>
  )
}

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
}

export function AdminTextarea({ label, hint, className, ...props }: AdminTextareaProps) {
  return (
    <AdminField label={label} hint={hint}>
      <textarea
        className={cn(
          'min-h-28 w-full rounded-xl border border-black/10 bg-surface px-4 py-3 text-base text-ink-900 outline-none transition duration-200 placeholder:text-ink-300 focus:border-brand-600',
          className,
        )}
        {...props}
      />
    </AdminField>
  )
}

export function AdminNotice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl bg-brand-50 px-4 py-3 text-sm leading-relaxed text-ink-700">{children}</p>
  )
}
