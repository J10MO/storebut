import { apiClient } from "../client"

export const deliveryAPI = {
  // Create delivery for an order
  createDelivery: (deliveryData: any) => apiClient.post("/deliveries", deliveryData),

  // Get delivery by order ID
  getDeliveryByOrderId: (orderId: string | number) => apiClient.get(`/deliveries/order/${orderId}`),

  // Get delivery by tracking number (public)
  getDeliveryByTracking: (trackingNumber: string) => apiClient.get(`/deliveries/track/${trackingNumber}`),

  // Get all deliveries (user or admin)
  getDeliveries: (params?: any) => apiClient.get("/deliveries", { params }),

  // Update delivery (admin only)
  updateDelivery: (deliveryId: string | number, updateData: any) =>
    apiClient.put(`/deliveries/${deliveryId}`, updateData),

  // Delete delivery (admin only)
  deleteDelivery: (deliveryId: string | number) => apiClient.delete(`/deliveries/${deliveryId}`),
}
