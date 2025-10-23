"use client"

import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { productsAPI, type ProductSearchParams } from "../api/products"
import type { Product } from "../api/types/product.types"

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  hasMore: boolean
}

export const useProducts = (params?: ProductSearchParams | number): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const normalizedParams = useMemo(() => {
    if (typeof params === "number") {
      return { category: params }
    }
    return params
  }, [params])

  const paramsKey = useMemo(() => JSON.stringify(normalizedParams), [normalizedParams])

  const fetchProducts = useCallback(async () => {
    if (!isMountedRef.current) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)

      let data
      if (normalizedParams?.category) {
        data = await productsAPI.getByCategory(normalizedParams.category)
      } else {
        data = await productsAPI.getProducts(normalizedParams)
      }

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      // Handle different response structures
      const productsList = Array.isArray(data) ? data : data.products || []

      if (isMountedRef.current) {
        setProducts(productsList)

        // Check if there are more products
        if ("total" in data && "page" in data && "limit" in data) {
          const totalPages = Math.ceil(data.total / data.limit)
          setHasMore(data.page < totalPages)
        }
      }
    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      const errorMessage = err instanceof Error ? err.message : "فشل في تحميل المنتجات"

      if (isMountedRef.current) {
        setError(errorMessage)
        setProducts([])
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [paramsKey, normalizedParams])

  useEffect(() => {
    isMountedRef.current = true
    fetchProducts()

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchProducts])

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    hasMore,
  }
}

// Hook for single product
export const useProduct = (id: string | number) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const fetchProduct = useCallback(async () => {
    if (!isMountedRef.current) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)
      const data = await productsAPI.getProduct(id)

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      if (isMountedRef.current) {
        setProduct(data)
      }
    } catch (err) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      const errorMessage = err instanceof Error ? err.message : "فشل في تحميل المنتج"

      if (isMountedRef.current) {
        setError(errorMessage)
        setProduct(null)
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [id])

  useEffect(() => {
    if (id) {
      isMountedRef.current = true
      fetchProduct()
    }

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [id, fetchProduct])

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  }
}
