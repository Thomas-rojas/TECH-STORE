import { Button } from '@/components/ui/Button'

interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
}

export function QuantitySelector({ value, min = 1, max = 10, onChange }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-black/15">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none tracking-normal normal-case"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label="Disminuir"
      >
        −
      </Button>
      <span className="w-10 text-center text-sm font-semibold">{value}</span>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-none tracking-normal normal-case"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar"
      >
        +
      </Button>
    </div>
  )
}
