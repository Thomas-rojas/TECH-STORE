export function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-brand-300/20 bg-gradient-to-r from-brand-100/50 via-surface to-mint/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-4 sm:px-6">
        {[
          { value: '300+', label: 'Clientes satisfechos' },
          { value: '4.96', label: 'Estrellas verificadas' },
          { value: 'Stock', label: 'Inventario sólido' },
          { value: 'Pago', label: 'Mercado Pago Col' },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-3xl text-gradient sm:text-4xl">{item.value}</p>
            <p className="mt-1 text-sm text-ink-500">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
