"use client"

import "./index.css"
import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthProvider } from "./contexts/authContext"
import { useThemeStore } from "./stores/themeStore"

const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode, setDarkMode } = useThemeStore()

  useEffect(() => {
    const stored = localStorage.getItem("theme-storage")
    if (stored) {
      try {
        const { state } = JSON.parse(stored)
        if (state?.isDarkMode) {
          document.documentElement.classList.add("dark")
          setDarkMode(true)
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (e) {
        console.error("Failed to parse theme storage:", e)
      }
    }
  }, [setDarkMode])

  return <>{children}</>
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeInitializer>
        <App />
      </ThemeInitializer>
    </AuthProvider>
  </React.StrictMode>,
)
