import { ROUTES, catalogPath } from '@/constants/routes'

export interface NavDepartment {
  label: string
  slug: string
  brands: string[]
}

export const NAV_DEPARTMENTS: NavDepartment[] = [
  {
    label: 'Celulares',
    slug: 'celulares',
    brands: ['Apple', 'Samsung', 'Xiaomi', 'Google'],
  },
  {
    label: 'Tablets',
    slug: 'tablets',
    brands: ['Apple', 'Samsung', 'Xiaomi'],
  },
  {
    label: 'Computadores',
    slug: 'computadores',
    brands: ['Apple', 'Samsung', 'Xiaomi'],
  },
  {
    label: 'Accesorios',
    slug: 'accesorios',
    brands: ['Apple', 'Samsung', 'Xiaomi', 'Sony', 'Bose'],
  },
]

export const HEADER_LINKS = NAV_DEPARTMENTS.map((department) => ({
  label: department.label,
  to: catalogPath(department.slug),
}))

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
