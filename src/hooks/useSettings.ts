"use client"

import { useState, useCallback, useEffect } from "react"
import { settingsAPI } from "../api/settings"
import { toast } from "sonner"

export const useSettings = () => {
  const [deliveryPrice, setDeliveryPrice] = useState<number>(5000)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDeliveryPrice = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await settingsAPI.getDeliveryPrice()
      if (response.data.success && response.data.delivery_price) {
        const price = Number(response.data.delivery_price)
        setDeliveryPrice(price)
        return price
      }
      return deliveryPrice
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "فشل في جلب سعر التوصيل"
      setError(errorMessage)
      console.error("Error fetching delivery price:", err)
      return deliveryPrice
    } finally {
      setIsLoading(false)
    }
  }, [deliveryPrice])

  const updateDeliveryPrice = useCallback(async (newPrice: number) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await settingsAPI.updateDeliveryPrice(newPrice)
      if (response.data.success) {
        setDeliveryPrice(newPrice)
        toast.success("تم تحديث سعر التوصيل بنجاح")
        return true
      }
      return false
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "فشل في تحديث سعر التوصيل"
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDeliveryPrice()
  }, [])

  return {
    deliveryPrice,
    isLoading,
    error,
    fetchDeliveryPrice,
    updateDeliveryPrice,
  }
}
