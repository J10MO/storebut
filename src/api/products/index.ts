// import { apiClient } from '../client';
// import type { Product, ProductsResponse } from '../types/product.types';

// export const productsAPI = {
//   getAll: async (page = 1, limit = 20): Promise<ProductsResponse> => {
//     const response = await apiClient.get<ProductsResponse>(`/products?page=${page}&limit=${limit}`);
//     return response.data;
//   },

//   getById: async (id: number): Promise<Product> => {
//     const response = await apiClient.get<Product>(`/products/${id}`);
//     return response.data;
//   },
// };




// api/products/indexedDB.ts
import { apiClient } from '../client';

export const productsAPI = {
  // Get all products
  getProducts: (params?: any) => 
    apiClient.get('/products', { params }),

  // Get product by ID
  getProduct: (id: string | number) => 
    apiClient.get(`/products/${id}`),

  // Search products
  searchProducts: (query: string, params?: any) => 
    apiClient.get('/products/search', { 
      params: { ...params, q: query } 
    }),

  // Get featured products
  getFeatured: () => 
    apiClient.get('/products/featured'),

  // Get products by category
  getByCategory: (categoryId: string | number) => 
    apiClient.get(`/categories/${categoryId}/products`),
};