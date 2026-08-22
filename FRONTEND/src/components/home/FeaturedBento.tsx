import { ProductCard } from '@/components/shared/ProductCard'
import { Reveal } from '@/components/shared/Reveal'
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
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-brand-100/40 to-transparent dark:from-brand-50/30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Apple · Alexa · Audio · Gaming</p>
              <h2 className="font-display mt-2 text-3xl sm:text-4xl">
                <span className="text-gradient">Más vendidos</span>
              </h2>
            </div>
            <Link
              to={ROUTES.catalog}
              className="text-ui text-sm text-peri-600 underline decoration-lima decoration-2 underline-offset-4 transition hover:text-brand-600"
            >
              Ver todo el catálogo
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delayMs={index * 70}>
              <ProductCard
                product={product}
                onAddToCart={(item) => {
                  addItem(item.id)
                  openCart()
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
