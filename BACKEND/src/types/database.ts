export type Role = 'customer' | 'wholesale' | 'admin'
export type WholesaleStatus = 'none' | 'pending' | 'approved' | 'rejected'
export type OrderStatus = 'nuevo' | 'preparando' | 'enviado' | 'entregado' | 'cancelado'
export type OrderChannel = 'retail' | 'wholesale'
export type PaymentProvider = 'mercado_pago' | 'addi' | 'bold'
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'refunded'

export interface DbUser {
  id: string
  name: string
  email: string
  phone: string
  id_type: string
  identification: string
  password_hash: string
  role: Role
  wholesale_status: WholesaleStatus
  wholesale_requested_at: string | null
  wholesale_decided_at: string | null
  wholesale_note: string
  created_at: string
  updated_at: string
}

export interface DbProduct {
  id: string
  slug: string
  sku: string
  name: string
  brand: string
  short_description: string
  description: string
  highlight: string
  price: number
  compare_at_price: number | null
  price_max: number | null
  price_from: boolean
  images: string[]
  category_id: string
  rating: number
  review_count: number
  stock: number
  specs: Record<string, string>
  tags: string[]
  featured: boolean
  is_new: boolean
  active: boolean
  created_at: string
  updated_at: string
}

export interface DbCategory {
  id: string
  slug: string
  name: string
  description: string
  image: string | null
  sort_order: number
  created_at: string
  updated_at: string
}

export interface DbOrder {
  id: string
  number: string
  user_id: string | null
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_city: string
  customer_address: string
  subtotal: number
  discount: number
  total: number
  status: OrderStatus
  channel: OrderChannel
  payment_provider: PaymentProvider | null
  payment_method_name: string
  promo_code: string | null
  notes: string
  created_at: string
  updated_at: string
}

export interface DbOrderItem {
  id: string
  order_id: string
  product_id: string
  name: string
  quantity: number
  unit_price: number
}

export interface DbPayment {
  id: string
  order_id: string
  provider: PaymentProvider
  status: PaymentStatus
  amount: number
  currency: string
  external_id: string | null
  checkout_url: string | null
  raw_create_response: unknown
  raw_webhook_payload: unknown
  created_at: string
  updated_at: string
}

export interface DbCart {
  id: string
  user_id: string | null
  session_id: string | null
  created_at: string
  updated_at: string
}

export interface DbCartItem {
  id: string
  cart_id: string
  product_id: string
  quantity: number
}

export interface DbPromotion {
  id: string
  name: string
  code: string
  type: 'percent' | 'fixed'
  value: number
  scope: 'all' | 'category' | 'product'
  category_id: string | null
  product_id: string | null
  active: boolean
  requires_code: boolean
  note: string
}

export interface DbAddress {
  id: string
  user_id: string
  label: string
  city: string
  address: string
  phone: string
  is_default: boolean
}

export interface DbRefreshToken {
  id: string
  token_hash: string
  user_id: string
  expires_at: string
}

export interface DbProductVariant {
  id: string
  product_id: string
  label: string
  color: string | null
  storage: string | null
  sku: string
  price_delta: number
  stock: number
  image: string | null
}

/** Loose typing for Supabase client — enough for our tables */
export type Database = {
  public: {
    Tables: {
      users: { Row: DbUser; Insert: Partial<DbUser> & Pick<DbUser, 'name' | 'email' | 'identification' | 'password_hash'>; Update: Partial<DbUser> }
      products: { Row: DbProduct; Insert: Partial<DbProduct>; Update: Partial<DbProduct> }
      categories: { Row: DbCategory; Insert: Partial<DbCategory>; Update: Partial<DbCategory> }
      orders: { Row: DbOrder; Insert: Partial<DbOrder>; Update: Partial<DbOrder> }
      order_items: { Row: DbOrderItem; Insert: Partial<DbOrderItem>; Update: Partial<DbOrderItem> }
      payments: { Row: DbPayment; Insert: Partial<DbPayment>; Update: Partial<DbPayment> }
      carts: { Row: DbCart; Insert: Partial<DbCart>; Update: Partial<DbCart> }
      cart_items: { Row: DbCartItem; Insert: Partial<DbCartItem>; Update: Partial<DbCartItem> }
      promotions: { Row: DbPromotion; Insert: Partial<DbPromotion>; Update: Partial<DbPromotion> }
      addresses: { Row: DbAddress; Insert: Partial<DbAddress>; Update: Partial<DbAddress> }
      refresh_tokens: { Row: DbRefreshToken; Insert: Partial<DbRefreshToken>; Update: Partial<DbRefreshToken> }
      product_variants: { Row: DbProductVariant; Insert: Partial<DbProductVariant>; Update: Partial<DbProductVariant> }
    }
  }
}
