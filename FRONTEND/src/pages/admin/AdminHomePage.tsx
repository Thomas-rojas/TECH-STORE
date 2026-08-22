import { AdminNotice } from '@/components/admin/AdminField'
import { ADMIN_NAV } from '@/constants/admin'
import { ROUTES } from '@/constants/routes'
import { useAdminStore } from '@/stores/admin.store'
import { useCatalogStore } from '@/stores/catalog.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { formatCurrency } from '@/utils/format'
import { Link } from 'react-router-dom'

export function AdminHomePage() {
  const products = useCatalogStore((state) => state.products)
  const orders = useAdminStore((state) => state.orders)
  const customers = useAdminStore((state) => state.customers)
  const cashRequests = useAdminStore((state) => state.cashRequests)
  const accounts = useCustomerAuthStore((state) => state.accounts)

  const newOrders = orders.filter((order) => order.status === 'nuevo').length
  const pendingCash = cashRequests.filter((item) => item.status === 'pendiente').length
  const pendingWholesale = accounts.filter((item) => item.wholesaleStatus === 'pending').length
  const sales = orders
    .filter((order) => order.status !== 'cancelado')
    .reduce((sum, order) => sum + order.total, 0)

  const cards = [
    { label: 'Pedidos nuevos', value: String(newOrders), to: ROUTES.adminOrders, help: 'Revísalos primero' },
    {
      label: 'Descuentos en efectivo',
      value: String(pendingCash),
      to: ROUTES.adminCash,
      help: pendingCash ? 'Hay solicitudes esperando' : 'Nada pendiente',
    },
    { label: 'Productos', value: String(products.length), to: ROUTES.adminProducts, help: 'Catálogo actual' },
    {
      label: 'Solicitudes mayorista',
      value: String(pendingWholesale),
      to: ROUTES.adminWholesale,
      help: pendingWholesale ? 'Hay solicitudes esperando' : 'Nada pendiente',
    },
    { label: 'Clientes', value: String(accounts.length || customers.length), to: ROUTES.adminCustomers, help: 'Cuentas registradas' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink-900 sm:text-4xl">Hola, este es tu panel</h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-500">
          Cada botón abre una tarea concreta. Los cambios se guardan solos en este computador.
        </p>
      </div>

      <AdminNotice>
        Ventas registradas (sin cancelados): {formatCurrency(sales)}. Si alguien pide descuento por
        pagar en efectivo, te aparece arriba a la derecha en “Descuento en efectivo”.
      </AdminNotice>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="rounded-3xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5"
          >
            <p className="text-sm text-ink-500">{card.label}</p>
            <p className="mt-2 font-display text-4xl font-semibold text-ink-900">{card.value}</p>
            <p className="mt-2 text-xs text-ink-400">{card.help}</p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="font-display text-2xl font-semibold text-ink-900">Elige una tarea</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {ADMIN_NAV.filter((item) => item.to !== ROUTES.admin).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-3xl bg-surface px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition hover:bg-ink-200"
            >
              <p className="text-base font-semibold text-ink-900">{item.label}</p>
              <p className="mt-1 text-sm text-ink-500">{item.hint}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
