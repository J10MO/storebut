// // // components/products/ProductDetailDialog.tsx
// // import React, { useState } from 'react';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogHeader,
// //   DialogTitle,
// // } from '../../ui/dialog';
// // import { Button } from '../../ui/button';
// // import { Badge } from '../../ui/badge';
// // import { Separator } from '../../ui/separator';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
// // import type { Product } from '../../api/product.types';
// // import { 
// //   Star, 
// //   ShoppingCart, 
// //   Package, 
// //   Minus, 
// //   Plus,
// //   Heart,
// //   Share2,
// //   Truck,
// //   Shield,
// //   RotateCcw
// // } from 'lucide-react';

// // interface ProductDetailDialogProps {
// //   product: Product | null;
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   onAddToCart: (product: Product, quantity: number) => void;
// // }

// // const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
// //   product,
// //   open,
// //   onOpenChange,
// //   onAddToCart,
// // }) => {
// //   const [quantity, setQuantity] = useState(1);
// //   const [isWishlisted, setIsWishlisted] = useState(false);

// //   if (!product) return null;

// //   const handleQuantityChange = (delta: number) => {
// //     const newQuantity = quantity + delta;
// //     if (newQuantity >= 1 && newQuantity <= 99) {
// //       setQuantity(newQuantity);
// //     }
// //   };

// //   const handleAddToCart = () => {
// //     onAddToCart(product, quantity);
// //     onOpenChange(false);
// //   };

// //   const renderStars = (rating: number) => {
// //     return Array.from({ length: 5 }, (_, index) => (
// //       <Star
// //         key={index}
// //         className={`w-4 h-4 ${
// //           index < Math.floor(rating)
// //             ? 'fill-yellow-400 text-yellow-400'
// //             : 'text-gray-300'
// //         }`}
// //       />
// //     ));
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
// //           {/* Left Side - Product Image */}
// //           <div className="relative bg-gray-50 p-8">
// //             <div className="sticky top-8">
// //               {product.badge && (
// //                 <Badge 
// //                   variant="secondary" 
// //                   className="absolute top-4 left-4 z-10 bg-blue-600 text-white"
// //                 >
// //                   {product.badge}
// //                 </Badge>
// //               )}
              
// //               {product.discount > 0 && (
// //                 <Badge 
// //                   variant="destructive" 
// //                   className="absolute top-4 right-4 z-10 bg-red-600 text-white"
// //                 >
// //                   -{product.discount}% OFF
// //                 </Badge>
// //               )}

// //               <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
// //                 {product.image_url ? (
// //                   <img
// //                     src={product.image_url}
// //                     alt={product.name}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-full h-full flex items-center justify-center">
// //                     {product.emoji_icon ? (
// //                                             <span className="text-9xl">{product.emoji_icon}</span>
// //                     ) : (
// //                       <Package className="w-32 h-32 text-gray-400" />
// //                     )}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex gap-2 mt-4">
// //                 <Button
// //                   variant="outline"
// //                   size="icon"
// //                   className="flex-1"
// //                   onClick={() => setIsWishlisted(!isWishlisted)}
// //                 >
// //                   <Heart
// //                     className={`w-5 h-5 ${
// //                       isWishlisted ? 'fill-red-500 text-red-500' : ''
// //                     }`}
// //                   />
// //                 </Button>
// //                 <Button variant="outline" size="icon" className="flex-1">
// //                   <Share2 className="w-5 h-5" />
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Right Side - Product Details */}
// //           <div className="p-6 md:p-8">
// //             <DialogHeader className="text-left mb-6">
// //               <DialogTitle className="text-3xl font-bold mb-2">
// //                 {product.name}
// //               </DialogTitle>
// //               <DialogDescription className="text-lg text-gray-600">
// //                 {product.name_ar}
// //               </DialogDescription>
// //             </DialogHeader>

// //             {/* Rating and Reviews */}
// //             <div className="flex items-center gap-4 mb-6">
// //               <div className="flex items-center gap-1">
// //                 {renderStars(parseFloat(product.rating))}
// //               </div>
// //               <span className="text-sm font-medium">
// //                 {parseFloat(product.rating).toFixed(1)}
// //               </span>
// //               <span className="text-sm text-gray-500">
// //                 ({product.reviews_count} reviews)
// //               </span>
// //             </div>

// //             {/* Brand and Category */}
// //             <div className="grid grid-cols-2 gap-4 mb-6">
// //               <div>
// //                 <p className="text-sm text-gray-500 mb-1">Brand</p>
// //                 <p className="text-base font-semibold">{product.brand}</p>
// //               </div>
// //               <div>
// //                 <p className="text-sm text-gray-500 mb-1">Category</p>
// //                 <p className="text-base font-semibold">{product.category_name}</p>
// //               </div>
// //             </div>

// //             <Separator className="mb-6" />

// //             {/* Price Section */}
// //             <div className="mb-6">
// //               <div className="flex items-baseline gap-3 mb-2">
// //                 <span className="text-4xl font-bold text-green-600">
// //                   ${product.price}
// //                 </span>
// //                 {product.discount > 0 && (
// //                   <span className="text-xl text-gray-400 line-through">
// //                     ${product.original_price}
// //                   </span>
// //                 )}
// //               </div>
// //               {product.discount > 0 && (
// //                 <p className="text-red-600 font-medium">
// //                   You save ${(parseFloat(product.original_price) - parseFloat(product.price)).toFixed(2)} ({product.discount}% off)
// //                 </p>
// //               )}
// //             </div>

// //             {/* Stock Status */}
// //             <div className="mb-6">
// //               <div className="flex items-center gap-2">
// //                 <div
// //                   className={`w-3 h-3 rounded-full ${
// //                     product.in_stock ? 'bg-green-500' : 'bg-red-500'
// //                   }`}
// //                 />
// //                 <span
// //                   className={`font-medium ${
// //                     product.in_stock ? 'text-green-600' : 'text-red-600'
// //                   }`}
// //                 >
// //                   {product.in_stock ? 'In Stock' : 'Out of Stock'}
// //                 </span>
// //                               </div>
// //               {product.in_stock && (
// //                 <p className="text-sm text-gray-600 mt-1">
// //                   Available for immediate delivery
// //                 </p>
// //               )}
// //             </div>

// //             <Separator className="mb-6" />

// //             {/* Quantity Selector */}
// //             {product.in_stock && (
// //               <div className="mb-6">
// //                 <p className="text-sm font-medium mb-2">Quantity</p>
// //                 <div className="flex items-center gap-3">
// //                   <Button
// //                     variant="outline"
// //                     size="icon"
// //                     onClick={() => handleQuantityChange(-1)}
// //                     disabled={quantity <= 1}
// //                   >
// //                     <Minus className="w-4 h-4" />
// //                   </Button>
// //                   <div className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-md font-semibold">
// //                     {quantity}
// //                   </div>
// //                   <Button
// //                     variant="outline"
// //                     size="icon"
// //                     onClick={() => handleQuantityChange(1)}
// //                     disabled={quantity >= 99}
// //                   >
// //                     <Plus className="w-4 h-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Add to Cart Button */}
// //             <Button
// //               onClick={handleAddToCart}
// //               disabled={!product.in_stock}
// //               className="w-full h-12 text-lg font-semibold mb-6"
// //               size="lg"
// //             >
// //               {product.in_stock ? (
// //                 <>
// //                   <ShoppingCart className="w-5 h-5 mr-2" />
// //                   Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
// //                 </>
// //               ) : (
// //                 'Out of Stock'
// //               )}
// //             </Button>

