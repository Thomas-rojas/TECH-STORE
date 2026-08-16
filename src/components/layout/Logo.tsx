import { LogoMark } from '@/components/ui/Icons'
import { appConfig } from '@/config/app'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  wordmarkClassName?: string
}

export function Logo({ className, wordmarkClassName }: LogoProps) {
  return (
    <Link to={ROUTES.home} className={cn('flex items-center gap-2.5 text-ink-800', className)}>
      <LogoMark className="h-9 w-auto translate-y-[1px] object-contain object-center sm:h-10" />
      <span
        className={cn(
          'leading-none font-display text-[17px] font-bold tracking-tight',
          wordmarkClassName ?? 'text-ink-800',
        )}
      >
        {appConfig.name}
      </span>
    </Link>
  )
}
