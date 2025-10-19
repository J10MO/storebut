// // import { useState, useEffect, useCallback } from 'react';
// // import { useAuth } from './useAuth';
// // import { favoritesApi } from '../api/favorites';
// // import { 
// //   FavoriteWithProduct, 
// //   FavoritesResponse, 
// //   FavoriteCheckResponse,
// //   FavoriteCountResponse 
// // } from '../api/types/favorite.types';

// // export const useFavorites = () => {
// //   const [favorites, setFavorites] = useState<FavoriteWithProduct[]>([]);
// //   const [favoritesCount, setFavoritesCount] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const { user, isAuthenticated } = useAuth();
// //   const [favoritesCache, setFavoritesCache] = useState<Map<number, boolean>>(new Map());

// //   // جلب قائمة المفضلات
// //    const fetchFavorites = useCallback(async (page = 1, limit = 20): Promise<FavoritesResponse | null> => {
// //     if (!isAuthenticated) {
// //       setFavorites([]);
// //       return null;
// //     }
    
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const data: FavoritesResponse = await favoritesApi.getFavorites(page, limit);
      
// //       // تسجيل بنية البيانات للتصحيح
// //       console.log('📦 API Response Structure:', data);
// //       console.log('📦 Favorites Array:', data.favorites);
      
// //       if (data.favorites && Array.isArray(data.favorites)) {
// //         // تصفية العناصر الصالحة فقط
// //         const validFavorites = data.favorites.filter(fav => 
// //           fav && 
// //           fav.product && 
// //           typeof fav.product === 'object' &&
// //           fav.product.id
// //         );
        
// //         console.log('✅ Valid Favorites:', validFavorites);
// //         setFavorites(validFavorites);
// //       } else {
// //         console.warn('⚠️ Invalid favorites data structure:', data.favorites);
// //         setFavorites([]);
// //       }
      
// //       return data;
// //     } catch (err) {
// //       const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
// //       setError(errorMessage);
// //       console.error('Error fetching favorites:', err);
// //       return null;
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [isAuthenticated]);

// //   // جلب عدد المفضلات
// //   const fetchFavoritesCount = useCallback(async (): Promise<number> => {
// //     if (!isAuthenticated) {
// //       setFavoritesCount(0);
// //       return 0;
// //     }

// //     try {
// //       const data: FavoriteCountResponse = await favoritesApi.getFavoritesCount();
// //       setFavoritesCount(data.count);
// //       return data.count;
// //     } catch (err) {
// //       console.error('Error fetching favorites count:', err);
// //       return 0;
// //     }
// //   }, [isAuthenticated]);

// //   // إضافة منتج إلى المفضلة
// //   const addToFavorites = async (productId: number) => {
// //     if (!isAuthenticated) {
// //       throw new Error('يجب تسجيل الدخول لإضافة المنتج إلى المفضلة');
// //     }

// //     try {
// //       const data = await favoritesApi.addToFavorites(productId);
      
// //       // تحديث الـ cache
// //       setFavoritesCache(prev => new Map(prev).set(productId, true));
      
// //       // تحديث العد والبيانات المحلية
// //       await fetchFavoritesCount();
      
// //       return data;
// //     } catch (err) {
// //       console.error('Error adding to favorites:', err);
// //       throw err;
// //     }
// //   };

// //   // إزالة منتج من المفضلة
// //   const removeFromFavorites = async (productId: number) => {
// //     if (!isAuthenticated) {
// //       throw new Error('يجب تسجيل الدخول لإزالة المنتج من المفضلة');
// //     }

// //     try {
// //       const data = await favoritesApi.removeFromFavorites(productId);
      
// //       // تحديث الـ cache
// //       setFavoritesCache(prev => new Map(prev).set(productId, false));
      
// //       // تحديث العد والبيانات المحلية
// //       await fetchFavoritesCount();
// //       setFavorites(prev => prev.filter(fav => fav.product.id !== productId));
      
// //       return data;
// //     } catch (err) {
// //       console.error('Error removing from favorites:', err);
// //       throw err;
// //     }
// //   };

// //   // التحقق مما إذا كان المنتج في المفضلة مع cache
// //   const checkIsFavorite = async (productId: number): Promise<boolean> => {
// //     if (!isAuthenticated) return false;

// //     // التحقق من الـ cache أولاً
// //     if (favoritesCache.has(productId)) {
// //       return favoritesCache.get(productId) || false;
// //     }

