// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/usecart';
// import Login from './Login';

// const Checkout: React.FC = () => {
//   const { isAuthenticated } = useAuth();
//   const { cartItems, getTotalPrice } = useCart();

//   // Redirect if cart is empty
//   if (cartItems.length === 0) {
//     return <Navigate to="/cart" />;
//   }

//   // Show login if not authenticated
//   if (!isAuthenticated) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-md mx-auto text-center">
//           <h2 className="text-2xl font-bold mb-4">Login Required</h2>
//           <p className="text-gray-600 mb-6">
//             Please login or create an account to complete your order
//           </p>
//           <Login showCloseButton={false} />
//         </div>
//       </div>
//     );
//   }

//   // Show checkout form for authenticated users
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>
//       <div className="max-w-2xl mx-auto">
//         {/* Checkout form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//           {/* Order items and form */}
//           <div className="border-t pt-4">
//             <div className="flex justify-between text-xl font-bold">
//               <span>Total:</span>
//               <span>${getTotalPrice().toFixed(2)}</span>
//             </div>
//             <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700">
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




// // pages/Checkout.tsx
// import React, { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Textarea } from '../components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
// import { Separator } from '../components/ui/separator';
// import { 
//   ShoppingBag, 
//   MapPin, 
//   Phone, 
//   User, 
//   CreditCard,
//   Truck,
//   Loader2 
// } from 'lucide-react';
// import { toast } from 'sonner';

// const Checkout: React.FC = () => {
//   const { isAuthenticated, user } = useAuth();
//   const { items, getTotalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     address: '',
//     city: '',
//     phone: user?.phone || '',
//     notes: '',
//     paymentMethod: 'cash', // cash أو online
//   });

//   // إعادة التوجيه إذا كانت السلة فارغة
//   if (items.length === 0) {
//     return <Navigate to="/cart" />;
//   }

