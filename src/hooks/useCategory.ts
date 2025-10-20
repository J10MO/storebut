// import { useState, useEffect } from 'react';
// import { categoriesAPI } from '../api/categories';
// import { Category, CategoryProductsResponse } from '../api/types/category.types';

// interface UseCategoryOptions {
//   enabled?: boolean;
// }

// interface UseCategoryProductsOptions {
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   enabled?: boolean;
// }

// // Hook for single category
// export const useCategory = (id: string | number, options: UseCategoryOptions = {}) => {
//   const { enabled = true } = options;
//   const [category, setCategory] = useState<Category | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategory = async () => {
//     if (!enabled || !id) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategory(id);
//       setCategory(response.data);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'فشل في جلب بيانات التصنيف');
//       console.error('Error fetching category:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//   }, [id, enabled]);

//   const refetch = () => {
//     fetchCategory();
//   };

//   return {
//     category,
//     isLoading,
//     error,
//     refetch
//   };
// };

// // Hook for category products
// export const useCategoryProducts = (
//   categoryId: string | number, 
//   options: UseCategoryProductsOptions = {}
// ) => {
//   const { 
//     page = 1, 
//     limit = 20, 
//     sortBy = 'newest', 
//     enabled = true 
//   } = options;

//   const [data, setData] = useState<CategoryProductsResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategoryProducts = async () => {
//     if (!enabled || !categoryId) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategoryProducts(
//         categoryId, 
//         page, 
//         limit, 
//         sortBy
//       );
//       setData(response.data);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'فشل في جلب منتجات التصنيف');
//       console.error('Error fetching category products:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategoryProducts();
//   }, [categoryId, page, limit, sortBy, enabled]);

//   const refetch = () => {
//     fetchCategoryProducts();
//   };

//   return {
//     category: data?.category || null,
//     products: data?.products || [],
//     pagination: data?.pagination || {
//       total: 0,
//       page: 1,
//       limit: 20,
//       totalPages: 0
//     },
//     isLoading,
//     error,
//     refetch
//   };
// };

// // Hook for all categories
// export const useCategories = (options: UseCategoryOptions = {}) => {
//   const { enabled = true } = options;
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = async () => {
//     if (!enabled) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategories();
//       setCategories(response.data);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'فشل في جلب التصنيفات');
//       console.error('Error fetching categories:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, [enabled]);

//   const refetch = () => {
//     fetchCategories();
//   };

//   return {
//     categories,
//     isLoading,
//     error,
//     refetch
//   };
// };






// import { useState, useEffect, useCallback } from 'react';
// import { categoriesAPI } from '../api/categories';
// import { Category, CategoryProductsResponse } from '../api/types/category.types';

// interface UseCategoryOptions {
//   enabled?: boolean;
// }

// interface UseCategoryProductsOptions {
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   enabled?: boolean;
// }

// // Hook for single category
// export const useCategory = (id: string | number, options: UseCategoryOptions = {}) => {
//   const { enabled = true } = options;
//   const [category, setCategory] = useState<Category | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategory = useCallback(async () => {
//     if (!enabled || !id) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const numericId = typeof id === 'string' ? parseInt(id) : id;
//       if (isNaN(numericId) || numericId <= 0) {
//         throw new Error('معرف التصنيف غير صالح');
//       }

//       const response = await categoriesAPI.getCategory(numericId);
//       setCategory(response.data);
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || 
//                           err.message || 
//                           'فشل في جلب بيانات التصنيف';
//       setError(errorMessage);
//       console.error('Error fetching category:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [id, enabled]);

//   useEffect(() => {
//     fetchCategory();
//   }, [fetchCategory]);

//   const refetch = useCallback(() => {
//     fetchCategory();
//   }, [fetchCategory]);

//   return {
//     category,
//     isLoading,
//     error,
//     refetch
//   };
// };

// // Hook for category products
// export const useCategoryProducts = (
//   categoryId: string | number, 
//   options: UseCategoryProductsOptions = {}
// ) => {
//   const { 
//     page = 1, 
//     limit = 20, 
//     sortBy = 'newest', 
//     enabled = true 
//   } = options;

//   const [data, setData] = useState<CategoryProductsResponse | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategoryProducts = useCallback(async () => {
//     // التحقق من صحة categoryId
//     const numericCategoryId = typeof categoryId === 'string' ? parseInt(categoryId) : categoryId;
    
//     if (!enabled || !numericCategoryId || isNaN(numericCategoryId) || numericCategoryId <= 0) {
//       setError('معرف التصنيف غير صالح');
//       setIsLoading(false);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategoryProducts(
//         numericCategoryId, 
//         page, 
//         limit, 
//         sortBy
//       );
      
//       if (response.data) {
//         setData(response.data);
//       } else {
//         throw new Error('لا توجد بيانات متاحة');
//       }
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || 
//                           err.message || 
//                           'فشل في جلب منتجات التصنيف';
//       setError(errorMessage);
//       console.error('Error fetching category products:', err);
      
//       // تعيين بيانات افتراضية في حالة الخطأ
//       setData({
//         category: null,
//         products: [],
//         pagination: {
//           total: 0,
//           page,
//           limit,
//           totalPages: 0
//         }
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [categoryId, page, limit, sortBy, enabled]);

