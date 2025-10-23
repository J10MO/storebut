// // import React, { useState } from 'react';
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// //   CardHeader,
// // } from '../../ui/card';
// // import { Button } from '../../ui/button';
// // import { Badge } from '../../ui/badge';
// // import type { Product } from '../../../api/types/product.types';
// // import { useCart } from '../../../hooks/useCart';
// // import ProductDetailDialog from '../Product/Productdaialog';
// // import { ShoppingCart, Eye, Star, Package, Loader2, Heart, Zap } from 'lucide-react';
// // import { toast } from 'sonner';

// // interface ProductCardProps {
// //   product: Product;
// //   variant?: 'vertical' | 'horizontal';
// // }

// // const Catpro: React.FC<ProductCardProps> = ({ 
// //   product, 
// //   variant = 'vertical' 
// // }) => {
// //   const { addToCart, isLoading } = useCart();
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [isAddingToCart, setIsAddingToCart] = useState(false);
// //   const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [imageError, setImageError] = useState(false);
// //   const [imageLoading, setImageLoading] = useState(true);

// //   const handleAddToCart = async (e: React.MouseEvent) => {
// //     e.stopPropagation();
    
// //     if (!product.in_stock || isAddingToCart) return;

// //     try {
// //       setIsAddingToCart(true);
// //       await addToCart(product, 1);
// //       toast.success('تمت الإضافة إلى السلة!', {
// //         description: `${product.name_ar || product.name}`,
// //         duration: 3000,
// //       });
// //     } catch (error) {
// //       toast.error('فشل الإضافة إلى السلة', {
// //         description: 'يرجى المحاولة مرة أخرى.',
// //         duration: 3000,
// //       });
// //     } finally {
// //       setIsAddingToCart(false);
// //     }
// //   };

// //   const handleViewDetails = (e?: React.MouseEvent) => {
// //     e?.stopPropagation();
// //     setIsDialogOpen(true);
// //   };

// //   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
// //     try {
// //       await addToCart(product, quantity);
// //       toast.success('تمت الإضافة إلى السلة!', {
// //         description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
// //         duration: 3000,
// //       });
// //     } catch (error) {
// //       toast.error('فشل الإضافة إلى السلة', {
// //         description: 'يرجى المحاولة مرة أخرى.',
// //         duration: 3000,
// //       });
// //     }
// //   };

// //   const toggleWishlist = (e: React.MouseEvent) => {
// //     e.stopPropagation();
// //     setIsWishlisted(!isWishlisted);
// //     toast.success(isWishlisted ? 'تم الإزالة من المفضلة' : 'تم الإضافة إلى المفضلة');
// //   };

// //   const handleImageError = () => {
// //     setImageError(true);
// //     setImageLoading(false);
// //   };

// //   const handleImageLoad = () => {
// //     setImageError(false);
// //     setImageLoading(false);
// //   };

// //   const getFullImageUrl = (imageUrl: string | null) => {
// //     if (!imageUrl) return null;
    
// //     if (imageUrl.startsWith('http')) {
// //       return imageUrl;
// //     }
    
// //     if (imageUrl.startsWith('/')) {
// //       return `http://localhost:5000${imageUrl}`;
// //     }
    
// //     return `http://localhost:5000/uploads/products/${imageUrl}`;
// //   };

// //   const fullImageUrl = getFullImageUrl(product.image_url);

// //   const renderStars = (rating: number) => {
// //     return Array.from({ length: 5 }, (_, index) => (
// //       <Star
// //         key={index}
// //         className={`w-3 h-3 ${
// //           index < Math.floor(rating)
// //             ? 'fill-yellow-400 text-yellow-400'
// //             : 'text-gray-300'
// //         }`}
// //       />
// //     ));
// //   };

// //   const formatPrice = (price: string) => {
// //     return parseFloat(price).toLocaleString('ar-IQ', {
// //       minimumFractionDigits: 2,
// //       maximumFractionDigits: 2
// //     });
// //   };

// //   const calculateDiscount = () => {
// //     if (product.discount > 0 && product.original_price) {
// //       const original = parseFloat(product.original_price);
// //       const current = parseFloat(product.price);
// //       return original - current;
// //     }
// //     return 0;
// //   };

// //   // العرض الأفقي
// //   if (variant === 'horizontal') {
// //     return (
// //       <>
// //         <Card 
// //           className="flex flex-row hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl h-32 overflow-hidden group"
// //           onClick={() => handleViewDetails()}
// //         >
// //           {/* الصورة */}
// //           <div className="relative w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0">
// //             {fullImageUrl && !imageError ? (
// //               <>
// //                 {imageLoading && (
// //                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
// //                     <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
// //                   </div>
// //                 )}
// //                 <img
// //                   src={fullImageUrl}
// //                   alt={product.name}
// //                   className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
// //                     imageLoading ? 'opacity-0' : 'opacity-100'
// //                   }`}
// //                   loading="lazy"
// //                   onError={handleImageError}
// //                   onLoad={handleImageLoad}
// //                 />
// //               </>
// //             ) : (
// //               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
// //                 {product.emoji_icon ? (
// //                   <span className="text-2xl">{product.emoji_icon}</span>
// //                 ) : (
// //                   <Package className="w-8 h-8 text-gray-400" />
// //                 )}
// //               </div>
// //             )}
            
// //             {/* البادجات على الصورة */}
// //             <div className="absolute top-2 left-2 flex flex-col gap-1">
// //               {product.badge && (
// //                 <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">
// //                   {product.badge}
// //                 </Badge>
// //               )}
// //               {product.discount > 0 && (
// //                 <Badge className="bg-red-600 text-white text-xs px-2 py-0.5">
// //                   {product.discount}%
// //                 </Badge>
// //               )}
// //             </div>
// //           </div>

