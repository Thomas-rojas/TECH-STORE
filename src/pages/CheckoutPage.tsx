import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/utils/format'
import { useNavigate } from 'react-router-dom'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { lines, subtotal } = useCart()

  if (lines.length === 0) {
    return (
      <EmptyState
        title="No hay productos para checkout"
        description="Añade artículos al carrito antes de continuar."
        actionLabel="Ir al catálogo"
        onAction={() => void navigate(ROUTES.catalog)}
      />
    )
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_280px]">
      <form className="space-y-8" onSubmit={(event) => event.preventDefault()}>
        <div>
          <p className="eyebrow">Envío</p>
          <h1 className="mt-3 font-display text-4xl font-medium text-ink-900">Checkout</h1>
        </div>
        <Input label="Nombre" placeholder="Nombre completo" />
        <Input label="Email" type="email" placeholder="correo@dominio.com" />
        <Input label="Dirección" placeholder="Calle y número" />
        <div className="grid gap-8 sm:grid-cols-2">
          <Input label="Ciudad" />
          <Input label="Código postal" />
        </div>
        <Button type="submit" disabled>
          Pago no disponible
        </Button>
      </form>

      <aside className="h-fit">
        <p className="eyebrow">Pedido</p>
        <ul className="mt-8 space-y-4 text-sm">
          {lines.map((line) => (
            <li key={line.productId} className="flex justify-between gap-3">
              <span className="text-ink-500">
                {line.product.name} × {line.quantity}
              </span>
              <span className="text-ink-900">{formatCurrency(line.product.price * line.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-between border-t border-black/[0.06] pt-6 text-sm text-ink-900">
          <span className="uppercase tracking-[0.18em] text-ink-400">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </aside>
    </div>
  )
}
