import { ChipIcon, CameraIcon, DesignIcon, BatteryIcon, DisplayIcon, AudioIcon } from '@/components/product/FeatureIcons'
import type { FeatureCard } from '@/data/productStories'

const icons = {
  chip: ChipIcon,
  camera: CameraIcon,
  design: DesignIcon,
  battery: BatteryIcon,
  display: DisplayIcon,
  audio: AudioIcon,
}

interface FeatureCardsProps {
  items: FeatureCard[]
}

export function FeatureCards({ items }: FeatureCardsProps) {
  if (items.length === 0) return null

  return (
    <section className="mt-24">
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Lo más destacado
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = icons[item.icon]
          return (
            <li key={item.title} className="rounded-3xl bg-ink-900 px-8 py-10">
              <Icon />
              <h3 className="mt-6 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-300">{item.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
