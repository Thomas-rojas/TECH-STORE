import { EmptyState } from '@/components/shared/EmptyState'
import { Price } from '@/components/shared/Price'
import { ProductImage } from '@/components/shared/ProductImage'
import { QuantitySelector } from '@/components/shared/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { appConfig } from '@/config/app'
import { ROUTES, productPath } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { formatCurrency } from '@/utils/format'
import { Link, useNavigate } from 'react-router-dom'

export function CartPage() {
  const navigate = useNavigate()
  const { lines, subtotal, setQuantity, removeItem, clear, itemCount } = useCart()

  if (lines.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Carrito vacío"
          description="Aún no has añadido productos."
          actionLabel="Explorar"
          onAction={() => void navigate(ROUTES.catalog)}
        />
      </Container>
    )
  }

  return (
    <Container className="grid gap-16 py-16 lg:grid-cols-[1fr_280px]">
      <section>
        <div className="flex items-end justify-between border-b border-white/[0.06] pb-6">
          <div>
            <p className="eyebrow">Pedido</p>
            <h1 className="mt-3 font-display text-4xl font-medium text-ink-50">Carrito ({itemCount})</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={clear}>
            Vaciar
          </Button>
        </div>
        <ul className="divide-y divide-white/[0.06]">
          {lines.map((line) => (
            <li key={line.productId} className="flex gap-6 py-8">
              <Link to={productPath(line.product.slug)} className="size-28 shrink-0">
                <ProductImage src={line.product.images[0]} alt={line.product.name} className="h-full w-full rounded-2xl" />
              </Link>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link to={productPath(line.product.slug)} className="font-display text-2xl text-ink-50">
                    {line.product.name}
                  </Link>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-ink-400">{line.product.brand}</p>
                  <div className="mt-3">
                    <Price price={line.product.price} size="sm" />
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <QuantitySelector
                    value={line.quantity}
                    max={appConfig.cart.maxQuantityPerItem}
                    onChange={(value) => setQuantity(line.productId, value)}
                  />
                  <span className="w-24 text-right text-ink-50">
                    {formatCurrency(line.product.price * line.quantity)}
                  </span>
                  <button
                    type="button"
                    className="text-[10px] uppercase tracking-[0.22em] text-ink-400 hover:text-white"
                    onClick={() => removeItem(line.productId)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="h-fit border-t border-white/[0.06] pt-8 lg:border-t-0 lg:pt-0">
        <p className="eyebrow">Resumen</p>
        <div className="mt-8 flex items-center justify-between text-sm">
          <span className="uppercase tracking-[0.18em] text-ink-400">Subtotal</span>
          <span className="text-ink-50">{formatCurrency(subtotal)}</span>
        </div>
        <Button className="mt-10 w-full" onClick={() => void navigate(ROUTES.checkout)}>
          Continuar
        </Button>
      </aside>
    </Container>
  )
}
