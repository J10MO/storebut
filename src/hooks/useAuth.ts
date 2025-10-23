// import { useState, useEffect } from 'react';
// import { authAPI } from '../api';
// import type { RegisterRequest } from '../api/types/auth.types';

// export const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     setIsAuthenticated(!!token);
//     setLoading(false);
//   }, []);

//   const login = async (phone: string) => {
//     try {
//       const response = await authAPI.login(phone);
//       localStorage.setItem('authToken', response.token);
//       setIsAuthenticated(true);
//       return response;
//     } catch (error) {
//       setIsAuthenticated(false);
//       throw error;
//     }
//   };

//   const register = async (userData: RegisterRequest) => {
//     try {
//       const response = await authAPI.register(userData);
//       localStorage.setItem('authToken', response.token);
//       setIsAuthenticated(true);
//       return response;
//     } catch (error) {
//       setIsAuthenticated(false);
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('authToken');
//     setIsAuthenticated(false);
//     authAPI.logout();
//   };

//   return {
//     isAuthenticated,
//     loading,
//     login,
//     register,
//     logout,
//   };
// };


// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../contexts/authContext";
// import { authAPI } from "../api/auth";

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const useAuthLogic = () => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         setUser(JSON.parse(userData));
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (phone: string, code: string, userData?: any) => {
//     try {
//       console.log('Logging in with:', { phone, code, userData });
      
//       const response = await authAPI.verifyOTP(phone, code, userData);
//       const { token, user: userInfo } = response.data;
      
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userInfo));
//       setUser(userInfo);
      
//       // Trigger cart update
//       window.dispatchEvent(new Event('cartUpdated'));
//       window.dispatchEvent(new Event('authStateChanged'));
      
//       return { success: true, user: userInfo };
//     } catch (error: any) {
//       console.error('Login error:', error);
//       return { 
//         success: false, 
//         error: error.response?.data?.error || 'Login failed' 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     window.dispatchEvent(new Event('cartUpdated'));
//     window.dispatchEvent(new Event('authStateChanged'));
//   };

//   const sendOTP = async (phone: string) => {
//     try {
//       console.log('Sending OTP to:', phone);
      
//       const response = await authAPI.sendOTP(phone);
//       console.log('OTP sent successfully:', response.data);
      
//       return { success: true, data: response.data };
//     } catch (error: any) {
//       console.error('Send OTP error:', error);
//       return { 
//         success: false, 
//         error: error.response?.data?.error || 'Failed to send OTP' 
//       };
//     }
//   };

//   return {
//     user,
//     loading,
//     login,
//     logout,
//     sendOTP,
//     isAuthenticated: !!user,
//   };
// };



import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/authContext";
const API_BASE_URL = import.meta.env.VITE_API_URL
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthLogic = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (phone: string, code: string, userData?: any) => {
    try {
      console.log('Logging in with:', { phone, code, userData });
      
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          phone, 
          code,
          userData 
        })
      });
      
      const result = await response.json();
      console.log('Login response:', result);
      
      if (response.ok && result.success) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
        
        window.dispatchEvent(new Event('cartUpdated'));
        window.dispatchEvent(new Event('authStateChanged'));
        
        return { success: true, user: result.user };
      } else {
        return { 
          success: false, 
          error: result.error || 'Login failed' 
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'Network error during login' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('authStateChanged'));
  };

  const sendOTP = async (phone: string) => {
    try {
      console.log('Sending OTP to:', phone);
      
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone })
      });
      
      const result = await response.json();
      console.log('OTP response:', result);
      
      if (response.ok && result.success) {
        return { success: true, data: result };
      } else {
        return { 
          success: false, 
          error: result.error || 'Failed to send OTP' 
        };
      }
    } catch (error: any) {
      console.error('Send OTP error:', error);
      return { 
        success: false, 
        error: 'Network error while sending OTP' 
      };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    sendOTP,
    isAuthenticated: !!user,
  };
};
