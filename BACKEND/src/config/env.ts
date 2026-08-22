import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),

  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  SUPABASE_ANON_KEY: z.string().optional().default(''),

  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  APP_PUBLIC_URL: z.string().url().default('http://localhost:4000'),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),

  MP_ACCESS_TOKEN: z.string().optional().default(''),
  MP_PUBLIC_KEY: z.string().optional().default(''),
  MP_WEBHOOK_SECRET: z.string().optional().default(''),
  MP_MODE: z.enum(['sandbox', 'production']).default('sandbox'),

  ADDI_API_KEY: z.string().optional().default(''),
  ADDI_API_SECRET: z.string().optional().default(''),
  ADDI_MERCHANT_ID: z.string().optional().default(''),
  ADDI_WEBHOOK_SECRET: z.string().optional().default(''),
  ADDI_BASE_URL: z.string().default('https://api.addi.com'),
  ADDI_MODE: z.enum(['sandbox', 'production']).default('sandbox'),

  BOLD_API_KEY: z.string().optional().default(''),
  BOLD_SECRET_KEY: z.string().optional().default(''),
  BOLD_WEBHOOK_SECRET: z.string().optional().default(''),
  BOLD_BASE_URL: z.string().default('https://integrations.api.bold.co'),
  BOLD_MODE: z.enum(['sandbox', 'production']).default('sandbox'),

  SEED_ADMIN_IDENTIFICATION: z.string().default('admin'),
  SEED_ADMIN_PASSWORD: z.string().default('importcas'),
  SEED_ADMIN_EMAIL: z.string().email().default('admin@importcas.com'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors)
  throw new Error('Invalid environment variables. Copy BACKEND/.env.example → BACKEND/.env and set Supabase keys.')
}

export const env = parsed.data

export const corsOrigins = env.CORS_ORIGINS.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
