import { ADMIN_DEFAULT_IDENTIFICATION, ADMIN_DEFAULT_PASSWORD } from '@/constants/admin'
import { STORAGE_KEYS } from '@/constants/storage-keys'
import { localStorageService } from '@/services/storage/local-storage'
import type { CustomerAccount, CustomerRegisterPayload } from '@/types/customer-auth'
import type { Role, WholesaleStatus } from '@/types/roles'
import { uid } from '@/utils/format'
import { create } from 'zustand'

interface CustomerAuthPersisted {
  version: number
  accounts: CustomerAccount[]
  sessionId: string | null
}

interface CustomerAuthStore {
  accounts: CustomerAccount[]
  session: CustomerAccount | null
  login: (identification: string, password: string) => 'ok' | 'not-found' | 'wrong'
  register: (payload: CustomerRegisterPayload) => 'ok' | 'id-taken' | 'email-taken'
  logout: () => void
  requestWholesale: (note?: string) => 'ok' | 'unauthenticated' | 'not-allowed'
  decideWholesale: (id: string, status: Extract<WholesaleStatus, 'approved' | 'rejected'>, note?: string) => void
  setRole: (id: string, role: Role) => boolean
  updateAccount: (id: string, patch: Partial<Pick<CustomerAccount, 'name' | 'email' | 'phone'>>) => void
  changeOwnPassword: (current: string, next: string) => 'ok' | 'wrong' | 'short' | 'unauthenticated'
  removeAccount: (id: string) => void
}

const AUTH_VERSION = 2

function normalizeId(value: string): string {
  return value.replace(/\s+/g, '').toLowerCase()
}

function persist(state: CustomerAuthPersisted): void {
  localStorageService.write(STORAGE_KEYS.customerAuth, state)
}

function resolveRole(raw: Partial<CustomerAccount>, wholesaleStatus: WholesaleStatus): Role {
  if (raw.role === 'admin') return 'admin'
  if (raw.role === 'wholesale' || wholesaleStatus === 'approved') return 'wholesale'
  return 'customer'
}

function hydrateAccount(raw: Partial<CustomerAccount>): CustomerAccount {
  const wholesaleStatus = raw.wholesaleStatus ?? 'none'
  const role = resolveRole(raw, wholesaleStatus)
  return {
    id: raw.id ?? uid('acc'),
    name: raw.name ?? '',
    email: raw.email ?? '',
    phone: raw.phone ?? '',
    idType: raw.idType ?? 'Cédula',
    identification: raw.identification ?? '',
    password: raw.password ?? '',
    createdAt: raw.createdAt ?? new Date().toISOString(),
    role,
    wholesaleStatus: role === 'wholesale' ? 'approved' : role === 'admin' ? 'none' : wholesaleStatus,
    wholesaleRequestedAt: raw.wholesaleRequestedAt,
    wholesaleDecidedAt: raw.wholesaleDecidedAt,
    wholesaleNote: raw.wholesaleNote,
  }
}

function panelPassword(): string {
  const saved = localStorageService.read<{ password?: string } | null>(STORAGE_KEYS.admin, null)
  return saved?.password?.trim() || ADMIN_DEFAULT_PASSWORD
}

function ensureDefaultAdmin(accounts: CustomerAccount[]): CustomerAccount[] {
  if (accounts.some((item) => item.role === 'admin')) return accounts
  const admin: CustomerAccount = {
    id: 'acc-admin',
    name: 'Administrador',
    email: 'admin@importcas.com',
    phone: '',
    idType: 'Cédula',
    identification: ADMIN_DEFAULT_IDENTIFICATION,
    password: panelPassword(),
    createdAt: new Date().toISOString(),
    role: 'admin',
    wholesaleStatus: 'none',
  }
  return [admin, ...accounts]
}

function load(): { accounts: CustomerAccount[]; session: CustomerAccount | null } {
  const saved = localStorageService.read<Partial<CustomerAuthPersisted> | null>(
    STORAGE_KEYS.customerAuth,
    null,
  )
  const accounts = ensureDefaultAdmin((saved?.accounts ?? []).map(hydrateAccount))
  const session = accounts.find((item) => item.id === saved?.sessionId) ?? null
  persist({ version: AUTH_VERSION, accounts, sessionId: session?.id ?? null })
  return { accounts, session }
}

