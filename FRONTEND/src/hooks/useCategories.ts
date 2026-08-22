import { categoriesService } from '@/services/api/categories.service'
import type { Category } from '@/types/category'
import { useEffect, useState } from 'react'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    void categoriesService.list().then(setCategories)
  }, [])

  return categories
}
