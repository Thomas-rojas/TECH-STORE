import { cn } from '@/utils/cn'

const stroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/logo-mark.png?v=3"
      alt=""
      className={cn('h-10 w-auto object-contain object-center', className)}
    />
  )
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <circle cx="11" cy="11" r="6.5" {...stroke} />
      <path d="M16 16.5 20 20.5" {...stroke} />
    </svg>
  )
}

export function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <path d="M6.5 8.5h11l-.8 10.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6.5 8.5Z" {...stroke} />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" {...stroke} />
    </svg>
  )
}

export function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-hidden>
      <circle cx="12" cy="12" r="8" {...stroke} strokeWidth={1.5} />
      <path d="M4 12h16M12 4c2.5 3 2.5 13 0 16M12 4c-2.5 3-2.5 13 0 16" {...stroke} strokeWidth={1.5} />
    </svg>
  )
}

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-hidden>
      <path d="M5 6.5A2.5 2.5 0 0 1 7.5 4h9A2.5 2.5 0 0 1 19 6.5v7A2.5 2.5 0 0 1 16.5 16H10l-4 3.5V6.5Z" {...stroke} strokeWidth={1.5} />
    </svg>
  )
}

export function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-hidden>
      <circle cx="12" cy="12" r="8" {...stroke} strokeWidth={1.5} />
      <path d="M10 9.5v5l5-2.5-5-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-4', className)} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" {...stroke} />
    </svg>
  )
}

export function ChevronIcon({ direction, className }: { direction: 'left' | 'right' | 'down'; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      {direction === 'left' ? (
        <path d="M14.5 6 8.5 12l6 6" {...stroke} />
      ) : direction === 'down' ? (
        <path d="M6 9.5 12 15.5 18 9.5" {...stroke} />
      ) : (
        <path d="M9.5 6 15.5 12l-6 6" {...stroke} />
      )}
    </svg>
  )
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
    </svg>
  )
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <circle cx="12" cy="8" r="3.2" {...stroke} />
      <path d="M5.5 19.2c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" {...stroke} />
    </svg>
  )
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <path
        d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7.5a3.8 3.8 0 0 1 7 3.3C19 15.6 12 20 12 20Z"
        {...stroke}
      />
    </svg>
  )
}

export function SupportIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <circle cx="12" cy="12" r="8" {...stroke} />
      <path d="M9.2 9.4a2.8 2.8 0 0 1 5.5.8c0 1.6-2.7 2-2.7 3.6M12 17.2h.01" {...stroke} />
    </svg>
  )
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="3.6" {...stroke} />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <path
        d="M12.05 3.5A8.4 8.4 0 0 0 4.7 15.4L4 20l4.7-.7A8.4 8.4 0 1 0 12.05 3.5Z"
        {...stroke}
      />
      <path d="M9.2 9.4c.2-.5.4-.5.7-.5h.6c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.5l-.5.5c-.2.2-.2.4 0 .6 1 1.4 2.2 2.2 2.5 2.4.3.2.5.2.7 0l.6-.6c.2-.2.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.6c0 .3 0 .5-.5.7A4.8 4.8 0 0 1 14 17.2c-2.4 0-5.2-2.2-5.8-5.2-.2-.8-.1-1.8 1-2.6Z" {...stroke} />
    </svg>
  )
}

export function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <circle cx="12" cy="12" r="4" {...stroke} />
      <path d="M12 3.5v1.8M12 18.7v1.8M4.6 4.6l1.3 1.3M18.1 18.1l1.3 1.3M3.5 12h1.8M18.7 12h1.8M4.6 19.4l1.3-1.3M18.1 5.9l1.3-1.3" {...stroke} />
    </svg>
  )
}

export function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <path d="M16.2 13.6A6.2 6.2 0 0 1 10.4 5.5 6.4 6.4 0 1 0 18.5 14a6.2 6.2 0 0 1-2.3-.4Z" {...stroke} />
    </svg>
  )
}
