import { cn } from '@/utils/cn'
import { useEffect, useRef, useState } from 'react'

interface ProductImageProps {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
  size?: 'stage' | 'hero' | 'thumb'
}

const padding = {
  stage: 'p-6 sm:p-8',
  hero: 'p-8 sm:p-12',
  thumb: 'p-2',
}

function srcCandidates(src: string): string[] {
  const match = src.match(/^(.*)\.(png|jpe?g|avif)$/i)
  if (!match) return [src]
  const base = match[1]
  const ext = match[2].toLowerCase()
  const order =
    ext === 'avif'
      ? ['avif', 'jpg', 'png']
      : ext === 'png'
        ? ['png', 'jpg', 'avif']
        : ['jpg', 'avif', 'png']
  const unique = [src]
  for (const nextExt of order) {
    const next = `${base}.${nextExt}`
    if (!unique.includes(next)) unique.push(next)
  }
  return unique
}

export function ProductImage({
  src,
  alt = '',
  className,
  imgClassName,
  size = 'stage',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)
  const [current, setCurrent] = useState(src)
  const remainingRef = useRef<string[]>([])

  useEffect(() => {
    const [first, ...rest] = srcCandidates(src)
    remainingRef.current = rest
    setFailed(false)
    setCurrent(first)
  }, [src])

  return (
    <div className={cn('relative overflow-hidden bg-ink-100', className)}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-meta text-sm tracking-wide text-ink-400">{alt || 'ImportCAS'}</span>
        </div>
      ) : (
        <img
          src={current}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => {
            const next = remainingRef.current.shift()
            if (next) {
              setCurrent(next)
              return
            }
            setFailed(true)
          }}
          className={cn(
            'absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_24px_40px_rgba(35,31,31,0.12)] transition duration-700 ease-out group-hover:scale-[1.045]',
            padding[size],
            imgClassName,
          )}
        />
      )}
    </div>
  )
}
