// // import React, { useEffect, useState } from 'react';
// // import { useFavorites } from '../hooks/useFavorites';
// // import { useAuth } from '../hooks/useAuth';
// // import { Heart, ArrowRight, Home, Loader2, Trash2, ShoppingBag, Star, Package, AlertCircle } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import { Product } from '../api/types/product.types';

// // const FavoritesPage: React.FC = () => {
// //   const { favorites, loading, error, removeFromFavorites, fetchFavorites } = useFavorites();
// //   const { isAuthenticated } = useAuth();
// //   const navigate = useNavigate();
// //   const [debugInfo, setDebugInfo] = useState<string>('');

// //   // فحص البيانات عند التحميل
// //   useEffect(() => {
// //     console.log('🔍 Current Favorites:', favorites);
    
// //     if (favorites.length > 0) {
// //       setDebugInfo(`تم تحميل ${favorites.length} منتج في المفضلة`);
// //     }
// //   }, [favorites]);

// //   const handleRemoveFavorite = async (productId: number) => {
// //     try {
// //       await removeFromFavorites(productId);
// //     } catch (err) {
// //       console.error('Error removing favorite:', err);
// //     }
// //   };

// //   const handleProductClick = (productId: number) => {
// //     navigate(`/products/${productId}`);
// //   };

// //   const getFullImageUrl = (imageUrl: string | undefined | null) => {
// //     if (!imageUrl) return null;
// //     if (imageUrl.startsWith('http')) return imageUrl;
// //     return `http://localhost:5000${imageUrl}`;
// //   };

// //   const formatPrice = (price: string | number) => {
// //     try {
// //       const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
// //       return isNaN(priceNumber) ? '0.00' : priceNumber.toLocaleString('ar-IQ', {
// //         minimumFractionDigits: 2,
// //         maximumFractionDigits: 2
// //       });
// //     } catch {
// //       return '0.00';
// //     }
// //   };

// //   const renderStars = (rating: number) => {
// //     const safeRating = isNaN(rating) ? 0 : Math.max(0, Math.min(5, rating));
// //     return Array.from({ length: 5 }, (_, index) => (
// //       <Star
// //         key={index}
// //         className={`w-3 h-3 ${
// //           index < Math.floor(safeRating)
// //             ? 'fill-yellow-400 text-yellow-400'
// //             : 'text-gray-300'
// //         }`}
// //       />
// //     ));
// //   };

// //   if (!isAuthenticated) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
// //           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <Heart className="w-10 h-10 text-red-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">يجب تسجيل الدخول</h2>
// //           <p className="text-gray-600 mb-6">يجب عليك تسجيل الدخول لعرض منتجاتك المفضلة</p>
// //           <button 
// //             onClick={() => navigate('/login')}
// //             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
// //           >
// //             تسجيل الدخول
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
// //           <p className="text-gray-700 text-lg font-medium">جاري تحميل المفضلة...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// //       {/* الهيدر */}
// //       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
// //         <div className="container mx-auto px-4 pt-4">
// //           {/* مسار التنقل */}
// //           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
// //             <button
// //               onClick={() => navigate('/')}
// //               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
// //             >
// //               <Home className="w-4 h-4" />
// //               الرئيسية
// //             </button>
// //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
// //             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //               المفضلة
// //             </span>
// //           </nav>

