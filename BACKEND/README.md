# ImportCAS Backend (Supabase)

API Node.js + TypeScript + Express + **Supabase (PostgreSQL)**.

## Setup

1. Crea un proyecto en [Supabase](https://supabase.com)
2. En **SQL Editor**, ejecuta `supabase/schema.sql`
3. Copia keys desde **Project Settings → API**

```bash
cd BACKEND
cp .env.example .env
# SUPABASE_URL=...
# SUPABASE_SERVICE_ROLE_KEY=...   (solo backend)
npm install
npm run db:seed
npm run dev
```

API: `http://localhost:4000` · Health: `GET /api/health`

## Payments

| Provider | Create | Webhook |
|----------|--------|---------|
| Mercado Pago | `POST /api/payments/mercado_pago/create` | `POST /api/payments/mercado_pago/webhook` |
| Addi | `POST /api/payments/addi/create` | `POST /api/payments/addi/webhook` |
| Bold | `POST /api/payments/bold/create` | `POST /api/payments/bold/webhook` |

Status: `GET /api/payments/:orderId/status`

Credenciales de pasarelas solo en `.env` (marcadas con `TODO` en cada provider).

## Frontend

```
VITE_API_BASE_URL=http://localhost:4000/api
```
