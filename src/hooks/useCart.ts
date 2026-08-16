import { isWholesaleApproved } from '@/auth/permissions'
import { productsService } from '@/services/api/products.service'
import { quoteWholesale } from '@/services/api/wholesale-pricing'
import { useCartStore } from '@/stores/cart.store'
import { useCatalogStore } from '@/stores/catalog.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { useWholesaleStore } from '@/stores/wholesale.store'
import type { CartLine } from '@/types/cart'
import type { Product } from '@/types/product'
import { useEffect, useMemo, useState } from 'react'

export function useCart() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)
  const revision = useCatalogStore((state) => state.revision)
  const session = useCustomerAuthStore((state) => state.session)
  const discounts = useWholesaleStore((state) => state.discounts)
  const prices = useWholesaleStore((state) => state.prices)
  const wholesale = isWholesaleApproved(session)

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const ids = items.map((item) => item.productId)
    if (ids.length === 0) {
      setProducts([])
      return
    }

    void productsService.getByIds(ids).then(setProducts)
  }, [items, revision])

  const lines: CartLine[] = useMemo(() => {
    return items.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.productId)
      if (!product) return []
      const unitPrice = wholesale
        ? quoteWholesale(product, item.quantity, discounts, prices).unitPrice
        : product.price
      return [{ ...item, product, unitPrice }]
    })
  }, [items, products, wholesale, discounts, prices])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const retailSubtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  return {
    items,
    lines,
    itemCount,
    subtotal,
    retailSubtotal,
    wholesale,
    addItem,
    setQuantity,
    removeItem,
    clear,
  }
}
