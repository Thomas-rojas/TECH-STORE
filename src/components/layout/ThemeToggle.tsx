import { MoonIcon, SunIcon } from '@/components/ui/Icons'
import { useThemeStore } from '@/stores/theme.store'
import { cn } from '@/utils/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-full text-ink-500 transition duration-300 ease-out hover:bg-ink-200 hover:text-ink-800',
        className,
      )}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
