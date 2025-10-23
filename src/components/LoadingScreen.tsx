"use client"

import { useEffect, useState } from "react"
import Aura from '../assets/Aura.PNG'
const LoadingScreen = () => {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="relative">
          <img src={Aura} alt="Aura Logo" className="w-32 h-32 object-contain animate-pulse" />
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-amber-500/20 to-amber-600/20 blur-2xl animate-pulse" />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
            Aura
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Skincare & Beauty</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">جاري التحميل{dots}</p>
        </div>

        {/* Loading spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-amber-200 dark:border-amber-900/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-amber-600 dark:border-t-amber-400 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
