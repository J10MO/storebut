// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useCart } from '../hooks/useCart';
// import { useAuth } from '../hooks/useAuth';

// const Cart: React.FC = () => {
//   const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleCheckout = () => {
//     if (isAuthenticated) {
//       navigate('/checkout');
//     } else {
//       navigate('/login');
//     }
//   };

//   const handleQuantityChange = (productId: number, newQuantity: number) => {
//     if (newQuantity < 1) {
//       removeFromCart(productId);
//     } else {
//       updateQuantity(productId, newQuantity);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
//         <div className="bg-white rounded-lg shadow-md p-12 text-center">
//           <div className="text-6xl mb-4">🛒</div>
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
//           <p className="text-gray-500 mb-6">Add some products to your cart to see them here.</p>
//           <Link 
//             to="/products" 
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
//         <button
//           onClick={clearCart}
//           className="text-red-600 hover:text-red-700 font-medium"
//         >
//           Clear Cart
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {cartItems.map((item) => (
//           <div key={item.product_id || item.id} className="border-b border-gray-200 last:border-b-0">
//             <div className="p-6 flex items-center">
//               {/* Product Image */}
//               <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
//                 {item.product?.image_url ? (
//                   <img 
//                     src={item.product.image_url} 
//                     alt={item.product.name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 ) : (
//                   <span className="text-2xl">{item.product?.emoji_icon || '📦'}</span>
//                 )}
//               </div>

//               {/* Product Info */}
//               <div className="flex-1">
//                 <h3 className="font-semibold text-gray-900">{item.product?.name || 'Product'}</h3>
//                 <p className="text-gray-600 text-sm">${item.product?.price || item.price}</p>
//               </div>

//               {/* Quantity Controls */}
//               <div className="flex items-center space-x-3">
//                 <button
//                   onClick={() => handleQuantityChange(item.product_id || item.id, item.quantity - 1)}
//                   className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <span className="font-medium w-8 text-center">{item.quantity}</span>
//                 <button
//                   onClick={() => handleQuantityChange(item.product_id || item.id, item.quantity + 1)}
//                   className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Total Price */}
//               <div className="ml-6 text-right">
//                 <p className="font-semibold text-gray-900">
//                   ${((item.product?.price || item.price) * item.quantity).toFixed(2)}
//                 </p>
//                 <button
//                   onClick={() => removeFromCart(item.product_id || item.id)}
//                   className="text-red-600 hover:text-red-700 text-sm mt-1"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Cart Summary */}
//         <div className="p-6 bg-gray-50">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-lg font-semibold">Total:</span>
//             <span className="text-2xl font-bold text-green-600">${getTotalPrice().toFixed(2)}</span>
//           </div>
          
//           <div className="flex space-x-4">
//             <Link 
//               to="/products" 
//               className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg text-center hover:bg-gray-300 transition-colors"
//             >
//               Continue Shopping
//             </Link>
//             <button
//               onClick={handleCheckout}
//               className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
//             >
//               {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
//             </button>
//           </div>

//           {!isAuthenticated && (
//             <p className="text-sm text-gray-600 mt-3 text-center">
//               You'll need to login or create an account to complete your purchase
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;








// // pages/CartPage.tsx
// import React from 'react';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../components/ui/card';
// import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
// import { toast } from 'sonner';

// const CartPage: React.FC = () => {
//   const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();

//   const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
//     try {
//       await updateQuantity(productId, newQuantity);
//       toast.success('Cart updated');
//     } catch (error) {
//       toast.error('Failed to update cart');
//     }
//   };

//     const handleRemoveItem = async (productId: number, productName: string) => {
//     try {
//       await removeFromCart(productId);
//       toast.success(`${productName} removed from cart`);
//     } catch (error) {
//       toast.error('Failed to remove item');
//     }
//   };

//   const handleClearCart = async () => {
//     if (window.confirm('Are you sure you want to clear your cart?')) {
//       try {
//         await clearCart();
//         toast.success('Cart cleared');
//       } catch (error) {
//         toast.error('Failed to clear cart');
//       }
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16">
//         <div className="max-w-md mx-auto text-center">
//           <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
//           <p className="text-gray-600 mb-6">Add some products to get started!</p>
//           <Button onClick={() => window.location.href = '/products'}>
//             Continue Shopping
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8 flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
//           <p className="text-gray-600">{getTotalItems()} items in your cart</p>
//         </div>
//         <Button 
//           variant="outline" 
//           onClick={handleClearCart}
//           className="text-red-600 hover:text-red-700 hover:bg-red-50"
//         >
//           <Trash2 className="w-4 h-4 mr-2" />
//           Clear Cart
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {items.map((item) => (
//             <Card key={item.product.id}>
//               <CardContent className="p-4">
//                 <div className="flex gap-4">
//                   {/* Product Image */}
//                   <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                     {item.product.image_url ? (
//                       <img
//                         src={item.product.image_url}
//                         alt={item.product.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         {item.product.emoji_icon ? (
//                           <span className="text-3xl">{item.product.emoji_icon}</span>
//                         ) : (
//                           <ShoppingBag className="w-8 h-8 text-gray-400" />
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
//                         <p className="text-sm text-gray-600">{item.product.name_ar}</p>
//                         <p className="text-xs text-gray-500 mt-1">Brand: {item.product.brand}</p>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                                               onClick={() => handleRemoveItem(item.product.id, item.product.name)}
//                         className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-2">
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                         >
//                           <Minus className="w-3 h-3" />
//                         </Button>
//                         <span className="w-12 text-center font-medium">{item.quantity}</span>
//                         <Button
//                           variant="outline"
//                           size="icon"
//                           className="h-8 w-8"
//                           onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
//                           disabled={item.quantity >= 99}
//                         >
//                           <Plus className="w-3 h-3" />
//                         </Button>
//                       </div>

//                       {/* Price */}
//                       <div className="text-right">
//                         <p className="text-lg font-bold text-green-600">
//                           ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           ${item.product.price} each
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="lg:col-span-1">
//           <Card className="sticky top-4">
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//               <CardDescription>Review your order details</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-medium text-green-600">
//                     {getTotalPrice() >= 50 ? 'FREE' : '$5.99'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-600">Tax (estimate)</span>
//                   <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
//                 </div>
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-semibold">Total</span>
//                   <span className="text-2xl font-bold text-green-600">
//                     ${(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 5.99) + getTotalPrice() * 0.1).toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               {getTotalPrice() < 50 && (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                   <p className="text-xs text-blue-800">
//                     Add ${(50 - getTotalPrice()).toFixed(2)} more to get free shipping!
//                   </p>
//                                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="flex flex-col gap-2">
//               <Button className="w-full" size="lg">
//                 Proceed to Checkout
//               </Button>
//               <Button 
//                 variant="outline" 
//                 className="w-full"
//                 onClick={() => window.location.href = '/products'}
//               >
//                 Continue Shopping
//               </Button>
//             </CardFooter>
//           </Card>

//           {/* Additional Info */}
//           {/* <Card className="mt-4">
//             <CardContent className="p-4 space-y-3">
//               <div className="flex items-start gap-3">
//                 <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium">Free Shipping</p>
//                   <p className="text-xs text-gray-600">On orders over $50</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium">Secure Checkout</p>
//                   <p className="text-xs text-gray-600">Your data is protected</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <RotateCcw className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-sm font-medium">Easy Returns</p>
//                   <p className="text-xs text-gray-600">30-day return policy</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;









// // pages/CartPage.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../hooks/useCart';
// import { useAuth } from '../hooks/useAuth';
// import { Button } from '../components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../components/ui/card';
// import { Separator } from '../components/ui/separator';
// import { 
//   Minus, 
//   Plus, 
//   Trash2, 
//   ShoppingBag, 
//   Truck,
//   Shield,
//   RotateCcw,
//   Loader2 
// } from 'lucide-react';
// import { toast } from 'sonner';

// const CartPage: React.FC = () => {
//   const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();

//   const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
//     try {
//       await updateQuantity(productId, newQuantity);
//     } catch (error) {
//       // الخطأ يتم معالجته في الـ hook
//     }
//   };

//   const handleRemoveItem = async (productId: number, productName: string) => {
//     if (window.confirm(`هل تريد حذف ${productName} من السلة؟`)) {
//       try {
//         await removeFromCart(productId);
//       } catch (error) {
//         // الخطأ يتم معالجته في الـ hook
//       }
//     }
//   };

//   const handleClearCart = async () => {
//     if (window.confirm('هل تريد إفراغ السلة بالكامل؟')) {
//       try {
//         await clearCart();
//       } catch (error) {
//         // الخطأ يتم معالجته في الـ hook
//       }
//     }
//   };

//   const handleCheckout = () => {
//     if (isAuthenticated) {
//       navigate('/checkout');
//     } else {
//       // حفظ الوجهة للعودة بعد تسجيل الدخول
//       navigate('/login', { state: { from: '/checkout' } });
//     }
//   };

//   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000;
//   const totalWithShipping = getTotalPrice() + shippingCost;

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16" dir="rtl">
//         <div className="max-w-md mx-auto text-center">
//           <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <ShoppingBag className="w-12 h-12 text-gray-400" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">سلتك فارغة</h2>
//           <p className="text-gray-600 mb-6">ابدأ بإضافة بعض المنتجات!</p>
//           <Button onClick={() => navigate('/products')} size="lg">
//             تصفح المنتجات
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
//       <div className="container mx-auto px-4">
//         <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">سلة التسوق</h1>
//                         <p className="text-gray-600">{getTotalItems()} منتج في سلتك</p>
//           </div>
//           <Button 
//             variant="outline" 
//             onClick={handleClearCart}
//             className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
//           >
//             <Trash2 className="w-4 h-4 ml-2" />
//             إفراغ السلة
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* قائمة المنتجات */}
//           <div className="lg:col-span-2 space-y-4">
//             {items.map((item) => (
//               <Card key={item.product.id}>
//                 <CardContent className="p-4">
//                   <div className="flex gap-4">
//                     {/* صورة المنتج */}
//                     <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
//                       {item.product.image_url ? (
//                         <img
//                           src={item.product.image_url}
//                           alt={item.product.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           {item.product.emoji_icon ? (
//                             <span className="text-3xl">{item.product.emoji_icon}</span>
//                           ) : (
//                             <ShoppingBag className="w-8 h-8 text-gray-400" />
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {/* تفاصيل المنتج */}
//                     <div className="flex-1">
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
//                           <p className="text-sm text-gray-600">{item.product.name_ar}</p>
//                           <p className="text-xs text-gray-500 mt-1">الماركة: {item.product.brand}</p>
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleRemoveItem(item.product.id, item.product.name)}
//                           className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>

//                       <div className="flex items-center justify-between mt-4">
//                         {/* التحكم بالكمية */}
//                         <div className="flex items-center gap-2">
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
//                             disabled={item.quantity <= 1}
//                           >
//                             <Minus className="w-3 h-3" />
//                           </Button>
//                           <span className="w-12 text-center font-medium">{item.quantity}</span>
//                           <Button
//                             variant="outline"
//                             size="icon"
//                             className="h-8 w-8"
//                             onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
//                             disabled={item.quantity >= 99}
//                           >
//                             <Plus className="w-3 h-3" />
//                           </Button>
//                         </div>

//                         {/* السعر */}
//                         <div className="text-left">
//                           <p className="text-lg font-bold text-green-600">
//                             {(parseFloat(item.product.price) * item.quantity).toLocaleString()} د.ع
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {parseFloat(item.product.price).toLocaleString()} د.ع للواحد
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* ملخص الطلب */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>ملخص الطلب</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">المجموع الفرعي</span>
//                     <span className="font-medium">{getTotalPrice().toLocaleString()} د.ع</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">التوصيل</span>
//                     <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
//                       {shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} د.ع`}
//                     </span>
//                   </div>
//                 </div>

//                 {getTotalPrice() < 50000 && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                     <p className="text-xs text-blue-800">
//                       أضف {(50000 - getTotalPrice()).toLocaleString()} د.ع للحصول على توصيل مجاني! 🚚
//                     </p>
//                   </div>
//                 )}

//                 <Separator />

//                 <div className="flex justify-between items-center pt-2">
//                   <span className="text-lg font-semibold">المجموع الكلي</span>
//                   <span className="text-2xl font-bold text-green-600">
//                     {totalWithShipping.toLocaleString()} د.ع
//                   </span>
//                 </div>
//               </CardContent>
              
//               <CardFooter className="flex flex-col gap-3">
//                 <Button 
//                   className="w-full" 
//                   size="lg"
//                   onClick={handleCheckout}
//                 >
//                   {isAuthenticated ? 'إتمام الشراء' : 'تسجيل الدخول للمتابعة'}
//                 </Button>

//                 <Button 
//                   variant="outline" 
//                   className="w-full"
//                   onClick={() => navigate('/products')}
//                 >
//                   متابعة التسوق
//                 </Button>

//                 {/* مميزات الخدمة */}
//                 <div className="mt-4 space-y-3 pt-4 border-t">
//                   <div className="flex items-center gap-3 text-sm text-gray-600">
//                     <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
//                       <Truck className="w-4 h-4 text-green-600" />
//                     </div>
//                     <span>توصيل سريع لجميع المحافظات</span>
//                   </div>

//                   <div className="flex items-center gap-3 text-sm text-gray-600">
//                     <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
//                                               <Shield className="w-4 h-4 text-blue-600" />
//                     </div>
//                     <span>ضمان أصالة المنتجات 100%</span>
//                   </div>

//                   <div className="flex items-center gap-3 text-sm text-gray-600">
//                     <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
//                       <RotateCcw className="w-4 h-4 text-orange-600" />
//                     </div>
//                     <span>إمكانية الإرجاع خلال 7 أيام</span>
//                   </div>
//                 </div>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


// pages/CartPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Truck,
  Shield,
  RotateCcw,
  Loader2,
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      toast.error('فشل في تحديث الكمية');
    }
  };

  const handleRemoveItem = async (productId: number, productName: string) => {
    if (window.confirm(`هل تريد حذف ${productName} من السلة؟`)) {
      try {
        await removeFromCart(productId);
        toast.success('تم الحذف من السلة');
      } catch (error) {
        toast.error('فشل في حذف المنتج');
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('هل تريد إفراغ السلة بالكامل؟')) {
      try {
        await clearCart();
        toast.success('تم إفراغ السلة');
      } catch (error) {
        toast.error('فشل في إفراغ السلة');
      }
    }
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/checkout' } });
    }
  };

  const handleImageError = (productId: number) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  // دالة لإنشاء رابط صورة كامل
  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `https://markt-x51r.onrender.com/api${imageUrl}`;
    }
    
    return `https://markt-x51r.onrender.com/api/uploads/products/${imageUrl}`;
  };

  const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000;
  const totalWithShipping = getTotalPrice() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 " dir="rtl" >
        <div className="max-w-md w-full text-center">
          <div className="w-32 h-32 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-16 h-16 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">سلتك فارغة</h2>
          <p className="text-gray-600 mb-8 text-lg">ابدأ بإضافة بعض المنتجات الرائعة!</p>
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/products')} 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              تصفح المنتجات
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 mb-15" dir="rtl">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-l from-blue-600 to-purple-600 bg-clip-text text-transparent">
              سلة التسوق
            </h1>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-blue-600">{getTotalItems()}</span> منتج في سلتك
            </p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="flex-1 sm:flex-none border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              متابعة التسوق
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearCart}
              className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              إفراغ السلة
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قائمة المنتجات */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                منتجاتك المختارة
              </h2>
              <div className="space-y-6">
                {items.map((item) => {
                  const fullImageUrl = getFullImageUrl(item.product.image_url);
                  const hasImageError = imageErrors[item.product.id];

                  return (
                    <div key={item.product.id} className="   bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300">
                      {/* صورة المنتج */}
                      <div className=' block'>
                      <div className='flex w-full justify-between  '> 
                      <div className="w-28 h-28 m-3 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        {fullImageUrl && !hasImageError ? (
                          <img
                            src={fullImageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={() => handleImageError(item.product.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-2">
                            {item.product.emoji_icon ? (
                              <span className="text-2xl mb-1">{item.product.emoji_icon}</span>
                            ) : (
                              <ImageIcon className="w-8 h-8 text-gray-400 mb-1" />
                            )}
                            <span className="text-xs text-gray-500 text-center">لا توجد صورة</span>
                          </div>
                        )}
                      </div>

                      {/* تفاصيل المنتج */}
                      {/* <div className="flex-2 flex bg-amber-300 flex-col"> */}
                        
                        <div className="flex w-full items-center  mb-3 ">
                          <div className="">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{item.product.name}</h3>
                            <p className="text-gray-600 text-sm mb-2">{item.product.name_ar}</p>
                            {item.product.brand && (
                              <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                                {item.product.brand}
                              </p>
                            )}
                          </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                          </div>
                        
<div></div>
                        <div className="flex items-center  w-full   justify-between mt-auto p-3">
                          {/* التحكم بالكمية */}
                          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-300 p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-bold text-gray-900 text-lg">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-lg hover:bg-green-50 hover:text-green-600"
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= 99}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* السعر */}
                          <div className="text-left">
                            <p className="text-xl font-bold text-green-600">
                              {(parseFloat(item.product.price) * item.quantity).toLocaleString()} د.ع
                            </p>
                            <p className="text-sm text-gray-500">
                              {parseFloat(item.product.price).toLocaleString()} د.ع للواحد
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-l from-blue-600 to-purple-600 text-white pb-4">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" />
                  ملخص الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* التكاليف */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-bold text-gray-900">{getTotalPrice().toLocaleString()} د.ع</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600">التوصيل</span>
                    <span className={`font-bold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {shippingCost === 0 ? 'مجاني 🎉' : `${shippingCost.toLocaleString()} د.ع`}
                    </span>
                  </div>
                </div>

                {/* رسالة التوصيل المجاني */}
                {getTotalPrice() < 50000 && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm font-semibold text-blue-800">
                          أنت قريب من التوصيل المجاني!
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          أضف {(50000 - getTotalPrice()).toLocaleString()} د.ع للحصول على توصيل مجاني
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="my-2" />

                {/* المجموع الكلي */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-gray-900">المجموع الكلي</span>
                  <span className="text-2xl font-bold text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    {totalWithShipping.toLocaleString()} د.ع
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 flex flex-col gap-4">
                <Button 
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-l from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 text-white shadow-lg" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  {isAuthenticated ? '🛒 إتمام الشراء' : '🔐 تسجيل الدخول للمتابعة'}
                </Button>

                {/* مميزات الخدمة */}
                <div className="mt-4 space-y-4 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 text-center mb-2">مميزات الشراء</h4>
                  
                  <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">توصيل سريع</p>
                      <p className="text-xs text-gray-600">لجميع المحافظات خلال 2-3 أيام</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">ضمان الجودة</p>
                      <p className="text-xs text-gray-600">أصالة المنتجات مضمونة 100%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">إرجاع سهل</p>
                      <p className="text-xs text-gray-600">إمكانية الإرجاع خلال 7 أيام</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;