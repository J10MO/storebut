import { apiClient } from "../client"

export const ordersAPI = {
  // Create order
  createOrder: (orderData: any) => apiClient.post("/orders", orderData),

  // Get user orders
  getOrders: (params?: any) => apiClient.get("/orders", { params }),

  // Get order by ID
  getOrder: (id: string | number) => apiClient.get(`/orders/${id}`),

  // Update order status
  updateOrder: (id: string | number, updateData: any) => apiClient.put(`/orders/${id}`, updateData),

  // Cancel order
  cancelOrder: (id: string | number) => apiClient.put(`/orders/${id}/cancel`),
}
