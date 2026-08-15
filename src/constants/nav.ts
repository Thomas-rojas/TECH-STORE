import { ROUTES, catalogPath } from '@/constants/routes'

export const HEADER_LINKS = [
  { label: 'iPhone', to: catalogPath('iphone') },
  { label: 'Mac', to: catalogPath('mac') },
  { label: 'iPad', to: catalogPath('ipad') },
  { label: 'Watch', to: catalogPath('watch') },
  { label: 'Accesorios', to: catalogPath('accesorios') },
] as const

export const FOOTER_LINKS = [
  { label: 'Inicio', to: ROUTES.home },
  { label: 'Productos', to: ROUTES.catalog },
  { label: 'Privacidad', to: ROUTES.privacy },
  { label: 'Términos', to: ROUTES.terms },
] as const

export const SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/techstore',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/573001112233',
  },
] as const
