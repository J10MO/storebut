// import { useState, useEffect } from 'react';
// import { useAuth } from './useAuth';

// export const useCart = () => {
//   const { isAuthenticated } = useAuth();
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   // Load cart based on authentication status
//   useEffect(() => {
//     if (isAuthenticated) {
//       loadUserCart();
//     } else {
//       loadGuestCart();
//     }
//   }, [isAuthenticated]);

//   const loadGuestCart = () => {
//     const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//     setCartItems(guestCart);
//   };

//   const saveGuestCart = (items: any[]) => {
//     localStorage.setItem('guestCart', JSON.stringify(items));
//     setCartItems(items);
//     window.dispatchEvent(new Event('cartUpdated'));
//   };

//   const loadUserCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const cartData = await response.json();
//         setCartItems(cartData);
//       }
//     } catch (error) {
//       console.error('Error loading user cart:', error);
//     }
//   };

//   const addToCart = async (product: any, quantity: number = 1) => {
//     if (isAuthenticated) {
//       // Add to user cart via API
//       try {
//         const token = localStorage.getItem('token');
//         await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             product_id: product.id,
//             quantity: quantity
//           })
//         });
//         await loadUserCart();
//       } catch (error) {
//         console.error('Error adding to cart:', error);
//       }
//     } else {
//       // Add to guest cart in localStorage
//       const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//       const existingItem = guestCart.find((item: any) => item.product_id === product.id);
      
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         guestCart.push({
//           product_id: product.id,
//           quantity: quantity,
//           product: product
//         });
//       }
      
//       saveGuestCart(guestCart);
//     }
//   };

//   const removeFromCart = async (productId: number) => {
//     if (isAuthenticated) {
//       try {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/cart/${productId}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         await loadUserCart();
//       } catch (error) {
//         console.error('Error removing from cart:', error);
//       }
//     } else {
//       const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//       const updatedCart = guestCart.filter((item: any) => item.product_id !== productId);
//       saveGuestCart(updatedCart);
//     }
//   };

//   const updateQuantity = async (productId: number, quantity: number) => {
//     if (isAuthenticated) {
//       try {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/cart/${productId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ quantity })
//         });
//         await loadUserCart();
//       } catch (error) {
//         console.error('Error updating cart:', error);
//       }
//     } else {
//       const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//       const item = guestCart.find((item: any) => item.product_id === productId);
//       if (item) {
//         item.quantity = quantity;
//         saveGuestCart(guestCart);
//       }
//     }
//   };

//   const clearCart = () => {
//     if (isAuthenticated) {
//       // Clear via API
//       // Implement API call to clear cart
//     } else {
//       saveGuestCart([]);
//     }
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => {
//       const price = item.product?.price || item.price || 0;
//       return total + (price * item.quantity);
//     }, 0);
//   };

//   const getTotalQuantity = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   // Transfer guest cart to user cart after login
//   const transferGuestCartToUser = async () => {
//     const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    
//     if (guestCart.length > 0) {
//       try {
//         const token = localStorage.getItem('token');
        
//         // Add each guest cart item to user cart
//         for (const item of guestCart) {
//           await fetch('http://localhost:5000/api/cart', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               product_id: item.product_id,
//               quantity: item.quantity
//             })
//           });
//         }
        
//         // Clear guest cart
//         localStorage.removeItem('guestCart');
//         await loadUserCart();
        
//       } catch (error) {
//         console.error('Error transferring cart:', error);
//       }
//     }
//   };

//   return {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getTotalQuantity,
//     transferGuestCartToUser
//   };
// };



// import { useState, useEffect } from 'react';
// import { useAuth } from './useAuth';

// export const useCart = () => {
//   const { isAuthenticated } = useAuth();
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   // Load cart based on authentication status
//   useEffect(() => {
//     if (isAuthenticated) {
//       loadUserCart();
//     } else {
//       loadGuestCart();
//     }
//   }, [isAuthenticated]);

//   const loadGuestCart = () => {
//     const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//     setCartItems(guestCart);
//   };

//   const saveGuestCart = (items: any[]) => {
//     localStorage.setItem('guestCart', JSON.stringify(items));
//     setCartItems(items);
//     window.dispatchEvent(new Event('cartUpdated'));
//   };

//   const loadUserCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const cartData = await response.json();
//         setCartItems(cartData);
//       }
//     } catch (error) {
//       console.error('Error loading user cart:', error);
//     }
//   };

//   const addToCart = async (product: any, quantity: number = 1) => {
//     if (isAuthenticated) {
//       // Add to user cart via API
//       try {
//         const token = localStorage.getItem('token');
//         await fetch('http://localhost:5000/api/cart', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             product_id: product.id,
//             quantity: quantity
//           })
//         });
//         await loadUserCart();
//       } catch (error) {
//         console.error('Error adding to cart:', error);
//       }
//     } else {
//       // Add to guest cart in localStorage
//       const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//       const existingItem = guestCart.find((item: any) => item.product_id === product.id);
      
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         guestCart.push({
//           product_id: product.id,
//           quantity: quantity,
//           product: product
//         });
//       }
      
//       saveGuestCart(guestCart);
//     }
//   };

//   const removeFromCart = async (productId: number) => {
//     if (isAuthenticated) {
//       try {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/cart/${productId}`, {
//           method: 'DELETE',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         await loadUserCart();
//       } catch (error) {
//         console.error('Error removing from cart:', error);
//       }
//     } else {
//       const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//       const updatedCart = guestCart.filter((item: any) => item.product_id !== productId);
//       saveGuestCart(updatedCart);
//     }
//   };

//   const updateQuantity = async (productId: number, quantity: number) => {
//     if (isAuthenticated) {
//       try {
//         const token = localStorage.getItem('token');
//         await fetch(`http://localhost:5000/api/cart/${productId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ quantity })
//         });
//         await loadUserCart();
//       } catch (error) {
//         console.error('Error updating cart:', error);
//       }
//     } else {
//       const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//       const item = guestCart.find((item: any) => item.product_id === productId);
//       if (item) {
//         item.quantity = quantity;
//         saveGuestCart(guestCart);
//       }
//     }
//   };

//   const clearCart = () => {
//     if (isAuthenticated) {
//       // Clear via API
//       // You can implement this if your backend supports it
//     } else {
//       saveGuestCart([]);
//     }
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => {
//       const price = item.product?.price || item.price || 0;
//       return total + (price * item.quantity);
//     }, 0);
//   };

//   const getTotalQuantity = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//   // Transfer guest cart to user cart after login
//   const transferGuestCartToUser = async () => {
//     const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    
//     if (guestCart.length > 0) {
//       try {
//         const token = localStorage.getItem('token');
        
//         // Add each guest cart item to user cart
//         for (const item of guestCart) {
//           await fetch('http://localhost:5000/api/cart', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               product_id: item.product_id,
//               quantity: item.quantity
//             })
//           });
//         }
        
//         // Clear guest cart
//         localStorage.removeItem('guestCart');
//         await loadUserCart();
        
//       } catch (error) {
//         console.error('Error transferring cart:', error);
//       }
//     }
//   };

//   return {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     getTotalPrice,
//     getTotalQuantity,
//     transferGuestCartToUser
//   };
// };




// // hooks/useCart.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Product } from '../api/types/product.types';
// import { cartAPI } from '../api';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
//   addToCart: (product: Product, quantity: number) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   fetchCart: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoading: false,
//       error: null,

//       // Fetch cart from API
//       fetchCart: async () => {
//         try {
//           set({ isLoading: true, error: null });
//           const response = await cartAPI.getCart();
//           const cartItems = response.data.items || [];
//           set({ items: cartItems, isLoading: false });
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'Failed to fetch cart',
//             isLoading: false 
//           });
//         }
//       },

//       // Add to cart
//       addToCart: async (product: Product, quantity: number = 1) => {
//         const currentItems = get().items;
//         const existingItem = currentItems.find(
//           (item) => item.product.id === product.id
//         );

//         try {
//           set({ isLoading: true, error: null });
          
//           // Call API to add to cart
//           await cartAPI.addToCart(product.id, quantity);

//           // Update local state
//           if (existingItem) {
//             set({
//               items: currentItems.map((item) =>
//                 item.product.id === product.id
//                   ? { ...item, quantity: item.quantity + quantity }
//                   : item
//               ),
//               isLoading: false,
//             });
//           } else {
//             set({
//               items: [...currentItems, { product, quantity }],
//               isLoading: false,
//             });
//           }

//           // Show success message (you can use toast here)
//           console.log(`${product.name} added to cart!`);
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'Failed to add to cart',
//             isLoading: false 
//           });
//           throw error;
//         }
//       },

//       // Remove from cart
//       removeFromCart: async (productId: number) => {
//         try {
//           set({ isLoading: true, error: null });
          
//           // Call API to remove from cart
//                     await cartAPI.removeFromCart(productId);

//           // Update local state
//           set({
//             items: get().items.filter((item) => item.product.id !== productId),
//             isLoading: false,
//           });

//           console.log('Item removed from cart!');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'Failed to remove from cart',
//             isLoading: false 
//           });
//           throw error;
//         }
//       },

//       // Update quantity
//       updateQuantity: async (productId: number, quantity: number) => {
//         if (quantity <= 0) {
//           await get().removeFromCart(productId);
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });
          
//           // Call API to update quantity
//           await cartAPI.updateCartItem(productId, quantity);

//           // Update local state
//           set({
//             items: get().items.map((item) =>
//               item.product.id === productId
//                 ? { ...item, quantity }
//                 : item
//             ),
//             isLoading: false,
//           });

//           console.log('Cart updated!');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'Failed to update cart',
//             isLoading: false 
//           });
//           throw error;
//         }
//       },

//       // Clear cart
//       clearCart: async () => {
//         try {
//           set({ isLoading: true, error: null });
          
//           // Call API to clear cart
//           await cartAPI.clearCart();

//           // Clear local state
//           set({ items: [], isLoading: false });

//           console.log('Cart cleared!');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'Failed to clear cart',
//             isLoading: false 
//           });
//           throw error;
//         }
//       },

//       // Get total items
//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       },

//       // Get total price
//       getTotalPrice: () => {
//         return get().items.reduce(
//           (total, item) => total + parseFloat(item.product.price) * item.quantity,
//           0
//         );
//       },
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );




// // hooks/useCart.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Product } from '../api/types/product.types';
// import { cartAPI } from '../api';
// import { toast } from 'sonner';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
//   addToCart: (product: Product, quantity: number) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   fetchCart: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
//   transferGuestCartToUser: () => Promise<void>;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoading: false,
//       error: null,

//       fetchCart: async () => {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           // للضيوف، احتفظ بالسلة المحلية
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });
//           const response = await cartAPI.getCart();
//           const cartItems = response.data.items || [];
//           set({ items: cartItems, isLoading: false });
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في جلب السلة',
//             isLoading: false 
//           });
//         }
//       },

//       addToCart: async (product: Product, quantity: number = 1) => {
//         const currentItems = get().items;
//         const existingItem = currentItems.find(
//           (item) => item.product.id === product.id
//         );

//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             await cartAPI.addToCart(product.id, quantity);
//           }

//           // تحديث الحالة المحلية
//           if (existingItem) {
//             set({
//               items: currentItems.map((item) =>
//                 item.product.id === product.id
//                   ? { ...item, quantity: item.quantity + quantity }
//                   : item
//               ),
//               isLoading: false,
//             });
//           } else {
//             set({
//               items: [...currentItems, { product, quantity }],
//               isLoading: false,
//             });
//           }

//           toast.success(`تمت إضافة ${product.name} إلى السلة!`);
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في إضافة المنتج',
//             isLoading: false 
//           });
//           toast.error('فشل في إضافة المنتج');
//           throw error;
//         }
//       },

//       removeFromCart: async (productId: number) => {
//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           if (token) {
//             await cartAPI.removeFromCart(productId);
//           }

//           set({
//             items: get().items.filter((item) => item.product.id !== productId),
//             isLoading: false,
//           });

//                     toast.success('تم إزالة المنتج من السلة');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في إزالة المنتج',
//             isLoading: false 
//           });
//           toast.error('فشل في إزالة المنتج');
//           throw error;
//         }
//       },

//       updateQuantity: async (productId: number, quantity: number) => {
//         if (quantity <= 0) {
//           await get().removeFromCart(productId);
//           return;
//         }

//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           if (token) {
//             await cartAPI.updateCartItem(productId, quantity);
//           }

//           set({
//             items: get().items.map((item) =>
//               item.product.id === productId
//                 ? { ...item, quantity }
//                 : item
//             ),
//             isLoading: false,
//           });

//           toast.success('تم تحديث السلة');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في تحديث السلة',
//             isLoading: false 
//           });
//           toast.error('فشل في تحديث السلة');
//           throw error;
//         }
//       },

//       clearCart: async () => {
//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           if (token) {
//             await cartAPI.clearCart();
//           }

//           set({ items: [], isLoading: false });
//           toast.success('تم إفراغ السلة');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في إفراغ السلة',
//             isLoading: false 
//           });
//           toast.error('فشل في إفراغ السلة');
//           throw error;
//         }
//       },

//       // نقل سلة الضيف إلى حساب المستخدم بعد تسجيل الدخول
//       transferGuestCartToUser: async () => {
//         const guestItems = get().items;
//         const token = localStorage.getItem('token');

//         if (!token || guestItems.length === 0) {
//           return;
//         }

//         try {
//           set({ isLoading: true });

//           // إرسال كل منتج في سلة الضيف إلى حساب المستخدم
//           for (const item of guestItems) {
//             await cartAPI.addToCart(item.product.id, item.quantity);
//           }

//           // جلب السلة المحدثة من الخادم
//           await get().fetchCart();
          
//           toast.success('تم نقل السلة إلى حسابك');
//         } catch (error: any) {
//           console.error('خطأ في نقل السلة:', error);
//           toast.error('فشل في نقل السلة');
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       },

