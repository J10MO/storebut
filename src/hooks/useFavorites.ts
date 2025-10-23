"use client"

// hooks/useFavorites.ts
import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "./useAuth"
import { favoritesApi } from "../api/favorites"
import type { Product } from "../api/types/product.types"
import { favoritesStorage } from "../utils/favoritesStorage"
import { useFavoritesStore } from "../stores/favoritesStore"

// ✅ Cache خارج المكون لمنع التكرار الكامل
let globalFavoritesCache: Set<number> | null = null
let globalFetchPromise: Promise<void> | null = null

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()

  const { favoriteIds, setFavorites: setStoreFavorites, addFavorite, removeFavorite, hasFavorite } = useFavoritesStore()

  const isInitializedRef = useRef(false)
  const lastAuthStateRef = useRef(isAuthenticated)

  // ✅ دالة جلب محسّنة مع منع مطلق للتكرار
  const fetchFavorites = useCallback(
    async (force = false) => {
      // إذا كان هناك طلب جاري، انتظره بدلاً من إنشاء طلب جديد
      if (globalFetchPromise && !force) {
        console.log("⏳ Waiting for existing fetch...")
        return globalFetchPromise
      }

      // إذا كانت البيانات موجودة ولا نريد force
      if (globalFavoritesCache && !force) {
        console.log("✅ Using cached favorites")
        setStoreFavorites(Array.from(globalFavoritesCache))
        return
      }

      if (!isAuthenticated) {
        console.log("❌ Not authenticated, clearing favorites")
        setFavorites([])
        setStoreFavorites([])
        globalFavoritesCache = null
        favoritesStorage.saveLocalFavorites([])
        return
      }

      console.log("🔄 Fetching favorites from server...", { force })
      setLoading(true)
      setError(null)

      // إنشاء promise ومشاركته globally
      const fetchPromise = (async () => {
        try {
          const response = await favoritesApi.getFavorites(1, 100)

          let favoritesData: Product[] = []

          if (response?.favorites && Array.isArray(response.favorites)) {
            favoritesData = response.favorites
          } else if (Array.isArray(response)) {
            favoritesData = response
          } else if ((response as any).products && Array.isArray((response as any).products)) {
            favoritesData = (response as any).products
          } else if ((response as any).data && Array.isArray((response as any).data)) {
            favoritesData = (response as any).data
          }

          const validFavorites = favoritesData.filter((product: Product) => product && product.id && product.name)
          console.log(`✅ Loaded ${validFavorites.length} favorites`)

          const idsSet = new Set(validFavorites.map((p) => p.id))
          globalFavoritesCache = idsSet

          setFavorites(validFavorites)
          setStoreFavorites(Array.from(idsSet))

          const serverProductIds = validFavorites.map((p) => p.id)
          favoritesStorage.saveLocalFavorites(serverProductIds)
        } catch (err: any) {
          console.error("❌ Error fetching favorites:", err)
          const errorMessage = err?.response?.data?.message || err?.message || "فشل في جلب المفضلات"
          setError(errorMessage)
        } finally {
          setLoading(false)
          globalFetchPromise = null
        }
      })()

      globalFetchPromise = fetchPromise
      return fetchPromise
    },
    [isAuthenticated, setStoreFavorites],
  )

  // ✅ إضافة إلى المفضلة
  const addToFavorites = useCallback(
    async (productId: number): Promise<boolean> => {
      if (!isAuthenticated) {
        throw new Error("يجب تسجيل الدخول لإضافة المنتج إلى المفضلة")
      }

      try {
        useFavoritesStore.getState().addFavorite(productId)

        if (globalFavoritesCache) {
          globalFavoritesCache.add(productId)
        }
        favoritesStorage.addToLocalFavorites(productId)

        await favoritesApi.addToFavorites(productId)
        console.log("✅ Added to server favorites:", productId)

        return true
      } catch (err) {
        console.error("❌ Failed to add to server favorites:", err)

        useFavoritesStore.getState().removeFavorite(productId)

        if (globalFavoritesCache) {
          globalFavoritesCache.delete(productId)
        }
        favoritesStorage.removeFromLocalFavorites(productId)

        throw err
      }
    },
    [isAuthenticated],
  )

  // ✅ إزالة من المفضلة
  const removeFromFavorites = useCallback(
    async (productId: number): Promise<boolean> => {
      if (!isAuthenticated) {
        throw new Error("يجب تسجيل الدخول لإزالة المنتج من المفضلة")
      }

      try {
        useFavoritesStore.getState().removeFavorite(productId)

        if (globalFavoritesCache) {
          globalFavoritesCache.delete(productId)
        }
        setFavorites((prev) => prev.filter((p) => p.id !== productId))
        favoritesStorage.removeFromLocalFavorites(productId)

        await favoritesApi.removeFromFavorites(productId)
        console.log("✅ Removed from server favorites:", productId)

        return true
      } catch (err) {
        console.error("❌ Failed to remove from server favorites:", err)

        useFavoritesStore.getState().addFavorite(productId)

        if (globalFavoritesCache) {
          globalFavoritesCache.add(productId)
        }
        favoritesStorage.addToLocalFavorites(productId)

        throw err
      }
    },
    [isAuthenticated],
  )

  // ✅ تبديل المفضلة
  const toggleFavorite = useCallback(
    async (productId: number): Promise<boolean> => {
      try {
        const isCurrentlyFavorite = hasFavorite(productId)

        if (isCurrentlyFavorite) {
          await removeFromFavorites(productId)
          return false
        } else {
          await addToFavorites(productId)
          return true
        }
      } catch (err) {
        console.error("Error toggling favorite:", err)
        throw err
      }
    },
    [hasFavorite, addToFavorites, removeFromFavorites],
  )

  // ✅ useEffect محسّن - يعمل فقط عند تغيير حالة المصادقة
  useEffect(() => {
    const authChanged = lastAuthStateRef.current !== isAuthenticated
    lastAuthStateRef.current = isAuthenticated

    if (isAuthenticated && !isInitializedRef.current) {
      console.log("🎯 Initial fetch on mount")
      isInitializedRef.current = true
      fetchFavorites()
    } else if (!isAuthenticated && authChanged) {
      console.log("🔓 User logged out, clearing favorites")
      setFavorites([])
      setStoreFavorites([])
      globalFavoritesCache = null
      favoritesStorage.saveLocalFavorites([])
      isInitializedRef.current = false
    }
  }, [isAuthenticated, fetchFavorites, setStoreFavorites])

  const isFavorite = useCallback(
    (productId: number): boolean => {
      return hasFavorite(productId)
    },
    [hasFavorite],
  )

  const getFavoritesMap = useCallback((): Set<number> => {
    return new Set(favoriteIds)
  }, [favoriteIds])

  const favoritesCount = favoriteIds.length

  // ✅ إعادة تحميل يدوية
  const refetch = useCallback(async () => {
    isInitializedRef.current = false
    await fetchFavorites(true)
    isInitializedRef.current = true
  }, [fetchFavorites])

  return {
    favorites,
    favoritesCount,
    favoriteIds: new Set(favoriteIds), // Convert to Set for backward compatibility
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesMap,
    refetch,
  }
}
