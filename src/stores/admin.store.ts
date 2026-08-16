import { ADMIN_DEFAULT_PASSWORD } from '@/constants/admin'
import { STORAGE_KEYS } from '@/constants/storage-keys'
import { defaultPaymentMethods } from '@/data/admin-seed'
import { localStorageService } from '@/services/storage/local-storage'
import type {
  CashDiscountRequest,
  CashRequestStatus,
  CheckoutPayload,
  OrderCustomer,
  OrderStatus,
  PaymentMethod,
  Promotion,
  StoreCustomer,
  StoreOrder,
} from '@/types/admin'
import type { CartLine } from '@/types/cart'
import { uid } from '@/utils/format'
import { create } from 'zustand'

interface AdminPersisted {
  version: number
  password: string
  session: boolean
  orders: StoreOrder[]
  customers: StoreCustomer[]
  promotions: Promotion[]
  paymentMethods: PaymentMethod[]
  cashRequests: CashDiscountRequest[]
}

interface AdminStore extends AdminPersisted {
  login: (password: string) => boolean
  logout: () => void
  changePassword: (current: string, next: string) => 'ok' | 'wrong' | 'short'
  upsertCustomer: (customer: StoreCustomer) => void
  removeCustomer: (id: string) => void
  setOrderStatus: (id: string, status: OrderStatus) => void
  saveOrderNotes: (id: string, notes: string) => void
  upsertPromotion: (promo: Promotion) => void
  removePromotion: (id: string) => void
  upsertPaymentMethod: (method: PaymentMethod) => void
  decideCashRequest: (id: string, status: CashRequestStatus, adminNote: string) => void
  placeOrder: (payload: CheckoutPayload, lines: CartLine[]) => StoreOrder
}

const ADMIN_DATA_VERSION = 2

const emptyState: AdminPersisted = {
  version: ADMIN_DATA_VERSION,
  password: ADMIN_DEFAULT_PASSWORD,
  session: false,
  orders: [],
  customers: [],
  promotions: [],
  paymentMethods: defaultPaymentMethods,
  cashRequests: [],
}

function load(): AdminPersisted {
  const saved = localStorageService.read<Partial<AdminPersisted> | null>(STORAGE_KEYS.admin, null)
  if (!saved || saved.version !== ADMIN_DATA_VERSION) {
    const next: AdminPersisted = {
      ...emptyState,
      password: saved?.password || ADMIN_DEFAULT_PASSWORD,
      session: Boolean(saved?.session),
      paymentMethods: saved?.paymentMethods?.length ? saved.paymentMethods : defaultPaymentMethods,
    }
    localStorageService.write(STORAGE_KEYS.admin, next)
    return next
  }
  return {
    version: ADMIN_DATA_VERSION,
    password: saved.password || ADMIN_DEFAULT_PASSWORD,
    session: Boolean(saved.session),
    orders: Array.isArray(saved.orders) ? saved.orders : [],
    customers: Array.isArray(saved.customers) ? saved.customers : [],
    promotions: Array.isArray(saved.promotions) ? saved.promotions : [],
    paymentMethods: saved.paymentMethods?.length ? saved.paymentMethods : defaultPaymentMethods,
    cashRequests: Array.isArray(saved.cashRequests) ? saved.cashRequests : [],
  }
}

function persist(state: AdminPersisted): AdminPersisted {
  localStorageService.write(STORAGE_KEYS.admin, state)
  return state
}

function snapshot(get: () => AdminStore): AdminPersisted {
  const { password, session, orders, customers, promotions, paymentMethods, cashRequests } = get()
  return {
    version: ADMIN_DATA_VERSION,
    password,
    session,
    orders,
    customers,
    promotions,
    paymentMethods,
    cashRequests,
  }
}

function nextOrderNumber(orders: StoreOrder[]): string {
  const nums = orders
    .map((order) => Number(order.number.replace(/\D/g, '')))
    .filter((value) => Number.isFinite(value))
  const max = nums.length ? Math.max(...nums) : 1000
  return `IC-${max + 1}`
}

