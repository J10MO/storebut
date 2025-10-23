"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "./useAuth"
import { ordersAPI } from "../api/orders"

export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<any>(null)
  const { isAuthenticated } = useAuth()

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const fetchOrders = useCallback(async () => {
    if (!isAuthenticated) {
      setOrders([])
      setLoading(false)
      return
    }

    if (!isMountedRef.current) return

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)

      const response = await ordersAPI.getOrders()

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      if (isMountedRef.current) {
        const ordersData = response.data.orders || response.data || []
        const paginationData = response.data.pagination || null

        setOrders(Array.isArray(ordersData) ? ordersData : [])
        setPagination(paginationData)
      }
    } catch (err: any) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      console.error("Error fetching orders:", err)

      if (isMountedRef.current) {
        setError(err.response?.data?.error || "Failed to fetch orders")
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [isAuthenticated])

  const createOrder = useCallback(
    async (orderData: any) => {
      try {
        setLoading(true)
        setError(null)

        const response = await ordersAPI.createOrder(orderData)

        await fetchOrders()
        return response.data
      } catch (err: any) {
        console.error("Error creating order:", err)

        const errorMessage =
          err.response?.data?.message || err.response?.data?.error || err.message || "Failed to create order"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    },
    [fetchOrders],
  )

  const getOrder = useCallback(async (id: string | number) => {
    try {
      setLoading(true)
      setError(null)

      const response = await ordersAPI.getOrder(id)
      return response.data
    } catch (err: any) {
      console.error("Error fetching order:", err)
      const errorMessage = err.response?.data?.error || "Failed to fetch order"
      setError(errorMessage)
      throw err
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [])

  const cancelOrder = useCallback(
    async (id: string | number) => {
      try {
        setLoading(true)
        setError(null)

        const response = await ordersAPI.cancelOrder(id)
        await fetchOrders()
        return response.data
      } catch (err: any) {
        console.error("Error canceling order:", err)
        const errorMessage = err.response?.data?.error || "Failed to cancel order"
        setError(errorMessage)
        throw err
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    },
    [fetchOrders],
  )

  useEffect(() => {
    isMountedRef.current = true
    fetchOrders()

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchOrders])

  return {
    orders,
    loading,
    error,
    pagination,
    refetch: fetchOrders,
    createOrder,
    getOrder,
    cancelOrder,
  }
}