// //             {/* Features */}
// //             <div className="grid grid-cols-1 gap-3 mb-6">
// //               <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
// //                 <Truck className="w-5 h-5 text-blue-600" />
// //                 <div>
// //                   <p className="text-sm font-medium">Free Shipping</p>
// //                   <p className="text-xs text-gray-600">On orders over $50</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
// //                 <Shield className="w-5 h-5 text-green-600" />
// //                 <div>
// //                   <p className="text-sm font-medium">Secure Payment</p>
// //                   <p className="text-xs text-gray-600">100% secure transactions</p>
// //                 </div>
// //               </div>
// //               <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
// //                 <RotateCcw className="w-5 h-5 text-purple-600" />
// //                 <div>
// //                   <p className="text-sm font-medium">Easy Returns</p>
// //                   <p className="text-xs text-gray-600">30-day return policy</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <Separator className="mb-6" />

// //             {/* Product Information Tabs */}
// //             <Tabs defaultValue="description" className="w-full">
// //               <TabsList className="grid w-full grid-cols-2">
// //                 <TabsTrigger value="description">Description</TabsTrigger>
// //                 <TabsTrigger value="details">Details</TabsTrigger>
// //               </TabsList>
              
// //               <TabsContent value="description" className="mt-4 space-y-4">
// //                 <div>
// //                   <h4 className="font-semibold mb-2">English Description</h4>
// //                   <p className="text-sm text-gray-600 leading-relaxed">
// //                      {product.description || 'No description available.'}
// //                   </p>
// //                 </div>
// //                 <div>
// //                   <h4 className="font-semibold mb-2">Arabic Description / الوصف بالعربية</h4>
// //                   <p className="text-sm text-gray-600 leading-relaxed" dir="rtl">
// //                     {product.description|| 'لا يوجد وصف متاح.'}
// //                   </p>
// //                 </div>
// //               </TabsContent>
              
// //               <TabsContent value="details" className="mt-4">
// //                 <div className="space-y-3">
// //                   <div className="flex justify-between py-2 border-b">
// //                     <span className="text-sm text-gray-600">Product ID</span>
// //                     <span className="text-sm font-medium">{product.id}</span>
// //                   </div>
// //                   <div className="flex justify-between py-2 border-b">
// //                     <span className="text-sm text-gray-600">Brand</span>
// //                     <span className="text-sm font-medium">{product.brand}</span>
// //                   </div>
// //                   <div className="flex justify-between py-2 border-b">
// //                     <span className="text-sm text-gray-600">Category</span>
// //                     <span className="text-sm font-medium">{product.category_name}</span>
// //                   </div>
// //                   <div className="flex justify-between py-2 border-b">
// //                     <span className="text-sm text-gray-600">Rating</span>
// //                     <span className="text-sm font-medium">
// //                       {parseFloat(product.rating).toFixed(1)} / 5.0
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between py-2 border-b">
// //                     <span className="text-sm text-gray-600">Reviews</span>
// //                     <span className="text-sm font-medium">{product.reviews_count}</span>
// //                   </div>
// //                   <div className="flex justify-between py-2 border-b">
// //                     <span className="text-sm text-gray-600">Availability</span>
// //                     <span className={`text-sm font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
// //                       {product.in_stock ? 'In Stock' : 'Out of Stock'}
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between py-2">
// //                     <span className="text-sm text-gray-600">Added Date</span>
// //                     <span className="text-sm font-medium">
// //                       {new Date(product.created_at).toLocaleDateString()}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </TabsContent>
// //             </Tabs>
// //           </div>
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default ProductDetailDialog;





// // components/products/ProductDetailDialog.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '../../ui/dialog';
// import { Button } from '../../ui/button';
// import { Badge } from '../../ui/badge';
// import { Separator } from '../../ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
// import type { Product } from '../../../api/products';
// import { 
//   Star, 
//   ShoppingCart, 
//   Package, 
//   Minus, 
//   Plus,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   X,
//   Loader2
// } from 'lucide-react';

// interface ProductDetailDialogProps {
//   product: Product | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onAddToCart: (product: Product, quantity: number) => void;
// }

// const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
//   product,
//   open,
//   onOpenChange,
//   onAddToCart,
// }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('description');
  
//   // استخدام useRef لتتبع المنتج السابق
//   const previousProductRef = useRef<Product | null>(null);
//   const imageDebugLoggedRef = useRef(false);

//   useEffect(() => {
//     if (open && product) {
//       setQuantity(1);
//       setImageError(false);
//       setImageLoading(true);
//       setActiveTab('description');
//       setIsWishlisted(product.is_wishlisted || false);
      
//       // تسجيل debug مرة واحدة فقط عندما يتغير المنتج
//       if (product.id !== previousProductRef.current?.id) {
//         const fullImageUrl = getFullImageUrl(product.image_url);
//         console.log('ProductDetailDialog image debug:', {
//           originalUrl: product.image_url,
//           fullUrl: fullImageUrl,
//           productId: product.id,
//           productName: product.name
//         });
//         previousProductRef.current = product;
//         imageDebugLoggedRef.current = true;
//       }
//     } else if (!open) {
//       // إعادة تعيين عند إغلاق الديالوج
//       previousProductRef.current = null;
//       imageDebugLoggedRef.current = false;
//     }
//   }, [open, product]);

//   // إصلاح: استخدام useCallback للدوال
//   const handleQuantityChange = React.useCallback((delta: number) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
//       setQuantity(newQuantity);
//     }
//   }, [quantity, product]);

//   const handleAddToCart = React.useCallback(() => {
//     if (product) {
//       onAddToCart(product, quantity);
//     }
//   }, [product, quantity, onAddToCart]);

//   const handleImageError = React.useCallback(() => {
//     console.error('Failed to load image:', product?.image_url);
//     setImageError(true);
//     setImageLoading(false);
//   }, [product]);

//   const handleImageLoad = React.useCallback(() => {
//     setImageError(false);
//     setImageLoading(false);
//   }, []);

//   // إصلاح: استخدام useCallback لتحسين الأداء
//   const getFullImageUrl = React.useCallback((imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/products/${imageUrl}`;
//   }, []);

//   const fullImageUrl = product ? getFullImageUrl(product.image_url) : null;

//   const renderStars = React.useCallback((rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   }, []);

//   const formatPrice = React.useCallback((price: string | number) => {
//     const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
//     return priceNumber.toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   }, []);

//   const calculateSavings = React.useCallback(() => {
//     if (!product) return '0';
//     const original = typeof product.original_price === 'string' 
//       ? parseFloat(product.original_price) 
//       : product.original_price;
//     const current = typeof product.price === 'string' 
//       ? parseFloat(product.price) 
//       : product.price;
//     const savings = original - current;
//     return savings.toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   }, [product]);

//   const calculateTotalPrice = React.useCallback(() => {
//     if (!product) return 0;
//     const price = typeof product.price === 'string' 
//       ? parseFloat(product.price) 
//       : product.price;
//     return price * quantity;
//   }, [product, quantity]);

//   if (!product) return null;

