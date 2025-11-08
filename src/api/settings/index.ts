import { apiClient } from "../client"

export const settingsAPI = {
  // Get delivery price (public)
  getDeliveryPrice: () => apiClient.get("/settings/delivery-price"),

  // Get all settings (admin only)
  getAllSettings: () => apiClient.get("/settings"),

  // Update delivery price (admin only)
  updateDeliveryPrice: (delivery_price: number) => apiClient.put("/settings/delivery-price", { delivery_price }),

  // Update any setting (admin only)
  updateSetting: (key: string, value: string, description?: string) =>
    apiClient.put("/settings", { key, value, description }),
}
