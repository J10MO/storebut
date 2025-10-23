import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ThemeStore {
  isDarkMode: boolean
  toggleDarkMode: () => void
  setDarkMode: (isDark: boolean) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.isDarkMode
          if (newMode) {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
          return { isDarkMode: newMode }
        }),
      setDarkMode: (isDark) =>
        set(() => {
          if (isDark) {
            document.documentElement.classList.add("dark")
          } else {
            document.documentElement.classList.remove("dark")
          }
          return { isDarkMode: isDark }
        }),
    }),
    {
      name: "theme-storage",
    },
  ),
)

export const useTheme = () => {
  const { isDarkMode, toggleDarkMode, setDarkMode } = useThemeStore()

  return {
    theme: isDarkMode ? "dark" : "light",
    isDarkMode,
    toggleTheme: toggleDarkMode,
    setTheme: (theme: "light" | "dark") => setDarkMode(theme === "dark"),
  }
}
