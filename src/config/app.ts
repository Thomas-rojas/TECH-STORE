import { env } from '@/config/env'

export const appConfig = {
  name: env.appName,
  description: env.appDescription,
  supportEmail: 'hola@importcas.com',
  currency: env.currency,
  locale: env.locale,
  catalog: {
    pageSize: 12,
    maxCompareAtDiscount: 0.7,
  },
  cart: {
    maxQuantityPerItem: 99,
    retailMaxQuantity: 10,
  },
  wholesale: {
    maxQuantityPerItem: 99,
  },
} as const
