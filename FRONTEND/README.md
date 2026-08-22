# Nexus — Frontend

Arquitectura del frontend para un e-commerce de productos tecnológicos.

Este proyecto cubre **solo la capa de presentación**. No incluye backend, base de datos, API real, autenticación, pagos ni infraestructura.

## Stack

| Capa | Tecnología |
| --- | --- |
| UI | React 19 + TypeScript |
| Bundler | Vite |
| Estilos | Tailwind CSS |
| Rutas | React Router |
| Estado cliente | Zustand |
| HTTP | Axios (preparado, sin backend) |

## Arranque

```bash
cd frontend
npm install
npm run dev
```

Build de producción: `npm run build`

## Estructura

```
frontend/
├── public/
├── src/
│   ├── assets/            # Imágenes, iconos y estáticos importados
│   ├── components/
│   │   ├── ui/            # Piezas atómicas (Button, Input, Modal…)
│   │   ├── layout/        # Header, Footer, CartDrawer, navegación
│   │   └── shared/        # Compuestos de dominio (ProductCard, filtros…)
│   ├── pages/             # Pantallas: una ruta = una página
│   ├── layouts/           # Shells de página (Main, Checkout)
│   ├── routes/            # Router y helpers de paths
│   ├── hooks/             # Orquestación: servicios + stores
│   ├── stores/            # Estado cliente (carrito, UI, favoritos)
│   ├── services/
│   │   ├── api/           # Contrato de datos (hoy mock, mañana HTTP)
│   │   └── storage/       # Persistencia local (localStorage)
│   ├── types/             # Modelos TypeScript
│   ├── utils/             # Funciones puras (formato, classnames)
│   ├── constants/         # Rutas, claves, catálogo
│   ├── config/            # Entorno y configuración de la app
│   ├── data/              # Catálogo mock (solo frontend)
│   ├── styles/            # Tailwind + tema
│   ├── App.tsx
│   └── main.tsx
├── .env
├── .env.example
└── …
```

## Flujo de responsabilidades

```
Página → Hook → Service / Store → UI
```

- **Pages**: componen la pantalla. No conocen Axios ni `localStorage`.
- **Hooks**: cargan datos, sincronizan filtros y exponen acciones.
- **Services / api**: contrato estable (`list`, `getBySlug`, `getFeatured`). Hoy leen `src/data`. Cuando exista backend, el cuerpo de cada método pasa a `apiClient`.
- **Services / storage**: persisten carrito y favoritos.
- **Stores**: estado de sesión (carrito, drawer, wishlist).
- **Components / ui**: sin reglas de negocio.
- **Components / shared**: saben de `Product`, precios y catálogo, no de HTTP.

## Rutas

| Path | Página |
| --- | --- |
| `/` | Home |
| `/catalogo` | Catálogo y búsqueda (`?q=`) |
| `/catalogo/:categorySlug` | Catálogo filtrado |
| `/producto/:slug` | Detalle |
| `/carrito` | Carrito |
| `/favoritos` | Wishlist |
| `/checkout` | Shell de checkout (sin pagos) |

## Estado

| Store | Responsabilidad | Persistencia |
| --- | --- | --- |
| `cart.store` | Líneas del carrito | `services/storage` |
| `wishlist.store` | IDs favoritos | `services/storage` |
| `ui.store` | Drawer y menú móvil | Memoria |

Los filtros del catálogo viven en la URL (`q`, `sort`, `page`) para que sean compartibles.

## Cómo conectar un backend más adelante

1. Definir `VITE_API_BASE_URL` en `.env`.
2. Sustituir el cuerpo de `productsService` y `categoriesService` por llamadas a `apiClient`.
3. Mantener las firmas de los servicios para no tocar pages ni hooks.

Axios ya está instanciado en `src/services/api/client.ts`.

## Fuera de este alcance

Autenticación, pagos, pedidos persistidos, inventario real, CMS e infraestructura.