//   const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 rtl rounded-2xl">
//         {/* Close Button */}
//         <button
//           onClick={() => onOpenChange(false)}
//           className="absolute left-4 top-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white">
//           {/* Right Side - Product Image */}
//           <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
//             <div className="sticky top-6">
//               {/* Badges */}
//               <div className="flex flex-col gap-2 mb-4">
//                 {product.badge && (
//                   <Badge className="bg-blue-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     {product.badge}
//                   </Badge>
//                 )}
                
//                 {product.discount > 0 && (
//                   <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     {product.discount}%-
//                   </Badge>
//                 )}

//                 {!product.in_stock && (
//                   <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     غير متوفر
//                   </Badge>
//                 )}
//               </div>

//               {/* Product Image */}
//               <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
//                 {fullImageUrl && !imageError ? (
//                   <>
//                     {imageLoading && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//                       </div>
//                     )}
//                     <img
//                       src={fullImageUrl}
//                       alt={product.name}
//                       className={`w-full h-full object-cover transition-opacity duration-300 ${
//                         imageLoading ? 'opacity-0' : 'opacity-100'
//                       }`}
//                       loading="lazy"
//                       onError={handleImageError}
//                       onLoad={handleImageLoad}
//                     />
//                   </>
//                 ) : (
//                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
//                     {product.emoji_icon ? (
//                       <span className="text-8xl mb-4">{product.emoji_icon}</span>
//                     ) : (
//                       <Package className="w-24 h-24 text-gray-400 mb-4" />
//                     )}
//                     <span className="text-gray-500 text-lg text-center">
//                       {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة متاحة'}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 mt-6">
//                 <Button
//                   variant="outline"
//                   className="flex-1 h-12 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
//                   onClick={() => setIsWishlisted(!isWishlisted)}
//                 >
//                   <Heart
//                     className={`w-5 h-5 ml-2 transition-colors ${
//                       isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//                     }`}
//                   />
//                   <span className="font-medium">
//                     {isWishlisted ? 'في المفضلة' : 'إضافة إلى المفضلة'}
//                   </span>
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   className="flex-1 h-12 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
//                 >
//                   <Share2 className="w-5 h-5 ml-2" />
//                   <span className="font-medium">مشاركة</span>
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Left Side - Product Details */}
//           <div className="p-6 lg:p-8" dir="rtl">
//             <DialogHeader className="text-right mb-6">
//               <DialogTitle className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 leading-tight">
//                 {product.name_ar || product.name}
//               </DialogTitle>
//               <DialogDescription className="text-lg text-gray-600">
//                 {product.name}
//               </DialogDescription>
//             </DialogHeader>

//             {/* Rating and Reviews */}
//             <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//               <div className="flex items-center gap-1">
//                 {renderStars(parseFloat(product.rating))}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   {parseFloat(product.rating).toFixed(1)}
//                 </span>
//                 <span className="text-gray-500">•</span>
//                 <span className="text-gray-600">
//                   ({product.reviews_count} تقييم)
//                 </span>
//               </div>
//             </div>

//             {/* Brand and Category */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
//                 <p className="text-sm text-blue-600 mb-2 font-medium">العلامة التجارية</p>
//                 <p className="text-base font-semibold text-gray-900">{product.brand}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-xl border border-green-200">
//                 <p className="text-sm text-green-600 mb-2 font-medium">الفئة</p>
//                 <p className="text-base font-semibold text-gray-900">
//                   {product.category_name_ar || product.category_name}
//                 </p>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Price Section */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-4 mb-3">
//                 <span className="text-3xl lg:text-4xl font-bold text-green-600">
//                   {formatPrice(product.price)} د.ع
//                 </span>
//                 {product.discount > 0 && product.original_price && (
//                   <span className="text-xl text-gray-400 line-through">
//                     {formatPrice(product.original_price)} د.ع
//                   </span>
//                 )}
//               </div>
//               {product.discount > 0 && product.original_price && (
//                 <div className="bg-red-50 p-3 rounded-lg border border-red-200">
//                   <p className="text-red-700 font-semibold">
//                     وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="mb-6">
//               <div className={`flex items-center gap-3 p-4 rounded-xl ${
//                 product.in_stock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
//               }`}>
//                 <div
//                   className={`w-4 h-4 rounded-full ${
//                     product.in_stock ? 'bg-green-500' : 'bg-red-500'
//                   }`}
//                 />
//                 <div>
//                   <span
//                     className={`text-lg font-semibold ${
//                       product.in_stock ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     {product.in_stock 
//                       ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ''}`
//                       : 'غير متوفر'
//                     }
//                   </span>
//                   {product.in_stock && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       ✓ جاهز للتوصيل خلال 24 ساعة
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Quantity Selector */}
//             {product.in_stock && (
//               <div className="mb-6">
//                 <p className="text-lg font-semibold mb-3 text-gray-900">الكمية</p>
//                 <div className="flex items-center gap-4">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                     onClick={() => handleQuantityChange(-1)}
//                     disabled={quantity <= 1}
//                   >
//                     <Minus className="w-5 h-5" />
//                   </Button>
//                   <div className="w-20 h-12 flex items-center justify-center border-2 border-blue-500 bg-blue-50 rounded-xl font-bold text-xl text-blue-700">
//                     {quantity}
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                     onClick={() => handleQuantityChange(1)}
//                     disabled={!isQuantityAvailable}
//                   >
//                     <Plus className="w-5 h-5" />
//                   </Button>
//                 </div>
//                 {product.stock_quantity && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     متبقي {product.stock_quantity} قطعة فقط
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <Button
//               onClick={handleAddToCart}
//               disabled={!product.in_stock || !isQuantityAvailable}
//               className="w-full h-14 text-lg font-semibold mb-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               size="lg"
//             >
//               {product.in_stock && isQuantityAvailable ? (
//                 <>
//                   <ShoppingCart className="w-6 h-6 ml-3" />
//                   أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
//                 </>
//               ) : (
//                 'غير متوفر حاليًا'
//               )}
//             </Button>

//             {/* Features */}
//             <div className="grid grid-cols-1 gap-4 mb-6">
//               <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Truck className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-blue-900">شحن مجاني</p>
//                   <p className="text-sm text-blue-700">للطلبات فوق 50,000 د.ع</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-green-900">دفع آمن</p>
//                   <p className="text-sm text-green-700">معاملات 100% آمنة ومشفرة</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <RotateCcw className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-purple-900">إرجاع سهل</p>
//                   <p className="text-sm text-purple-700">سياسة إرجاع لمدة 30 يوم</p>
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Product Information Tabs */}
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
//                 <TabsTrigger 
//                   value="description" 
//                   className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium"
//                 >
//                   الوصف
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="details" 
//                   className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium"
//                 >
//                   المواصفات
//                 </TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="description" className="mt-2 space-y-6">
//                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
//                   <h4 className="font-semibold text-lg mb-4 text-gray-900">الوصف بالعربية</h4>
//                   <p className="text-gray-700 leading-relaxed text-lg" dir="rtl">
//                     {product.description_ar || product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
//                   </p>
//                 </div>
//                 {product.description && (
//                   <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
//                     <h4 className="font-semibold text-lg mb-4 text-gray-900">English Description</h4>
//                     <p className="text-gray-700 leading-relaxed text-lg" dir="ltr">
//                       {product.description}
//                     </p>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="details" className="mt-2">
//                 <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-200">
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">رقم المنتج</span>
//                     <span className="font-semibold text-gray-900">{product.id}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">العلامة التجارية</span>
//                     <span className="font-semibold text-gray-900">{product.brand}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">الفئة</span>
//                     <span className="font-semibold text-gray-900">
//                       {product.category_name_ar || product.category_name}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">التقييم</span>
//                     <span className="font-semibold text-gray-900">
//                       {parseFloat(product.rating).toFixed(1)} / 5.0
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">عدد التقييمات</span>
//                     <span className="font-semibold text-gray-900">{product.reviews_count}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">الحالة</span>
//                     <span className={`font-semibold ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
//                       {product.in_stock ? 'متوفر' : 'غير متوفر'}
//                     </span>
//                   </div>
//                   {product.stock_quantity && (
//                     <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">الكمية المتاحة</span>
//                       <span className="font-semibold text-gray-900">{product.stock_quantity} قطعة</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between items-center py-3">
//                     <span className="text-gray-600 font-medium">تاريخ الإضافة</span>
//                     <span className="font-semibold text-gray-900">
//                       {new Date(product.created_at).toLocaleDateString('ar-IQ', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProductDetailDialog;











