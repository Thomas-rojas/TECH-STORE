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
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                {chapter.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-300">{chapter.body}</p>
            </div>

            {image ? (
              <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] bg-black">
                <img
                  src={image}
                  alt={productName}
                  referrerPolicy="no-referrer"
                  className="aspect-[16/9] h-auto w-full object-cover object-center"
                />
              </div>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
