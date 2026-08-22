import { InstagramIcon, WhatsAppIcon } from '@/components/ui/Icons'
import { SOCIAL_LINKS } from '@/constants/nav'
import { cn } from '@/utils/cn'

const icons = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
} as const

interface SocialLinksProps {
  className?: string
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-5', className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = icons[link.id]
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="text-ink-400 transition hover:text-peri-600"
          >
            <Icon />
          </a>
        )
      })}
    </div>
  )
}
