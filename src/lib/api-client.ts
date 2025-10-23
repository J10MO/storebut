import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// Custom error class for API errors
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

// Create axios instance with default config
const createAPIClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Request interceptor - add auth token
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token")
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    },
  )

  // Response interceptor - handle errors globally
  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error?: string; message?: string }>) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.dispatchEvent(new Event("authStateChanged"))

        // Only redirect if not already on login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login"
        }
      }

      if (error.response?.status === 403) {
        // Don't redirect, just throw the error with a clear message
        const message =
          error.response?.data?.error || error.response?.data?.message || "ليس لديك صلاحية للوصول إلى هذا المورد"
        throw new APIError(message, error.response?.status, error.code)
      }

      // Create user-friendly error message
      const message =
        error.response?.data?.error || error.response?.data?.message || error.message || "حدث خطأ غير متوقع"

      throw new APIError(message, error.response?.status, error.code)
    },
  )

  return client
}

export const apiClient = createAPIClient()
