import { env } from '@/config/env'

export const appConfig = {
  name: env.appName,
  description: env.appDescription,
  supportEmail: 'hola@techstore.com',
  currency: env.currency,
  locale: env.locale,
  catalog: {
    pageSize: 12,
    maxCompareAtDiscount: 0.7,
  },
  cart: {
    maxQuantityPerItem: 10,
  },
} as const
