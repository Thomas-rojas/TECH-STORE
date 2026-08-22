import { Breadcrumbs } from '@/components/shared/Breadcrumbs'
import { EmptyState } from '@/components/shared/EmptyState'
import { FilterPanel } from '@/components/shared/FilterPanel'
import { Pagination } from '@/components/shared/Pagination'
import { ProductGrid } from '@/components/shared/ProductGrid'
import { SearchIcon } from '@/components/ui/Icons'
import { Container } from '@/components/ui/Container'
import { Select } from '@/components/ui/Select'
import { SORT_LABELS, SORT_OPTIONS, type SortOption } from '@/constants/catalog'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { useCategories } from '@/hooks/useCategories'
import { useDebounce } from '@/hooks/useDebounce'
import { useProducts } from '@/hooks/useProducts'
import { useUiStore } from '@/stores/ui.store'
import { DEFAULT_CATALOG_FILTERS, type CatalogFilters } from '@/types/catalog'
import type { Product } from '@/types/product'
import { useEffect, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

export function CatalogPage() {
  const { categorySlug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const categories = useCategories()
  const { addItem } = useCart()
  const openCart = useUiStore((state) => state.openCart)

  const query = searchParams.get('q') ?? ''
  const brand = searchParams.get('marca') ?? ''
  const page = Number(searchParams.get('page') ?? '1') || 1
  const sort = (searchParams.get('sort') as SortOption) || SORT_OPTIONS.featured

  const [search, setSearch] = useState(query)
  const debouncedSearch = useDebounce(search, 350)

  useEffect(() => {
    setSearch(query)
  }, [query])

  useEffect(() => {
    setSearchParams((params) => {
      const current = params.get('q') ?? ''
      const value = debouncedSearch.trim()
      if (current === value) return params
      const next = new URLSearchParams(params)
      if (value) next.set('q', value)
      else next.delete('q')
      next.delete('page')
      return next
    })
  }, [debouncedSearch, setSearchParams])

  const filters: CatalogFilters = useMemo(
    () => ({
      ...DEFAULT_CATALOG_FILTERS,
      query,
      categorySlug: categorySlug ?? null,
      brands: brand ? [brand] : [],
      sort,
      page,
    }),
    [query, categorySlug, brand, sort, page],
  )

  const { data, isLoading } = useProducts(filters)
  const activeCategory = categories.find((category) => category.slug === categorySlug)

  function patchParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams)
    Object.entries(next).forEach(([key, value]) => {
      if (!value) params.delete(key)
      else params.set(key, value)
    })
    setSearchParams(params)
  }

  function handleAdd(product: Product) {
    addItem(product.id)
    openCart()
  }

  const title = [activeCategory?.name, brand].filter(Boolean).join(' · ') || (query ? `Resultados para “${query}”` : 'productos')

  return (
    <Container className="py-16">
      <Breadcrumbs
        items={[
          { label: 'Inicio', href: ROUTES.home },
          { label: 'Productos', href: ROUTES.catalog },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
          ...(brand ? [{ label: brand }] : []),
        ]}
      />

      <div className="mt-12 mb-14 max-w-3xl">
        <h1 className="font-display mt-3 text-3xl text-ink-800 sm:text-5xl">
          {activeCategory || brand ? (
            title
          ) : query ? (
            title
          ) : (
            'Todos los productos'
          )}
        </h1>
        {activeCategory ? (
          <p className="text-subheading mt-4 max-w-xl text-base text-ink-500">{activeCategory.description}</p>
        ) : (
          <p className="text-subheading mt-4 max-w-xl text-base text-ink-500">
            Inventario sólido y seguridad en cada compra.
          </p>
        )}
      </div>

      <div className="relative mb-16">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar"
          className="h-12 w-full rounded-full border border-black/10 bg-ink-100 pl-12 pr-4 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-brand-500"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <FilterPanel
          categories={categories}
          activeCategory={categorySlug}
          queryString={(() => {
            const params = new URLSearchParams(searchParams)
            params.delete('page')
            return params.toString()
          })()}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-end gap-4">
            <Select
              value={sort}
              onChange={(event) => patchParams({ sort: event.target.value, page: '1' })}
              className="w-44"
            >
              {Object.values(SORT_OPTIONS).map((option) => (
                <option key={option} value={option}>
                  {SORT_LABELS[option]}
                </option>
              ))}
            </Select>
            <p className="text-sm text-ink-400">{data ? `${data.total} productos` : 'Cargando'}</p>
          </div>

          {!isLoading && data?.items.length === 0 ? (
            <EmptyState
              title="Sin resultados"
              description="Ajusta los filtros o prueba otra búsqueda."
            />
          ) : (
            <ProductGrid
              products={data?.items ?? []}
              isLoading={isLoading}
              onAddToCart={handleAdd}
            />
          )}
          {data ? (
            <Pagination
              page={data.page}
              pageCount={data.pageCount}
              onPageChange={(nextPage) => patchParams({ page: String(nextPage) })}
            />
          ) : null}
        </div>
      </div>
    </Container>
  )
}