export function promoMatches(
  promo: Promotion,
  items: { productId: string; categoryId?: string }[],
): boolean {
  if (promo.scope === 'all') return true
  if (promo.scope === 'category') {
    return items.some((item) => item.categoryId === promo.categoryId)
  }
  return items.some((item) => item.productId === promo.productId)
}

export function computeDiscount(
  promotions: Promotion[],
  paymentMethods: PaymentMethod[],
  lines: CartLine[],
  paymentMethodId: string,
  promoCode?: string,
): { discount: number; promoCode?: string } {
  const items = lines.map((line) => ({
    productId: line.productId,
    categoryId: line.product.categoryId,
    amount: (line.unitPrice ?? line.product.price) * line.quantity,
  }))
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  let discount = 0
  let appliedCode: string | undefined

  const eligible = promotions.filter((promo) => promo.active)
  const automatic = eligible.filter((promo) => !promo.requiresCode)
  const coded = promoCode
    ? eligible.find(
        (promo) => promo.requiresCode && promo.code.toUpperCase() === promoCode.trim().toUpperCase(),
      )
    : undefined

  for (const promo of [...automatic, ...(coded ? [coded] : [])]) {
    if (!promoMatches(promo, items)) continue
    const base =
      promo.scope === 'all'
        ? subtotal
        : items
            .filter((item) =>
              promo.scope === 'category'
                ? item.categoryId === promo.categoryId
                : item.productId === promo.productId,
            )
            .reduce((sum, item) => sum + item.amount, 0)
    const amount = promo.type === 'percent' ? Math.round(base * (promo.value / 100)) : promo.value
    discount += amount
    if (promo.requiresCode && promo.code) appliedCode = promo.code.toUpperCase()
  }

  const method = paymentMethods.find((item) => item.id === paymentMethodId)
  if (method?.enabled && method.cashDiscountPercent > 0) {
    discount += Math.round(subtotal * (method.cashDiscountPercent / 100))
  }

  return { discount: Math.min(discount, subtotal), promoCode: appliedCode }
}

