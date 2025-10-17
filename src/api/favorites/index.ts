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

export const favoritesApi = {
  // إضافة منتج إلى المفضلة
  async addToFavorites(productId: number): Promise<FavoriteActionResponse> {
    const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // إزالة منتج من المفضلة
  async removeFromFavorites(productId: number): Promise<FavoriteActionResponse> {
    const response = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  // جلب قائمة المفضلات
  async getFavorites(page = 1, limit = 20): Promise<FavoritesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/favorites?page=${page}&limit=${limit}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
  },

  // التحقق من حالة المفضلة
  async checkFavorite(productId: number): Promise<FavoriteCheckResponse> {
    const response = await fetch(
      `${API_BASE_URL}/favorites/check/${productId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return handleResponse(response);
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