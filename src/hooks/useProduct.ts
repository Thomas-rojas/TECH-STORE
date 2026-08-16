import { categoriesService } from '@/services/api/categories.service'
import { productsService } from '@/services/api/products.service'
import { useCatalogStore } from '@/stores/catalog.store'
import type { Category } from '@/types/category'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

interface UseProductResult {
  product: Product | null
  category: Category | null
  isLoading: boolean
}

export function useProduct(slug: string | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const revision = useCatalogStore((state) => state.revision)

  useEffect(() => {
    if (!slug) {
      setProduct(null)
      setCategory(null)
      setIsLoading(false)
      return
    }

    let active = true
    setIsLoading(true)

    void productsService.getBySlug(slug).then(async (item) => {
      if (!active) return
      setProduct(item)
      const related = item ? await categoriesService.getById(item.categoryId) : null
      if (!active) return
      setCategory(related)
      setIsLoading(false)
    })

    return () => {
      active = false
    }
  }, [slug, revision])

  return { product, category, isLoading }
}