// //     try {
// //       const data: FavoriteCheckResponse = await favoritesApi.checkFavorite(productId);
// //       setFavoritesCache(prev => new Map(prev).set(productId, data.isFavorite));
// //       return data.isFavorite;
// //     } catch (err) {
// //       console.error('Error checking favorite:', err);
// //       return false;
// //     }
// //   };

// //   // تبديل حالة المفضلة (إضافة/إزالة)
// //     const toggleFavorite = async (productId: number): Promise<boolean> => {
// //     try {
// //       const isCurrentlyFavorite = await checkIsFavorite(productId);
      
// //       if (isCurrentlyFavorite) {
// //         await removeFromFavorites(productId);
// //         setFavoritesCache(prev => new Map(prev).set(productId, false));
// //         return false; // تم الإزالة
// //       } else {
// //         await addToFavorites(productId);
// //         setFavoritesCache(prev => new Map(prev).set(productId, true));
// //         return true; // تم الإضافة
// //       }
// //     } catch (err) {
// //       console.error('Error toggling favorite:', err);
// //       throw err;
// //     }
// //   };

// //   // مسح cache محدد
// //   const clearProductCache = (productId: number) => {
// //     setFavoritesCache(prev => {
// //       const newCache = new Map(prev);
// //       newCache.delete(productId);
// //       return newCache;
// //     });
// //   };

// //   // مسح كل الـ cache
// //   const clearAllCache = () => {
// //     setFavoritesCache(new Map());
// //   };

// //   // جلب البيانات تلقائياً عند تحميل المكون
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       fetchFavorites();
// //       fetchFavoritesCount();
// //       // لا نمسح الـ cache هنا لتجنب فقدان البيانات
// //     } else {
// //       setFavorites([]);
// //       setFavoritesCount(0);
// //       setFavoritesCache(new Map()); // مسح الـ cache عند تسجيل الخروج فقط
// //     }
// //   }, [isAuthenticated, fetchFavorites, fetchFavoritesCount]);

// //   return {
// //     favorites,
// //     favoritesCount,
// //     loading,
// //     error,
// //     addToFavorites,
// //     removeFromFavorites,
// //     checkIsFavorite,
// //     toggleFavorite,
// //     fetchFavorites,
// //     fetchFavoritesCount,
// //     clearProductCache,
// //     clearAllCache,
// //     refetch: fetchFavorites
// //   };
// // };




// // import { useState, useEffect, useCallback } from 'react';
// // import { useAuth } from './useAuth';
// // import { favoritesApi } from '../api/favorites';
// // import { 
// //   FavoriteWithProduct, 
// //   FavoritesResponse, 
// //   FavoriteCheckResponse,
// //   FavoriteCountResponse 
// // } from '../api/types/favorite.types';
// // import { Product } from '../api/types/product.types'; // إضافة استيراد Product

// // export const useFavorites = () => {
// //   const [favorites, setFavorites] = useState<Product[]>([]); // تغيير النوع إلى Product[]
// //   const [favoritesCount, setFavoritesCount] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const { user, isAuthenticated } = useAuth();
// //   const [favoritesCache, setFavoritesCache] = useState<Map<number, boolean>>(new Map());

// //   // جلب قائمة المفضلات
// //   const fetchFavorites = useCallback(async (page = 1, limit = 20): Promise<any> => {
// //     if (!isAuthenticated) {
// //       setFavorites([]);
// //       return null;
// //     }
    
// //     setLoading(true);
// //     setError(null);
    
// //     try {
// //       const data = await favoritesApi.getFavorites(page, limit);
      
// //       console.log('📦 API Response Structure:', data);
// //       console.log('📦 Favorites Array:', data.favorites || data);
      
// //       // البيانات تأتي مباشرة كمصفوفة منتجات، وليس ككائنات favorite
// //       let favoritesData: any[] = [];
      
// //       if (data.favorites && Array.isArray(data.favorites)) {
// //         // إذا كانت البيانات تحتوي على خاصية favorites
// //         favoritesData = data.favorites;
// //       } else if (Array.isArray(data)) {
// //         // إذا كانت البيانات مباشرة كمصفوفة
// //         favoritesData = data;
// //       } else if (data.products && Array.isArray(data.products)) {
// //         // إذا كانت تحتوي على خاصية products
// //         favoritesData = data.products;
// //       }
      
// //       console.log('✅ Processed Favorites Data:', favoritesData);
      
// //       // تصفية العناصر الصالحة فقط
// //       const validFavorites = favoritesData.filter((item: any) => 
// //         item && 
// //         typeof item === 'object' &&
// //         item.id &&
// //         item.name
// //       );
      
