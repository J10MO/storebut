
// import React from 'react';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart } = useCart();

//   const handleAddToCart = () => {
//     addToCart(product, 1);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       {/* Product Image */}
//       <div className="aspect-w-16 aspect-h-9 bg-gray-100">
//         {product.image_url ? (
//           <img 
//             src={product.image_url} 
//             alt={product.name}
//             className="w-full h-48 object-cover"
//           />
//         ) : (
//           <div className="w-full h-48 flex items-center justify-center bg-gray-100">
//             {product.emoji_icon ? (
//               <span className="text-4xl">{product.emoji_icon}</span>
//             ) : (
//               <span className="text-4xl">📦</span>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="p-4">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
//           {product.badge && (
//             <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//               {product.badge}
//             </span>
//           )}
//         </div>
        
//         <p className="text-gray-600 text-sm mb-2">{product.name_ar}</p>
        
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-2xl font-bold text-green-600">
//             ${product.price}
//           </span>
//           {product.discount > 0 && (
//             <span className="text-sm text-red-500 line-through">
//               ${product.original_price}
//             </span>
//           )}
//         </div>

//         {product.discount > 0 && (
//           <div className="text-sm text-red-600 mb-2">
//             Save {product.discount}%
//           </div>
//         )}

//         <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//           <span>Brand: {product.brand}</span>
//           <span className={product.in_stock ? 'text-green-600' : 'text-red-600'}>
//             {product.in_stock ? 'In Stock' : 'Out of Stock'}
//           </span>
//         </div>

//         {/* Add to Cart Button */}
//         <button
//           onClick={handleAddToCart}
//           disabled={!product.in_stock}
//           className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
//             product.in_stock
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;




// import React, { useState } from 'react';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';

// // Props interface
// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart } = useCart();
//   const [open, setOpen] = useState(false);

//   const handleAddToCart = () => {
//     if (product.in_stock) {
//       addToCart(product, 1);
//     }
//   };

//   // Determine display image/icon
//   const renderIconOrImage = () => {
//     if (product.image_url) {
//       return (
//         <img
//           src={product.image_url}
//           alt={product.name}
//           className="h-40 w-full object-cover rounded-t-lg"
//         />
//       );
//     }

//     if (product.emoji_icon) {
//       return (
//         <div className="h-40 w-full flex items-center justify-center bg-gray-50 rounded-t-lg text-4xl">
//           {product.emoji_icon}
//         </div>
//       );
//     }

//     // Fallback emoji
//     return (
//       <div className="h-40 w-full flex items-center justify-center bg-gray-50 rounded-t-lg text-4xl">
//         📦
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setOpen(true)}>
//         {/* Image / Icon area (click to open details) */}
//         {renderIconOrImage()}

//         {/* Card content */}
//         <div className="p-4">
//           <div className="flex justify-between items-start mb-2">
//             <h3 className="text-lg font-semibold text-gray-900 truncate w-3/4">{product.name}</h3>
//             {product.badge && (
//               <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                 {product.badge}
//               </span>
//             )}
//           </div>

//           <p className="text-gray-600 text-sm mb-2 line-clamp-1">{product.name_ar}</p>

//           <div className="flex items-center justify-between mb-2">
//             <span className="text-2xl font-bold text-green-600">
//               ${product.price}
//             </span>
//             {product.discount > 0 && (
//               <span className="text-sm text-red-500 line-through">
//                 ${product.original_price}
//               </span>
//             )}
//           </div>

//           {product.discount > 0 && (
//             <div className="text-sm text-red-600 mb-2">
//               Save {product.discount}%
//             </div>
//           )}

//           <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//             <span>Brand: {product.brand}</span>
//             <span className={product.in_stock ? 'text-green-600' : 'text-red-600'}>
//               {product.in_stock ? 'In Stock' : 'Out of Stock'}
//             </span>
//           </div>

//           <button
//             onClick={(e) => {
//               e.stopPropagation(); // prevent triggering card open
//               handleAddToCart();
//             }}
//             disabled={!product.in_stock}
//             className={`w-full py-2 px-4 rounded-lg font-medium transition-colors mt-1 ${
//               product.in_stock
//                 ? 'bg-blue-600 text-white hover:bg-blue-700'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
//           </button>
//         </div>
//       </div>

//       {/* Details Drawer/Sheet (Shadcn-like modal) */}
//       {open && (
//         <div
//           role="dialog"
//           aria-label="Product details"
//           className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:justify-center"
//         >
//           <div className="bg-white rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md mx-2 sm:mx-0 overflow-hidden">
//             <div className="px-4 py-3 border-b flex items-center justify-between">
//               <h4 className="text-lg font-semibold">Product Details</h4>
//               <button
//                 className="text-gray-600 hover:text-gray-900"
//                 onClick={() => setOpen(false)}
//                 aria-label="Close"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="p-4 space-y-3">
//               <div className="flex items-center space-x-3">
//                 {product.image_url ? (
//                   <img src={product.image_url} alt={product.name} className="h-12 w-12 object-cover rounded" />
//                 ) : (
//                   <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded">
//                     {product.emoji_icon ?? '📦'}
//                   </div>
//                 )}
//                 <div>
//                   <div className="font-semibold">{product.name}</div>
//                   <div className="text-sm text-gray-500">{product.brand}</div>
//                 </div>
//               </div>

//               <p className="text-sm text-gray-700">{product.description || product.description_ar}</p>

//               <div className="flex items-center justify-between">
//                 <span className="text-xl font-bold text-green-600">${product.price}</span>
//                 {product.discount > 0 && (
//                   <span className="text-sm text-red-500">
//                     Save {product.discount}%
//                   </span>
//                 )}
//               </div>

//               <div className="flex items-center justify-between text-sm text-gray-500">
//                 <span>Category: {product.category_name}</span>
//                 <span className={product.in_stock ? 'text-green-600' : 'text-red-600'}>
//                   {product.in_stock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>

//               <button
//                 onClick={() => {
//                   if (product.in_stock) {
//                     addToCart(product, 1);
//                     setOpen(false);
//                   }
//                 }}
//                 className={`w-full py-2 px-4 rounded-lg font-medium ${
//                   product.in_stock ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//           {/* backdrop to close on click outside the panel */}
//           <div
//             className="fixed inset-0 bg-black opacity-40"
//             onClick={() => setOpen(false)}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default ProductCard;



