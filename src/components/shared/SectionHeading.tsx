interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-2xl">
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="font-display text-4xl text-ink-800">{title}</h2>
      {description ? <p className="mt-4 text-ink-500 leading-[1.35]">{description}</p> : null}
    </div>
  )
}