//       getTotalPrice: () => {
//         return get().items.reduce(
//           (total, item) => total + parseFloat(item.product.price) * item.quantity,
//           0
//         );
//       },
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );




// // hooks/useCart.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Product } from '../api/types/product.types';
// import { cartAPI } from '../api';
// import { toast } from 'sonner';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
//   addToCart: (product: Product, quantity: number) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   fetchCart: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
//   transferGuestCartToUser: () => Promise<void>;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoading: false,
//       error: null,

//       fetchCart: async () => {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           // للضيوف، احتفظ بالسلة المحلية
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });
//           const response = await cartAPI.getCart();
//           const cartItems = response.data.items || [];
//           set({ items: cartItems, isLoading: false });
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في جلب السلة',
//             isLoading: false 
//           });
//         }
//       },

//       addToCart: async (product: Product, quantity: number = 1) => {
//         const currentItems = get().items;
//         const existingItem = currentItems.find(
//           (item) => item.product.id === product.id
//         );

//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             await cartAPI.addToCart(product.id, quantity);
//           }

//           // تحديث الحالة المحلية
//           if (existingItem) {
//             set({
//               items: currentItems.map((item) =>
//                 item.product.id === product.id
//                   ? { ...item, quantity: item.quantity + quantity }
//                   : item
//               ),
//               isLoading: false,
//             });
//           } else {
//             set({
//               items: [...currentItems, { product, quantity }],
//               isLoading: false,
//             });
//           }