// // components/products/ProductCard.tsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';
// import ProductDetailDialog from './Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package } from 'lucide-react';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart } = useCart();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//     const handleAddToCart = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     addToCart(product, 1);
//   };

//   const handleViewDetails = () => {
//     setIsDialogOpen(true);
//   };

//   const handleAddToCartFromDialog = (product: Product, quantity: number) => {
//     addToCart(product, quantity);
//   };

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

//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={handleViewDetails}
//       >
//         {/* Badges */}
//         <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
//           {product.badge && (
//             <Badge className="bg-blue-600 text-white shadow-lg">
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-red-600 text-white shadow-lg">
//               -{product.discount}%
//             </Badge>
//           )}
//         </div>

//         {/* Stock Badge */}
//         <div className="absolute top-2 right-2 z-10">
//           {!product.in_stock && (
//             <Badge variant="destructive" className="shadow-lg">
//               Out of Stock
//             </Badge>
//           )}
//         </div>

//         {/* Product Image */}
//         <div className="relative aspect-square bg-gray-100 overflow-hidden">
//           {product.image_url ? (
//             <img
//               src={product.image_url}
//               alt={product.name}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//               {product.emoji_icon ? (
//                 <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-20 h-20 text-gray-400 transition-transform duration-300 group-hover:scale-110" />
//               )}
//             </div>
//           )}

//           {/* Hover Overlay */}
//           <div
//             className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <Button
//               size="sm"
//               variant="secondary"
//               className="bg-white hover:bg-gray-100"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <Eye className="w-4 h-4 mr-1" />
//               View Details
//             </Button>
//           </div>
//         </div>

//         <CardHeader className="pb-3">
//           <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
//             {product.name}
//           </CardTitle>
//           <CardDescription className="text-sm line-clamp-1">
//             {product.name_ar}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="pb-3 space-y-3">
//           {/* Brand */}
//                     <div className="text-sm text-gray-600">
//             <span className="font-medium">Brand:</span> {product.brand}
//           </div>

//           {/* Category */}
//           <div className="text-xs text-gray-500">
//             {product.category_name}
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//             <span className="text-xs text-gray-600">
//               {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//             </span>
//           </div>

//           {/* Price Section */}
//           <div className="space-y-1">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold text-green-600">
//                 ${product.price}
//               </span>
//               {product.discount > 0 && (
//                 <span className="text-sm text-gray-400 line-through">
//                   ${product.original_price}
//                 </span>
//               )}
//             </div>
//             {product.discount > 0 && (
//               <p className="text-xs text-red-600 font-medium">
//                 Save ${(parseFloat(product.original_price) - parseFloat(product.price)).toFixed(2)}
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock}
//             className={`w-full transition-all duration-300 ${
//               product.in_stock
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-4 h-4 mr-2" />
//                 Add to Cart
//               </>
//             ) : (
//               'Out of Stock'
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Product Detail Dialog */}
//       <ProductDetailDialog
//         product={product}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         onAddToCart={handleAddToCartFromDialog}
//       />
//     </>
//   );
// };

// export default ProductCard;





// // components/products/ProductDetailDialog.tsx
// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '../ui/dialog';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { Separator } from '../ui/separator';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
// import type { Product } from '../../api/types/product.types';
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
//   Loader2
// } from 'lucide-react';
// import { toast } from 'sonner';

// interface ProductDetailDialogProps {
//   product: Product | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onAddToCart: (product: Product, quantity: number) => Promise<void>;
// }

// const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({
//   product,
//   open,
//   onOpenChange,
//   onAddToCart,
// }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   if (!product) return null;

//   const handleQuantityChange = (delta: number) => {
//     const newQuantity = quantity + delta;
//     if (newQuantity >= 1 && newQuantity <= 99) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleAddToCart = async () => {
//     try {
//       setIsAddingToCart(true);
//       await onAddToCart(product, quantity);
//       onOpenChange(false);
//       setQuantity(1); // Reset quantity after successful add
//     } catch (error) {
//       // Error is already handled in parent component
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.name,
//         text: product.description,
//         url: window.location.href,
//       }).catch((error) => console.log('Error sharing:', error));
//     } else {
//       // Fallback: copy to clipboard
//       navigator.clipboard.writeText(window.location.href);
//       toast.success('Link copied to clipboard!');
//     }
//   };

//   const handleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//     toast.success(
//       isWishlisted ? 'Removed from wishlist' : 'Added to wishlist'
//     );
//   };

//   const renderStars = (rating: number) => {
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
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
//           {/* Left Side - Product Image */}
//           <div className="relative bg-gray-50 p-6 md:p-8">
//             <div className="sticky top-8">
//               {product.badge && (
//                 <Badge 
//                   variant="secondary" 
//                   className="absolute top-4 left-4 z-10 bg-blue-600 text-white hover:bg-blue-700"
//                 >
//                   {product.badge}
//                 </Badge>
//               )}
              
//               {product.discount > 0 && (
//                 <Badge 
//                   variant="destructive" 
//                                   className="absolute top-4 right-4 z-10 bg-red-600 text-white hover:bg-red-700"
//                 >
//                   -{product.discount}% OFF
//                 </Badge>
//               )}

//               <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
//                 {product.image_url ? (
//                   <img
//                     src={product.image_url}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//                     {product.emoji_icon ? (
//                       <span className="text-9xl">{product.emoji_icon}</span>
//                     ) : (
//                       <Package className="w-32 h-32 text-gray-400" />
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-2 mt-4">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   className="flex-1"
//                   onClick={handleWishlist}
//                 >
//                   <Heart
//                     className={`w-5 h-5 transition-colors ${
//                       isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//                     }`}
//                   />
//                 </Button>
//                 <Button 
//                   variant="outline" 
//                   size="icon" 
//                   className="flex-1"
//                   onClick={handleShare}
//                 >
//                   <Share2 className="w-5 h-5" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Product Details */}
//           <div className="p-6 md:p-8">
//             <DialogHeader className="text-left mb-6">
//               <DialogTitle className="text-2xl md:text-3xl font-bold mb-2">
//                 {product.name}
//               </DialogTitle>
//               <DialogDescription className="text-base md:text-lg text-gray-600">
//                 {product.name_ar}
//               </DialogDescription>
//             </DialogHeader>

