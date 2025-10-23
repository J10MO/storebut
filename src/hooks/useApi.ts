"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseApiOptions<T> {
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: string) => void
}

export const useApi = <T,>(apiCall: () => Promise<any>, dependencies: any[] = [], options: UseApiOptions<T> = {}) => {
  const { enabled = true, onSuccess, onError } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    if (!enabled || !isMountedRef.current) return

    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()

      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      const responseData = response?.data || response

      if (isMountedRef.current) {
        setData(responseData)
        if (onSuccess) {
          onSuccess(responseData)
        }
      }
    } catch (err: any) {
      if (abortControllerRef.current?.signal.aborted) {
        return
      }

      const errorMessage = err.response?.data?.error || err.message || "Something went wrong"

      if (isMountedRef.current) {
        setError(errorMessage)
        if (onError) {
          onError(errorMessage)
        }
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        setLoading(false)
      }
    }
  }, [apiCall, enabled, onSuccess, onError])

  useEffect(() => {
    isMountedRef.current = true
    fetchData()

    return () => {
      isMountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData, ...dependencies])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}