//           toast.success(`تمت إضافة ${product.name} إلى السلة!`);
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في إضافة المنتج',
//             isLoading: false 
//           });
//           toast.error('فشل في إضافة المنتج');
//           throw error;
//         }
//       },

//       removeFromCart: async (productId: number) => {
//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           if (token) {
//             await cartAPI.removeFromCart(productId);
//           }

//           set({
//             items: get().items.filter((item) => item.product.id !== productId),
//             isLoading: false,
//           });

//                     toast.success('تم إزالة المنتج من السلة');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في إزالة المنتج',
//             isLoading: false 
//           });
//           toast.error('فشل في إزالة المنتج');
//           throw error;
//         }
//       },

//       updateQuantity: async (productId: number, quantity: number) => {
//         if (quantity <= 0) {
//           await get().removeFromCart(productId);
//           return;
//         }

//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           if (token) {
//             await cartAPI.updateCartItem(productId, quantity);
//           }

//           set({
//             items: get().items.map((item) =>
//               item.product.id === productId
//                 ? { ...item, quantity }
//                 : item
//             ),
//             isLoading: false,
//           });

//           toast.success('تم تحديث السلة');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في تحديث السلة',
//             isLoading: false 
//           });
//           toast.error('فشل في تحديث السلة');
//           throw error;
//         }
//       },

//       clearCart: async () => {
//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });
          
//           if (token) {
//             await cartAPI.clearCart();
//           }

//           set({ items: [], isLoading: false });
//           toast.success('تم إفراغ السلة');
//         } catch (error: any) {
//           set({ 
//             error: error?.response?.data?.error || 'فشل في إفراغ السلة',
//             isLoading: false 
//           });
//           toast.error('فشل في إفراغ السلة');
//           throw error;
//         }
//       },

//       // نقل سلة الضيف إلى حساب المستخدم بعد تسجيل الدخول
//       transferGuestCartToUser: async () => {
//         const guestItems = get().items;
//         const token = localStorage.getItem('token');

//         if (!token || guestItems.length === 0) {
//           return;
//         }

//         try {
//           set({ isLoading: true });

//           // إرسال كل منتج في سلة الضيف إلى حساب المستخدم
//           for (const item of guestItems) {
//             await cartAPI.addToCart(item.product.id, item.quantity);
//           }

//           // جلب السلة المحدثة من الخادم
//           await get().fetchCart();
          
//           toast.success('تم نقل السلة إلى حسابك');
//         } catch (error: any) {
//           console.error('خطأ في نقل السلة:', error);
//           toast.error('فشل في نقل السلة');
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       getTotalItems: () => {
//         return get().items.reduce((total, item) => total + item.quantity, 0);
//       },

//       getTotalPrice: () => {
//         return get().items.reduce(
//           (total, item) => total + parseFloat(item.product.price) * item.quantity,
//           0
//         );
//       },
//     }),
//     {
//       name: 'cart-storage',
//     }
//   )
// );



// // hooks/useCart.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Product } from '../api/types/product.types';
// import { cartAPI } from '../api';
// import { toast } from 'sonner';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
//   addToCart: (product: Product, quantity: number) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   fetchCart: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
//   transferGuestCartToUser: () => Promise<void>;
//   syncCartWithServer: () => Promise<void>;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoading: false,
//       error: null,

//       fetchCart: async () => {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           // للضيوف، استخدم السلة المحلية فقط
//           console.log('No token found, using local cart');
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });
//           console.log('Fetching cart from server...');
//           const response = await cartAPI.getCart();
//           console.log('Cart API response:', response);
          
//           // معالجة استجابات مختلفة من الخادم
//           let cartItems: CartItem[] = [];
          
//           if (Array.isArray(response.data)) {
//             // إذا كانت البيانات مصفوفة مباشرة
//             cartItems = response.data.map((item: any) => ({
//               product: item.product || item,
//               quantity: item.quantity || 1
//             }));
//           } else if (response.data && Array.isArray(response.data.items)) {
//             // إذا كانت البيانات تحتوي على خاصية items
//             cartItems = response.data.items.map((item: any) => ({
//               product: item.product || item,
//               quantity: item.quantity || 1
//             }));
//           } else if (response.data && response.data.products) {
//             // إذا كانت البيانات تحتوي على خاصية products
//             cartItems = response.data.products.map((item: any) => ({
//               product: item.product || item,
//               quantity: item.quantity || 1
//             }));
//           } else if (response.data && typeof response.data === 'object') {
//             // إذا كانت البيانات كائن واحد
//             cartItems = [{
//               product: response.data.product || response.data,
//               quantity: response.data.quantity || 1
//             }];
//           }
          