//             {/* Rating and Reviews */}
//             <div className="flex items-center gap-4 mb-6">
//               <div className="flex items-center gap-1">
//                 {renderStars(parseFloat(product.rating))}
//               </div>
//               <span className="text-sm font-medium">
//                 {parseFloat(product.rating).toFixed(1)}
//               </span>
//               <span className="text-sm text-gray-500">
//                 ({product.reviews_count} {product.reviews_count === 1 ? 'review' : 'reviews'})
//               </span>
//             </div>

//             {/* Brand and Category */}
//             <div className="grid grid-cols-2 gap-4 mb-6">
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Brand</p>
//                 <p className="text-base font-semibold">{product.brand}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Category</p>
//                 <p className="text-base font-semibold">{product.category_name}</p>
//               </div>
//             </div>

//             <Separator className="mb-6" />

//             {/* Price Section */}
//             <div className="mb-6">
//               <div className="flex items-baseline gap-3 mb-2">
//                 <span className="text-3xl md:text-4xl font-bold text-green-600">
//                   ${product.price}
//                 </span>
//                 {product.discount > 0 && (
//                   <span className="text-lg md:text-xl text-gray-400 line-through">
//                     ${product.original_price}
//                   </span>
//                                   )}
//               </div>
//               {product.discount > 0 && (
//                 <p className="text-red-600 font-medium">
//                   You save ${(parseFloat(product.original_price) - parseFloat(product.price)).toFixed(2)} ({product.discount}% off)
//                 </p>
//               )}
//             </div>

//             {/* Stock Status */}
//             <div className="mb-6">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     product.in_stock ? 'bg-green-500' : 'bg-red-500'
//                   }`}
//                 />
//                 <span
//                   className={`font-medium ${
//                     product.in_stock ? 'text-green-600' : 'text-red-600'
//                   }`}
//                 >
//                   {product.in_stock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//               {product.in_stock && (
//                 <p className="text-sm text-gray-600 mt-1">
//                   Available for immediate delivery
//                 </p>
//               )}
//             </div>

//             <Separator className="mb-6" />

//             {/* Quantity Selector */}
//             {product.in_stock && (
//               <div className="mb-6">
//                 <p className="text-sm font-medium mb-2">Quantity</p>
//                 <div className="flex items-center gap-3">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => handleQuantityChange(-1)}
//                     disabled={quantity <= 1}
//                     className="h-10 w-10"
//                   >
//                     <Minus className="w-4 h-4" />
//                   </Button>
//                   <div className="w-16 h-10 flex items-center justify-center border border-gray-300 rounded-md font-semibold text-lg">
//                     {quantity}
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => handleQuantityChange(1)}
//                     disabled={quantity >= 99}
//                     className="h-10 w-10"
//                   >
//                     <Plus className="w-4 h-4" />
//                   </Button>
//                   <span className="text-sm text-gray-600 ml-2">
//                     Total: ${(parseFloat(product.price) * quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <Button
//               onClick={handleAddToCart}
//               disabled={!product.in_stock || isAddingToCart}
//               className="w-full h-12 text-lg font-semibold mb-6"
//               size="lg"
//             >
//               {isAddingToCart ? (
//                 <>
//                   <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                   Adding to Cart...
//                 </>
//               ) : product.in_stock ? (
//                 <>
//                   <ShoppingCart className="w-5 h-5 mr-2" />
//                   Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
//                 </>
//               ) : (
//                 'Out of Stock'
//               )}
//             </Button>

//             {/* Features */}
//             <div className="grid grid-cols-1 gap-3 mb-6">
//               <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
//                 <Truck className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-blue-900">Free Shipping</p>
//                   <p className="text-xs text-blue-700">On orders over $50</p>
//                 </div>
//               </div>
//                             <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
//                 <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-green-900">Secure Payment</p>
//                   <p className="text-xs text-green-700">100% secure transactions</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
//                 <RotateCcw className="w-5 h-5 text-purple-600 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm font-medium text-purple-900">Easy Returns</p>
//                   <p className="text-xs text-purple-700">30-day return policy</p>
//                 </div>
//               </div>
//             </div>

//             <Separator className="mb-6" />

//             {/* Product Information Tabs */}
//             <Tabs defaultValue="description" className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="description">Description</TabsTrigger>
//                 <TabsTrigger value="details">Details</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="description" className="mt-4 space-y-4">
//                 <div>
//                   <h4 className="font-semibold mb-2 text-gray-900">English Description</h4>
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     {product.description || 'No description available for this product.'}
//                   </p>
//                 </div>
//                 <Separator />
//                 <div>
//                   <h4 className="font-semibold mb-2 text-gray-900">Arabic Description / الوصف بالعربية</h4>
//                   <p className="text-sm text-gray-600 leading-relaxed" dir="rtl">
//                     {product.description_ar || 'لا يوجد وصف متاح لهذا المنتج.'}
//                   </p>
//                 </div>
//               </TabsContent>
              
//               <TabsContent value="details" className="mt-4">
//                 <div className="space-y-0">
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Product ID</span>
//                     <span className="text-sm font-medium text-gray-900">{product.id}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Brand</span>
//                     <span className="text-sm font-medium text-gray-900">{product.brand}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Category</span>
//                     <span className="text-sm font-medium text-gray-900">{product.category_name}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Category (Arabic)</span>
//                     <span className="text-sm font-medium text-gray-900" dir="rtl">{product.category_name_ar}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Rating</span>
//                     <span className="text-sm font-medium text-gray-900">
//                                             {parseFloat(product.rating).toFixed(1)} / 5.0
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Reviews</span>
//                     <span className="text-sm font-medium text-gray-900">{product.reviews_count}</span>
//                   </div>
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Availability</span>
//                     <span className={`text-sm font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
//                       {product.in_stock ? 'In Stock' : 'Out of Stock'}
//                     </span>
//                   </div>
//                   {product.discount > 0 && (
//                     <div className="flex justify-between py-3 border-b border-gray-200">
//                       <span className="text-sm text-gray-600">Discount</span>
//                       <span className="text-sm font-medium text-red-600">{product.discount}%</span>
//                     </div>
//                   )}
//                   <div className="flex justify-between py-3 border-b border-gray-200">
//                     <span className="text-sm text-gray-600">Added Date</span>
//                     <span className="text-sm font-medium text-gray-900">
//                       {new Date(product.created_at).toLocaleDateString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                   </div>
//                   <div className="flex justify-between py-3">
//                     <span className="text-sm text-gray-600">Last Updated</span>
//                     <span className="text-sm font-medium text-gray-900">
//                       {new Date(product.updated_at).toLocaleDateString('en-US', {
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




