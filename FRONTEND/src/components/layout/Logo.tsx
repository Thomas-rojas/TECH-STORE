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
      className={cn('logo-shine inline-flex items-center gap-2.5', className)}
    >
      <img
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden
        className="logo-shine__img h-8 w-auto shrink-0 object-contain object-center sm:h-9"
      />
      {/* Wordmark: oculto en pantallas muy pequeñas; variante por tema */}
      <img
        src="/brand/wordmark-importcas-light.png"
        alt={appConfig.name}
        className="logo-shine__img hidden h-7 w-auto max-w-[8.5rem] object-contain object-left sm:block sm:h-8 sm:max-w-[10rem] dark:hidden"
      />
      <img
        src="/brand/wordmark-importcas.png"
        alt=""
        aria-hidden
        className="logo-shine__img hidden h-7 w-auto max-w-[8.5rem] object-contain object-left sm:h-8 sm:max-w-[10rem] dark:sm:block"
      />
    </Link>
  )
}
