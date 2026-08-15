import { IMAGES } from '@/constants/images'

export interface ProductColor {
  name: string
  hex: string
}

export interface FeatureCard {
  title: string
  text: string
  icon: 'chip' | 'design' | 'camera' | 'battery' | 'display' | 'audio'
}

export interface FeatureChapter {
  kicker: string
  title: string
  body: string
  image?: string
}

export interface ProductStory {
  colors: ProductColor[]
  capacities: string[]
  cards: FeatureCard[]
  chapters: FeatureChapter[]
}

const iphoneColors: ProductColor[] = [
  { name: 'Titanio negro', hex: '#2c2c2e' },
  { name: 'Titanio natural', hex: '#8e8d88' },
  { name: 'Titanio blanco', hex: '#f2f1ec' },
  { name: 'Titanio desierto', hex: '#c4a574' },
]

const iphoneCapacities = ['128 GB', '256 GB', '512 GB', '1 TB']

const stories: Record<string, ProductStory> = {
  'iphone-16-pro': {
    colors: iphoneColors,
    capacities: iphoneCapacities,
    cards: [
      { icon: 'chip', title: 'Chip A18 Pro', text: 'CPU y GPU de 6 núcleos para un rendimiento extremo.' },
      { icon: 'design', title: 'Diseño en titanio', text: 'Grado 5. Ligero, resistente y con acabado mate.' },
      { icon: 'camera', title: 'Sistema Pro Camera', text: '48 MP Fusion, teleobjetivo 5x y vídeo 4K a 120 fps.' },
    ],
    chapters: [
      {
        kicker: 'Chip',
        title: 'A18 Pro. Un rendimiento monstruoso.',
        body: 'El chip más avanzado de Apple acelera Apple Intelligence, juegos y edición de vídeo ProRes con un Neural Engine de 16 núcleos.',
        image: IMAGES.iphone16Pro,
      },
      {
        kicker: 'Cámara',
        title: 'El sistema de cámaras Pro más versátil.',
        body: 'Cámara Fusion de 48 MP, ultra gran angular de 48 MP y teleobjetivo con zoom óptico de 5x. Control de Cámara para enfocar y capturar al instante.',
        image: IMAGES.iphone16ProAlt,
      },
      {
        kicker: 'Pantalla',
        title: 'Super Retina XDR. Hasta 2000 nits.',
        body: '6.3 pulgadas, ProMotion a 120 Hz y Ceramic Shield. Brillo extremo al sol y Always-On para la Dynamic Island.',
        image: IMAGES.hero,
      },
      {
        kicker: 'Diseño',
        title: 'Titanio. Tan fuerte. Tan ligero. Tan Pro.',
        body: 'Caja de titanio de grado 5, Botón de Acción y USB-C. Resistencia IP68 y un peso de 199 g.',
      },
      {
        kicker: 'Batería',
        title: 'Hasta 27 horas de vídeo.',
        body: 'Carga por USB-C, MagSafe de hasta 25 W y Qi2. Energía para un día completo de uso intensivo.',
      },
    ],
  },
  'iphone-16': {
    colors: [
      { name: 'Negro', hex: '#1d1d1f' },
      { name: 'Blanco', hex: '#f5f5f7' },
      { name: 'Rosa', hex: '#f2c4d4' },
      { name: 'Verde azulado', hex: '#3d6b73' },
      { name: 'Ultramarino', hex: '#2f4ea1' },
    ],
    capacities: ['128 GB', '256 GB', '512 GB'],
    cards: [
      { icon: 'chip', title: 'Chip A18', text: 'Potencia para Apple Intelligence y Camera Control.' },
      { icon: 'camera', title: 'Cámara Fusion 48 MP', text: 'Detalle de alta resolución y vídeo 4K Dolby Vision.' },
      { icon: 'design', title: 'Nuevo diseño', text: 'Botón de Cámara, USB-C y resistencia IP68.' },
    ],
    chapters: [
      {
        kicker: 'Chip',
        title: 'A18. Listo para Apple Intelligence.',
        body: 'Un salto en CPU, GPU y eficiencia para foto, juego y las funciones de inteligencia de iOS 18.',
      },
      {
        kicker: 'Cámara',
        title: 'Camera Control. Una nueva forma de capturar.',
        body: 'Cámara Fusion de 48 MP y ultra gran angular de 12 MP. El botón de Cámara acerca el zoom y el enfoque al dedo.',
      },
      {
        kicker: 'Pantalla',
        title: 'Super Retina XDR de 6.1".',
        body: 'OLED brillante, True Tone y Ceramic Shield para un uso diario más nítido y resistente.',
      },
    ],
  },
  'iphone-15': {
    colors: [
      { name: 'Azul', hex: '#3b6ea5' },
      { name: 'Rosa', hex: '#e8b4c4' },
      { name: 'Amarillo', hex: '#e6d36a' },
      { name: 'Verde', hex: '#3e6b52' },
      { name: 'Negro', hex: '#1d1d1f' },
    ],
    capacities: ['128 GB', '256 GB', '512 GB'],
    cards: [
      { icon: 'chip', title: 'Chip A16 Bionic', text: 'Rendimiento fluido para foto, vídeo y juegos.' },
      { icon: 'camera', title: 'Cámara de 48 MP', text: 'Detalle extremo y Dynamic Island en 6.1".' },
      { icon: 'design', title: 'USB-C', text: 'El puerto universal llega a iPhone 15.' },
    ],
    chapters: [
      {
        kicker: 'Diseño',
        title: 'Dynamic Island. USB-C. Color.',
        body: 'Una pantalla que cobra vida y un puerto USB-C para cargar y transferir con el mismo cable.',
      },
      {
        kicker: 'Cámara',
        title: '48 MP. Un salto de detalle.',
        body: 'Fotos más nítidas de día y de noche, con vídeo 4K en Dolby Vision.',
      },
    ],
  },
  'iphone-15-pro': {
    colors: iphoneColors,
    capacities: iphoneCapacities,
    cards: [
      { icon: 'chip', title: 'Chip A17 Pro', text: 'GPU de 6 núcleos y USB 3 para ProRes.' },
      { icon: 'design', title: 'Diseño en titanio', text: 'Action button y un cuerpo más ligero.' },
      { icon: 'camera', title: 'Sistema Pro Camera', text: '48 MP, zoom 3x y grabación ProRes.' },
    ],
    chapters: [
      {
        kicker: 'Chip',
        title: 'A17 Pro. Hecho para lo Pro.',
        body: 'Trazado de rayos por hardware, USB 3 y un Neural Engine preparado para cargas creativas.',
      },
      {
        kicker: 'Cámara',
        title: 'Tres cámaras. Una mirada Pro.',
        body: 'Principal de 48 MP, ultra gran angular y teleobjetivo 3x, con vídeo ProRes en 4K.',
      },
      {
        kicker: 'Diseño',
        title: 'Titanio y Action button.',
        body: 'Un botón personalizable, USB-C y resistencia IP68 en una caja de titanio.',
      },
    ],
  },
  'samsung-galaxy-s25': {
    colors: [
      { name: 'Negro titanio', hex: '#2b2b2b' },
      { name: 'Gris titanio', hex: '#8a8d91' },
      { name: 'Azul titanio', hex: '#5b6f86' },
    ],
    capacities: ['256 GB', '512 GB', '1 TB'],
    cards: [
      { icon: 'chip', title: 'Snapdragon 8 Elite', text: 'El procesador más rápido de Galaxy.' },
      { icon: 'camera', title: 'Cámara 200 MP', text: 'Zoom óptico 5x y vídeo 8K.' },
      { icon: 'display', title: '6.8" AMOLED', text: 'QHD+ y hasta 2600 nits de brillo.' },
    ],
    chapters: [
      {
        kicker: 'Galaxy AI',
        title: 'Inteligencia en cada captura.',
        body: 'Edición generativa, traducción en tiempo real y siete años de actualizaciones.',
      },
      {
        kicker: 'Cámara',
        title: '200 MP. Zoom 100x.',
        body: 'Cuatro cámaras traseras, teleobjetivo 5x y vídeo 8K para un control total de la luz.',
      },
    ],
  },
  'macbook-pro-m4': {
    colors: [
      { name: 'Negro espacial', hex: '#2c2c2e' },
      { name: 'Plata', hex: '#c7c7cc' },
    ],
    capacities: ['512 GB', '1 TB', '2 TB'],
    cards: [
      { icon: 'chip', title: 'Chip M4', text: 'CPU, GPU y Neural Engine para un flujo Pro.' },
      { icon: 'display', title: 'Liquid Retina XDR', text: '14 pulgadas con ProMotion a 120 Hz.' },
      { icon: 'battery', title: 'Hasta 24 horas', text: 'Batería para un día completo de trabajo.' },
    ],
    chapters: [
      {
        kicker: 'Rendimiento',
        title: 'M4. Un salto para lo Pro.',
        body: 'Edición de vídeo, 3D y código con memoria unificada y un silencio absoluto, sin ventilador ruidoso.',
      },
      {
        kicker: 'Pantalla',
        title: 'XDR. Color y contraste de cine.',
        body: 'Brillo extremo, HDR y una precisión de color hecha para quienes crean contenido.',
      },
    ],
  },
  'macbook-air-m3': {
    colors: [
      { name: 'Medianoche', hex: '#1c1c1e' },
      { name: 'Blanco estrella', hex: '#f5f5f7' },
      { name: 'Azul cielo', hex: '#7a9bb8' },
    ],
    capacities: ['256 GB', '512 GB', '1 TB'],
    cards: [
      { icon: 'chip', title: 'Chip M3', text: 'Potencia en un cuerpo de 1.24 kg.' },
      { icon: 'design', title: 'Diseño Air', text: 'Fina, silenciosa y lista para viajar.' },
      { icon: 'battery', title: 'Todo el día', text: 'Hasta 18 horas de autonomía.' },
    ],
    chapters: [
      {
        kicker: 'Portabilidad',
        title: 'Tan ligera que casi desaparece.',
        body: 'El MacBook Air más capaz, con MagSafe, dos puertos Thunderbolt y una pantalla Liquid Retina.',
      },
    ],
  },
  'ipad-pro-m4': {
    colors: [
      { name: 'Negro espacial', hex: '#2c2c2e' },
      { name: 'Plata', hex: '#c7c7cc' },
    ],
    capacities: ['256 GB', '512 GB', '1 TB', '2 TB'],
    cards: [
      { icon: 'chip', title: 'Chip M4', text: 'El iPad más potente, listo para Apple Pencil Pro.' },
      { icon: 'display', title: 'Ultra Retina XDR', text: 'OLED tándem con un negro absoluto.' },
      { icon: 'design', title: 'Ultrafino', text: 'El diseño más delgado de Apple.' },
    ],
    chapters: [
      {
        kicker: 'Pantalla',
        title: 'OLED. Una nueva forma de ver.',
        body: 'Dos paneles OLED en tándem para un brillo, contraste y detalle que no se habían visto en un iPad.',
      },
    ],
  },
  'ipad-air-m2': {
    colors: [
      { name: 'Azul', hex: '#6b8cae' },
      { name: 'Púrpura', hex: '#8b7aa8' },
      { name: 'Blanco estrella', hex: '#f5f5f7' },
      { name: 'Gris espacial', hex: '#4a4a4c' },
    ],
    capacities: ['128 GB', '256 GB', '512 GB'],
    cards: [
      { icon: 'chip', title: 'Chip M2', text: 'Potencia de Mac en un iPad ligero.' },
      { icon: 'display', title: 'Liquid Retina', text: '11 pulgadas, True Tone y P3.' },
      { icon: 'design', title: 'Magic Keyboard', text: 'Compatible con teclado y Pencil Pro.' },
    ],
    chapters: [],
  },
  'airpods-pro-2': {
    colors: [{ name: 'Blanco', hex: '#f5f5f7' }],
    capacities: [],
    cards: [
      { icon: 'audio', title: 'ANC adaptativa', text: 'Silencio a medida, en cualquier entorno.' },
      { icon: 'chip', title: 'Chip H2', text: 'Audio espacial personalizado.' },
      { icon: 'battery', title: 'Hasta 30 horas', text: 'Con el estuche de carga USB-C.' },
    ],
    chapters: [
      {
        kicker: 'Audio',
        title: 'Inmersión. Control. Silencio.',
        body: 'Cancelación activa de ruido de última generación y audio espacial que se mueve contigo.',
      },
    ],
  },
  'apple-watch-series-10': {
    colors: [
      { name: 'Negro azabache', hex: '#1d1d1f' },
      { name: 'Aluminio rosa', hex: '#e8c4c4' },
      { name: 'Aluminio natural', hex: '#c7c7cc' },
    ],
    capacities: [],
    cards: [
      { icon: 'display', title: 'Pantalla Wide', text: 'La más grande y brillante de Apple Watch.' },
      { icon: 'chip', title: 'S10 SiP', text: 'Más rápido y eficiente en un cuerpo más fino.' },
      { icon: 'battery', title: 'Todo el día', text: 'Carga rápida y salud avanzada.' },
    ],
    chapters: [
      {
        kicker: 'Salud',
        title: 'Mide más. Entiende mejor.',
        body: 'Sueño, ritmo cardiaco y apnea. Un reloj que cuida de ti sin que tengas que pensarlo.',
      },
    ],
  },
  'google-pixel-9': {
    colors: [
      { name: 'Negro obsidiana', hex: '#1c1c1e' },
      { name: 'Porcelana', hex: '#f0ebe3' },
      { name: 'Verde jade', hex: '#6f8f78' },
    ],
    capacities: ['128 GB', '256 GB'],
    cards: [
      { icon: 'chip', title: 'Tensor G4', text: 'Hecho para Gemini y foto computacional.' },
      { icon: 'camera', title: 'Cámara Pixel', text: '50 MP y Magic Editor.' },
      { icon: 'battery', title: '7 años', text: 'Actualizaciones de sistema y seguridad.' },
    ],
    chapters: [
      {
        kicker: 'Gemini',
        title: 'IA que se siente natural.',
        body: 'Tensor G4 y Gemini en el dispositivo para escribir, editar fotos y asistirte todo el día.',
      },
    ],
  },
}

const defaultStory: ProductStory = {
  colors: [],
  capacities: [],
  cards: [
    { icon: 'chip', title: 'Rendimiento', text: 'Hardware seleccionado para un uso diario fluido.' },
    { icon: 'design', title: 'Diseño', text: 'Materiales premium y un perfil limpio.' },
    { icon: 'display', title: 'Experiencia', text: 'Pantalla, audio y batería pensados para durar.' },
  ],
  chapters: [],
}

export function getProductStory(slug: string): ProductStory {
  return stories[slug] ?? defaultStory
}