// //       console.log('✅ Valid Favorites Count:', validFavorites.length);
// //       setFavorites(validFavorites);
      
// //       return data;
// //     } catch (err) {
// //       const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
// //       setError(errorMessage);
// //       console.error('Error fetching favorites:', err);
// //       return null;
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [isAuthenticated]);

// //   // جلب عدد المفضلات
// //   const fetchFavoritesCount = useCallback(async (): Promise<number> => {
// //     if (!isAuthenticated) {
// //       setFavoritesCount(0);
// //       return 0;
// //     }

// //     try {
// //       const data: FavoriteCountResponse = await favoritesApi.getFavoritesCount();
// //       setFavoritesCount(data.count);
// //       return data.count;
// //     } catch (err) {
// //       console.error('Error fetching favorites count:', err);
// //       return 0;
// //     }
// //   }, [isAuthenticated]);

// //   // إضافة منتج إلى المفضلة
// //   const addToFavorites = async (productId: number) => {
// //     if (!isAuthenticated) {
// //       throw new Error('يجب تسجيل الدخول لإضافة المنتج إلى المفضلة');
// //     }

// //     try {
// //       const data = await favoritesApi.addToFavorites(productId);
      
// //       // تحديث الـ cache
// //       setFavoritesCache(prev => new Map(prev).set(productId, true));
      
// //       // تحديث العد والبيانات المحلية
// //       await fetchFavoritesCount();
      
// //       return data;
// //     } catch (err) {
// //       console.error('Error adding to favorites:', err);
// //       throw err;
// //     }
// //   };

// //   // إزالة منتج من المفضلة
// //   const removeFromFavorites = async (productId: number) => {
// //     if (!isAuthenticated) {
// //       throw new Error('يجب تسجيل الدخول لإزالة المنتج من المفضلة');
// //     }

// //     try {
// //       const data = await favoritesApi.removeFromFavorites(productId);
      
// //       // تحديث الـ cache
// //       setFavoritesCache(prev => new Map(prev).set(productId, false));
      
// //       // تحديث العد والبيانات المحلية
// //       await fetchFavoritesCount();
// //       setFavorites(prev => prev.filter(product => product.id !== productId));
      
// //       return data;
// //     } catch (err) {
// //       console.error('Error removing from favorites:', err);
// //       throw err;
// //     }
// //   };

// //   // التحقق مما إذا كان المنتج في المفضلة مع cache
// //   const checkIsFavorite = async (productId: number): Promise<boolean> => {
// //     if (!isAuthenticated) return false;

// //     // التحقق من الـ cache أولاً
// //     if (favoritesCache.has(productId)) {
// //       return favoritesCache.get(productId) || false;
// //     }

// //     try {
// //       const data: FavoriteCheckResponse = await favoritesApi.checkFavorite(productId);
// //       setFavoritesCache(prev => new Map(prev).set(productId, data.isFavorite));
// //       return data.isFavorite;
// //     } catch (err) {
// //       console.error('Error checking favorite:', err);
// //       return false;
// //     }
// //   };

// //   // تبديل حالة المفضلة (إضافة/إزالة)
// //   const toggleFavorite = async (productId: number): Promise<boolean> => {
// //     try {
// //       const isCurrentlyFavorite = await checkIsFavorite(productId);
      
// //       if (isCurrentlyFavorite) {
// //         await removeFromFavorites(productId);
// //         setFavoritesCache(prev => new Map(prev).set(productId, false));
// //         return false; // تم الإزالة
// //       } else {
// //         await addToFavorites(productId);
// //         setFavoritesCache(prev => new Map(prev).set(productId, true));
// //         return true; // تم الإضافة
// //       }
// //     } catch (err) {
// //       console.error('Error toggling favorite:', err);
// //       throw err;
// //     }
// //   };

// //   // مسح cache محدد
// //   const clearProductCache = (productId: number) => {
// //     setFavoritesCache(prev => {
// //       const newCache = new Map(prev);
// //       newCache.delete(productId);
// //       return newCache;
// //     });
// //   };

// //   // مسح كل الـ cache
// //   const clearAllCache = () => {
// //     setFavoritesCache(new Map());
// //   };

