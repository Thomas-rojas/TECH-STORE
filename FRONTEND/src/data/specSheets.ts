export interface SpecHighlight {
  label: string
  value: string
}

export interface SpecRow {
  label: string
  value: string
}

export interface SpecGroup {
  title: string
  rows: SpecRow[]
}

export interface SpecSheet {
  highlights: SpecHighlight[]
  groups: SpecGroup[]
}

function sheet(
  highlights: SpecHighlight[],
  groups: SpecGroup[],
): SpecSheet {
  return { highlights, groups }
}

export const specSheets: Record<string, SpecSheet> = {
  'iphone-16-pro': sheet(
    [
      { label: 'Pantalla', value: '6.3"' },
      { label: 'Chip', value: 'A18 Pro' },
      { label: 'Cámara', value: '48 MP' },
      { label: 'Memoria', value: '256 GB' },
      { label: 'Material', value: 'Titanio' },
      { label: 'Carga', value: 'USB-C' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '6.3 pulgadas' },
          { label: 'Tipo', value: 'Super Retina XDR OLED' },
          { label: 'Resolución', value: '2622 × 1206' },
          { label: 'Frecuencia', value: 'ProMotion 120 Hz' },
          { label: 'Brillo', value: 'Hasta 2000 nits' },
          { label: 'Protección', value: 'Ceramic Shield' },
          { label: 'True Tone', value: 'Sí' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'A18 Pro' },
          { label: 'CPU', value: '6 núcleos' },
          { label: 'GPU', value: '6 núcleos' },
          { label: 'Neural Engine', value: '16 núcleos' },
          { label: 'Almacenamiento', value: '256 GB' },
          { label: 'RAM', value: '8 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Principal', value: '48 MP f/1.78, Fusion' },
          { label: 'Ultra gran angular', value: '48 MP f/2.2' },
          { label: 'Teleobjetivo', value: '12 MP, zoom óptico 5x' },
          { label: 'Frontal', value: '12 MP TrueDepth' },
          { label: 'Vídeo', value: '4K Dolby Vision hasta 120 fps' },
          { label: 'Estabilización', value: 'Sensor-shift de 2.ª gen' },
          { label: 'Control de Cámara', value: 'Sí' },
        ],
      },
      {
        title: 'Batería y carga',
        rows: [
          { label: 'Reproducción de vídeo', value: 'Hasta 27 h' },
          { label: 'Carga', value: 'USB-C' },
          { label: 'MagSafe', value: 'Hasta 25 W' },
          { label: 'Inalámbrica Qi2', value: 'Sí' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Red', value: '5G' },
          { label: 'Wi-Fi', value: 'Wi-Fi 7' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'NFC', value: 'Sí' },
          { label: 'Ultra Wideband', value: '2.ª generación' },
          { label: 'SIM', value: 'eSIM' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Material', value: 'Titanio de grado 5' },
          { label: 'Color', value: 'Titanio negro' },
          { label: 'Resistencia', value: 'IP68' },
          { label: 'Peso', value: '199 g' },
          { label: 'Dimensiones', value: '149.6 × 71.5 × 8.25 mm' },
          { label: 'Botón de Acción', value: 'Sí' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'iOS 18' },
          { label: 'Apple Intelligence', value: 'Sí' },
          { label: 'Face ID', value: 'Sí' },
          { label: 'SKU', value: 'APL-IP16P-256' },
        ],
      },
    ],
  ),
  'iphone-16': sheet(
    [
      { label: 'Pantalla', value: '6.1"' },
      { label: 'Chip', value: 'A18' },
      { label: 'Cámara', value: '48 MP' },
      { label: 'Memoria', value: '128 GB' },
      { label: 'Color', value: 'Negro' },
      { label: 'Carga', value: 'USB-C' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '6.1 pulgadas' },
          { label: 'Tipo', value: 'Super Retina XDR OLED' },
          { label: 'Resolución', value: '2556 × 1179' },
          { label: 'Frecuencia', value: '60 Hz' },
          { label: 'Brillo', value: 'Hasta 2000 nits' },
          { label: 'Protección', value: 'Ceramic Shield' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'A18' },
          { label: 'CPU', value: '6 núcleos' },
          { label: 'GPU', value: '5 núcleos' },
          { label: 'Almacenamiento', value: '128 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Principal', value: '48 MP Fusion' },
          { label: 'Ultra gran angular', value: '12 MP' },
          { label: 'Frontal', value: '12 MP TrueDepth' },
          { label: 'Vídeo', value: '4K Dolby Vision' },
          { label: 'Camera Control', value: 'Sí' },
        ],
      },
      {
        title: 'Batería y carga',
        rows: [
          { label: 'Reproducción de vídeo', value: 'Hasta 22 h' },
          { label: 'Carga', value: 'USB-C' },
          { label: 'MagSafe', value: 'Sí' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Red', value: '5G' },
          { label: 'Wi-Fi', value: 'Wi-Fi 7' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'NFC', value: 'Sí' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Color', value: 'Negro' },
          { label: 'Resistencia', value: 'IP68' },
          { label: 'Peso', value: '170 g' },
          { label: 'Dimensiones', value: '147.6 × 71.6 × 7.8 mm' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'iOS 18' },
          { label: 'Apple Intelligence', value: 'Sí' },
          { label: 'SKU', value: 'APL-IP16-128' },
        ],
      },
    ],
  ),
  'iphone-15': sheet(
    [
      { label: 'Pantalla', value: '6.1"' },
      { label: 'Chip', value: 'A16' },
      { label: 'Cámara', value: '48 MP' },
      { label: 'Memoria', value: '128 GB' },
      { label: 'Color', value: 'Azul' },
      { label: 'Carga', value: 'USB-C' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '6.1 pulgadas' },
          { label: 'Tipo', value: 'Super Retina XDR OLED' },
          { label: 'Resolución', value: '2556 × 1179' },
          { label: 'Dynamic Island', value: 'Sí' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'A16 Bionic' },
          { label: 'Almacenamiento', value: '128 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Principal', value: '48 MP' },
          { label: 'Ultra gran angular', value: '12 MP' },
          { label: 'Frontal', value: '12 MP' },
          { label: 'Vídeo', value: '4K Dolby Vision' },
        ],
      },
      {
        title: 'Batería y carga',
        rows: [
          { label: 'Reproducción de vídeo', value: 'Hasta 20 h' },
          { label: 'Carga', value: 'USB-C' },
          { label: 'MagSafe', value: 'Sí' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Red', value: '5G' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6' },
          { label: 'Bluetooth', value: '5.3' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Color', value: 'Azul' },
          { label: 'Resistencia', value: 'IP68' },
          { label: 'Peso', value: '171 g' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'iOS 18' },
          { label: 'SKU', value: 'APL-IP15-128' },
        ],
      },
    ],
  ),
  'iphone-15-pro': sheet(
    [
      { label: 'Pantalla', value: '6.1"' },
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'Cámara', value: '48 MP' },
      { label: 'Memoria', value: '256 GB' },
      { label: 'Material', value: 'Titanio' },
      { label: 'Carga', value: 'USB-C' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '6.1 pulgadas' },
          { label: 'Tipo', value: 'Super Retina XDR OLED' },
          { label: 'Frecuencia', value: 'ProMotion 120 Hz' },
          { label: 'Brillo', value: 'Hasta 2000 nits' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'A17 Pro' },
          { label: 'GPU', value: '6 núcleos' },
          { label: 'Almacenamiento', value: '256 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Principal', value: '48 MP' },
          { label: 'Ultra gran angular', value: '12 MP' },
          { label: 'Teleobjetivo', value: '12 MP, zoom 3x' },
          { label: 'Vídeo', value: '4K ProRes' },
        ],
      },
      {
        title: 'Batería y carga',
        rows: [
          { label: 'Reproducción de vídeo', value: 'Hasta 23 h' },
          { label: 'Carga', value: 'USB-C' },
          { label: 'MagSafe', value: 'Sí' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Red', value: '5G' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'USB', value: 'USB-C 3' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Material', value: 'Titanio' },
          { label: 'Action button', value: 'Sí' },
          { label: 'Resistencia', value: 'IP68' },
          { label: 'Peso', value: '187 g' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'iOS 18' },
          { label: 'SKU', value: 'APL-IP15P-256' },
        ],
      },
    ],
  ),
  'macbook-pro-m4': sheet(
    [
      { label: 'Pantalla', value: '14"' },
      { label: 'Chip', value: 'M4' },
      { label: 'Memoria', value: '16 GB' },
      { label: 'SSD', value: '512 GB' },
      { label: 'Batería', value: '22 h' },
      { label: 'Peso', value: '1.55 kg' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '14.2 pulgadas' },
          { label: 'Tipo', value: 'Liquid Retina XDR' },
          { label: 'Resolución', value: '3024 × 1964' },
          { label: 'Brillo', value: 'Hasta 1600 nits HDR' },
          { label: 'Frecuencia', value: 'ProMotion 120 Hz' },
          { label: 'True Tone', value: 'Sí' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'Apple M4' },
          { label: 'CPU', value: '10 núcleos' },
          { label: 'GPU', value: '10 núcleos' },
          { label: 'Neural Engine', value: '16 núcleos' },
          { label: 'Memoria unificada', value: '16 GB' },
          { label: 'Almacenamiento', value: '512 GB SSD' },
        ],
      },
      {
        title: 'Batería y alimentación',
        rows: [
          { label: 'Autonomía', value: 'Hasta 22 h de vídeo' },
          { label: 'Carga', value: 'MagSafe 3' },
          { label: 'Adaptador', value: '70 W USB-C' },
        ],
      },
      {
        title: 'Conectividad y puertos',
        rows: [
          { label: 'Thunderbolt', value: '3 puertos Thunderbolt 5' },
          { label: 'HDMI', value: 'Sí' },
          { label: 'Lector SD', value: 'SDXC' },
          { label: 'Audio', value: 'Jack 3.5 mm' },
          { label: 'MagSafe', value: '3' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
          { label: 'Bluetooth', value: '5.3' },
        ],
      },
      {
        title: 'Cámara y audio',
        rows: [
          { label: 'Cámara', value: '12 MP Center Stage' },
          { label: 'Micrófonos', value: 'Estudio de tres micrófonos' },
          { label: 'Altavoces', value: 'Sistema de seis altavoces' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Acabado', value: 'Space Black' },
          { label: 'Teclado', value: 'Magic Keyboard con Touch ID' },
          { label: 'Peso', value: '1.55 kg' },
          { label: 'Dimensiones', value: '31.26 × 22.12 × 1.55 cm' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'macOS Sequoia' },
          { label: 'SKU', value: 'APL-MBP14-M4' },
        ],
      },
    ],
  ),
  'macbook-air-m3': sheet(
    [
      { label: 'Pantalla', value: '13.6"' },
      { label: 'Chip', value: 'M3' },
      { label: 'Memoria', value: '16 GB' },
      { label: 'SSD', value: '256 GB' },
      { label: 'Batería', value: '18 h' },
      { label: 'Peso', value: '1.24 kg' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '13.6 pulgadas' },
          { label: 'Tipo', value: 'Liquid Retina' },
          { label: 'Resolución', value: '2560 × 1664' },
          { label: 'Brillo', value: '500 nits' },
          { label: 'True Tone', value: 'Sí' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'Apple M3' },
          { label: 'CPU', value: '8 núcleos' },
          { label: 'GPU', value: '10 núcleos' },
          { label: 'Memoria unificada', value: '16 GB' },
          { label: 'Almacenamiento', value: '256 GB SSD' },
        ],
      },
      {
        title: 'Batería y alimentación',
        rows: [
          { label: 'Autonomía', value: 'Hasta 18 h de vídeo' },
          { label: 'Carga', value: 'MagSafe 3' },
        ],
      },
      {
        title: 'Conectividad y puertos',
        rows: [
          { label: 'Thunderbolt', value: '2 puertos Thunderbolt / USB 4' },
          { label: 'MagSafe', value: '3' },
          { label: 'Audio', value: 'Jack 3.5 mm' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
          { label: 'Bluetooth', value: '5.3' },
        ],
      },
      {
        title: 'Cámara y audio',
        rows: [
          { label: 'Cámara', value: '1080p' },
          { label: 'Altavoces', value: 'Cuatro altavoces' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Ventilador', value: 'Sin ventilador' },
          { label: 'Peso', value: '1.24 kg' },
          { label: 'Touch ID', value: 'Sí' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'macOS Sequoia' },
          { label: 'SKU', value: 'APL-MBA13-M3' },
        ],
      },
    ],
  ),
  'ipad-pro-m4': sheet(
    [
      { label: 'Pantalla', value: '11" OLED' },
      { label: 'Chip', value: 'M4' },
      { label: 'Memoria', value: '256 GB' },
      { label: 'Cámara', value: '12 MP' },
      { label: 'Grosor', value: '5.3 mm' },
      { label: 'Pencil', value: 'Pro' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '11 pulgadas' },
          { label: 'Tipo', value: 'Ultra Retina XDR OLED tándem' },
          { label: 'Resolución', value: '2420 × 1668' },
          { label: 'Frecuencia', value: 'ProMotion 120 Hz' },
          { label: 'Brillo', value: 'Hasta 1600 nits HDR' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'Apple M4' },
          { label: 'CPU', value: '9 núcleos' },
          { label: 'GPU', value: '10 núcleos' },
          { label: 'Almacenamiento', value: '256 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Trasera', value: '12 MP gran angular' },
          { label: 'Frontal', value: '12 MP Ultra Wide Landscape' },
          { label: 'Vídeo', value: '4K ProRes' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'USB-C', value: 'Thunderbolt / USB 4' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
          { label: 'Bluetooth', value: '5.3' },
        ],
      },
      {
        title: 'Accesorios',
        rows: [
          { label: 'Apple Pencil', value: 'Apple Pencil Pro' },
          { label: 'Teclado', value: 'Magic Keyboard' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Grosor', value: '5.3 mm' },
          { label: 'Peso', value: '444 g' },
          { label: 'Face ID', value: 'Sí' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'iPadOS 18' },
          { label: 'SKU', value: 'APL-IPP11-M4' },
        ],
      },
    ],
  ),
  'ipad-air-m2': sheet(
    [
      { label: 'Pantalla', value: '11"' },
      { label: 'Chip', value: 'M2' },
      { label: 'Memoria', value: '128 GB' },
      { label: 'Cámara', value: '12 MP' },
      { label: 'Touch ID', value: 'Sí' },
      { label: 'Pencil', value: 'Pro' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '11 pulgadas' },
          { label: 'Tipo', value: 'Liquid Retina' },
          { label: 'Resolución', value: '2360 × 1640' },
          { label: 'True Tone', value: 'Sí' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'Apple M2' },
          { label: 'Almacenamiento', value: '128 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Trasera', value: '12 MP' },
          { label: 'Frontal', value: '12 MP Landscape' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'USB-C', value: 'Sí' },
          { label: 'Wi-Fi', value: 'Wi-Fi 6E' },
          { label: 'Bluetooth', value: '5.3' },
        ],
      },
      {
        title: 'Accesorios',
        rows: [
          { label: 'Apple Pencil', value: 'Apple Pencil Pro' },
          { label: 'Teclado', value: 'Magic Keyboard' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Touch ID', value: 'En el botón superior' },
          { label: 'Peso', value: '462 g' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'iPadOS 18' },
          { label: 'SKU', value: 'APL-IPA11-M2' },
        ],
      },
    ],
  ),
  'airpods-pro-2': sheet(
    [
      { label: 'Chip', value: 'H2' },
      { label: 'ANC', value: 'Adaptativo' },
      { label: 'Audio', value: 'Espacial' },
      { label: 'Autonomía', value: '6 h' },
      { label: 'Estuche', value: '30 h' },
      { label: 'Carga', value: 'USB-C' },
    ],
    [
      {
        title: 'Audio',
        rows: [
          { label: 'Cancelación de ruido', value: 'ANC adaptativa' },
          { label: 'Audio espacial', value: 'Personalizado con seguimiento' },
          { label: 'Modo Ambiente', value: 'Adaptativo' },
          { label: 'Ecualización', value: 'Adaptativa' },
        ],
      },
      {
        title: 'Chip y sensores',
        rows: [
          { label: 'Chip', value: 'H2' },
          { label: 'Micrófonos', value: 'Dos de beamforming + interior' },
          { label: 'Sensores', value: 'Piel, movimiento, presión' },
        ],
      },
      {
        title: 'Batería',
        rows: [
          { label: 'AirPods', value: 'Hasta 6 h con ANC' },
          { label: 'Con estuche', value: 'Hasta 30 h' },
          { label: 'Carga rápida', value: '1 h con 5 min' },
        ],
      },
      {
        title: 'Conectividad y carga',
        rows: [
          { label: 'Estuche', value: 'USB-C y MagSafe' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'Resistencia', value: 'IP54' },
        ],
      },
      {
        title: 'Contenido de la caja',
        rows: [
          { label: 'Incluye', value: 'AirPods Pro, estuche, puntas XS/S/M/L, cable USB-C' },
          { label: 'SKU', value: 'APL-APP2' },
        ],
      },
    ],
  ),
  'airpods-4': sheet(
    [
      { label: 'Diseño', value: 'Abierto' },
      { label: 'Autonomía', value: '5 h' },
      { label: 'Estuche', value: '24 h' },
      { label: 'Carga', value: 'USB-C' },
      { label: 'Audio', value: 'Personalizado' },
      { label: 'Gestos', value: 'Sí' },
    ],
    [
      {
        title: 'Audio',
        rows: [
          { label: 'Ajuste', value: 'Diseño abierto' },
          { label: 'Audio', value: 'Personalizado' },
          { label: 'Micrófonos', value: 'Beamforming' },
        ],
      },
      {
        title: 'Batería',
        rows: [
          { label: 'AirPods', value: 'Hasta 5 h' },
          { label: 'Con estuche', value: 'Hasta 24 h' },
        ],
      },
      {
        title: 'Conectividad y carga',
        rows: [
          { label: 'Carga', value: 'USB-C' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'Controles', value: 'Gestos en el vástago' },
        ],
      },
      {
        title: 'Contenido de la caja',
        rows: [
          { label: 'Incluye', value: 'AirPods 4, estuche USB-C, cable' },
          { label: 'SKU', value: 'APL-AP4' },
        ],
      },
    ],
  ),
  'apple-watch-series-10': sheet(
    [
      { label: 'Caja', value: '46 mm' },
      { label: 'Chip', value: 'S10' },
      { label: 'Pantalla', value: 'OLED' },
      { label: 'Batería', value: '18 h' },
      { label: 'Resistencia', value: 'WR50' },
      { label: 'GPS', value: 'Sí' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tipo', value: 'Wide-Angle OLED Always-On' },
          { label: 'Tamaño de caja', value: '46 mm' },
          { label: 'Brillo', value: 'Hasta 2000 nits' },
        ],
      },
      {
        title: 'Procesador',
        rows: [
          { label: 'Chip', value: 'S10 SiP' },
          { label: 'Neural Engine', value: '4 núcleos' },
        ],
      },
      {
        title: 'Salud y deporte',
        rows: [
          { label: 'Ritmo cardiaco', value: 'Sí' },
          { label: 'Oxígeno en sangre', value: 'Sí' },
          { label: 'Temperatura', value: 'Sí' },
          { label: 'Detección de apnea', value: 'Sí' },
          { label: 'GPS', value: 'Precisión dual' },
        ],
      },
      {
        title: 'Batería y resistencia',
        rows: [
          { label: 'Autonomía', value: 'Hasta 18 h' },
          { label: 'Carga rápida', value: '80 % en 30 min' },
          { label: 'Resistencia al agua', value: 'WR50' },
          { label: 'Polvo', value: 'IP6X' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'GPS', value: 'Sí' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'Wi-Fi', value: 'Sí' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'watchOS 11' },
          { label: 'SKU', value: 'APL-AW10' },
        ],
      },
    ],
  ),
  'apple-watch-se': sheet(
    [
      { label: 'Caja', value: '44 mm' },
      { label: 'GPS', value: 'Sí' },
      { label: 'Pantalla', value: 'Retina' },
      { label: 'Batería', value: '18 h' },
      { label: 'Detección', value: 'Accidente' },
      { label: 'Ejercicio', value: 'Sí' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tipo', value: 'Retina LTPO OLED' },
          { label: 'Tamaño de caja', value: '44 mm' },
        ],
      },
      {
        title: 'Salud y deporte',
        rows: [
          { label: 'Ritmo cardiaco', value: 'Sí' },
          { label: 'Detección de caída', value: 'Sí' },
          { label: 'Detección de accidente', value: 'Sí' },
          { label: 'App Ejercicio', value: 'Sí' },
        ],
      },
      {
        title: 'Batería y resistencia',
        rows: [
          { label: 'Autonomía', value: 'Hasta 18 h' },
          { label: 'Resistencia al agua', value: 'WR50' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'GPS', value: 'Sí' },
          { label: 'Bluetooth', value: '5.3' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'watchOS 11' },
          { label: 'SKU', value: 'APL-AWSE2' },
        ],
      },
    ],
  ),
  'magic-keyboard': sheet(
    [
      { label: 'Conexión', value: 'Bluetooth' },
      { label: 'Idioma', value: 'Español' },
      { label: 'Touch ID', value: 'Sí' },
      { label: 'Carga', value: 'USB-C' },
      { label: 'Batería', value: 'Recargable' },
      { label: 'Layout', value: 'Tijera' },
    ],
    [
      {
        title: 'Teclado',
        rows: [
          { label: 'Idioma', value: 'Español' },
          { label: 'Mecanismo', value: 'Tijera' },
          { label: 'Touch ID', value: 'Sí' },
          { label: 'Teclas de función', value: 'Sí' },
        ],
      },
      {
        title: 'Conectividad y batería',
        rows: [
          { label: 'Conexión', value: 'Bluetooth' },
          { label: 'Carga', value: 'USB-C' },
          { label: 'Batería', value: 'Integrada recargable' },
        ],
      },
      {
        title: 'Compatibilidad',
        rows: [
          { label: 'macOS', value: 'Sí' },
          { label: 'iPadOS', value: 'Sí' },
          { label: 'SKU', value: 'APL-MK-ESP' },
        ],
      },
    ],
  ),
  'apple-pencil-pro': sheet(
    [
      { label: 'Precisión', value: 'Píxel' },
      { label: 'Gesto', value: 'Apretar' },
      { label: 'Find My', value: 'Sí' },
      { label: 'Carga', value: 'USB-C' },
      { label: 'Hover', value: 'Sí' },
      { label: 'Lápiz', value: 'Magnético' },
    ],
    [
      {
        title: 'Funciones',
        rows: [
          { label: 'Precisión', value: 'Nivel de píxel' },
          { label: 'Latencia', value: 'Muy baja' },
          { label: 'Gesto de apretar', value: 'Sí' },
          { label: 'Giro', value: 'Sí' },
          { label: 'Hover', value: 'Sí' },
          { label: 'Find My', value: 'Sí' },
        ],
      },
      {
        title: 'Carga y acoplamiento',
        rows: [
          { label: 'Carga', value: 'USB-C / magnética' },
          { label: 'Emparejamiento', value: 'Automático' },
        ],
      },
      {
        title: 'Compatibilidad',
        rows: [
          { label: 'iPad Pro', value: 'M4' },
          { label: 'iPad Air', value: 'M2' },
          { label: 'SKU', value: 'APL-PENCIL-PRO' },
        ],
      },
    ],
  ),
  'samsung-galaxy-s25': sheet(
    [
      { label: 'Pantalla', value: '6.8"' },
      { label: 'Cámara', value: '200 MP' },
      { label: 'Memoria', value: '512 GB' },
      { label: 'Batería', value: '5000 mAh' },
      { label: 'IA', value: 'Galaxy AI' },
      { label: 'S Pen', value: 'Incluido' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '6.8 pulgadas' },
          { label: 'Tipo', value: 'Dynamic AMOLED 2X' },
          { label: 'Resolución', value: 'QHD+ 3120 × 1440' },
          { label: 'Frecuencia', value: '1–120 Hz adaptativo' },
          { label: 'Brillo', value: 'Hasta 2600 nits' },
          { label: 'Protección', value: 'Gorilla Armor' },
          { label: 'HDR', value: 'HDR10+' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Procesador', value: 'Snapdragon 8 Elite for Galaxy' },
          { label: 'RAM', value: '12 GB' },
          { label: 'Almacenamiento', value: '512 GB' },
          { label: 'Ranura microSD', value: 'No' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Principal', value: '200 MP, OIS' },
          { label: 'Ultra gran angular', value: '50 MP' },
          { label: 'Teleobjetivo 3x', value: '10 MP' },
          { label: 'Teleobjetivo 5x', value: '50 MP' },
          { label: 'Frontal', value: '12 MP' },
          { label: 'Vídeo', value: '8K a 30 fps / 4K a 120 fps' },
          { label: 'Zoom', value: 'Óptico 5x, digital 100x' },
        ],
      },
      {
        title: 'Batería y carga',
        rows: [
          { label: 'Capacidad', value: '5000 mAh' },
          { label: 'Carga por cable', value: '45 W' },
          { label: 'Carga inalámbrica', value: '15 W' },
          { label: 'Carga inversa', value: '4.5 W' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Red', value: '5G' },
          { label: 'Wi-Fi', value: 'Wi-Fi 7' },
          { label: 'Bluetooth', value: '5.4' },
          { label: 'NFC', value: 'Sí' },
          { label: 'USB', value: 'USB-C 3.2' },
          { label: 'SIM', value: 'Dual SIM / eSIM' },
          { label: 'S Pen', value: 'Integrado' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Material', value: 'Armor Aluminum + Gorilla Armor' },
          { label: 'Resistencia', value: 'IP68' },
          { label: 'Peso', value: '218 g' },
          { label: 'Dimensiones', value: '162.5 × 77.4 × 8.1 mm' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'Android 15, One UI 7' },
          { label: 'Galaxy AI', value: 'Sí' },
          { label: 'Actualizaciones', value: '7 años de OS y seguridad' },
          { label: 'SKU', value: 'SMS-S25U-512' },
        ],
      },
    ],
  ),
  'google-pixel-9': sheet(
    [
      { label: 'Pantalla', value: '6.3"' },
      { label: 'Chip', value: 'Tensor G4' },
      { label: 'Cámara', value: '50 MP' },
      { label: 'Memoria', value: '128 GB' },
      { label: 'IA', value: 'Gemini' },
      { label: 'Soporte', value: '7 años' },
    ],
    [
      {
        title: 'Pantalla',
        rows: [
          { label: 'Tamaño', value: '6.3 pulgadas' },
          { label: 'Tipo', value: 'Actua OLED' },
          { label: 'Resolución', value: '2424 × 1080' },
          { label: 'Frecuencia', value: '120 Hz' },
          { label: 'Protección', value: 'Gorilla Glass Victus 2' },
        ],
      },
      {
        title: 'Procesador y memoria',
        rows: [
          { label: 'Chip', value: 'Google Tensor G4' },
          { label: 'RAM', value: '12 GB' },
          { label: 'Almacenamiento', value: '128 GB' },
        ],
      },
      {
        title: 'Cámara',
        rows: [
          { label: 'Principal', value: '50 MP' },
          { label: 'Ultra gran angular', value: '48 MP' },
          { label: 'Frontal', value: '10.5 MP' },
          { label: 'Vídeo', value: '4K a 60 fps' },
          { label: 'Magic Editor', value: 'Sí' },
        ],
      },
      {
        title: 'Batería y carga',
        rows: [
          { label: 'Capacidad', value: '4700 mAh' },
          { label: 'Carga', value: '27 W' },
          { label: 'Inalámbrica', value: 'Qi' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Red', value: '5G' },
          { label: 'Wi-Fi', value: 'Wi-Fi 7' },
          { label: 'Bluetooth', value: '5.3' },
          { label: 'USB', value: 'USB-C' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Resistencia', value: 'IP68' },
          { label: 'Peso', value: '198 g' },
        ],
      },
      {
        title: 'Sistema',
        rows: [
          { label: 'Sistema operativo', value: 'Android 14' },
          { label: 'Gemini', value: 'Sí' },
          { label: 'Actualizaciones', value: '7 años' },
          { label: 'SKU', value: 'GGL-PX9-128' },
        ],
      },
    ],
  ),
  'sony-wh-1000xm5': sheet(
    [
      { label: 'ANC', value: 'Referencia' },
      { label: 'Autonomía', value: '30 h' },
      { label: 'Audio', value: 'LDAC' },
      { label: 'Peso', value: '250 g' },
      { label: 'Carga', value: 'USB-C' },
      { label: 'Micrófonos', value: '8' },
    ],
    [
      {
        title: 'Audio',
        rows: [
          { label: 'Cancelación de ruido', value: 'ANC de referencia' },
          { label: 'Códecs', value: 'LDAC, AAC, SBC' },
          { label: 'Drivers', value: '30 mm' },
          { label: 'Micrófonos', value: '8' },
        ],
      },
      {
        title: 'Batería',
        rows: [
          { label: 'Autonomía con ANC', value: 'Hasta 30 h' },
          { label: 'Carga rápida', value: '3 h con 3 min' },
          { label: 'Carga', value: 'USB-C' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Bluetooth', value: '5.2' },
          { label: 'Multipunto', value: 'Sí' },
          { label: 'Cable', value: 'Jack 3.5 mm' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Tipo', value: 'Over-ear' },
          { label: 'Peso', value: '250 g' },
          { label: 'Plegado', value: 'Estuche rígido' },
        ],
      },
      {
        title: 'Contenido de la caja',
        rows: [
          { label: 'Incluye', value: 'Auriculares, estuche, cable USB-C, cable de audio' },
          { label: 'SKU', value: 'SNY-XM5' },
        ],
      },
    ],
  ),
  'bose-qc-ultra': sheet(
    [
      { label: 'ANC', value: 'QuietComfort' },
      { label: 'Audio', value: 'Inmersivo' },
      { label: 'Autonomía', value: '24 h' },
      { label: 'Plegado', value: 'Sí' },
      { label: 'Carga', value: 'USB-C' },
      { label: 'Bluetooth', value: '5.3' },
    ],
    [
      {
        title: 'Audio',
        rows: [
          { label: 'Cancelación de ruido', value: 'QuietComfort' },
          { label: 'Modo inmersivo', value: 'Sí' },
          { label: 'Ecualización', value: 'App Bose' },
        ],
      },
      {
        title: 'Batería',
        rows: [
          { label: 'Autonomía', value: 'Hasta 24 h' },
          { label: 'Carga', value: 'USB-C' },
        ],
      },
      {
        title: 'Conectividad',
        rows: [
          { label: 'Bluetooth', value: '5.3' },
          { label: 'Snapdragon Sound', value: 'Sí' },
        ],
      },
      {
        title: 'Diseño',
        rows: [
          { label: 'Tipo', value: 'Over-ear plegable' },
          { label: 'Estuche', value: 'Incluido' },
        ],
      },
      {
        title: 'Contenido de la caja',
        rows: [
          { label: 'Incluye', value: 'Auriculares, estuche, cable USB-C, cable de audio' },
          { label: 'SKU', value: 'BSE-QCU' },
        ],
      },
    ],
  ),
}

export function getSpecSheet(slug: string, fallbackSpecs: Record<string, string>, sku: string): SpecSheet {
  const predefined = specSheets[slug]
  if (predefined) return predefined

  return {
    highlights: Object.entries(fallbackSpecs)
      .slice(0, 6)
      .map(([label, value]) => ({ label, value })),
    groups: [
      {
        title: 'Especificaciones',
        rows: [
          ...Object.entries(fallbackSpecs).map(([label, value]) => ({ label, value })),
          { label: 'SKU', value: sku },
        ],
      },
    ],
  }
}
