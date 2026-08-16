import { AdminInput, AdminNotice, AdminSelect, AdminTextarea } from '@/components/admin/AdminField'
import { Button } from '@/components/ui/Button'
import { categories } from '@/data/categories'
import { useCatalogStore } from '@/stores/catalog.store'
import type { Product } from '@/types/product'
import { formatCurrency, parseMoney, slugify, uid } from '@/utils/format'
import { readImageFile } from '@/utils/read-image-file'
import { useMemo, useState, type FormEvent } from 'react'

const emptyForm = {
  name: '',
  brand: 'Apple',
  categoryId: categories[0]?.id ?? 'cat-iphone',
  price: '',
  compareAtPrice: '',
  stock: '5',
  image: '',
  shortDescription: '',
  featured: false,
  isNew: true,
}

type FormState = typeof emptyForm

function toForm(product: Product): FormState {
  return {
    name: product.name,
    brand: product.brand,
    categoryId: product.categoryId,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : '',
    stock: String(product.stock),
    image: product.images[0] ?? '',
    shortDescription: product.shortDescription,
    featured: product.featured,
    isNew: product.isNew,
  }
}

function toProduct(form: FormState, current?: Product): Product {
  const price = parseMoney(form.price)
  const compare = parseMoney(form.compareAtPrice)
  const slugBase = slugify(form.name) || 'producto'
  const slug = current?.slug ?? `${slugBase}-${uid('p').slice(-4)}`
  return {
    id: current?.id ?? uid('prd'),
    slug,
    sku: current?.sku ?? `CAS-${slug.slice(0, 10).toUpperCase()}`,
    name: form.name.trim(),
    brand: form.brand.trim() || 'ImportCAS',
    shortDescription: form.shortDescription.trim() || form.name.trim(),
    description: current?.description ?? (form.shortDescription.trim() || form.name.trim()),
    highlight: current?.highlight ?? form.brand,
    price,
    ...(compare > price ? { compareAtPrice: compare } : {}),
    images: form.image ? [form.image] : (current?.images ?? []),
    categoryId: form.categoryId,
    rating: current?.rating ?? 5,
    reviewCount: current?.reviewCount ?? 0,
    stock: Number(form.stock) || 0,
    specs: current?.specs ?? {},
    tags: current?.tags ?? [],
    featured: form.featured,
    isNew: form.isNew,
    createdAt: current?.createdAt ?? new Date().toISOString().slice(0, 10),
  }
}

