
// //hooks/useOrders.ts

// import { useState, useEffect } from 'react';
// import { useAuth } from './useAuth';

// export const useOrders = () => {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { isAuthenticated } = useAuth();

//   const fetchOrders = async () => {
//     if (!isAuthenticated) {
//       setOrders([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
      
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/orders', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (response.ok) {
//         const ordersData = await response.json();
//         setOrders(ordersData);
//       } else {
//         setError('Failed to fetch orders');
//       }
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setError('Network error while fetching orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [isAuthenticated]);

//   return {
//     orders,
//     loading,
//     error,
//     refetch: fetchOrders
//   };
// };



import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { ordersAPI } from '../api/orders';

export const useOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    if (!isAuthenticated) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // استخدام ordersAPI بدلاً من fetch المباشر
      const response = await ordersAPI.getOrders();
      setOrders(response.data);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.error || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ordersAPI.createOrder(orderData);
      await fetchOrders(); // Refresh orders list
      return response.data;
    } catch (err: any) {
      console.error('Error creating order:', err);
      setError(err.response?.data?.error || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ordersAPI.getOrder(id);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching order:', err);
      setError(err.response?.data?.error || 'Failed to fetch order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await ordersAPI.cancelOrder(id);
      await fetchOrders(); // Refresh orders list
      return response.data;
    } catch (err: any) {
      console.error('Error canceling order:', err);
      setError(err.response?.data?.error || 'Failed to cancel order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [isAuthenticated]);

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    createOrder,
    getOrder,
    cancelOrder
  };
};