// // components/products/ProductDetailDialog.tsx
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '../../ui/dialog';
// import { Button } from '../../ui/button';
// import { Badge } from '../../ui/badge';
// import { Separator } from '../../ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
// import type { Product } from '../../../api/types/product.types'; // تحديث المسار
// import { useFavorites } from '../../../hooks/useFavorites'; // إضافة هذا
// import { useAuth } from '../../../hooks/useAuth'; // إضافة هذا
// import { 
//   Star, 
//   ShoppingCart, 
//   Package, 
//   Minus, 
//   Plus,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   X,
//   Loader2
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// interface ProductDetailDialogProps {
//   product: Product | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onAddToCart: (product: Product, quantity: number) => void;
// }

// const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
//   product,
//   open,
//   onOpenChange,
//   onAddToCart,
// }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('description');
  
//   const { toggleFavorite, checkIsFavorite } = useFavorites();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   // استخدام useRef لتتبع المنتج السابق
//   const previousProductRef = useRef<Product | null>(null);
//   const imageDebugLoggedRef = useRef(false);

//   // التحقق من حالة المفضلة عند فتح الديالوج
//   useEffect(() => {
//     const checkFavoriteStatus = async () => {
//       if (open && product && isAuthenticated) {
//         try {
//           const favoriteStatus = await checkIsFavorite(product.id);
//           setIsWishlisted(favoriteStatus);
//         } catch (error) {
//           console.error('Error checking favorite status:', error);
//         }
//       }
//     };
    
//     checkFavoriteStatus();
//   }, [open, product, isAuthenticated, checkIsFavorite]);

//   useEffect(() => {
//     if (open && product) {
//       setQuantity(1);
//       setImageError(false);
//       setImageLoading(true);
//       setActiveTab('description');
      
//       // تسجيل debug مرة واحدة فقط عندما يتغير المنتج
//       if (product.id !== previousProductRef.current?.id) {
//         const fullImageUrl = getFullImageUrl(product.image_url);
//         console.log('ProductDetailDialog image debug:', {
//           originalUrl: product.image_url,
//           fullUrl: fullImageUrl,
//           productId: product.id,
//           productName: product.name
//         });
//         previousProductRef.current = product;
//         imageDebugLoggedRef.current = true;
//       }
//     } else if (!open) {
//       // إعادة تعيين عند إغلاق الديالوج
//       previousProductRef.current = null;
//       imageDebugLoggedRef.current = false;
//     }
//   }, [open, product]);

//   // إصلاح: استخدام useCallback للدوال
//   const handleQuantityChange = useCallback((delta: number) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
//       setQuantity(newQuantity);
//     }
//   }, [quantity, product]);

//   const handleAddToCart = useCallback(() => {
//     if (product) {
//       onAddToCart(product, quantity);
//     }
//   }, [product, quantity, onAddToCart]);

//   const handleImageError = useCallback(() => {
//     console.error('Failed to load image:', product?.image_url);
//     setImageError(true);
//     setImageLoading(false);
//   }, [product]);

//   const handleImageLoad = useCallback(() => {
//     setImageError(false);
//     setImageLoading(false);
//   }, []);

//   const toggleWishlist = async () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     if (!product) return;

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

//   // إصلاح: استخدام useCallback لتحسين الأداء
//   const getFullImageUrl = useCallback((imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/products/${imageUrl}`;
//   }, []);

//   const fullImageUrl = product ? getFullImageUrl(product.image_url) : null;

//   const renderStars = useCallback((rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   }, []);

//   const formatPrice = useCallback((price: string | number) => {
//     const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
//     return priceNumber.toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   }, []);

//   const calculateSavings = useCallback(() => {
//     if (!product) return '0';
//     const original = typeof product.original_price === 'string' 
//       ? parseFloat(product.original_price) 
//       : product.original_price;
//     const current = typeof product.price === 'string' 
//       ? parseFloat(product.price) 
//       : product.price;
//     const savings = original - current;
//     return savings.toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   }, [product]);

//   const calculateTotalPrice = useCallback(() => {
//     if (!product) return 0;
//     const price = typeof product.price === 'string' 
//       ? parseFloat(product.price) 
//       : product.price;
//     return price * quantity;
//   }, [product, quantity]);

//   if (!product) return null;

//   const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 rtl rounded-2xl">
//         {/* Close Button */}
//         <button
//           onClick={() => onOpenChange(false)}
//           className="absolute left-4 top-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white">
//           {/* Right Side - Product Image */}
//           <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
//             <div className="sticky top-6">
//               {/* Badges */}
//               <div className="flex flex-col gap-2 mb-4">
//                 {product.badge && (
//                   <Badge className="bg-blue-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     {product.badge}
//                   </Badge>
//                 )}
                
//                 {product.discount > 0 && (
//                   <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     {product.discount}%-
//                   </Badge>
//                 )}

//                 {!product.in_stock && (
//                   <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     غير متوفر
//                   </Badge>
//                 )}
//               </div>

//               {/* Product Image */}
//               <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
//                 {fullImageUrl && !imageError ? (
//                   <>
//                     {imageLoading && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//                       </div>
//                     )}
//                     <img
//                       src={fullImageUrl}
//                       alt={product.name}
//                       className={`w-full h-full object-cover transition-opacity duration-300 ${
//                         imageLoading ? 'opacity-0' : 'opacity-100'
//                       }`}
//                       loading="lazy"
//                       onError={handleImageError}
//                       onLoad={handleImageLoad}
//                     />
//                   </>
//                 ) : (
//                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
//                     {product.emoji_icon ? (
//                       <span className="text-8xl mb-4">{product.emoji_icon}</span>
//                     ) : (
//                       <Package className="w-24 h-24 text-gray-400 mb-4" />
//                     )}
//                     <span className="text-gray-500 text-lg text-center">
//                       {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة متاحة'}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 mt-6">
//                 <Button
//                   variant="outline"
//                   className="flex-1 h-12 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
//                   onClick={toggleWishlist}
//                   disabled={isFavoriteLoading}
//                 >
//                   <Heart
//                     className={`w-5 h-5 ml-2 transition-colors ${
//                       isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//                     } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
//                   />
//                   <span className="font-medium">
//                     {isWishlisted ? 'في المفضلة' : 'إضافة إلى المفضلة'}
//                   </span>
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   className="flex-1 h-12 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
//                 >
//                   <Share2 className="w-5 h-5 ml-2" />
//                   <span className="font-medium">مشاركة</span>
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Left Side - Product Details */}
//           <div className="p-6 lg:p-8" dir="rtl">
//             <DialogHeader className="text-right mb-6">
//               <DialogTitle className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 leading-tight">
//                 {product.name_ar || product.name}
//               </DialogTitle>
//               <DialogDescription className="text-lg text-gray-600">
//                 {product.name}
//               </DialogDescription>
//             </DialogHeader>