// //   // جلب البيانات تلقائياً عند تحميل المكون
// //   useEffect(() => {
// //     if (isAuthenticated) {
// //       fetchFavorites();
// //       fetchFavoritesCount();
// //       // لا نمسح الـ cache هنا لتجنب فقدان البيانات
// //     } else {
// //       setFavorites([]);
// //       setFavoritesCount(0);
// //       setFavoritesCache(new Map()); // مسح الـ cache عند تسجيل الخروج فقط
// //     }
// //   }, [isAuthenticated, fetchFavorites, fetchFavoritesCount]);

// //   return {
// //     favorites, // الآن هذه مصفوفة من Product مباشرة
// //     favoritesCount,
// //     loading,
// //     error,
// //     addToFavorites,
// //     removeFromFavorites,
// //     checkIsFavorite,
// //     toggleFavorite,
// //     fetchFavorites,
// //     fetchFavoritesCount,
// //     clearProductCache,
// //     clearAllCache,
// //     refetch: fetchFavorites
// //   };
// // };




// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useAuth } from './useAuth';
// import { favoritesApi } from '../api/favorites';
// import { 
//   FavoriteWithProduct, 
//   FavoritesResponse, 
//   FavoriteCheckResponse,
//   FavoriteCountResponse 
// } from '../api/types/favorite.types';
// import { Product } from '../api/types/product.types';

// export const useFavorites = () => {
//   const [favorites, setFavorites] = useState<Product[]>([]);
//   const [favoritesCount, setFavoritesCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { user, isAuthenticated } = useAuth();
//   const [favoritesCache, setFavoritesCache] = useState<Map<number, boolean>>(new Map());

//   // استخدام useRef لمنع الطلبات المتكررة
//   const isFetchingRef = useRef<boolean>(false);
//   const lastFetchTimeRef = useRef<number>(0);

//   // جلب قائمة المفضلات
//   const fetchFavorites = useCallback(async (page = 1, limit = 20): Promise<any> => {
//     // منع الطلبات المتكررة
//     if (isFetchingRef.current) {
//       console.log('⏳ Skipping - already fetching favorites');
//       return null;
//     }

//     const now = Date.now();
//     if (now - lastFetchTimeRef.current < 3000) { // 3 ثواني بين الطلبات
//       console.log('⏳ Skipping - too soon since last fetch');
//       return null;
//     }

//     if (!isAuthenticated) {
//       setFavorites([]);
//       return null;
//     }
    
//     console.log('🔄 Fetching favorites...');
//     isFetchingRef.current = true;
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data = await favoritesApi.getFavorites(page, limit);
      
//       console.log('📦 API Response Structure:', data);
//       console.log('📦 Favorites Array:', data.favorites || data);
      
//       let favoritesData: any[] = [];
      
//       if (data.favorites && Array.isArray(data.favorites)) {
//         favoritesData = data.favorites;
//       } else if (Array.isArray(data)) {
//         favoritesData = data;
//       } else if (data.products && Array.isArray(data.products)) {
//         favoritesData = data.products;
//       }
      
//       console.log('✅ Processed Favorites Data:', favoritesData);
      
//       const validFavorites = favoritesData.filter((item: any) => 
//         item && 
//         typeof item === 'object' &&
//         item.id &&
//         item.name
//       );
      
//       console.log('✅ Valid Favorites Count:', validFavorites.length);
//       setFavorites(validFavorites);
//       lastFetchTimeRef.current = Date.now();
      
//       return data;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
//       setError(errorMessage);
//       console.error('Error fetching favorites:', err);
//       return null;
//     } finally {
//       setLoading(false);
//       isFetchingRef.current = false;
//     }
//   }, [isAuthenticated]);

//   // جلب عدد المفضلات
//   const fetchFavoritesCount = useCallback(async (): Promise<number> => {
//     if (!isAuthenticated) {
//       setFavoritesCount(0);
//       return 0;
//     }

//     try {
//       const data: FavoriteCountResponse = await favoritesApi.getFavoritesCount();
//       setFavoritesCount(data.count);
//       return data.count;
//     } catch (err) {
//       console.error('Error fetching favorites count:', err);
//       return 0;
//     }
//   }, [isAuthenticated]);

//   // إضافة منتج إلى المفضلة
//   const addToFavorites = useCallback(async (productId: number) => {
//     if (!isAuthenticated) {
//       throw new Error('يجب تسجيل الدخول لإضافة المنتج إلى المفضلة');
//     }

//     try {
//       const data = await favoritesApi.addToFavorites(productId);
      
//       // تحديث الـ cache
//       setFavoritesCache(prev => new Map(prev).set(productId, true));
      
