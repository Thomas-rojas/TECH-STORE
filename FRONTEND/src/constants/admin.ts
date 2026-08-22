import { ROUTES } from '@/constants/routes'

export const ADMIN_DEFAULT_PASSWORD = 'importcas'
export const ADMIN_DEFAULT_IDENTIFICATION = 'admin'

export const ADMIN_NAV = [
  {
    to: ROUTES.admin,
    label: 'Inicio',
    hint: 'Resumen del día',
  },
  {
    to: ROUTES.adminProducts,
    label: 'Productos',
    hint: 'Agregar, editar o quitar',
  },
  {
    to: ROUTES.adminPrices,
    label: 'Precios',
    hint: 'Cambiar valores rápido',
  },
  {
    to: ROUTES.adminPromos,
    label: 'Promociones',
    hint: 'Descuentos y códigos',
  },
  {
    to: ROUTES.adminOrders,
    label: 'Pedidos',
    hint: 'Ver y actualizar ventas',
  },
  {
    to: ROUTES.adminCustomers,
    label: 'Clientes',
    hint: 'Normales y mayoristas',
  },
  {
    to: ROUTES.adminWholesale,
    label: 'Mayorista',
    hint: 'Precios, descuentos y solicitudes',
  },
  {
    to: ROUTES.adminPayments,
    label: 'Medios de pago',
    hint: 'Cómo te pagan',
  },
  {
    to: ROUTES.adminCash,
    label: 'Descuento en efectivo',
    hint: 'Aprobar o rechazar',
  },
  {
    to: ROUTES.adminPassword,
    label: 'Cambiar clave',
    hint: 'Clave para entrar al panel',
  },
] as const

export const ORDER_STATUS_LABEL: Record<string, string> = {
  nuevo: 'Nuevo',
  preparando: 'Preparando',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
}

export const CASH_STATUS_LABEL: Record<string, string> = {
  pendiente: 'Pendiente',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
}