// //           {/* المحتوى */}
// //           <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
// //             <div className="flex-1">
// //               <div className="flex items-start justify-between">
// //                 <h3 className="font-semibold text-base line-clamp-2 text-gray-900 leading-tight flex-1">
// //                   {product.name_ar || product.name}
// //                 </h3>
// //                 <button
// //                   onClick={toggleWishlist}
// //                   className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
// //                 >
// //                   <Heart
// //                     className={`w-4 h-4 transition-all ${
// //                       isWishlisted ? 'fill-red-500 text-red-500' : ''
// //                     }`}
// //                   />
// //                 </button>
// //               </div>
              
// //               {/* التقييم */}
// //               <div className="flex items-center gap-2 mt-2">
// //                 <div className="flex items-center gap-0.5">
// //                   {renderStars(parseFloat(product.rating))}
// //                 </div>
// //                 <span className="text-xs text-gray-600">
// //                   {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between mt-2">
// //               <div className="flex items-center gap-2">
// //                 <span className="text-lg font-bold text-green-600">
// //                   {formatPrice(product.price)} د.ع
// //                 </span>
// //                 {product.discount > 0 && product.original_price && (
// //                   <span className="text-sm text-gray-400 line-through">
// //                     {formatPrice(product.original_price)} د.ع
// //                   </span>
// //                 )}
// //               </div>
              
// //               <div className="flex items-center gap-2">
// //                 <Button
// //                   onClick={handleViewDetails}
// //                   variant="outline"
// //                   size="sm"
// //                   className="h-8 text-xs"
// //                 >
// //                   <Eye className="w-3 h-3 ml-1" />
// //                   عرض
// //                 </Button>
// //                 <Button
// //                   onClick={handleAddToCart}
// //                   disabled={!product.in_stock || isAddingToCart || isLoading}
// //                   className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs"
// //                 >
// //                   {isAddingToCart ? (
// //                     <Loader2 className="w-3 h-3 animate-spin" />
// //                   ) : product.in_stock ? (
// //                     <ShoppingCart className="w-3 h-3" />
// //                   ) : (
// //                     'غير متوفر'
// //                   )}
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </Card>

// //         <ProductDetailDialog
// //           product={product}
// //           open={isDialogOpen}
// //           onOpenChange={setIsDialogOpen}
// //           onAddToCart={handleAddToCartFromDialog}
// //         />
// //       </>
// //     );
// //   }

// //   // العرض العمودي (الإفتراضي)
// //   return (
// //     <>
// //       <Card
// //         className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-2xl"
// //         onClick={() => handleViewDetails()}
// //       >
// //         {/* البادجات */}
// //         <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
// //           {product.badge && (
// //             <Badge className="bg-blue-600 text-white text-xs px-2 py-1 shadow-lg">
// //               <Zap className="w-3 h-3 ml-1" />
// //               {product.badge}
// //             </Badge>
// //           )}
// //           {product.discount > 0 && (
// //             <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-2 py-1 shadow-lg">
// //               {product.discount}% خصم
// //             </Badge>
// //           )}
// //         </div>

// //         {/* زر المفضلة */}
// //         <button
// //           onClick={toggleWishlist}
// //           className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
// //         >
// //           <Heart
// //             className={`w-4 h-4 transition-all ${
// //               isWishlisted 
// //                 ? 'fill-red-500 text-red-500 scale-110' 
// //                 : 'text-gray-600 group-hover:text-red-400'
// //             }`}
// //           />
// //         </button>

// //         {/* حالة التوفر */}
// //         {!product.in_stock && (
// //           <div className="absolute top-12 right-3 z-10">
// //             <Badge variant="destructive" className="text-xs px-2 py-1 bg-gray-500">
// //               غير متوفر
// //             </Badge>
// //           </div>
// //         )}

// //         {/* صورة المنتج */}
// //         <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
// //           {fullImageUrl && !imageError ? (
// //             <>
// //               {imageLoading && (
// //                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
// //                   <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
// //                 </div>
// //               )}
// //               <img
// //                 src={fullImageUrl}
// //                 alt={product.name}
// //                 className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
// //                   imageLoading ? 'opacity-0' : 'opacity-100'
// //                 }`}
// //                 loading="lazy"
// //                 onError={handleImageError}
// //                 onLoad={handleImageLoad}
// //               />
// //             </>
// //           ) : (
// //             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
// //               {product.emoji_icon ? (
// //                 <span className="text-4xl transition-transform duration-300 group-hover:scale-110 mb-2">
// //                   {product.emoji_icon}
// //                 </span>
// //               ) : (
// //                 <Package className="w-12 h-12 text-gray-400 mb-2" />
// //               )}
// //               <span className="text-xs text-gray-500 text-center">
// //                 {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
// //               </span>
// //             </div>
// //           )}

// //           {/* طبقة hover */}
// //           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

// //           {/* زر العرض السريع */}
// //           <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
// //             <Button
// //               size="sm"
// //               className="h-9 text-xs bg-black/80 hover:bg-black text-white backdrop-blur-sm border-0"
// //               onClick={(e) => handleViewDetails(e)}
// //             >
// //               <Eye className="w-3 h-3 ml-1" />
// //               عرض سريع
// //             </Button>
// //           </div>
// //         </div>

// //         {/* محتوى البطاقة */}
// //         <CardHeader className="pb-3 px-5 pt-5">
// //           <h3 className="font-bold text-base line-clamp-2 text-gray-900 leading-tight min-h-[2.5rem] text-right">
// //             {product.name_ar || product.name}
// //           </h3>
// //           <p className="text-xs text-gray-600 line-clamp-1 mt-1 text-right">
// //             {product.name}
// //           </p>
// //         </CardHeader>

// //         <CardContent className="pb-3 px-5 space-y-3">
// //           {/* التقييم */}
// //           <div className="flex items-center gap-2 justify-end">
// //             <span className="text-xs text-gray-600">
// //               ({product.reviews_count})
// //             </span>
// //             <span className="text-xs text-gray-600">
// //               {parseFloat(product.rating).toFixed(1)}
// //             </span>
// //             <div className="flex items-center gap-0.5">
// //               {renderStars(parseFloat(product.rating))}
// //             </div>
// //           </div>

