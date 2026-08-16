import type {
  CashDiscountRequest,
  PaymentMethod,
  Promotion,
  StoreCustomer,
  StoreOrder,
} from '@/types/admin'

export const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    enabled: true,
    cashDiscountPercent: 0,
    instructions: 'El cliente paga con tarjeta, PSE o saldo de Mercado Pago.',
  },
  {
    id: 'transfer',
    name: 'Transferencia bancaria',
    enabled: true,
    cashDiscountPercent: 0,
    instructions: 'Pide al cliente enviar el comprobante por WhatsApp después de transferir.',
  },
  {
    id: 'cash',
    name: 'Efectivo',
    enabled: true,
    cashDiscountPercent: 5,
    instructions: 'Pago en efectivo al recoger o contra entrega. Incluye un descuento automático del 5%.',
  },
]

export const defaultPromotions: Promotion[] = []
export const defaultCustomers: StoreCustomer[] = []
export const defaultOrders: StoreOrder[] = []
export const defaultCashRequests: CashDiscountRequest[] = []
