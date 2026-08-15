import { productsService } from '@/services/api/products.service'

export function useCatalogMeta() {
  return {
    brands: productsService.getBrands(),
    priceBounds: productsService.getPriceBounds(),
  }
}
