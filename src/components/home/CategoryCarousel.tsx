import { exploreItems } from '@/data/home'
import { ProductImage } from '@/components/shared/ProductImage'
import { Link } from 'react-router-dom'

export function CategoryCarousel() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Explora la gama
        </h2>

        <ul className="mt-16 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
          {exploreItems.map((item) => (
            <li key={item.id}>
              <Link to={item.href} className="group block text-center">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  className="aspect-[4/5] rounded-3xl bg-ink-900"
                />
                <p className="mt-5 text-sm font-medium text-ink-200 transition group-hover:text-white">
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
