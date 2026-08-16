import { EmptyState } from '@/components/shared/EmptyState'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants/routes'
import { useCart } from '@/hooks/useCart'
import { computeDiscount, useAdminStore } from '@/stores/admin.store'
import { useCustomerAuthStore } from '@/stores/customer-auth.store'
import { formatCurrency } from '@/utils/format'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { lines, subtotal, clear, wholesale } = useCart()
  const methods = useAdminStore((state) => state.paymentMethods.filter((item) => item.enabled))
  const promotions = useAdminStore((state) => state.promotions)
  const paymentMethods = useAdminStore((state) => state.paymentMethods)
  const placeOrder = useAdminStore((state) => state.placeOrder)
  const session = useCustomerAuthStore((state) => state.session)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethodId, setPaymentMethodId] = useState(methods[0]?.id ?? '')
  const [promoCode, setPromoCode] = useState('')
  const [notes, setNotes] = useState('')
  const [requestCash, setRequestCash] = useState(false)
  const [cashPercent, setCashPercent] = useState('8')
  const [cashMessage, setCashMessage] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState<{ number: string; total: number } | null>(null)

  useEffect(() => {
    if (!session) return
    setName((current) => current || session.name)
    setEmail((current) => current || session.email)
    setPhone((current) => current || session.phone)
  }, [session])

  const selectedMethod = methods.find((item) => item.id === paymentMethodId) ?? methods[0]
  const isCash = selectedMethod?.id === 'cash'

  const preview = useMemo(
    () => computeDiscount(promotions, paymentMethods, lines, selectedMethod?.id ?? '', promoCode),
    [promotions, paymentMethods, lines, selectedMethod?.id, promoCode],
  )
  const total = Math.max(0, subtotal - preview.discount)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim() || !city.trim() || !address.trim()) {
      setError('Completa nombre, correo, teléfono, ciudad y dirección.')
      return
    }
    if (!selectedMethod) {
      setError('No hay medios de pago activos. Revisa el panel de administración.')
      return
    }
    const order = placeOrder(
      {
        customer: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          city: city.trim(),
          address: address.trim(),
        },
        paymentMethodId: selectedMethod.id,
        promoCode: promoCode.trim() || undefined,
        notes,
        requestCashDiscount: isCash && requestCash,
        cashDiscountPercent: Number(cashPercent) || 5,
        cashMessage,
        channel: wholesale ? 'wholesale' : 'retail',
      },
      lines,
    )
    clear()
    setDone({ number: order.number, total: order.total })
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <p className="eyebrow">Pedido recibido</p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink-900">Gracias, {name.split(' ')[0]}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-500">
          Tu pedido <strong>{done.number}</strong> quedó registrado por {formatCurrency(done.total)}.
          {isCash && requestCash
            ? ' También enviamos tu solicitud de descuento extra por pago en efectivo. Te confirmamos por WhatsApp o correo.'
            : ' Te contactaremos para confirmar el pago y el envío.'}
        </p>
        <Button className="mt-8" onClick={() => void navigate(ROUTES.catalog)}>
          Seguir comprando
        </Button>
      </div>
    )
  }

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
      <form className="space-y-8" onSubmit={onSubmit}>
        <div>
          <p className="eyebrow">Envío</p>
          <h1 className="mt-3 font-display text-4xl font-medium text-ink-900">Checkout</h1>
        </div>
        <Input label="Nombre" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          label="Email"
          type="email"
          placeholder="correo@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="WhatsApp / teléfono"
          placeholder="300 000 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input label="Dirección" placeholder="Calle y número" value={address} onChange={(e) => setAddress(e.target.value)} />
        <Input label="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />

        <fieldset className="space-y-3">
          <legend className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400">
            Cómo quieres pagar
          </legend>
          {methods.length === 0 ? (
            <p className="text-sm text-offer">No hay medios de pago activos.</p>
          ) : (
            methods.map((method) => (
              <label
                key={method.id}
                className="flex cursor-pointer gap-3 rounded-2xl border border-black/[0.08] p-4"
              >
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod?.id === method.id}
                  onChange={() => {
                    setPaymentMethodId(method.id)
                    if (method.id !== 'cash') setRequestCash(false)
                  }}
                />
                <span>
                  <span className="block text-sm font-medium text-ink-900">{method.name}</span>
                  <span className="mt-1 block text-sm text-ink-500">{method.instructions}</span>
                </span>
              </label>
            ))
          )}
        </fieldset>

        {isCash ? (
          <label className="flex items-start gap-3 rounded-2xl bg-ink-100 p-4 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={requestCash}
              onChange={(event) => setRequestCash(event.target.checked)}
            />
            <span>
              Quiero pedir un descuento extra por pagar en efectivo.
              <span className="mt-2 block text-ink-500">
                El {selectedMethod.cashDiscountPercent}% ya se aplica solo. Lo extra lo revisa la tienda.
              </span>
            </span>
          </label>
        ) : null}

        {isCash && requestCash ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Porcentaje extra que pides"
              inputMode="numeric"
              value={cashPercent}
              onChange={(e) => setCashPercent(e.target.value)}
            />
            <Input
              label="Mensaje (opcional)"
              placeholder="Ej. Pago de contado al recoger"
              value={cashMessage}
              onChange={(e) => setCashMessage(e.target.value)}
            />
          </div>
        ) : null}

        <Input
          label="Código de promoción"
          placeholder="CAS10"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <Input
          label="Notas del pedido"
          placeholder="Horario de entrega, color, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {error ? <p className="text-sm font-medium text-offer">{error}</p> : null}

        <Button type="submit">Confirmar pedido · {formatCurrency(total)}</Button>
        <p className="text-xs text-ink-400">
          Al confirmar, el pedido llega al{' '}
          <Link to={ROUTES.adminLogin} className="underline">
            panel de la tienda
          </Link>
          .
        </p>
      </form>

      <aside className="h-fit">
        <p className="eyebrow">Pedido</p>
        <ul className="mt-8 space-y-4 text-sm">
          {lines.map((line) => (
            <li key={line.productId} className="flex justify-between gap-3">
              <span className="text-ink-500">
                {line.product.name} × {line.quantity}
              </span>
              <span
                className={
                  line.unitPrice < line.product.price ? 'text-offer-gradient font-semibold' : 'text-ink-900'
                }
              >
                {formatCurrency(line.unitPrice * line.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-2 border-t border-black/[0.06] pt-6 text-sm">
          <div className="flex justify-between text-ink-500">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {preview.discount > 0 ? (
            <div className="flex justify-between text-ink-500">
              <span>Descuentos {preview.promoCode ? `(${preview.promoCode})` : ''}</span>
              <span>- {formatCurrency(preview.discount)}</span>
            </div>
          ) : null}
          <div className="flex justify-between text-ink-900">
            <span className="uppercase tracking-[0.18em] text-ink-400">Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}
