import { cn } from '@/utils/cn'

interface BrandCurvesProps {
  className?: string
}

/** Vibrant floating color fields — used behind heroes and key sections. */
export function BrandCurves({ className }: BrandCurvesProps) {
  return (
    <div className={cn('energy-blobs', className)} aria-hidden>
      <span className="energy-blob energy-blob-a" />
      <span className="energy-blob energy-blob-b" />
      <span className="energy-blob energy-blob-c" />
    </div>
  )
}
