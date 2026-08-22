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
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink-100 via-surface to-brand-100/50 ring-1 ring-brand-300/20 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_28px_64px_rgb(102_201_207_/_0.22)] group-hover:ring-lima/55">
        <Link to={productPath(product.slug)} className="block">
          <ProductImage src={product.images[0]} alt={product.name} className="aspect-square bg-transparent" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isNew ? (
            <span className="rounded-full bg-lima px-2.5 py-1 text-[10px] text-ui uppercase tracking-[0.12em] text-on-brand shadow-[0_0_16px_rgb(223_247_65_/_0.45)]">
              Nuevo
            </span>
          ) : null}
          {outOfStock ? (
            <span className="rounded-md bg-ink-900 px-2 py-1 text-[10px] text-ui uppercase tracking-[0.08em] text-ink-50">
              Agotado
            </span>
          ) : null}
        </div>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => onAddToCart(product)}
          className="absolute inset-x-4 bottom-4 rounded-full brand-gradient-cta py-2.5 text-[13px] text-ui text-on-brand shadow-[0_10px_28px_rgb(102_201_207_/_0.3)] transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] max-sm:translate-y-0 max-sm:opacity-100 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 disabled:hidden"
        >
          Añadir al carrito
        </button>
      </div>

      <p className="text-meta mt-5 text-[12px] text-ink-400">{product.brand}</p>
      <Link
        to={productPath(product.slug)}
        className="text-heading mt-1 text-[17px] text-ink-800 transition group-hover:text-peri-600"
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