// // components/products/ProductCard.tsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';
// import ProductDetailDialog from './Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2 } from 'lucide-react';
// import { toast } from 'sonner'; // Install: npm install sonner

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart, isLoading } = useCart();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!product.in_stock || isAddingToCart) return;

//     try {
//       setIsAddingToCart(true);
//       await addToCart(product, 1);
//            toast.success(`${product.name} added to cart!`, {
//         description: `Quantity: 1 | Price: $${product.price}`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast.error('Failed to add to cart', {
//         description: 'Please try again later.',
//         duration: 3000,
//       });
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const handleViewDetails = () => {
//     setIsDialogOpen(true);
//   };

//   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
//     try {
//       await addToCart(product, quantity);
//       toast.success(`${product.name} added to cart!`, {
//         description: `Quantity: ${quantity} | Total: $${(parseFloat(product.price) * quantity).toFixed(2)}`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast.error('Failed to add to cart', {
//         description: 'Please try again later.',
//         duration: 3000,
//       });
//     }
//   };

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

//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-200"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={handleViewDetails}
//       >
//         {/* Badges */}
//         <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
//           {product.badge && (
//             <Badge className="bg-blue-600 text-white shadow-lg hover:bg-blue-700">
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-red-600 text-white shadow-lg hover:bg-red-700">
//               -{product.discount}%
//             </Badge>
//           )}
//         </div>

//         {/* Stock Badge */}
//         <div className="absolute top-2 right-2 z-10">
//           {!product.in_stock && (
//             <Badge variant="destructive" className="shadow-lg">
//               Out of Stock
//             </Badge>
//           )}
//         </div>

//         {/* Product Image */}
//         <div className="relative aspect-square bg-gray-100 overflow-hidden">
//           {product.image_url ? (
//             <img
//               src={product.image_url}
//               alt={product.name}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//               {product.emoji_icon ? (
//                 <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-20 h-20 text-gray-400 transition-transform duration-300 group-hover:scale-110" />
//               )}
//             </div>
//           )}

//           {/* Hover Overlay */}
//           <div
//             className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 transition-opacity duration-300 ${
//               isHovered ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <Button
//               size="sm"
//                             variant="secondary"
//               className="bg-white hover:bg-gray-100"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <Eye className="w-4 h-4 mr-1" />
//               View Details
//             </Button>
//           </div>
//         </div>

//         <CardHeader className="pb-3">
//           <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
//             {product.name}
//           </CardTitle>
//           <CardDescription className="text-sm line-clamp-1">
//             {product.name_ar}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="pb-3 space-y-3">
//           {/* Brand */}
//           <div className="text-sm text-gray-600">
//             <span className="font-medium">Brand:</span> {product.brand}
//           </div>

//           {/* Category */}
//           <div className="text-xs text-gray-500 flex items-center gap-1">
//             <span className="bg-gray-100 px-2 py-1 rounded">{product.category_name}</span>
//           </div>

//           {/* Rating */}
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//             <span className="text-xs text-gray-600">
//               {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//             </span>
//           </div>

//           {/* Price Section */}
//           <div className="space-y-1">
//             <div className="flex items-baseline gap-2">
//               <span className="text-2xl font-bold text-green-600">
//                 ${product.price}
//               </span>
//               {product.discount > 0 && (
//                 <span className="text-sm text-gray-400 line-through">
//                   ${product.original_price}
//                 </span>
//               )}
//             </div>
//             {product.discount > 0 && (
//               <p className="text-xs text-red-600 font-medium">
//                 Save ${(parseFloat(product.original_price) - parseFloat(product.price)).toFixed(2)}
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full transition-all duration-300 ${
//               product.in_stock
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Adding...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-4 h-4 mr-2" />
//                 Add to Cart
//               </>
//             ) : (
//               'Out of Stock'
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Product Detail Dialog */}
//       <ProductDetailDialog
//         product={product}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         onAddToCart={handleAddToCartFromDialog}
//       />
//     </>
//   );
// };

// export default ProductCard;





// // components/products/ProductCard.tsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';
// import ProductDetailDialog from './Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2, Heart } from 'lucide-react';
// import { toast } from 'sonner';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const { addToCart, isLoading } = useCart();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     if (!product.in_stock || isAddingToCart) return;

//     try {
//       setIsAddingToCart(true);
//       await addToCart(product, 1);
//       toast.success('تمت الإضافة إلى السلة!', {
//         description: `${product.name} | الكمية: 1`,
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

//   const handleViewDetails = () => {
//     setIsDialogOpen(true);
//   };

//   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
//     try {
//       await addToCart(product, quantity);
//       toast.success('تمت الإضافة إلى السلة!', {
//         description: `${product.name} | الكمية: ${quantity}`,
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

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-2 h-2 sm:w-3 sm:h-3 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };
//   console.log('Product', product)

//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl"
//         onClick={handleViewDetails}
//       >
//         {/* Badges */}
//         <div className="absolute top-1 left-1 z-10 flex flex-col gap-1">
//           {product.badge && (
//             <Badge className="bg-blue-600 text-white text-[10px] px-1 py-0 h-4">
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-red-600 text-white text-[10px] px-1 py-0 h-4">
//               {product.discount}%-
//             </Badge>
//           )}
//         </div>

//         {/* Wishlist Button */}
//         <button
//           onClick={toggleWishlist}
//           className="absolute top-1 right-1 z-10 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
//         >
//           <Heart
//             className={`w-3 h-3 transition-all ${
//               isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//             }`}
//           />
//         </button>

//         {/* Stock Badge */}
//         {!product.in_stock && (
//           <div className="absolute top-8 right-1 z-10">
//             <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
//               غير متوفر
//             </Badge>
//           </div>
//         )}

//         {/* Product Image */}
//         <div className="relative aspect-square bg-gray-100 overflow-hidden">
//           {product.image_url ? (
//             <img
//               src={product.image_url}
//               alt={product.name}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               loading="lazy"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
//               {product.emoji_icon ? (
//                 <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-8 h-8 text-gray-400" />
//               )}
//             </div>
//           )}