// //           {/* العنوان */}
// //           <div className="flex items-center gap-4 mb-6">
// //             <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white bg-gradient-to-br from-red-100 to-pink-100">
// //               <Heart className="w-8 h-8 text-red-600 fill-current" />
// //             </div>
// //             <div className="flex-1">
// //               <h1 className="text-2xl font-bold text-gray-900 mb-1">منتجاتي المفضلة</h1>
// //               <p className="text-gray-600 text-sm">
// //                 {favorites.length} منتج في المفضلة
// //                 {debugInfo && <span className="text-xs text-gray-400 ml-2">({debugInfo})</span>}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* المحتوى الرئيسي */}
// //       <main className="container mx-auto px-4 py-6">
// //         {error && (
// //           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-3">
// //             <AlertCircle className="w-5 h-5 flex-shrink-0" />
// //             <div className="flex-1">
// //               <p className="font-medium">{error}</p>
// //               <button 
// //                 onClick={() => fetchFavorites()}
// //                 className="mt-1 text-red-700 hover:text-red-900 underline text-sm"
// //               >
// //                 إعادة المحاولة
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {favorites.length === 0 ? (
// //           <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
// //             <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <Heart className="w-12 h-12 text-red-600" />
// //             </div>
// //             <h3 className="text-2xl font-bold text-gray-900 mb-3">لا توجد منتجات في المفضلة</h3>
// //             <p className="text-gray-600 mb-6 max-w-md mx-auto">
// //               يمكنك إضافة المنتجات إلى المفضلة بالنقر على أيقونة القلب في أي منتج
// //             </p>
// //             <button 
// //               onClick={() => navigate('/categories')}
// //               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
// //             >
// //               <ShoppingBag className="w-4 h-4 inline ml-2" />
// //               استعرض المنتجات
// //             </button>
// //           </div>
// //         ) : (
// //           <>
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //               {favorites.map((product: Product) => {
// //                 // استخدام القيم الآمنة مع قيم افتراضية
// //                 const fullImageUrl = getFullImageUrl(product.image_url);
// //                 const productName = product.name_ar || product.name || 'منتج بدون اسم';
// //                 const productDescription = product.description_ar || product.description || 'لا يوجد وصف متاح';
// //                 const productRating = parseFloat(product.rating?.toString() || '0');
// //                 const productReviewsCount = product.reviews_count || 0;
// //                 const productPrice = product.price || '0';
// //                 const productOriginalPrice = product.original_price;
// //                 const productDiscount = product.discount || 0;
// //                 const productInStock = product.in_stock !== false;

// //                 return (
// //                   <div 
// //                     key={product.id} 
// //                     className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px] group cursor-pointer"
// //                     onClick={() => handleProductClick(product.id)}
// //                   >
// //                     {/* صورة المنتج */}
// //                     <div className="relative aspect-square bg-gray-100 rounded-t-2xl overflow-hidden">
// //                       {fullImageUrl ? (
// //                         <img
// //                           src={fullImageUrl}
// //                           alt={productName}
// //                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                         />
// //                       ) : (
// //                         <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
// //                           <Package className="w-12 h-12 text-gray-400 mb-2" />
// //                           <span className="text-xs text-gray-500">لا توجد صورة</span>
// //                         </div>
// //                       )}
                      
// //                       {/* زر الإزالة */}
// //                       <button
// //                         onClick={(e) => {
// //                           e.stopPropagation();
// //                           handleRemoveFavorite(product.id);
// //                         }}
// //                         className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 text-red-600"
// //                         title="إزالة من المفضلة"
// //                       >
// //                         <Trash2 className="w-4 h-4" />
// //                       </button>

// //                       {/* الخصم */}
// //                       {productDiscount > 0 && (
// //                         <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
// //                           {productDiscount}% خصم
// //                         </div>
// //                       )}

// //                       {/* حالة التوفر */}
// //                       {!productInStock && (
// //                         <div className="absolute bottom-3 left-3 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
// //                           غير متوفر
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* معلومات المنتج */}
// //                     <div className="p-4">
// //                       <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
// //                         {productName}
// //                       </h3>
                      
// //                       <p className="text-gray-600 text-xs mb-3 line-clamp-2">
// //                         {productDescription}
// //                       </p>

// //                       {/* التقييم */}
// //                       {productRating > 0 && (
// //                         <div className="flex items-center gap-2 mb-3">
// //                           <div className="flex items-center gap-0.5">
// //                             {renderStars(productRating)}
// //                           </div>
// //                           <span className="text-xs text-gray-600">
// //                             {productRating.toFixed(1)} ({productReviewsCount})
// //                           </span>
// //                         </div>
// //                       )}

// //                       {/* السعر */}
// //                       <div className="flex items-center justify-between">
// //                         <div className="flex items-center gap-2">
// //                           <span className="text-lg font-bold text-green-600">
// //                             {formatPrice(productPrice)} د.ع
// //                           </span>
// //                           {productDiscount > 0 && productOriginalPrice && (
// //                             <span className="text-sm text-gray-400 line-through">
// //                               {formatPrice(productOriginalPrice)} د.ع
// //                             </span>
// //                           )}
// //                         </div>
                        
// //                         <button 
// //                           onClick={(e) => {
// //                             e.stopPropagation();
// //                             handleProductClick(product.id);
// //                           }}
// //                           className="text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
// //                         >
// //                           التفاصيل
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             {/* إحصائيات الصفحة */}
// //             <div className="mt-8 text-center">
// //               <div className="bg-white rounded-xl p-4 border-2 border-gray-200 inline-block">
// //                 <div className="flex items-center gap-6 text-sm text-gray-600">
// //                   <span className="flex items-center gap-2">
// //                     <Heart className="w-4 h-4 text-red-500 fill-current" />
// //                     <span>
// //                       <span className="font-bold text-blue-600">{favorites.length}</span> منتج في المفضلة
// //                     </span>
// //                   </span>
                  
// //                   {/* عدد المنتجات المتوفرة */}
// //                   <span className="flex items-center gap-2">
// //                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
// //                     <span>
// //                       <span className="font-bold text-green-600">
// //                         {favorites.filter(product => product.in_stock !== false).length}
// //                       </span> منتج متوفر
// //                     </span>
// //                   </span>

// //                   {/* عدد المنتجات المخفضة */}
// //                   {favorites.filter(product => (product.discount || 0) > 0).length > 0 && (
// //                     <span className="flex items-center gap-2">
// //                       <span className="w-2 h-2 bg-red-500 rounded-full"></span>
// //                       <span>
// //                         <span className="font-bold text-red-600">
// //                           {favorites.filter(product => (product.discount || 0) > 0).length}
// //                         </span> منتج مخفض
// //                       </span>
// //                     </span>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default FavoritesPage;






// // pages/FavoritesPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useFavorites } from '../hooks/useFavorites';
// import { useAuth } from '../hooks/useAuth';
// import { useCart } from '../hooks/useCart'; // إضافة هذا
// import { Heart, ArrowRight, Home, Loader2, Trash2, ShoppingBag, Star, Package, AlertCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Product } from '../api/types/product.types';
// import ProductDetailDialog from '../components/App-components/Product/Productdaialog'; // إضافة هذا
// import { toast } from 'sonner'; // إضافة هذا

// const FavoritesPage: React.FC = () => {
//   const { favorites, loading, error, removeFromFavorites, fetchFavorites } = useFavorites();
//   const { isAuthenticated } = useAuth();
//   const { addToCart } = useCart(); // إضافة هذا
//   const navigate = useNavigate();
//   const [debugInfo, setDebugInfo] = useState<string>('');
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // إضافة هذا
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // إضافة هذا
//   const [addingToCart, setAddingToCart] = useState(false); // إضافة هذا

//   // فحص البيانات عند التحميل
//   useEffect(() => {
//     console.log('🔍 Current Favorites:', favorites);
    
//     if (favorites.length > 0) {
//       setDebugInfo(`تم تحميل ${favorites.length} منتج في المفضلة`);
//     }
//   }, [favorites]);

//   const handleRemoveFavorite = async (productId: number) => {
//     try {
//       await removeFromFavorites(productId);
//     } catch (err) {
//       console.error('Error removing favorite:', err);
//     }
//   };

//   // تعديل هذه الدالة لفتح الدايلوج بدلاً من التنقل
//   const handleProductClick = (product: Product) => {
//     setSelectedProduct(product);
//     setIsDialogOpen(true);
//   };

//   // إضافة دالة لإغلاق الدايلوج
//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setSelectedProduct(null);
//   };

//   // إضافة دالة لإضافة المنتج إلى السلة من الدايلوج
//   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
//     if (addingToCart) return;

//     try {
//       setAddingToCart(true);
//       await addToCart(product, quantity);
//       toast.success('تمت الإضافة إلى السلة!', {
//         description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast.error('فشل الإضافة إلى السلة', {
//         description: 'يرجى المحاولة مرة أخرى.',
//         duration: 3000,
//       });
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   const getFullImageUrl = (imageUrl: string | undefined | null) => {
//     if (!imageUrl) return null;
//     if (imageUrl.startsWith('http')) return imageUrl;
//     return `http://localhost:5000${imageUrl}`;
//   };

//   const formatPrice = (price: string | number) => {
//     try {
//       const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
//       return isNaN(priceNumber) ? '0.00' : priceNumber.toLocaleString('ar-IQ', {
//         minimumFractionDigits: 2,
//         maximumFractionDigits: 2
//       });
//     } catch {
//       return '0.00';
//     }
//   };

//   const renderStars = (rating: number) => {
//     const safeRating = isNaN(rating) ? 0 : Math.max(0, Math.min(5, rating));
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-3 h-3 ${
//           index < Math.floor(safeRating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Heart className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">يجب تسجيل الدخول</h2>
//           <p className="text-gray-600 mb-6">يجب عليك تسجيل الدخول لعرض منتجاتك المفضلة</p>
//           <button 
//             onClick={() => navigate('/login')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             تسجيل الدخول
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل المفضلة...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* الهيدر */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
//         <div className="container mx-auto px-4 pt-4">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               المفضلة
//             </span>
//           </nav>

//           {/* العنوان */}
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white bg-gradient-to-br from-red-100 to-pink-100">
//               <Heart className="w-8 h-8 text-red-600 fill-current" />
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">منتجاتي المفضلة</h1>
//               <p className="text-gray-600 text-sm">
//                 {favorites.length} منتج في المفضلة
//                 {debugInfo && <span className="text-xs text-gray-400 ml-2">({debugInfo})</span>}
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-4 py-6">
//         {error && (
//           <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-3">
//             <AlertCircle className="w-5 h-5 flex-shrink-0" />
//             <div className="flex-1">
//               <p className="font-medium">{error}</p>
//               <button 
//                 onClick={() => fetchFavorites()}
//                 className="mt-1 text-red-700 hover:text-red-900 underline text-sm"
//               >
//                 إعادة المحاولة
//               </button>
//             </div>
//           </div>
//         )}

//         {favorites.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Heart className="w-12 h-12 text-red-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">لا توجد منتجات في المفضلة</h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               يمكنك إضافة المنتجات إلى المفضلة بالنقر على أيقونة القلب في أي منتج
//             </p>
//             <button 
//               onClick={() => navigate('/categories')}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//             >
//               <ShoppingBag className="w-4 h-4 inline ml-2" />
//               استعرض المنتجات
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {favorites.map((product: Product) => {
//                 // استخدام القيم الآمنة مع قيم افتراضية
//                 const fullImageUrl = getFullImageUrl(product.image_url);
//                 const productName = product.name_ar || product.name || 'منتج بدون اسم';
//                 const productDescription = product.description_ar || product.description || 'لا يوجد وصف متاح';
//                 const productRating = parseFloat(product.rating?.toString() || '0');
//                 const productReviewsCount = product.reviews_count || 0;
//                 const productPrice = product.price || '0';
//                 const productOriginalPrice = product.original_price;
//                 const productDiscount = product.discount || 0;
//                 const productInStock = product.in_stock !== false;

//                 return (
//                   <div 
//                     key={product.id} 
//                     className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px] group cursor-pointer"
//                     onClick={() => handleProductClick(product)} // تغيير هنا لتمرير المنتج كامل
//                   >
//                     {/* صورة المنتج */}
//                     <div className="relative aspect-square bg-gray-100 rounded-t-2xl overflow-hidden">
//                       {fullImageUrl ? (
//                         <img
//                           src={fullImageUrl}
//                           alt={productName}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//                           <Package className="w-12 h-12 text-gray-400 mb-2" />
//                           <span className="text-xs text-gray-500">لا توجد صورة</span>
//                         </div>
//                       )}
                      
//                       {/* زر الإزالة */}
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleRemoveFavorite(product.id);
//                         }}
//                         className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 text-red-600"
//                         title="إزالة من المفضلة"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>

//                       {/* الخصم */}
//                       {productDiscount > 0 && (
//                         <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//                           {productDiscount}% خصم
//                         </div>
//                       )}

//                       {/* حالة التوفر */}
//                       {!productInStock && (
//                         <div className="absolute bottom-3 left-3 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
//                           غير متوفر
//                         </div>
//                       )}
//                     </div>

//                     {/* معلومات المنتج */}
//                     <div className="p-4">
//                       <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
//                         {productName}
//                       </h3>
                      
//                       <p className="text-gray-600 text-xs mb-3 line-clamp-2">
//                         {productDescription}
//                       </p>

//                       {/* التقييم */}
//                       {productRating > 0 && (
//                         <div className="flex items-center gap-2 mb-3">
//                           <div className="flex items-center gap-0.5">
//                             {renderStars(productRating)}
//                           </div>
//                           <span className="text-xs text-gray-600">
//                             {productRating.toFixed(1)} ({productReviewsCount})
//                           </span>
//                         </div>
//                       )}

//                       {/* السعر */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <span className="text-lg font-bold text-green-600">
//                             {formatPrice(productPrice)} د.ع
//                           </span>
//                           {productDiscount > 0 && productOriginalPrice && (
//                             <span className="text-sm text-gray-400 line-through">
//                               {formatPrice(productOriginalPrice)} د.ع
//                             </span>
//                           )}
//                         </div>
                        
//                         <button 
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleProductClick(product); // تغيير هنا أيضاً
//                           }}
//                           className="text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
//                         >
//                           التفاصيل
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* إحصائيات الصفحة */}
//             <div className="mt-8 text-center">
//               <div className="bg-white rounded-xl p-4 border-2 border-gray-200 inline-block">
//                 <div className="flex items-center gap-6 text-sm text-gray-600">
//                   <span className="flex items-center gap-2">
//                     <Heart className="w-4 h-4 text-red-500 fill-current" />
//                     <span>
//                       <span className="font-bold text-blue-600">{favorites.length}</span> منتج في المفضلة
//                     </span>
//                   </span>
                  
//                   {/* عدد المنتجات المتوفرة */}
//                   <span className="flex items-center gap-2">
//                     <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                     <span>
//                       <span className="font-bold text-green-600">
//                         {favorites.filter(product => product.in_stock !== false).length}
//                       </span> منتج متوفر
//                     </span>
//                   </span>

//                   {/* عدد المنتجات المخفضة */}
//                   {favorites.filter(product => (product.discount || 0) > 0).length > 0 && (
//                     <span className="flex items-center gap-2">
//                       <span className="w-2 h-2 bg-red-500 rounded-full"></span>
//                       <span>
//                         <span className="font-bold text-red-600">
//                           {favorites.filter(product => (product.discount || 0) > 0).length}
//                         </span> منتج مخفض
//                       </span>
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* إضافة الدايلوج هنا */}
//         <ProductDetailDialog
//           product={selectedProduct}
//           open={isDialogOpen}
//           onOpenChange={setIsDialogOpen}
//           onAddToCart={handleAddToCartFromDialog}
//         />
//       </main>
//     </div>
//   );
// };

// export default FavoritesPage;







// pages/FavoritesPage.tsx
import React, { useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { Heart, ArrowRight, Home, Loader2, Trash2, ShoppingBag, Star, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../api/types/product.types';
import ProductDetailDialog from '../components/App-components/Product/Productdaialog';
import { toast } from 'sonner';

const FavoritesPage: React.FC = () => {
  const { 
    favorites, 
    loading, 
    error, 
    removeFromFavorites, 
    refetch 
  } = useFavorites();
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [addingToCart, setAddingToCart] = React.useState(false);

  useEffect(() => {
    if (favorites.length > 0) {
      console.log('✅ Loaded favorites from server:', favorites.length);
    }
  }, [favorites]);

  const handleRemoveFavorite = async (productId: number) => {
    try {
      await removeFromFavorites(productId);
      toast.success('تم الإزالة من المفضلة');
    } catch (err) {
      console.error('Error removing favorite:', err);
      toast.error('فشل الإزالة من المفضلة');
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
    if (addingToCart) return;

    try {
      setAddingToCart(true);
      await addToCart(product, quantity);
      toast.success('تمت الإضافة إلى السلة!');
    } catch (error) {
      toast.error('فشل الإضافة إلى السلة');
    } finally {
      setAddingToCart(false);
    }
  };

  const getFullImageUrl = (imageUrl: string | undefined | null) => {
    if (!imageUrl) return null;
    if (imageUrl.startsWith('http')) return imageUrl;
    return `http://localhost:5000${imageUrl}`;
  };

  const formatPrice = (price: string | number) => {
    try {
      const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
      return isNaN(priceNumber) ? '0.00' : priceNumber.toLocaleString('ar-IQ', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } catch {
      return '0.00';
    }
  };

  const renderStars = (rating: number) => {
    const safeRating = isNaN(rating) ? 0 : Math.max(0, Math.min(5, rating));
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(safeRating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">يجب تسجيل الدخول</h2>
          <p className="text-gray-600 mb-6">يجب عليك تسجيل الدخول لعرض منتجاتك المفضلة</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-medium">جاري تحميل المفضلة...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20">
      {/* الهيدر */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 pt-4">
          {/* مسار التنقل */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
            >
              <Home className="w-4 h-4" />
              الرئيسية
            </button>
            <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
            <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              المفضلة
            </span>
          </nav>

          {/* العنوان */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white bg-gradient-to-br from-red-100 to-pink-100">
              <Heart className="w-8 h-8 text-red-600 fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">منتجاتي المفضلة</h1>
              <p className="text-gray-600 text-sm">
                {favorites.length} منتج في المفضلة
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 py-6">
        {favorites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">لا توجد منتجات في المفضلة</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              يمكنك إضافة المنتجات إلى المفضلة بالنقر على أيقونة القلب في أي منتج
            </p>
            <button 
              onClick={() => navigate('/categories')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <ShoppingBag className="w-4 h-4 inline ml-2" />
              استعرض المنتجات
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product: Product) => {
                const fullImageUrl = getFullImageUrl(product.image_url);
                const productName = product.name_ar || product.name || 'منتج بدون اسم';
                const productDescription = product.description_ar || product.description || 'لا يوجد وصف متاح';
                const productRating = parseFloat(product.rating?.toString() || '0');
                const productReviewsCount = product.reviews_count || 0;
                const productPrice = product.price || '0';
                const productOriginalPrice = product.original_price;
                const productDiscount = product.discount || 0;
                const productInStock = product.in_stock !== false;

                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px] group cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* صورة المنتج */}
                    <div className="relative aspect-square bg-gray-100 rounded-t-2xl overflow-hidden">
                      {fullImageUrl ? (
                        <img
                          src={fullImageUrl}
                          alt={productName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                          <Package className="w-12 h-12 text-gray-400 mb-2" />
                          <span className="text-xs text-gray-500">لا توجد صورة</span>
                        </div>
                      )}
                      
                      {/* زر الإزالة */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFavorite(product.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 text-red-600"
                        title="إزالة من المفضلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      {/* الخصم */}
                      {productDiscount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {productDiscount}% خصم
                        </div>
                      )}

                      {/* حالة التوفر */}
                      {!productInStock && (
                        <div className="absolute bottom-3 left-3 bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                          غير متوفر
                        </div>
                      )}
                    </div>

                    {/* معلومات المنتج */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                        {productName}
                      </h3>
                      
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {productDescription}
                      </p>

                      {/* التقييم */}
                      {productRating > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-0.5">
                            {renderStars(productRating)}
                          </div>
                          <span className="text-xs text-gray-600">
                            {productRating.toFixed(1)} ({productReviewsCount})
                          </span>
                        </div>
                      )}

                      {/* السعر */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600">
                            {formatPrice(productPrice)} د.ع
                          </span>
                          {productDiscount > 0 && productOriginalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(productOriginalPrice)} د.ع
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                        >
                          التفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* الدايلوج */}
        <ProductDetailDialog
          product={selectedProduct}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddToCart={handleAddToCartFromDialog}
        />
      </main>
    </div>
  );
};

export default FavoritesPage;