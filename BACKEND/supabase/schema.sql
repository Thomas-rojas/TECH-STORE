-- ImportCAS schema for Supabase (PostgreSQL)
-- Run in Supabase SQL Editor or: supabase db push

create extension if not exists "pgcrypto";

create table if not exists users (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  name text not null,
  email text not null unique,
  phone text not null default '',
  id_type text not null default 'Cédula',
  identification text not null unique,
  password_hash text not null,
  role text not null default 'customer' check (role in ('customer', 'wholesale', 'admin')),
  wholesale_status text not null default 'none'
    check (wholesale_status in ('none', 'pending', 'approved', 'rejected')),
  wholesale_requested_at timestamptz,
  wholesale_decided_at timestamptz,
  wholesale_note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists refresh_tokens (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  token_hash text not null unique,
  user_id text not null references users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists addresses (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  user_id text not null references users(id) on delete cascade,
  label text not null default 'Principal',
  city text not null,
  address text not null,
  phone text not null default '',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists categories (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  slug text not null unique,
  name text not null,
  description text not null default '',
  image text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  slug text not null unique,
  sku text not null unique,
  name text not null,
  brand text not null,
  short_description text not null default '',
  description text not null default '',
  highlight text not null default '',
  price int not null,
  compare_at_price int,
  price_max int,
  price_from boolean not null default false,
  images text[] not null default '{}',
  category_id text not null references categories(id),
  rating double precision not null default 0,
  review_count int not null default 0,
  stock int not null default 0,
  specs jsonb not null default '{}'::jsonb,
  tags text[] not null default '{}',
  featured boolean not null default false,
  is_new boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_variants (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  product_id text not null references products(id) on delete cascade,
  label text not null,
  color text,
  storage text,
  sku text not null unique,
  price_delta int not null default 0,
  stock int not null default 0,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists carts (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  user_id text references users(id) on delete cascade,
  session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cart_items (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  cart_id text not null references carts(id) on delete cascade,
  product_id text not null references products(id),
  quantity int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

create table if not exists orders (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  number text not null unique,
  user_id text references users(id) on delete set null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_city text not null,
  customer_address text not null,
  subtotal int not null,
  discount int not null default 0,
  total int not null,
  status text not null default 'nuevo'
    check (status in ('nuevo', 'preparando', 'enviado', 'entregado', 'cancelado')),
  channel text not null default 'retail' check (channel in ('retail', 'wholesale')),
  payment_provider text check (payment_provider in ('mercado_pago', 'addi', 'bold')),
  payment_method_name text not null default '',
  promo_code text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  order_id text not null references orders(id) on delete cascade,
  product_id text not null references products(id),
  name text not null,
  quantity int not null,
  unit_price int not null
);

create table if not exists payments (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  order_id text not null references orders(id) on delete cascade,
  provider text not null check (provider in ('mercado_pago', 'addi', 'bold')),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'approved', 'rejected', 'cancelled', 'refunded')),
  amount int not null,
  currency text not null default 'COP',
  external_id text,
  checkout_url text,
  raw_create_response jsonb,
  raw_webhook_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists promotions (
  id text primary key default encode(gen_random_bytes(12), 'hex'),
  name text not null,
  code text not null unique,
  type text not null check (type in ('percent', 'fixed')),
  value int not null,
  scope text not null default 'all' check (scope in ('all', 'category', 'product')),
  category_id text,
  product_id text,
  active boolean not null default true,
  requires_code boolean not null default true,
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_brand on products(brand);
create index if not exists idx_orders_status on orders(status);
create index if not exists idx_payments_order on payments(order_id);
create index if not exists idx_payments_external on payments(external_id);

-- Service role bypasses RLS; keep RLS enabled for safety if anon key is ever used.
alter table users enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table payments enable row level security;
