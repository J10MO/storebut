import { apiClient } from '../client';

export const authAPI = {
  // Send OTP
  sendOTP: (phone: string) => 
    apiClient.post('/auth/send-otp', { phone }),

  // Verify OTP and login/register
  verifyOTP: (phone: string, code: string, userData?: any) => 
    apiClient.post('/auth/verify-otp', { phone, code, userData }),

  // Resend OTP
  resendOTP: (phone: string) => 
    apiClient.post('/auth/resend-otp', { phone }),

  // Get user profile
  getProfile: () => 
    apiClient.get('/auth/profile'),

  // Update user profile
  updateProfile: (userData: any) => 
    apiClient.put('/auth/profile', userData),
};