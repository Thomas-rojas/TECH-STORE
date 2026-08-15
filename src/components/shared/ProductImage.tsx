import { cn } from '@/utils/cn'
import { useState } from 'react'

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

export function ProductImage({
  src,
  alt = '',
  className,
  imgClassName,
  size = 'stage',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-ink-100', className)}>
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-product text-sm tracking-wide text-ink-400">{alt || 'ImportCAS'}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
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