//       // تحديث العد والبيانات المحلية
//       await fetchFavoritesCount();
      
//       return data;
//     } catch (err) {
//       console.error('Error adding to favorites:', err);
//       throw err;
//     }
//   }, [isAuthenticated, fetchFavoritesCount]);

//   // إزالة منتج من المفضلة
//   const removeFromFavorites = useCallback(async (productId: number) => {
//     if (!isAuthenticated) {
//       throw new Error('يجب تسجيل الدخول لإزالة المنتج من المفضلة');
//     }

//     try {
//       const data = await favoritesApi.removeFromFavorites(productId);
      
//       // تحديث الـ cache
//       setFavoritesCache(prev => new Map(prev).set(productId, false));
      
//       // تحديث العد والبيانات المحلية
//       await fetchFavoritesCount();
//       setFavorites(prev => prev.filter(product => product.id !== productId));
      
//       return data;
//     } catch (err) {
//       console.error('Error removing from favorites:', err);
//       throw err;
//     }
//   }, [isAuthenticated, fetchFavoritesCount]);

//   // التحقق مما إذا كان المنتج في المفضلة مع cache
//   const checkIsFavorite = useCallback(async (productId: number): Promise<boolean> => {
//     if (!isAuthenticated) return false;

//     // التحقق من الـ cache أولاً
//     if (favoritesCache.has(productId)) {
//       return favoritesCache.get(productId) || false;
//     }

//     try {
//       const data: FavoriteCheckResponse = await favoritesApi.checkFavorite(productId);
//       setFavoritesCache(prev => new Map(prev).set(productId, data.isFavorite));
//       return data.isFavorite;
//     } catch (err) {
//       console.error('Error checking favorite:', err);
//       return false;
//     }
//   }, [isAuthenticated, favoritesCache]);

//   // تبديل حالة المفضلة (إضافة/إزالة)
//   const toggleFavorite = useCallback(async (productId: number): Promise<boolean> => {
//     try {
//       const isCurrentlyFavorite = await checkIsFavorite(productId);
      
//       if (isCurrentlyFavorite) {
//         await removeFromFavorites(productId);
//         setFavoritesCache(prev => new Map(prev).set(productId, false));
//         return false;
//       } else {
//         await addToFavorites(productId);
//         setFavoritesCache(prev => new Map(prev).set(productId, true));
//         return true;
//       }
//     } catch (err) {
//       console.error('Error toggling favorite:', err);
//       throw err;
//     }
//   }, [checkIsFavorite, addToFavorites, removeFromFavorites]);

//   // مسح cache محدد
//   const clearProductCache = useCallback((productId: number) => {
//     setFavoritesCache(prev => {
//       const newCache = new Map(prev);
//       newCache.delete(productId);
//       return newCache;
//     });
//   }, []);

//   // مسح كل الـ cache
//   const clearAllCache = useCallback(() => {
//     setFavoritesCache(new Map());
//   }, []);

//   // إصدار مستقر من fetchFavorites للـ useEffect
//   const stableFetchFavorites = useCallback(async () => {
//     await fetchFavorites();
//   }, [isAuthenticated]); // فقط isAuthenticated كم dependency

//   const stableFetchFavoritesCount = useCallback(async () => {
//     await fetchFavoritesCount();
//   }, [isAuthenticated]);

//   // جلب البيانات تلقائياً عند تحميل المكون - إصلاح الطلبات المتكررة
//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log('🎯 useEffect triggered - fetching favorites');
//       const timer = setTimeout(() => {
//         stableFetchFavorites();
//         stableFetchFavoritesCount();
//       }, 100); // تأخير بسيط
      
//       return () => clearTimeout(timer);
//     } else {
//       setFavorites([]);
//       setFavoritesCount(0);
//       setFavoritesCache(new Map());
//     }
//   }, [isAuthenticated]); // فقط isAuthenticated كم dependency

//   return {
//     favorites,
//     favoritesCount,
//     loading,
//     error,
//     addToFavorites,
//     removeFromFavorites,
//     checkIsFavorite,
//     toggleFavorite,
//     fetchFavorites,
//     fetchFavoritesCount,
//     clearProductCache,
//     clearAllCache,
//     refetch: fetchFavorites
//   };
// };








// // hooks/useFavorites.ts
// import { useState, useEffect, useCallback, useRef } from 'react';
// import { useAuth } from './useAuth';
// import { favoritesApi } from '../api/favorites';
// import { Product } from '../api/types/product.types';
// import { favoritesStorage } from '../utils/favoritesStorage';

