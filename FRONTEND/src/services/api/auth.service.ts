import { apiClient } from '@/services/api/client'
import type { CustomerAccount, CustomerRegisterPayload } from '@/types/customer-auth'

export interface AuthSessionResponse {
  user: Omit<CustomerAccount, 'password'>
  accessToken: string
  refreshToken?: string
}

export const authService = {
  login(identification: string, password: string) {
    return apiClient
      .post<AuthSessionResponse>('/auth/login', { identification, password })
      .then((response) => response.data)
  },

  register(payload: CustomerRegisterPayload & { password: string }) {
    return apiClient
      .post<AuthSessionResponse>('/auth/register', payload)
      .then((response) => response.data)
  },

  me(accessToken: string) {
    return apiClient
      .get<{ user: Omit<CustomerAccount, 'password'> }>('/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => response.data)
  },
}
