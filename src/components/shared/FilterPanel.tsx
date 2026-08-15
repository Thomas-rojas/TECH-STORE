import { cn } from '@/utils/cn'
import { ROUTES, catalogPath } from '@/constants/routes'
import type { Category } from '@/types/category'
import { Link } from 'react-router-dom'

interface FilterPanelProps {
  categories: Category[]
  activeCategory?: string | null
  queryString?: string
}

function withQuery(path: string, queryString?: string): string {
  if (!queryString) return path
  return `${path}?${queryString}`
}

function FilterLink({
  to,
  active,
  children,
}: {
  to?: string
  active: boolean
  children: string
}) {
  const className = cn(
    'block py-2 text-sm tracking-wide transition',
    active ? 'text-white' : 'text-ink-400 hover:text-white',
  )

  if (!to) {
    return <span className={className}>{children}</span>
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}

export function FilterPanel({ categories, activeCategory, queryString }: FilterPanelProps) {
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <p className="mb-5 text-sm font-medium text-ink-400">Categoría</p>
      <ul>
        <li>
          <FilterLink to={withQuery(ROUTES.catalog, queryString)} active={!activeCategory}>
            Todos
          </FilterLink>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <FilterLink
              to={withQuery(catalogPath(category.slug), queryString)}
              active={activeCategory === category.slug}
            >
              {category.name}
            </FilterLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
