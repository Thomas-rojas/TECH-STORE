import { Badge } from '@/components/ui/Badge'
import { Price } from '@/components/shared/Price'
import { ProductImage } from '@/components/shared/ProductImage'
import { productPath } from '@/constants/routes'
import type { Product } from '@/types/product'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: Product
  isWishlisted?: boolean
  onAddToCart: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

export function ProductCard({ product, isWishlisted = false, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const outOfStock = product.stock <= 0
  const onSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price)

  return (
    <article className="group flex h-full flex-col">
      <div className="relative">
        <Link to={productPath(product.slug)} className="block">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            className="aspect-square rounded-3xl"
          />
        </Link>
        <div className="absolute left-4 top-4 flex gap-2">
          {product.isNew ? <Badge tone="brand">Nuevo</Badge> : null}
          {onSale ? <Badge tone="sale">Oferta</Badge> : null}
          {outOfStock ? <Badge tone="warning">Agotado</Badge> : null}
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-400">{product.brand}</p>
      <Link
        to={productPath(product.slug)}
        className="mt-1 text-[17px] font-semibold tracking-tight text-white transition group-hover:text-ink-200"
      >
        {product.name}
      </Link>
      <div className="mt-2">
        <Price price={product.price} compareAtPrice={product.compareAtPrice} />
      </div>
      <div className="mt-4 flex gap-4 text-sm">
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => onAddToCart(product)}
          className="text-brand-400 hover:text-brand-300 disabled:opacity-40"
        >
          Añadir
        </button>
        {onToggleWishlist ? (
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className={isWishlisted ? 'text-brand-400' : 'text-ink-500 hover:text-white'}
          >
            Guardar
          </button>
        ) : null}
      </div>
    </article>
  )
}