// export const useFavorites = () => {
//   const [localFavorites, setLocalFavorites] = useState<number[]>([]);
//   const [serverFavorites, setServerFavorites] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { isAuthenticated } = useAuth();
  
//   const syncTimeoutRef = useRef<NodeJS.Timeout>();
//   const isSyncingRef = useRef<boolean>(false);

//   // التهيئة الأولية - جلب البيانات المحلية
//   useEffect(() => {
//     const localFavs = favoritesStorage.getLocalFavorites();
//     setLocalFavorites(localFavs);
    
//     // إذا كان المستخدم مسجل الدخول، مزامنة مع السيرفر
//     if (isAuthenticated) {
//       syncWithServer();
//     }
//   }, [isAuthenticated]);

//   // المزامنة مع السيرفر
//   const syncWithServer = useCallback(async (force: boolean = false) => {
//     if (!isAuthenticated || isSyncingRef.current) return;

//     // التحقق إذا كان وقت المزامنة قد حان
//     if (!force && !favoritesStorage.shouldSyncWithServer()) {
//       console.log('⏰ Not time to sync yet');
//       return;
//     }

//     console.log('🔄 Syncing favorites with server...');
//     isSyncingRef.current = true;
    
//     try {
//       // جلب المفضلات من السيرفر
//       const serverResponse = await favoritesApi.getFavorites(1, 100);
//       let serverFavs: Product[] = [];

//       if (serverResponse.favorites && Array.isArray(serverResponse.favorites)) {
//         serverFavs = serverResponse.favorites;
//       } else if (Array.isArray(serverResponse)) {
//         serverFavs = serverResponse;
//       }

//       const serverProductIds = serverFavs.map(product => product.id);
      
//       // دمج المفضلات المحلية مع السيرفر
//       const localProductIds = favoritesStorage.getLocalFavorites();
      
//       // إضافة المفضلات المحلية الجديدة للسيرفر
//       const newFavorites = localProductIds.filter(id => !serverProductIds.includes(id));
      
//       if (newFavorites.length > 0) {
//         console.log(`📤 Adding ${newFavorites.length} new favorites to server`);
        
//         // إضافة المفضلات الجديدة للسيرفر (يمكن عمل bulk add إذا كان مدعوماً)
//         for (const productId of newFavorites) {
//           try {
//             await favoritesApi.addToFavorites(productId);
//           } catch (err) {
//             console.error(`Failed to add product ${productId} to server:`, err);
//           }
//         }
//       }

//       // تحديث الحالة المحلية بالبيانات المدمجة
//       const mergedProductIds = [...new Set([...serverProductIds, ...localProductIds])];
//       favoritesStorage.saveLocalFavorites(mergedProductIds);
//       setLocalFavorites(mergedProductIds);
//       setServerFavorites(serverFavs);

//       // تحديث وقت المزامنة
//       favoritesStorage.updateLastSyncTime();
      
//       console.log('✅ Sync completed successfully');

//     } catch (err) {
//       console.error('❌ Sync failed:', err);
//       setError('فشل في مزامنة المفضلات');
//     } finally {
//       isSyncingRef.current = false;
//     }
//   }, [isAuthenticated]);

//   // إضافة منتج للمفضلة (محلي أولاً)
//   const addToFavorites = useCallback(async (productId: number): Promise<boolean> => {
//     // تحديث محلي فوري
//     const newLocalFavorites = favoritesStorage.addToLocalFavorites(productId);
//     setLocalFavorites(newLocalFavorites);
    
//     console.log('❤️ Added to local favorites:', productId);

//     // إذا كان المستخدم مسجل الدخول، إضافة للسيرفر (غير متزامن)
//     if (isAuthenticated) {
//       try {
//         await favoritesApi.addToFavorites(productId);
//         console.log('✅ Added to server favorites:', productId);
        
//         // تحديث قائمة السيرفر
//         setServerFavorites(prev => {
//           // هنا يمكنك إضافة المنتج الحقيقي إذا كان لديك بياناته
//           // أو الانتظار للمزامنة القادمة
//           return prev;
//         });
        
//         // جدولة مزامنة إضافية بعد دقيقة
//         scheduleSync(60000);
        
//       } catch (err) {
//         console.error('❌ Failed to add to server favorites:', err);
//         // نستمر لأن العملية المحلية نجحت
//       }
//     }
    
//     return true;
//   }, [isAuthenticated]);

