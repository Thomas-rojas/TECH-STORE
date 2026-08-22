import type { CustomerAccount } from '@/types/customer-auth'
import type { Permission, Role, WholesaleStatus } from '@/types/roles'
import { PERMISSIONS } from '@/types/roles'

export function isAdmin(account: CustomerAccount | null | undefined): boolean {
  return account?.role === 'admin'
}

export function isWholesaleApproved(account: CustomerAccount | null | undefined): boolean {
  return Boolean(account && account.role === 'wholesale' && account.wholesaleStatus === 'approved')
}

export function canRequestWholesale(account: CustomerAccount | null | undefined): boolean {
  if (!account || isAdmin(account) || isWholesaleApproved(account)) return false
  return account.wholesaleStatus === 'none' || account.wholesaleStatus === 'rejected'
}

export function hasPermission(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false
  return (PERMISSIONS[permission] as readonly Role[]).includes(role)
}

export function canAccessAdminPanel(account: CustomerAccount | null | undefined): boolean {
  return hasPermission(account?.role, 'adminPanel')
}

export function canAccessWholesalePanel(account: CustomerAccount | null | undefined): boolean {
  return hasPermission(account?.role, 'wholesalePanel') && isWholesaleApproved(account)
}

export function wholesaleBadge(status: WholesaleStatus): string {
  if (status === 'approved') return 'Mayorista'
  if (status === 'pending') return 'Pendiente mayorista'
  if (status === 'rejected') return 'Rechazado'
  return 'Cliente'
}
