import type { Role, WholesaleStatus } from '@/types/roles'

export const ID_TYPES = ['Cédula', 'Cédula extranjería', 'NIT', 'Pasaporte'] as const

export type IdType = (typeof ID_TYPES)[number]

export interface CustomerAccount {
  id: string
  name: string
  email: string
  phone: string
  idType: IdType
  identification: string
  password: string
  createdAt: string
  role: Role
  wholesaleStatus: WholesaleStatus
  wholesaleRequestedAt?: string
  wholesaleDecidedAt?: string
  wholesaleNote?: string
}

export interface CustomerRegisterPayload {
  name: string
  email: string
  phone: string
  idType: IdType
  identification: string
  requestWholesale?: boolean
}
