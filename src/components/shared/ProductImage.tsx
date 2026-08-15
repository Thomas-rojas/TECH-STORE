import { cn } from '@/utils/cn'

interface ProductImageProps {
  src: string
  alt?: string
  className?: string
  imgClassName?: string
}

export function ProductImage({ src, alt = '', className, imgClassName }: ProductImageProps) {
  return (
    <div className={cn('relative overflow-hidden bg-black', className)}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className={cn(
          'absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.04]',
          imgClassName,
        )}
      />
    </div>
  )
}
