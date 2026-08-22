import { IMAGES } from '@/constants/images'
import { catalogPath, productPath } from '@/constants/routes'

export const brands = ['Apple', 'Amazon', 'ASUS', 'MSI', 'Lenovo', 'Bose', 'Sony', 'Roku', 'Hollyland'] as const

export const heroSlides = [
  {
    id: 'macbook-pro',
    brand: 'Apple',
    eyebrow: 'MacBook Pro 14"',
    title: 'Apple también es computador',
    subtitle: 'Chip M4. Para crear, no solo para el bolsillo.',
    image: IMAGES.macbookPro,
    href: productPath('macbook-pro-14'),
  },
  {
    id: 'iphone-17-pro',
    brand: 'Apple',
    eyebrow: 'iPhone 17 Pro',
    title: 'Teléfonos con inventario real',
    subtitle: 'De la serie 14 a la 17. Precio claro en Colombia.',
    image: IMAGES.iphone16Pro,
    href: productPath('iphone-17-pro'),
  },
  {
    id: 'echo-dot',
    brand: 'Amazon',
    eyebrow: 'Familia Alexa',
    title: 'Todas las variedades',
    subtitle: 'Echo Pop, Dot, Show y Spot. El hogar con Amazon.',
    image: IMAGES.echoStudio,
    href: catalogPath('alexa'),
  },
  {
    id: 'asus-rog',
    brand: 'ASUS',
    eyebrow: 'Gaming',
    title: 'PCs de otras marcas',
    subtitle: 'ROG, MSI y Legion. Potencia fuera del universo Apple.',
    image: IMAGES.laptopStudio,
    href: catalogPath('gaming'),
  },
  {
    id: 'airpods-pro-3',
    brand: 'Apple',
    eyebrow: 'Audio',
    title: 'AirPods, Bose y más',
    subtitle: 'Sonido para escuchar, crear y el escenario.',
    image: IMAGES.airpodsPro,
    href: catalogPath('audio'),
  },
] as const

export const bestsellerSlugs = [
  'airpods-pro-3',
  'macbook-air',
  'amazon-echo-dot-5',
  'asus-rog-strix-g16',
  'ipad-11-a16',
  'sony-wh-1000xm5',
] as const

export const homeStats = [
  { label: 'Clientes satisfechos', target: 300, suffix: '+', grouped: false },
  { label: 'Calificación promedio', target: 4.96, suffix: '', grouped: false, rating: true },
  { label: 'Productos en stock', target: 120, suffix: '+', grouped: false },
  { label: 'Envíos a tiempo', target: 98, suffix: '%', grouped: false },
] as const

export const heroStats = [
  { value: '4.96', label: 'Estrellas' },
  { value: '300+', label: 'Clientes' },
  { value: 'COP', label: 'Precios claros' },
] as const

export const exploreItems = [
  { id: 'ex-iphone', name: 'iPhone', image: IMAGES.iphone16Pro, href: catalogPath('iphone'), zoom: 'scale-[1.05]' },
  { id: 'ex-mac', name: 'Mac', image: IMAGES.macbookPro, href: catalogPath('mac'), zoom: 'scale-[1.85]' },
  { id: 'ex-ipads', name: 'iPad', image: IMAGES.ipadPro, href: catalogPath('ipads'), zoom: 'scale-[1.12]' },
  { id: 'ex-audio', name: 'Audio', image: IMAGES.airpodsPro, href: catalogPath('audio'), zoom: 'scale-[1.2]' },
  { id: 'ex-alexa', name: 'Alexa', image: IMAGES.echoStudio, href: catalogPath('alexa'), zoom: 'scale-[1.08]' },
  { id: 'ex-gaming', name: 'Gaming', image: IMAGES.laptopStudio, href: catalogPath('gaming'), zoom: 'scale-[1.15]', cover: true },
] as const

export const universePanels = [
  {
    id: 'uni-apple',
    kicker: 'Apple',
    title: 'Seguridad y variedad',
    body: 'Mac, iPad, AirPods, Pencil y carga original. No es solo el teléfono.',
    image: IMAGES.macbookPro,
    href: catalogPath('mac'),
    zoom: 'scale-[1.55]',
  },
  {
    id: 'uni-alexa',
    kicker: 'Amazon',
    title: 'Toda Alexa',
    body: 'Pop, Dot, Show y Spot. El hogar inteligente, en todas sus formas.',
    image: IMAGES.echoStudio,
    href: catalogPath('alexa'),
  },
  {
    id: 'uni-audio',
    kicker: 'Sonido',
    title: 'Escuchar y crear',
    body: 'AirPods, Bose, Sony y micrófonos. Audio para cada momento.',
    image: IMAGES.airpodsPro,
    href: catalogPath('audio'),
  },
  {
    id: 'uni-gaming',
    kicker: 'Gaming',
    title: 'Otras marcas',
    body: 'ROG, MSI y Legion. PCs gamer fuera del universo Apple.',
    image: IMAGES.laptopStudio,
    href: catalogPath('gaming'),
  },
] as const

export const trustPillars = [
  {
    title: 'Inventario sólido y actualizado',
    body: 'Apple completo, Alexa, sonido y PCs gaming. Lo que ves está disponible.',
  },
  {
    title: 'Seguridad en cada compra',
    body: 'Productos originales, pago protegido con Mercado Pago y factura clara.',
  },
  {
    title: 'Claridad y puntualidad',
    body: 'Precios en pesos colombianos, tiempos de envío honestos y soporte real.',
  },
] as const

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: number
  product: string
  image: string
  avatar: string
  verified: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    name: 'Laura Méndez',
    role: 'Bogotá',
    quote:
      'La honestidad se nota desde el primer WhatsApp. El MacBook llegó sellado y puntual, tal como lo prometieron.',
    rating: 5,
    product: 'MacBook Air',
    image: IMAGES.macbookAir,
    avatar: IMAGES.avatars[0],
    verified: true,
  },
  {
    id: 't-02',
    name: 'Andrés Ríos',
    role: 'Medellín',
    quote:
      'No es solo iPhone. Pedí el Echo Dot y un parlante el mismo día. Inventario real y puntualidad impecable.',
    rating: 5,
    product: 'Echo Dot 5',
    image: IMAGES.echoStudio,
    avatar: IMAGES.avatars[1],
    verified: true,
  },
  {
    id: 't-03',
    name: 'Camila Torres',
    role: 'Cali',
    quote:
      'Me explicaron el iPad 11 y el Pencil sin presionar. Se siente una compra segura, no un empujón de ventas.',
    rating: 5,
    product: 'iPad 11 A16',
    image: IMAGES.ipadAir,
    avatar: IMAGES.avatars[2],
    verified: true,
  },
  {
    id: 't-04',
    name: 'Diego Castro',
    role: 'Barranquilla',
    quote:
      'Buscaba un ROG, no un Mac. Cumplieron la fecha y el equipo era exactamente el que cotizaron.',
    rating: 5,
    product: 'ASUS ROG Strix G16',
    image: IMAGES.asusRog,
    avatar: IMAGES.avatars[3],
    verified: true,
  },
]