//           console.log('Processed cart items:', cartItems);
//           set({ items: cartItems, isLoading: false });
//         } catch (error: any) {
//           console.error('خطأ في جلب السلة:', error);
//           set({ 
//             error: error?.response?.data?.error || 'فشل في جلب محتويات السلة',
//             isLoading: false 
//           });
//         }
//       },

//       addToCart: async (product: Product, quantity: number = 1) => {
//         // التحقق من أن المنتج يحتوي على السعر
//         if (!product || !product.price) {
//           console.error('Product or product price is undefined:', product);
//           toast.error('خطأ في البيانات', {
//             description: 'بيانات المنتج غير مكتملة',
//             duration: 4000,
//           });
//           return;
//         }

//         const currentItems = get().items;
//         const existingItem = currentItems.find(
//           (item) => item.product.id === product.id
//         );

//         const token = localStorage.getItem('token');
//         const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

//         try {
//           set({ isLoading: true, error: null });
          
//           // التحقق من توفر المنتج
//           if (!product.in_stock) {
//             throw new Error('المنتج غير متوفر حالياً');
//           }

//           // التحقق من أن الكمية لا تتجاوز الحد المسموح
//           if (newQuantity > 99) {
//             throw new Error('لا يمكن إضافة أكثر من 99 قطعة من المنتج نفسه');
//           }

//           let updatedItems: CartItem[];

//           // تحديث الحالة المحلية أولاً
//           if (existingItem) {
//             updatedItems = currentItems.map((item) =>
//               item.product.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             );
//           } else {
//             updatedItems = [...currentItems, { product, quantity }];
//           }

//           set({ items: updatedItems, isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               await cartAPI.addToCart(product.id, quantity);
//               console.log('Product added to server cart');
//             } catch (serverError) {
//               console.error('خطأ في مزامنة السلة مع الخادم:', serverError);
//               toast.warning('تمت الإضافة محلياً', {
//                 description: 'سيتم مزامنة السلة مع الخادم لاحقاً',
//                 duration: 3000,
//               });
//             }
//           }

//           // إشعار بنجاح الإضافة
//           toast.success(`تمت الإضافة إلى السلة 🛒`, {
//             description: `${product.name} - الكمية: ${quantity}`,
//             duration: 3000,
//           });

//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.message || error.message || 'فشل في إضافة المنتج إلى السلة';
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
//           toast.error('فشل في الإضافة', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//       removeFromCart: async (productId: number) => {
//         const token = localStorage.getItem('token');
//         const itemToRemove = get().items.find(item => item.product.id === productId);

//         try {
//           set({ isLoading: true, error: null });

//           // تحديث الحالة المحلية أولاً
//           const updatedItems = get().items.filter((item) => item.product.id !== productId);
//           set({ items: updatedItems, isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               await cartAPI.removeFromCart(productId);
//               console.log('Product removed from server cart');
//             } catch (serverError) {
//               console.error('خطأ في مزامنة الحذف مع الخادم:', serverError);
//               toast.warning('تم الحذف محلياً', {
//                 description: 'سيتم مزامنة التغييرات مع الخادم لاحقاً',
//                 duration: 3000,
//               });
//             }
//           }

//           if (itemToRemove) {
//             toast.success('تم الإزالة من السلة', {
//               description: `تم إزالة ${itemToRemove.product.name} من السلة`,
//               duration: 3000,
//             });
//           }
//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.error || 'فشل في إزالة المنتج من السلة';
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
//           toast.error('فشل في الإزالة', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//       updateQuantity: async (productId: number, quantity: number) => {
//         if (quantity <= 0) {
//           await get().removeFromCart(productId);
//           return;
//         }

//         // التحقق من أن الكمية لا تتجاوز الحد المسموح
//         if (quantity > 99) {
//           toast.error('الحد الأقصى', {
//             description: 'لا يمكن إضافة أكثر من 99 قطعة من المنتج نفسه',
//             duration: 3000,
//           });
//           return;
//         }

//         const token = localStorage.getItem('token');
//         const item = get().items.find(item => item.product.id === productId);

//         // التحقق من أن العنصر موجود
//         if (!item) {
//           toast.error('خطأ', {
//             description: 'المنتج غير موجود في السلة',
//             duration: 3000,
//           });
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });

//           // تحديث الحالة المحلية أولاً
//           const updatedItems = get().items.map((item) =>
//             item.product.id === productId
//               ? { ...item, quantity }
//               : item
//           );
//           set({ items: updatedItems, isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               await cartAPI.updateCartItem(productId, quantity);
//               console.log('Cart quantity updated on server');
//             } catch (serverError) {
//               console.error('خطأ في مزامنة التحديث مع الخادم:', serverError);
//               toast.warning('تم التحديث محلياً', {
//                 description: 'سيتم مزامنة التغييرات مع الخادم لاحقاً',
//                 duration: 3000,
//               });
//             }
//           }

//           toast.success('تم تحديث الكمية', {
//             description: `${item.product.name} - الكمية: ${quantity}`,
//             duration: 2000,
//           });
//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.error || 'فشل في تحديث كمية المنتج';
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
//           toast.error('فشل في التحديث', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//       clearCart: async () => {
//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });

//           // تحديث الحالة المحلية أولاً
//           set({ items: [], isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               await cartAPI.clearCart();
//               console.log('Cart cleared on server');
//             } catch (serverError) {
//               console.error('خطأ في مزامنة الإفراغ مع الخادم:', serverError);
//               toast.warning('تم الإفراغ محلياً', {
//                 description: 'سيتم مزامنة التغييرات مع الخادم لاحقاً',
//                 duration: 3000,
//               });
//             }
//           }

//           toast.success('تم إفراغ السلة بنجاح', {
//             description: 'تمت إزالة جميع المنتجات من السلة',
//             duration: 3000,
//           });
//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.error || 'فشل في إفراغ السلة';
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
//           toast.error('فشل في الإفراغ', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//       // مزامنة السلة مع الخادم
//       syncCartWithServer: async () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.log('No token, skipping server sync');
//           return;
//         }

