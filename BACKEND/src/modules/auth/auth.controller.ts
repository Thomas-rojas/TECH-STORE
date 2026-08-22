import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { createHash } from 'crypto'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { env } from '../../config/env'
import { supabase } from '../../database/supabase'
import { requireAuth, signAccessToken, signRefreshToken } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { AppError } from '../../utils/errors'
import type { DbUser } from '../../types/database'

function toPublicUser(user: DbUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    idType: user.id_type,
    identification: user.identification,
    role: user.role,
    wholesaleStatus: user.wholesale_status,
    wholesaleRequestedAt: user.wholesale_requested_at ?? undefined,
    wholesaleDecidedAt: user.wholesale_decided_at ?? undefined,
    wholesaleNote: user.wholesale_note,
    createdAt: user.created_at,
  }
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  idType: z.string().min(2),
  identification: z.string().min(3),
  password: z.string().min(6),
  requestWholesale: z.boolean().optional(),
})

const loginSchema = z.object({
  identification: z.string().min(1),
  password: z.string().min(1),
})

export const authRouter = Router()

authRouter.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const body = req.body as z.infer<typeof registerSchema>
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .or(`email.eq.${body.email.toLowerCase()},identification.eq.${body.identification}`)
      .maybeSingle()
    if (existing) throw new AppError(409, 'Ya existe una cuenta con ese correo o identificación')

    const passwordHash = await bcrypt.hash(body.password, 10)
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name: body.name,
        email: body.email.toLowerCase(),
        phone: body.phone,
        id_type: body.idType,
        identification: body.identification,
        password_hash: passwordHash,
        wholesale_status: body.requestWholesale ? 'pending' : 'none',
        wholesale_requested_at: body.requestWholesale ? new Date().toISOString() : null,
      })
      .select('*')
      .single()

    if (error || !user) throw new AppError(500, error?.message ?? 'No se pudo crear el usuario')

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    })
    const refreshToken = signRefreshToken(user.id)
    await supabase.from('refresh_tokens').insert({
      user_id: user.id,
      token_hash: hashToken(refreshToken),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })

    res.status(201).json({ user: toPublicUser(user), accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const body = req.body as z.infer<typeof loginSchema>
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .or(`identification.eq.${body.identification},email.eq.${body.identification.toLowerCase()}`)
      .maybeSingle()

    if (!user) throw new AppError(401, 'Credenciales inválidas')
    const ok = await bcrypt.compare(body.password, user.password_hash)
    if (!ok) throw new AppError(401, 'Credenciales inválidas')

    const accessToken = signAccessToken({
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    })
    const refreshToken = signRefreshToken(user.id)
    await supabase.from('refresh_tokens').insert({
      user_id: user.id,
      token_hash: hashToken(refreshToken),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })

    res.json({ user: toPublicUser(user), accessToken, refreshToken })
  } catch (error) {
    next(error)
  }
})

authRouter.post(
  '/refresh',
  validate(z.object({ refreshToken: z.string().min(10) })),
  async (req, res, next) => {
    try {
      const { refreshToken } = req.body as { refreshToken: string }
      const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as {
        sub: string
        typ?: string
      }
      if (payload.typ !== 'refresh') throw new AppError(401, 'Refresh inválido')

      const { data: stored } = await supabase
        .from('refresh_tokens')
        .select('*')
        .eq('token_hash', hashToken(refreshToken))
        .maybeSingle()
      if (!stored || new Date(stored.expires_at) < new Date()) {
        throw new AppError(401, 'Refresh expirado')
      }

      const { data: user } = await supabase.from('users').select('*').eq('id', payload.sub).maybeSingle()
      if (!user) throw new AppError(401, 'Usuario no encontrado')

      const accessToken = signAccessToken({
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
      })
      res.json({ accessToken, user: toPublicUser(user) })
    } catch (error) {
      next(error)
    }
  },
)

authRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { data: user } = await supabase.from('users').select('*').eq('id', req.user!.id).maybeSingle()
    if (!user) throw new AppError(404, 'Usuario no encontrado')
    res.json({ user: toPublicUser(user) })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/logout', requireAuth, async (req, res, next) => {
  try {
    await supabase.from('refresh_tokens').delete().eq('user_id', req.user!.id)
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})
