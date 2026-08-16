import { ProductImage } from '@/components/shared/ProductImage'
import type { FeatureChapter } from '@/data/productStories'

interface FeatureChaptersProps {
  items: FeatureChapter[]
  images?: string[]
  productName: string
}

export function FeatureChapters({ items, images = [], productName }: FeatureChaptersProps) {
  if (items.length === 0) return null

  return (
    <section className="mt-28 space-y-32">
      {items.map((chapter, index) => {
        const image = chapter.image ?? (index === 0 ? images[0] : undefined)

        return (
          <div key={chapter.title}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-ink-400">{chapter.kicker}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
                {chapter.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-500">{chapter.body}</p>
            </div>

            {image ? (
              <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-[28px] bg-ink-100">
                <ProductImage src={image} alt={productName} className="aspect-[16/10]" size="hero" />
              </div>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
