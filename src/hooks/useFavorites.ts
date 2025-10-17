// import { useState, useEffect, useCallback } from 'react';
// import { useAuth } from './useAuth';
// import { favoritesApi } from '../api/favorites';
// import { 
//   FavoriteWithProduct, 
//   FavoritesResponse, 
//   FavoriteCheckResponse,
//   FavoriteCountResponse 
// } from '../api/types/favorite.types';

// export const useFavorites = () => {
//   const [favorites, setFavorites] = useState<FavoriteWithProduct[]>([]);
//   const [favoritesCount, setFavoritesCount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const { user, isAuthenticated } = useAuth();
//   const [favoritesCache, setFavoritesCache] = useState<Map<number, boolean>>(new Map());

//   // جلب قائمة المفضلات
//    const fetchFavorites = useCallback(async (page = 1, limit = 20): Promise<FavoritesResponse | null> => {
//     if (!isAuthenticated) {
//       setFavorites([]);
//       return null;
//     }
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const data: FavoritesResponse = await favoritesApi.getFavorites(page, limit);
      
//       // تسجيل بنية البيانات للتصحيح
//       console.log('📦 API Response Structure:', data);
//       console.log('📦 Favorites Array:', data.favorites);
      
//       if (data.favorites && Array.isArray(data.favorites)) {
//         // تصفية العناصر الصالحة فقط
//         const validFavorites = data.favorites.filter(fav => 
//           fav && 
//           fav.product && 
//           typeof fav.product === 'object' &&
//           fav.product.id
//         );
        
//         console.log('✅ Valid Favorites:', validFavorites);
//         setFavorites(validFavorites);
//       } else {
//         console.warn('⚠️ Invalid favorites data structure:', data.favorites);
//         setFavorites([]);
//       }
      
//       return data;
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
//       setError(errorMessage);
//       console.error('Error fetching favorites:', err);
//       return null;
//     } finally {
//       setLoading(false);
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
//   const addToFavorites = async (productId: number) => {
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
//   };

//   // إزالة منتج من المفضلة
//   const removeFromFavorites = async (productId: number) => {
//     if (!isAuthenticated) {
//       throw new Error('يجب تسجيل الدخول لإزالة المنتج من المفضلة');
//     }

//     try {
//       const data = await favoritesApi.removeFromFavorites(productId);
      
//       // تحديث الـ cache
//       setFavoritesCache(prev => new Map(prev).set(productId, false));
      
//       // تحديث العد والبيانات المحلية
//       await fetchFavoritesCount();
//       setFavorites(prev => prev.filter(fav => fav.product.id !== productId));
      
//       return data;
//     } catch (err) {
//       console.error('Error removing from favorites:', err);
//       throw err;
//     }
//   };

//   // التحقق مما إذا كان المنتج في المفضلة مع cache
//   const checkIsFavorite = async (productId: number): Promise<boolean> => {
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
//   };

//   // تبديل حالة المفضلة (إضافة/إزالة)
//     const toggleFavorite = async (productId: number): Promise<boolean> => {
//     try {
//       const isCurrentlyFavorite = await checkIsFavorite(productId);
      
//       if (isCurrentlyFavorite) {
//         await removeFromFavorites(productId);
//         setFavoritesCache(prev => new Map(prev).set(productId, false));
//         return false; // تم الإزالة
//       } else {
//         await addToFavorites(productId);
//         setFavoritesCache(prev => new Map(prev).set(productId, true));
//         return true; // تم الإضافة
//       }
//     } catch (err) {
//       console.error('Error toggling favorite:', err);
//       throw err;
//     }
//   };

//   // مسح cache محدد
//   const clearProductCache = (productId: number) => {
//     setFavoritesCache(prev => {
//       const newCache = new Map(prev);
//       newCache.delete(productId);
//       return newCache;
//     });
//   };

//   // مسح كل الـ cache
//   const clearAllCache = () => {
//     setFavoritesCache(new Map());
//   };

//   // جلب البيانات تلقائياً عند تحميل المكون
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchFavorites();
//       fetchFavoritesCount();
//       // لا نمسح الـ cache هنا لتجنب فقدان البيانات
//     } else {
//       setFavorites([]);
//       setFavoritesCount(0);
//       setFavoritesCache(new Map()); // مسح الـ cache عند تسجيل الخروج فقط
//     }
//   }, [isAuthenticated, fetchFavorites, fetchFavoritesCount]);

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




