import { Button } from '@/components/ui/Button'
import { ProductImage } from '@/components/shared/ProductImage'
import { ROUTES, productPath } from '@/constants/routes'
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts'
import type { Product } from '@/types/product'
import { formatCurrency } from '@/utils/format'
import { Link } from 'react-router-dom'

function FeaturedCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col">
      <Link to={productPath(product.slug)} className="block">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          className="aspect-square rounded-3xl"
        />
      </Link>
      <p className="mt-5 text-sm text-ink-400">{product.brand}</p>
      <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">{product.name}</h3>
      <p className="mt-4 text-base text-white">{formatCurrency(product.price)}</p>
      <div className="mt-5">
        <Link to={productPath(product.slug)}>
          <Button size="sm">Más información</Button>
        </Link>
      </div>
    </article>
  )
}

export function FeaturedBento() {
  const { products } = useFeaturedProducts(8)
  const featured = [
    products.find((item) => item.slug === 'iphone-16-pro'),
    products.find((item) => item.slug === 'macbook-pro-m4'),
    products.find((item) => item.slug === 'samsung-galaxy-s25'),
  ].filter(Boolean) as Product[]

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Destacados
          </h2>
          <Link to={ROUTES.catalog} className="text-sm text-brand-400 hover:text-brand-300">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {featured.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
