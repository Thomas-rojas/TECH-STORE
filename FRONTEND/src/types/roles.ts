export const ROLES = ['customer', 'wholesale', 'admin'] as const

export type Role = (typeof ROLES)[number]

export const WHOLESALE_STATUSES = ['none', 'pending', 'approved', 'rejected'] as const

export type WholesaleStatus = (typeof WHOLESALE_STATUSES)[number]

export const ROLE_LABEL: Record<Role, string> = {
  customer: 'Cliente',
  wholesale: 'Cliente mayorista',
  admin: 'Administrador',
}

export const WHOLESALE_STATUS_LABEL: Record<WholesaleStatus, string> = {
  none: 'Sin solicitud',
  pending: 'Solicitud pendiente',
  approved: 'Mayorista aprobado',
  rejected: 'Solicitud rechazada',
}

export const PERMISSIONS = {
  shop: ['customer', 'wholesale', 'admin'],
  account: ['customer', 'wholesale', 'admin'],
  adminPanel: ['admin'],
  manageUsers: ['admin'],
  manageWholesale: ['admin'],
  manageDiscounts: ['admin'],
  manageOrders: ['admin'],
  wholesalePanel: ['wholesale'],
  requestWholesale: ['customer'],
} as const

export type Permission = keyof typeof PERMISSIONS
