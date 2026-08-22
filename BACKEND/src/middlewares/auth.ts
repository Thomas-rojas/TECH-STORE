import type { NextFunction, Request, Response } from 'express'
import type { Role } from '../types/database'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { supabase } from '../database/supabase'
import { AppError } from '../utils/errors'

export interface AuthUser {
  id: string
  role: Role
  email: string
  name: string
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

interface AccessPayload {
  sub: string
  role: Role
  email: string
  name: string
  typ: 'access'
}

export function signAccessToken(user: AuthUser): string {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email, name: user.name, typ: 'access' },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions,
  )
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, typ: 'refresh' }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN,
  } as jwt.SignOptions)
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(401, 'No autenticado'))
  }

  try {
    const token = header.slice(7)
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessPayload
    if (payload.typ !== 'access') throw new Error('bad token')
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email,
      name: payload.name,
    }
    next()
  } catch {
    next(new AppError(401, 'Token inválido o expirado'))
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return next()
  try {
    const token = header.slice(7)
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessPayload
    if (payload.typ === 'access') {
      req.user = {
        id: payload.sub,
        role: payload.role,
        email: payload.email,
        name: payload.name,
      }
    }
  } catch {
    // ignore
  }
  next()
}

export function requireRoles(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, 'No autenticado'))
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, 'No tienes permiso para esta acción'))
    }
    next()
  }
}

export async function assertUserExists(userId: string) {
  const { data, error } = await supabase.from('users').select('id').eq('id', userId).maybeSingle()
  if (error || !data) throw new AppError(401, 'Usuario no encontrado')
  return data
}