//             {/* Rating and Reviews */}
//             <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//               <div className="flex items-center gap-1">
//                 {renderStars(parseFloat(product.rating))}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   {parseFloat(product.rating).toFixed(1)}
//                 </span>
//                 <span className="text-gray-500">•</span>
//                 <span className="text-gray-600">
//                   ({product.reviews_count} تقييم)
//                 </span>
//               </div>
//             </div>

//             {/* Brand and Category */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
//                 <p className="text-sm text-blue-600 mb-2 font-medium">العلامة التجارية</p>
//                 <p className="text-base font-semibold text-gray-900">{product.brand}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-xl border border-green-200">
//                 <p className="text-sm text-green-600 mb-2 font-medium">الفئة</p>
//                 <p className="text-base font-semibold text-gray-900">
//                   {product.category_name_ar || product.category_name}
//                 </p>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Price Section */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-4 mb-3">
//                 <span className="text-3xl lg:text-4xl font-bold text-green-600">
//                   {formatPrice(product.price)} د.ع
//                 </span>
//                 {product.discount > 0 && product.original_price && (
//                   <span className="text-xl text-gray-400 line-through">
//                     {formatPrice(product.original_price)} د.ع
//                   </span>
//                 )}
//               </div>
//               {product.discount > 0 && product.original_price && (
//                 <div className="bg-red-50 p-3 rounded-lg border border-red-200">
//                   <p className="text-red-700 font-semibold">
//                     وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="mb-6">
//               <div className={`flex items-center gap-3 p-4 rounded-xl ${
//                 product.in_stock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
//               }`}>
//                 <div
//                   className={`w-4 h-4 rounded-full ${
//                     product.in_stock ? 'bg-green-500' : 'bg-red-500'
//                   }`}
//                 />
//                 <div>
//                   <span
//                     className={`text-lg font-semibold ${
//                       product.in_stock ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     {product.in_stock 
//                       ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ''}`
//                       : 'غير متوفر'
//                     }
//                   </span>
//                   {product.in_stock && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       ✓ جاهز للتوصيل خلال 24 ساعة
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Quantity Selector */}
//             {product.in_stock && (
//               <div className="mb-6">
//                 <p className="text-lg font-semibold mb-3 text-gray-900">الكمية</p>
//                 <div className="flex items-center gap-4">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                     onClick={() => handleQuantityChange(-1)}
//                     disabled={quantity <= 1}
//                   >
//                     <Minus className="w-5 h-5" />
//                   </Button>
//                   <div className="w-20 h-12 flex items-center justify-center border-2 border-blue-500 bg-blue-50 rounded-xl font-bold text-xl text-blue-700">
//                     {quantity}
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                     onClick={() => handleQuantityChange(1)}
//                     disabled={!isQuantityAvailable}
//                   >
//                     <Plus className="w-5 h-5" />
//                   </Button>
//                 </div>
//                 {product.stock_quantity && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     متبقي {product.stock_quantity} قطعة فقط
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <Button
//               onClick={handleAddToCart}
//               disabled={!product.in_stock || !isQuantityAvailable}
//               className="w-full h-14 text-lg font-semibold mb-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               size="lg"
//             >
//               {product.in_stock && isQuantityAvailable ? (
//                 <>
//                   <ShoppingCart className="w-6 h-6 ml-3" />
//                   أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
//                 </>
//               ) : (
//                 'غير متوفر حاليًا'
//               )}
//             </Button>

//             {/* Features */}
//             <div className="grid grid-cols-1 gap-4 mb-6">
//               <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Truck className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-blue-900">شحن مجاني</p>
//                   <p className="text-sm text-blue-700">للطلبات فوق 50,000 د.ع</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-green-900">دفع آمن</p>
//                   <p className="text-sm text-green-700">معاملات 100% آمنة ومشفرة</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <RotateCcw className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-purple-900">إرجاع سهل</p>
//                   <p className="text-sm text-purple-700">سياسة إرجاع لمدة 30 يوم</p>
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Product Information Tabs */}
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
//                 <TabsTrigger 
//                   value="description" 
//                   className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium"
//                 >
//                   الوصف
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="details" 
//                   className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium"
//                 >
//                   المواصفات
//                 </TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="description" className="mt-2 space-y-6">
//                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
//                   <h4 className="font-semibold text-lg mb-4 text-gray-900">الوصف بالعربية</h4>
//                   <p className="text-gray-700 leading-relaxed text-lg" dir="rtl">
//                     {product.description_ar || product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
//                   </p>
//                 </div>
//                 {product.description && (
//                   <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
//                     <h4 className="font-semibold text-lg mb-4 text-gray-900">English Description</h4>
//                     <p className="text-gray-700 leading-relaxed text-lg" dir="ltr">
//                       {product.description}
//                     </p>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="details" className="mt-2">
//                 <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-200">
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">رقم المنتج</span>
//                     <span className="font-semibold text-gray-900">{product.id}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">العلامة التجارية</span>
//                     <span className="font-semibold text-gray-900">{product.brand}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">الفئة</span>
//                     <span className="font-semibold text-gray-900">
//                       {product.category_name_ar || product.category_name}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">التقييم</span>
//                     <span className="font-semibold text-gray-900">
//                       {parseFloat(product.rating).toFixed(1)} / 5.0
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">عدد التقييمات</span>
//                     <span className="font-semibold text-gray-900">{product.reviews_count}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">الحالة</span>
//                     <span className={`font-semibold ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
//                       {product.in_stock ? 'متوفر' : 'غير متوفر'}
//                     </span>
//                   </div>
//                   {product.stock_quantity && (
//                     <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">الكمية المتاحة</span>
//                       <span className="font-semibold text-gray-900">{product.stock_quantity} قطعة</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between items-center py-3">
//                     <span className="text-gray-600 font-medium">تاريخ الإضافة</span>
//                     <span className="font-semibold text-gray-900">
//                       {new Date(product.created_at).toLocaleDateString('ar-IQ', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProductDetailDialog;













// // components/products/ProductDetailDialog.tsx
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '../../ui/dialog';
// import { Button } from '../../ui/button';
// import { Badge } from '../../ui/badge';
// import { Separator } from '../../ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
// import type { Product } from '../../../api/types/product.types';
// import { useFavorites } from '../../../hooks/useFavorites';
// import { useAuth } from '../../../hooks/useAuth';
// import { 
//   Star, 
//   ShoppingCart, 
//   Package, 
//   Minus, 
//   Plus,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   X,
//   Loader2
// } from 'lucide-react';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// interface ProductDetailDialogProps {
//   product: Product | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onAddToCart: (product: Product, quantity: number) => void;
// }

