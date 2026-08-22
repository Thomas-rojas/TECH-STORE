import { Router } from 'express'
import { z } from 'zod'
import { supabase } from '../../database/supabase'
import { requireAuth, requireRoles } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { AppError, assertFound } from '../../utils/errors'
import type { DbProduct } from '../../types/database'

function mapProduct(product: DbProduct) {
  return {
    id: product.id,
    slug: product.slug,
    sku: product.sku,
    name: product.name,
    brand: product.brand,
    shortDescription: product.short_description,
    description: product.description,
    highlight: product.highlight,
    price: product.price,
    compareAtPrice: product.compare_at_price ?? undefined,
    priceMax: product.price_max ?? undefined,
    priceFrom: product.price_from,
    images: product.images,
    categoryId: product.category_id,
    rating: product.rating,
    reviewCount: product.review_count,
    stock: product.stock,
    specs: product.specs ?? {},
    tags: product.tags,
    featured: product.featured,
    isNew: product.is_new,
    createdAt: product.created_at,
  }
}

export const productsRouter = Router()

productsRouter.get('/', async (req, res, next) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined
    const brand = typeof req.query.brand === 'string' ? req.query.brand : undefined
    const q = typeof req.query.q === 'string' ? req.query.q : undefined
    const featured = req.query.featured === 'true'

    let query = supabase.from('products').select('*').eq('active', true)

    if (featured) query = query.eq('featured', true)
    if (brand) query = query.ilike('brand', brand)
    if (category) {
      const { data: cat } = await supabase
        .from('categories')
        .select('id')
        .or(`id.eq.${category},slug.eq.${category}`)
        .maybeSingle()
      if (cat) query = query.eq('category_id', cat.id)
      else query = query.eq('category_id', category)
    }
    if (q) query = query.or(`name.ilike.%${q}%,brand.ilike.%${q}%,sku.ilike.%${q}%`)

    const { data, error } = await query.order('featured', { ascending: false }).order('created_at', {
      ascending: false,
    })
    if (error) throw new AppError(500, error.message)
    res.json({ items: (data ?? []).map(mapProduct) })
  } catch (error) {
    next(error)
  }
})

productsRouter.get('/:slugOrId', async (req, res, next) => {
  try {
    const key = req.params.slugOrId
    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .or(`slug.eq.${key},id.eq.${key}`)
      .maybeSingle()
    const found = assertFound(product, 'Producto no encontrado')

    const { data: variants } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', found.id)

    res.json({ product: mapProduct(found), variants: variants ?? [] })
  } catch (error) {
    next(error)
  }
})

const upsertSchema = z.object({
  slug: z.string().min(2),
  sku: z.string().min(2),
  name: z.string().min(2),
  brand: z.string().min(1),
  shortDescription: z.string().default(''),
  description: z.string().default(''),
  highlight: z.string().default(''),
  price: z.number().int().nonnegative(),
  compareAtPrice: z.number().int().positive().optional().nullable(),
  images: z.array(z.string()).default([]),
  categoryId: z.string().min(1),
  stock: z.number().int().nonnegative().default(0),
  specs: z.record(z.string()).default({}),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  isNew: z.boolean().default(false),
  active: z.boolean().default(true),
})

productsRouter.post(
  '/',
  requireAuth,
  requireRoles('admin'),
  validate(upsertSchema),
  async (req, res, next) => {
    try {
      const body = req.body as z.infer<typeof upsertSchema>
      const { data, error } = await supabase
        .from('products')
        .insert({
          slug: body.slug,
          sku: body.sku,
          name: body.name,
          brand: body.brand,
          short_description: body.shortDescription,
          description: body.description,
          highlight: body.highlight,
          price: body.price,
          compare_at_price: body.compareAtPrice ?? null,
          images: body.images,
          category_id: body.categoryId,
          stock: body.stock,
          specs: body.specs,
          tags: body.tags,
          featured: body.featured,
          is_new: body.isNew,
          active: body.active,
        })
        .select('*')
        .single()
      if (error || !data) throw new AppError(500, error?.message ?? 'No se pudo crear')
      res.status(201).json({ product: mapProduct(data) })
    } catch (error) {
      next(error)
    }
  },
)

productsRouter.patch('/:id', requireAuth, requireRoles('admin'), async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ ...req.body, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select('*')
      .single()
    if (error || !data) throw new AppError(404, error?.message ?? 'Producto no encontrado')
    res.json({ product: mapProduct(data) })
  } catch (error) {
    next(error)
  }
})

export const categoriesRouter = Router()

categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const { data, error } = await supabase.from('categories').select('*').order('sort_order')
    if (error) throw new AppError(500, error.message)
    res.json({
      items: (data ?? []).map((item) => ({
        id: item.id,
        slug: item.slug,
        name: item.name,
        description: item.description,
        image: item.image,
        sortOrder: item.sort_order,
      })),
    })
  } catch (error) {
    next(error)
  }
})

categoriesRouter.post(
  '/',
  requireAuth,
  requireRoles('admin'),
  validate(
    z.object({
      slug: z.string().min(2),
      name: z.string().min(2),
      description: z.string().default(''),
      image: z.string().optional(),
      sortOrder: z.number().int().default(0),
    }),
  ),
  async (req, res, next) => {
    try {
      const body = req.body as {
        slug: string
        name: string
        description: string
        image?: string
        sortOrder: number
      }
      const { data, error } = await supabase
        .from('categories')
        .insert({
          slug: body.slug,
          name: body.name,
          description: body.description,
          image: body.image ?? null,
          sort_order: body.sortOrder,
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
