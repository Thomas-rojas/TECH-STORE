import { AdminNotice } from '@/components/admin/AdminField'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { categories } from '@/data/categories'
import { useCatalogStore } from '@/stores/catalog.store'
import { formatCurrency, parseMoney } from '@/utils/format'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export function AdminPricesPage() {
  const products = useCatalogStore((state) => state.products)
  const setPrice = useCatalogStore((state) => state.setPrice)
  const adjustPrices = useCatalogStore((state) => state.adjustPrices)
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('all')
  const [drafts, setDrafts] = useState<Record<string, { price: string; compare: string }>>({})
  const [bulk, setBulk] = useState('5')
  const [message, setMessage] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((product) => {
      if (categoryId !== 'all' && product.categoryId !== categoryId) return false
      if (q && !product.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [products, query, categoryId])

  function draftFor(id: string, price: number, compareAtPrice?: number) {
    return drafts[id] ?? {
      price: String(price),
      compare: compareAtPrice ? String(compareAtPrice) : '',
    }
  }

  function saveRow(id: string, fallbackPrice: number, fallbackCompare?: number) {
    const draft = draftFor(id, fallbackPrice, fallbackCompare)
    const price = parseMoney(draft.price)
    const compare = parseMoney(draft.compare)
    if (price <= 0) {
      setMessage('El precio debe ser mayor a cero.')
      return
    }
    setPrice(id, price, compare > price ? compare : null)
    setDrafts((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })
    setMessage('Precio actualizado. Ya se ve en la tienda.')
  }

  function applyBulk(percent: number) {
    if (visible.length === 0) return
    if (
      !window.confirm(
        `¿Aplicar ${percent > 0 ? 'un aumento' : 'una baja'} del ${Math.abs(percent)}% a los ${visible.length} productos que estás viendo?`,
      )
    ) {
      return
    }
    adjustPrices(
      visible.map((item) => item.id),
      percent,
    )
    setDrafts({})
    setMessage('Precios actualizados en grupo.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Precios</h1>
        <p className="mt-1 text-sm text-ink-500">
          Estos son los precios de la tienda pública. Cambia uno y pulsa Guardar, o sube/baja varios a la vez.
          Los precios y descuentos solo para mayoristas están en{' '}
          <Link to={`${ROUTES.adminWholesale}?tab=precios`} className="font-medium text-brand-700 underline">
            Mayorista
          </Link>
          .
        </p>
      </div>

      {message ? <AdminNotice>{message}</AdminNotice> : null}

      <div className="grid gap-3 rounded-3xl bg-white p-4 sm:grid-cols-[1fr_180px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar producto"
          className="h-12 rounded-2xl border border-black/10 px-4 text-base outline-none focus:border-brand-600"
        />
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="h-12 rounded-2xl border border-black/10 px-4 text-base outline-none"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-3xl bg-white p-4">
        <p className="text-sm font-medium text-ink-700">Ajustar los que ves ahora:</p>
        <input
          value={bulk}
          onChange={(event) => setBulk(event.target.value)}
          className="h-11 w-20 rounded-xl border border-black/10 px-3 text-center"
          inputMode="numeric"
        />
        <span className="text-sm text-ink-500">%</span>
        <Button size="sm" onClick={() => applyBulk(Number(bulk) || 0)}>
          Subir
        </Button>
        <Button size="sm" variant="secondary" onClick={() => applyBulk(-(Number(bulk) || 0))}>
          Bajar
        </Button>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/[0.06] text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Precio tachado</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {visible.map((product) => {
              const draft = draftFor(product.id, product.price, product.compareAtPrice)
              return (
                <tr key={product.id} className="border-b border-black/[0.04] last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink-900">{product.name}</p>
                    <p className="text-xs text-ink-400">{formatCurrency(product.price)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={draft.price}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [product.id]: { ...draft, price: event.target.value },
                        }))
                      }
                      className="h-11 w-36 rounded-xl border border-black/10 px-3"
                      inputMode="numeric"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      value={draft.compare}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [product.id]: { ...draft, compare: event.target.value },
                        }))
                      }
                      className="h-11 w-36 rounded-xl border border-black/10 px-3"
                      inputMode="numeric"
                      placeholder="Opcional"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      onClick={() => saveRow(product.id, product.price, product.compareAtPrice)}
                    >
                      Guardar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
