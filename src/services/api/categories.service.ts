import { categories } from '@/data/categories'
import type { Category } from '@/types/category'

export const categoriesService = {
  async list(): Promise<Category[]> {
    return Promise.resolve(categories)
  },

  async getBySlug(slug: string): Promise<Category | null> {
    return Promise.resolve(categories.find((category) => category.slug === slug) ?? null)
  },

  async getById(id: string): Promise<Category | null> {
    return Promise.resolve(categories.find((category) => category.id === id) ?? null)
  },
}
