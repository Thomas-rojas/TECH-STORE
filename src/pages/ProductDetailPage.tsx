import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { Price } from '@/components/shared/Price'
import { QuantitySelector } from '@/components/shared/QuantitySelector'
import { FeatureCards } from '@/components/product/FeatureCards'
import { FeatureChapters } from '@/components/product/FeatureChapters'
import { ProductOptions } from '@/components/product/ProductOptions'
import { SpecSheet } from '@/components/product/SpecSheet'
import { ProductImage } from '@/components/shared/ProductImage'
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
import { useUiStore } from '@/stores/ui.store'
import { useWishlist } from '@/hooks/useWishlist'
import { formatStockLabel } from '@/utils/format'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { product, category, isLoading } = useProduct(slug)
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const openCart = useUiStore((state) => state.openCart)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [color, setColor] = useState('')
  const [capacity, setCapacity] = useState('')

  const story = product ? getProductStory(product.slug) : null

  useEffect(() => {
    setActiveImage(0)
    setQuantity(1)
    if (!product) return
    const next = getProductStory(product.slug)
    setColor(next.colors[0]?.name ?? '')
    setCapacity(next.capacities[0] ?? '')
  }, [slug, product])

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

  const image = product.images[activeImage] ?? product.images[0]
  const wishlisted = has(product.id)
  const sheet = getSpecSheet(product.slug, product.specs, product.sku)

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
          <ProductImage
            src={image}
            alt={product.name}
            className="aspect-[4/5] rounded-3xl"
          />
          {product.images.length > 1 ? (
            <div className="mt-4 flex gap-3">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className={`size-16 overflow-hidden rounded-xl border ${index === activeImage ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <ProductImage src={src} className="h-full w-full" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-400">
            {category?.name ?? product.brand}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{product.name}</h1>
          <p className="mt-4 max-w-md text-base text-ink-300">{product.shortDescription}</p>
          {product.isNew ? (
            <div className="mt-4">
              <Badge tone="brand">Nuevo</Badge>
            </div>
          ) : null}
          <div className="mt-6">
            <Price price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
          </div>
          <p className="mt-2 text-sm text-ink-500">{formatStockLabel(product.stock)}</p>

          <ProductOptions
            colors={story.colors}
            capacities={story.capacities}
            color={color}
            capacity={capacity}
            onColorChange={setColor}
            onCapacityChange={setCapacity}
          />

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <QuantitySelector
              value={quantity}
              max={Math.min(appConfig.cart.maxQuantityPerItem, Math.max(product.stock, 1))}
              onChange={setQuantity}
            />
            <Button
              size="lg"
              disabled={product.stock <= 0}
              onClick={() => {
                addItem(product.id, quantity)
                openCart()
              }}
            >
              <BagIcon className="size-4" />
              Añadir a la bolsa
            </Button>
            <Button variant={wishlisted ? 'secondary' : 'outline'} size="lg" onClick={() => toggle(product.id)}>
              {wishlisted ? 'Guardado' : 'Guardar'}
            </Button>
          </div>
        </div>
      </div>

      <FeatureCards items={story.cards} />
      <FeatureChapters items={story.chapters} images={product.images} productName={product.name} />
      <SpecSheet groups={sheet.groups} productName={product.name} />
    </Container>
  )
}
