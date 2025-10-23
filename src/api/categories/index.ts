// import { apiClient } from '../client';
// import type { Category } from '../types/category.types';

// export const categoriesAPI = {
//   getAll: async (): Promise<Category[]> => {
//     const response = await apiClient.get<Category[]>('/categories');
//     return response.data;
//   },

//   getById: async (id: number): Promise<Category> => {
//     const response = await apiClient.get<Category>(`/categories/${id}`);
//     return response.data;
//   },
// };


// import { apiClient } from '../client';

// export const categoriesAPI = {
//   // Get all categories
//   getCategories: () => 
//     apiClient.get('/categories'),

//   // Get category by ID
//   getCategory: (id: string | number) => 
//     apiClient.get(`/categories/${id}`),
// };


// /categories/index.ts
import { apiClient } from '../client';
import { 
  Category, 
  CreateCategoryData, 
  UpdateCategoryData,
  CategoryProductsResponse 
} from '../types/category.types';

export const categoriesAPI = {
  // Get all categories
  getCategories: (): Promise<{ data: Category[] }> => 
    apiClient.get('/categories'),

  // Get category by ID
  getCategory: (id: string | number): Promise<{ data: Category }> => 
    apiClient.get(`/categories/${id}`),

  // Get products by category
  getCategoryProducts: (
    id: string | number, 
    page?: number, 
    limit?: number, 
    sortBy?: string
  ): Promise<{ data: CategoryProductsResponse }> => {
    const params: any = {};
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (sortBy) params.sortBy = sortBy;

    return apiClient.get(`/categories/${id}/products`, { params });
  },

  // Create category (Admin only)
  createCategory: (data: CreateCategoryData): Promise<{ data: Category }> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('name_ar', data.name_ar);
    if (data.icon) formData.append('icon', data.icon);
    if (data.color) formData.append('color', data.color);
    if (data.image) formData.append('image', data.image);

    return apiClient.post('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Update category (Admin only)
  updateCategory: (
    id: string | number, 
    data: UpdateCategoryData
  ): Promise<{ data: Category }> => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.name_ar) formData.append('name_ar', data.name_ar);
    if (data.icon) formData.append('icon', data.icon);
    if (data.color) formData.append('color', data.color);
    if (data.image) formData.append('image', data.image);

    return apiClient.put(`/categories/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete category (Admin only)
  deleteCategory: (id: string | number): Promise<{ data: { message: string } }> => 
    apiClient.delete(`/categories/${id}`),
};