//   // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: '/checkout' }} />;
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitOrder = async () => {
//     // التحقق من البيانات
//     if (!formData.address.trim()) {
//       toast.error('الرجاء إدخال العنوان');
//       return;
//     }

//     if (!formData.city.trim()) {
//       toast.error('الرجاء إدخال المدينة');
//       return;
//     }

//     if (!formData.phone.trim()) {
//       toast.error('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     setLoading(true);

//     try {
//       // إرسال الطلب إلى الخادم
//       const orderData = {
//         items: items.map(item => ({
//           product_id: item.product.id,
//           quantity: item.quantity,
//           price: item.product.price,
//         })),
//         shipping_address: formData.address,
//         city: formData.city,
//         phone: formData.phone,
//         notes: formData.notes,
//         payment_method: formData.paymentMethod,
//         total_amount: getTotalPrice(),
//       };

//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         // إفراغ السلة بعد نجاح الطلب
//         await clearCart();
        
//         toast.success('تم إرسال طلبك بنجاح!', {
//           description: 'سيتم التواصل معك قريباً لتأكيد الطلب',
//         });

//         // الانتقال إلى صفحة تأكيد الطلب
//         // navigate(`/order-success/${result.order.id}`);
//       } else {
//         toast.error(result.error || 'فشل في إرسال الطلب');
//       }
//     } catch (error) {
//       console.error('خطأ في إرسال الطلب:', error);
//       toast.error('حدث خطأ أثناء إرسال الطلب');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000; // شحن مجاني فوق 50 ألف
//   const totalWithShipping = getTotalPrice() + shippingCost;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
//       <div className="container mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
//                     <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* نموذج بيانات التوصيل */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* معلومات المستخدم */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   معلومات الشخصية
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     الاسم
//                   </label>
//                   <Input
//                     type="text"
//                     value={user?.name || ''}
//                     disabled
//                     className="bg-gray-50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     رقم الهاتف
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="07XX XXX XXXX"
//                       className="pr-10"
//                       dir="ltr"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* عنوان التوصيل */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   عنوان التوصيل
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     المدينة
//                   </label>
//                   <Input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     placeholder="بغداد، البصرة، أربيل..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     العنوان التفصيلي
//                   </label>
//                   <Textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     placeholder="المنطقة، الحي، الشارع، رقم البناية..."
//                     rows={3}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     ملاحظات إضافية (اختياري)
//                   </label>
//                   <Textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
//                     rows={2}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* طريقة الدفع */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CreditCard className="w-5 h-5" />
//                   طريقة الدفع
//                                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div
//                   onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.paymentMethod === 'cash'
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           formData.paymentMethod === 'cash'
//                             ? 'border-blue-600'
//                             : 'border-gray-300'
//                         }`}
//                       >
//                         {formData.paymentMethod === 'cash' && (
//                           <div className="w-3 h-3 rounded-full bg-blue-600" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium">الدفع عند الاستلام</p>
//                         <p className="text-sm text-gray-600">ادفع نقداً عند استلام الطلب</p>
//                       </div>
//                     </div>
//                     <Truck className="w-6 h-6 text-gray-400" />
//                   </div>
//                 </div>

//                 <div
//                   onClick={() => setFormData({ ...formData, paymentMethod: 'online' })}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.paymentMethod === 'online'
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           formData.paymentMethod === 'online'
//                             ? 'border-blue-600'
//                             : 'border-gray-300'
//                         }`}
//                       >
//                         {formData.paymentMethod === 'online' && (
//                           <div className="w-3 h-3 rounded-full bg-blue-600" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium">الدفع الإلكتروني</p>
//                         <p className="text-sm text-gray-600">ادفع عبر بطاقة الائتمان</p>
//                       </div>
//                     </div>
//                     <CreditCard className="w-6 h-6 text-gray-400" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* ملخص الطلب */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-4">
//               <CardHeader>
//                 <CardTitle>ملخص الطلب</CardTitle>
//                 <CardDescription>مراجعة تفاصيل طلبك</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* المنتجات */}
//                 <div className="space-y-3 max-h-64 overflow-y-auto">
//                   {items.map((item) => (
//                     <div key={item.product.id} className="flex gap-3 p-2 bg-gray-50 rounded-lg">
//                                             <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
//                         {item.product.image_url ? (
//                           <img
//                             src={item.product.image_url}
//                             alt={item.product.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             {item.product.emoji_icon ? (
//                               <span className="text-2xl">{item.product.emoji_icon}</span>
//                             ) : (
//                               <ShoppingBag className="w-6 h-6 text-gray-400" />
//                             )}
//                           </div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="font-medium text-sm truncate">{item.product.name}</p>
//                         <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
//                         <p className="text-sm font-bold text-green-600">
//                           {(parseFloat(item.product.price) * item.quantity).toLocaleString()} د.ع
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator />

//                 {/* التفاصيل المالية */}
//                 <div className="space-y-2">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">المجموع الفرعي</span>
//                     <span className="font-medium">
//                       {getTotalPrice().toLocaleString()} د.ع
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-600">التوصيل</span>
//                     <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
//                       {shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} د.ع`}
//                     </span>
//                   </div>
                  
//                   {getTotalPrice() < 50000 && (
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                       <p className="text-xs text-blue-800">
//                         أضف {(50000 - getTotalPrice()).toLocaleString()} د.ع للحصول على توصيل مجاني!
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <Separator />

//                 {/* المجموع الكلي */}
//                 <div className="flex justify-between items-center pt-2">
//                   <span className="text-lg font-semibold">المجموع الكلي</span>
//                   <span className="text-2xl font-bold text-green-600">
//                     {totalWithShipping.toLocaleString()} د.ع
//                   </span>
//                 </div>

//                 {/* زر إتمام الطلب */}
//                 <Button
//                   onClick={handleSubmitOrder}
//                   disabled={loading}
//                   className="w-full"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       جاري إرسال الطلب...
//                     </>
//                   ) : (
//                     'تأكيد الطلب'
//                   )}
//                 </Button>

//                 {/* معلومات إضافية */}
//                 <div className="space-y-2 pt-4 border-t">
//                                    <div className="flex items-start gap-2 text-sm text-gray-600">
//                     <Truck className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                     <p>التوصيل خلال 2-5 أيام عمل</p>
//                   </div>
//                   <div className="flex items-start gap-2 text-sm text-gray-600">
//                     <CreditCard className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                     <p>دفع آمن ومضمون</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




// // pages/Checkout.tsx (الإصدار المحدث)
// import React, { useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Textarea } from '../components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
// import { Separator } from '../components/ui/separator';
// import { 
//   ShoppingBag, 
//   MapPin, 
//   Phone, 
//   User, 
//   CreditCard,
//   Truck,
//   Loader2 
// } from 'lucide-react';
// import { toast } from 'sonner';

// const Checkout: React.FC = () => {
//   const { isAuthenticated, user } = useAuth();
//   const { items, getTotalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     delivery_address: '',
//     delivery_city: '',
//     delivery_phone: user?.phone || '',
//     delivery_name: user?.name || '',
//     notes: '',
//     paymentMethod: 'cash',
//   });

//   // إعادة التوجيه إذا كانت السلة فارغة
//   if (items.length === 0) {
//     return <Navigate to="/cart" />;
//   }

//   // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: '/checkout' }} />;
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitOrder = async () => {
//     // التحقق من البيانات المطلوبة بناءً على API
//     if (!formData.delivery_address.trim()) {
//       toast.error('الرجاء إدخال العنوان');
//       return;
//     }

//     if (!formData.delivery_city.trim()) {
//       toast.error('الرجاء إدخال المدينة');
//       return;
//     }

//     if (!formData.delivery_phone.trim()) {
//       toast.error('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     if (!formData.delivery_name.trim()) {
//       toast.error('الرجاء إدخال اسم المستلم');
//       return;
//     }

//     setLoading(true);

//     try {
//       // إعداد بيانات الطلب حسب هيكل API الفعلي
//       const orderData = {
//         delivery_address: formData.delivery_address,
//         delivery_phone: formData.delivery_phone,
//         delivery_name: formData.delivery_name,
//         notes: formData.notes,
//         // إضافة المدينة إذا كانت مطلوبة في API
//         ...(formData.delivery_city && { city: formData.delivery_city }),
//         // إضافة معلومات الدفع إذا كانت مدعومة
//         payment_method: formData.paymentMethod,
//         // إضافة العناصر من السلة (يجب تعديلها حسب هيكل API الفعلي)
//         items: items.map((item) => ({
//           product_id: item.product.id,
//           quantity: item.quantity,
//           price: item.product.price,
//         })),
//         total_amount: getTotalPrice(),
//       };

//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (response.ok && result.order) {
//         // استخدام معرف الطلب من الاستجابة الفعلية
//         const orderId = result.order.id || result.order.order_number;
        
//         if (orderId) {
//           // تفريغ السلة بعد النجاح
//           await clearCart();

//           toast.success('تم إرسال طلبك بنجاح!', {
//             description: result.message || 'سيتم التواصل معك قريباً لتأكيد الطلب',
//           });

//           // الانتقال إلى صفحة تأكيد الطلب باستخدام معرف الطلب
//           navigate(`/order-confirmation/${orderId}`);
//         } else {
//           toast.error('لم يتم العثور على معرف الطلب في الاستجابة');
//         }
//       } else {
//         // عرض رسالة الخطأ من الخادم
//         toast.error(result.message || result.error || 'فشل في إرسال الطلب');
//       }
//     } catch (error) {
//       console.error('خطأ في إرسال الطلب:', error);
//       toast.error('حدث خطأ في الاتصال بالخادم');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000;
//   const totalWithShipping = getTotalPrice() + shippingCost;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
//       <div className="container mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
//           <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* نموذج بيانات التوصيل - معدل حسب هيكل API */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* معلومات المستلم */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   معلومات المستلم
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     اسم المستلم *
//                   </label>
//                   <Input
//                     type="text"
//                     name="delivery_name"
//                     value={formData.delivery_name}
//                     onChange={handleInputChange}
//                     placeholder="اسم الشخص الذي سيتسلم الطلب"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     رقم الهاتف *
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       type="tel"
//                       name="delivery_phone"
//                       value={formData.delivery_phone}
//                       onChange={handleInputChange}
//                       placeholder="07XX XXX XXXX"
//                       className="pr-10"
//                       dir="ltr"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* عنوان التوصيل */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   عنوان التوصيل
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     المدينة *
//                   </label>
//                   <Input
//                     type="text"
//                     name="delivery_city"
//                     value={formData.delivery_city}
//                     onChange={handleInputChange}
//                     placeholder="بغداد، البصرة، أربيل..."
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     العنوان التفصيلي *
//                   </label>
//                   <Textarea
//                     name="delivery_address"
//                     value={formData.delivery_address}
//                     onChange={handleInputChange}
//                     placeholder="المنطقة، الحي، الشارع، رقم البناية..."
//                     rows={3}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     ملاحظات إضافية (اختيارية)
//                   </label>
//                   <Textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
//                     rows={2}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* طريقة الدفع */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CreditCard className="w-5 h-5" />
//                   طريقة الدفع
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div
//                   onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.paymentMethod === 'cash'
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           formData.paymentMethod === 'cash'
//                             ? 'border-blue-600'
//                             : 'border-gray-300'
//                         }`}
//                       >
//                         {formData.paymentMethod === 'cash' && (
//                           <div className="w-3 h-3 rounded-full bg-blue-600" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium">الدفع عند الاستلام</p>
//                         <p className="text-sm text-gray-600">ادفع نقداً عند استلام الطلب</p>
//                       </div>
//                     </div>
//                     <Truck className="w-6 h-6 text-gray-400" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* ملخص الطلب */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <ShoppingBag className="w-5 h-5" />
//                   ملخص الطلب
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.product.id} className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
//                         {item.product.image ? (
//                           <img
//                             src={item.product.image}
//                             alt={item.product.name}
//                             className="w-10 h-10 object-cover rounded"
//                           />
//                         ) : (
//                           <ShoppingBag className="w-6 h-6 text-gray-400" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium text-sm">{item.product.name}</p>
//                         <p className="text-gray-600 text-sm">الكمية: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <p className="font-medium">
//                       {(item.product.price * item.quantity).toLocaleString()} دينار
//                     </p>
//                   </div>
//                 ))}
                
//                 <Separator />
                
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>المجموع الفرعي</span>
//                     <span>{getTotalPrice().toLocaleString()} دينار</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>تكلفة التوصيل</span>
//                     <span>{shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} دينار`}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>الإجمالي</span>
//                     <span>{totalWithShipping.toLocaleString()} دينار</span>
//                   </div>
//                 </div>
                
//                 <Button
//                   onClick={handleSubmitOrder}
//                   disabled={loading}
//                   className="w-full mt-4"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 ml-2 animate-spin" />
//                       جاري إرسال الطلب...
//                     </>
//                   ) : (
//                     'تأكيد الطلب'
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




// // pages/Checkout.tsx (الإصدار المحدث)
// import React, { useState, useEffect } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Textarea } from '../components/ui/textarea';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
// import { Separator } from '../components/ui/separator';
// import { 
//   ShoppingBag, 
//   MapPin, 
//   Phone, 
//   User, 
//   CreditCard,
//   Truck,
//   Loader2,
//   Edit,
//   Check,
//   X
// } from 'lucide-react';
// import { toast } from 'sonner';

// interface AddressForm {
//   governorate: string;
//   district: string;
//   area: string;
//   street: string;
//   landmark: string;
//   postalCode: string;
// }

// const Checkout: React.FC = () => {
//   const { isAuthenticated, user } = useAuth();
//   const { items, getTotalPrice, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [useCustomAddress, setUseCustomAddress] = useState(false);

//   // حالة العنوان الافتراضي من بيانات المستخدم
//   const [userAddress, setUserAddress] = useState<AddressForm>({
//     governorate: user?.address?.city || '',
//     district: user?.address?.district || '',
//     area: user?.address?.area || '',
//     street: user?.address?.street || '',
//     landmark: user?.address?.landmark || '',
//     postalCode: user?.address?.postalCode || ''
//   });

//   // حالة العنوان المخصص للتوصيل
//   const [customAddress, setCustomAddress] = useState<AddressForm>({
//     governorate: '',
//     district: '',
//     area: '',
//     street: '',
//     landmark: '',
//     postalCode: ''
//   });

//   const [formData, setFormData] = useState({
//     delivery_phone: user?.phone || '',
//     delivery_name: user?.name || '',
//     notes: '',
//     paymentMethod: 'cash',
//   });

//   // تحديث عنوان المستخدم عندما تتغير بيانات المستخدم
//   useEffect(() => {
//     if (user?.address) {
//       setUserAddress({
//         governorate: user.address.city || '',
//         district: user.address.district || '',
//         area: user.address.area || '',
//         street: user.address.street || '',
//         landmark: user.address.landmark || '',
//         postalCode: user.address.postalCode || ''
//       });
//     }
//   }, [user]);

//   // قائمة المحافظات (نفس القائمة المستخدمة في Login)
//   const governorates = [
//     'بغداد', 'البصرة', 'نينوى', 'أربيل', 'الأنبار', 'كربلاء', 
//     'بابل', 'صلاح الدين', 'ذي قار', 'واسط', 'ميسان', 'القادسية',
//     'المثنى', 'دهوك', 'السليمانية'
//   ];

//   // إعادة التوجيه إذا كانت السلة فارغة
//   if (items.length === 0) {
//     return <Navigate to="/cart" />;
//   }

//   // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: '/checkout' }} />;
//   }

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUserAddressChange = (field: keyof AddressForm, value: string) => {
//     setUserAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleCustomAddressChange = (field: keyof AddressForm, value: string) => {
//     setCustomAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const saveUserAddress = async () => {
//     try {
//       // هنا يمكنك إضافة API call لحفظ العنوان في الملف الشخصي
//       // await updateProfile({ address: userAddress });
//       setIsEditingAddress(false);
//       toast.success('تم حفظ العنوان بنجاح');
//     } catch (error) {
//       toast.error('حدث خطأ في حفظ العنوان');
//     }
//   };

//   const cancelEditAddress = () => {
//     // إعادة تعيين العنوان إلى القيم الأصلية
//     setUserAddress({
//       governorate: user?.address?.city || '',
//       district: user?.address?.district || '',
//       area: user?.address?.area || '',
//       street: user?.address?.street || '',
//       landmark: user?.address?.landmark || '',
//       postalCode: user?.address?.postalCode || ''
//     });
//     setIsEditingAddress(false);
//   };

//   const getDeliveryAddress = () => {
//     if (useCustomAddress) {
//       return customAddress;
//     }
//     return userAddress;
//   };

//   const formatAddress = (address: AddressForm) => {
//     const parts = [
//       address.street,
//       address.area,
//       address.district,
//       address.governorate
//     ].filter(Boolean);
    
//     return parts.join('، ');
//   };

//   const validateAddress = (address: AddressForm) => {
//     if (!address.governorate || !address.district || !address.area || !address.street) {
//       return 'الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، الحي، والشارع)';
//     }
//     return null;
//   };

//   const handleSubmitOrder = async () => {
//     // التحقق من البيانات المطلوبة
//     if (!formData.delivery_phone.trim()) {
//       toast.error('الرجاء إدخال رقم الهاتف');
//       return;
//     }

//     if (!formData.delivery_name.trim()) {
//       toast.error('الرجاء إدخال اسم المستلم');
//       return;
//     }

//     const deliveryAddress = getDeliveryAddress();
//     const addressError = validateAddress(deliveryAddress);
//     if (addressError) {
//       toast.error(addressError);
//       return;
//     }

//     setLoading(true);

//     try {
//       // إعداد بيانات الطلب
//       const orderData = {
//         delivery_address: formatAddress(deliveryAddress),
//         delivery_phone: formData.delivery_phone,
//         delivery_name: formData.delivery_name,
//         notes: formData.notes,
//         city: deliveryAddress.governorate,
//         district: deliveryAddress.district,
//         area: deliveryAddress.area,
//         street: deliveryAddress.street,
//         landmark: deliveryAddress.landmark,
//         postal_code: deliveryAddress.postalCode,
//         payment_method: formData.paymentMethod,
//         items: items.map((item) => ({
//           product_id: item.product.id,
//           quantity: item.quantity,
//           price: item.product.price,
//         })),
//         total_amount: getTotalPrice(),
//       };

//       const response = await fetch('http://localhost:5000/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(orderData),
//       });

//       const result = await response.json();

//       if (response.ok && result.order) {
//         const orderId = result.order.id || result.order.order_number;
        
//         if (orderId) {
//           await clearCart();

//           toast.success('تم إرسال طلبك بنجاح!', {
//             description: result.message || 'سيتم التواصل معك قريباً لتأكيد الطلب',
//           });

//           navigate(`/order-confirmation/${orderId}`);
//         } else {
//           toast.error('لم يتم العثور على معرف الطلب في الاستجابة');
//         }
//       } else {
//         toast.error(result.message || result.error || 'فشل في إرسال الطلب');
//       }
//     } catch (error) {
//       console.error('خطأ في إرسال الطلب:', error);
//       toast.error('حدث خطأ في الاتصال بالخادم');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000;
//   const totalWithShipping = getTotalPrice() + shippingCost;

//   const deliveryAddress = getDeliveryAddress();

//   return (
//     <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
//       <div className="container mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
//           <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* نموذج بيانات التوصيل */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* معلومات المستلم */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="w-5 h-5" />
//                   معلومات المستلم
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     اسم المستلم *
//                   </label>
//                   <Input
//                     type="text"
//                     name="delivery_name"
//                     value={formData.delivery_name}
//                     onChange={handleInputChange}
//                     placeholder="اسم الشخص الذي سيتسلم الطلب"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     رقم الهاتف *
//                   </label>
//                   <div className="relative">
//                     <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <Input
//                       type="tel"
//                       name="delivery_phone"
//                       value={formData.delivery_phone}
//                       onChange={handleInputChange}
//                       placeholder="07XX XXX XXXX"
//                       className="pr-10"
//                       dir="ltr"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* عنوان التوصيل */}
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="flex items-center gap-2">
//                     <MapPin className="w-5 h-5" />
//                     عنوان التوصيل
//                   </CardTitle>
//                   <div className="flex gap-2">
//                     {!useCustomAddress && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setIsEditingAddress(!isEditingAddress)}
//                       >
//                         {isEditingAddress ? (
//                           <X className="w-4 h-4 ml-1" />
//                         ) : (
//                           <Edit className="w-4 h-4 ml-1" />
//                         )}
//                         {isEditingAddress ? 'إلغاء' : 'تعديل'}
//                       </Button>
//                     )}
//                     <Button
//                       variant={useCustomAddress ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setUseCustomAddress(!useCustomAddress)}
//                     >
//                       {useCustomAddress ? 'استخدام عنواني' : 'عنوان مختلف'}
//                     </Button>
//                   </div>
//                 </div>
//                 {!useCustomAddress && !isEditingAddress && userAddress.street && (
//                   <CardDescription>
//                     {formatAddress(userAddress)}
//                   </CardDescription>
//                 )}
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {useCustomAddress ? (
//                   // نموذج العنوان المخصص
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         المحافظة *
//                       </label>
//                       <select
//                         value={customAddress.governorate}
//                         onChange={(e) => handleCustomAddressChange('governorate', e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
//                       >
//                         <option value="">اختر المحافظة</option>
//                         {governorates.map(gov => (
//                           <option key={gov} value={gov}>{gov}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           المنطقة / القضاء *
//                         </label>
//                         <Input
//                           type="text"
//                           value={customAddress.district}
//                           onChange={(e) => handleCustomAddressChange('district', e.target.value)}
//                           placeholder="المنطقة"
//                           className="text-right"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           الحي / المنطقة *
//                         </label>
//                         <Input
//                           type="text"
//                           value={customAddress.area}
//                           onChange={(e) => handleCustomAddressChange('area', e.target.value)}
//                           placeholder="الحي"
//                           className="text-right"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         الشارع والتفاصيل *
//                       </label>
//                       <Textarea
//                         value={customAddress.street}
//                         onChange={(e) => handleCustomAddressChange('street', e.target.value)}
//                         placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
//                         rows={3}
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           أقرب نقطة دالة
//                         </label>
//                         <Input
//                           type="text"
//                           value={customAddress.landmark}
//                           onChange={(e) => handleCustomAddressChange('landmark', e.target.value)}
//                           placeholder="مقابل، بجانب..."
//                           className="text-right"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           الرمز البريدي
//                         </label>
//                         <Input
//                           type="text"
//                           value={customAddress.postalCode}
//                           onChange={(e) => handleCustomAddressChange('postalCode', e.target.value.replace(/\D/g, ''))}
//                           placeholder="الرمز البريدي"
//                           className="text-right"
//                           dir="ltr"
//                           maxLength={5}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ) : isEditingAddress ? (
//                   // نموذج تعديل العنوان الأساسي
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         المحافظة *
//                       </label>
//                       <select
//                         value={userAddress.governorate}
//                         onChange={(e) => handleUserAddressChange('governorate', e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
//                       >
//                         <option value="">اختر المحافظة</option>
//                         {governorates.map(gov => (
//                           <option key={gov} value={gov}>{gov}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           المنطقة / القضاء *
//                         </label>
//                         <Input
//                           type="text"
//                           value={userAddress.district}
//                           onChange={(e) => handleUserAddressChange('district', e.target.value)}
//                           placeholder="المنطقة"
//                           className="text-right"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           الحي / المنطقة *
//                         </label>
//                         <Input
//                           type="text"
//                           value={userAddress.area}
//                           onChange={(e) => handleUserAddressChange('area', e.target.value)}
//                           placeholder="الحي"
//                           className="text-right"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         الشارع والتفاصيل *
//                       </label>
//                       <Textarea
//                         value={userAddress.street}
//                         onChange={(e) => handleUserAddressChange('street', e.target.value)}
//                         placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
//                         rows={3}
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           أقرب نقطة دالة
//                         </label>
//                         <Input
//                           type="text"
//                           value={userAddress.landmark}
//                           onChange={(e) => handleUserAddressChange('landmark', e.target.value)}
//                           placeholder="مقابل، بجانب..."
//                           className="text-right"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                           الرمز البريدي
//                         </label>
//                         <Input
//                           type="text"
//                           value={userAddress.postalCode}
//                           onChange={(e) => handleUserAddressChange('postalCode', e.target.value.replace(/\D/g, ''))}
//                           placeholder="الرمز البريدي"
//                           className="text-right"
//                           dir="ltr"
//                           maxLength={5}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex gap-2">
//                       <Button onClick={saveUserAddress} className="flex-1">
//                         <Check className="w-4 h-4 ml-1" />
//                         حفظ العنوان
//                       </Button>
//                       <Button variant="outline" onClick={cancelEditAddress} className="flex-1">
//                         <X className="w-4 h-4 ml-1" />
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : userAddress.street ? (
//                   // عرض العنوان الحالي
//                   <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//                     <div className="flex items-start gap-3">
//                       <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
//                       <div className="flex-1">
//                         <h4 className="font-medium text-green-800 mb-2">عنوان التوصيل الحالي</h4>
//                         <p className="text-green-700 text-sm leading-relaxed">
//                           {formatAddress(userAddress)}
//                           {userAddress.landmark && (
//                             <><br /><span className="text-green-600">قرب: {userAddress.landmark}</span></>
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   // لا يوجد عنوان
//                   <div className="text-center py-8">
//                     <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500 mb-4">لا يوجد عنوان مسجل في ملفك الشخصي</p>
//                     <Button onClick={() => setIsEditingAddress(true)}>
//                       <Edit className="w-4 h-4 ml-1" />
//                       إضافة عنوان
//                     </Button>
//                   </div>
//                 )}

//                 {/* ملاحظات إضافية */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     ملاحظات إضافية (اختيارية)
//                   </label>
//                   <Textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
//                     rows={2}
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* طريقة الدفع */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CreditCard className="w-5 h-5" />
//                   طريقة الدفع
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div
//                   onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.paymentMethod === 'cash'
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-gray-200 hover:border-gray-300'
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           formData.paymentMethod === 'cash'
//                             ? 'border-blue-600'
//                             : 'border-gray-300'
//                         }`}
//                       >
//                         {formData.paymentMethod === 'cash' && (
//                           <div className="w-3 h-3 rounded-full bg-blue-600" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium">الدفع عند الاستلام</p>
//                         <p className="text-sm text-gray-600">ادفع نقداً عند استلام الطلب</p>
//                       </div>
//                     </div>
//                     <Truck className="w-6 h-6 text-gray-400" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* ملخص الطلب */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <ShoppingBag className="w-5 h-5" />
//                   ملخص الطلب
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.product.id} className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
//                         {item.product.image ? (
//                           <img
//                             src={item.product.image}
//                             alt={item.product.name}
//                             className="w-10 h-10 object-cover rounded"
//                           />
//                         ) : (
//                           <ShoppingBag className="w-6 h-6 text-gray-400" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium text-sm">{item.product.name}</p>
//                         <p className="text-gray-600 text-sm">الكمية: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <p className="font-medium">
//                       {(item.product.price * item.quantity).toLocaleString()} دينار
//                     </p>
//                   </div>
//                 ))}
                
//                 <Separator />
                
//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>المجموع الفرعي</span>
//                     <span>{getTotalPrice().toLocaleString()} دينار</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>تكلفة التوصيل</span>
//                     <span>{shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} دينار`}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between font-bold text-lg">
//                     <span>الإجمالي</span>
//                     <span>{totalWithShipping.toLocaleString()} دينار</span>
//                   </div>
//                 </div>
                
//                 <Button
//                   onClick={handleSubmitOrder}
//                   disabled={loading || !deliveryAddress.street}
//                   className="w-full mt-4"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 ml-2 animate-spin" />
//                       جاري إرسال الطلب...
//                     </>
//                   ) : (
//                     'تأكيد الطلب'
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




// pages/Checkout.tsx (الإصدار المحدث)
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  User, 
  CreditCard,
  Truck,
  Loader2,
  Edit,
  Check,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface AddressForm {
  governorate: string;
  district: string;
  area: string;
  landmark: string;
}

const Checkout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [useCustomAddress, setUseCustomAddress] = useState(false);

  // حالة العنوان الافتراضي من بيانات المستخدم
  const [userAddress, setUserAddress] = useState<AddressForm>({
    governorate: user?.address?.city || '',
    district: user?.address?.district || '',
    area: user?.address?.area || '',
    landmark: user?.address?.landmark || ''
  });

  // حالة العنوان المخصص للتوصيل
  const [customAddress, setCustomAddress] = useState<AddressForm>({
    governorate: '',
    district: '',
    area: '',
    landmark: ''
  });

  const [formData, setFormData] = useState({
    delivery_phone: user?.phone || '',
    delivery_name: user?.name || '',
    notes: '',
    paymentMethod: 'cash',
  });

  // تحديث عنوان المستخدم عندما تتغير بيانات المستخدم
  useEffect(() => {
    if (user?.address) {
      setUserAddress({
        governorate: user.address.city || '',
        district: user.address.district || '',
        area: user.address.area || '',
        landmark: user.address.landmark || ''
      });
    }
  }, [user]);

  // قائمة المحافظات المطلوبة (4 محافظات)
  const governorates = [
    'بغداد', 'البصرة', 'نينوى', 'أربيل'
  ];

  // إعادة التوجيه إذا كانت السلة فارغة
  if (items.length === 0) {
    return <Navigate to="/cart" />;
  }

  // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/checkout' }} />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserAddressChange = (field: keyof AddressForm, value: string) => {
    setUserAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCustomAddressChange = (field: keyof AddressForm, value: string) => {
    setCustomAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveUserAddress = async () => {
    try {
      // هنا يمكنك إضافة API call لحفظ العنوان في الملف الشخصي
      // await updateProfile({ address: userAddress });
      setIsEditingAddress(false);
      toast.success('تم حفظ العنوان بنجاح');
    } catch (error) {
      toast.error('حدث خطأ في حفظ العنوان');
    }
  };

  const cancelEditAddress = () => {
    // إعادة تعيين العنوان إلى القيم الأصلية
    setUserAddress({
      governorate: user?.address?.city || '',
      district: user?.address?.district || '',
      area: user?.address?.area || '',
      landmark: user?.address?.landmark || ''
    });
    setIsEditingAddress(false);
  };

  const getDeliveryAddress = () => {
    if (useCustomAddress) {
      return customAddress;
    }
    return userAddress;
  };

  const formatAddress = (address: AddressForm) => {
    const parts = [
      address.area,
      address.district,
      address.governorate
    ].filter(Boolean);
    
    return parts.join('، ');
  };

  const validateAddress = (address: AddressForm) => {
    if (!address.governorate || !address.district || !address.area) {
      return 'الرجاء إدخال العنوان الكامل (المحافظة، القضاء/المنطقة، والحي)';
    }
    return null;
  };

  const handleSubmitOrder = async () => {
    // التحقق من البيانات المطلوبة
    if (!formData.delivery_phone.trim()) {
      toast.error('الرجاء إدخال رقم الهاتف');
      return;
    }

    if (!formData.delivery_name.trim()) {
      toast.error('الرجاء إدخال اسم المستلم');
      return;
    }

    const deliveryAddress = getDeliveryAddress();
    const addressError = validateAddress(deliveryAddress);
    if (addressError) {
      toast.error(addressError);
      return;
    }

    setLoading(true);

    try {
      // إعداد بيانات الطلب
      const orderData = {
        delivery_address: formatAddress(deliveryAddress),
        delivery_phone: formData.delivery_phone,
        delivery_name: formData.delivery_name,
        notes: formData.notes,
        city: deliveryAddress.governorate,
        district: deliveryAddress.district,
        area: deliveryAddress.area,
        landmark: deliveryAddress.landmark,
        payment_method: formData.paymentMethod,
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total_amount: getTotalPrice(),
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok && result.order) {
        const orderId = result.order.id || result.order.order_number;
        
        if (orderId) {
          await clearCart();

          toast.success('تم إرسال طلبك بنجاح!', {
            description: result.message || 'سيتم التواصل معك قريباً لتأكيد الطلب',
          });

          navigate(`/order-confirmation/${orderId}`);
        } else {
          toast.error('لم يتم العثور على معرف الطلب في الاستجابة');
        }
      } else {
        toast.error(result.message || result.error || 'فشل في إرسال الطلب');
      }
    } catch (error) {
      console.error('خطأ في إرسال الطلب:', error);
      toast.error('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000;
  const totalWithShipping = getTotalPrice() + shippingCost;

  const deliveryAddress = getDeliveryAddress();

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* نموذج بيانات التوصيل */}
          <div className="lg:col-span-2 space-y-6">
            {/* معلومات المستلم */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  معلومات المستلم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المستلم *
                  </label>
                  <Input
                    type="text"
                    name="delivery_name"
                    value={formData.delivery_name}
                    onChange={handleInputChange}
                    placeholder="اسم الشخص الذي سيتسلم الطلب"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف *
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      name="delivery_phone"
                      value={formData.delivery_phone}
                      onChange={handleInputChange}
                      placeholder="07XX XXX XXXX"
                      className="pr-10"
                      dir="ltr"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* عنوان التوصيل */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    عنوان التوصيل
                  </CardTitle>
                  <div className="flex gap-2">
                    {!useCustomAddress && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                      >
                        {isEditingAddress ? (
                          <X className="w-4 h-4 ml-1" />
                        ) : (
                          <Edit className="w-4 h-4 ml-1" />
                        )}
                        {isEditingAddress ? 'إلغاء' : 'تعديل'}
                      </Button>
                    )}
                    <Button
                      variant={useCustomAddress ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseCustomAddress(!useCustomAddress)}
                    >
                      {useCustomAddress ? 'استخدام عنواني' : 'عنوان مختلف'}
                    </Button>
                  </div>
                </div>
                {!useCustomAddress && !isEditingAddress && userAddress.area && (
                  <CardDescription>
                    {formatAddress(userAddress)}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {useCustomAddress ? (
                  // نموذج العنوان المخصص
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المحافظة *
                      </label>
                      <select
                        value={customAddress.governorate}
                        onChange={(e) => handleCustomAddressChange('governorate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
                      >
                        <option value="">اختر المحافظة</option>
                        {governorates.map(gov => (
                          <option key={gov} value={gov}>{gov}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        القضاء / المنطقة *
                      </label>
                      <Input
                        type="text"
                        value={customAddress.district}
                        onChange={(e) => handleCustomAddressChange('district', e.target.value)}
                        placeholder="اسم القضاء أو المنطقة"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الحي *
                      </label>
                      <Input
                        type="text"
                        value={customAddress.area}
                        onChange={(e) => handleCustomAddressChange('area', e.target.value)}
                        placeholder="اسم الحي"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        أقرب نقطة دالة
                      </label>
                      <Input
                        type="text"
                        value={customAddress.landmark}
                        onChange={(e) => handleCustomAddressChange('landmark', e.target.value)}
                        placeholder="مقابل، بجانب..."
                        className="text-right"
                      />
                    </div>
                  </div>
                ) : isEditingAddress ? (
                  // نموذج تعديل العنوان الأساسي
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        المحافظة *
                      </label>
                      <select
                        value={userAddress.governorate}
                        onChange={(e) => handleUserAddressChange('governorate', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-right bg-white"
                      >
                        <option value="">اختر المحافظة</option>
                        {governorates.map(gov => (
                          <option key={gov} value={gov}>{gov}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        القضاء / المنطقة *
                      </label>
                      <Input
                        type="text"
                        value={userAddress.district}
                        onChange={(e) => handleUserAddressChange('district', e.target.value)}
                        placeholder="اسم القضاء أو المنطقة"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الحي *
                      </label>
                      <Input
                        type="text"
                        value={userAddress.area}
                        onChange={(e) => handleUserAddressChange('area', e.target.value)}
                        placeholder="اسم الحي"
                        className="text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        أقرب نقطة دالة
                      </label>
                      <Input
                        type="text"
                        value={userAddress.landmark}
                        onChange={(e) => handleUserAddressChange('landmark', e.target.value)}
                        placeholder="مقابل، بجانب..."
                        className="text-right"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={saveUserAddress} className="flex-1">
                        <Check className="w-4 h-4 ml-1" />
                        حفظ العنوان
                      </Button>
                      <Button variant="outline" onClick={cancelEditAddress} className="flex-1">
                        <X className="w-4 h-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : userAddress.area ? (
                  // عرض العنوان الحالي
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800 mb-2">عنوان التوصيل الحالي</h4>
                        <p className="text-green-700 text-sm leading-relaxed">
                          {formatAddress(userAddress)}
                          {userAddress.landmark && (
                            <><br /><span className="text-green-600">قرب: {userAddress.landmark}</span></>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // لا يوجد عنوان
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">لا يوجد عنوان مسجل في ملفك الشخصي</p>
                    <Button onClick={() => setIsEditingAddress(true)}>
                      <Edit className="w-4 h-4 ml-1" />
                      إضافة عنوان
                    </Button>
                  </div>
                )}

                {/* ملاحظات إضافية */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ملاحظات إضافية (اختيارية)
                  </label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* طريقة الدفع */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.paymentMethod === 'cash'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === 'cash'
                            ? 'border-blue-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {formData.paymentMethod === 'cash' && (
                          <div className="w-3 h-3 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">الدفع عند الاستلام</p>
                        <p className="text-sm text-gray-600">ادفع نقداً عند استلام الطلب</p>
                      </div>
                    </div>
                    <Truck className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ملخص الطلب */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  ملخص الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        {item.product.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-gray-600 text-sm">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {(item.product.price * item.quantity).toLocaleString()} دينار
                    </p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي</span>
                    <span>{getTotalPrice().toLocaleString()} دينار</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تكلفة التوصيل</span>
                    <span>{shippingCost === 0 ? 'مجاني' : `${shippingCost.toLocaleString()} دينار`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>الإجمالي</span>
                    <span>{totalWithShipping.toLocaleString()} دينار</span>
                  </div>
                </div>
                
                <Button
                  onClick={handleSubmitOrder}
                  disabled={loading || !deliveryAddress.area}
                  className="w-full mt-4"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    'تأكيد الطلب'
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;