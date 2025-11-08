"use client"

import { useState, useCallback } from "react"
import { deliveryAPI } from "../api/delivery"
import { toast } from "sonner"

export const useDelivery = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getDeliveryByOrderId = useCallback(async (orderId: string | number) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await deliveryAPI.getDeliveryByOrderId(orderId)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "فشل في جلب معلومات التوصيل"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const trackDelivery = useCallback(async (trackingNumber: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await deliveryAPI.getDeliveryByTracking(trackingNumber)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "فشل في تتبع التوصيل"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getAllDeliveries = useCallback(async (params?: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await deliveryAPI.getDeliveries(params)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "فشل في جلب التوصيلات"
      setError(errorMessage)
      toast.error(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    getDeliveryByOrderId,
    trackDelivery,
    getAllDeliveries,
  }
}