// const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
//   product,
//   open,
//   onOpenChange,
//   onAddToCart,
// }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [imageLoading, setImageLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('description');
  
//   const { toggleFavorite, isFavorite } = useFavorites(); // استخدام isFavorite مباشرة
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
  
//   // استخدام useRef لتتبع المنتج السابق
//   const previousProductRef = useRef<Product | null>(null);
//   const imageDebugLoggedRef = useRef(false);

//   // استخدام isFavorite مباشرة من الـ hook بدل طلب جديد
//   const isWishlisted = product ? isFavorite(product.id) : false;

//   useEffect(() => {
//     if (open && product) {
//       setQuantity(1);
//       setImageError(false);
//       setImageLoading(true);
//       setActiveTab('description');
      
//       // تسجيل debug مرة واحدة فقط عندما يتغير المنتج
//       if (product.id !== previousProductRef.current?.id) {
//         const fullImageUrl = getFullImageUrl(product.image_url);
//         console.log('ProductDetailDialog image debug:', {
//           originalUrl: product.image_url,
//           fullUrl: fullImageUrl,
//           productId: product.id,
//           productName: product.name
//         });
//         previousProductRef.current = product;
//         imageDebugLoggedRef.current = true;
//       }
//     } else if (!open) {
//       // إعادة تعيين عند إغلاق الديالوج
//       previousProductRef.current = null;
//       imageDebugLoggedRef.current = false;
//     }
//   }, [open, product]);

//   // إصلاح: استخدام useCallback للدوال
//   const handleQuantityChange = useCallback((delta: number) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
//       setQuantity(newQuantity);
//     }
//   }, [quantity, product]);

//   const handleAddToCart = useCallback(() => {
//     if (product) {
//       onAddToCart(product, quantity);
//     }
//   }, [product, quantity, onAddToCart]);

//   const handleImageError = useCallback(() => {
//     console.error('Failed to load image:', product?.image_url);
//     setImageError(true);
//     setImageLoading(false);
//   }, [product]);

//   const handleImageLoad = useCallback(() => {
//     setImageError(false);
//     setImageLoading(false);
//   }, []);

//   const toggleWishlist = async () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//       return;
//     }

//     if (!product) return;

//     setIsFavoriteLoading(true);
//     try {
//       await toggleFavorite(product.id);
//       // لا حاجة لتحديث الحالة يدوياً لأن isFavorite سيتحدث تلقائياً
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

//   // إصلاح: استخدام useCallback لتحسين الأداء
//   const getFullImageUrl = useCallback((imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/products/${imageUrl}`;
//   }, []);

//   const fullImageUrl = product ? getFullImageUrl(product.image_url) : null;

//   const renderStars = useCallback((rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   }, []);

//   const formatPrice = useCallback((price: string | number) => {
//     const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
//     return priceNumber.toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   }, []);

//   const calculateSavings = useCallback(() => {
//     if (!product) return '0';
//     const original = typeof product.original_price === 'string' 
//       ? parseFloat(product.original_price) 
//       : product.original_price;
//     const current = typeof product.price === 'string' 
//       ? parseFloat(product.price) 
//       : product.price;
//     const savings = original - current;
//     return savings.toLocaleString('ar-IQ', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2
//     });
//   }, [product]);

//   const calculateTotalPrice = useCallback(() => {
//     if (!product) return 0;
//     const price = typeof product.price === 'string' 
//       ? parseFloat(product.price) 
//       : product.price;
//     return price * quantity;
//   }, [product, quantity]);

//   if (!product) return null;

//   const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99);

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto p-0 rtl rounded-2xl">
//         {/* Close Button */}
//         <button
//           onClick={() => onOpenChange(false)}
//           className="absolute left-4 top-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-200"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white">
//           {/* Right Side - Product Image */}
//           <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-6 lg:p-8">
//             <div className="sticky top-6">
//               {/* Badges */}
//               <div className="flex flex-col gap-2 mb-4">
//                 {product.badge && (
//                   <Badge className="bg-blue-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     {product.badge}
//                   </Badge>
//                 )}
                
//                 {product.discount > 0 && (
//                   <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     {product.discount}%-
//                   </Badge>
//                 )}

//                 {!product.in_stock && (
//                   <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                     غير متوفر
//                   </Badge>
//                 )}
//               </div>

//               {/* Product Image */}
//               <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
//                 {fullImageUrl && !imageError ? (
//                   <>
//                     {imageLoading && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                         <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
//                       </div>
//                     )}
//                     <img
//                       src={fullImageUrl}
//                       alt={product.name}
//                       className={`w-full h-full object-cover transition-opacity duration-300 ${
//                         imageLoading ? 'opacity-0' : 'opacity-100'
//                       }`}
//                       loading="lazy"
//                       onError={handleImageError}
//                       onLoad={handleImageLoad}
//                     />
//                   </>
//                 ) : (
//                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-8">
//                     {product.emoji_icon ? (
//                       <span className="text-8xl mb-4">{product.emoji_icon}</span>
//                     ) : (
//                       <Package className="w-24 h-24 text-gray-400 mb-4" />
//                     )}
//                     <span className="text-gray-500 text-lg text-center">
//                       {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة متاحة'}
//                     </span>
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 mt-6">
//                 <Button
//                   variant="outline"
//                   className="flex-1 h-12 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
//                   onClick={toggleWishlist}
//                   disabled={isFavoriteLoading}
//                 >
//                   <Heart
//                     className={`w-5 h-5 ml-2 transition-colors ${
//                       isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//                     } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
//                   />
//                   <span className="font-medium">
//                     {isWishlisted ? 'في المفضلة' : 'إضافة إلى المفضلة'}
//                   </span>
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   className="flex-1 h-12 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
//                 >
//                   <Share2 className="w-5 h-5 ml-2" />
//                   <span className="font-medium">مشاركة</span>
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Left Side - Product Details */}
//           <div className="p-6 lg:p-8" dir="rtl">
//             <DialogHeader className="text-right mb-6">
//               <DialogTitle className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 leading-tight">
//                 {product.name_ar || product.name}
//               </DialogTitle>
//               <DialogDescription className="text-lg text-gray-600">
//                 {product.name}
//               </DialogDescription>
//             </DialogHeader>

//             {/* Rating and Reviews */}
//             <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//               <div className="flex items-center gap-1">
//                 {renderStars(parseFloat(product.rating))}
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-gray-900">
//                   {parseFloat(product.rating).toFixed(1)}
//                 </span>
//                 <span className="text-gray-500">•</span>
//                 <span className="text-gray-600">
//                   ({product.reviews_count} تقييم)
//                 </span>
//               </div>
//             </div>

