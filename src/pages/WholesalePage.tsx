import { canAccessAdminPanel, isWholesaleApproved } from '@/auth/permissions'
import { QuantitySelector } from '@/components/shared/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { appConfig } from '@/config/app'
import { ROUTES } from '@/constants/routes'
import { categories } from '@/data/categories'
import { useCart } from '@/hooks/useCart'
import { quoteWholesale } from '@/services/api/wholesale-pricing'
import { useCatalogStore } from '@/stores/catalog.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useUiStore } from '@/stores/ui.store'
import { useWholesaleStore } from '@/stores/wholesale.store'
import { formatCurrency } from '@/utils/format'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export function WholesalePage() {
  const session = useCustomerAuthStore((state) => state.session)
  const requestWholesale = useCustomerAuthStore((state) => state.requestWholesale)
  const openAuth = useUiStore((state) => state.openAuth)
  const products = useCatalogStore((state) => state.products)
  const discounts = useWholesaleStore((state) => state.discounts)
  const prices = useWholesaleStore((state) => state.prices)
  const { addItem } = useCart()
  const openCart = useUiStore((state) => state.openCart)
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('all')
  const [qty, setQty] = useState<Record<string, number>>({})
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((product) => {
      if (categoryId !== 'all' && product.categoryId !== categoryId) return false
      if (q && !`${product.name} ${product.brand}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [products, query, categoryId])

  if (session && canAccessAdminPanel(session)) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Panel mayorista</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          Este espacio es solo para clientes mayoristas. Tú entras por el panel de administración.
        </p>
        <Link to={ROUTES.admin} className="mt-6 inline-block">
          <Button>Ir al panel administrador</Button>
        </Link>
      </Container>
    )
  }

  if (!session) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Panel mayorista</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-500">
          Entra con tu cuenta. Si aún no eres mayorista, puedes solicitarlo al registrarte o en tu perfil.
        </p>
        <Button className="mt-6" onClick={openAuth}>
          Iniciar sesión
        </Button>
      </Container>
    )
  }

  if (!isWholesaleApproved(session)) {
    return (
      <Container className="max-w-lg space-y-6 py-16">
        <h1 className="font-display text-3xl font-semibold">Acceso mayorista</h1>
        {session.wholesaleStatus === 'pending' ? (
          <p className="text-ink-500">Tu solicitud está en revisión. Cuando la aprueben, aquí verás precios y cantidades.</p>
        ) : (
          <>
            <p className="text-sm leading-relaxed text-ink-500">
              Este panel es solo para clientes mayoristas aprobados. Marca que compras por mayor y espera la
              confirmación del administrador.
            </p>
            <textarea
              className="min-h-24 w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
              placeholder="¿Para qué negocio compras? (opcional)"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
            <Button
              onClick={() => {
                if (requestWholesale(note) === 'ok') setSent(true)
              }}
            >
              ¿Compras por mayor? Solicitar acceso
            </Button>
            {sent ? <p className="text-sm text-ink-500">Solicitud enviada.</p> : null}
            <Link to={ROUTES.account} className="block text-sm text-peri-600">
              Ir a mi cuenta
            </Link>
          </>
        )}
      </Container>
    )
  }

  return (
    <Container className="space-y-6 py-16">
      <div>
        <p className="text-sm font-medium text-brand-700">Cliente mayorista</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
          Precios y cantidades
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-500">
          Estos precios y descuentos son solo para tu cuenta mayorista. En la tienda pública se ve el
          precio normal.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_200px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar producto"
          className="h-12 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brand-600"
        />
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="h-12 rounded-2xl border border-black/10 bg-white px-4"
        >
          <option value="all">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/[0.06] text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">Producto</th>
              <th className="px-4 py-3 font-medium">Precio tienda</th>
              <th className="px-4 py-3 font-medium">Precio mayorista</th>
              <th className="px-4 py-3 font-medium">Cantidad</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {visible.map((product) => {
              const quantity = qty[product.id] ?? 1
              const quote = quoteWholesale(product, quantity, discounts, prices)
              return (
                <tr key={product.id} className="border-b border-black/[0.04] last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-medium text-ink-900">{product.name}</p>
                    <p className="text-xs text-ink-400">
                      {product.brand}
                      {quote.ruleName ? ` · ${quote.ruleName}` : ''}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-ink-400 line-through">{formatCurrency(quote.retail)}</td>
                  <td className="px-4 py-4 font-semibold">
                    <span className={quote.percent > 0 ? 'text-offer-gradient' : 'text-ink-900'}>
                      {formatCurrency(quote.unitPrice)}
                    </span>
                    {quote.percent > 0 ? (
                      <span className="offer-pill offer-pill-lima ml-2 align-middle">-{quote.percent}%</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">
                    <QuantitySelector
                      value={quantity}
                      max={Math.min(appConfig.wholesale.maxQuantityPerItem, Math.max(product.stock, 1))}
                      onChange={(value) => setQty((current) => ({ ...current, [product.id]: value }))}
                    />
                  </td>
                  <td className="px-4 py-4">{formatCurrency(quote.lineTotal)}</td>
                  <td className="px-4 py-4">
                    <Button
                      size="sm"
                      disabled={product.stock <= 0}
                      onClick={() => {
                        addItem(product.id, quantity)
                        openCart()
                      }}
                    >
                      Agregar
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Container>
  )
}
