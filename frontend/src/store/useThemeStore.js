import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Talkio-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("Talkio-theme" , theme)

    set({ theme })},

  
}))