//         try {
//           set({ isLoading: true });
//           await get().fetchCart();
//           set({ isLoading: false });
//           console.log('Cart synced with server');
//         } catch (error) {
//           console.error('خطأ في مزامنة السلة:', error);
//           set({ isLoading: false });
//         }
//       },

//       // نقل سلة الضيف إلى حساب المستخدم بعد تسجيل الدخول
//       transferGuestCartToUser: async () => {
//         const guestItems = get().items;
//         const token = localStorage.getItem('token');

//         if (!token) {
//           console.log('No token, cannot transfer cart');
//           return;
//         }

//         if (guestItems.length === 0) {
//           console.log('Guest cart is empty, nothing to transfer');
//           return;
//         }

//         try {
//           set({ isLoading: true });
//           console.log('Transferring guest cart to user account...');

//           // إرسال كل منتج في سلة الضيف إلى حساب المستخدم
//           for (const item of guestItems) {
//             try {
//               await cartAPI.addToCart(item.product.id, item.quantity);
//               console.log(`Transferred product: ${item.product.name}`);
//             } catch (error) {
//               console.error(`خطأ في إضافة المنتج ${item.product.name}:`, error);
//             }
//           }

//           // جلب السلة المحدثة من الخادم
//           await get().fetchCart();
          
//           toast.success('تم دمج السلة بنجاح', {
//             description: 'تم نقل جميع منتجاتك إلى حسابك الجديد',
//             duration: 4000,
//           });
//         } catch (error: any) {
//           console.error('خطأ في نقل السلة:', error);
//           toast.error('فشل في نقل السلة', {
//             description: 'سيتم الاحتفاظ بالمنتجات في السلة المحلية',
//             duration: 4000,
//           });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       getTotalItems: () => {
//         const items = get().items;
//         return items.reduce((total, item) => {
//           // التحقق من أن العنصر صالح
//           if (!item || typeof item.quantity !== 'number') {
//             console.warn('Invalid cart item:', item);
//             return total;
//           }
//           return total + item.quantity;
//         }, 0);
//       },

//       getTotalPrice: () => {
//         const items = get().items;
//         return items.reduce((total, item) => {
//           // التحقق من أن العنصر صالح ويحتوي على السعر
//           if (!item || !item.product || typeof item.product.price !== 'string') {
//             console.warn('Invalid cart item for price calculation:', item);
//             return total;
//           }
          
//           const price = parseFloat(item.product.price);
//           const quantity = item.quantity;
          
//           if (isNaN(price) || isNaN(quantity)) {
//             console.warn('Invalid price or quantity:', { price, quantity, item });
//             return total;
//           }
          
//           return total + (price * quantity);
//         }, 0);
//       },
//     }),
//     {
//       name: 'cart-storage',
//       // تخزين السلة محلياً للضيوف
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           // مزامنة السلة مع الخادم عند تحميل التطبيق
//           setTimeout(() => {
//             state.syncCartWithServer();
//           }, 1000);
//         }
//       },
//     }
//   )
// );



// // hooks/useCart.ts
// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import type { Product } from '../api/types/product.types';
// import { cartAPI } from '../api';
// import { toast } from 'sonner';

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartStore {
//   items: CartItem[];
//   isLoading: boolean;
//   error: string | null;
//   addToCart: (product: Product, quantity: number) => Promise<void>;
//   removeFromCart: (productId: number) => Promise<void>;
//   updateQuantity: (productId: number, quantity: number) => Promise<void>;
//   clearCart: () => Promise<void>;
//   fetchCart: () => Promise<void>;
//   getTotalItems: () => number;
//   getTotalPrice: () => number;
//   transferGuestCartToUser: () => Promise<void>;
//   syncCartWithServer: () => Promise<void>;
// }

// export const useCart = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       isLoading: false,
//       error: null,

//       fetchCart: async () => {
//         const token = localStorage.getItem('token');
        
//         if (!token) {
//           console.log('No token found, using local cart');
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });
//           console.log('Fetching cart from server...');
//           const response = await cartAPI.getCart();
//           console.log('Cart API response:', response);
          
//           let cartItems: CartItem[] = [];
          
//           if (Array.isArray(response.data)) {
//             cartItems = response.data.map((item: any) => ({
//               product: item.product || item,
//               quantity: item.quantity || 1
//             }));
//           } else if (response.data && Array.isArray(response.data.items)) {
//             cartItems = response.data.items.map((item: any) => ({
//               product: item.product || item,
//               quantity: item.quantity || 1
//             }));
//           } else if (response.data && response.data.products) {
//             cartItems = response.data.products.map((item: any) => ({
//               product: item.product || item,
//               quantity: item.quantity || 1
//             }));
//           } else if (response.data && typeof response.data === 'object') {
//             cartItems = [{
//               product: response.data.product || response.data,
//               quantity: response.data.quantity || 1
//             }];
//           }
          
//           console.log('Processed cart items:', cartItems);
//           set({ items: cartItems, isLoading: false });
//         } catch (error: any) {
//           console.error('خطأ في جلب السلة:', error);
//           // لا نعرض رسالة خطأ للمستخدم هنا لأن السلة المحلية ستستخدم
//           set({ isLoading: false });
//         }
//       },

//       addToCart: async (product: Product, quantity: number = 1) => {
//         if (!product || !product.id || !product.price) {
//           console.error('Product data is incomplete:', product);
//           toast.error('خطأ في البيانات', {
//             description: 'بيانات المنتج غير مكتملة',
//             duration: 4000,
//           });
//           return;
//         }

//         const currentItems = get().items;
//         const existingItem = currentItems.find(
//           (item) => item.product.id === product.id
//         );

//         const token = localStorage.getItem('token');
//         const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

//         try {
//           set({ isLoading: true, error: null });
          
//           if (!product.in_stock) {
//             throw new Error('المنتج غير متوفر حالياً');
//           }

//           if (newQuantity > 99) {
//             throw new Error('لا يمكن إضافة أكثر من 99 قطعة من المنتج نفسه');
//           }

//           let updatedItems: CartItem[];

//           // تحديث الحالة المحلية أولاً
//           if (existingItem) {
//             updatedItems = currentItems.map((item) =>
//               item.product.id === product.id
//                 ? { ...item, quantity: newQuantity }
//                 : item
//             );
//           } else {
//             updatedItems = [...currentItems, { product, quantity }];
//           }

//           // تحديث الحالة المحلية فوراً
//           set({ items: updatedItems, isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               console.log('Syncing with server...', { productId: product.id, quantity });
//               await cartAPI.addToCart(product.id, quantity);
//               console.log('Product successfully synced with server');
//             } catch (serverError: any) {
//               console.error('خطأ في مزامنة السلة مع الخادم:', serverError);
              
