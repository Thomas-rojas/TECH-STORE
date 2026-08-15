export type ProductId = string

export type ProductSpecs = Record<string, string>

export interface Product {
  id: ProductId
  slug: string
  sku: string
  name: string
  brand: string
  shortDescription: string
  description: string
  highlight: string
  price: number
  compareAtPrice?: number
  images: string[]
  categoryId: string
  rating: number
  reviewCount: number
  stock: number
  specs: ProductSpecs
  tags: string[]
  featured: boolean
  isNew: boolean
  createdAt: string
}