//   useEffect(() => {
//     fetchCategoryProducts();
//   }, [fetchCategoryProducts]);

//   const refetch = useCallback(() => {
//     fetchCategoryProducts();
//   }, [fetchCategoryProducts]);

//   return {
//     category: data?.category || null,
//     products: data?.products || [],
//     pagination: data?.pagination || {
//       total: 0,
//       page: 1,
//       limit: 20,
//       totalPages: 0
//     },
//     isLoading,
//     error,
//     refetch
//   };
// };

// // Hook for all categories
// export const useCategories = (options: UseCategoryOptions = {}) => {
//   const { enabled = true } = options;
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategories = useCallback(async () => {
//     if (!enabled) {
//       setCategories([]);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategories();
      
//       if (response.data && Array.isArray(response.data)) {
//         setCategories(response.data);
//       } else {
//         throw new Error('تنسيق البيانات غير صحيح');
//       }
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || 
//                           err.message || 
//                           'فشل في جلب التصنيفات';
//       setError(errorMessage);
//       console.error('Error fetching categories:', err);
//       setCategories([]); // تعيين مصفوفة فارغة في حالة الخطأ
//     } finally {
//       setIsLoading(false);
//     }
//   }, [enabled]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const refetch = useCallback(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   return {
//     categories,
//     isLoading,
//     error,
//     refetch
//   };
// };

// // Hook for categories with retry mechanism
// export const useCategoriesWithRetry = (options: UseCategoryOptions & { retryCount?: number } = {}) => {
//   const { enabled = true, retryCount = 3 } = options;
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [retries, setRetries] = useState<number>(0);

//   const fetchCategoriesWithRetry = useCallback(async (currentRetry: number = 0) => {
//     if (!enabled) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategories();
      
//       if (response.data && Array.isArray(response.data)) {
//         setCategories(response.data);
//         setRetries(0);
//       } else {
//         throw new Error('تنسيق البيانات غير صحيح');
//       }
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || 
//                           err.message || 
//                           'فشل في جلب التصنيفات';
      
//       if (currentRetry < retryCount) {
//         // إعادة المحاولة بعد تأخير
//         setTimeout(() => {
//           fetchCategoriesWithRetry(currentRetry + 1);
//         }, 1000 * (currentRetry + 1));
//         setRetries(currentRetry + 1);
//       } else {
//         setError(errorMessage);
//         setCategories([]);
//         console.error('Error fetching categories after retries:', err);
//       }
//     } finally {
//       if (currentRetry >= retryCount) {
//         setIsLoading(false);
//       }
//     }
//   }, [enabled, retryCount]);

//   useEffect(() => {
//     fetchCategoriesWithRetry();
//   }, [fetchCategoriesWithRetry]);

//   const refetch = useCallback(() => {
//     setRetries(0);
//     fetchCategoriesWithRetry();
//   }, [fetchCategoriesWithRetry]);

//   return {
//     categories,
//     isLoading,
//     error,
//     retries,
//     refetch
//   };
// };







// hooks/useCategories.ts
import { useState, useCallback } from 'react';
import { categoriesAPI } from '../api/categories';
import { Category, CategoryProductsResponse } from '../api/types/category.types';
import { useCachedApi } from './useCachedApi';

interface UseCategoryOptions {
  enabled?: boolean;
}

interface UseCategoryProductsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  enabled?: boolean;
}

// Hook لتصنيف واحد
export const useCategory = (id: string | number, options: UseCategoryOptions = {}) => {
  const { enabled = true } = options;

  const { data, loading, error, refetch } = useCachedApi<Category>(
    () => categoriesAPI.getCategory(Number(id)),
    `category_${id}`,
    [id],
    {
      enabled: !!id && enabled,
      cacheDuration: 10 * 60 * 1000, // 10 دقائق للتصنيفات
    }
  );

  return {
    category: data,
    isLoading: loading,
    error,
    refetch
  };
};

// Hook لمنتجات التصنيف
export const useCategoryProducts = (
  categoryId: string | number, 
  options: UseCategoryProductsOptions = {}
) => {
  const { 
    page = 1, 
    limit = 20, 
    sortBy = 'newest', 
    enabled = true 
  } = options;

  const cacheKey = `category_${categoryId}_products_${page}_${limit}_${sortBy}`;

  const { data, loading, error, refetch } = useCachedApi<CategoryProductsResponse>(
    () => categoriesAPI.getCategoryProducts(Number(categoryId), page, limit, sortBy),
    cacheKey,
    [categoryId, page, limit, sortBy],
    {
      enabled: !!categoryId && enabled,
      cacheDuration: 2 * 60 * 1000, // 2 دقائق لمنتجات التصنيف
    }
  );

  return {
    category: data?.category || null,
    products: data?.products || [],
    pagination: data?.pagination || {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0
    },
    isLoading: loading,
    error,
    refetch
  };
};

// Hook لجميع التصنيفات
export const useCategories = (options: UseCategoryOptions = {}) => {
  const { enabled = true } = options;

  const { data, loading, error, refetch } = useCachedApi<Category[]>(
    () => categoriesAPI.getCategories(),
    'all_categories',
    [],
    {
      enabled,
      cacheDuration: 15 * 60 * 1000, // 15 دقائق لجميع التصنيفات
    }
  );

  return {
    categories: data || [],
    isLoading: loading,
    error,
    refetch
  };
};