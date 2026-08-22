import type { PaymentProvider } from './interfaces/PaymentProvider'
import type { PaymentProviderId } from './payment.types'
import { addiProvider } from './providers/addi.provider'
import { boldProvider } from './providers/bold.provider'
import { mercadoPagoProvider } from './providers/mercadoPago.provider'
import { AppError } from '../../utils/errors'

const registry: Record<PaymentProviderId, PaymentProvider> = {
  mercado_pago: mercadoPagoProvider,
  addi: addiProvider,
  bold: boldProvider,
}

export function getPaymentProvider(id: string): PaymentProvider {
  const provider = registry[id as PaymentProviderId]
  if (!provider) {
    throw new AppError(400, `Pasarela no soportada: ${id}`)
  }
  return provider
}

export function listPaymentProviders(): PaymentProviderId[] {
  return Object.keys(registry) as PaymentProviderId[]
}
