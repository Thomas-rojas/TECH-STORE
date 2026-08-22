import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../../database/supabase'
import { optionalAuth, requireAuth } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { AppError } from '../../utils/errors'
import type { DbCart, DbCartItem, DbProduct } from '../../types/database'

type CartWithItems = DbCart & {
  items: Array<DbCartItem & { product: DbProduct }>
}

async function loadCart(cartId: string): Promise<CartWithItems> {
  const { data: cart, error } = await supabase.from('carts').select('*').eq('id', cartId).single()
  if (error || !cart) throw new AppError(404, 'Carrito no encontrado')

  const { data: items } = await supabase.from('cart_items').select('*').eq('cart_id', cartId)
  const productIds = (items ?? []).map((item) => item.product_id)
  const { data: products } = productIds.length
    ? await supabase.from('products').select('*').in('id', productIds)
    : { data: [] as DbProduct[] }

  const byId = new Map((products ?? []).map((product) => [product.id, product]))
  return {
    ...cart,
    items: (items ?? []).map((item) => ({
      ...item,
      product: byId.get(item.product_id)!,
    })),
  }
}

async function getOrCreateCart(userId?: string, sessionId?: string) {
  if (userId) {
    const { data: existing } = await supabase.from('carts').select('*').eq('user_id', userId).maybeSingle()
    if (existing) return loadCart(existing.id)
    const { data: created, error } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select('*')
      .single()
    if (error || !created) throw new AppError(500, error?.message ?? 'No se pudo crear carrito')
    return loadCart(created.id)
  }

  if (!sessionId) throw new AppError(400, 'Se requiere sessionId o autenticación')
  const { data: existing } = await supabase
    .from('carts')
    .select('*')
    .eq('session_id', sessionId)
    .maybeSingle()
  if (existing) return loadCart(existing.id)
  const { data: created, error } = await supabase
    .from('carts')
    .insert({ session_id: sessionId })
    .select('*')
    .single()
  if (error || !created) throw new AppError(500, error?.message ?? 'No se pudo crear carrito')
  return loadCart(created.id)
}

function mapCart(cart: CartWithItems) {
  return {
    id: cart.id,
    items: cart.items
      .filter((item) => item.product)
      .map((item) => ({
        productId: item.product_id,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          slug: item.product.slug,
          name: item.product.name,
          price: item.product.price,
          images: item.product.images,
          stock: item.product.stock,
        },
        unitPrice: item.product.price,
      })),
  }
}

export const cartRouter = Router()

cartRouter.get('/', optionalAuth, async (req, res, next) => {
  try {
    const sessionId = typeof req.query.sessionId === 'string' ? req.query.sessionId : undefined
    const cart = await getOrCreateCart(req.user?.id, sessionId)
    res.json({ cart: mapCart(cart) })
  } catch (error) {
    next(error)
  }
})

cartRouter.put(
  '/items',
  optionalAuth,
  validate(
    z.object({
      sessionId: z.string().optional(),
      productId: z.string().min(1),
      quantity: z.number().int().min(0),
    }),
  ),
  async (req, res, next) => {
    try {
      const { sessionId, productId, quantity } = req.body as {
        sessionId?: string
        productId: string
        quantity: number
      }
      const cart = await getOrCreateCart(req.user?.id, sessionId)
      const { data: product } = await supabase
        .from('products')
        .select('id')
        .eq('id', productId)
        .eq('active', true)
        .maybeSingle()
      if (!product) throw new AppError(404, 'Producto no encontrado')

      if (quantity === 0) {
        await supabase.from('cart_items').delete().eq('cart_id', cart.id).eq('product_id', productId)
      } else {
        const { data: existing } = await supabase
          .from('cart_items')
          .select('id')
          .eq('cart_id', cart.id)
          .eq('product_id', productId)
          .maybeSingle()
        if (existing) {
          await supabase.from('cart_items').update({ quantity }).eq('id', existing.id)
        } else {
          await supabase.from('cart_items').insert({
            cart_id: cart.id,
            product_id: productId,
            quantity,
          })
        }
      }

      const refreshed = await getOrCreateCart(req.user?.id, sessionId ?? cart.session_id ?? undefined)
      res.json({ cart: mapCart(refreshed) })
    } catch (error) {
      next(error)
    }
  },
)

cartRouter.delete('/', requireAuth, async (req, res, next) => {
  try {
    const { data: carts } = await supabase.from('carts').select('id').eq('user_id', req.user!.id)
    const ids = (carts ?? []).map((cart) => cart.id)
    if (ids.length) await supabase.from('cart_items').delete().in('cart_id', ids)
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})
