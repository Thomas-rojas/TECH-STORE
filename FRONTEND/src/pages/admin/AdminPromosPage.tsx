import { AdminInput, AdminNotice, AdminSelect, AdminTextarea } from '@/components/admin/AdminField'
import { StatusPill } from '@/components/admin/StatusPill'
import { Button } from '@/components/ui/Button'
import { categories } from '@/data/categories'
import { useAdminStore } from '@/stores/admin.store'
import { useCatalogStore } from '@/stores/catalog.store'
import type { Promotion } from '@/types/admin'
import { uid } from '@/utils/format'
import { useState, type FormEvent } from 'react'

const emptyPromo = (): Promotion => ({
  id: uid('promo'),
  name: '',
  code: '',
  type: 'percent',
  value: 10,
  scope: 'all',
  active: true,
  requiresCode: true,
  note: '',
})

export function AdminPromosPage() {
  const promotions = useAdminStore((state) => state.promotions)
  const upsert = useAdminStore((state) => state.upsertPromotion)
  const remove = useAdminStore((state) => state.removePromotion)
  const products = useCatalogStore((state) => state.products)
  const [form, setForm] = useState<Promotion | null>(null)
  const [message, setMessage] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form?.name.trim()) {
      setMessage('Ponle un nombre a la promoción.')
      return
    }
    if (form.requiresCode && !form.code.trim()) {
      setMessage('Si pide código, escríbelo. Ejemplo: CAS10')
      return
    }
    upsert({ ...form, code: form.code.trim().toUpperCase() })
    setForm(null)
    setMessage('Promoción guardada. Se aplica en el checkout.')
  }

  if (form) {
    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <button type="button" className="text-sm text-ink-500" onClick={() => setForm(null)}>
          ← Volver
        </button>
        <h1 className="font-display text-3xl font-semibold text-ink-900">
          {promotions.some((item) => item.id === form.id) ? 'Editar promoción' : 'Nueva promoción'}
        </h1>
        <div className="grid gap-5 rounded-3xl bg-white p-5">
          <AdminInput
            label="Nombre (solo para ti)"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Ej. Descuento de bienvenida"
          />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={form.requiresCode}
              onChange={(event) => setForm({ ...form, requiresCode: event.target.checked })}
            />
            El cliente debe escribir un código
          </label>
          {form.requiresCode ? (
            <AdminInput
              label="Código"
              hint="El cliente lo escribe en mayúsculas o minúsculas. Ejemplo: CAS10"
              value={form.code}
              onChange={(event) => setForm({ ...form, code: event.target.value })}
            />
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminSelect
              label="Tipo de descuento"
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value as Promotion['type'] })}
            >
              <option value="percent">Porcentaje (%)</option>
              <option value="fixed">Valor fijo en pesos</option>
            </AdminSelect>
            <AdminInput
              label={form.type === 'percent' ? 'Porcentaje' : 'Pesos a descontar'}
              type="number"
              min={1}
              value={String(form.value)}
              onChange={(event) => setForm({ ...form, value: Number(event.target.value) || 0 })}
            />
          </div>
          <AdminSelect
            label="¿A qué aplica?"
            value={form.scope}
            onChange={(event) => setForm({ ...form, scope: event.target.value as Promotion['scope'] })}
          >
            <option value="all">Toda la tienda</option>
            <option value="category">Una categoría</option>
            <option value="product">Un producto</option>
          </AdminSelect>
          {form.scope === 'category' ? (
            <AdminSelect
              label="Categoría"
              value={form.categoryId ?? ''}
              onChange={(event) => setForm({ ...form, categoryId: event.target.value })}
            >
              <option value="">Elige una</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </AdminSelect>
          ) : null}
          {form.scope === 'product' ? (
            <AdminSelect
              label="Producto"
              value={form.productId ?? ''}
              onChange={(event) => setForm({ ...form, productId: event.target.value })}
            >
              <option value="">Elige uno</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </AdminSelect>
          ) : null}
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => setForm({ ...form, active: event.target.checked })}
            />
            Promoción activa
          </label>
          <AdminTextarea
            label="Nota interna"
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
          />
        </div>
        {message ? <p className="text-sm text-offer">{message}</p> : null}
        <Button type="submit" size="lg">
          Guardar promoción
        </Button>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-900">Promociones</h1>
          <p className="mt-1 text-sm text-ink-500">
            Crea códigos o descuentos automáticos. El cliente los ve al pagar.
          </p>
        </div>
        <Button size="lg" onClick={() => setForm(emptyPromo())}>
          Nueva promoción
        </Button>
      </div>
      {message ? <AdminNotice>{message}</AdminNotice> : null}
      <ul className="space-y-3">
        {promotions.map((promo) => (
          <li key={promo.id} className="rounded-3xl bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink-900">{promo.name}</p>
                <p className="mt-1 text-sm text-ink-500">
                  {promo.requiresCode ? `Código ${promo.code || '—'}` : 'Automática'} ·{' '}
                  {promo.type === 'percent' ? `${promo.value}%` : `$${promo.value.toLocaleString('es-CO')}`}
                </p>
              </div>
              <StatusPill
                status={promo.active ? 'activa' : 'inactiva'}
                label={promo.active ? 'Activa' : 'Apagada'}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setForm(promo)}>
                Editar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  upsert({ ...promo, active: !promo.active })
                  setMessage(promo.active ? 'Promoción apagada.' : 'Promoción activada.')
                }}
              >
                {promo.active ? 'Apagar' : 'Activar'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (window.confirm(`¿Eliminar ${promo.name}?`)) {
                    remove(promo.id)
                    setMessage('Promoción eliminada.')
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
