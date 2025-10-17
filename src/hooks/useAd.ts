import { useState, useEffect, useCallback } from 'react';
import { adsAPI } from '../api/ads';
import { 
  Ad, 
  CreateAdData, 
  UpdateAdData, 
  AdsFilters 
} from '../api/types/ads.types';

export const useAds = (filters?: AdsFilters) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAds = useCallback(async (customFilters?: AdsFilters) => {
    setLoading(true);
    setError(null);
    try {
      const response = await adsAPI.getAds(customFilters || filters);
      setAds(response.data.ads || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch ads');
      console.error('Error fetching ads:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createAd = async (adData: CreateAdData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await adsAPI.createAd(adData);
      setAds(prev => [response.data.ad, ...prev]);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create ad');
      console.error('Error creating ad:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAd = async (id: number, adData: UpdateAdData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await adsAPI.updateAd(id, adData);
      setAds(prev => prev.map(ad => ad.id === id ? response.data.ad : ad));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update ad');
      console.error('Error updating ad:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAd = async (id: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await adsAPI.deleteAd(id);
      setAds(prev => prev.filter(ad => ad.id !== id));
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete ad');
      console.error('Error deleting ad:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const trackView = async (id: number): Promise<void> => {
    try {
      await adsAPI.incrementViewCount(id);
    } catch (err) {
      console.error('Failed to track view:', err);
    }
  };

  const trackClick = async (id: number): Promise<void> => {
    try {
      await adsAPI.incrementClickCount(id);
    } catch (err) {
      console.error('Failed to track click:', err);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  return {
    ads,
    loading,
    error,
    fetchAds,
    createAd,
    updateAd,
    deleteAd,
    trackView,
    trackClick,
    refetch: fetchAds,
  };
};

// Specialized hook for homepage ads
export const useHomepageAds = () => {
  const [homepageAds, setHomepageAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHomepageAds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adsAPI.getHomepageAds();
      setHomepageAds(response.data.ads || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch homepage ads');
      console.error('Error fetching homepage ads:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomepageAds();
  }, [fetchHomepageAds]);

  return {
    homepageAds,
    loading,
    error,
    refetch: fetchHomepageAds,
  };
};

// Hook for single ad management
export const useAd = (id: number) => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAd = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await adsAPI.getAdById(id);
      setAd(response.data.ad);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch ad');
      console.error('Error fetching ad:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const updateAd = async (adData: UpdateAdData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await adsAPI.updateAd(id, adData);
      setAd(response.data.ad);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update ad');
      console.error('Error updating ad:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAd = async (): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await adsAPI.deleteAd(id);
      setAd(null);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete ad');
      console.error('Error deleting ad:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAd();
    }
  }, [id, fetchAd]);

  return {
    ad,
    loading,
    error,
    fetchAd,
    updateAd,
    deleteAd,
    refetch: fetchAd,
  };
};

// Hook for active ads only
export const useActiveAds = (position?: string) => {
  const filters: AdsFilters = { 
    active_only: true,
    ...(position && { position })
  };
  
  return useAds(filters);
};




// // hooks/useAd.ts (or wherever your hooks live)
// import { useState, useEffect, useCallback } from 'react';
// import { adsAPI } from '../api/ads';
// import { Ad } from '../api/types/ads.types';

// export const useHomepageAds = () => {
//   const [homepageAds, setHomepageAds] = useState<Ad[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchHomepageAds = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await adsAPI.getHomepageAds();
//       // Debug: log full response
//       // console.log('getHomepageAds response:', response);

//       // If using axios, response.data should contain the payload
//       // Ensure you read the shape { success, ads }
//       const data = response?.data ?? {};
//       const adsFromApi: Ad[] = (data.ads ?? []) as Ad[];

//       // Optional: respect "success" flag if provided
//       if (typeof data.success !== 'undefined' && data.success === false) {
//         setError('Failed to fetch homepage ads');
//         setHomepageAds([]);
//       } else {
//         setHomepageAds(adsFromApi);
//       }
//     } catch (err: any) {
//       setError(err?.response?.data?.error ?? 'Failed to fetch homepage ads');
//       console.error('Error fetching homepage ads:', err);
//       setHomepageAds([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHomepageAds();
//   }, [fetchHomepageAds]);

//   return {
//     homepageAds,
//     loading,
//     error,
//     refetch: fetchHomepageAds,
//   };
// };
