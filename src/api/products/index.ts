import { apiClient } from "../../lib/api-client"
import type { Product } from "../types/product.types"

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
}

export interface ProductSearchParams {
  q?: string
  category?: string | number
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  page?: number
  limit?: number
}

export const productsAPI = {
  // Get all products with optional filters
  getProducts: async (params?: ProductSearchParams) => {
    const response = await apiClient.get<ProductsResponse>("/products", { params })
    return response.data
  },

  // Get single product by ID
  getProduct: async (id: string | number) => {
    const response = await apiClient.get<Product>(`/products/${id}`)
    return response.data
  },

  // Search products
  searchProducts: async (query: string, params?: Omit<ProductSearchParams, "q">) => {
    const response = await apiClient.get<ProductsResponse>("/products/search", {
      params: { ...params, q: query },
    })
    return response.data
  },

  // Get featured products
  getFeatured: async () => {
    const response = await apiClient.get<Product[]>("/products/featured")
    return response.data
  },

  // Get products by category
  getByCategory: async (categoryId: string | number) => {
    const response = await apiClient.get<ProductsResponse>(`/categories/${categoryId}/products`)
    return response.data
  },
}
