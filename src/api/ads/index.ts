import { apiClient } from '../client';
import { 
  Ad, 
  CreateAdData, 
  UpdateAdData, 
  AdsResponse, 
  AdResponse,
  AdsFilters 
} from '../types/ads.types';

export const adsAPI = {
  // Get all ads (with optional filters)
  getAds: (params?: AdsFilters): Promise<AdsResponse> => 
    apiClient.get('/ads', { params }),

  // Get homepage ads
  getHomepageAds: (): Promise<AdsResponse> => 
    apiClient.get('/ads'),

  // Get ad by ID
  getAdById: (id: number): Promise<AdResponse> => 
    apiClient.get(`/ads/${id}`),

  // Create new ad (admin only)
  createAd: (adData: CreateAdData): Promise<AdResponse> => 
    apiClient.post('/ads', adData),

  // Update ad (admin only)
  updateAd: (id: number, adData: UpdateAdData): Promise<AdResponse> => 
    apiClient.put(`/ads/${id}`, adData),

  // Delete ad (admin only)
  deleteAd: (id: number): Promise<{ success: boolean; message: string }> => 
    apiClient.delete(`/ads/${id}`),

  // Increment view count
  incrementViewCount: (id: number): Promise<{ success: boolean; message: string }> => 
    apiClient.patch(`/ads/${id}/view`),

  // Increment click count
  incrementClickCount: (id: number): Promise<{ success: boolean; message: string }> => 
    apiClient.patch(`/ads/${id}/click`),
};
