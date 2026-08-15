import { ROUTES } from '@/constants/routes'
import { CheckoutLayout } from '@/layouts/CheckoutLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { CartPage } from '@/pages/CartPage'
import { CatalogPage } from '@/pages/CatalogPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { HomePage } from '@/pages/HomePage'
import { LegalPage } from '@/pages/LegalPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.catalog, element: <CatalogPage /> },
      { path: ROUTES.category, element: <CatalogPage /> },
      { path: ROUTES.product, element: <ProductDetailPage /> },
      { path: ROUTES.cart, element: <CartPage /> },
      { path: ROUTES.wishlist, element: <WishlistPage /> },
      { path: ROUTES.privacy, element: <LegalPage /> },
      { path: ROUTES.terms, element: <LegalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CheckoutLayout />,
    children: [
      { path: ROUTES.checkout, element: <CheckoutPage /> },
    ],
  },
])
