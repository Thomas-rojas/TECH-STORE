import { STORAGE_KEYS } from '@/constants/storage-keys'
import { localStorageService } from '@/services/storage/local-storage'
import { create } from 'zustand'

export type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

function readTheme(): Theme {
  const saved = localStorageService.read<Theme | { theme?: Theme } | null>(STORAGE_KEYS.theme, null)
  if (saved === 'dark' || saved === 'light') return saved
  if (saved && (saved.theme === 'dark' || saved.theme === 'light')) return saved.theme
  return 'light'
}

export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

const initial = readTheme()
applyTheme(initial)

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: initial,

  setTheme: (theme) => {
    localStorageService.write(STORAGE_KEYS.theme, theme)
    applyTheme(theme)
    set({ theme })
  },

  toggleTheme: () => {
    get().setTheme(get().theme === 'dark' ? 'light' : 'dark')
  },
}))
