// import { apiClient } from "../../lib/api-client"
// import type { Product } from "../types/product.types"

// export interface ProductsResponse {
//   products: Product[]
//   total: number
//   page: number
//   limit: number
// }

// export interface ProductSearchParams {
//   q?: string
//   category?: string | number
//   minPrice?: number
//   maxPrice?: number
//   in_stock?: boolean
//   // stock_quantity?: number
//   page?: number
//   limit?: number
// }

// export const productsAPI = {
//   // Get all products with optional filters
//   getProducts: async (params?: ProductSearchParams) => {
//     const response = await apiClient.get<ProductsResponse>("/products", { params })
//     return response.data
//   },

//   // Get single product by ID
//   getProduct: async (id: string | number) => {
//     const response = await apiClient.get<Product>(`/products/${id}`)
//     return response.data
//   },

//   // Search products
//   searchProducts: async (query: string, params?: Omit<ProductSearchParams, "q">) => {
//     const response = await apiClient.get<ProductsResponse>("/products/search", {
//       params: { ...params, q: query },
//     })
//     return response.data
//   },

//   // Get featured products
//   getFeatured: async () => {
//     const response = await apiClient.get<Product[]>("/products/featured")
//     return response.data
//   },

//   // Get products by category
//   getByCategory: async (categoryId: string | number) => {
//     const response = await apiClient.get<ProductsResponse>(`/categories/${categoryId}/products`)
//     return response.data
//   },
// }





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
  in_stock?: boolean
  // stock_quantity?: number
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

  // Rate a product
  rateProduct: async (productId: string | number, rating: number, comment?: string) => {
    const response = await apiClient.post(`/products/${productId}/rate`, {
      rating,
      comment,
    })
    return response.data
  },

  // Get product ratings
  getProductRatings: async (productId: string | number, page = 1, limit = 10) => {
    const response = await apiClient.get(`/products/${productId}/ratings`, {
      params: { page, limit },
    })
    return response.data
  },
}
