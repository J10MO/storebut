// hooks/useCachedApi.ts
import { useState, useEffect, useCallback, useRef } from 'react';

// Global cache manager
const apiCache = new Map<string, { data: any; timestamp: number; loading?: boolean }>();

interface UseCachedApiOptions<T> {
  cacheDuration?: number;
  enabled?: boolean;
  retryCount?: number;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const useCachedApi = <T>(
  apiCall: () => Promise<any>,
  cacheKey: string,
  dependencies: any[] = [],
  options: UseCachedApiOptions<T> = {}
) => {
  const {
    cacheDuration = 5 * 60 * 1000, // 5 دقائق افتراضياً
    enabled = true,
    retryCount = 2,
    initialData = null,
    onSuccess,
    onError
  } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (retry = 0, isRetry = false) => {
    if (!enabled || !isMountedRef.current) return;

    // إلغاء الطلب السابق إذا كان موجوداً
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // إنشاء AbortController جديد
    abortControllerRef.current = new AbortController();

    // التحقق من الـ cache أولاً (ما عدا في حالة إعادة المحاولة)
    if (!isRetry) {
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cacheDuration) {
        if (isMountedRef.current) {
          setData(cached.data);
          setLoading(false);
          onSuccess?.(cached.data);
        }
        return;
      }
    }

    // منع الطلبات المكررة
    const existingRequest = apiCache.get(cacheKey)?.loading;
    if (existingRequest && !isRetry) {
      return;
    }

    // وضع علامة loading في الـ cache
    apiCache.set(cacheKey, { 
      data: apiCache.get(cacheKey)?.data || null, 
      timestamp: Date.now(),
      loading: true 
    });

    if (isMountedRef.current && !isRetry) {
      setLoading(true);
      setError(null);
    }

    try {
      const response = await apiCall();
      
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      const responseData = response?.data || response;

      if (isMountedRef.current) {
        setData(responseData);
        setLoading(false);
        
        // تحديث الـ cache
        apiCache.set(cacheKey, {
          data: responseData,
          timestamp: Date.now(),
          loading: false
        });
        
        onSuccess?.(responseData);
      }
    } catch (err: any) {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      if (isMountedRef.current) {
        if (retry < retryCount) {
          // إعادة المحاولة بعد تأخير
          setTimeout(() => fetchData(retry + 1, true), 1000 * (retry + 1));
        } else {
          setError(err.response?.data?.error || err.message || 'Something went wrong');
          setLoading(false);
          onError?.(err);
        }
      }
    } finally {
      if (isMountedRef.current && !abortControllerRef.current?.signal.aborted) {
        apiCache.set(cacheKey, { 
          ...apiCache.get(cacheKey), 
          loading: false 
        });
      }
    }
  }, [apiCall, cacheKey, cacheDuration, enabled, retryCount, onSuccess, onError]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    // مسح الـ cache وإعادة الجلب
    apiCache.delete(cacheKey);
    fetchData(0, true);
  }, [cacheKey, fetchData]);

  const updateCache = useCallback((newData: T) => {
    setData(newData);
    apiCache.set(cacheKey, {
      data: newData,
      timestamp: Date.now(),
      loading: false
    });
  }, [cacheKey]);

  return { 
    data, 
    loading, 
    error, 
    refetch,
    updateCache
  };
};

// Utility function لمسح cache محدد
export const clearApiCache = (key?: string) => {
  if (key) {
    apiCache.delete(key);
  } else {
    apiCache.clear();
  }
};