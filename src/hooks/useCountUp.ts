import { useEffect, useState } from 'react'

export function useCountUp(target: number, active: boolean, duration = 1800, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    let start: number | null = null

    const timeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - (1 - progress) ** 3
        setValue(Math.round(target * eased))
        if (progress < 1) frame = window.requestAnimationFrame(tick)
      }
      frame = window.requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      window.cancelAnimationFrame(frame)
    }
  }, [active, delay, duration, target])

  return value
}
