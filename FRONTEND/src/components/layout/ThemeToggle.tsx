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
        'inline-flex size-10 items-center justify-center rounded-full text-ink-500 transition duration-300 ease-[cubic-bezier(0.34,1.45,0.64,1)] hover:scale-110 hover:bg-brand-100 hover:text-peri-600 hover:shadow-[0_0_18px_rgb(102_201_207_/_0.35)]',
        className,
      )}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
