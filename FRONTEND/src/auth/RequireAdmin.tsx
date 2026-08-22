import { canAccessAdminPanel } from '@/auth/permissions'
import { ROUTES } from '@/constants/routes'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const session = useCustomerAuthStore((state) => state.session)
  if (!canAccessAdminPanel(session)) {
    return <Navigate to={ROUTES.adminLogin} replace />
  }
  return children
}
