import { ProductCard } from '@/components/shared/ProductCard'
import { Spinner } from '@/components/ui/Spinner'
import type { Product } from '@/types/product'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  wishlistedIds?: string[]
  onAddToCart: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

export function ProductGrid({
  products,
  isLoading = false,
  wishlistedIds = [],
  onAddToCart,
  onToggleWishlist,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistedIds.includes(product.id)}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  )
}
