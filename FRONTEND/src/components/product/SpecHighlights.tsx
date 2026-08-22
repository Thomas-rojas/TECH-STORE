import {
  AudioIcon,
  BatteryIcon,
  CameraIcon,
  ChipIcon,
  DesignIcon,
  DisplayIcon,
} from '@/components/product/FeatureIcons'
import { Reveal } from '@/components/shared/Reveal'
import type { SpecHighlight } from '@/data/specSheets'
import type { ReactNode } from 'react'

interface SpecHighlightsProps {
  items: SpecHighlight[]
}

function iconFor(label: string): ReactNode {
  const key = label.toLowerCase()
  if (key.includes('chip') || key.includes('cpu') || key.includes('procesador') || key.includes('gpu')) {
    return <ChipIcon />
  }
  if (key.includes('cámara') || key.includes('camara') || key.includes('camera')) {
    return <CameraIcon />
  }
  if (key.includes('pantalla') || key.includes('display') || key.includes('retina')) {
    return <DisplayIcon />
  }
  if (key.includes('bater') || key.includes('carga') || key.includes('autonomía') || key.includes('autonomia')) {
    return <BatteryIcon />
  }
  if (key.includes('audio') || key.includes('sonido') || key.includes('altavoz')) {
    return <AudioIcon />
  }
  return <DesignIcon />
}

export function SpecHighlights({ items }: SpecHighlightsProps) {
  if (items.length === 0) return null

  return (
    <section className="mt-28">
      <Reveal>
        <h2 className="font-display text-3xl sm:text-4xl">
          <span className="text-gradient">Especificaciones clave</span>
        </h2>
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal key={`${item.label}-${item.value}`} delayMs={index * 60}>
            <article className="flex h-full flex-col rounded-[24px] bg-surface/80 px-5 py-7 shadow-[0_12px_32px_rgb(96_121_209_/_0.08)] ring-1 ring-brand-300/20 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_22px_48px_rgb(102_201_207_/_0.2)] hover:ring-lima/50">
              <span className="text-peri-600 [&_svg]:size-7">{iconFor(item.label)}</span>
              <p className="text-meta mt-5 text-[11px] uppercase tracking-[0.14em] text-ink-400">
                {item.label}
              </p>
              <p className="text-subheading mt-2 text-lg text-ink-800 sm:text-xl">
                {item.value}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
