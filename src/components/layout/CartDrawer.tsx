import { EmptyState } from '@/components/shared/EmptyState'
import { Price } from '@/components/shared/Price'
import { ProductImage } from '@/components/shared/ProductImage'
import { QuantitySelector } from '@/components/shared/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { appConfig } from '@/config/app'
import { ROUTES, productPath } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useUiStore } from '@/stores/ui.store'
import { formatCurrency } from '@/utils/format'
import { Link, useNavigate } from 'react-router-dom'

export function CartDrawer() {
  const navigate = useNavigate()
  const isCartOpen = useUiStore((state) => state.isCartOpen)
  const closeCart = useUiStore((state) => state.closeCart)
  const { lines, subtotal, setQuantity, removeItem } = useCart()

  function go(path: string) {
    closeCart()
    void navigate(path)
  }

  return (
    <Modal open={isCartOpen} title="Carrito" onClose={closeCart}>
      {lines.length === 0 ? (
        <div className="p-5">
          <EmptyState
            title="Tu carrito está vacío"
            description="Explora el catálogo y añade productos tecnológicos."
            actionLabel="Ir al catálogo"
            onAction={() => go(ROUTES.catalog)}
          />
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 space-y-4 p-5">
            {lines.map((line) => (
              <li key={line.productId} className="flex gap-3">
                <Link to={productPath(line.product.slug)} onClick={closeCart} className="size-20 shrink-0">
                  <ProductImage src={line.product.images[0]} alt="" size="thumb" className="h-full w-full" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={productPath(line.product.slug)} onClick={closeCart} className="line-clamp-1 font-display text-xl text-ink-900">
                    {line.product.name}
                  </Link>
                  <Price price={line.product.price} size="sm" />
                  <div className="mt-2 flex items-center justify-between">
                    <QuantitySelector
                      value={line.quantity}
                      max={appConfig.cart.maxQuantityPerItem}
                      onChange={(value) => setQuantity(line.productId, value)}
                    />
                    <button
                      type="button"
                      className="text-xs text-ink-400 hover:text-ink-900"
                      onClick={() => removeItem(line.productId)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t border-black/[0.06] p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.22em] text-ink-400">Subtotal</span>
              <span className="font-display text-2xl text-ink-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="grid gap-3">
              <Button onClick={() => go(ROUTES.cart)}>Ver carrito</Button>
              <Button variant="outline" onClick={() => go(ROUTES.checkout)}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
