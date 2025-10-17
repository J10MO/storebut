// import { useState, useCallback } from 'react';

// interface UseApiState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

// export const useApi = <T>() => {
//   const [state, setState] = useState<UseApiState<T>>({
//     data: null,
//     loading: false,
//     error: null,
//   });

//   const execute = useCallback(async (
//     apiCall: () => Promise<T>,
//     onSuccess?: (data: T) => void,
//     onError?: (error: string) => void
//   ) => {
//     setState({ data: null, loading: true, error: null });

//     try {
//       const result = await apiCall();
//       setState({ data: result, loading: false, error: null });
//       onSuccess?.(result);
//       return result;
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : 'An error occurred';
//       setState({ data: null, loading: false, error: errorMessage });
//       onError?.(errorMessage);
//       throw error;
//     }
//   }, []);

//   return {
//     ...state,
//     execute,
//   };
// };




import { useState, useEffect } from 'react';

export const useApi = <T>(apiCall: () => Promise<any>, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: () => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  } };
};