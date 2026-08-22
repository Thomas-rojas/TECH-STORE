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
      className={cn('logo-shine inline-flex items-center', className)}
    >
      {/* Lockup completo: gorra + importcas — variante por tema */}
      <img
        src="/brand/logo-lockup-light.png?v=4"
        alt={appConfig.name}
        className="logo-shine__img h-9 w-auto max-w-[11.5rem] object-contain object-left sm:h-11 sm:max-w-[15rem] lg:h-12 lg:max-w-[17rem] dark:hidden"
      />
      <img
        src="/brand/logo-lockup.png?v=4"
        alt=""
        aria-hidden
        className="logo-shine__img hidden h-9 w-auto max-w-[11.5rem] object-contain object-left sm:h-11 sm:max-w-[15rem] lg:h-12 lg:max-w-[17rem] dark:block"
      />
    </Link>
  )
}
