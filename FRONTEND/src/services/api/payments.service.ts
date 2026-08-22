import { apiClient } from '@/services/api/client'
import type {
  CreatePaymentRequest,
  CreatePaymentResult,
  PaymentProviderId,
  PaymentStatusResult,
} from '@/types/payment'

export const paymentsService = {
  create(provider: PaymentProviderId, payload: CreatePaymentRequest) {
    return apiClient
      .post<CreatePaymentResult>(`/payments/${provider}/create`, payload)
      .then((response) => response.data)
  },

  getStatus(orderId: string) {
    return apiClient
      .get<PaymentStatusResult>(`/payments/${orderId}/status`)
      .then((response) => response.data)
  },
}
