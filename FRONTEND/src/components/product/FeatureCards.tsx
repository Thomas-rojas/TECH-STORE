import {
  AudioIcon,
  BatteryIcon,
  CameraIcon,
  ChipIcon,
  DesignIcon,
  DisplayIcon,
} from '@/components/product/FeatureIcons'
import { Reveal } from '@/components/shared/Reveal'
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
    <section className="mt-28">
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl">
          <span className="text-gradient">Lo más destacado</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[item.icon]
          return (
            <Reveal key={item.title} delayMs={index * 90}>
              <article className="flex h-full flex-col rounded-[28px] bg-surface/80 px-8 py-12 shadow-[0_16px_40px_rgb(96_121_209_/_0.1)] ring-1 ring-brand-300/25 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_28px_64px_rgb(102_201_207_/_0.22)] hover:ring-lima/50">
                <span className="flex size-14 items-center justify-center rounded-2xl brand-gradient-mint text-ink-900 shadow-[0_10px_28px_rgb(102_201_207_/_0.28)] [&_svg]:size-9">
                  <Icon />
                </span>
                <h3 className="text-heading mt-8 text-2xl text-ink-800">
                  {item.title}
                </h3>
                <p className="text-body mt-4 text-[15px] text-ink-500">{item.text}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
