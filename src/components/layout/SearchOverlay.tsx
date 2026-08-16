import { Button } from '@/components/ui/Button'
import { appConfig } from '@/config/app'
import { ROUTES, searchPath } from '@/constants/routes'
import { usePresence } from '@/hooks/usePresence'
import { useUiStore } from '@/stores/ui.store'
import { cn } from '@/utils/cn'
import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function SearchOverlay() {
  const open = useUiStore((state) => state.isSearchOpen)
  const close = useUiStore((state) => state.closeSearch)
  const { mounted, entered } = usePresence(open, 280)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const value = query.trim()
    close()
    void navigate(value ? searchPath(value) : ROUTES.catalog)
    setQuery('')
  }

  if (!mounted) return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-start justify-center bg-surface/95 px-4 pt-32 backdrop-blur-sm transition-opacity duration-300 ease-out',
        entered ? 'opacity-100' : 'opacity-0',
      )}
    >
      <button type="button" className="absolute inset-0" aria-label="Cerrar búsqueda" onClick={close} />
      <form
        onSubmit={onSubmit}
        className={cn(
          'relative z-10 w-full max-w-xl transition duration-300 ease-out',
          entered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}
      >
        <p className="eyebrow mb-6">Buscar</p>
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Buscar en ${appConfig.name}`}
          className="h-16 w-full border-b border-black/15 bg-transparent font-display text-2xl text-ink-900 outline-none placeholder:text-ink-400"
        />
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="ghost" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit">Buscar</Button>
        </div>
      </form>
    </div>
  )
}
