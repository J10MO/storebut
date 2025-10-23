"use client"

import React, { useEffect, useState } from "react"
import { useFavorites } from "../hooks/useFavorites"
import { useAuth } from "../hooks/useAuth"
import { Heart, ArrowRight, Home, Loader2, ShoppingBag, Grid, List, RotateCw, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Product } from "../api/types/product.types"
import ProductCard from "../components/App-components/ProductCard"
import { toast } from "sonner"

const FavoritesPage: React.FC = () => {
  const { favorites, loading, error, toggleFavorite, refetch } = useFavorites()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"newest" | "price-low" | "price-high" | "rating">("newest")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      const loadFavorites = async () => {
        try {
          await refetch()
          console.log("Favorites loaded from server:", favorites.length)
        } catch (err) {
          console.error("Error loading favorites:", err)
        }
      }

      loadFavorites()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (favorites.length > 0) {
      console.log("Loaded favorites:", favorites.length)
    }
  }, [favorites])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refetch()
      toast.success("تم تحديث المفضلة")
    } catch (err) {
      console.error("Error refreshing favorites:", err)
      toast.error("فشل تحديث المفضلة")
    } finally {
      setIsRefreshing(false)
    }
  }

  const sortedFavorites = React.useMemo(() => {
    const sorted = [...favorites]

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => Number.parseFloat(a.price || "0") - Number.parseFloat(b.price || "0"))
        break
      case "price-high":
        sorted.sort((a, b) => Number.parseFloat(b.price || "0") - Number.parseFloat(a.price || "0"))
        break
      case "rating":
        sorted.sort((a, b) => Number.parseFloat(b.rating || "0") - Number.parseFloat(a.rating || "0"))
        break
      default:
        break
    }

    return sorted
  }, [favorites, sortBy])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
        <div className="text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-md w-full border border-gray-200/50 dark:border-gray-800/50 animate-fade-in">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full animate-pulse opacity-20"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 rounded-full flex items-center justify-center shadow-2xl">
              <Heart className="w-16 h-16 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">يجب تسجيل الدخول</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
            يجب عليك تسجيل الدخول لعرض منتجاتك المفضلة والاستمتاع بتجربة تسوق مخصصة
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-amber-500/50 transition-all transform hover:scale-105 active:scale-95"
          >
            تسجيل الدخول الآن
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full animate-ping opacity-20"></div>
            <Loader2 className="w-20 h-20 animate-spin text-rose-600 dark:text-rose-400" />
          </div>
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">جاري تحميل المفضلة...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300">
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20 dark:border-gray-700/50">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">خطأ في التحميل</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => refetch()}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-24 sm:pb-8 transition-colors duration-300">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg px-2 py-1 transition-all"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span className="text-gray-900 dark:text-white font-semibold flex items-center gap-1">
              <Heart className="w-4 h-4 fill-current text-rose-600 dark:text-rose-400" />
              المفضلة
            </span>
          </nav>

          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 border-2 border-white dark:border-gray-700 shadow-lg">
                  <Heart className="w-8 h-8 text-rose-600 dark:text-rose-400 fill-current" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
                  منتجاتي المفضلة
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  {favorites.length} منتج مميز
                </p>
              </div>
            </div>

            {favorites.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-sm hover:border-rose-500 dark:hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                >
                  <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">تحديث</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-rose-500 dark:hover:border-rose-400 focus:outline-none focus:border-rose-500 dark:focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-900/50 transition-all shadow-sm"
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر ↑</option>
                  <option value="price-high">السعر ↓</option>
                  <option value="rating">التقييم</option>
                </select>

                <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-all ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-all border-r border-gray-300 dark:border-gray-600 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white border-r-0"
                        : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 animate-fade-in">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full animate-pulse opacity-20"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-rose-600 dark:text-rose-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">لا توجد منتجات في المفضلة</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              أضف منتجاتك المفضلة بالنقر على أيقونة القلب في أي منتج
            </p>
            <button
              onClick={() => navigate("/categories")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              استعرض المنتجات
            </button>
          </div>
        ) : (
          <>
            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-fade-in"
                  : "grid grid-cols-1 gap-4 animate-fade-in"
              }
            >
              {sortedFavorites.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode === "list" ? "horizontal" : "vertical"}
                  isFavorite={true}
                  onToggleFavorite={async (productId) => {
                    try {
                      const result = await toggleFavorite(productId)
                      if (!result) {
                        toast.success("تم الإزالة من المفضلة")
                      }
                      return result
                    } catch (err) {
                      toast.error("فشل تحديث المفضلة")
                      throw err
                    }
                  }}
                />
              ))}
            </div>

            <div className="mt-8 text-center p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                عرض <span className="font-bold text-rose-600 dark:text-rose-400">{sortedFavorites.length}</span> منتج
                {sortBy !== "newest" && (
                  <span>
                    {" "}
                    • مرتبة حسب{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {sortBy === "price-low"
                        ? "السعر (الأقل للأعلى)"
                        : sortBy === "price-high"
                          ? "السعر (الأعلى للأقل)"
                          : "التقييم"}
                    </span>
                  </span>
                )}
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default FavoritesPage
