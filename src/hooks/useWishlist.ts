import { productsService } from '@/services/api/products.service'
import { useWishlistStore } from '@/stores/wishlist.store'
import type { Product } from '@/types/product'
import { useEffect, useState } from 'react'

export function useWishlist() {
  const productIds = useWishlistStore((state) => state.productIds)
  const toggle = useWishlistStore((state) => state.toggle)
  const has = useWishlistStore((state) => state.has)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    if (productIds.length === 0) {
      setProducts([])
      return
    }
    void productsService.getByIds(productIds).then(setProducts)
  }, [productIds])

  return { productIds, products, toggle, has }
}
