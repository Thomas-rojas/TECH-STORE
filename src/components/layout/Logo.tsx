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
    <Link to={ROUTES.home} className={cn('flex items-center gap-2.5 text-white', className)}>
      <LogoMark className="size-4" />
      <span
        className={cn(
          'text-[15px] font-semibold tracking-[0.22em] text-white uppercase',
          wordmarkClassName,
        )}
      >
        {appConfig.name}
      </span>
    </Link>
  )
}