//             {/* Brand and Category */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
//                 <p className="text-sm text-blue-600 mb-2 font-medium">العلامة التجارية</p>
//                 <p className="text-base font-semibold text-gray-900">{product.brand}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-xl border border-green-200">
//                 <p className="text-sm text-green-600 mb-2 font-medium">الفئة</p>
//                 <p className="text-base font-semibold text-gray-900">
//                   {product.category_name_ar || product.category_name}
//                 </p>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Price Section */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-4 mb-3">
//                 <span className="text-3xl lg:text-4xl font-bold text-green-600">
//                   {formatPrice(product.price)} د.ع
//                 </span>
//                 {product.discount > 0 && product.original_price && (
//                   <span className="text-xl text-gray-400 line-through">
//                     {formatPrice(product.original_price)} د.ع
//                   </span>
//                 )}
//               </div>
//               {product.discount > 0 && product.original_price && (
//                 <div className="bg-red-50 p-3 rounded-lg border border-red-200">
//                   <p className="text-red-700 font-semibold">
//                     وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="mb-6">
//               <div className={`flex items-center gap-3 p-4 rounded-xl ${
//                 product.in_stock ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
//               }`}>
//                 <div
//                   className={`w-4 h-4 rounded-full ${
//                     product.in_stock ? 'bg-green-500' : 'bg-red-500'
//                   }`}
//                 />
//                 <div>
//                   <span
//                     className={`text-lg font-semibold ${
//                       product.in_stock ? 'text-green-600' : 'text-red-600'
//                     }`}
//                   >
//                     {product.in_stock 
//                       ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ''}`
//                       : 'غير متوفر'
//                     }
//                   </span>
//                   {product.in_stock && (
//                     <p className="text-sm text-gray-600 mt-1">
//                       ✓ جاهز للتوصيل خلال 24 ساعة
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Quantity Selector */}
//             {product.in_stock && (
//               <div className="mb-6">
//                 <p className="text-lg font-semibold mb-3 text-gray-900">الكمية</p>
//                 <div className="flex items-center gap-4">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                     onClick={() => handleQuantityChange(-1)}
//                     disabled={quantity <= 1}
//                   >
//                     <Minus className="w-5 h-5" />
//                   </Button>
//                   <div className="w-20 h-12 flex items-center justify-center border-2 border-blue-500 bg-blue-50 rounded-xl font-bold text-xl text-blue-700">
//                     {quantity}
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50"
//                     onClick={() => handleQuantityChange(1)}
//                     disabled={!isQuantityAvailable}
//                   >
//                     <Plus className="w-5 h-5" />
//                   </Button>
//                 </div>
//                 {product.stock_quantity && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     متبقي {product.stock_quantity} قطعة فقط
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <Button
//               onClick={handleAddToCart}
//               disabled={!product.in_stock || !isQuantityAvailable}
//               className="w-full h-14 text-lg font-semibold mb-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               size="lg"
//             >
//               {product.in_stock && isQuantityAvailable ? (
//                 <>
//                   <ShoppingCart className="w-6 h-6 ml-3" />
//                   أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
//                 </>
//               ) : (
//                 'غير متوفر حاليًا'
//               )}
//             </Button>

//             {/* Features */}
//             <div className="grid grid-cols-1 gap-4 mb-6">
//               <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <Truck className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-blue-900">شحن مجاني</p>
//                   <p className="text-sm text-blue-700">للطلبات فوق 50,000 د.ع</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <Shield className="w-6 h-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-green-900">دفع آمن</p>
//                   <p className="text-sm text-green-700">معاملات 100% آمنة ومشفرة</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <RotateCcw className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-purple-900">إرجاع سهل</p>
//                   <p className="text-sm text-purple-700">سياسة إرجاع لمدة 30 يوم</p>
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6 bg-gray-200" />

//             {/* Product Information Tabs */}
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//               <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1 rounded-xl">
//                 <TabsTrigger 
//                   value="description" 
//                   className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium"
//                 >
//                   الوصف
//                 </TabsTrigger>
//                 <TabsTrigger 
//                   value="details" 
//                   className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 font-medium"
//                 >
//                   المواصفات
//                 </TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="description" className="mt-2 space-y-6">
//                 <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
//                   <h4 className="font-semibold text-lg mb-4 text-gray-900">الوصف بالعربية</h4>
//                   <p className="text-gray-700 leading-relaxed text-lg" dir="rtl">
//                     {product.description_ar || product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
//                   </p>
//                 </div>
//                 {product.description && (
//                   <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
//                     <h4 className="font-semibold text-lg mb-4 text-gray-900">English Description</h4>
//                     <p className="text-gray-700 leading-relaxed text-lg" dir="ltr">
//                       {product.description}
//                     </p>
//                   </div>
//                 )}
//               </TabsContent>
              
//               <TabsContent value="details" className="mt-2">
//                 <div className="bg-gray-50 p-6 rounded-2xl space-y-4 border border-gray-200">
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">رقم المنتج</span>
//                     <span className="font-semibold text-gray-900">{product.id}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">العلامة التجارية</span>
//                     <span className="font-semibold text-gray-900">{product.brand}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">الفئة</span>
//                     <span className="font-semibold text-gray-900">
//                       {product.category_name_ar || product.category_name}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">التقييم</span>
//                     <span className="font-semibold text-gray-900">
//                       {parseFloat(product.rating).toFixed(1)} / 5.0
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">عدد التقييمات</span>
//                     <span className="font-semibold text-gray-900">{product.reviews_count}</span>
//                   </div>
//                   <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                     <span className="text-gray-600 font-medium">الحالة</span>
//                     <span className={`font-semibold ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
//                       {product.in_stock ? 'متوفر' : 'غير متوفر'}
//                     </span>
//                   </div>
//                   {product.stock_quantity && (
//                     <div className="flex justify-between items-center py-3 border-b border-gray-200">
//                       <span className="text-gray-600 font-medium">الكمية المتاحة</span>
//                       <span className="font-semibold text-gray-900">{product.stock_quantity} قطعة</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between items-center py-3">
//                     <span className="text-gray-600 font-medium">تاريخ الإضافة</span>
//                     <span className="font-semibold text-gray-900">
//                       {new Date(product.created_at).toLocaleDateString('ar-IQ', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ProductDetailDialog;