//               // إذا كان الخطأ 404، قد يكون المنتج غير موجود على الخادم
//               if (serverError.response?.status === 404) {
//                 console.log('Product not found on server, adding fresh...');
//                 try {
//                   // نحاول إضافة المنتج كمنتج جديد
//                   await cartAPI.addToCart(product.id, newQuantity);
//                 } catch (retryError) {
//                   console.error('فشل إعادة المحاولة:', retryError);
//                 }
//               }
//             }
//           }

//           toast.success(`تمت الإضافة إلى السلة 🛒`, {
//             description: `${product.name} - الكمية: ${quantity}`,
//             duration: 3000,
//           });

//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.message || error.message || 'فشل في إضافة المنتج إلى السلة';
//           console.error('Error in addToCart:', error);
          
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
          
//           toast.error('فشل في الإضافة', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//   // hooks/useCart.ts (الجزء المعدل فقط)
// // hooks/useCart.ts (الجزء المعدل فقط)
// removeFromCart: async (productId: number) => {
//   const token = localStorage.getItem('token');
//   const currentItems = get().items;
//   const itemToRemove = currentItems.find(item => item.product.id === productId);

//   if (!itemToRemove) {
//     console.log('Product not found in local cart:', productId);
//     return;
//   }

//   // إزالة موافقة التأكيد - حذف مباشر
//   try {
//     set({ isLoading: true, error: null });

//     // 1. أولاً تحديث الحالة المحلية فوراً
//     const updatedItems = currentItems.filter((item) => item.product.id !== productId);
//     set({ items: updatedItems });

//     // 2. ثم المزامنة مع الخادم إذا كان مستخدم مسجل
//     if (token) {
//       try {
//         console.log('Removing from server cart, product_id:', productId);
//         await cartAPI.removeFromCart(productId);
//         console.log('Successfully removed from server');
//       } catch (serverError: any) {
//         console.error('Error removing from server:', serverError);
        
//         // إذا كان الخطأ 404، المنتج غير موجود على الخادم - هذا طبيعي ولا يعتبر خطأ
//         if (serverError.response?.status === 404) {
//           console.log('Product not found on server - already removed or never existed there');
//           // لا داعي لفعل أي شيء، المنتج غير موجود على الخادم وهذا مقبول
//         } else {
//           // لأخطاء أخرى، نعيد تحميل السلة من الخادم للتأكد من المزامنة
//           console.log('Reloading cart from server due to other error...');
//           await get().fetchCart();
//         }
//       }
//     }

//     set({ isLoading: false });
//     toast.success('تم الإزالة من السلة', {
//       description: `تم إزالة ${itemToRemove.product.name} من السلة`,
//       duration: 3000,
//     });

//   } catch (error: any) {
//     console.error('Error in removeFromCart:', error);
//     set({ 
//       error: error?.message || 'فشل في إزالة المنتج',
//       isLoading: false 
//     });
    
//     toast.error('حدث خطأ', {
//       description: 'فشل في إزالة المنتج من السلة',
//       duration: 3000,
//     });
//   }
// },


// // دالة مساعدة للتحقق من وجود المنتج قبل الحذف (اختيارية)
// checkProductExists: (productId: number) => {
//   const items = get().items;
//   return items.some(item => item.product.id === productId);
// },

//       updateQuantity: async (productId: number, quantity: number) => {
//         if (quantity <= 0) {
//           await get().removeFromCart(productId);
//           return;
//         }

//         if (quantity > 99) {
//           toast.error('الحد الأقصى', {
//             description: 'لا يمكن إضافة أكثر من 99 قطعة من المنتج نفسه',
//             duration: 3000,
//           });
//           return;
//         }

//         const token = localStorage.getItem('token');
//         const currentItems = get().items;
//         const item = currentItems.find(item => item.product.id === productId);

//         if (!item) {
//           toast.error('خطأ', {
//             description: 'المنتج غير موجود في السلة',
//             duration: 3000,
//           });
//           return;
//         }

//         try {
//           set({ isLoading: true, error: null });

//           // تحديث الحالة المحلية أولاً
//           const updatedItems = currentItems.map((item) =>
//             item.product.id === productId
//               ? { ...item, quantity }
//               : item
//           );
//           set({ items: updatedItems, isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               console.log('Updating quantity on server:', { productId, quantity });
//               await cartAPI.updateCartItem(productId, quantity);
//               console.log('Quantity successfully updated on server');
//             } catch (serverError: any) {
//               console.error('خطأ في مزامنة التحديث مع الخادم:', serverError);
              
//               // إذا كان الخطأ 404، قد نحتاج لإضافة المنتج أولاً
//               if (serverError.response?.status === 404) {
//                 console.log('Product not found on server, adding it first...');
//                 try {
//                   await cartAPI.addToCart(productId, quantity);
//                 } catch (addError) {
//                   console.error('فشل في إضافة المنتج:', addError);
//                 }
//               }
//             }
//           }

//           toast.success('تم تحديث الكمية', {
//             description: `${item.product.name} - الكمية: ${quantity}`,
//             duration: 2000,
//           });
//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.error || 'فشل في تحديث كمية المنتج';
//           console.error('Error in updateQuantity:', error);
          
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
          
//           toast.error('فشل في التحديث', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//       clearCart: async () => {
//         const token = localStorage.getItem('token');

//         try {
//           set({ isLoading: true, error: null });

//           // تحديث الحالة المحلية أولاً
//           set({ items: [], isLoading: false });

//           // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
//           if (token) {
//             try {
//               await cartAPI.clearCart();
//               console.log('Cart cleared on server');
//             } catch (serverError: any) {
//               console.error('خطأ في مزامنة الإفراغ مع الخادم:', serverError);
//               // نستمر حتى لو فشل الإفراغ على الخادم
//             }
//           }

//           toast.success('تم إفراغ السلة بنجاح', {
//             description: 'تمت إزالة جميع المنتجات من السلة',
//             duration: 3000,
//           });
//         } catch (error: any) {
//           const errorMessage = error?.response?.data?.error || 'فشل في إفراغ السلة';
//           set({ 
//             error: errorMessage,
//             isLoading: false 
//           });
//           toast.error('فشل في الإفراغ', {
//             description: errorMessage,
//             duration: 4000,
//           });
//         }
//       },

//       syncCartWithServer: async () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.log('No token, skipping server sync');
//           return;
//         }

//         try {
//           set({ isLoading: true });
//           await get().fetchCart();
//           set({ isLoading: false });
//           console.log('Cart synced with server');
//         } catch (error) {
//           console.error('خطأ في مزامنة السلة:', error);
//           set({ isLoading: false });
//         }
//       },

