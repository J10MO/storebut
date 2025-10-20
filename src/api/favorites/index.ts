// import { 
//   FavoritesResponse, 
//   FavoriteCheckResponse, 
//   FavoriteCountResponse, 
//   FavoriteActionResponse 
// } from '../types/favorite.types';

// const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// const handleResponse = async (response: Response) => {
//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({ message: 'فشل في العملية' }));
//     throw new Error(errorData.message || `خطأ: ${response.status}`);
//   }
//   return response.json();
// };

// const getAuthHeaders = () => {
//   const token = localStorage.getItem('token');
//   return {
//     'Authorization': `Bearer ${token}`,
//     'Content-Type': 'application/json',
//   };
// };

// export const favoritesApi = {
//   // إضافة منتج إلى المفضلة
//   async addToFavorites(productId: number): Promise<FavoriteActionResponse> {
//     const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
//       method: 'POST',
//       headers: getAuthHeaders(),
//     });
//     return handleResponse(response);
//   },

//   // إزالة منتج من المفضلة
//   async removeFromFavorites(productId: number): Promise<FavoriteActionResponse> {
//     const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
//       method: 'DELETE',
//       headers: getAuthHeaders(),
//     });
//     return handleResponse(response);
//   },

//   // جلب قائمة المفضلات
//   async getFavorites(page = 1, limit = 20): Promise<FavoritesResponse> {
//     const response = await fetch(
//       `${API_BASE_URL}/favorites?page=${page}&limit=${limit}`,
//       {
//         headers: getAuthHeaders(),
//       }
//     );
//     return handleResponse(response);
//   },

//   // التحقق من حالة المفضلة
//   async checkFavorite(productId: number): Promise<FavoriteCheckResponse> {
//     const response = await fetch(
//       `${API_BASE_URL}/favorites/check/${productId}`,
//       {
//         headers: getAuthHeaders(),
//       }
//     );
//     return handleResponse(response);
//   },

//   // جلب عدد المفضلات
//   async getFavoritesCount(): Promise<FavoriteCountResponse> {
//     const response = await fetch(`${API_BASE_URL}/favorites/count`, {
//       headers: getAuthHeaders(),
//     });
//     return handleResponse(response);
//   },
// };

// export default favoritesApi;




// frontend/src/api/favorites.ts (مبسّط مع caching محلي بسيط)
import { 
  FavoritesResponse, 
  FavoriteCheckResponse, 
  FavoriteCountResponse, 
  FavoriteActionResponse 
} from '../types/favorite.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'فشل في العملية' }));
    throw new Error(errorData.message || `خطأ: ${response.status}`);
  }
  return response.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Simple in-memory cache for favorites list (optional TTL)
let favoritesCache: FavoritesResponse | null = null;
let favoritesCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 دقائق

export const favoritesApi = {
  // إضافة منتج إلى المفضلة
  async addToFavorites(productId: number): Promise<FavoriteActionResponse> {
    const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    // Optionally invalidate cache since data changed
    favoritesCache = null;
    favoritesCacheTime = 0;
    return data;
  },

  // إزالة منتج من المفضلة
  async removeFromFavorites(productId: number): Promise<FavoriteActionResponse> {
    const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const data = await handleResponse(response);
    favoritesCache = null;
    favoritesCacheTime = 0;
    return data;
  },

  // جلب قائمة المفضلات
  async getFavorites(page = 1, limit = 20): Promise<FavoritesResponse> {
    // حاول استخدام cache أولاً
    const now = Date.now();
    if (favoritesCache && now - favoritesCacheTime < CACHE_TTL_MS) {
      // @ts-ignore
      return favoritesCache;
    }

    const response = await fetch(
      `${API_BASE_URL}/favorites?page=${page}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    const data = await handleResponse(response);
    // ضع في cache
    favoritesCache = data;
    favoritesCacheTime = now;
    return data;
  },

  // التحقق من حالة المفضلة
  async checkFavorite(productId: number): Promise<FavoriteCheckResponse> {
    const response = await fetch(
      `${API_BASE_URL}/favorites/check/${productId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    const data = await handleResponse(response);
    return data;
  },

  // جلب عدد المفضلات
  async getFavoritesCount(): Promise<FavoriteCountResponse> {
    const response = await fetch(`${API_BASE_URL}/favorites/count`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

export default favoritesApi;