//           {/* Quick View Button */}
//           <div className="absolute bottom-1 left-1">
//             <Button
//               size="sm"
//               className="h-6 text-xs bg-black/70 text-white hover:bg-black/90"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <Eye className="w-3 h-3 mr-1" />
//               عرض
//             </Button>
//           </div>
//         </div>

//         <CardHeader className="pb-2 px-3 pt-3">
//           <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 leading-tight min-h-[2.5rem]">
//             {product.name}
//           </h3>
//           <p className="text-xs text-gray-600 line-clamp-1 mt-1">
//             {product.name_ar}
//           </p>
//         </CardHeader>

//         <CardContent className="pb-2 px-3 space-y-2">
//           {/* Rating */}
//           <div className="flex items-center gap-1">
//             <div className="flex items-center gap-0.5">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//             <span className="text-[10px] text-gray-600">
//               {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//             </span>
//           </div>

//           {/* Price Section */}
//           <div className="space-y-0.5">
//             <div className="flex items-center gap-1">
//               <span className="text-base font-bold text-green-600">
//                 ${product.price}
//               </span>
//               {product.discount > 0 && (
//                 <span className="text-xs text-gray-400 line-through">
//                   ${product.original_price}
//                 </span>
//               )}
//             </div>
//             {product.discount > 0 && (
//               <p className="text-[10px] text-red-600 font-medium">
//                 وفر ${(parseFloat(product.original_price) - parseFloat(product.price)).toFixed(2)}
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0 px-3 pb-3">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full h-8 text-xs transition-all duration-300 ${
//               product.in_stock
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-3 h-3 mr-1 animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-3 h-3 mr-1" />
//                 أضف إلى السلة
//               </>
//             ) : (
//               'غير متوفر'
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Product Detail Dialog */}
//       <ProductDetailDialog
//         product={product}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         onAddToCart={handleAddToCartFromDialog}
//       />
//     </>
//   );
// };

// export default ProductCard;





// // components/products/ProductCard.tsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';
// import ProductDetailDialog from './Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2, Heart, Image as ImageIcon } from 'lucide-react';
// import { toast } from 'sonner';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
//         description: `${product.name} | الكمية: 1`,
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

//   const handleViewDetails = () => {
//     setIsDialogOpen(true);
//   };

//   const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
//     try {
//       await addToCart(product, quantity);
//       toast.success('تمت الإضافة إلى السلة!', {
//         description: `${product.name} | الكمية: ${quantity}`,
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
//     console.error('Failed to load image:', product.image_url);
//     setImageError(true);
//     setImageLoading(false);
//   };

//   const handleImageLoad = () => {
//     setImageError(false);
//     setImageLoading(false);
//   };

//   // دالة لإنشاء رابط صورة كامل
//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     // إذا كان الرابط يحتوي على http فهو كامل
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     // إذا كان الرابط يبدأ بـ / فهو مسار مطلق
//     if (imageUrl.startsWith('/')) {
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     // إذا كان مجرد اسم ملف
//     return `http://localhost:5000/uploads/products/${imageUrl}`;
//   };