import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { favoritesApi } from '../api/favorites';
import { 
  FavoriteWithProduct, 
  FavoritesResponse, 
  FavoriteCheckResponse,
  FavoriteCountResponse 
} from '../api/types/favorite.types';
import { Product } from '../api/types/product.types'; // إضافة استيراد Product

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]); // تغيير النوع إلى Product[]
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const [favoritesCache, setFavoritesCache] = useState<Map<number, boolean>>(new Map());

  // جلب قائمة المفضلات
  const fetchFavorites = useCallback(async (page = 1, limit = 20): Promise<any> => {
    if (!isAuthenticated) {
      setFavorites([]);
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await favoritesApi.getFavorites(page, limit);
      
      console.log('📦 API Response Structure:', data);
      console.log('📦 Favorites Array:', data.favorites || data);
      
      // البيانات تأتي مباشرة كمصفوفة منتجات، وليس ككائنات favorite
      let favoritesData: any[] = [];
      
      if (data.favorites && Array.isArray(data.favorites)) {
        // إذا كانت البيانات تحتوي على خاصية favorites
        favoritesData = data.favorites;
      } else if (Array.isArray(data)) {
        // إذا كانت البيانات مباشرة كمصفوفة
        favoritesData = data;
      } else if (data.products && Array.isArray(data.products)) {
        // إذا كانت تحتوي على خاصية products
        favoritesData = data.products;
      }
      
      console.log('✅ Processed Favorites Data:', favoritesData);
      
      // تصفية العناصر الصالحة فقط
      const validFavorites = favoritesData.filter((item: any) => 
        item && 
        typeof item === 'object' &&
        item.id &&
        item.name
      );
      
      console.log('✅ Valid Favorites Count:', validFavorites.length);
      setFavorites(validFavorites);
      
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      console.error('Error fetching favorites:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // جلب عدد المفضلات
  const fetchFavoritesCount = useCallback(async (): Promise<number> => {
    if (!isAuthenticated) {
      setFavoritesCount(0);
      return 0;
    }

    try {
      const data: FavoriteCountResponse = await favoritesApi.getFavoritesCount();
      setFavoritesCount(data.count);
      return data.count;
    } catch (err) {
      console.error('Error fetching favorites count:', err);
      return 0;
    }
  }, [isAuthenticated]);

  // إضافة منتج إلى المفضلة
  const addToFavorites = async (productId: number) => {
    if (!isAuthenticated) {
      throw new Error('يجب تسجيل الدخول لإضافة المنتج إلى المفضلة');
    }

    try {
      const data = await favoritesApi.addToFavorites(productId);
      
      // تحديث الـ cache
      setFavoritesCache(prev => new Map(prev).set(productId, true));
      
      // تحديث العد والبيانات المحلية
      await fetchFavoritesCount();
      
      return data;
    } catch (err) {
      console.error('Error adding to favorites:', err);
      throw err;
    }
  };

  // إزالة منتج من المفضلة
  const removeFromFavorites = async (productId: number) => {
    if (!isAuthenticated) {
      throw new Error('يجب تسجيل الدخول لإزالة المنتج من المفضلة');
    }

    try {
      const data = await favoritesApi.removeFromFavorites(productId);
      
      // تحديث الـ cache
      setFavoritesCache(prev => new Map(prev).set(productId, false));
      
      // تحديث العد والبيانات المحلية
      await fetchFavoritesCount();
      setFavorites(prev => prev.filter(product => product.id !== productId));
      
      return data;
    } catch (err) {
      console.error('Error removing from favorites:', err);
      throw err;
    }
  };

  // التحقق مما إذا كان المنتج في المفضلة مع cache
  const checkIsFavorite = async (productId: number): Promise<boolean> => {
    if (!isAuthenticated) return false;

    // التحقق من الـ cache أولاً
    if (favoritesCache.has(productId)) {
      return favoritesCache.get(productId) || false;
    }

    try {
      const data: FavoriteCheckResponse = await favoritesApi.checkFavorite(productId);
      setFavoritesCache(prev => new Map(prev).set(productId, data.isFavorite));
      return data.isFavorite;
    } catch (err) {
      console.error('Error checking favorite:', err);
      return false;
    }
  };

  // تبديل حالة المفضلة (إضافة/إزالة)
  const toggleFavorite = async (productId: number): Promise<boolean> => {
    try {
      const isCurrentlyFavorite = await checkIsFavorite(productId);
      
      if (isCurrentlyFavorite) {
        await removeFromFavorites(productId);
        setFavoritesCache(prev => new Map(prev).set(productId, false));
        return false; // تم الإزالة
      } else {
        await addToFavorites(productId);
        setFavoritesCache(prev => new Map(prev).set(productId, true));
        return true; // تم الإضافة
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      throw err;
    }
  };

  // مسح cache محدد
  const clearProductCache = (productId: number) => {
    setFavoritesCache(prev => {
      const newCache = new Map(prev);
      newCache.delete(productId);
      return newCache;
    });
  };

  // مسح كل الـ cache
  const clearAllCache = () => {
    setFavoritesCache(new Map());
  };

  // جلب البيانات تلقائياً عند تحميل المكون
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
      fetchFavoritesCount();
      // لا نمسح الـ cache هنا لتجنب فقدان البيانات
    } else {
      setFavorites([]);
      setFavoritesCount(0);
      setFavoritesCache(new Map()); // مسح الـ cache عند تسجيل الخروج فقط
    }
  }, [isAuthenticated, fetchFavorites, fetchFavoritesCount]);

  return {
    favorites, // الآن هذه مصفوفة من Product مباشرة
    favoritesCount,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    checkIsFavorite,
    toggleFavorite,
    fetchFavorites,
    fetchFavoritesCount,
    clearProductCache,
    clearAllCache,
    refetch: fetchFavorites
  };
};
