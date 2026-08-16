import { ProductCard } from '@/components/shared/ProductCard'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import { useUiStore } from '@/stores/ui.store'
import { Link } from 'react-router-dom'

export function FeaturedBento() {
  const { products } = useFeaturedProducts(6)
  const { addItem } = useCart()
  const openCart = useUiStore((state) => state.openCart)

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Apple · Alexa · Audio · Gaming</p>
            <h2 className="font-display mt-2 text-3xl text-ink-800 sm:text-4xl">Más vendidos</h2>
          </div>
          <Link to={ROUTES.catalog} className="text-sm text-peri-600 hover:text-brand-600">
            Ver todo el catálogo
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(item) => {
                addItem(item.id)
                openCart()
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