// //           {/* السعر */}
// //           <div className="space-y-2 text-right">
// //             <div className="flex items-center gap-2 justify-end">
// //               {product.discount > 0 && product.original_price && (
// //                 <span className="text-sm text-gray-400 line-through">
// //                   {formatPrice(product.original_price)} د.ع
// //                 </span>
// //               )}
// //               <span className="text-xl font-bold text-green-600">
// //                 {formatPrice(product.price)} د.ع
// //               </span>
// //             </div>
// //             {product.discount > 0 && product.original_price && (
// //               <p className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded-full inline-block">
// //                 وفر {formatPrice(calculateDiscount().toString())} د.ع
// //               </p>
// //             )}
// //           </div>
// //         </CardContent>

// //         <CardFooter className="pt-0 px-5 pb-5">
// //           <Button
// //             onClick={handleAddToCart}
// //             disabled={!product.in_stock || isAddingToCart || isLoading}
// //             className={`w-full h-11 text-sm transition-all duration-300 rounded-xl font-semibold ${
// //               product.in_stock
// //                 ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
// //                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
// //             }`}
// //           >
// //             {isAddingToCart ? (
// //               <>
// //                 <Loader2 className="w-4 h-4 ml-2 animate-spin" />
// //                 جاري الإضافة...
// //               </>
// //             ) : product.in_stock ? (
// //               <>
// //                 <ShoppingCart className="w-4 h-4 ml-2" />
// //                 أضف إلى السلة
// //               </>
// //             ) : (
// //               'غير متوفر'
// //             )}
// //           </Button>
// //         </CardFooter>
// //       </Card>

// //       {/* ديالوج تفاصيل المنتج */}
// //       <ProductDetailDialog
// //         product={product}
// //         open={isDialogOpen}
// //         onOpenChange={setIsDialogOpen}
// //         onAddToCart={handleAddToCartFromDialog}
// //       />
// //     </>
// //   );
// // };

// // export default Catpro;


// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../../ui/card';
// import { Button } from '../../ui/button';
// import { Badge } from '../../ui/badge';
// import type { Product } from '../../../api/types/product.types';
// import { useCart } from '../../../hooks/useCart';
// import ProductDetailDialog from '../Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2, Heart, Zap } from 'lucide-react';
// import { toast } from 'sonner';
// const API_BASE_URL = import.meta.env.VITE_API_URL
// interface ProductCardProps {
//   product: Product;
//   variant?: 'vertical' | 'horizontal';
// }

// const Catpro: React.FC<ProductCardProps> = ({ 
//   product, 
//   variant = 'vertical' 
// }) => {
//   const { addToCart, isLoading } = useCart();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!product.in_stock || isAddingToCart) return;

//     try {
//       setIsAddingToCart(true);
//       await addToCart(product, 1);
//       toast.success('تمت الإضافة إلى السلة!', {
//         description: `${product.name_ar || product.name}`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast.error('فشل الإضافة إلى السلة', {
//         description: 'يرجى المحاولة مرة أخرى.',
//         duration: 3000,
//       });
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleViewDetails = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setIsDialogOpen(true);
//   };

//   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
//     try {
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
//     }
//   };

//   const toggleWishlist = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);
//     toast.success(isWishlisted ? 'تم الإزالة من المفضلة' : 'تم الإضافة إلى المفضلة');
//   };

//   const handleImageError = () => {
//     setImageError(true);
//     setImageLoading(false);
//   };

//   const handleImageLoad = () => {
//     setImageError(false);
//     setImageLoading(false);
//   };

//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/products/${imageUrl}`;
//   };

