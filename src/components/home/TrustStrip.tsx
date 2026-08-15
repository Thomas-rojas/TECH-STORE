export function TrustStrip() {
  return (
    <section className="border-y border-black/[0.05] bg-ink-100">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 sm:px-6">
        <div className="text-center">
          <p className="font-display text-3xl text-ink-800">300+</p>
          <p className="mt-1 text-sm text-ink-500">Clientes satisfechos</p>
        </div>
        <div className="text-center">
          <p className="font-display text-3xl text-ink-800">4.96</p>
          <p className="mt-1 text-sm text-ink-500">Estrellas verificadas</p>
        </div>
        <div className="text-center">
          <p className="font-display text-3xl text-ink-800">Stock</p>
          <p className="mt-1 text-sm text-ink-500">Inventario sólido</p>
        </div>
        <div className="text-center">
          <p className="font-display text-3xl text-ink-800">Pago</p>
          <p className="mt-1 text-sm text-ink-500">Mercado Pago Col</p>
        </div>
      </div>
    </section>
  )
}
