import { ROUTES, catalogPath, productPath } from '@/constants/routes'

export interface NavItem {
  label: string
  href: string
}

export interface NavDepartment {
  label: string
  slug: string
  items: NavItem[]
}

export const NAV_DEPARTMENTS: NavDepartment[] = [
  {
    label: 'iPhone',
    slug: 'iphone',
    items: [
      { label: 'iPhone 17 Pro Max', href: productPath('iphone-17-pro-max') },
      { label: 'iPhone 17 Pro', href: productPath('iphone-17-pro') },
      { label: 'iPhone 17 Air', href: productPath('iphone-17-air') },
      { label: 'iPhone 17', href: productPath('iphone-17') },
      { label: 'iPhone 16', href: productPath('iphone-16') },
      { label: 'iPhone 15', href: productPath('iphone-15') },
      { label: 'iPhone 14', href: productPath('iphone-14') },
      { label: 'Todo iPhone', href: catalogPath('iphone') },
    ],
  },
  {
    label: 'Mac',
    slug: 'mac',
    items: [
      { label: 'MacBook Pro 14"', href: productPath('macbook-pro-14') },
      { label: 'MacBook Air', href: productPath('macbook-air') },
      { label: 'Mac Mini M4', href: productPath('mac-mini-m4') },
      { label: 'Todos los Mac', href: catalogPath('mac') },
    ],
  },
  {
    label: 'iPad',
    slug: 'ipads',
    items: [
      { label: 'iPad 11 A16', href: productPath('ipad-11-a16') },
      { label: 'iPad Air M3', href: productPath('ipad-air-m3') },
      { label: 'iPad Pro M5', href: productPath('ipad-pro-m5') },
      { label: 'iPad mini', href: productPath('ipad-mini-a17-pro') },
      { label: 'Apple Pencil', href: productPath('apple-pencil-pro') },
      { label: 'Todas las iPad', href: catalogPath('ipads') },
    ],
  },
  {
    label: 'Audio',
    slug: 'audio',
    items: [
      { label: 'AirPods Pro 3', href: productPath('airpods-pro-3') },
      { label: 'AirPods 4', href: productPath('airpods-4') },
      { label: 'Bose S1 Pro', href: productPath('bose-s1-pro') },
      { label: 'Sony WH-1000XM5', href: productPath('sony-wh-1000xm5') },
      { label: 'Hollyland Lark M2', href: productPath('hollyland-lark-m2') },
      { label: 'Todo el audio', href: catalogPath('audio') },
    ],
  },
  {
    label: 'Alexa',
    slug: 'alexa',
    items: [
      { label: 'Echo Pop', href: productPath('amazon-echo-pop') },
      { label: 'Echo Dot 5', href: productPath('amazon-echo-dot-5') },
      { label: 'Echo Show 5', href: productPath('amazon-echo-show-5') },
      { label: 'Echo Show 8', href: productPath('amazon-echo-show-8') },
      { label: 'Echo Spot', href: productPath('amazon-echo-spot') },
      { label: 'Toda Alexa', href: catalogPath('alexa') },
    ],
  },
  {
    label: 'Gaming',
    slug: 'gaming',
    items: [
      { label: 'ASUS ROG Strix', href: productPath('asus-rog-strix-g16') },
      { label: 'MSI Katana', href: productPath('msi-katana-17') },
      { label: 'Lenovo Legion', href: productPath('lenovo-legion-5') },
      { label: 'Todo gaming', href: catalogPath('gaming') },
    ],
  },
  {
    label: 'Accesorios',
    slug: 'accesorios',
    items: [
      { label: 'Apple Watch Series 11', href: productPath('apple-watch-series-11') },
      { label: 'Apple Watch SE', href: productPath('apple-watch-se') },
      { label: 'Cargador Apple', href: productPath('cargador-apple') },
      { label: 'Apple Pencil', href: productPath('apple-pencil-pro') },
      { label: 'AirTag', href: productPath('airtag') },
      { label: 'Todos los accesorios', href: catalogPath('accesorios') },
    ],
  },
]

export const HEADER_LINKS = NAV_DEPARTMENTS.map((department) => ({
  label: department.label,
  to: catalogPath(department.slug),
}))

export const FOOTER_LINKS = [
  { label: 'Inicio', to: ROUTES.home },
  { label: 'Catálogo', to: ROUTES.catalog },
  { label: 'Al por mayor', to: '/#mayorista' },
  { label: 'Soporte', to: ROUTES.privacy },
  { label: 'Contacto', to: ROUTES.terms },
] as const

export const SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/importcas.col/',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/573001112233',
  },
] as const
