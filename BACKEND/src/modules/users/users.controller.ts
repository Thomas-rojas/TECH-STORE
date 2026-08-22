import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../../database/supabase'
import { requireAuth, requireRoles } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { AppError } from '../../utils/errors'

export const usersRouter = Router()

usersRouter.get('/me/addresses', requireAuth, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', req.user!.id)
      .order('is_default', { ascending: false })
    if (error) throw new AppError(500, error.message)
    res.json({ items: data ?? [] })
  } catch (error) {
    next(error)
  }
})

usersRouter.post(
  '/me/addresses',
  requireAuth,
  validate(
    z.object({
      label: z.string().default('Principal'),
      city: z.string().min(2),
      address: z.string().min(5),
      phone: z.string().default(''),
      isDefault: z.boolean().optional(),
    }),
  ),
  async (req, res, next) => {
    try {
      if (req.body.isDefault) {
        await supabase.from('addresses').update({ is_default: false }).eq('user_id', req.user!.id)
      }
      const { data, error } = await supabase
        .from('addresses')
        .insert({
          user_id: req.user!.id,
          label: req.body.label,
          city: req.body.city,
          address: req.body.address,
          phone: req.body.phone,
          is_default: Boolean(req.body.isDefault),
        })
        .select('*')
        .single()
      if (error || !data) throw new AppError(500, error?.message ?? 'No se pudo crear')
      res.status(201).json({ item: data })
    } catch (error) {
      next(error)
    }
  },
)

usersRouter.post('/me/wholesale-request', requireAuth, async (req, res, next) => {
  try {
    if (req.user!.role === 'admin') throw new AppError(400, 'Un admin no solicita mayorista')
    const { data, error } = await supabase
      .from('users')
      .update({
        wholesale_status: 'pending',
        wholesale_requested_at: new Date().toISOString(),
        wholesale_note: '',
      })
      .eq('id', req.user!.id)
      .select('wholesale_status, wholesale_requested_at')
      .single()
    if (error || !data) throw new AppError(500, error?.message ?? 'No se pudo actualizar')
    res.json({
      wholesaleStatus: data.wholesale_status,
      wholesaleRequestedAt: data.wholesale_requested_at,
    })
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', requireAuth, requireRoles('admin'), async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, phone, identification, role, wholesale_status, created_at')
      .order('created_at', { ascending: false })
    if (error) throw new AppError(500, error.message)
    res.json({ items: data ?? [] })
  } catch (error) {
    next(error)
  }
})

usersRouter.patch(
  '/:id/wholesale',
  requireAuth,
  requireRoles('admin'),
  validate(
    z.object({
      status: z.enum(['approved', 'rejected', 'none', 'pending']),
      note: z.string().optional(),
    }),
  ),
  async (req, res, next) => {
    try {
      const status = req.body.status as 'approved' | 'rejected' | 'none' | 'pending'
      const patch: Record<string, unknown> = {
        wholesale_status: status,
        wholesale_decided_at: new Date().toISOString(),
        wholesale_note: req.body.note ?? '',
      }
      if (status === 'approved') patch.role = 'wholesale'
      if (status === 'rejected' || status === 'none') patch.role = 'customer'

      const { data, error } = await supabase
        .from('users')
        .update(patch)
        .eq('id', req.params.id)
        .select('id, wholesale_status, role')
        .single()
      if (error || !data) throw new AppError(404, error?.message ?? 'Usuario no encontrado')
      res.json({
        id: data.id,
        wholesaleStatus: data.wholesale_status,
        role: data.role,
      })
    } catch (error) {
      next(error)
    }
  },
)