//       transferGuestCartToUser: async () => {
//         const guestItems = get().items;
//         const token = localStorage.getItem('token');

//         if (!token) {
//           console.log('No token, cannot transfer cart');
//           return;
//         }

//         if (guestItems.length === 0) {
//           console.log('Guest cart is empty, nothing to transfer');
//           return;
//         }

//         try {
//           set({ isLoading: true });
//           console.log('Transferring guest cart to user account...');

//           // إرسال كل منتج في سلة الضيف إلى حساب المستخدم
//           for (const item of guestItems) {
//             try {
//               await cartAPI.addToCart(item.product.id, item.quantity);
//               console.log(`Transferred product: ${item.product.name}`);
//             } catch (error) {
//               console.error(`خطأ في إضافة المنتج ${item.product.name}:`, error);
//             }
//           }

//           // جلب السلة المحدثة من الخادم
//           await get().fetchCart();
          
//           toast.success('تم دمج السلة بنجاح', {
//             description: 'تم نقل جميع منتجاتك إلى حسابك الجديد',
//             duration: 4000,
//           });
//         } catch (error: any) {
//           console.error('خطأ في نقل السلة:', error);
//           toast.error('فشل في نقل السلة', {
//             description: 'سيتم الاحتفاظ بالمنتجات في السلة المحلية',
//             duration: 4000,
//           });
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       getTotalItems: () => {
//         const items = get().items;
//         return items.reduce((total, item) => {
//           if (!item || typeof item.quantity !== 'number') {
//             return total;
//           }
//           return total + item.quantity;
//         }, 0);
//       },

//       getTotalPrice: () => {
//         const items = get().items;
//         return items.reduce((total, item) => {
//           if (!item || !item.product || typeof item.product.price !== 'string') {
//             return total;
//           }
          
//           const price = parseFloat(item.product.price);
//           const quantity = item.quantity;
          
//           if (isNaN(price) || isNaN(quantity)) {
//             return total;
//           }
          
//           return total + (price * quantity);
//         }, 0);
//       },
//     }),
//     {
//       name: 'cart-storage',
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           setTimeout(() => {
//             state.syncCartWithServer();
//           }, 1000);
//         }
//       },
//     }
//   )
// );




// hooks/useCart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../api/types/product.types';
import { cartAPI } from '../api';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (product: Product, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  transferGuestCartToUser: () => Promise<void>;
  syncCartWithServer: () => Promise<void>;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      fetchCart: async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.log('No token found, using local cart');
          return;
        }

        try {
          set({ isLoading: true, error: null });
          console.log('Fetching cart from server...');
          const response = await cartAPI.getCart();
          console.log('Cart API response:', response);
          
          // السيرفر يرجع مصفوفة مباشرة من المنتجات
          if (Array.isArray(response.data)) {
            const cartItems: CartItem[] = response.data.map((item: any) => ({
              product: {
                id: item.product_id || item.id,
                name: item.name,
                name_ar: item.name_ar,
                brand: item.brand,
                price: item.price.toString(),
                image_url: item.image_url,
                emoji_icon: item.emoji_icon,
                in_stock: item.in_stock,
                description: item.description || '',
                description_ar: item.description_ar || '',
                rating: item.rating || '0',
                reviews_count: item.reviews_count || 0,
                category_name: item.category_name || '',
                badge: item.badge || '',
                discount: item.discount || 0,
                original_price: item.original_price || item.price.toString(),
                created_at: item.created_at || new Date().toISOString()
              },
              quantity: item.quantity || 1
            }));
            
            console.log('Processed cart items:', cartItems);
            set({ items: cartItems, isLoading: false });
          } else {
            console.error('Unexpected response format:', response.data);
            set({ isLoading: false });
          }
        } catch (error: any) {
          console.error('خطأ في جلب السلة:', error);
          set({ 
            error: error?.response?.data?.error || 'فشل في جلب محتويات السلة',
            isLoading: false 
          });
        }
      },

      addToCart: async (product: Product, quantity: number = 1) => {
        if (!product || !product.id || !product.price) {
          console.error('Product data is incomplete:', product);
          toast.error('خطأ في البيانات', {
            description: 'بيانات المنتج غير مكتملة',
            duration: 4000,
          });
          return;
        }

        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id
        );

        const token = localStorage.getItem('token');
        const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

        try {
          set({ isLoading: true, error: null });
          
          if (!product.in_stock) {
            throw new Error('المنتج غير متوفر حالياً');
          }

          if (newQuantity > 99) {
            throw new Error('لا يمكن إضافة أكثر من 99 قطعة من المنتج نفسه');
          }

          let updatedItems: CartItem[];

          // تحديث الحالة المحلية أولاً
          if (existingItem) {
            updatedItems = currentItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            );
          } else {
            updatedItems = [...currentItems, { product, quantity }];
          }

          // تحديث الحالة المحلية فوراً
          set({ items: updatedItems, isLoading: false });

          // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
          if (token) {
            try {
              console.log('Syncing with server...', { productId: product.id, quantity });
              await cartAPI.addToCart(product.id, quantity);
              console.log('Product successfully synced with server');
            } catch (serverError: any) {
              console.error('خطأ في مزامنة السلة مع الخادم:', serverError);
              
              // إذا كان الخطأ 404، قد يكون المنتج غير موجود على الخادم
              if (serverError.response?.status === 404) {
                console.log('Product not found on server, adding fresh...');
                try {
                  // نحاول إضافة المنتج كمنتج جديد
                  await cartAPI.addToCart(product.id, newQuantity);
                } catch (retryError) {
                  console.error('فشل إعادة المحاولة:', retryError);
                }
              }
            }
          }

          toast.success(`تمت الإضافة إلى السلة 🛒`, {
            description: `${product.name} - الكمية: ${quantity}`,
            duration: 3000,
          });

        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || error.message || 'فشل في إضافة المنتج إلى السلة';
          console.error('Error in addToCart:', error);
          
          set({ 
            error: errorMessage,
            isLoading: false 
          });
          
          toast.error('فشل في الإضافة', {
            description: errorMessage,
            duration: 4000,
          });
        }
      },

      removeFromCart: async (productId: number) => {
        const token = localStorage.getItem('token');
        const currentItems = get().items;
        const itemToRemove = currentItems.find(item => item.product.id === productId);

        if (!itemToRemove) {
          console.log('Product not found in local cart:', productId);
          return;
        }

        try {
          set({ isLoading: true, error: null });

          // 1. أولاً تحديث الحالة المحلية
          const updatedItems = currentItems.filter((item) => item.product.id !== productId);
          set({ items: updatedItems });

          // 2. ثم المزامنة مع الخادم إذا كان مستخدم مسجل
          if (token) {
            try {
              console.log('Removing from server cart, product_id:', productId);
              const response = await cartAPI.removeFromCart(productId);
              console.log('Server response:', response.data);
              console.log('Successfully removed from server');
            } catch (serverError: any) {
              console.error('Error removing from server:', serverError);
              
              // إذا كان الخطأ 404، قد يكون المنتج غير موجود على الخادم
              if (serverError.response?.status === 404) {
                console.log('Product not found on server - may have been already removed');
                // هذا مقبول - نستمر لأن الحالة المحلية محدثة
              } else {
                // لأخطاء أخرى، نعيد تحميل السلة من الخادم للتأكد من المزامنة
                console.log('Reloading cart from server due to error...');
                await get().fetchCart();
              }
            }
          }

          set({ isLoading: false });
          toast.success('تم الإزالة من السلة', {
            description: `تم إزالة ${itemToRemove.product.name} من السلة`,
            duration: 3000,
          });

        } catch (error: any) {
          console.error('Error in removeFromCart:', error);
          set({ 
            error: error?.message || 'فشل في إزالة المنتج',
            isLoading: false 
          });
          
          toast.error('حدث خطأ', {
            description: 'فشل في إزالة المنتج من السلة',
            duration: 3000,
          });
        }
      },

      updateQuantity: async (productId: number, quantity: number) => {
        if (quantity <= 0) {
          await get().removeFromCart(productId);
          return;
        }

        if (quantity > 99) {
          toast.error('الحد الأقصى', {
            description: 'لا يمكن إضافة أكثر من 99 قطعة من المنتج نفسه',
            duration: 3000,
          });
          return;
        }

        const token = localStorage.getItem('token');
        const currentItems = get().items;
        const item = currentItems.find(item => item.product.id === productId);

        if (!item) {
          toast.error('خطأ', {
            description: 'المنتج غير موجود في السلة',
            duration: 3000,
          });
          return;
        }

        try {
          set({ isLoading: true, error: null });

          // تحديث الحالة المحلية أولاً
          const updatedItems = currentItems.map((item) =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          );
          set({ items: updatedItems, isLoading: false });

          // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
          if (token) {
            try {
              console.log('Updating quantity on server:', { productId, quantity });
              await cartAPI.updateCartItem(productId, quantity);
              console.log('Quantity successfully updated on server');
            } catch (serverError: any) {
              console.error('خطأ في مزامنة التحديث مع الخادم:', serverError);
              
              // إذا كان الخطأ 404، قد نحتاج لإضافة المنتج أولاً
              if (serverError.response?.status === 404) {
                console.log('Product not found on server, adding it first...');
                try {
                  await cartAPI.addToCart(productId, quantity);
                } catch (addError) {
                  console.error('فشل في إضافة المنتج:', addError);
                }
              }
            }
          }

          toast.success('تم تحديث الكمية', {
            description: `${item.product.name} - الكمية: ${quantity}`,
            duration: 2000,
          });
        } catch (error: any) {
          const errorMessage = error?.response?.data?.error || 'فشل في تحديث كمية المنتج';
          console.error('Error in updateQuantity:', error);
          
          set({ 
            error: errorMessage,
            isLoading: false 
          });
          
          toast.error('فشل في التحديث', {
            description: errorMessage,
            duration: 4000,
          });
        }
      },

      clearCart: async () => {
        const token = localStorage.getItem('token');

        try {
          set({ isLoading: true, error: null });

          // تحديث الحالة المحلية أولاً
          set({ items: [], isLoading: false });

          // إذا كان المستخدم مسجل الدخول، قم بالمزامنة مع الخادم
          if (token) {
            try {
              await cartAPI.clearCart();
              console.log('Cart cleared on server');
            } catch (serverError: any) {
              console.error('خطأ في مزامنة الإفراغ مع الخادم:', serverError);
              // نستمر حتى لو فشل الإفراغ على الخادم
            }
          }

          toast.success('تم إفراغ السلة بنجاح', {
            description: 'تمت إزالة جميع المنتجات من السلة',
            duration: 3000,
          });
        } catch (error: any) {
          const errorMessage = error?.response?.data?.error || 'فشل في إفراغ السلة';
          set({ 
            error: errorMessage,
            isLoading: false 
          });
          toast.error('فشل في الإفراغ', {
            description: errorMessage,
            duration: 4000,
          });
        }
      },

      syncCartWithServer: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token, skipping server sync');
          return;
        }

        try {
          set({ isLoading: true });
          await get().fetchCart();
          set({ isLoading: false });
          console.log('Cart synced with server');
        } catch (error) {
          console.error('خطأ في مزامنة السلة:', error);
          set({ isLoading: false });
        }
      },

      transferGuestCartToUser: async () => {
        const guestItems = get().items;
        const token = localStorage.getItem('token');

        if (!token) {
          console.log('No token, cannot transfer cart');
          return;
        }

        if (guestItems.length === 0) {
          console.log('Guest cart is empty, nothing to transfer');
          return;
        }

        try {
          set({ isLoading: true });
          console.log('Transferring guest cart to user account...');

          // إرسال كل منتج في سلة الضيف إلى حساب المستخدم
          for (const item of guestItems) {
            try {
              await cartAPI.addToCart(item.product.id, item.quantity);
              console.log(`Transferred product: ${item.product.name}`);
            } catch (error) {
              console.error(`خطأ في إضافة المنتج ${item.product.name}:`, error);
            }
          }

          // جلب السلة المحدثة من الخادم
          await get().fetchCart();
          
          toast.success('تم دمج السلة بنجاح', {
            description: 'تم نقل جميع منتجاتك إلى حسابك الجديد',
            duration: 4000,
          });
        } catch (error: any) {
          console.error('خطأ في نقل السلة:', error);
          toast.error('فشل في نقل السلة', {
            description: 'سيتم الاحتفاظ بالمنتجات في السلة المحلية',
            duration: 4000,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          if (!item || typeof item.quantity !== 'number') {
            return total;
          }
          return total + item.quantity;
        }, 0);
      },

      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          if (!item || !item.product || typeof item.product.price !== 'string') {
            return total;
          }
          
          const price = parseFloat(item.product.price);
          const quantity = item.quantity;
          
          if (isNaN(price) || isNaN(quantity)) {
            return total;
          }
          
          return total + (price * quantity);
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(() => {
            state.syncCartWithServer();
          }, 1000);
        }
      },
    }
  )
);
