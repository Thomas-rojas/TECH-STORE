import { cn } from '@/utils/cn'

interface BrandCurvesProps {
  className?: string
}

export function BrandCurves({ className }: BrandCurvesProps) {
  return (
    <svg
      viewBox="0 0 1440 420"
      fill="none"
      className={cn('pointer-events-none absolute inset-x-0 top-0 w-full', className)}
      aria-hidden
    >
      <path
        d="M-80 320c220-180 420-220 720-120 300 100 520 40 820-140"
        stroke="#64cad4"
        strokeOpacity="0.45"
        strokeWidth="48"
        strokeLinecap="round"
      />
      <path
        d="M-40 380c240-160 460-200 740-80 280 120 500 60 780-120"
        stroke="#5a7ecc"
        strokeOpacity="0.35"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <path
        d="M40 410c260-140 500-170 760-40"
        stroke="#98f1c4"
        strokeOpacity="0.32"
        strokeWidth="22"
        strokeLinecap="round"
      />
    </svg>
  )
}
