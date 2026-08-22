import { ProductCard } from '@/components/shared/ProductCard'
import { Reveal } from '@/components/shared/Reveal'
import type { Product } from '@/types/product'

interface RelatedModelsProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function RelatedModels({ products, onAddToCart }: RelatedModelsProps) {
  if (products.length === 0) return null

  return (
    <section className="mt-28">
      <Reveal>
        <p className="eyebrow">Misma categoría</p>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl">
          <span className="text-gradient">Compara con otros modelos</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.id} delayMs={index * 80}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
