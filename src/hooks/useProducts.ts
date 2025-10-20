// import { useState, useEffect } from 'react';
// import { productsAPI } from '../api';
// import type { Product } from '../api/types/product.types';

// export const useProducts = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await productsAPI.getAll();
//       setProducts(response.products);
//       setError(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return {
//     products,
//     loading,
//     error,
//     refetch: fetchProducts,
//   };
// };





// import { useState, useEffect } from 'react';
// import { productsAPI } from '../api/products';

// export const useProducts = (categoryId?: string | number) => {
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = categoryId 
//           ? await productsAPI.getByCategory(categoryId)
//           : await productsAPI.getProducts();
//         setProducts(response.data);
//       } catch (err: any) {
//         setError(err.response?.data?.error || 'Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [categoryId]);

//   return { products, loading, error, refetch: () => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = categoryId 
//           ? await productsAPI.getByCategory(categoryId)
//           : await productsAPI.getProducts();
//         setProducts(response.data);
//       } catch (err: any) {
//         setError(err.response?.data?.error || 'Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   } };
// };






// hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { productsAPI } from '../api/products';

export const useProducts = (categoryId?: string | number) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = categoryId
        ? await productsAPI.getByCategory(categoryId)
        : await productsAPI.getProducts();

      // Normalize to array
      const data = response?.data ?? [];
      const normalized = Array.isArray(data) ? data : Array.isArray(data?.products) ? data.products : data;

      setProducts(normalized ?? []);
      // If API returns { products: [...] }, adjust accordingly
      // e.g., if you know the shape: const normalized = data.products ?? data;
    } catch (err: any) {
      setError(err?.response?.data?.error ?? 'Failed to fetch products');
      setProducts([]); // reset to safe default
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return { products, loading, error, refetch: fetchProducts };
};