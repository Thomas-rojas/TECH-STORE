import { IMAGES } from '@/constants/images'
import type { Category } from '@/types/category'

export const categories: Category[] = [
  {
    id: 'cat-iphone',
    slug: 'iphone',
    name: 'iPhone',
    tagline: 'TELÉFONOS APPLE',
    description: 'iPhone 14 a 17. Air, Pro y Pro Max. Inventario listo en Colombia.',
    image: IMAGES.iphone16Pro,
  },
  {
    id: 'cat-mac',
    slug: 'mac',
    name: 'Mac',
    tagline: 'COMPUTADORES APPLE',
    description: 'MacBook Pro, MacBook Air y Mac Mini. Apple también es computador.',
    image: IMAGES.macbookPro,
  },
  {
    id: 'cat-ipads',
    slug: 'ipads',
    name: 'iPad',
    tagline: 'TABLETAS APPLE',
    description: 'iPad 11 A16, Air M3, Pro M5 y mini. Con Pencil y teclado.',
    image: IMAGES.ipadPro,
  },
  {
    id: 'cat-audio',
    slug: 'audio',
    name: 'Audio',
    tagline: 'AIRPODS · BOSE · MICRÓFONOS',
    description: 'AirPods, parlantes Bose, Sony y micrófonos para crear.',
    image: IMAGES.airpodsPro,
  },
  {
    id: 'cat-alexa',
    slug: 'alexa',
    name: 'Alexa',
    tagline: 'TODA LA FAMILIA AMAZON',
    description: 'Echo Pop, Dot, Show, Spot y más. Alexa en todas sus variedades.',
    image: IMAGES.echoStudio,
  },
  {
    id: 'cat-gaming',
    slug: 'gaming',
    name: 'Gaming',
    tagline: 'PCs DE OTRAS MARCAS',
    description: 'Portátiles gaming ASUS ROG, MSI y Lenovo Legion. Fuera del universo Apple.',
    image: IMAGES.asusRog,
  },
  {
    id: 'cat-accesorios',
    slug: 'accesorios',
    name: 'Accesorios',
    tagline: 'PENCIL · CARGA · WATCH · AIRTAG',
    description: 'Cargadores Apple, Pencil, AirTag y Apple Watch.',
    image: IMAGES.applePencil,
  },
]
