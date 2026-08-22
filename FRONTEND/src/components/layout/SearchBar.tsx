import { appConfig } from '@/config/app'
import { ROUTES, searchPath } from '@/constants/routes'
import { useDebounce } from '@/hooks/useDebounce'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 400)
  const navigate = useNavigate()

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const value = query.trim() || debounced.trim()
    if (!value) {
      void navigate(ROUTES.catalog)
      return
    }
    void navigate(searchPath(value))
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={`Buscar en ${appConfig.name}...`}
        className="h-12 w-full border-b border-black/15 bg-transparent px-0 pr-20 text-sm text-ink-900 outline-none placeholder:text-ink-400 focus:border-ink-900"
      />
      <button
        type="submit"
        className="absolute right-0 top-2 text-[10px] uppercase tracking-[0.28em] text-ink-400 hover:text-ink-900"
      >
        Buscar
      </button>
    </form>
  )
}
