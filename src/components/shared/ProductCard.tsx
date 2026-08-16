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

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-100 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_20px_48px_rgba(89,83,80,0.1)]">
        <Link to={productPath(product.slug)} className="block">
          <ProductImage src={product.images[0]} alt={product.name} className="aspect-square" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew ? (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-600">
              Nuevo
            </span>
          ) : null}
          {outOfStock ? (
            <span className="rounded-md bg-ink-900 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-50">
              Agotado
            </span>
          ) : null}
        </div>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => onAddToCart(product)}
          className="absolute inset-x-4 bottom-4 rounded-full bg-ink-900 py-2.5 text-[13px] font-medium text-ink-50 transition duration-300 ease-out max-sm:translate-y-0 max-sm:opacity-100 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 disabled:hidden"
        >
          Añadir al carrito
        </button>
      </div>

      <p className="mt-5 text-[12px] font-medium text-ink-400">{product.brand}</p>
      <Link
        to={productPath(product.slug)}
        className="font-product mt-1 text-[17px] font-semibold text-ink-800 transition group-hover:text-brand-700"
      >
        {product.name}
      </Link>
      {onToggleWishlist ? (
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          className={`mt-3 self-start text-[13px] ${isWishlisted ? 'font-medium text-peri-600' : 'text-ink-400 hover:text-peri-600'}`}
        >
          {isWishlisted ? 'Guardado' : 'Guardar'}
        </button>
      ) : null}
    </article>
  )
}