export function AdminProductsPage() {
  const products = useCatalogStore((state) => state.products)
  const upsert = useCatalogStore((state) => state.upsert)
  const remove = useCatalogStore((state) => state.remove)
  const restore = useCatalogStore((state) => state.restore)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Product | 'new' | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saved, setSaved] = useState('')
  const [photoBusy, setPhotoBusy] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter((product) =>
      `${product.name} ${product.brand} ${product.sku}`.toLowerCase().includes(q),
    )
  }, [products, query])

  function openNew() {
    setForm(emptyForm)
    setEditing('new')
    setSaved('')
  }

  function openEdit(product: Product) {
    setForm(toForm(product))
    setEditing(product)
    setSaved('')
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.name.trim() || parseMoney(form.price) <= 0) {
      setSaved('Escribe el nombre y un precio mayor a cero.')
      return
    }
    if (!form.image) {
      setSaved('Sube una foto del producto.')
      return
    }
    const current = editing === 'new' || !editing ? undefined : editing
    upsert(toProduct(form, current))
    setEditing(null)
    setSaved('Listo. El producto ya aparece en la tienda.')
  }

  if (editing) {
    const title = editing === 'new' ? 'Agregar producto' : 'Editar producto'
    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <button
            type="button"
            className="text-sm text-ink-500 hover:text-peri-600"
            onClick={() => setEditing(null)}
          >
            ← Volver a la lista
          </button>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900">{title}</h1>
          <p className="mt-1 text-sm text-ink-500">Completa lo esencial. El resto se llena solo.</p>
        </div>

        <div className="grid gap-5 rounded-3xl bg-white p-5 sm:p-6">
          <AdminInput
            label="Nombre del producto"
            hint="Ejemplo: iPhone 16 128 GB"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            required
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminInput
              label="Marca"
              value={form.brand}
              onChange={(event) => setForm({ ...form, brand: event.target.value })}
            />
            <AdminSelect
              label="Categoría"
              value={form.categoryId}
              onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </AdminSelect>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <AdminInput
              label="Precio de venta (COP)"
              hint={parseMoney(form.price) ? `Se verá como ${formatCurrency(parseMoney(form.price))}` : 'Solo números'}
              inputMode="numeric"
              value={form.price}
              onChange={(event) => setForm({ ...form, price: event.target.value })}
            />
            <AdminInput
              label="Precio tachado (opcional)"
              hint="Si lo llenas, la tienda muestra oferta."
              inputMode="numeric"
              value={form.compareAtPrice}
              onChange={(event) => setForm({ ...form, compareAtPrice: event.target.value })}
            />
            <AdminInput
              label="Unidades en inventario"
              inputMode="numeric"
              value={form.stock}
              onChange={(event) => setForm({ ...form, stock: event.target.value })}
            />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-ink-800">Foto del producto</p>
            <p className="text-xs leading-snug text-ink-400">
              Súbela desde tu computador. JPG, PNG o WEBP.
            </p>
            {form.image ? (
              <img
                src={form.image}
                alt=""
                className="h-40 w-40 rounded-2xl bg-ink-100 object-contain"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-ink-100 text-center text-xs text-ink-400">
                Sin foto
              </div>
            )}
            <label className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-ink-100 px-6 text-sm font-medium text-ink-800 hover:bg-ink-200">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  event.target.value = ''
                  if (!file) return
                  setPhotoBusy(true)
                  setSaved('')
                  void readImageFile(file)
                    .then((image) => {
                      setForm((current) => ({ ...current, image }))
                    })
                    .catch((error: unknown) => {
                      setSaved(error instanceof Error ? error.message : 'No se pudo subir la foto.')
                    })
                    .finally(() => setPhotoBusy(false))
                }}
              />
              {photoBusy ? 'Cargando foto…' : form.image ? 'Cambiar foto' : 'Subir foto'}
            </label>
          </div>
          <AdminTextarea
            label="Descripción corta"
            hint="Una o dos frases para la tarjeta del producto."
            value={form.shortDescription}
            onChange={(event) => setForm({ ...form, shortDescription: event.target.value })}
          />
          <div className="flex flex-wrap gap-6 text-sm font-medium text-ink-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => setForm({ ...form, featured: event.target.checked })}
              />
              Mostrar en destacados
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(event) => setForm({ ...form, isNew: event.target.checked })}
              />
              Marcar como nuevo
            </label>
          </div>
        </div>

        {saved ? <p className="text-sm font-medium text-offer">{saved}</p> : null}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" disabled={photoBusy}>
            Guardar producto
          </Button>
          <Button type="button" variant="secondary" onClick={() => setEditing(null)}>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">Productos</h1>
          <p className="mt-1 text-sm text-ink-500">Agrega, corrige o elimina lo que se vende en la tienda.</p>
        </div>
        <Button onClick={openNew} size="lg">
          Agregar producto
        </Button>
      </div>

      {saved ? <AdminNotice>{saved}</AdminNotice> : null}

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por nombre, marca o código"
        className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-base outline-none focus:border-brand-600"
      />

      <ul className="space-y-3">
        {filtered.map((product) => (
          <li
            key={product.id}
            className="flex flex-col gap-4 rounded-3xl bg-white p-4 sm:flex-row sm:items-center"
          >
            <img
              src={product.images[0]}
              alt=""
              className="h-20 w-20 shrink-0 rounded-2xl bg-ink-100 object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-ink-900">{product.name}</p>
              <p className="text-sm text-ink-500">
                {product.brand} · {formatCurrency(product.price)} · {product.stock} und.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={() => openEdit(product)}>
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (window.confirm(`¿Eliminar ${product.name}? Esta acción quita el producto de la tienda.`)) {
                    remove(product.id)
                    setSaved('Producto eliminado.')
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="text-xs text-ink-400 underline hover:text-ink-700"
        onClick={() => {
          if (window.confirm('Esto vuelve a poner el catálogo original y borra tus cambios de productos.')) {
            restore()
            setSaved('Se restauró el catálogo original.')
          }
        }}
      >
        Restaurar catálogo original
      </button>
    </div>
  )
}
