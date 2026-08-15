import { productsService } from '@/services/api/products.service'
import type { CatalogFilters, PaginatedResult } from '@/types/catalog'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

interface UseProductsResult {
  data: PaginatedResult<Product> | null
  isLoading: boolean
}

export function useProducts(filters: CatalogFilters): UseProductsResult {
  const [data, setData] = useState<PaginatedResult<Product> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    setIsLoading(true)

    void productsService.list(filters).then((result) => {
      if (!active) return
      setData(result)
      setIsLoading(false)
    })

    return () => {
      active = false
    }
  }, [filters])

  return { data, isLoading }
}
