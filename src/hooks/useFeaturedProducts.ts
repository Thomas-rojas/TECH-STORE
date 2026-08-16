import { productsService } from '@/services/api/products.service'
import { useCatalogStore } from '@/stores/catalog.store'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const revision = useCatalogStore((state) => state.revision)

  useEffect(() => {
    let active = true
    void productsService.getFeatured(limit).then((items) => {
      if (!active) return
      setProducts(items)
      setIsLoading(false)
    })
    return () => {
      active = false
    }
  }, [limit, revision])

  return { products, isLoading }
}
