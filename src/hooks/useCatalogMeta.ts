import { productsService } from '@/services/api/products.service'
import { useCatalogStore } from '@/stores/catalog.store'
import { useMemo } from 'react'

export function useCatalogMeta() {
  const revision = useCatalogStore((state) => state.revision)
  return useMemo(
    () => ({
      brands: productsService.getBrands(),
      priceBounds: productsService.getPriceBounds(),
    }),
    [revision],
  )
}