// components/products/ProductDetailDialog.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import type { Product } from '../../../api/types/product.types';
import { useFavorites } from '../../../hooks/useFavorites';
import { useAuth } from '../../../hooks/useAuth';
import { 
  Star, 
  ShoppingCart, 
  Package, 
  Minus, 
  Plus,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  X,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
  product,
  open,
  onOpenChange,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const previousProductRef = useRef<Product | null>(null);
  const imageDebugLoggedRef = useRef(false);

  const isWishlisted = product ? isFavorite(product.id) : false;

  useEffect(() => {
    if (open && product) {
      setQuantity(1);
      setImageError(false);
      setImageLoading(true);
      setActiveTab('description');
      setSelectedImageIndex(0);
      
      if (product.id !== previousProductRef.current?.id) {
        const fullImageUrl = getFullImageUrl(product.image_url);
        console.log('ProductDetailDialog image debug:', {
          originalUrl: product.image_url,
          fullUrl: fullImageUrl,
          productId: product.id,
          productName: product.name
        });
        previousProductRef.current = product;
        imageDebugLoggedRef.current = true;
      }
    } else if (!open) {
      previousProductRef.current = null;
      imageDebugLoggedRef.current = false;
    }
  }, [open, product]);

  const handleQuantityChange = useCallback((delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
      setQuantity(newQuantity);
    }
  }, [quantity, product]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      onAddToCart(product, quantity);
    }
  }, [product, quantity, onAddToCart]);

  const handleImageError = useCallback(() => {
    console.error('Failed to load image:', product?.image_url);
    setImageError(true);
    setImageLoading(false);
  }, [product]);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
    setImageLoading(false);
  }, []);

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!product) return;

    setIsFavoriteLoading(true);
    try {
      await toggleFavorite(product.id);
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

  const getFullImageUrl = useCallback((imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5000${imageUrl}`;
    }
    
    return `http://localhost:5000/uploads/products/${imageUrl}`;
  }, []);

  const fullImageUrl = product ? getFullImageUrl(product.image_url) : null;

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  }, []);

  const formatPrice = useCallback((price: string | number) => {
    const priceNumber = typeof price === 'string' ? parseFloat(price) : price;
    return priceNumber.toLocaleString('ar-IQ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, []);

  const calculateSavings = useCallback(() => {
    if (!product) return '0';
    const original = typeof product.original_price === 'string' 
      ? parseFloat(product.original_price) 
      : product.original_price;
    const current = typeof product.price === 'string' 
      ? parseFloat(product.price) 
      : product.price;
    const savings = original - current;
    return savings.toLocaleString('ar-IQ', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [product]);

  const calculateTotalPrice = useCallback(() => {
    if (!product) return 0;
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price) 
      : product.price;
    return price * quantity;
  }, [product, quantity]);

  if (!product) return null;

  const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0 rtl rounded-3xl bg-white">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all border border-gray-200 hover:shadow-xl"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh] overflow-y-auto">
          {/* LEFT SIDE - Image */}
          <div className="lg:w-2/5 bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col sticky top-0 lg:max-h-[95vh] lg:overflow-y-auto">
            {/* Badges Section */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.badge && (
                <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  ⚡ {product.badge}
                </Badge>
              )}
              
              {product.discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  🔥 {product.discount}% خصم
                </Badge>
              )}

              {!product.in_stock && (
                <Badge className="bg-gray-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  غير متوفر
                </Badge>
              )}
            </div>

            {/* Main Image Container */}
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 mb-4 flex-shrink-0">
              {fullImageUrl && !imageError ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    </div>
                  )}
                  <img
                    src={fullImageUrl}
                    alt={product.name}
                    className={`w-full h-full object-contain p-6 transition-all duration-300 ${
                      imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                    loading="lazy"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
                  {product.emoji_icon ? (
                    <span className="text-7xl mb-4 animate-pulse">{product.emoji_icon}</span>
                  ) : (
                    <Package className="w-20 h-20 text-gray-400 mb-4" />
                  )}
                  <span className="text-gray-500 text-center font-medium">
                    {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة متاحة'}
                  </span>
                </div>
              )}

              {/* Stock Status Indicator */}
              {product.in_stock && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  متوفر
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <Button
                onClick={toggleWishlist}
                disabled={isFavoriteLoading}
                className={`flex-1 h-12 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ml-2 transition-all ${
                    isWishlisted ? 'fill-red-600' : ''
                  } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
                />
                {isWishlisted ? 'في المفضلة' : 'إضافة للمفضلة'}
              </Button>
              <Button 
                className="flex-1 h-12 rounded-2xl font-semibold transition-all duration-300 bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-gray-200"
              >
                <Share2 className="w-5 h-5 ml-2" />
                مشاركة
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE - Details */}
          <div className="lg:w-3/5 p-4 sm:p-6 lg:p-8 overflow-y-auto" dir="rtl">
            {/* Product Title & Name */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {product.name_ar || product.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {product.name}
              </p>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100">
              <div className="flex items-center gap-1">
                {renderStars(parseFloat(product.rating))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {parseFloat(product.rating).toFixed(1)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">
                  {product.reviews_count} تقييم
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6 pb-6 border-b-2 border-gray-100">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl text-gray-400 font-medium">د.ع</span>
                {product.discount > 0 && product.original_price && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
              {product.discount > 0 && product.original_price && (
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full font-semibold text-sm border border-red-200">
                  💰 وفرت {calculateSavings()} د.ع
                </div>
              )}
            </div>

            {/* Stock Status Card */}
            <div className={`mb-6 pb-6 border-b-2 border-gray-100 p-4 rounded-2xl ${
              product.in_stock ? 'bg-green-50 border-b-2 border-green-200' : 'bg-red-50 border-b-2 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                <div
                  className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                    product.in_stock ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div>
                  <p className={`font-semibold text-lg ${
                    product.in_stock ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {product.in_stock 
                      ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ''}`
                      : 'غير متوفر حالياً'
                    }
                  </p>
                  {product.in_stock && (
                    <p className="text-sm text-green-600 mt-1 font-medium">
                      ✓ التوصيل خلال 24-48 ساعة
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.in_stock && (
              <div className="mb-6 pb-6 border-b-2 border-gray-100">
                <p className="text-lg font-bold mb-4 text-gray-900">الكمية المطلوبة</p>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl w-fit">
                  <Button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-11 h-11 rounded-xl p-0 bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="w-16 h-12 flex items-center justify-center text-2xl font-bold text-blue-600 bg-white border-2 border-blue-500 rounded-xl">
                    {quantity}
                  </div>
                  <Button
                    onClick={() => handleQuantityChange(1)}
                    disabled={!isQuantityAvailable}
                    className="w-11 h-11 rounded-xl p-0 bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.in_stock || !isQuantityAvailable}
              className="w-full h-14 text-lg font-bold mb-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.in_stock && isQuantityAvailable ? (
                <>
                  <ShoppingCart className="w-6 h-6 ml-3" />
                  أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
                </>
              ) : (
                'غير متوفر حالياً'
              )}
            </Button>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">شحن مجاني</p>
                  <p className="text-xs text-blue-700">للطلبات فوق 50,000 د.ع</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border-2 border-green-200">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-900">دفع آمن</p>
                  <p className="text-xs text-green-700">معاملات 100% آمنة</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl border-2 border-purple-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-purple-900">إرجاع سهل</p>
                  <p className="text-xs text-purple-700">سياسة إرجاع 30 يوم</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1 rounded-2xl">
                <TabsTrigger 
                  value="description" 
                  className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold text-sm"
                >
                  الوصف
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-blue-600 font-semibold text-sm"
                >
                  المواصفات
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-0">
                <div className="bg-gray-50 p-5 rounded-2xl border-2 border-gray-200">
                  {product.description_ar || product.description ? (
                    <p className="text-gray-700 leading-relaxed text-base" dir="rtl">
                      {product.description_ar || product.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-center italic">لا يوجد وصف متاح</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                <div className="bg-gray-50 p-5 rounded-2xl border-2 border-gray-200 space-y-0">
                  {[
                    { label: 'رقم المنتج', value: product.id },
                    { label: 'العلامة التجارية', value: product.brand },
                    { label: 'الفئة', value: product.category_name_ar || product.category_name },
                    { label: 'التقييم', value: `${parseFloat(product.rating).toFixed(1)} / 5.0` },
                    { label: 'عدد التقييمات', value: product.reviews_count },
                    { label: 'الحالة', value: product.in_stock ? 'متوفر ✓' : 'غير متوفر', isStatus: true },
                    ...(product.stock_quantity ? [{ label: 'الكمية المتاحة', value: `${product.stock_quantity} قطعة` }] : []),
                  ].map((item, idx) => (
                    <div key={idx} className={`flex justify-between items-center py-3 ${idx !== product.stock_quantity ? 'border-b border-gray-200' : ''}`}>
                      <span className="text-gray-600 font-medium text-sm">{item.label}</span>
                      <span className={`font-semibold text-sm ${item.isStatus && !product.in_stock ? 'text-red-600' : item.isStatus ? 'text-green-600' : 'text-gray-900'}`}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;