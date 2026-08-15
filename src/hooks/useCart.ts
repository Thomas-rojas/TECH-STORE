import { productsService } from '@/services/api/products.service'
import { useCartStore } from '@/stores/cart.store'
import type { CartLine } from '@/types/cart'
import type { Product } from '@/types/product'
import { useEffect, useMemo, useState } from 'react'

export function useCart() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const ids = items.map((item) => item.productId)
    if (ids.length === 0) {
      setProducts([])
      return
    }

    void productsService.getByIds(ids).then(setProducts)
  }, [items])

  const lines: CartLine[] = useMemo(() => {
    return items.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.productId)
      if (!product) return []
      return [{ ...item, product }]
    })
  }, [items, products])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  return {
    items,
    lines,
    itemCount,
    subtotal,
    addItem,
    setQuantity,
    removeItem,
    clear,
  }
}
