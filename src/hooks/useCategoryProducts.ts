// // Hook for category products - الإصدار المصحح
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
//     // تحقق من أن categoryId صالح و enabled
//     const numericId = Number(categoryId);
//     if (!enabled || !numericId || isNaN(numericId)) {
//       console.warn('Invalid category ID or disabled hook:', categoryId);
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await categoriesAPI.getCategoryProducts(
//         numericId, // تأكد من تمرير رقم وليس كائن
//         page, 
//         limit, 
//         sortBy
//       );
//       setData(response.data);
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || 'فشل في جلب منتجات التصنيف';
//       setError(errorMessage);
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



// hooks/useCategoryProducts.ts
import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: number;
  name: string;
  name_ar: string;
  brand: string;
  price: string;
  original_price: string;
  description: string;
  description_ar: string;
  category_id: number;
  image_url: string;
  emoji_icon: string | null;
  rating: string;
  reviews_count: number;
  in_stock: boolean;
  discount: number;
  badge: string;
  stock_quantity: number;
  sale_price: string | null;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  name_ar: string;
  icon: string | null;
  color: string | null;
  image_url: string | null;
  product_count?: number;
}

interface CategoryProductsResponse {
  category: Category;
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface UseCategoryProductsOptions {
  enabled?: boolean;
}

export const useCategoryProducts = (
  categoryId: string | number, 
  options: UseCategoryProductsOptions = {}
) => {
  const { enabled = true } = options;

  const [data, setData] = useState<CategoryProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryProducts = useCallback(async () => {
    const numericId = Number(categoryId);
    
    if (!enabled || !numericId || numericId <= 0 || isNaN(numericId)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const API_URL = `https://markt-x51r.onrender.com/api/categories/${numericId}/products`;
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: CategoryProductsResponse = await response.json();
      setData(result);
      
    } catch (err: any) {
      setError(err.message || 'فشل في جلب البيانات');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [categoryId, enabled]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  const refetch = () => {
    fetchCategoryProducts();
  };

  const category = data?.category || null;
  const products = data?.products || [];
  const pagination = data?.pagination || {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  };

  return {
    category,
    products,
    pagination,
    isLoading,
    error,
    refetch
  };
};