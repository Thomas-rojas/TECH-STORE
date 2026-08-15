import { IMAGES } from '@/constants/images'
import type { Category } from '@/types/category'

export const categories: Category[] = [
  {
    id: 'cat-iphone',
    slug: 'iphone',
    name: 'iPhone',
    tagline: 'SERIE 16',
    description: 'iPhone 16 y 16 Pro.',
    image: IMAGES.iphone16Pro,
  },
  {
    id: 'cat-mac',
    slug: 'mac',
    name: 'Mac',
    tagline: 'MACBOOK PRO M4',
    description: 'MacBook Pro y Air con chip M4.',
    image: IMAGES.macbookPro,
  },
  {
    id: 'cat-ipad',
    slug: 'ipad',
    name: 'iPad',
    tagline: 'IPAD PRO M4',
    description: 'iPad Pro y Air para crear y trabajar.',
    image: IMAGES.ipadPro,
  },
  {
    id: 'cat-airpods',
    slug: 'airpods',
    name: 'AirPods',
    tagline: 'PRO 2DA GEN',
    description: 'Audio espacial y cancelación activa.',
    image: IMAGES.airpodsPro,
  },
  {
    id: 'cat-watch',
    slug: 'watch',
    name: 'Apple Watch',
    tagline: 'SERIES 10',
    description: 'Salud, deporte y conectividad.',
    image: IMAGES.appleWatch,
  },
  {
    id: 'cat-accesorios',
    slug: 'accesorios',
    name: 'Accesorios',
    tagline: 'MAGIC Y PENCIL',
    description: 'Teclados, lápices y complementos.',
    image: IMAGES.keyboard,
  },
  {
    id: 'cat-otras-marcas',
    slug: 'otras-marcas',
    name: 'Otras Marcas',
    tagline: 'GALAXY S25',
    description: 'Samsung, Google, Sony y Bose.',
    image: IMAGES.galaxyS25,
  },
]
