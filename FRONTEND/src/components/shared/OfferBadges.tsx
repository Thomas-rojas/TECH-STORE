interface OfferBadgesProps {
  discount: number
  className?: string
}

export function OfferBadges({ discount, className = 'flex flex-col items-start gap-1.5' }: OfferBadgesProps) {
  return (
    <div className={className}>
      <span className="offer-pill offer-pill-coral">Precio de oferta</span>
      <span className="offer-pill offer-pill-lima">Ahorro {discount}%</span>
    </div>
  )
}
