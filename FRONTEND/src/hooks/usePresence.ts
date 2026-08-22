import { useEffect, useState } from 'react'

export function usePresence(open: boolean, duration = 320) {
  const [mounted, setMounted] = useState(open)
  const [entered, setEntered] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true))
      })
      return () => window.cancelAnimationFrame(frame)
    }

    setEntered(false)
    const timer = window.setTimeout(() => setMounted(false), duration)
    return () => window.clearTimeout(timer)
  }, [open, duration])

  return { mounted, entered }
}
