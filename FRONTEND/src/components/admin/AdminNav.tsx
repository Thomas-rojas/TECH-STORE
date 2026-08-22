import { ADMIN_NAV } from '@/constants/admin'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'
import { NavLink } from 'react-router-dom'

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
      {ADMIN_NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === ROUTES.admin}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'min-w-max rounded-2xl px-4 py-3 text-left transition lg:min-w-0',
              isActive ? 'bg-brand-500 text-on-brand' : 'bg-surface text-ink-600 hover:bg-ink-200 hover:text-ink-900',
            )
          }
        >
          <span className="block text-sm font-semibold">{item.label}</span>
          <span className="mt-0.5 hidden text-xs opacity-80 lg:block">{item.hint}</span>
        </NavLink>
      ))}
    </nav>
  )
}
