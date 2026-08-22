import { appConfig } from '@/config/app'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  wordmarkClassName?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to={ROUTES.home}
      aria-label={appConfig.name}
      className={cn('logo-shine inline-flex items-center gap-2.5 sm:gap-3 lg:gap-3.5', className)}
    >
      <img
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden
        className="logo-shine__img h-8 w-auto shrink-0 object-contain object-center sm:h-10 lg:h-11"
      />
      {/* Wordmark: compacto en mobile, intermedio en tablet, protagonista en desktop */}
      <img
        src="/brand/wordmark-importcas-light.png"
        alt={appConfig.name}
        className="logo-shine__img hidden h-7 w-auto max-w-[7.5rem] object-contain object-left min-[400px]:block sm:h-9 sm:max-w-[12rem] lg:h-11 lg:max-w-[14.5rem] dark:hidden"
      />
      <img
        src="/brand/wordmark-importcas.png"
        alt=""
        aria-hidden
        className="logo-shine__img hidden h-7 w-auto max-w-[7.5rem] object-contain object-left sm:h-9 sm:max-w-[12rem] lg:h-11 lg:max-w-[14.5rem] dark:min-[400px]:block"
      />
    </Link>
  )
}