//   // إزالة منتج من المفضلة (محلي أولاً)
//   const removeFromFavorites = useCallback(async (productId: number): Promise<boolean> => {
//     // تحديث محلي فوري
//     const newLocalFavorites = favoritesStorage.removeFromLocalFavorites(productId);
//     setLocalFavorites(newLocalFavorites);
    
//     console.log('💔 Removed from local favorites:', productId);

//     // إذا كان المستخدم مسجل الدخول، إزالة من السيرفر (غير متزامن)
//     if (isAuthenticated) {
//       try {
//         await favoritesApi.removeFromFavorites(productId);
//         console.log('✅ Removed from server favorites:', productId);
        
//         // تحديث قائمة السيرفر
//         setServerFavorites(prev => prev.filter(product => product.id !== productId));
        
//         // جدولة مزامنة إضافية بعد دقيقة
//         scheduleSync(60000);
        
//       } catch (err) {
//         console.error('❌ Failed to remove from server favorites:', err);
//         // نستمر لأن العملية المحلية نجحت
//       }
//     }
    
//     return true;
//   }, [isAuthenticated]);

//   // تبديل حالة المفضلة
//   const toggleFavorite = useCallback(async (productId: number): Promise<boolean> => {
//     const isCurrentlyFavorite = favoritesStorage.isInLocalFavorites(productId);
    
//     if (isCurrentlyFavorite) {
//       return await removeFromFavorites(productId);
//     } else {
//       return await addToFavorites(productId);
//     }
//   }, [addToFavorites, removeFromFavorites]);

//   // جدولة مزامنة
//   const scheduleSync = useCallback((delay: number = 300000) => { // 5 دقائق افتراضياً
//     if (syncTimeoutRef.current) {
//       clearTimeout(syncTimeoutRef.current);
//     }
    
//     syncTimeoutRef.current = setTimeout(() => {
//       syncWithServer(true);
//     }, delay);
//   }, [syncWithServer]);

//   // مزامنة دورية كل 5 دقائق
//   useEffect(() => {
//     if (isAuthenticated) {
//       const interval = setInterval(() => {
//         syncWithServer();
//       }, 300000); // 5 دقائق
      
//       return () => clearInterval(interval);
//     }
//   }, [isAuthenticated, syncWithServer]);

//   // تنظيف عند unmount
//   useEffect(() => {
//     return () => {
//       if (syncTimeoutRef.current) {
//         clearTimeout(syncTimeoutRef.current);
//       }
//     };
//   }, []);

//   // إعادة تحميل قوية
//   const refetch = useCallback(async () => {
//     await syncWithServer(true);
//   }, [syncWithServer]);

//   // الحصول على عدد المفضلات (محلي دائماً)
//   const favoritesCount = localFavorites.length;

//   // التحقق مما إذا كان المنتج في المفضلة (محلي)
//   const isFavorite = useCallback((productId: number): boolean => {
//     return favoritesStorage.isInLocalFavorites(productId);
//   }, []);

//   return {
//     // نرجع المفضلات المحلية كـ IDs فقط للعرض
//     favorites: localFavorites.map(id => ({ id } as Product)), // يمكنك تحسين هذا
//     favoritesCount,
//     loading,
//     error,
//     addToFavorites,
//     removeFromFavorites,
//     toggleFavorite,
//     isFavorite,
//     refetch,
//     // دوال إضافية للتحكم
//     syncWithServer: () => syncWithServer(true),
//     getLocalFavorites: () => localFavorites,
//     clearLocalFavorites: () => {
//       favoritesStorage.clearLocalStorage();
//       setLocalFavorites([]);
//       setServerFavorites([]);
//     }
//   };
// };

