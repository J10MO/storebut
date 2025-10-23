// import { apiClient } from '../client';

// export const cartAPI = {
//   // Get cart items
//   getCart: () => 
//     apiClient.get('/cart'),

//   // Add to cart
//   addToCart: (productId: number, quantity: number = 1) => 
//     apiClient.post('/cart', { product_id: productId, quantity }),

//   // Update cart item
//   updateCartItem: (productId: number, quantity: number) => 
//     apiClient.put(`/cart/${productId}`, { quantity }),

//   // Remove from cart
//   removeFromCart: (productId: number) => 
//     apiClient.delete(`/cart/${productId}`),

//   // Clear cart
//   clearCart: () => 
//     apiClient.delete('/cart'),
// };

// api/cart/index.ts
import { apiClient } from '../client';
import type { Product } from '../types/product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const cartAPI = {
  // Get cart items
  getCart: () => 
    apiClient.get('/cart'),

  // Add item to cart
  addToCart: (productId: number, quantity: number = 1) => 
    apiClient.post('/cart', { product_id: productId, quantity }),

  // Update cart item quantity - استخدم product_id في الـ URL
  updateCartItem: (productId: number, quantity: number) => 
    apiClient.put(`/cart/${productId}`, { quantity }),

  // Remove item from cart - استخدم product_id في الـ URL
  removeFromCart: (productId: number) => 
    apiClient.delete(`/cart/${productId}`),

  // Clear cart
  clearCart: () => 
    apiClient.delete('/cart'),
};
