import { AdminInput, AdminNotice, AdminSelect, AdminTextarea } from '@/components/admin/AdminField'
import { StatusPill } from '@/components/admin/StatusPill'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { categories } from '@/data/categories'
import { useCatalogStore } from '@/stores/catalog.store'
import { emptyWholesaleDiscount, useWholesaleStore } from '@/stores/wholesale.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import type { WholesaleDiscount } from '@/types/wholesale'
import { WHOLESALE_STATUS_LABEL } from '@/types/roles'
import { formatCurrency, formatDate, parseMoney } from '@/utils/format'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const TABS = [
  { id: 'solicitudes', label: 'Solicitudes' },
  { id: 'precios', label: 'Precios mayorista' },
  { id: 'descuentos', label: 'Descuentos' },
] as const

type TabId = (typeof TABS)[number]['id']

function isTab(value: string | null): value is TabId {
  return TABS.some((tab) => tab.id === value)
}

export function AdminWholesalePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const tab: TabId = isTab(tabParam) ? tabParam : 'solicitudes'
  const accounts = useCustomerAuthStore((state) => state.accounts)
  const decide = useCustomerAuthStore((state) => state.decideWholesale)
  const discounts = useWholesaleStore((state) => state.discounts)
  const upsert = useWholesaleStore((state) => state.upsertDiscount)
  const remove = useWholesaleStore((state) => state.removeDiscount)
  const prices = useWholesaleStore((state) => state.prices)
  const setProductPrice = useWholesaleStore((state) => state.setProductPrice)
  const setProductPrices = useWholesaleStore((state) => state.setProductPrices)
  const products = useCatalogStore((state) => state.products)
  const [note, setNote] = useState<Record<string, string>>({})
  const [form, setForm] = useState<WholesaleDiscount | null>(null)
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('all')
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [bulk, setBulk] = useState('10')

  const pending = useMemo(
    () => accounts.filter((item) => item.wholesaleStatus === 'pending'),
    [accounts],
  )
  const approved = useMemo(
    () => accounts.filter((item) => item.wholesaleStatus === 'approved'),
    [accounts],
  )
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((product) => {
      if (categoryId !== 'all' && product.categoryId !== categoryId) return false
      if (q && !product.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [products, query, categoryId])

  function goTab(next: TabId) {
    setSearchParams(next === 'solicitudes' ? {} : { tab: next })
    setMessage('')
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form?.name.trim()) {
      setMessage('Ponle un nombre a la regla.')
      return
    }
    upsert(form)
    setForm(null)
    goTab('descuentos')
    setMessage('Descuento guardado. Solo lo ven los mayoristas, no cambia el precio de la tienda.')
  }

  function saveWholesalePrice(productId: string, retail: number) {
    const raw = drafts[productId] ?? (prices[productId] ? String(prices[productId]) : '')
    const price = parseMoney(raw)
    if (price <= 0) {
      setMessage('El precio mayorista debe ser mayor a cero. Si quieres quitarlo, usa Quitar.')
      return
    }
    if (price > retail) {
      setMessage('El precio mayorista no puede ser más alto que el de la tienda.')
      return
    }
    setProductPrice(productId, price)
    setDrafts((current) => {
      const next = { ...current }
      delete next[productId]
      return next
    })
    setMessage('Precio mayorista guardado. Solo lo ven las cuentas aprobadas.')
  }

  function applyBulkPercent(percent: number) {
    if (visible.length === 0) return
    const off = Math.min(90, Math.max(1, Math.round(Math.abs(percent))))
    if (
      !window.confirm(
        `¿Poner a los ${visible.length} productos que ves un ${off}% menos que el precio de tienda? Solo cambia el precio mayorista.`,
      )
    ) {
      return
    }
    const next = { ...prices }
    for (const product of visible) {
      next[product.id] = Math.max(1, Math.round(product.price * (1 - off / 100)))
    }
    setProductPrices(next)
    setDrafts({})
    setMessage(`Precio mayorista actualizado: ${off}% menos que la tienda en los productos visibles.`)
  }

  function clearVisiblePrices() {
    if (visible.length === 0) return
    if (!window.confirm('¿Quitar el precio mayorista de los productos que estás viendo?')) return
    const next = { ...prices }
    for (const product of visible) delete next[product.id]
    setProductPrices(next)
    setDrafts({})
    setMessage('Se quitó el precio mayorista. Si hay un descuento, se usa ese; si no, el de tienda.')
  }

  if (form) {
    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <button type="button" className="text-sm text-ink-500" onClick={() => setForm(null)}>
          ← Volver
        </button>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Descuento solo para mayoristas</h1>
        <AdminNotice>
          Esta regla no cambia el precio de la tienda pública. Si un producto ya tiene precio mayorista
          fijo, ese precio gana y esta regla no se le aplica.
        </AdminNotice>
        <div className="grid gap-5 rounded-3xl bg-white p-5">
          <AdminInput
            label="Nombre de la regla"
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder="Ej. 12% en toda la tienda"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <AdminSelect
              label="Tipo"
              value={form.type}
              onChange={(event) => setForm({ ...form, type: event.target.value as WholesaleDiscount['type'] })}
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
            label="Aplica a"
            hint="El sistema elige la regla más específica: producto, luego categoría, luego general."
            value={form.scope}
            onChange={(event) => setForm({ ...form, scope: event.target.value as WholesaleDiscount['scope'] })}
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
          <AdminInput
            label="Cantidad mínima"
            hint="El descuento se aplica desde esta cantidad."
            type="number"
            min={1}
            value={String(form.minQuantity)}
            onChange={(event) => setForm({ ...form, minQuantity: Math.max(1, Number(event.target.value) || 1) })}
          />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) => setForm({ ...form, active: event.target.checked })}
            />
            Regla activa
          </label>
          <AdminTextarea
            label="Nota interna"
            value={form.note}
            onChange={(event) => setForm({ ...form, note: event.target.value })}
          />
        </div>
        <Button type="submit" size="lg">
          Guardar regla
        </Button>
      </form>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900">Mayorista</h1>
        <p className="mt-1 text-sm text-ink-500">
          Aprueba cuentas, pon precios solo para mayoristas y crea descuentos que la tienda pública no ve.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTab(item.id)}
            className={`h-11 rounded-full px-5 text-sm font-medium transition ${
              tab === item.id ? 'bg-brand-500 text-on-brand' : 'bg-surface text-ink-600 hover:bg-ink-200 hover:text-ink-900'
            }`}
          >
            {item.label}
            {item.id === 'solicitudes' && pending.length > 0 ? ` (${pending.length})` : ''}
          </button>
        ))}
      </div>

      {message ? <AdminNotice>{message}</AdminNotice> : null}

      {tab === 'solicitudes' ? (
        <>
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Solicitudes pendientes</h2>
            {pending.length === 0 ? <AdminNotice>No hay solicitudes nuevas.</AdminNotice> : null}
            {pending.map((account) => (
              <div key={account.id} className="rounded-3xl bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink-900">{account.name}</p>
                    <p className="text-sm text-ink-500">
                      {account.email} · {account.phone} · {account.idType} {account.identification}
                    </p>
                    {account.wholesaleRequestedAt ? (
                      <p className="mt-1 text-xs text-ink-400">{formatDate(account.wholesaleRequestedAt)}</p>
                    ) : null}
                  </div>
                  <StatusPill status="pendiente" label={WHOLESALE_STATUS_LABEL.pending} />
                </div>
                <div className="mt-4 space-y-3">
                  <AdminTextarea
                    label="Nota (opcional)"
                    value={note[account.id] ?? ''}
                    onChange={(event) => setNote((current) => ({ ...current, [account.id]: event.target.value }))}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => {
                        decide(account.id, 'approved', note[account.id])
                        setMessage(`${account.name} ahora es cliente mayorista.`)
                      }}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        decide(account.id, 'rejected', note[account.id])
                        setMessage(`Rechazaste a ${account.name}.`)
                      }}
                    >
                      Rechazar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Mayoristas activos</h2>
            {approved.length === 0 ? <AdminNotice>Aún no hay mayoristas aprobados.</AdminNotice> : null}
            {approved.map((account) => (
              <div key={account.id} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-5">
                <div>
                  <p className="font-semibold">{account.name}</p>
                  <p className="text-sm text-ink-500">{account.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    if (window.confirm(`¿Quitar el acceso mayorista de ${account.name}?`)) {
                      decide(account.id, 'rejected', 'Acceso retirado por el administrador.')
                      setMessage(`${account.name} volvió a cliente normal.`)
                    }
                  }}
                >
                  Quitar mayorista
                </Button>
              </div>
            ))}
          </section>
        </>
      ) : null}

      {tab === 'precios' ? (
        <section className="space-y-4">
          <AdminNotice>
            Estos precios solo los ven las cuentas mayoristas aprobadas. El público sigue viendo el
            precio de{' '}
            <Link to={ROUTES.adminPrices} className="font-medium text-brand-700 underline">
              Precios
            </Link>
            . Si dejas un producto vacío, se usa un descuento (si hay) o el precio de tienda.
          </AdminNotice>

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
            <p className="text-sm font-medium text-ink-700">A los que ves ahora:</p>
            <input
              value={bulk}
              onChange={(event) => setBulk(event.target.value)}
              className="h-11 w-20 rounded-xl border border-black/10 px-3 text-center"
              inputMode="numeric"
            />
            <span className="text-sm text-ink-500">% menos que tienda</span>
            <Button size="sm" onClick={() => applyBulkPercent(Number(bulk) || 0)}>
              Aplicar
            </Button>
            <Button size="sm" variant="outline" onClick={clearVisiblePrices}>
              Quitar precios
            </Button>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-black/[0.06] text-ink-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Producto</th>
                  <th className="px-4 py-3 font-medium">Precio tienda</th>
                  <th className="px-4 py-3 font-medium">Precio mayorista</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {visible.map((product) => {
                  const saved = prices[product.id]
                  const draft = drafts[product.id] ?? (saved ? String(saved) : '')
                  const preview = parseMoney(draft)
                  const off =
                    preview > 0 && preview < product.price
                      ? Math.round(((product.price - preview) / product.price) * 100)
                      : saved && saved < product.price
                        ? Math.round(((product.price - saved) / product.price) * 100)
                        : 0
                  return (
                    <tr key={product.id} className="border-b border-black/[0.04] last:border-0">
                      <td className="px-4 py-3">
                        <p className="font-medium text-ink-900">{product.name}</p>
                        {saved ? (
                          <p className="text-xs text-offer">Precio fijo mayorista{off ? ` · -${off}%` : ''}</p>
                        ) : (
                          <p className="text-xs text-ink-400">Sin precio fijo</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-ink-500">{formatCurrency(product.price)}</td>
                      <td className="px-4 py-3">
                        <input
                          value={draft}
                          onChange={(event) =>
                            setDrafts((current) => ({ ...current, [product.id]: event.target.value }))
                          }
                          className="h-11 w-36 rounded-xl border border-black/10 px-3"
                          inputMode="numeric"
                          placeholder="Vacío = tienda"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Button size="sm" onClick={() => saveWholesalePrice(product.id, product.price)}>
                            Guardar
                          </Button>
                          {saved ? (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setProductPrice(product.id, null)
                                setDrafts((current) => {
                                  const next = { ...current }
                                  delete next[product.id]
                                  return next
                                })
                                setMessage(`Se quitó el precio mayorista de ${product.name}.`)
                              }}
                            >
                              Quitar
                            </Button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === 'descuentos' ? (
        <section className="space-y-3">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold">Descuentos solo para mayoristas</h2>
              <p className="mt-1 text-sm text-ink-500">
                No afectan a clientes normales ni el precio de la vitrina. Si un producto tiene precio
                mayorista fijo, ese precio gana.
              </p>
            </div>
            <Button onClick={() => setForm(emptyWholesaleDiscount())}>Nueva regla</Button>
          </div>
          {discounts.length === 0 ? (
            <AdminNotice>
              Sin reglas, el mayorista ve el precio fijo que definiste o, si no hay, el de tienda.
            </AdminNotice>
          ) : null}
          {discounts.map((rule) => (
            <div key={rule.id} className="rounded-3xl bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{rule.name}</p>
                  <p className="mt-1 text-sm text-ink-500">
                    {rule.type === 'percent' ? `${rule.value}%` : `$${rule.value.toLocaleString('es-CO')}`} ·{' '}
                    {rule.scope === 'all' ? 'Toda la tienda' : rule.scope === 'category' ? 'Categoría' : 'Producto'} ·
                    desde {rule.minQuantity} und.
                  </p>
                </div>
                <StatusPill status={rule.active ? 'activa' : 'inactiva'} label={rule.active ? 'Activa' : 'Apagada'} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" onClick={() => setForm(rule)}>
                  Editar
                </Button>
                <Button size="sm" variant="outline" onClick={() => upsert({ ...rule, active: !rule.active })}>
                  {rule.active ? 'Apagar' : 'Activar'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (window.confirm(`¿Eliminar ${rule.name}?`)) {
                      remove(rule.id)
                      setMessage('Regla eliminada.')
                    }
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </section>
      ) : null}
    </div>
  )
}
