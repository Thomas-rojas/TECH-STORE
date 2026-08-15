import { IMAGES } from '@/constants/images'
import type { Category } from '@/types/category'

export const categories: Category[] = [
  {
    id: 'cat-celulares',
    slug: 'celulares',
    name: 'Celulares',
    tagline: 'IPHONE · GALAXY · PIXEL',
    description: 'Smartphones Apple, Samsung, Xiaomi y Google.',
    image: IMAGES.iphone16Pro,
  },
  {
    id: 'cat-tablets',
    slug: 'tablets',
    name: 'Tablets',
    tagline: 'IPAD PRO M4',
    description: 'Tablets para crear, estudiar y trabajar.',
    image: IMAGES.ipadPro,
  },
  {
    id: 'cat-computadores',
    slug: 'computadores',
    name: 'Computadores',
    tagline: 'MACBOOK PRO M4',
    description: 'Portátiles Apple y otras marcas.',
    image: IMAGES.macbookPro,
  },
  {
    id: 'cat-accesorios',
    slug: 'accesorios',
    name: 'Accesorios',
    tagline: 'AUDIO · WEARABLES',
    description: 'Auriculares, relojes, teclados y más.',
    image: IMAGES.airpodsPro,
  },
]