function upsertCustomerFromOrder(
  customers: StoreCustomer[],
  customer: OrderCustomer,
  spent: number,
): StoreCustomer[] {
  const existing = customers.find(
    (item) => item.email.trim().toLowerCase() === customer.email.trim().toLowerCase(),
  )
  if (existing) {
    return customers.map((item) =>
      item.id === existing.id
        ? {
            ...item,
            name: customer.name,
            phone: customer.phone,
            city: customer.city,
            orderCount: item.orderCount + 1,
            totalSpent: item.totalSpent + spent,
          }
        : item,
    )
  }
  return [
    {
      id: uid('cus'),
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      city: customer.city,
      notes: '',
      createdAt: new Date().toISOString(),
      orderCount: 1,
      totalSpent: spent,
    },
    ...customers,
  ]
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  ...load(),

  login: (password) => {
    if (password.trim() !== get().password) return false
    persist({ ...snapshot(get), session: true })
    set({ session: true })
    return true
  },

  logout: () => {
    persist({ ...snapshot(get), session: false })
    set({ session: false })
  },

  changePassword: (current, next) => {
    if (current.trim() !== get().password) return 'wrong'
    const password = next.trim()
    if (password.length < 4) return 'short'
    persist({ ...snapshot(get), password })
    set({ password })
    return 'ok'
  },

  upsertCustomer: (customer) => {
    const current = get().customers
    const exists = current.some((item) => item.id === customer.id)
    const customers = exists
      ? current.map((item) => (item.id === customer.id ? customer : item))
      : [customer, ...current]
    persist({ ...snapshot(get), customers })
    set({ customers })
  },

  removeCustomer: (id) => {
    const customers = get().customers.filter((item) => item.id !== id)
    persist({ ...snapshot(get), customers })
    set({ customers })
  },

  setOrderStatus: (id, status) => {
    const orders = get().orders.map((order) => (order.id === id ? { ...order, status } : order))
    persist({ ...snapshot(get), orders })
    set({ orders })
  },

  saveOrderNotes: (id, notes) => {
    const orders = get().orders.map((order) => (order.id === id ? { ...order, notes } : order))
    persist({ ...snapshot(get), orders })
    set({ orders })
  },

  upsertPromotion: (promo) => {
    const current = get().promotions
    const exists = current.some((item) => item.id === promo.id)
    const promotions = exists
      ? current.map((item) => (item.id === promo.id ? promo : item))
      : [promo, ...current]
    persist({ ...snapshot(get), promotions })
    set({ promotions })
  },

  removePromotion: (id) => {
    const promotions = get().promotions.filter((item) => item.id !== id)
    persist({ ...snapshot(get), promotions })
    set({ promotions })
  },

  upsertPaymentMethod: (method) => {
    const current = get().paymentMethods
    const exists = current.some((item) => item.id === method.id)
    const paymentMethods = exists
      ? current.map((item) => (item.id === method.id ? method : item))
      : [...current, method]
    persist({ ...snapshot(get), paymentMethods })
    set({ paymentMethods })
  },

  decideCashRequest: (id, status, adminNote) => {
    const decidedAt = new Date().toISOString()
    const cashRequests = get().cashRequests.map((item) =>
      item.id === id ? { ...item, status, adminNote, decidedAt } : item,
    )
    let orders = get().orders
    const request = cashRequests.find((item) => item.id === id)
    if (status === 'aprobada' && request?.orderId) {
      orders = orders.map((order) => {
        if (order.id !== request.orderId) return order
        const extra = Math.round(order.subtotal * (request.requestedPercent / 100))
        const discount = Math.min(order.subtotal, order.discount + extra)
        return { ...order, discount, total: Math.max(0, order.subtotal - discount) }
      })
    }
    persist({ ...snapshot(get), cashRequests, orders })
    set({ cashRequests, orders })
  },

  placeOrder: (payload, lines) => {
    const { discount, promoCode } = computeDiscount(
      get().promotions,
      get().paymentMethods,
      lines,
      payload.paymentMethodId,
      payload.promoCode,
    )
    const subtotal = lines.reduce(
      (sum, line) => sum + (line.unitPrice ?? line.product.price) * line.quantity,
      0,
    )
    const method = get().paymentMethods.find((item) => item.id === payload.paymentMethodId)
    const orderId = uid('ord')
    let cashRequestId: string | undefined
    let cashRequests = get().cashRequests

    if (payload.requestCashDiscount && method?.id === 'cash') {
      cashRequestId = uid('cash')
      cashRequests = [
        {
          id: cashRequestId,
          createdAt: new Date().toISOString(),
          customerName: payload.customer.name,
          email: payload.customer.email,
          phone: payload.customer.phone,
          orderId,
          orderNumber: '',
          orderTotal: Math.max(0, subtotal - discount),
          requestedPercent: payload.cashDiscountPercent || 5,
          message: payload.cashMessage?.trim() || 'Solicitud de descuento por pago en efectivo.',
          status: 'pendiente',
          adminNote: '',
        },
        ...cashRequests,
      ]
    }

    const number = nextOrderNumber(get().orders)
    const order: StoreOrder = {
      id: orderId,
      number,
      createdAt: new Date().toISOString(),
      customer: payload.customer,
      items: lines.map((line) => ({
        productId: line.productId,
        name: line.product.name,
        quantity: line.quantity,
        unitPrice: line.unitPrice ?? line.product.price,
      })),
      subtotal,
      discount,
      total: Math.max(0, subtotal - discount),
      paymentMethodId: payload.paymentMethodId,
      paymentMethodName: method?.name ?? 'Pago',
      status: 'nuevo',
      notes: payload.notes?.trim() ?? '',
      promoCode,
      cashRequestId,
      channel: payload.channel ?? 'retail',
    }

    if (cashRequestId) {
      cashRequests = cashRequests.map((item) =>
        item.id === cashRequestId ? { ...item, orderNumber: number } : item,
      )
    }

    const customers = upsertCustomerFromOrder(get().customers, payload.customer, order.total)
    const orders = [order, ...get().orders]
    persist({ ...snapshot(get), orders, customers, cashRequests })
    set({ orders, customers, cashRequests })
    return order
  },
}))