// hooks/useFavorites.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './useAuth';
import { favoritesApi } from '../api/favorites';
import { Product } from '../api/types/product.types';
import { favoritesStorage } from '../utils/favoritesStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  
  // استخدام useRef لمنع الطلبات المتكررة
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);

  // جلب المفضلات من السيرفر مرة واحدة - بدون useCallback لتجنب dependency issues
  const fetchFavorites = async (force: boolean = false) => {
    // منع الطلبات المتكررة
    if ((!force && hasFetchedRef.current) || isFetchingRef.current) {
      console.log('⏭️ Skipping duplicate fetch');
      return;
    }

    if (!isAuthenticated) {
      setFavorites([]);
      favoritesStorage.saveLocalFavorites([]);
      return;
    }

    console.log('🔄 Fetching favorites from server...');
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const response = await favoritesApi.getFavorites(1, 100);
      
      console.log('📦 API Response received');
      
      let favoritesData: Product[] = [];
      
      if (response.favorites && Array.isArray(response.favorites)) {
        favoritesData = response.favorites;
      } else if (Array.isArray(response)) {
        favoritesData = response;
      } else if (response.products && Array.isArray(response.products)) {
        favoritesData = response.products;
      } else if (response.data && Array.isArray(response.data)) {
        favoritesData = response.data;
      }
      
      // تصفية البيانات الصالحة فقط
      const validFavorites = favoritesData.filter((product: Product) => 
        product && product.id && product.name
      );
      
      console.log(`✅ Loaded ${validFavorites.length} favorites`);
      setFavorites(validFavorites);
      
      // تحديث العداد المحلي بالبيانات الفعلية من السيرفر
      const serverProductIds = validFavorites.map(product => product.id);
      favoritesStorage.saveLocalFavorites(serverProductIds);
      
      hasFetchedRef.current = true;
      
    } catch (err: any) {
      console.error('❌ Error fetching favorites:', err);
      const errorMessage = err.response?.data?.message || err.message || 'فشل في جلب المفضلات';
      setError(errorMessage);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  // إضافة منتج للمفضلة (مباشرة إلى السيرفر)
  const addToFavorites = useCallback(async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      throw new Error('يجب تسجيل الدخول لإضافة المنتج إلى المفضلة');
    }

    try {
      // إضافة مباشرة إلى السيرفر
      await favoritesApi.addToFavorites(productId);
      console.log('✅ Added to server favorites:', productId);
      
      // تحديث العداد المحلي فوراً
      favoritesStorage.addToLocalFavorites(productId);
      
      // تحديث القائمة محلياً بدون إعادة الجلب
      setFavorites(prev => {
        // إذا كان لديك بيانات المنتج الكاملة، يمكنك إضافتها هنا
        // أو الانتظار للجلب التلقائي
        return prev;
      });
      
      return true;
    } catch (err) {
      console.error('❌ Failed to add to server favorites:', err);
      throw err;
    }
  }, [isAuthenticated]);

  // إزالة منتج من المفضلة (مباشرة من السيرفر)
  const removeFromFavorites = useCallback(async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) {
      throw new Error('يجب تسجيل الدخول لإزالة المنتج من المفضلة');
    }

    try {
      // إزالة مباشرة من السيرفر
      await favoritesApi.removeFromFavorites(productId);
      console.log('✅ Removed from server favorites:', productId);
      
      // تحديث العداد المحلي فوراً
      favoritesStorage.removeFromLocalFavorites(productId);
      
      // تحديث القائمة محلياً بدون إعادة الجلب
      setFavorites(prev => prev.filter(product => product.id !== productId));
      
      return true;
    } catch (err) {
      console.error('❌ Failed to remove from server favorites:', err);
      throw err;
    }
  }, [isAuthenticated]);

  // تبديل حالة المفضلة
  const toggleFavorite = useCallback(async (productId: number): Promise<boolean> => {
    try {
      const isCurrentlyFavorite = favorites.some(fav => fav.id === productId);
      
      if (isCurrentlyFavorite) {
        await removeFromFavorites(productId);
        return false;
      } else {
        await addToFavorites(productId);
        return true;
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      throw err;
    }
  }, [favorites, addToFavorites, removeFromFavorites]);

  // جلب البيانات تلقائياً عند تحميل المكون - مرة واحدة فقط
  useEffect(() => {
    if (isAuthenticated && !hasFetchedRef.current) {
      console.log('🎯 Initial favorites fetch');
      fetchFavorites();
    } else if (!isAuthenticated) {
      setFavorites([]);
      favoritesStorage.saveLocalFavorites([]);
      hasFetchedRef.current = false;
    }
  }, [isAuthenticated]); // فقط isAuthenticated كم dependency

  // التحقق مما إذا كان المنتج في المفضلة (من السيرفر)
  const isFavorite = useCallback((productId: number): boolean => {
    return favorites.some(fav => fav.id === productId);
  }, [favorites]);

  // الحصول على عدد المفضلات (من المحلي للعداد السريع)
  const favoritesCount = favoritesStorage.getLocalFavoritesCount();

  // إعادة تحميل يدوية
  const refetch = useCallback(async () => {
    await fetchFavorites(true);
  }, []);

  return {
    // البيانات من السيرفر
    favorites,
    // العداد من المحلي (للسرعة)
    favoritesCount,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    refetch
  };
};