export const useCustomerAuthStore = create<CustomerAuthStore>((set, get) => ({
  ...load(),

  login: (identification, password) => {
    const id = normalizeId(identification)
    const account = get().accounts.find((item) => normalizeId(item.identification) === id)
    if (!account) return 'not-found'
    if (account.password !== password.trim()) return 'wrong'
    persist({ version: AUTH_VERSION, accounts: get().accounts, sessionId: account.id })
    set({ session: account })
    return 'ok'
  },

  register: (payload) => {
    const identification = payload.identification.replace(/\s+/g, '').trim()
    const email = payload.email.trim().toLowerCase()
    const accounts = get().accounts

    if (accounts.some((item) => normalizeId(item.identification) === normalizeId(identification))) {
      return 'id-taken'
    }
    if (accounts.some((item) => item.email.toLowerCase() === email)) {
      return 'email-taken'
    }

    const requestWholesale = Boolean(payload.requestWholesale)
    const account: CustomerAccount = {
      id: uid('acc'),
      name: payload.name.trim(),
      email,
      phone: payload.phone.trim(),
      idType: payload.idType,
      identification,
      password: identification,
      createdAt: new Date().toISOString(),
      role: 'customer',
      wholesaleStatus: requestWholesale ? 'pending' : 'none',
      wholesaleRequestedAt: requestWholesale ? new Date().toISOString() : undefined,
    }
    const next = [account, ...accounts]
    persist({ version: AUTH_VERSION, accounts: next, sessionId: account.id })
    set({ accounts: next, session: account })
    return 'ok'
  },

  logout: () => {
    persist({ version: AUTH_VERSION, accounts: get().accounts, sessionId: null })
    set({ session: null })
  },

  requestWholesale: (note) => {
    const session = get().session
    if (!session) return 'unauthenticated'
    if (session.role === 'admin') return 'not-allowed'
    if (session.wholesaleStatus === 'approved' || session.wholesaleStatus === 'pending') {
      return 'not-allowed'
    }
    const accounts = get().accounts.map((item) =>
      item.id === session.id
        ? {
            ...item,
            wholesaleStatus: 'pending' as const,
            wholesaleRequestedAt: new Date().toISOString(),
            wholesaleNote: note?.trim() || item.wholesaleNote,
          }
        : item,
    )
    const nextSession = accounts.find((item) => item.id === session.id) ?? null
    persist({ version: AUTH_VERSION, accounts, sessionId: session.id })
    set({ accounts, session: nextSession })
    return 'ok'
  },

  decideWholesale: (id, status, note) => {
    const decidedAt = new Date().toISOString()
    const accounts = get().accounts.map((item) => {
      if (item.id !== id || item.role === 'admin') return item
      return {
        ...item,
        role: status === 'approved' ? ('wholesale' as const) : ('customer' as const),
        wholesaleStatus: status,
        wholesaleDecidedAt: decidedAt,
        wholesaleNote: note?.trim() || item.wholesaleNote,
      }
    })
    const sessionId = get().session?.id ?? null
    persist({ version: AUTH_VERSION, accounts, sessionId })
    set({
      accounts,
      session: accounts.find((item) => item.id === sessionId) ?? null,
    })
  },

  setRole: (id, role) => {
    const currentAdmins = get().accounts.filter((item) => item.role === 'admin')
    const target = get().accounts.find((item) => item.id === id)
    if (target?.role === 'admin' && role !== 'admin' && currentAdmins.length <= 1) {
      return false
    }
    const accounts = get().accounts.map((item) => {
      if (item.id !== id) return item
      return {
        ...item,
        role,
        wholesaleStatus: role === 'wholesale' ? ('approved' as const) : ('none' as const),
        wholesaleDecidedAt: new Date().toISOString(),
      }
    })
    const sessionId = get().session?.id ?? null
    persist({ version: AUTH_VERSION, accounts, sessionId })
    set({
      accounts,
      session: accounts.find((item) => item.id === sessionId) ?? null,
    })
    return true
  },

  updateAccount: (id, patch) => {
    const accounts = get().accounts.map((item) => (item.id === id ? { ...item, ...patch } : item))
    const sessionId = get().session?.id ?? null
    persist({ version: AUTH_VERSION, accounts, sessionId })
    set({
      accounts,
      session: accounts.find((item) => item.id === sessionId) ?? null,
    })
  },

  changeOwnPassword: (current, next) => {
    const session = get().session
    if (!session) return 'unauthenticated'
    if (session.password !== current.trim()) return 'wrong'
    const password = next.trim()
    if (password.length < 4) return 'short'
    const accounts = get().accounts.map((item) => (item.id === session.id ? { ...item, password } : item))
    persist({ version: AUTH_VERSION, accounts, sessionId: session.id })
    set({ accounts, session: accounts.find((item) => item.id === session.id) ?? null })
    return 'ok'
  },

  removeAccount: (id) => {
    const target = get().accounts.find((item) => item.id === id)
    const adminCount = get().accounts.filter((item) => item.role === 'admin').length
    if (target?.role === 'admin' && adminCount <= 1) return
    const accounts = get().accounts.filter((item) => item.id !== id)
    const sessionId = get().session?.id === id ? null : (get().session?.id ?? null)
    persist({ version: AUTH_VERSION, accounts, sessionId })
    set({
      accounts,
      session: accounts.find((item) => item.id === sessionId) ?? null,
    })
  },
}))
