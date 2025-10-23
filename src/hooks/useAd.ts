"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { adsAPI } from "../api/ads"
import type { Ad, CreateAdData, UpdateAdData, AdsFilters } from "../api/types/ads.types"

export const useAds = (filters?: AdsFilters) => {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const filtersKey = useMemo(() => JSON.stringify(filters), [filters])

  const fetchAds = useCallback(
    async (customFilters?: AdsFilters) => {
      if (!isMountedRef.current) return

      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      setLoading(true)
      setError(null)
      try {
        const response = await adsAPI.getAds(customFilters || filters)

        if (abortControllerRef.current?.signal.aborted) {
          return
        }

        if (isMountedRef.current) {
          setAds(response.data.ads || [])
        }
      } catch (err: any) {
        if (abortControllerRef.current?.signal.aborted) {
          return
        }

        if (isMountedRef.current) {
          setError(err.response?.data?.error || "Failed to fetch ads")
          console.error("Error fetching ads:", err)
        }
      } finally {
        if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
          setLoading(false)
        }
      }
    },
    [filtersKey],
  )

  const createAd = useCallback(async (adData: CreateAdData): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await adsAPI.createAd(adData)
      if (isMountedRef.current) {
        setAds((prev) => [response.data.ad, ...prev])
      }
      return true
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.response?.data?.error || "Failed to create ad")
        console.error("Error creating ad:", err)
      }
      return false
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const updateAd = useCallback(async (id: number, adData: UpdateAdData): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await adsAPI.updateAd(id, adData)
      if (isMountedRef.current) {
        setAds((prev) => prev.map((ad) => (ad.id === id ? response.data.ad : ad)))
      }
      return true
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.response?.data?.error || "Failed to update ad")
        console.error("Error updating ad:", err)
      }
      return false
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const deleteAd = useCallback(async (id: number): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      await adsAPI.deleteAd(id)
      if (isMountedRef.current) {
        setAds((prev) => prev.filter((ad) => ad.id !== id))
      }
      return true
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.response?.data?.error || "Failed to delete ad")
        console.error("Error deleting ad:", err)
      }
      return false
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const trackView = useCallback(async (id: number): Promise<void> => {
    try {
      await adsAPI.incrementViewCount(id)
    } catch (err) {
      console.error("Failed to track view:", err)
    }
  }, [])

  const trackClick = useCallback(async (id: number): Promise<void> => {
    try {
      await adsAPI.incrementClickCount(id)
    } catch (err) {
      console.error("Failed to track click:", err)
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    fetchAds()

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchAds])

  return {
    ads,
    loading,
    error,
    fetchAds,
    createAd,
    updateAd,
    deleteAd,
    trackView,
    trackClick,
    refetch: fetchAds,
  }
}

// Specialized hook for homepage ads
export const useHomepageAds = () => {
  const [homepageAds, setHomepageAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const fetchHomepageAds = useCallback(async () => {
    if (!isMountedRef.current) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)
    try {
      const response = await adsAPI.getHomepageAds()

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      const data = response?.data ?? {}
      const adsFromApi: Ad[] = (data.ads ?? []) as Ad[]

      if (isMountedRef.current) {
        if (typeof data.success !== "undefined" && data.success === false) {
          setError("Failed to fetch homepage ads")
          setHomepageAds([])
        } else {
          setHomepageAds(adsFromApi)
        }
      }
    } catch (err: any) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      if (isMountedRef.current) {
        setError(err?.response?.data?.error ?? "Failed to fetch homepage ads")
        console.error("Error fetching homepage ads:", err)
        setHomepageAds([])
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  const trackView = useCallback(async (id: number): Promise<void> => {
    try {
      await adsAPI.incrementViewCount(id)
      // Update local state to reflect the view count increment
      if (isMountedRef.current) {
        setHomepageAds((prev) => prev.map((ad) => (ad.id === id ? { ...ad, view_count: ad.view_count + 1 } : ad)))
      }
    } catch (err) {
      console.error("Failed to track view:", err)
    }
  }, [])

  const trackClick = useCallback(async (id: number): Promise<void> => {
    try {
      await adsAPI.incrementClickCount(id)
      // Update local state to reflect the click count increment
      if (isMountedRef.current) {
        setHomepageAds((prev) => prev.map((ad) => (ad.id === id ? { ...ad, click_count: ad.click_count + 1 } : ad)))
      }
    } catch (err) {
      console.error("Failed to track click:", err)
    }
  }, [])

  useEffect(() => {
    isMountedRef.current = true
    fetchHomepageAds()

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchHomepageAds])

  return {
    homepageAds,
    loading,
    error,
    refetch: fetchHomepageAds,
    trackView,
    trackClick,
  }
}

// Hook for single ad management
export const useAd = (id: number) => {
  const [ad, setAd] = useState<Ad | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const fetchAd = useCallback(async () => {
    if (!id || !isMountedRef.current) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    setLoading(true)
    setError(null)
    try {
      const response = await adsAPI.getAdById(id)

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      if (isMountedRef.current) {
        setAd(response.data.ad)
      }
    } catch (err: any) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      if (isMountedRef.current) {
        setError(err.response?.data?.error || "Failed to fetch ad")
        console.error("Error fetching ad:", err)
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [id])

  const updateAd = useCallback(
    async (adData: UpdateAdData): Promise<boolean> => {
      setLoading(true)
      setError(null)
      try {
        const response = await adsAPI.updateAd(id, adData)
        if (isMountedRef.current) {
          setAd(response.data.ad)
        }
        return true
      } catch (err: any) {
        if (isMountedRef.current) {
          setError(err.response?.data?.error || "Failed to update ad")
          console.error("Error updating ad:", err)
        }
        return false
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    },
    [id],
  )

  const deleteAd = useCallback(async (): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      await adsAPI.deleteAd(id)
      if (isMountedRef.current) {
        setAd(null)
      }
      return true
    } catch (err: any) {
      if (isMountedRef.current) {
        setError(err.response?.data?.error || "Failed to delete ad")
        console.error("Error deleting ad:", err)
      }
      return false
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [id])

  useEffect(() => {
    if (id) {
      isMountedRef.current = true
      fetchAd()
    }

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [id, fetchAd])

  return {
    ad,
    loading,
    error,
    fetchAd,
    updateAd,
    deleteAd,
    refetch: fetchAd,
  }
}

// Hook for active ads only
export const useActiveAds = (position?: string) => {
  const filters: AdsFilters = {
    active_only: true,
    ...(position && { position }),
  }

  return useAds(filters)
}
