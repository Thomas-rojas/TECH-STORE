import { create } from 'zustand'

interface UiStore {
  isCartOpen: boolean
  isMobileNavOpen: boolean
  isSearchOpen: boolean
  isAuthOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openMobileNav: () => void
  closeMobileNav: () => void
  openSearch: () => void
  closeSearch: () => void
  openAuth: () => void
  closeAuth: () => void
}

export const useUiStore = create<UiStore>((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSearchOpen: false,
  isAuthOpen: false,
  openCart: () => set({ isCartOpen: true, isMobileNavOpen: false, isSearchOpen: false, isAuthOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openMobileNav: () => set({ isMobileNavOpen: true, isCartOpen: false, isSearchOpen: false, isAuthOpen: false }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  openSearch: () => set({ isSearchOpen: true, isMobileNavOpen: false, isCartOpen: false, isAuthOpen: false }),
  closeSearch: () => set({ isSearchOpen: false }),
  openAuth: () => set({ isAuthOpen: true, isCartOpen: false, isMobileNavOpen: false, isSearchOpen: false }),
  closeAuth: () => set({ isAuthOpen: false }),
}))
