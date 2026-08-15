import { create } from 'zustand'

interface UiStore {
  isCartOpen: boolean
  isMobileNavOpen: boolean
  isSearchOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openMobileNav: () => void
  closeMobileNav: () => void
  openSearch: () => void
  closeSearch: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSearchOpen: false,
  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false, isSearchOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openMobileNav: () => set({ isMobileNavOpen: true, isCartOpen: false, isSearchOpen: false }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  openSearch: () => set({ isSearchOpen: true, isMobileNavOpen: false, isCartOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
}))
