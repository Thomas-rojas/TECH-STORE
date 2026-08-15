import { EmptyState } from '@/components/shared/EmptyState'
import { ProductGrid } from '@/components/shared/ProductGrid'
import { Container } from '@/components/ui/Container'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useUiStore } from '@/stores/ui.store'
import type { Product } from '@/types/product'
import { useNavigate } from 'react-router-dom'

export function WishlistPage() {
  const navigate = useNavigate()
  const { products, productIds, toggle } = useWishlist()
  const { addItem } = useCart()
  const openCart = useUiStore((state) => state.openCart)

  function handleAdd(product: Product) {
    addItem(product.id)
    openCart()
  }

  return (
    <Container className="py-10">
      <h1 className="mb-12 font-display text-5xl font-medium text-ink-900">Favoritos</h1>
      {productIds.length === 0 ? (
        <EmptyState
          title="Sin favoritos"
          description="Guarda productos para compararlos o comprarlos más tarde."
          actionLabel="Ver catálogo"
          onAction={() => void navigate(ROUTES.catalog)}
        />
      ) : (
        <ProductGrid
          products={products}
          wishlistedIds={productIds}
          onAddToCart={handleAdd}
          onToggleWishlist={(product) => toggle(product.id)}
        />
      )}
    </Container>
  )
}
