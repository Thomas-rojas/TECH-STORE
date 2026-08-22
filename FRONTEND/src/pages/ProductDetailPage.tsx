import { FeatureCards } from '@/components/product/FeatureCards'
import { FeatureChapters } from '@/components/product/FeatureChapters'
import { ProductOptions } from '@/components/product/ProductOptions'
import { RelatedModels } from '@/components/product/RelatedModels'
import { SpecHighlights } from '@/components/product/SpecHighlights'
import { SpecSheet } from '@/components/product/SpecSheet'
import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { ProductImage } from '@/components/shared/ProductImage'
import { QuantitySelector } from '@/components/shared/QuantitySelector'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { BagIcon } from '@/components/ui/Icons'
import { Spinner } from '@/components/ui/Spinner'
import { appConfig } from '@/config/app'
import { ROUTES, catalogPath } from '@/constants/routes'
import { getProductStory } from '@/data/productStories'
import { getSpecSheet } from '@/data/specSheets'
import { useCart } from '@/hooks/useCart'
import { useProduct } from '@/hooks/useProduct'
import { useWishlist } from '@/hooks/useWishlist'
import { productsService } from '@/services/api/products.service'
import { useUiStore } from '@/stores/ui.store'
import type { Product } from '@/types/product'
import { cn } from '@/utils/cn'
import { formatStockLabel } from '@/utils/format'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function softBlob(hex: string | undefined): string {
  if (!hex) return 'color-mix(in srgb, var(--color-brand-300) 38%, var(--color-ink-100))'
  return `color-mix(in srgb, ${hex} 30%, var(--color-ink-100))`
}

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { product, category, isLoading } = useProduct(slug)
  const { addItem, wholesale } = useCart()
  const { toggle, has } = useWishlist()
  const openCart = useUiStore((state) => state.openCart)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState('')
  const [capacity, setCapacity] = useState('')
  const [related, setRelated] = useState<Product[]>([])
  const [added, setAdded] = useState(false)

  const story = product ? getProductStory(product.slug) : null

  useEffect(() => {
    setActiveImage(0)
    setQuantity(1)
    setAdded(false)
    if (!product) {
      setRelated([])
      return
    }
    const next = getProductStory(product.slug)
    setColor(next.colors[0]?.name ?? '')
    setCapacity(next.capacities[0] ?? '')

    let active = true
    void productsService.getRelated(product.categoryId, product.id, 3).then((items) => {
      if (active) setRelated(items)
    })
    return () => {
      active = false
    }
  }, [slug, product])

  const selectedColor = useMemo(
    () => story?.colors.find((item) => item.name === color),
    [story, color],
  )

  useEffect(() => {
    if (!product || !story || story.colors.length === 0) return
    const colorIndex = story.colors.findIndex((item) => item.name === color)
    if (colorIndex < 0 || product.images.length <= 1) return
    setActiveImage(colorIndex % product.images.length)
  }, [color, product, story])

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!product || !story) {
    return (
      <Container className="py-16">
        <EmptyState
          title="Producto no encontrado"
          description="El artículo no existe en el catálogo actual."
          actionLabel="Volver al catálogo"
          onAction={() => void navigate(ROUTES.catalog)}
        />
      </Container>
    )
  }

  const wishlisted = has(product.id)
  const sheet = getSpecSheet(product.slug, product.specs, product.sku)
  const highlights =
    sheet.highlights.length > 0
      ? sheet.highlights
      : [
          ...Object.entries(product.specs)
            .slice(0, 5)
            .map(([label, value]) => ({ label, value })),
          { label: 'SKU', value: product.sku },
        ]

  const productId = product.id

  function handleAdd() {
    addItem(productId, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
    openCart()
  }

  function handleColorChange(name: string) {
    setColor(name)
  }

  return (
    <Container className="py-16">
      <Breadcrumbs
        items={[
          { label: category?.name ?? 'Productos', href: category ? catalogPath(category.slug) : ROUTES.catalog },
          { label: product.name },
        ]}
      />

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div
            className="product-stage relative overflow-hidden rounded-[36px] transition-[background] duration-700 ease-out"
            style={{ background: softBlob(selectedColor?.hex) }}
          >
            <div className="product-stage-glow" aria-hidden />
            <div className="relative aspect-square sm:aspect-[4/5]">
              {product.images.map((src, index) => (
                <ProductImage
                  key={src}
                  src={src}
                  alt={product.name}
                  size="hero"
                  className={cn(
                    'absolute inset-0 bg-transparent transition-opacity duration-500 ease-out',
                    index === activeImage ? 'opacity-100' : 'pointer-events-none opacity-0',
                  )}
                  imgClassName="p-8 sm:p-14"
                />
              ))}
            </div>
          </div>

          {product.images.length > 1 ? (
            <div className="mt-5 flex gap-3">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    'size-16 overflow-hidden rounded-2xl bg-ink-100 ring-2 transition duration-300',
                    index === activeImage ? 'ring-peri-500' : 'ring-transparent opacity-55 hover:opacity-100',
                  )}
                >
                  <ProductImage src={src} size="thumb" className="h-full w-full bg-transparent" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-meta text-xs uppercase tracking-[0.14em] text-ink-400">
            {category?.name ?? product.brand}
          </p>
          <h1 className="text-heading mt-3 text-3xl sm:text-4xl lg:text-5xl">
            <span className="text-gradient">{product.name}</span>
          </h1>
          <p className="text-subheading mt-4 max-w-md text-base text-ink-500">{product.shortDescription}</p>
          {product.isNew ? (
            <div className="mt-4">
              <Badge tone="brand">Nuevo</Badge>
            </div>
          ) : null}
          <p className="mt-6 text-sm text-ink-500">{formatStockLabel(product.stock)}</p>

          <ProductOptions
            colors={story.colors}
            capacities={story.capacities}
            color={color}
            capacity={capacity}
            onColorChange={handleColorChange}
            onCapacityChange={setCapacity}
          />

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <QuantitySelector
              value={quantity}
              max={Math.min(
                wholesale ? appConfig.wholesale.maxQuantityPerItem : appConfig.cart.retailMaxQuantity,
                Math.max(product.stock, 1),
              )}
              onChange={setQuantity}
            />
            <Button
              size="lg"
              disabled={product.stock <= 0}
              onClick={handleAdd}
              className={cn(
                'min-w-[11.5rem] shadow-[0_12px_28px_rgba(100,202,212,0.28)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(100,202,212,0.34)]',
                added && 'bg-lima text-ink-800 hover:bg-lima',
              )}
            >
              {added ? (
                <>
                  <CheckMark />
                  Añadido
                </>
              ) : (
                <>
                  <BagIcon className="size-4" />
                  Añadir a la bolsa
                </>
              )}
            </Button>
            <Button
              variant={wishlisted ? 'secondary' : 'outline'}
              size="lg"
              onClick={() => toggle(product.id)}
              className="min-w-[7.5rem] transition duration-300 hover:scale-[1.02]"
            >
              {wishlisted ? 'Guardado' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>

      <FeatureCards items={story.cards} />
      <FeatureChapters items={story.chapters} images={product.images} productName={product.name} />
      <SpecHighlights items={highlights.slice(0, 8)} />
      <SpecSheet groups={sheet.groups} productName={product.name} />
      <RelatedModels
        products={related}
        onAddToCart={(item) => {
          addItem(item.id)
          openCart()
        }}
      />
    </Container>
  )
}

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
      <path
        d="M4.5 10.5 8 14l7.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
