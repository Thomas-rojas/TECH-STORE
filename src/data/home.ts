import { IMAGES } from '@/constants/images'

export const brands = ['Apple', 'Samsung', 'Sony', 'Google', 'Bose', 'DJI'] as const

export const homeStats = [
  { label: 'Productos en catálogo', target: 500, suffix: '+', grouped: false },
  { label: 'Marcas premium', target: 15, suffix: '+', grouped: false },
  { label: 'Clientes satisfechos', target: 12_000, suffix: '+', grouped: true },
  { label: 'Satisfacción garantizada', target: 99, suffix: '%', grouped: false },
] as const

export const heroStats = [
  { value: '500+', label: 'Productos' },
  { value: '15+', label: 'Marcas' },
  { value: '24h', label: 'Envío' },
] as const

export const exploreItems = [
  { id: 'ex-iphone', name: 'iPhone', image: IMAGES.iphone16Pro, href: '/catalogo/iphone' },
  { id: 'ex-mac', name: 'Mac', image: IMAGES.macbookPro, href: '/catalogo/mac' },
  { id: 'ex-ipad', name: 'iPad', image: IMAGES.ipadPro, href: '/catalogo/ipad' },
  { id: 'ex-watch', name: 'Watch', image: IMAGES.appleWatch, href: '/catalogo/watch' },
  { id: 'ex-airpods', name: 'AirPods', image: IMAGES.airpodsPro, href: '/catalogo/airpods' },
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
}

export const testimonials: Testimonial[] = [
  {
    id: 't-01',
    name: 'Valentina Herrera',
    role: 'Diseñadora UX - Buenos Aires',
    quote:
      'Compré mi iPhone 16 Pro aquí y la experiencia fue increíble. El envío llegó en menos de 24 horas y el producto estaba perfectamente embalado.',
    rating: 5,
    product: 'IPHONE 16 PRO',
    image: IMAGES.store,
    avatar: IMAGES.avatars[0],
  },
  {
    id: 't-02',
    name: 'Martín López',
    role: 'Productor audiovisual - Madrid',
    quote:
      'El MacBook Pro M4 rinde exactamente como prometieron. Atención rápida y un unboxing de nivel.',
    rating: 5,
    product: 'MACBOOK PRO M4',
    image: IMAGES.macbookPro,
    avatar: IMAGES.avatars[1],
  },
  {
    id: 't-03',
    name: 'Sofía Ramírez',
    role: 'Fotógrafa - Ciudad de México',
    quote:
      'Pedí el iPad Pro M4 en oferta y llegó sellado, con factura y en tiempo récord. Volvería a comprar sin dudar.',
    rating: 5,
    product: 'IPAD PRO M4',
    image: IMAGES.ipadPro,
    avatar: IMAGES.avatars[2],
  },
  {
    id: 't-04',
    name: 'Diego Castro',
    role: 'Ingeniero - Bogotá',
    quote:
      'Comparé precios y me quedé por el servicio. Los AirPods Pro 2 son auténticos y el seguimiento del pedido es claro.',
    rating: 5,
    product: 'AIRPODS PRO 2',
    image: IMAGES.airpodsPro,
    avatar: IMAGES.avatars[3],
  },
  {
    id: 't-05',
    name: 'Camila Ortiz',
    role: 'Estudiante - Santiago',
    quote:
      'Mi primer Apple Watch lo compré aquí. Me asesoraron bien y el envío fue al día siguiente.',
    rating: 5,
    product: 'APPLE WATCH',
    image: IMAGES.appleWatch,
    avatar: IMAGES.avatars[4],
  },
]