//   const fullImageUrl = getFullImageUrl(product.image_url);

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-2 h-2 sm:w-3 sm:h-3 ${
//           index < Math.floor(rating)
//             ? 'fill-yellow-400 text-yellow-400'
//             : 'text-gray-300'
//         }`}
//       />
//     ));
//   };

//   console.log('Product image debug:', {
//     originalUrl: product.image_url,
//     fullUrl: fullImageUrl,
//     productId: product.id,
//     productName: product.name
//   });

//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl"
//         onClick={handleViewDetails}
//       >
//         {/* Badges */}
//         <div className="absolute top-1 left-1 z-10 flex flex-col gap-1">
//           {product.badge && (
//             <Badge className="bg-blue-600 text-white text-[10px] px-1 py-0 h-4">
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-red-600 text-white text-[10px] px-1 py-0 h-4">
//               {product.discount}%-
//             </Badge>
//           )}
//         </div>

//         {/* Wishlist Button */}
//         <button
//           onClick={toggleWishlist}
//           className="absolute top-1 right-1 z-10 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
//         >
//           <Heart
//             className={`w-3 h-3 transition-all ${
//               isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//             }`}
//           />
//         </button>

//         {/* Stock Badge */}
//         {!product.in_stock && (
//           <div className="absolute top-8 right-1 z-10">
//             <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
//               غير متوفر
//             </Badge>
//           </div>
//         )}

//         {/* Product Image */}
//         <div className="relative aspect-square bg-gray-100 overflow-hidden">
//           {fullImageUrl && !imageError ? (
//             <>
//               {imageLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                   <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
//                 </div>
//               )}
//               <img
//                 src={fullImageUrl}
//                 alt={product.name}
//                 className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
//                 <span className="text-3xl transition-transform duration-300 group-hover:scale-110 mb-2">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
//               )}
//               <span className="text-xs text-gray-500 text-center">
//                 {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
//               </span>
//             </div>
//           )}

//           {/* Quick View Button */}
//           <div className="absolute bottom-1 left-1">
//             <Button
//               size="sm"
//               className="h-6 text-xs bg-black/70 text-white hover:bg-black/90"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <Eye className="w-3 h-3 mr-1" />
//               عرض
//             </Button>
//           </div>
//         </div>

//         <CardHeader className="pb-2 px-3 pt-3">
//           <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 leading-tight min-h-[2.5rem]">
//             {product.name}
//           </h3>
//           <p className="text-xs text-gray-600 line-clamp-1 mt-1">
//             {product.name_ar}
//           </p>
//         </CardHeader>

//         <CardContent className="pb-2 px-3 space-y-2">
//           {/* Rating */}
//           <div className="flex items-center gap-1">
//             <div className="flex items-center gap-0.5">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//             <span className="text-[10px] text-gray-600">
//               {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//             </span>
//           </div>

//           {/* Price Section */}
//           <div className="space-y-0.5">
//             <div className="flex items-center gap-1">
//               <span className="text-base font-bold text-green-600">
//                 ${product.price}
//               </span>
//               {product.discount > 0 && product.original_price && (
//                 <span className="text-xs text-gray-400 line-through">
//                   ${product.original_price}
//                 </span>
//               )}
//             </div>
//             {product.discount > 0 && product.original_price && (
//               <p className="text-[10px] text-red-600 font-medium">
//                 وفر ${(parseFloat(product.original_price) - parseFloat(product.price)).toFixed(2)}
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0 px-3 pb-3">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full h-8 text-xs transition-all duration-300 ${
//               product.in_stock
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-3 h-3 mr-1 animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-3 h-3 mr-1" />
//                 أضف إلى السلة
//               </>
//             ) : (
//               'غير متوفر'
//             )}
//           </Button>
//         </CardFooter>
//       </Card>

//       {/* Product Detail Dialog */}
//       <ProductDetailDialog
//         product={product}
//         open={isDialogOpen}
//         onOpenChange={setIsDialogOpen}
//         onAddToCart={handleAddToCartFromDialog}
//       />
//     </>
//   );
// };

// export default ProductCard;





// // components/products/ProductCard.tsx
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';
// import ProductDetailDialog from './Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2, Heart } from 'lucide-react';
// import { toast } from 'sonner';

// interface ProductCardProps {
//   product: Product;
//   variant?: 'vertical' | 'horizontal';
// }

// const ProductCard: React.FC<ProductCardProps> = ({ 
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

//   const handleViewDetails = () => {
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
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/products/${imageUrl}`;
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

//   // العرض الأفقي
//   if (variant === 'horizontal') {
//     return (
//       <>
//         <Card className="flex flex-row hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl h-32">
//           {/* الصورة */}
//           <div className="relative w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0 rounded-l-xl">
//             {fullImageUrl && !imageError ? (
//               <>
//                 {imageLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
//                   </div>
//                 )}
//                 <img
//                   src={fullImageUrl}
//                   alt={product.name}
//                   className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
//                   <span className="text-2xl">{product.emoji_icon}</span>
//                 ) : (
//                   <Package className="w-8 h-8 text-gray-400" />
//                 )}
//               </div>
//             )}
//           </div>

//           {/* المحتوى */}
//           <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
//             <div className="flex-1">
//               <h3 className="font-semibold text-base line-clamp-2 text-gray-900 leading-tight">
//                 {product.name_ar || product.name}
//               </h3>
//               <p className="text-sm text-gray-600 line-clamp-1 mt-1">
//                 {product.name}
//               </p>
              
//               {/* التقييم */}
//               <div className="flex items-center gap-1 mt-2">
//                 <div className="flex items-center gap-0.5">
//                   {renderStars(parseFloat(product.rating))}
//                 </div>
//                 <span className="text-xs text-gray-600">
//                   {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-green-600">
//                   {formatPrice(product.price)} د.ع
//                 </span>
//                 {product.discount > 0 && product.original_price && (
//                   <span className="text-sm text-gray-400 line-through">
//                     {formatPrice(product.original_price)} د.ع
//                   </span>
//                 )}
//               </div>
              
//               <Button
//                 onClick={handleAddToCart}
//                 disabled={!product.in_stock || isAddingToCart || isLoading}
//                 className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {isAddingToCart ? (
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                 ) : product.in_stock ? (
//                   <ShoppingCart className="w-4 h-4" />
//                 ) : (
//                   'غير متوفر'
//                 )}
//               </Button>
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

//   // العرض العمودي (الإفتراضي)
//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl"
//         onClick={handleViewDetails}
//       >
//         {/* البادجات */}
//         <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//           {product.badge && (
//             <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-red-600 text-white text-xs px-2 py-1">
//               {product.discount}% خصم
//             </Badge>
//           )}
//         </div>

//         {/* زر المفضلة */}
//         <button
//           onClick={toggleWishlist}
//           className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
//         >
//           <Heart
//             className={`w-4 h-4 transition-all ${
//               isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//             }`}
//           />
//         </button>

//         {/* حالة التوفر */}
//         {!product.in_stock && (
//           <div className="absolute top-12 right-2 z-10">
//             <Badge variant="destructive" className="text-xs px-2 py-1">
//               غير متوفر
//             </Badge>
//           </div>
//         )}

//         {/* صورة المنتج */}
//         <div className="relative aspect-square bg-gray-100 overflow-hidden">
//           {fullImageUrl && !imageError ? (
//             <>
//               {imageLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                   <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
//                 </div>
//               )}
//               <img
//                 src={fullImageUrl}
//                 alt={product.name}
//                 className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
//                 <span className="text-4xl transition-transform duration-300 group-hover:scale-110 mb-2">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-12 h-12 text-gray-400 mb-2" />
//               )}
//               <span className="text-xs text-gray-500 text-center">
//                 {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
//               </span>
//             </div>
//           )}

//           {/* زر العرض السريع */}
//           <div className="absolute bottom-2 left-2">
//             <Button
//               size="sm"
//               className="h-8 text-xs bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <Eye className="w-3 h-3 ml-1" />
//               عرض سريع
//             </Button>
//           </div>
//         </div>

//         {/* محتوى البطاقة */}
//         <CardHeader className="pb-3 px-4 pt-4">
//           <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 leading-tight min-h-[2.5rem]">
//             {product.name_ar || product.name}
//           </h3>
//           <p className="text-xs text-gray-600 line-clamp-1 mt-1">
//             {product.name}
//           </p>
//         </CardHeader>

//         <CardContent className="pb-3 px-4 space-y-2">
//           {/* التقييم */}
//           <div className="flex items-center gap-1">
//             <div className="flex items-center gap-0.5">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//             <span className="text-xs text-gray-600">
//               {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//             </span>
//           </div>

//           {/* السعر */}
//           <div className="space-y-1">
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold text-green-600">
//                 {formatPrice(product.price)} د.ع
//               </span>
//               {product.discount > 0 && product.original_price && (
//                 <span className="text-sm text-gray-400 line-through">
//                   {formatPrice(product.original_price)} د.ع
//                 </span>
//               )}
//             </div>
//             {product.discount > 0 && product.original_price && (
//               <p className="text-xs text-red-600 font-medium">
//                 توفير {formatPrice((parseFloat(product.original_price) - parseFloat(product.price)).toString())} د.ع
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0 px-4 pb-4">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full h-9 text-sm transition-all duration-300 ${
//               product.in_stock
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-4 h-4 ml-1 animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-4 h-4 ml-1" />
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

// export default ProductCard;





// // components/products/ProductCard.tsx
// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
// } from '../ui/card';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import type { Product } from '../../api/types/product.types';
// import { useCart } from '../../hooks/useCart';
// import { useFavorites } from '../../hooks/useFavorites';
// import { useAuth } from '../../hooks/useAuth';
// import ProductDetailDialog from './Product/Productdaialog';
// import { ShoppingCart, Eye, Star, Package, Loader2, Heart } from 'lucide-react';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';

// interface ProductCardProps {
//   product: Product;
//   variant?: 'vertical' | 'horizontal';
// }

// const ProductCard: React.FC<ProductCardProps> = ({ 
//   product, 
//   variant = 'vertical' 
// }) => {
//   const { addToCart, isLoading } = useCart();
//   const { toggleFavorite, addToFavorites } = useFavorites();
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
//           const favoriteStatus = await addToFavorites(product.id);
//           setIsWishlisted(favoriteStatus);
//         } catch (error) {
//           console.error('Error checking favorite status:', error);
//         }
//       }
//     };
    
//     checkFavoriteStatus();
//   }, [product.id, isAuthenticated, addToFavorites]);

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

//   const handleViewDetails = () => {
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
      
//       toast.success(newFavoriteStatus ? 'تم الإضافة إلى المفضلة' : 'تم الإزالة من المفضلة', {
//         description: product.name_ar || product.name,
//         duration: 3000,
//       });
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
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/products/${imageUrl}`;
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

//   // العرض الأفقي
//   if (variant === 'horizontal') {
//     return (
//       <>
//         <Card className="flex flex-row hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl h-32">
//           {/* الصورة */}
//           <div className="relative w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0 rounded-l-xl">
//             {fullImageUrl && !imageError ? (
//               <>
//                 {imageLoading && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
//                   </div>
//                 )}
//                 <img
//                   src={fullImageUrl}
//                   alt={product.name}
//                   className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
//                   <span className="text-2xl">{product.emoji_icon}</span>
//                 ) : (
//                   <Package className="w-8 h-8 text-gray-400" />
//                 )}
//               </div>
//             )}
//           </div>

//           {/* المحتوى */}
//           <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
//             <div className="flex-1">
//               <h3 className="font-semibold text-base line-clamp-2 text-gray-900 leading-tight">
//                 {product.name_ar || product.name}
//               </h3>
//               <p className="text-sm text-gray-600 line-clamp-1 mt-1">
//                 {product.name}
//               </p>
              
//               {/* التقييم */}
//               <div className="flex items-center gap-1 mt-2">
//                 <div className="flex items-center gap-0.5">
//                   {renderStars(parseFloat(product.rating))}
//                 </div>
//                 <span className="text-xs text-gray-600">
//                   {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//                 </span>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center gap-2">
//                 <span className="text-lg font-bold text-green-600">
//                   {formatPrice(product.price)} د.ع
//                 </span>
//                 {product.discount > 0 && product.original_price && (
//                   <span className="text-sm text-gray-400 line-through">
//                     {formatPrice(product.original_price)} د.ع
//                   </span>
//                 )}
//               </div>
              
//               <div className="flex items-center gap-2">
//                 {/* زر المفضلة */}
//                 <button
//                   onClick={toggleWishlist}
//                   disabled={isFavoriteLoading}
//                   className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 >
//                   <Heart
//                     className={`w-4 h-4 transition-all ${
//                       isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//                     } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
//                   />
//                 </button>

//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={!product.in_stock || isAddingToCart || isLoading}
//                   className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
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

//   // العرض العمودي (الإفتراضي)
//   return (
//     <>
//       <Card
//         className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl"
//         onClick={handleViewDetails}
//       >
//         {/* البادجات */}
//         <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
//           {product.badge && (
//             <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
//               {product.badge}
//             </Badge>
//           )}
//           {product.discount > 0 && (
//             <Badge className="bg-red-600 text-white text-xs px-2 py-1">
//               {product.discount}% خصم
//             </Badge>
//           )}
//         </div>

//         {/* زر المفضلة */}
//         <button
//           onClick={toggleWishlist}
//           disabled={isFavoriteLoading}
//           className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors disabled:opacity-50"
//         >
//           <Heart
//             className={`w-4 h-4 transition-all ${
//               isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
//             } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
//           />
//         </button>

//         {/* حالة التوفر */}
//         {!product.in_stock && (
//           <div className="absolute top-12 right-2 z-10">
//             <Badge variant="destructive" className="text-xs px-2 py-1">
//               غير متوفر
//             </Badge>
//           </div>
//         )}

//         {/* صورة المنتج */}
//         <div className="relative aspect-square bg-gray-100 overflow-hidden">
//           {fullImageUrl && !imageError ? (
//             <>
//               {imageLoading && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                   <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
//                 </div>
//               )}
//               <img
//                 src={fullImageUrl}
//                 alt={product.name}
//                 className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
//                 <span className="text-4xl transition-transform duration-300 group-hover:scale-110 mb-2">
//                   {product.emoji_icon}
//                 </span>
//               ) : (
//                 <Package className="w-12 h-12 text-gray-400 mb-2" />
//               )}
//               <span className="text-xs text-gray-500 text-center">
//                 {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
//               </span>
//             </div>
//           )}

//           {/* زر العرض السريع */}
//           <div className="absolute bottom-2 left-2">
//             <Button
//               size="sm"
//               className="h-8 text-xs bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleViewDetails();
//               }}
//             >
//               <Eye className="w-3 h-3 ml-1" />
//               عرض سريع
//             </Button>
//           </div>
//         </div>

//         {/* محتوى البطاقة */}
//         <CardHeader className="pb-3 px-4 pt-4">
//           <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 leading-tight min-h-[2.5rem]">
//             {product.name_ar || product.name}
//           </h3>
//           <p className="text-xs text-gray-600 line-clamp-1 mt-1">
//             {product.name}
//           </p>
//         </CardHeader>

//         <CardContent className="pb-3 px-4 space-y-2">
//           {/* التقييم */}
//           <div className="flex items-center gap-1">
//             <div className="flex items-center gap-0.5">
//               {renderStars(parseFloat(product.rating))}
//             </div>
//             <span className="text-xs text-gray-600">
//               {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
//             </span>
//           </div>

//           {/* السعر */}
//           <div className="space-y-1">
//             <div className="flex items-center gap-2">
//               <span className="text-lg font-bold text-green-600">
//                 {formatPrice(product.price)} د.ع
//               </span>
//               {product.discount > 0 && product.original_price && (
//                 <span className="text-sm text-gray-400 line-through">
//                   {formatPrice(product.original_price)} د.ع
//                 </span>
//               )}
//             </div>
//             {product.discount > 0 && product.original_price && (
//               <p className="text-xs text-red-600 font-medium">
//                 توفير {formatPrice((parseFloat(product.original_price) - parseFloat(product.price)).toString())} د.ع
//               </p>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="pt-0 px-4 pb-4">
//           <Button
//             onClick={handleAddToCart}
//             disabled={!product.in_stock || isAddingToCart || isLoading}
//             className={`w-full h-9 text-sm transition-all duration-300 ${
//               product.in_stock
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {isAddingToCart ? (
//               <>
//                 <Loader2 className="w-4 h-4 ml-1 animate-spin" />
//                 جاري الإضافة...
//               </>
//             ) : product.in_stock ? (
//               <>
//                 <ShoppingCart className="w-4 h-4 ml-1" />
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

// export default ProductCard;




// components/products/ProductCard.tsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Product } from '../../api/types/product.types';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../hooks/useAuth';
import ProductDetailDialog from './Product/Productdaialog';
import { ShoppingCart, Eye, Star, Package, Loader2, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  variant?: 'vertical' | 'horizontal';
}

const ProductCard: React.FC<ProductCardProps> = ({ 
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

  // التحقق من حالة المفضلة عند تحميل المكون
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

  const handleViewDetails = () => {
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
      // استخدام القيمة المرجعة من toggleFavorite مباشرة
      const newFavoriteStatus = await toggleFavorite(product.id);
      setIsWishlisted(newFavoriteStatus);
      
      // إشعار بناءً على الحالة الجديدة
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
      return `http://localhost:5000${imageUrl}`;
    }
    
    return `http://localhost:5000/uploads/products/${imageUrl}`;
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

  // العرض الأفقي
  if (variant === 'horizontal') {
    return (
      <>
        <Card className="flex flex-row hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl h-32">
          {/* الصورة */}
          <div className="relative w-32 h-32 bg-gray-100 overflow-hidden flex-shrink-0 rounded-l-xl">
            {fullImageUrl && !imageError ? (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  </div>
                )}
                <img
                  src={fullImageUrl}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
                  <span className="text-2xl">{product.emoji_icon}</span>
                ) : (
                  <Package className="w-8 h-8 text-gray-400" />
                )}
              </div>
            )}
          </div>

          {/* المحتوى */}
          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
            <div className="flex-1">
              <h3 className="font-semibold text-base line-clamp-2 text-gray-900 leading-tight">
                {product.name_ar || product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                {product.name}
              </p>
              
              {/* التقييم */}
              <div className="flex items-center gap-1 mt-2">
                <div className="flex items-center gap-0.5">
                  {renderStars(parseFloat(product.rating))}
                </div>
                <span className="text-xs text-gray-600">
                  {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-green-600">
                  {formatPrice(product.price)} د.ع
                </span>
                {product.discount > 0 && product.original_price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.original_price)} د.ع
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {/* زر المفضلة */}
                <button
                  onClick={toggleWishlist}
                  disabled={isFavoriteLoading}
                  className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
                  title={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
                  />
                </button>

                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock || isAddingToCart || isLoading}
                  className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
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

  // العرض العمودي (الإفتراضي)
  return (
    <>
      <Card
        className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white rounded-xl"
        onClick={handleViewDetails}
      >
        {/* البادجات */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.badge && (
            <Badge className="bg-blue-600 text-white text-xs px-2 py-1">
              {product.badge}
            </Badge>
          )}
          {product.discount > 0 && (
            <Badge className="bg-red-600 text-white text-xs px-2 py-1">
              {product.discount}% خصم
            </Badge>
          )}
        </div>

        {/* زر المفضلة */}
        <button
          onClick={toggleWishlist}
          disabled={isFavoriteLoading}
          className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors disabled:opacity-50"
          title={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
            } ${isFavoriteLoading ? 'animate-pulse' : ''}`}
          />
        </button>

        {/* حالة التوفر */}
        {!product.in_stock && (
          <div className="absolute top-12 right-2 z-10">
            <Badge variant="destructive" className="text-xs px-2 py-1">
              غير متوفر
            </Badge>
          </div>
        )}

        {/* صورة المنتج */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
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
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
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
                <span className="text-4xl transition-transform duration-300 group-hover:scale-110 mb-2">
                  {product.emoji_icon}
                </span>
              ) : (
                <Package className="w-12 h-12 text-gray-400 mb-2" />
              )}
              <span className="text-xs text-gray-500 text-center">
                {imageError ? 'خطأ في تحميل الصورة' : 'لا توجد صورة'}
              </span>
            </div>
          )}

          {/* زر العرض السريع */}
          <div className="absolute bottom-2 left-2">
            <Button
              size="sm"
              className="h-8 text-xs bg-black/70 text-white hover:bg-black/90 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Eye className="w-3 h-3 ml-1" />
              عرض سريع
            </Button>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <CardHeader className="pb-3 px-4 pt-4">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 leading-tight min-h-[2.5rem]">
            {product.name_ar || product.name}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-1 mt-1">
            {product.name}
          </p>
        </CardHeader>

        <CardContent className="pb-3 px-4 space-y-2">
          {/* التقييم */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {renderStars(parseFloat(product.rating))}
            </div>
            <span className="text-xs text-gray-600">
              {parseFloat(product.rating).toFixed(1)} ({product.reviews_count})
            </span>
          </div>

          {/* السعر */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-green-600">
                {formatPrice(product.price)} د.ع
              </span>
              {product.discount > 0 && product.original_price && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.original_price)} د.ع
                </span>
              )}
            </div>
            {product.discount > 0 && product.original_price && (
              <p className="text-xs text-red-600 font-medium">
                توفير {formatPrice((parseFloat(product.original_price) - parseFloat(product.price)).toString())} د.ع
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0 px-4 pb-4">
          <Button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAddingToCart || isLoading}
            className={`w-full h-9 text-sm transition-all duration-300 ${
              product.in_stock
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-4 h-4 ml-1 animate-spin" />
                جاري الإضافة...
              </>
            ) : product.in_stock ? (
              <>
                <ShoppingCart className="w-4 h-4 ml-1" />
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

export default ProductCard;