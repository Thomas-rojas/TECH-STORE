import { Price } from '@/components/shared/Price'
import { ProductImage } from '@/components/shared/ProductImage'
import { productPath } from '@/constants/routes'
import type { Product } from '@/types/product'
import { formatDiscount } from '@/utils/format'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  product: Product
  isWishlisted?: boolean
  onAddToCart: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
}

export function ProductCard({ product, isWishlisted = false, onAddToCart, onToggleWishlist }: ProductCardProps) {
  const outOfStock = product.stock <= 0
  const discount = product.compareAtPrice ? formatDiscount(product.price, product.compareAtPrice) : 0
  const onSale = discount > 0 && !product.priceMax

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-100 transition duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_rgba(89,83,80,0.12)]">
        <Link to={productPath(product.slug)} className="block">
          <ProductImage src={product.images[0]} alt={product.name} className="aspect-square" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {onSale ? (
            <span className="rounded-md bg-offer px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
              Precio de oferta
            </span>
          ) : null}
          {onSale ? (
            <span className="rounded-md bg-lima px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-800">
              Ahorro {discount}%
            </span>
          ) : product.isNew ? (
            <span className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-600">
              Nuevo
            </span>
          ) : null}
          {outOfStock ? (
            <span className="rounded-md bg-ink-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
              Agotado
            </span>
          ) : null}
        </div>
        <button
          type="button"
          disabled={outOfStock}
          onClick={() => onAddToCart(product)}
          className="absolute inset-x-4 bottom-4 rounded-full bg-ink-800 py-2.5 text-[13px] font-medium text-white transition duration-300 max-sm:translate-y-0 max-sm:opacity-100 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 disabled:hidden"
        >
          Añadir al carrito
        </button>
      </div>

      <p className="mt-5 text-[12px] font-medium text-ink-400">{product.brand}</p>
      <Link
        to={productPath(product.slug)}
        className="font-product mt-1 text-[17px] font-semibold text-ink-800 transition group-hover:text-peri-600"
      >
        {product.name}
      </Link>
      <div className="mt-2">
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          priceMax={product.priceMax}
          priceFrom={product.priceFrom}
          showSavings
        />
      </div>
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
