import { ROUTES } from '@/constants/routes'
import { AdminLayout } from '@/layouts/AdminLayout'
import { CheckoutLayout } from '@/layouts/CheckoutLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { AdminCashRequestsPage } from '@/pages/admin/AdminCashRequestsPage'
import { AdminCustomersPage } from '@/pages/admin/AdminCustomersPage'
import { AdminHomePage } from '@/pages/admin/AdminHomePage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage'
import { AdminPasswordPage } from '@/pages/admin/AdminPasswordPage'
import { AdminPaymentsPage } from '@/pages/admin/AdminPaymentsPage'
import { AdminPricesPage } from '@/pages/admin/AdminPricesPage'
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage'
import { AdminPromosPage } from '@/pages/admin/AdminPromosPage'
import { AdminWholesalePage } from '@/pages/admin/AdminWholesalePage'
import { AccountPage } from '@/pages/AccountPage'
import { CartPage } from '@/pages/CartPage'
import { CatalogPage } from '@/pages/CatalogPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { HomePage } from '@/pages/HomePage'
import { LegalPage } from '@/pages/LegalPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { WholesalePage } from '@/pages/WholesalePage'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter([
  { path: ROUTES.adminLogin, element: <AdminLoginPage /> },
  {
    path: ROUTES.admin,
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: 'productos', element: <AdminProductsPage /> },
      { path: 'precios', element: <AdminPricesPage /> },
      { path: 'promociones', element: <AdminPromosPage /> },
      { path: 'pedidos', element: <AdminOrdersPage /> },
      { path: 'clientes', element: <AdminCustomersPage /> },
      { path: 'pagos', element: <AdminPaymentsPage /> },
      { path: 'efectivo', element: <AdminCashRequestsPage /> },
      { path: 'clave', element: <AdminPasswordPage /> },
      { path: 'mayorista', element: <AdminWholesalePage /> },
    ],
  },
  {
    element: <CheckoutLayout />,
    children: [{ path: ROUTES.checkout, element: <CheckoutPage /> }],
  },
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.catalog, element: <CatalogPage /> },
      { path: ROUTES.category, element: <CatalogPage /> },
      { path: ROUTES.product, element: <ProductDetailPage /> },
      { path: ROUTES.cart, element: <CartPage /> },
      { path: ROUTES.wishlist, element: <WishlistPage /> },
      { path: ROUTES.account, element: <AccountPage /> },
      { path: ROUTES.wholesale, element: <WholesalePage /> },
      { path: ROUTES.privacy, element: <LegalPage /> },
      { path: ROUTES.terms, element: <LegalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