//   const fullImageUrl = getFullImageUrl(product.image_url);

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-3 h-3 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   const formatPrice = (price: string) => {
//     return parseFloat(price).toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   };

//   const calculateDiscount = () => {
//     if (product.discount > 0 && product.original_price) {
//       const original = parseFloat(product.original_price);
//       const current = parseFloat(product.price);
//       return original - current;
//     }
//     return 0;
//   };

//   // العرض الأفقي
//   if (variant === 'horizontal') {
//     return (
//       <>
//         <Card 
//           className="flex flex-row hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-2xl h-40 overflow-hidden group shadow-sm hover:border-blue-200"
//           onClick={() => handleViewDetails()}
//         >
//           {/* الصورة */}
//           <div className="relative w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
//             {fullImageUrl && !imageError ? (
//               <>
//                 {imageLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
//                   </div>
//                 )}
//                 <img
//                   src={fullImageUrl}
//                   alt={product.name}
//                   className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
//                     imageLoading ? 'opacity-0' : 'opacity-100'
//                   }`}
//                   loading="lazy"
//                   onError={handleImageError}
//                   onLoad={handleImageLoad}
//                 />
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//                 {product.emoji_icon ? (
//                   <span className="text-3xl">{product.emoji_icon}</span>
//                 ) : (
//                   <Package className="w-12 h-12 text-gray-400" />
//                 )}
//               </div>
//             )}
            
//             {/* البادجات على الصورة */}
//             <div className="absolute top-3 left-3 flex flex-col gap-2">
//               {product.badge && (
//                 <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1 rounded-full shadow-lg border-0">
//                   {product.badge}
//                 </Badge>
//               )}
//               {product.discount > 0 && (
//                 <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-lg border-0">
//                   {product.discount}%
//                 </Badge>
//               )}
//             </div>

//             {/* زر المفضلة */}
//             <button
//               onClick={toggleWishlist}
//               className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
//             >
//               <Heart
//                 className={`w-4 h-4 transition-all ${
//                   isWishlisted 
//                     ? 'fill-red-500 text-red-500 scale-110' 
//                     : 'text-gray-600 group-hover:text-red-400'
//                 }`}
//               />
//             </button>
//           </div>

//           {/* المحتوى */}
//           <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
//             <div className="flex-1">
//               <div className="flex items-start justify-between mb-3">
//                 <h3 className="font-bold text-lg line-clamp-2 text-gray-900 leading-tight flex-1 text-right">
//                   {product.name_ar || product.name}
//                 </h3>
//               </div>
              
//               {/* التقييم */}
//               <div className="flex items-center gap-2 mb-3 justify-end">
//                 <span className="text-xs text-gray-600">
//                   ({product.reviews_count})
//                 </span>
//                 <span className="text-xs text-gray-600">
//                   {parseFloat(product.rating).toFixed(1)}
//                 </span>
//                 <div className="flex items-center gap-0.5">
//                   {renderStars(parseFloat(product.rating))}
//                 </div>
//               </div>

//               {/* السعر */}
//               <div className="space-y-2 text-right mb-4">
//                 <div className="flex items-center gap-2 justify-end">
//                   {product.discount > 0 && product.original_price && (
//                     <span className="text-sm text-gray-400 line-through">
//                       {formatPrice(product.original_price)} د.ع
//                     </span>
//                   )}
//                   <span className="text-xl font-bold text-green-600">
//                     {formatPrice(product.price)} د.ع
//                   </span>
//                 </div>
//                 {product.discount > 0 && product.original_price && (
//                   <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full inline-block">
//                     وفر {formatPrice(calculateDiscount().toString())} د.ع
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {!product.in_stock && (
//                   <Badge variant="destructive" className="text-xs px-3 py-1 bg-gray-500 border-0">
//                     غير متوفر
//                   </Badge>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <Button
//                   onClick={handleViewDetails}
//                   variant="outline"
//                   size="sm"
//                   className="h-10 px-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600"
//                 >
//                   <Eye className="w-4 h-4 ml-2" />
//                   عرض
//                 </Button>
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={!product.in_stock || isAddingToCart || isLoading}
//                   className="h-10 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   {isAddingToCart ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : product.in_stock ? (
//                     <ShoppingCart className="w-4 h-4" />
//                   ) : (
//                     'غير متوفر'
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Card>

//         <ProductDetailDialog
//           product={product}
//           open={isDialogOpen}
//           onOpenChange={setIsDialogOpen}
//           onAddToCart={handleAddToCartFromDialog}
//         />
//       </>
//     );
//   }

//   // العرض العمودي (2 كارت في الصف)
//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-gray-200/60 bg-white rounded-3xl shadow-lg hover:border-blue-200/80"
//         onClick={() => handleViewDetails()}
//       >
//         {/* البادجات */}
//         <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//           {product.badge && (
//             <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0">
//               <Zap className="w-3 h-3 ml-1" />
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0">
//               {product.discount}% خصم
//             </Badge>
//           )}
//         </div>

//         {/* زر المفضلة */}
//         <button
//           onClick={toggleWishlist}
//           className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50"
//         >
//           <Heart
//             className={`w-4 h-4 transition-all ${
//               isWishlisted 
//                 ? 'fill-red-500 text-red-500 scale-110' 
//                 : 'text-gray-600 group-hover:text-red-400'
//             }`}
//           />
//         </button>

//         {/* حالة التوفر */}
//         {!product.in_stock && (
//           <div className="absolute top-16 right-4 z-10">
//             <Badge className="text-xs px-3 py-1.5 bg-gray-500/90 text-white rounded-full shadow-lg border-0 backdrop-blur-sm">
//               غير متوفر
//             </Badge>
//           </div>
//         )}

//         {/* صورة المنتج */}
//         <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//           {fullImageUrl && !imageError ? (
//             <>
//               {imageLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                   <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
//                 </div>
//               )}
//               <img
//                 src={fullImageUrl}
//                 alt={product.name}
//                 className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
//                   imageLoading ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 loading="lazy"
//                 onError={handleImageError}
//                 onLoad={handleImageLoad}
//               />
//             </>
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
//               {product.emoji_icon ? (
//                 <span className="text-5xl transition-transform duration-300 group-hover:scale-110 mb-3">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-16 h-16 text-gray-400 mb-3" />
//               )}
//               <span className="text-sm text-gray-500 text-center">
//                 {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
//               </span>
//             </div>
//           )}

//           {/* طبقة hover */}
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />

//           {/* زر العرض السريع */}
//           <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
//             <Button
//               size="sm"
//               className="h-10 text-sm bg-black/80 hover:bg-black text-white backdrop-blur-sm border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               onClick={(e) => handleViewDetails(e)}
//             >
//               <Eye className="w-4 h-4 ml-2" />
//               عرض سريع
//             </Button>
//           </div>
//         </div>

//         {/* محتوى البطاقة */}
//         <CardHeader className="pb-4 px-6 pt-6">
//           <h3 className="font-bold text-lg line-clamp-2 text-gray-900 leading-tight min-h-[3rem] text-right">
//             {product.name_ar || product.name}
//           </h3>
//           <p className="text-sm text-gray-600 line-clamp-1 mt-2 text-right">
//             {product.name}
//           </p>
//         </CardHeader>

//         <CardContent className="pb-4 px-6 space-y-4">
//           {/* التقييم */}
//           <div className="flex items-center gap-2 justify-end">
//             <span className="text-sm text-gray-600">
//               ({product.reviews_count})
//             </span>
//             <span className="text-sm text-gray-600">
//               {parseFloat(product.rating).toFixed(1)}
//             </span>
//             <div className="flex items-center gap-1">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//           </div>

//           {/* السعر */}
//           <div className="space-y-3 text-right">
//             <div className="flex items-center gap-3 justify-end">
//               {product.discount > 0 && product.original_price && (
//                 <span className="text-base text-gray-400 line-through">
//                   {formatPrice(product.original_price)} د.ع
//                 </span>
//               )}
//               <span className="text-2xl font-bold text-green-600">
//                 {formatPrice(product.price)} د.ع
//               </span>
//             </div>
//             {product.discount > 0 && product.original_price && (
//               <p className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-xl inline-block border border-red-100">
//                 وفر {formatPrice(calculateDiscount().toString())} د.ع
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0 px-6 pb-6">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full h-12 text-base transition-all duration-500 rounded-2xl font-bold shadow-lg hover:shadow-xl ${
//               product.in_stock
//                 ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed hover:scale-100'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-5 h-5 ml-3 animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-5 h-5 ml-3" />
//                 أضف إلى السلة
//               </>
//             ) : (
//               'غير متوفر'
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* ديالوج تفاصيل المنتج */}
//       <ProductDetailDialog
//         product={product}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         onAddToCart={handleAddToCartFromDialog}
//       />
//     </>
//   );
// };

// export default Catpro;





// // Catpro.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../../ui/card';
// import { Button } from '../../ui/button';
// import { Badge } from '../../ui/badge';
// import type { Product } from '../../../api/types/product.types';
// import { useCart } from '../../../hooks/useCart';
// import { useFavorites } from '../../../hooks/useFavorites';
// import { useAuth } from '../../../hooks/useAuth';
// import ProductDetailDialog from '../Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2, Heart, Zap } from 'lucide-react';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = import.meta.env.VITE_API_URL

// interface ProductCardProps {
//   product: Product;
//   variant?: 'vertical' | 'horizontal';
// }

// const Catpro: React.FC<ProductCardProps> = ({ 
//   product, 
//   variant = 'vertical' 
// }) => {
//   const { addToCart, isLoading } = useCart();
//   const { toggleFavorite, checkIsFavorite } = useFavorites();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);

//   // التحقق من حالة المفضلة عند تحميل المكون
//   useEffect(() => {
//     const checkFavoriteStatus = async () => {
//       if (isAuthenticated) {
//         try {
//           const favoriteStatus = await checkIsFavorite(product.id);
//           setIsWishlisted(favoriteStatus);
//         } catch (error) {
//           console.error('Error checking favorite status:', error);
//         }
//       }
//     };
    
//     checkFavoriteStatus();
//   }, [product.id, isAuthenticated, checkIsFavorite]);

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!product.in_stock || isAddingToCart) return;

//     try {
//       setIsAddingToCart(true);
//       await addToCart(product, 1);
//       toast.success('تمت الإضافة إلى السلة!', {
//         description: `${product.name_ar || product.name}`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast.error('فشل الإضافة إلى السلة', {
//         description: 'يرجى المحاولة مرة أخرى.',
//         duration: 3000,
//       });
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleViewDetails = (e?: React.MouseEvent) => {
//     e?.stopPropagation();
//     setIsDialogOpen(true);
//   };

//   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
//     try {
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
//     }
//   };

//   const toggleWishlist = async (e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     setIsFavoriteLoading(true);
//     try {
//       const newFavoriteStatus = await toggleFavorite(product.id);
//       setIsWishlisted(newFavoriteStatus);
      
//       if (newFavoriteStatus) {
//         toast.success('تم الإضافة إلى المفضلة', {
//           description: product.name_ar || product.name,
//           duration: 3000,
//         });
//       } else {
//         toast.success('تم الإزالة من المفضلة', {
//           description: product.name_ar || product.name,
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//       toast.error('فشل في العملية', {
//         description: 'يرجى المحاولة مرة أخرى.',
//         duration: 3000,
//       });
//     } finally {
//       setIsFavoriteLoading(false);
//     }
//   };

//   const handleImageError = () => {
//     setImageError(true);
//     setImageLoading(false);
//   };

//   const handleImageLoad = () => {
//     setImageError(false);
//     setImageLoading(false);
//   };

//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/products/${imageUrl}`;
//   };

//   const fullImageUrl = getFullImageUrl(product.image_url);

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-3 h-3 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   const formatPrice = (price: string) => {
//     return parseFloat(price).toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   };

//   const calculateDiscount = () => {
//     if (product.discount > 0 && product.original_price) {
//       const original = parseFloat(product.original_price);
//       const current = parseFloat(product.price);
//       return original - current;
//     }
//     return 0;
//   };

//   // العرض الأفقي
//   if (variant === 'horizontal') {
//     return (
//       <>
//         <Card 
//           className="flex flex-row hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-2xl h-40 overflow-hidden group shadow-sm hover:border-blue-200"
//           onClick={() => handleViewDetails()}
//         >
//           {/* الصورة */}
//           <div className="relative w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
//             {fullImageUrl && !imageError ? (
//               <>
//                 {imageLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
//                   </div>
//                 )}
//                 <img
//                   src={fullImageUrl}
//                   alt={product.name}
//                   className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
//                     imageLoading ? 'opacity-0' : 'opacity-100'
//                   }`}
//                   loading="lazy"
//                   onError={handleImageError}
//                   onLoad={handleImageLoad}
//                 />
//               </>
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//                 {product.emoji_icon ? (
//                   <span className="text-3xl">{product.emoji_icon}</span>
//                 ) : (
//                   <Package className="w-12 h-12 text-gray-400" />
//                 )}
//               </div>
//             )}
            
//             {/* البادجات على الصورة */}
//             <div className="absolute top-3 left-3 flex flex-col gap-2">
//               {product.badge && (
//                 <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1 rounded-full shadow-lg border-0">
//                   {product.badge}
//                 </Badge>
//               )}
//               {product.discount > 0 && (
//                 <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-lg border-0">
//                   {product.discount}%
//                 </Badge>
//               )}
//             </div>

//             {/* زر المفضلة */}
//             <button
//               onClick={toggleWishlist}
//               disabled={isFavoriteLoading}
//               className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-50"
//             >
//               <Heart
//                 className={`w-4 h-4 transition-all ${
//                   isWishlisted 
//                     ? 'fill-red-500 text-red-500 scale-110' 
//                     : 'text-gray-600 group-hover:text-red-400'
//                 } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
//               />
//             </button>
//           </div>

//           {/* المحتوى */}
//           <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
//             <div className="flex-1">
//               <div className="flex items-start justify-between mb-3">
//                 <h3 className="font-bold text-lg line-clamp-2 text-gray-900 leading-tight flex-1 text-right">
//                   {product.name_ar || product.name}
//                 </h3>
//               </div>
              
//               {/* التقييم */}
//               <div className="flex items-center gap-2 mb-3 justify-end">
//                 <span className="text-xs text-gray-600">
//                   ({product.reviews_count})
//                 </span>
//                 <span className="text-xs text-gray-600">
//                   {parseFloat(product.rating).toFixed(1)}
//                 </span>
//                 <div className="flex items-center gap-0.5">
//                   {renderStars(parseFloat(product.rating))}
//                 </div>
//               </div>

//               {/* السعر */}
//               <div className="space-y-2 text-right mb-4">
//                 <div className="flex items-center gap-2 justify-end">
//                   {product.discount > 0 && product.original_price && (
//                     <span className="text-sm text-gray-400 line-through">
//                       {formatPrice(product.original_price)} د.ع
//                     </span>
//                   )}
//                   <span className="text-xl font-bold text-green-600">
//                     {formatPrice(product.price)} د.ع
//                   </span>
//                 </div>
//                 {product.discount > 0 && product.original_price && (
//                   <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full inline-block">
//                     وفر {formatPrice(calculateDiscount().toString())} د.ع
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 {!product.in_stock && (
//                   <Badge variant="destructive" className="text-xs px-3 py-1 bg-gray-500 border-0">
//                     غير متوفر
//                   </Badge>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-3">
//                 <Button
//                   onClick={handleViewDetails}
//                   variant="outline"
//                   size="sm"
//                   className="h-10 px-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600"
//                 >
//                   <Eye className="w-4 h-4 ml-2" />
//                   عرض
//                 </Button>
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={!product.in_stock || isAddingToCart || isLoading}
//                   className="h-10 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//                 >
//                   {isAddingToCart ? (
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                   ) : product.in_stock ? (
//                     <ShoppingCart className="w-4 h-4" />
//                   ) : (
//                     'غير متوفر'
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Card>

//         <ProductDetailDialog
//           product={product}
//           open={isDialogOpen}
//           onOpenChange={setIsDialogOpen}
//           onAddToCart={handleAddToCartFromDialog}
//         />
//       </>
//     );
//   }

//   // العرض العمودي (2 كارت في الصف)
//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-gray-200/60 bg-white rounded-3xl shadow-lg hover:border-blue-200/80"
//         onClick={() => handleViewDetails()}
//       >
//         {/* البادجات */}
//         <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//           {product.badge && (
//             <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0">
//               <Zap className="w-3 h-3 ml-1" />
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0">
//               {product.discount}% خصم
//             </Badge>
//           )}
//         </div>

//         {/* زر المفضلة */}
//         <button
//           onClick={toggleWishlist}
//           disabled={isFavoriteLoading}
//           className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50 disabled:opacity-50"
//         >
//           <Heart
//             className={`w-4 h-4 transition-all ${
//               isWishlisted 
//                 ? 'fill-red-500 text-red-500 scale-110' 
//                 : 'text-gray-600 group-hover:text-red-400'
//             } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
//           />
//         </button>

//         {/* حالة التوفر */}
//         {!product.in_stock && (
//           <div className="absolute top-16 right-4 z-10">
//             <Badge className="text-xs px-3 py-1.5 bg-gray-500/90 text-white rounded-full shadow-lg border-0 backdrop-blur-sm">
//               غير متوفر
//             </Badge>
//           </div>
//         )}

//         {/* صورة المنتج */}
//         <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
//           {fullImageUrl && !imageError ? (
//             <>
//               {imageLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                   <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
//                 </div>
//               )}
//               <img
//                 src={fullImageUrl}
//                 alt={product.name}
//                 className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
//                   imageLoading ? 'opacity-0' : 'opacity-100'
//                 }`}
//                 loading="lazy"
//                 onError={handleImageError}
//                 onLoad={handleImageLoad}
//               />
//             </>
//           ) : (
//             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
//               {product.emoji_icon ? (
//                 <span className="text-5xl transition-transform duration-300 group-hover:scale-110 mb-3">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-16 h-16 text-gray-400 mb-3" />
//               )}
//               <span className="text-sm text-gray-500 text-center">
//                 {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
//               </span>
//             </div>
//           )}

//           {/* طبقة hover */}
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />

//           {/* زر العرض السريع */}
//           <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
//             <Button
//               size="sm"
//               className="h-10 text-sm bg-black/80 hover:bg-black text-white backdrop-blur-sm border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
//               onClick={(e) => handleViewDetails(e)}
//             >
//               <Eye className="w-4 h-4 ml-2" />
//               عرض سريع
//             </Button>
//           </div>
//         </div>

//         {/* محتوى البطاقة */}
//         <CardHeader className="pb-4 px-6 pt-6">
//           <h3 className="font-bold text-lg line-clamp-2 text-gray-900 leading-tight min-h-[3rem] text-right">
//             {product.name_ar || product.name}
//           </h3>
//           <p className="text-sm text-gray-600 line-clamp-1 mt-2 text-right">
//             {product.name}
//           </p>
//         </CardHeader>

//         <CardContent className="pb-4 px-6 space-y-4">
//           {/* التقييم */}
//           <div className="flex items-center gap-2 justify-end">
//             <span className="text-sm text-gray-600">
//               ({product.reviews_count})
//             </span>
//             <span className="text-sm text-gray-600">
//               {parseFloat(product.rating).toFixed(1)}
//             </span>
//             <div className="flex items-center gap-1">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//           </div>

//           {/* السعر */}
//           <div className="space-y-3 text-right">
//             <div className="flex items-center gap-3 justify-end">
//               {product.discount > 0 && product.original_price && (
//                 <span className="text-base text-gray-400 line-through">
//                   {formatPrice(product.original_price)} د.ع
//                 </span>
//               )}
//               <span className="text-2xl font-bold text-green-600">
//                 {formatPrice(product.price)} د.ع
//               </span>
//             </div>
//             {product.discount > 0 && product.original_price && (
//               <p className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-xl inline-block border border-red-100">
//                 وفر {formatPrice(calculateDiscount().toString())} د.ع
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0 px-6 pb-6">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full h-12 text-base transition-all duration-500 rounded-2xl font-bold shadow-lg hover:shadow-xl ${
//               product.in_stock
//                 ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed hover:scale-100'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-5 h-5 ml-3 animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-5 h-5 ml-3" />
//                 أضف إلى السلة
//               </>
//             ) : (
//               'غير متوفر'
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* ديالوج تفاصيل المنتج */}
//       <ProductDetailDialog
//         product={product}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         onAddToCart={handleAddToCartFromDialog}
//       />
//     </>
//   );
// };

// export default Catpro;







// Catpro.tsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import type { Product } from '../../../api/types/product.types';
import { useCart } from '../../../hooks/useCart';
import { useFavorites } from '../../../hooks/useFavorites';
import { useAuth } from '../../../hooks/useAuth';
import ProductDetailDialog from '../Product/Productdaialog';
import { ShoppingCart, Eye, Star, Package, Loader2, Heart, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL

interface ProductCardProps {
  product: Product;
  variant?: 'vertical' | 'horizontal';
}

const Catpro: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'vertical' 
}) => {
  const { addToCart, isLoading } = useCart();
  const { toggleFavorite, checkIsFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (isAuthenticated) {
        try {
          const favoriteStatus = await checkIsFavorite(product.id);
          setIsWishlisted(favoriteStatus);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };
    
    checkFavoriteStatus();
  }, [product.id, isAuthenticated, checkIsFavorite]);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!product.in_stock || isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      await addToCart(product, 1);
      toast.success('تمت الإضافة إلى السلة!', {
        description: `${product.name_ar || product.name}`,
        duration: 3000,
      });
    } catch (error) {
      toast.error('فشل الإضافة إلى السلة', {
        description: 'يرجى المحاولة مرة أخرى.',
        duration: 3000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleViewDetails = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsDialogOpen(true);
  };

  const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
    try {
      await addToCart(product, quantity);
      toast.success('تمت الإضافة إلى السلة!', {
        description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
        duration: 3000,
      });
    } catch (error) {
      toast.error('فشل الإضافة إلى السلة', {
        description: 'يرجى المحاولة مرة أخرى.',
        duration: 3000,
      });
    }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsFavoriteLoading(true);
    try {
      const newFavoriteStatus = await toggleFavorite(product.id);
      setIsWishlisted(newFavoriteStatus);
      
      if (newFavoriteStatus) {
        toast.success('تم الإضافة إلى المفضلة', {
          description: product.name_ar || product.name,
          duration: 3000,
        });
      } else {
        toast.success('تم الإزالة من المفضلة', {
          description: product.name_ar || product.name,
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error('فشل في العملية', {
        description: 'يرجى المحاولة مرة أخرى.',
        duration: 3000,
      });
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setImageLoading(false);
  };

  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `${API_BASE_URL}${imageUrl}`;
    }
    
    return `${API_BASE_URL}/uploads/products/${imageUrl}`;
  };

  const fullImageUrl = getFullImageUrl(product.image_url);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('ar-IQ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calculateDiscount = () => {
    if (product.discount > 0 && product.original_price) {
      const original = parseFloat(product.original_price);
      const current = parseFloat(product.price);
      return original - current;
    }
    return 0;
  };

  // الحد الأفقي
  if (variant === 'horizontal') {
    return (
      <>
        <Card 
          className="flex flex-row hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-2xl overflow-hidden group shadow-sm hover:border-blue-200 h-40"
          onClick={() => handleViewDetails()}
        >
          {/* الصورة - حجم ثابت */}
          <div className="relative w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
            {fullImageUrl && !imageError ? (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  </div>
                )}
                <img
                  src={fullImageUrl}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  loading="lazy"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                {product.emoji_icon ? (
                  <span className="text-3xl">{product.emoji_icon}</span>
                ) : (
                  <Package className="w-12 h-12 text-gray-400" />
                )}
              </div>
            )}
            
            {/* البادجات على الصورة */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.badge && (
                <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1 rounded-full shadow-lg border-0">
                  {product.badge}
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-lg border-0">
                  {product.discount}%
                </Badge>
              )}
            </div>

            {/* زر المفضلة */}
            <button
              onClick={toggleWishlist}
              disabled={isFavoriteLoading}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 disabled:opacity-50"
            >
              <Heart
                className={`w-4 h-4 transition-all ${
                  isWishlisted 
                    ? 'fill-red-500 text-red-500 scale-110' 
                    : 'text-gray-600 group-hover:text-red-400'
                } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
              />
            </button>
          </div>

          {/* المحتوى - حجم ثابت */}
          <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
            <div className="flex-1 min-h-0">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-lg line-clamp-2 text-gray-900 leading-tight flex-1 text-right h-14">
                  {product.name_ar || product.name}
                </h3>
              </div>
              
              {/* التقييم - حجم ثابت */}
              <div className="flex items-center gap-2 mb-3 justify-end h-6">
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  ({product.reviews_count})
                </span>
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  {parseFloat(product.rating).toFixed(1)}
                </span>
                <div className="flex items-center gap-0.5">
                  {renderStars(parseFloat(product.rating))}
                </div>
              </div>

              {/* السعر - حجم ثابت */}
              <div className="space-y-1 text-right mb-4 h-16">
                <div className="flex items-center gap-2 justify-end">
                  {product.discount > 0 && product.original_price && (
                    <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                      {formatPrice(product.original_price)} د.ع
                    </span>
                  )}
                  <span className="text-xl font-bold text-green-600 whitespace-nowrap">
                    {formatPrice(product.price)} د.ع
                  </span>
                </div>
                {product.discount > 0 && product.original_price && (
                  <p className="text-xs text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full inline-block w-fit">
                    وفر {formatPrice(calculateDiscount().toString())} د.ع
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 h-10">
              <div className="flex items-center gap-2">
                {!product.in_stock && (
                  <Badge variant="destructive" className="text-xs px-3 py-1 bg-gray-500 border-0 whitespace-nowrap">
                    غير متوفر
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleViewDetails}
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 whitespace-nowrap"
                >
                  <Eye className="w-4 h-4 ml-2" />
                  عرض
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock || isAddingToCart || isLoading}
                  className="h-10 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                >
                  {isAddingToCart ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : product.in_stock ? (
                    <ShoppingCart className="w-4 h-4" />
                  ) : (
                    'غير متوفر'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <ProductDetailDialog
          product={product}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddToCart={handleAddToCartFromDialog}
        />
      </>
    );
  }

  // العرض العمودي - حجم ثابت
  return (
    <>
      <Card
        className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 border-gray-200/60 bg-white rounded-3xl shadow-lg hover:border-blue-200/80 flex flex-col h-full"
        onClick={() => handleViewDetails()}
      >
        {/* البادجات */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.badge && (
            <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0 whitespace-nowrap">
              <Zap className="w-3 h-3 ml-1" />
              {product.badge}
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0 whitespace-nowrap">
              {product.discount}% خصم
            </Badge>
          )}
        </div>

        {/* زر المفضلة */}
        <button
          onClick={toggleWishlist}
          disabled={isFavoriteLoading}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 border border-white/50 disabled:opacity-50"
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isWishlisted 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-gray-600 group-hover:text-red-400'
            } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
          />
        </button>

        {/* حالة التوفر */}
        {!product.in_stock && (
          <div className="absolute top-16 right-4 z-10">
            <Badge className="text-xs px-3 py-1.5 bg-gray-500/90 text-white rounded-full shadow-lg border-0 backdrop-blur-sm whitespace-nowrap">
              غير متوفر
            </Badge>
          </div>
        )}

        {/* صورة المنتج - حجم ثابت */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex-shrink-0">
          {fullImageUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <Loader2 className="w-10 h-10 text-gray-400 animate-spin" />
                </div>
              )}
              <img
                src={fullImageUrl}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
              {product.emoji_icon ? (
                <span className="text-5xl transition-transform duration-300 group-hover:scale-110 mb-3">
                  {product.emoji_icon}
                </span>
              ) : (
                <Package className="w-16 h-16 text-gray-400 mb-3" />
              )}
              <span className="text-sm text-gray-500 text-center">
                {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
              </span>
            </div>
          )}

          {/* طبقة hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />

          {/* زر العرض السريع */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Button
              size="sm"
              className="h-10 text-sm bg-black/80 hover:bg-black text-white backdrop-blur-sm border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={(e) => handleViewDetails(e)}
            >
              <Eye className="w-4 h-4 ml-2" />
              عرض سريع
            </Button>
          </div>
        </div>

        {/* محتوى البطاقة - حجم ثابت */}
        <CardHeader className="pb-3 px-6 pt-4 flex-shrink-0">
          <h3 className="font-bold text-lg line-clamp-2 text-gray-900 leading-tight h-14 text-right">
            {product.name_ar || product.name}
          </h3>
        </CardHeader>

        <CardContent className="pb-3 px-6 space-y-3 flex-shrink-0">
          {/* التقييم - حجم ثابت */}
          <div className="flex items-center gap-2 justify-end h-5">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              ({product.reviews_count})
            </span>
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {parseFloat(product.rating).toFixed(1)}
            </span>
            <div className="flex items-center gap-1">
              {renderStars(parseFloat(product.rating))}
            </div>
          </div>

          {/* السعر - حجم ثابت */}
          <div className="space-y-2 text-right h-20">
            <div className="flex items-center gap-3 justify-end">
              {product.discount > 0 && product.original_price && (
                <span className="text-base text-gray-400 line-through whitespace-nowrap">
                  {formatPrice(product.original_price)} د.ع
                </span>
              )}
              <span className="text-2xl font-bold text-green-600 whitespace-nowrap">
                {formatPrice(product.price)} د.ع
              </span>
            </div>
            {product.discount > 0 && product.original_price && (
              <p className="text-sm text-red-600 font-medium bg-red-50 px-3 py-2 rounded-xl inline-block border border-red-100 w-fit">
                وفر {formatPrice(calculateDiscount().toString())} د.ع
              </p>
            )}
          </div>
        </CardContent>

        {/* الزر - حجم ثابت */}
        <CardFooter className="pt-0 px-6 pb-6 mt-auto flex-shrink-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAddingToCart || isLoading}
            className={`w-full h-12 text-base transition-all duration-500 rounded-2xl font-bold shadow-lg hover:shadow-xl ${
              product.in_stock
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:scale-105'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed hover:scale-100'
            }`}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                جاري الإضافة...
              </>
            ) : product.in_stock ? (
              <>
                <ShoppingCart className="w-5 h-5 ml-3" />
                أضف إلى السلة
              </>
            ) : (
              'غير متوفر'
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* ديالوج تفاصيل المنتج */}
      <ProductDetailDialog
        product={product}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddToCart={handleAddToCartFromDialog}
      />
    </>
  );
};

export default Catpro;
