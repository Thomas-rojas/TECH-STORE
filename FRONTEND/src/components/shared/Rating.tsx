interface RatingProps {
  value: number
  count?: number
}

export function Rating({ value, count }: RatingProps) {
  const filled = Math.round(value)

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className="tracking-tight text-amber-400" aria-label={`${value} de 5`}>
        {Array.from({ length: 5 }, (_, index) => (index < filled ? '★' : '☆')).join('')}
      </span>
      {typeof count === 'number' ? <span className="text-ink-400">({count})</span> : null}
    </div>
  )
}
