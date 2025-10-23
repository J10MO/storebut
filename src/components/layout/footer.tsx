"use client"

import type React from "react"
import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useCart } from "../../hooks/useCart"
import { useFavorites } from "../../hooks/useFavorites"
import { Home, Search, ShoppingCart, User, Heart } from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: typeof Home
  path: string
  color: string
  onClick: () => void
  badge?: number | null
}

const Footer: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const { getTotalItems } = useCart()
  const { favoritesCount } = useFavorites()

  const cartItemCount = getTotalItems()

  const isActive = (path: string) => location.pathname === path

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "الرئيسية",
        icon: Home,
        path: "/home",
        color: "blue",
        onClick: () => navigate("/home"),
      },
      {
        id: "search",
        label: "البحث",
        icon: Search,
        path: "/search",
        color: "emerald",
        onClick: () => navigate("/search"),
      },
      {
        id: "favorites",
        label: "المفضلة",
        icon: Heart,
        path: "/favorites",
        color: "rose",
        onClick: () => navigate("/favorites"),
        badge: favoritesCount > 0 ? favoritesCount : null,
      },
      {
        id: "cart",
        label: "السلة",
        icon: ShoppingCart,
        path: "/cart",
        color: "amber",
        onClick: () => navigate("/cart"),
        badge: cartItemCount > 0 ? cartItemCount : null,
      },
      {
        id: "account",
        label: isAuthenticated ? "حسابي" : "تسجيل",
        icon: User,
        path: isAuthenticated ? "/account" : "/login",
        color: "violet",
        onClick: () => navigate(isAuthenticated ? "/account" : "/login"),
      },
    ],
    [navigate, favoritesCount, cartItemCount, isAuthenticated],
  )

  // Fixed color mapping function
  const getColorClasses = (color: string, active: boolean) => {
    const colorMap: Record<string, { text: string; bg: string }> = {
      blue: {
        text: active ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400",
        bg: active ? "bg-blue-50 dark:bg-blue-900/30" : "bg-transparent",
      },
      emerald: {
        text: active ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 dark:text-gray-400",
        bg: active ? "bg-emerald-50 dark:bg-emerald-900/30" : "bg-transparent",
      },
      rose: {
        text: active ? "text-rose-600 dark:text-rose-400" : "text-gray-500 dark:text-gray-400",
        bg: active ? "bg-rose-50 dark:bg-rose-900/30" : "bg-transparent",
      },
      amber: {
        text: active ? "text-amber-600 dark:text-amber-400" : "text-gray-500 dark:text-gray-400",
        bg: active ? "bg-amber-50 dark:bg-amber-900/30" : "bg-transparent",
      },
      violet: {
        text: active ? "text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400",
        bg: active ? "bg-violet-50 dark:bg-violet-900/30" : "bg-transparent",
      },
    }

    return colorMap[color] || colorMap.blue
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 shadow-2xl z-50 safe-area-bottom transition-colors duration-300 ">
      <div className="max-w-lg mx-auto px-4 pt-2 ">
        <div className="flex justify-between items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            const colorClasses = getColorClasses(item.color, active)

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex flex-col items-center flex-1 rounded-2xl transition-all duration-300 group relative py-2 px-2 ${
                  active
                    ? colorClasses.text
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                aria-label={item.label}
              >
                <div
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    active
                      ? colorClasses.bg
                      : "bg-transparent group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                </div>

                {item.badge && (
                  <span
                    className="absolute top-0 right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-lg animate-in fade-in zoom-in duration-300"
                    aria-label={`${item.badge} عنصر`}
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}

                <span
                  className={`text-[11px] mt-1 font-medium leading-none whitespace-nowrap transition-all duration-300 ${
                    active ? "font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer