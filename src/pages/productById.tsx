// // // "use client"

// // // // pages/ProductById.tsx
// // // import type React from "react"
// // // import { useState, useEffect } from "react"
// // // import { useParams, useNavigate } from "react-router-dom"
// // // import { useCart } from "../hooks/useCart"
// // // import { useFavorites } from "../hooks/useFavorites"
// // // import { useAuth } from "../hooks/useAuth"
// // // import { productsAPI } from "../api/products/index"
// // // import type { Product } from "../api/types/product.types"
// // // import { Card, CardContent, CardHeader } from "../components/ui/card"
// // // import { Button } from "../components/ui/button"
// // // import { Badge } from "../components/ui/badge"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// // // import {
// // //   ShoppingCart,
// // //   Heart,
// // //   Share2,
// // //   Truck,
// // //   Shield,
// // //   RotateCcw,
// // //   ArrowRight,
// // //   Home,
// // //   Star,
// // //   Package,
// // //   Loader2,
// // //   Minus,
// // //   Plus,
// // //   ArrowLeft,
// // // } from "lucide-react"
// // // import { toast } from "sonner"

// // // const ProductById: React.FC = () => {
// // //   const { id } = useParams<{ id: string }>()
// // //   const navigate = useNavigate()
// // //   const { addToCart, isLoading: cartLoading } = useCart()
// // //   const { toggleFavorite, checkIsFavorite } = useFavorites()
// // //   const { isAuthenticated } = useAuth()

// // //   const [product, setProduct] = useState<Product | null>(null)
// // //   const [loading, setLoading] = useState(true)
// // //   const [error, setError] = useState<string | null>(null)
// // //   const [quantity, setQuantity] = useState(1)
// // //   const [isWishlisted, setIsWishlisted] = useState(false)
// // //   const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
// // //   const [imageError, setImageError] = useState(false)
// // //   const [imageLoading, setImageLoading] = useState(true)
// // //   const [activeTab, setActiveTab] = useState("description")
// // //   const [addingToCart, setAddingToCart] = useState(false)

// // //   // جلب بيانات المنتج
// // //   useEffect(() => {
// // //     const fetchProduct = async () => {
// // //       if (!id) return

// // //       try {
// // //         setLoading(true)
// // //         setError(null)
// // //         const productData = await productsAPI.getProduct(Number.parseInt(id))
// // //         setProduct(productData)
// // //       } catch (err) {
// // //         console.error("Error fetching product:", err)
// // //         setError("فشل في تحميل بيانات المنتج")
// // //       } finally {
// // //         setLoading(false)
// // //       }
// // //     }

// // //     fetchProduct()
// // //   }, [id])

// // //   // التحقق من حالة المفضلة
// // //   useEffect(() => {
// // //     const checkFavoriteStatus = async () => {
// // //       if (product && isAuthenticated) {
// // //         try {
// // //           const favoriteStatus = await checkIsFavorite(product.id)
// // //           setIsWishlisted(favoriteStatus)
// // //         } catch (error) {
// // //           console.error("Error checking favorite status:", error)
// // //         }
// // //       }
// // //     }

// // //     checkFavoriteStatus()
// // //   }, [product, isAuthenticated, checkIsFavorite])

// // //   const handleAddToCart = async () => {
// // //     if (!product || addingToCart) return

// // //     try {
// // //       setAddingToCart(true)
// // //       await addToCart(product, quantity)
// // //       toast.success("تمت الإضافة إلى السلة!", {
// // //         description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
// // //         duration: 3000,
// // //       })
// // //     } catch (error) {
// // //       toast.error("فشل الإضافة إلى السلة", {
// // //         description: "يرجى المحاولة مرة أخرى.",
// // //         duration: 3000,
// // //       })
// // //     } finally {
// // //       setAddingToCart(false)
// // //     }
// // //   }

// // //   const handleQuantityChange = (delta: number) => {
// // //     const newQuantity = quantity + delta
// // //     if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
// // //       setQuantity(newQuantity)
// // //     }
// // //   }

// // //   const toggleWishlist = async () => {
// // //     if (!isAuthenticated) {
// // //       navigate("/login")
// // //       return
// // //     }

// // //     if (!product) return

// // //     setIsFavoriteLoading(true)
// // //     try {
// // //       const newFavoriteStatus = await toggleFavorite(product.id)
// // //       setIsWishlisted(newFavoriteStatus)

// // //       toast.success(newFavoriteStatus ? "تم الإضافة إلى المفضلة" : "تم الإزالة من المفضلة", {
// // //         description: product.name_ar || product.name,
// // //         duration: 3000,
// // //       })
// // //     } catch (error) {
// // //       console.error("Error toggling favorite:", error)
// // //       toast.error("فشل في العملية", {
// // //         description: "يرجى المحاولة مرة أخرى.",
// // //         duration: 3000,
// // //       })
// // //     } finally {
// // //       setIsFavoriteLoading(false)
// // //     }
// // //   }

// // //   const handleImageError = () => {
// // //     setImageError(true)
// // //     setImageLoading(false)
// // //   }

// // //   const handleImageLoad = () => {
// // //     setImageError(false)
// // //     setImageLoading(false)
// // //   }

// // //   const getFullImageUrl = (imageUrl: string | null) => {
// // //     if (!imageUrl) return null

// // //     if (imageUrl.startsWith("http")) {
// // //       return imageUrl
// // //     }

// // //     if (imageUrl.startsWith("/")) {
// // //       return `http://localhost:5000${imageUrl}`
// // //     }

// // //     return `http://localhost:5000/uploads/products/${imageUrl}`
// // //   }

// // //   const renderStars = (rating: number) => {
// // //     return Array.from({ length: 5 }, (_, index) => (
// // //       <Star
// // //         key={index}
// // //         className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
// // //       />
// // //     ))
// // //   }

// // //   const formatPrice = (price: string | number) => {
// // //     const priceNumber = typeof price === "string" ? Number.parseFloat(price) : price
// // //     return priceNumber.toLocaleString("ar-IQ", {
// // //       minimumFractionDigits: 2,
// // //       maximumFractionDigits: 2,
// // //     })
// // //   }

// // //   const calculateSavings = () => {
// // //     if (!product) return "0"
// // //     const original =
// // //       typeof product.original_price === "string" ? Number.parseFloat(product.original_price) : product.original_price
// // //     const current = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
// // //     const savings = (original || 0) - current
// // //     return savings.toLocaleString("ar-IQ", {
// // //       minimumFractionDigits: 2,
// // //       maximumFractionDigits: 2,
// // //     })
// // //   }

// // //   const calculateTotalPrice = () => {
// // //     if (!product) return 0
// // //     const price = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
// // //     return price * quantity
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
// // //         <div className="text-center">
// // //           <Loader2 className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" />
// // //           <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">جاري تحميل المنتج...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   if (error || !product) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
// // //         <div className="text-center bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-800">
// // //           <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
// // //             <Package className="w-10 h-10 text-red-600 dark:text-red-400" />
// // //           </div>
// // //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المنتج غير موجود</h2>
// // //           <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "لم يتم العثور على المنتج المطلوب"}</p>
// // //           <div className="flex gap-3 justify-center">
// // //             <Button
// // //               onClick={() => navigate(-1)}
// // //               variant="outline"
// // //               className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:text-amber-400"
// // //             >
// // //               <ArrowLeft className="w-4 h-4 ml-2" />
// // //               رجوع
// // //             </Button>
// // //             <Button
// // //               onClick={() => navigate("/categories")}
// // //               className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
// // //             >
// // //               <Home className="w-4 h-4 ml-2" />
// // //               التصنيفات
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   const fullImageUrl = getFullImageUrl(product.image_url)
// // //   const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99)

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 dark:bg-black">
// // //       {/* الهيدر */}
// // //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40">
// // //         <div className="container mx-auto px-4 pt-4">
// // //           {/* مسار التنقل */}
// // //           <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
// // //             <Button
// // //               variant="ghost"
// // //               onClick={() => navigate("/")}
// // //               className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
// // //             >
// // //               <Home className="w-4 h-4" />
// // //               الرئيسية
// // //             </Button>
// // //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
// // //             <Button
// // //               variant="ghost"
// // //               onClick={() => navigate("/categories")}
// // //               className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
// // //             >
// // //               التصنيفات
// // //             </Button>
// // //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
// // //             <span className="text-gray-900 dark:text-white font-semibold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
// // //               {product.name_ar || product.name}
// // //             </span>
// // //           </nav>
// // //         </div>
// // //       </header>

// // //       {/* المحتوى الرئيسي */}
// // //       <main className="container mx-auto px-4 py-6">
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// // //           {/* الجزء الأيمن - صورة المنتج */}
// // //           <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
// // //             <CardContent className="p-6">
// // //               <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
// // //                 {fullImageUrl && !imageError ? (
// // //                   <>
// // //                     {imageLoading && (
// // //                       <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
// // //                         <Loader2 className="w-12 h-12 text-gray-400 dark:text-gray-600 animate-spin" />
// // //                       </div>
// // //                     )}
// // //                     <img
// // //                       src={fullImageUrl || "/placeholder.svg"}
// // //                       alt={product.name_ar || product.name}
// // //                       className={`w-full h-full object-cover transition-opacity duration-300 ${
// // //                         imageLoading ? "opacity-0" : "opacity-100"
// // //                       }`}
// // //                       onError={handleImageError}
// // //                       onLoad={handleImageLoad}
// // //                     />
// // //                   </>
// // //                 ) : (
// // //                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
// // //                     {product.emoji_icon ? (
// // //                       <span className="text-8xl mb-4">{product.emoji_icon}</span>
// // //                     ) : (
// // //                       <Package className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4" />
// // //                     )}
// // //                     <span className="text-gray-500 dark:text-gray-400 text-lg text-center">
// // //                       {imageError ? "خطأ في تحميل الصورة" : "لا توجد صورة متاحة"}
// // //                     </span>
// // //                   </div>
// // //                 )}

// // //                 {/* البادجات */}
// // //                 <div className="absolute top-4 left-4 flex flex-col gap-2">
// // //                   {product.badge && (
// // //                     <Badge className="bg-amber-600 text-white text-sm py-1 px-3 w-fit shadow-md">{product.badge}</Badge>
// // //                   )}

// // //                   {product.discount > 0 && (
// // //                     <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
// // //                       {product.discount}% خصم
// // //                     </Badge>
// // //                   )}

// // //                   {!product.in_stock && (
// // //                     <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">غير متوفر</Badge>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* أزرار الإجراءات */}
// // //               <div className="flex gap-3 mt-6">
// // //                 <Button
// // //                   variant="outline"
// // //                   className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
// // //                   onClick={toggleWishlist}
// // //                   disabled={isFavoriteLoading}
// // //                 >
// // //                   <Heart
// // //                     className={`w-5 h-5 ml-2 transition-colors ${
// // //                       isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
// // //                     }`}
// // //                   />
// // //                   <span className="font-medium">{isWishlisted ? "في المفضلة" : "إضافة إلى المفضلة"}</span>
// // //                 </Button>
// // //                 <Button
// // //                   variant="outline"
// // //                   className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
// // //                 >
// // //                   <Share2 className="w-5 h-5 ml-2" />
// // //                   <span className="font-medium">مشاركة</span>
// // //                 </Button>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* الجزء الأيسر - تفاصيل المنتج */}
// // //           <div className="space-y-6">
// // //             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
// // //               <CardHeader className="pb-4">
// // //                 <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-right">
// // //                   {product.name_ar || product.name}
// // //                 </h1>
// // //                 <p className="text-lg text-gray-600 dark:text-gray-400 text-right">{product.name}</p>
// // //               </CardHeader>

// // //               <CardContent className="space-y-6">
// // //                 {/* التقييم */}
// // //                 <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
// // //                   <div className="flex items-center gap-1">{renderStars(Number.parseFloat(product.rating))}</div>
// // //                   <div className="flex items-center gap-2">
// // //                     <span className="text-lg font-bold text-gray-900 dark:text-white">
// // //                       {Number.parseFloat(product.rating).toFixed(1)}
// // //                     </span>
// // //                     <span className="text-gray-500 dark:text-gray-400">•</span>
// // //                     <span className="text-gray-600 dark:text-gray-400">({product.reviews_count} تقييم)</span>
// // //                   </div>
// // //                 </div>

// // //                 {/* السعر */}
// // //                 <div className="space-y-3">
// // //                   <div className="flex items-baseline gap-4">
// // //                     <span className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
// // //                       {formatPrice(product.price)} د.ع
// // //                     </span>
// // //                     {product.discount > 0 && product.original_price && (
// // //                       <span className="text-xl text-gray-400 dark:text-gray-600 line-through">
// // //                         {formatPrice(product.original_price)} د.ع
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                   {product.discount > 0 && product.original_price && (
// // //                     <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
// // //                       <p className="text-red-700 dark:text-red-400 font-semibold">
// // //                         وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>

// // //                 {/* حالة المخزون */}
// // //                 <div
// // //                   className={`flex items-center gap-3 p-4 rounded-xl ${
// // //                     product.in_stock
// // //                       ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
// // //                       : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
// // //                   }`}
// // //                 >
// // //                   <div className={`w-4 h-4 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"}`} />
// // //                   <div>
// // //                     <span
// // //                       className={`text-lg font-semibold ${
// // //                         product.in_stock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
// // //                       }`}
// // //                     >
// // //                       {product.in_stock
// // //                         ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ""}`
// // //                         : "غير متوفر"}
// // //                     </span>
// // //                     {product.in_stock && (
// // //                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">✓ جاهز للتوصيل خلال 24 ساعة</p>
// // //                     )}
// // //                   </div>
// // //                 </div>

// // //                 {/* اختيار الكمية */}
// // //                 {product.in_stock && (
// // //                   <div className="space-y-3">
// // //                     <p className="text-lg font-semibold text-gray-900 dark:text-white">الكمية</p>
// // //                     <div className="flex items-center gap-4">
// // //                       <Button
// // //                         variant="outline"
// // //                         size="icon"
// // //                         className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
// // //                         onClick={() => handleQuantityChange(-1)}
// // //                         disabled={quantity <= 1}
// // //                       >
// // //                         <Minus className="w-5 h-5" />
// // //                       </Button>
// // //                       <div className="w-20 h-12 flex items-center justify-center border-2 border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-xl font-bold text-xl text-amber-700 dark:text-amber-400">
// // //                         {quantity}
// // //                       </div>
// // //                       <Button
// // //                         variant="outline"
// // //                         size="icon"
// // //                         className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
// // //                         onClick={() => handleQuantityChange(1)}
// // //                         disabled={!isQuantityAvailable}
// // //                       >
// // //                         <Plus className="w-5 h-5" />
// // //                       </Button>
// // //                     </div>
// // //                     {product.stock_quantity && (
// // //                       <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                         متبقي {product.stock_quantity} قطعة فقط
// // //                       </p>
// // //                     )}
// // //                   </div>
// // //                 )}

// // //                 {/* زر إضافة إلى السلة */}
// // //                 <Button
// // //                   onClick={handleAddToCart}
// // //                   disabled={!product.in_stock || addingToCart || cartLoading || !isQuantityAvailable}
// // //                   className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
// // //                   size="lg"
// // //                 >
// // //                   {addingToCart ? (
// // //                     <>
// // //                       <Loader2 className="w-5 h-5 ml-3 animate-spin" />
// // //                       جاري الإضافة...
// // //                     </>
// // //                   ) : product.in_stock && isQuantityAvailable ? (
// // //                     <>
// // //                       <ShoppingCart className="w-6 h-6 ml-3" />
// // //                       أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
// // //                     </>
// // //                   ) : (
// // //                     "غير متوفر حاليًا"
// // //                   )}
// // //                 </Button>
// // //               </CardContent>
// // //             </Card>

// // //             {/* المميزات */}
// // //             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
// // //               <CardContent className="p-6">
// // //                 <div className="grid grid-cols-1 gap-4">
// // //                   <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
// // //                     <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
// // //                       <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-base font-semibold text-amber-900 dark:text-amber-300">شحن مجاني</p>
// // //                       <p className="text-sm text-amber-700 dark:text-amber-400">للطلبات فوق 50,000 د.ع</p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
// // //                     <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
// // //                       <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-base font-semibold text-green-900 dark:text-green-300">دفع آمن</p>
// // //                       <p className="text-sm text-green-700 dark:text-green-400">معاملات 100% آمنة ومشفرة</p>
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
// // //                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
// // //                       <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
// // //                     </div>
// // //                     <div>
// // //                       <p className="text-base font-semibold text-purple-900 dark:text-purple-300">إرجاع سهل</p>
// // //                       <p className="text-sm text-purple-700 dark:text-purple-400">سياسة إرجاع لمدة 30 يوم</p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>

// // //             {/* معلومات المنتج */}
// // //             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
// // //               <CardContent className="p-6">
// // //                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// // //                   <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
// // //                     <TabsTrigger
// // //                       value="description"
// // //                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
// // //                     >
// // //                       الوصف
// // //                     </TabsTrigger>
// // //                     <TabsTrigger
// // //                       value="details"
// // //                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
// // //                     >
// // //                       المواصفات
// // //                     </TabsTrigger>
// // //                   </TabsList>

// // //                   <TabsContent value="description" className="mt-2 space-y-6">
// // //                     <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
// // //                       <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">الوصف بالعربية</h4>
// // //                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="rtl">
// // //                         {product.description_ar || product.description || "لا يوجد وصف متاح لهذا المنتج حالياً."}
// // //                       </p>
// // //                     </div>
// // //                     {product.description && (
// // //                       <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
// // //                         <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
// // //                           English Description
// // //                         </h4>
// // //                         <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="ltr">
// // //                           {product.description}
// // //                         </p>
// // //                       </div>
// // //                     )}
// // //                   </TabsContent>

// // //                   <TabsContent value="details" className="mt-2">
// // //                     <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-700">
// // //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">رقم المنتج</span>
// // //                         <span className="font-semibold text-gray-900 dark:text-white">{product.id}</span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">العلامة التجارية</span>
// // //                         <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">الفئة</span>
// // //                         <span className="font-semibold text-gray-900 dark:text-white">
// // //                           {product.category_name_ar || product.category_name}
// // //                         </span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">التقييم</span>
// // //                         <span className="font-semibold text-gray-900 dark:text-white">
// // //                           {Number.parseFloat(product.rating).toFixed(1)} / 5.0
// // //                         </span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">عدد التقييمات</span>
// // //                         <span className="font-semibold text-gray-900 dark:text-white">{product.reviews_count}</span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">الحالة</span>
// // //                         <span
// // //                           className={`font-semibold ${product.in_stock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
// // //                         >
// // //                           {product.in_stock ? "متوفر" : "غير متوفر"}
// // //                         </span>
// // //                       </div>
// // //                       {product.stock_quantity && (
// // //                         <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// // //                           <span className="text-gray-600 dark:text-gray-400 font-medium">الكمية المتاحة</span>
// // //                           <span className="font-semibold text-gray-900 dark:text-white">
// // //                             {product.stock_quantity} قطعة
// // //                           </span>
// // //                         </div>
// // //                       )}
// // //                       <div className="flex justify-between items-center py-3">
// // //                         <span className="text-gray-600 dark:text-gray-400 font-medium">تاريخ الإضافة</span>
// // //                         <span className="font-semibold text-gray-900 dark:text-white">
// // //                           {new Date(product.created_at).toLocaleDateString("ar-IQ", {
// // //                             year: "numeric",
// // //                             month: "long",
// // //                             day: "numeric",
// // //                           })}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </TabsContent>
// // //                 </Tabs>
// // //               </CardContent>
// // //             </Card>
// // //           </div>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   )
// // // }

// // // export default ProductById



// // "use client"

// // // pages/ProductById.tsx
// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { useParams, useNavigate } from "react-router-dom"
// // import { useCart } from "../hooks/useCart"
// // import { useFavorites } from "../hooks/useFavorites"
// // import { useAuth } from "../hooks/useAuth"
// // import { productsAPI } from "../api/products/index"
// // import type { Product } from "../api/types/product.types"
// // import { Card, CardContent, CardHeader } from "../components/ui/card"
// // import { Button } from "../components/ui/button"
// // import { Badge } from "../components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// // import {
// //   ShoppingCart,
// //   Heart,
// //   Share2,
// //   Truck,
// //   Shield,
// //   RotateCcw,
// //   ArrowRight,
// //   Home,
// //   Star,
// //   Package,
// //   Loader2,
// //   Minus,
// //   Plus,
// //   ArrowLeft,
// // } from "lucide-react"
// // import { toast } from "sonner"

// // const ProductById: React.FC = () => {
// //   const { id } = useParams<{ id: string }>()
// //   const navigate = useNavigate()
// //   const { addToCart, isLoading: cartLoading } = useCart()
// //   const { toggleFavorite, checkIsFavorite } = useFavorites()
// //   const { isAuthenticated } = useAuth()

// //   const [product, setProduct] = useState<Product | null>(null)
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)
// //   const [quantity, setQuantity] = useState(1)
// //   const [isWishlisted, setIsWishlisted] = useState(false)
// //   const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
// //   const [imageError, setImageError] = useState(false)
// //   const [imageLoading, setImageLoading] = useState(true)
// //   const [activeTab, setActiveTab] = useState("description")
// //   const [addingToCart, setAddingToCart] = useState(false)

// //   const [ratings, setRatings] = useState<any[]>([])
// //   const [ratingsLoading, setRatingsLoading] = useState(false)
// //   const [ratingStats, setRatingStats] = useState<any>(null)
// //   const [userRating, setUserRating] = useState(0)
// //   const [userComment, setUserComment] = useState("")
// //   const [submittingRating, setSubmittingRating] = useState(false)
// //   const [ratingsPage, setRatingsPage] = useState(1)
// //   const [hasMoreRatings, setHasMoreRatings] = useState(true)

// //   // جلب بيانات المنتج
// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       if (!id) return

// //       try {
// //         setLoading(true)
// //         setError(null)
// //         const productData = await productsAPI.getProduct(Number.parseInt(id))
// //         setProduct(productData)
// //       } catch (err) {
// //         console.error("Error fetching product:", err)
// //         setError("فشل في تحميل بيانات المنتج")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchProduct()
// //   }, [id])

// //   // التحقق من حالة المفضلة
// //   useEffect(() => {
// //     const checkFavoriteStatus = async () => {
// //       if (product && isAuthenticated) {
// //         try {
// //           const favoriteStatus = await checkIsFavorite(product.id)
// //           setIsWishlisted(favoriteStatus)
// //         } catch (error) {
// //           console.error("Error checking favorite status:", error)
// //         }
// //       }
// //     }

// //     checkFavoriteStatus()
// //   }, [product, isAuthenticated, checkIsFavorite])

// //   useEffect(() => {
// //     const fetchRatings = async () => {
// //       if (!product) return

// //       try {
// //         setRatingsLoading(true)
// //         const ratingsData = await productsAPI.getProductRatings(product.id, ratingsPage)
// //         setRatings(ratingsData.ratings || [])
// //         setRatingStats(ratingsData.stats || null)
// //         setHasMoreRatings(ratingsData.hasMore || false)
// //       } catch (error) {
// //         console.error("Error fetching ratings:", error)
// //       } finally {
// //         setRatingsLoading(false)
// //       }
// //     }

// //     fetchRatings()
// //   }, [product, ratingsPage])

// //   const handleAddToCart = async () => {
// //     if (!product || addingToCart) return

// //     try {
// //       setAddingToCart(true)
// //       await addToCart(product, quantity)
// //       toast.success("تمت الإضافة إلى السلة!", {
// //         description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
// //         duration: 3000,
// //       })
// //     } catch (error) {
// //       toast.error("فشل الإضافة إلى السلة", {
// //         description: "يرجى المحاولة مرة أخرى.",
// //         duration: 3000,
// //       })
// //     } finally {
// //       setAddingToCart(false)
// //     }
// //   }

// //   const handleQuantityChange = (delta: number) => {
// //     const newQuantity = quantity + delta
// //     if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
// //       setQuantity(newQuantity)
// //     }
// //   }

// //   const toggleWishlist = async () => {
// //     if (!isAuthenticated) {
// //       navigate("/login")
// //       return
// //     }

// //     if (!product) return

// //     setIsFavoriteLoading(true)
// //     try {
// //       const newFavoriteStatus = await toggleFavorite(product.id)
// //       setIsWishlisted(newFavoriteStatus)

// //       toast.success(newFavoriteStatus ? "تم الإضافة إلى المفضلة" : "تم الإزالة من المفضلة", {
// //         description: product.name_ar || product.name,
// //         duration: 3000,
// //       })
// //     } catch (error) {
// //       console.error("Error toggling favorite:", error)
// //       toast.error("فشل في العملية", {
// //         description: "يرجى المحاولة مرة أخرى.",
// //         duration: 3000,
// //       })
// //     } finally {
// //       setIsFavoriteLoading(false)
// //     }
// //   }

// //   const handleImageError = () => {
// //     setImageError(true)
// //     setImageLoading(false)
// //   }

// //   const handleImageLoad = () => {
// //     setImageError(false)
// //     setImageLoading(false)
// //   }

// //   const getFullImageUrl = (imageUrl: string | null) => {
// //     if (!imageUrl) return null

// //     if (imageUrl.startsWith("http")) {
// //       return imageUrl
// //     }

// //     if (imageUrl.startsWith("/")) {
// //       return `http://localhost:5000${imageUrl}`
// //     }

// //     return `http://localhost:5000/uploads/products/${imageUrl}`
// //   }

// //   const renderStars = (rating: number) => {
// //     return Array.from({ length: 5 }, (_, index) => (
// //       <Star
// //         key={index}
// //         className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
// //       />
// //     ))
// //   }

// //   const formatPrice = (price: string | number) => {
// //     const priceNumber = typeof price === "string" ? Number.parseFloat(price) : price
// //     return priceNumber.toLocaleString("ar-IQ", {
// //       minimumFractionDigits: 2,
// //       maximumFractionDigits: 2,
// //     })
// //   }

// //   const calculateSavings = () => {
// //     if (!product) return "0"
// //     const original =
// //       typeof product.original_price === "string" ? Number.parseFloat(product.original_price) : product.original_price
// //     const current = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
// //     const savings = (original || 0) - current
// //     return savings.toLocaleString("ar-IQ", {
// //       minimumFractionDigits: 2,
// //       maximumFractionDigits: 2,
// //     })
// //   }

// //   const calculateTotalPrice = () => {
// //     if (!product) return 0
// //     const price = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
// //     return price * quantity
// //   }

// //   const handleSubmitRating = async () => {
// //     if (!isAuthenticated) {
// //       navigate("/login")
// //       return
// //     }

// //     if (!product || userRating === 0) {
// //       toast.error("يرجى اختيار تقييم")
// //       return
// //     }

// //     setSubmittingRating(true)
// //     try {
// //       await productsAPI.rateProduct(product.id, userRating, userComment)
// //       toast.success("تم إضافة التقييم بنجاح")
// //       setUserRating(0)
// //       setUserComment("")
// //       // Reload ratings to show the new one
// //       setRatingsPage(1)
// //     } catch (error: any) {
// //       console.error("Error submitting rating:", error)
// //       toast.error(error.response?.data?.message || "فشل في إضافة التقييم")
// //     } finally {
// //       setSubmittingRating(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" />
// //           <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">جاري تحميل المنتج...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error || !product) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
// //         <div className="text-center bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-800">
// //           <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <Package className="w-10 h-10 text-red-600 dark:text-red-400" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المنتج غير موجود</h2>
// //           <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "لم يتم العثور على المنتج المطلوب"}</p>
// //           <div className="flex gap-3 justify-center">
// //             <Button
// //               onClick={() => navigate(-1)}
// //               variant="outline"
// //               className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:text-amber-400"
// //             >
// //               <ArrowLeft className="w-4 h-4 ml-2" />
// //               رجوع
// //             </Button>
// //             <Button
// //               onClick={() => navigate("/categories")}
// //               className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
// //             >
// //               <Home className="w-4 h-4 ml-2" />
// //               التصنيفات
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   const fullImageUrl = getFullImageUrl(product.image_url)
// //   const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99)

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-black">
// //       {/* الهيدر */}
// //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40">
// //         <div className="container mx-auto px-4 pt-4">
// //           {/* مسار التنقل */}
// //           <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
// //             <Button
// //               variant="ghost"
// //               onClick={() => navigate("/")}
// //               className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
// //             >
// //               <Home className="w-4 h-4" />
// //               الرئيسية
// //             </Button>
// //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
// //             <Button
// //               variant="ghost"
// //               onClick={() => navigate("/categories")}
// //               className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
// //             >
// //               التصنيفات
// //             </Button>
// //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
// //             <span className="text-gray-900 dark:text-white font-semibold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
// //               {product.name_ar || product.name}
// //             </span>
// //           </nav>
// //         </div>
// //       </header>

// //       {/* المحتوى الرئيسي */}
// //       <main className="container mx-auto px-4 py-6">
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* الجزء الأيمن - صورة المنتج */}
// //           <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
// //             <CardContent className="p-6">
// //               <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
// //                 {fullImageUrl && !imageError ? (
// //                   <>
// //                     {imageLoading && (
// //                       <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
// //                         <Loader2 className="w-12 h-12 text-gray-400 dark:text-gray-600 animate-spin" />
// //                       </div>
// //                     )}
// //                     <img
// //                       src={fullImageUrl || "/placeholder.svg"}
// //                       alt={product.name_ar || product.name}
// //                       className={`w-full h-full object-cover transition-opacity duration-300 ${
// //                         imageLoading ? "opacity-0" : "opacity-100"
// //                       }`}
// //                       onError={handleImageError}
// //                       onLoad={handleImageLoad}
// //                     />
// //                   </>
// //                 ) : (
// //                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
// //                     {product.emoji_icon ? (
// //                       <span className="text-8xl mb-4">{product.emoji_icon}</span>
// //                     ) : (
// //                       <Package className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4" />
// //                     )}
// //                     <span className="text-gray-500 dark:text-gray-400 text-lg text-center">
// //                       {imageError ? "خطأ في تحميل الصورة" : "لا توجد صورة متاحة"}
// //                     </span>
// //                   </div>
// //                 )}

// //                 {/* البادجات */}
// //                 <div className="absolute top-4 left-4 flex flex-col gap-2">
// //                   {product.badge && (
// //                     <Badge className="bg-amber-600 text-white text-sm py-1 px-3 w-fit shadow-md">{product.badge}</Badge>
// //                   )}

// //                   {product.discount > 0 && (
// //                     <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
// //                       {product.discount}% خصم
// //                     </Badge>
// //                   )}

// //                   {!product.in_stock && (
// //                     <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">غير متوفر</Badge>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* أزرار الإجراءات */}
// //               <div className="flex gap-3 mt-6">
// //                 <Button
// //                   variant="outline"
// //                   className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
// //                   onClick={toggleWishlist}
// //                   disabled={isFavoriteLoading}
// //                 >
// //                   <Heart
// //                     className={`w-5 h-5 ml-2 transition-colors ${
// //                       isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
// //                     }`}
// //                   />
// //                   <span className="font-medium">{isWishlisted ? "في المفضلة" : "إضافة إلى المفضلة"}</span>
// //                 </Button>
// //                 <Button
// //                   variant="outline"
// //                   className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
// //                 >
// //                   <Share2 className="w-5 h-5 ml-2" />
// //                   <span className="font-medium">مشاركة</span>
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* الجزء الأيسر - تفاصيل المنتج */}
// //           <div className="space-y-6">
// //             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
// //               <CardHeader className="pb-4">
// //                 <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-right">
// //                   {product.name_ar || product.name}
// //                 </h1>
// //                 <p className="text-lg text-gray-600 dark:text-gray-400 text-right">{product.name}</p>
// //               </CardHeader>

// //               <CardContent className="space-y-6">
// //                 {/* التقييم */}
// //                 <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
// //                   <div className="flex items-center gap-1">{renderStars(Number.parseFloat(product.rating))}</div>
// //                   <div className="flex items-center gap-2">
// //                     <span className="text-lg font-bold text-gray-900 dark:text-white">
// //                       {Number.parseFloat(product.rating).toFixed(1)}
// //                     </span>
// //                     <span className="text-gray-500 dark:text-gray-400">•</span>
// //                     <span className="text-gray-600 dark:text-gray-400">({product.reviews_count} تقييم)</span>
// //                   </div>
// //                 </div>

// //                 {/* السعر */}
// //                 <div className="space-y-3">
// //                   <div className="flex items-baseline gap-4">
// //                     <span className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
// //                       {formatPrice(product.price)} د.ع
// //                     </span>
// //                     {product.discount > 0 && product.original_price && (
// //                       <span className="text-xl text-gray-400 dark:text-gray-600 line-through">
// //                         {formatPrice(product.original_price)} د.ع
// //                       </span>
// //                     )}
// //                   </div>
// //                   {product.discount > 0 && product.original_price && (
// //                     <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
// //                       <p className="text-red-700 dark:text-red-400 font-semibold">
// //                         وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* حالة المخزون */}
// //                 <div
// //                   className={`flex items-center gap-3 p-4 rounded-xl ${
// //                     product.in_stock
// //                       ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
// //                       : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
// //                   }`}
// //                 >
// //                   <div className={`w-4 h-4 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"}`} />
// //                   <div>
// //                     <span
// //                       className={`text-lg font-semibold ${
// //                         product.in_stock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
// //                       }`}
// //                     >
// //                       {product.in_stock
// //                         ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ""}`
// //                         : "غير متوفر"}
// //                     </span>
// //                     {product.in_stock && (
// //                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">✓ جاهز للتوصيل خلال 24 ساعة</p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* اختيار الكمية */}
// //                 {product.in_stock && (
// //                   <div className="space-y-3">
// //                     <p className="text-lg font-semibold text-gray-900 dark:text-white">الكمية</p>
// //                     <div className="flex items-center gap-4">
// //                       <Button
// //                         variant="outline"
// //                         size="icon"
// //                         className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
// //                         onClick={() => handleQuantityChange(-1)}
// //                         disabled={quantity <= 1}
// //                       >
// //                         <Minus className="w-5 h-5" />
// //                       </Button>
// //                       <div className="w-20 h-12 flex items-center justify-center border-2 border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-xl font-bold text-xl text-amber-700 dark:text-amber-400">
// //                         {quantity}
// //                       </div>
// //                       <Button
// //                         variant="outline"
// //                         size="icon"
// //                         className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
// //                         onClick={() => handleQuantityChange(1)}
// //                         disabled={!isQuantityAvailable}
// //                       >
// //                         <Plus className="w-5 h-5" />
// //                       </Button>
// //                     </div>
// //                     {product.stock_quantity && (
// //                       <p className="text-sm text-gray-600 dark:text-gray-400">
// //                         متبقي {product.stock_quantity} قطعة فقط
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {/* زر إضافة إلى السلة */}
// //                 <Button
// //                   onClick={handleAddToCart}
// //                   disabled={!product.in_stock || addingToCart || cartLoading || !isQuantityAvailable}
// //                   className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
// //                   size="lg"
// //                 >
// //                   {addingToCart ? (
// //                     <>
// //                       <Loader2 className="w-5 h-5 ml-3 animate-spin" />
// //                       جاري الإضافة...
// //                     </>
// //                   ) : product.in_stock && isQuantityAvailable ? (
// //                     <>
// //                       <ShoppingCart className="w-6 h-6 ml-3" />
// //                       أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
// //                     </>
// //                   ) : (
// //                     "غير متوفر حاليًا"
// //                   )}
// //                 </Button>
// //               </CardContent>
// //             </Card>

// //             {/* المميزات */}
// //             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
// //               <CardContent className="p-6">
// //                 <div className="grid grid-cols-1 gap-4">
// //                   <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
// //                     <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
// //                       <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-base font-semibold text-amber-900 dark:text-amber-300">شحن مجاني</p>
// //                       <p className="text-sm text-amber-700 dark:text-amber-400">للطلبات فوق 50,000 د.ع</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
// //                     <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
// //                       <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-base font-semibold text-green-900 dark:text-green-300">دفع آمن</p>
// //                       <p className="text-sm text-green-700 dark:text-green-400">معاملات 100% آمنة ومشفرة</p>
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
// //                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
// //                       <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
// //                     </div>
// //                     <div>
// //                       <p className="text-base font-semibold text-purple-900 dark:text-purple-300">إرجاع سهل</p>
// //                       <p className="text-sm text-purple-700 dark:text-purple-400">سياسة إرجاع لمدة 30 يوم</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* معلومات المنتج */}
// //             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
// //               <CardContent className="p-6">
// //                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
// //                   <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
// //                     <TabsTrigger
// //                       value="description"
// //                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
// //                     >
// //                       الوصف
// //                     </TabsTrigger>
// //                     <TabsTrigger
// //                       value="details"
// //                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
// //                     >
// //                       المواصفات
// //                     </TabsTrigger>
// //                     <TabsTrigger
// //                       value="reviews"
// //                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
// //                     >
// //                       التقييمات
// //                     </TabsTrigger>
// //                   </TabsList>

// //                   <TabsContent value="description" className="mt-2 space-y-6">
// //                     <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
// //                       <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">الوصف بالعربية</h4>
// //                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="rtl">
// //                         {product.description_ar || product.description || "لا يوجد وصف متاح لهذا المنتج حالياً."}
// //                       </p>
// //                     </div>
// //                     {product.description && (
// //                       <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
// //                         <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
// //                           English Description
// //                         </h4>
// //                         <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="ltr">
// //                           {product.description}
// //                         </p>
// //                       </div>
// //                     )}
// //                   </TabsContent>

// //                   <TabsContent value="details" className="mt-2">
// //                     <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-700">
// //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// //                         <span className="text-gray-600 dark:text-gray-400 font-medium">رقم المنتج</span>
// //                         <span className="font-semibold text-gray-900 dark:text-white">{product.id}</span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// //                         <span className="text-gray-600 dark:text-gray-400 font-medium">العلامة التجارية</span>
// //                         <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// //                         <span className="text-gray-600 dark:text-gray-400 font-medium">الفئة</span>
// //                         <span className="font-semibold text-gray-900 dark:text-white">
// //                           {product.category_name_ar || product.category_name}
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// //                         <span className="text-gray-600 dark:text-gray-400 font-medium">التقييم</span>
// //                         <span className="font-semibold text-gray-900 dark:text-white">
// //                           {Number.parseFloat(product.rating).toFixed(1)} / 5.0
// //                         </span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
// //                         <span className="text-gray-600 dark:text-gray-400 font-medium">عدد التقييمات</span>
// //                         <span className="font-semibold text-gray-900 dark:text-white">{product.reviews_count}</span>
// //                       </div>
// //                       <div className="flex justify-between items-center py-3">
// //                         <span className="text-gray-600 dark:text-gray-400 font-medium">تاريخ الإضافة</span>
// //                         <span className="font-semibold text-gray-900 dark:text-white">
// //                           {new Date(product.created_at).toLocaleDateString("ar-IQ", {
// //                             year: "numeric",
// //                             month: "long",
// //                             day: "numeric",
// //                           })}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </TabsContent>

// //                   <TabsContent value="reviews" className="mt-2 space-y-6">
// //                     {/* Rating Stats */}
// //                     {ratingStats && (
// //                       <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
// //                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                           <div className="text-center">
// //                             <div className="text-5xl font-bold text-amber-600 dark:text-amber-400 mb-2">
// //                               {ratingStats.averageRating?.toFixed(1) || "0.0"}
// //                             </div>
// //                             <div className="flex justify-center gap-1 mb-2">
// //                               {Array.from({ length: 5 }, (_, i) => (
// //                                 <Star
// //                                   key={i}
// //                                   className={`w-6 h-6 ${
// //                                     i < Math.floor(ratingStats.averageRating || 0)
// //                                       ? "fill-amber-400 text-amber-400"
// //                                       : "text-gray-300 dark:text-gray-600"
// //                                   }`}
// //                                 />
// //                               ))}
// //                             </div>
// //                             <p className="text-gray-600 dark:text-gray-400">{ratingStats.totalRatings || 0} تقييم</p>
// //                           </div>
// //                           <div className="space-y-2">
// //                             {[5, 4, 3, 2, 1].map((star) => {
// //                               const count = ratingStats.distribution?.[star] || 0
// //                               const percentage = ratingStats.totalRatings ? (count / ratingStats.totalRatings) * 100 : 0
// //                               return (
// //                                 <div key={star} className="flex items-center gap-3">
// //                                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
// //                                     {star} نجوم
// //                                   </span>
// //                                   <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
// //                                     <div
// //                                       className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
// //                                       style={{ width: `${percentage}%` }}
// //                                     />
// //                                   </div>
// //                                   <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
// //                                     {count}
// //                                   </span>
// //                                 </div>
// //                               )
// //                             })}
// //                           </div>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Add Rating Form */}
// //                     {isAuthenticated && (
// //                       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
// //                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">أضف تقييمك</h3>
// //                         <div className="space-y-4">
// //                           <div>
// //                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                               التقييم
// //                             </label>
// //                             <div className="flex gap-2">
// //                               {[1, 2, 3, 4, 5].map((star) => (
// //                                 <button
// //                                   key={star}
// //                                   type="button"
// //                                   onClick={() => setUserRating(star)}
// //                                   className="transition-transform hover:scale-110"
// //                                 >
// //                                   <Star
// //                                     className={`w-8 h-8 ${
// //                                       star <= userRating
// //                                         ? "fill-amber-400 text-amber-400"
// //                                         : "text-gray-300 dark:text-gray-600"
// //                                     }`}
// //                                   />
// //                                 </button>
// //                               ))}
// //                             </div>
// //                           </div>
// //                           <div>
// //                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                               التعليق (اختياري)
// //                             </label>
// //                             <textarea
// //                               value={userComment}
// //                               onChange={(e) => setUserComment(e.target.value)}
// //                               placeholder="شارك تجربتك مع هذا المنتج..."
// //                               className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
// //                               rows={4}
// //                             />
// //                           </div>
// //                           <Button
// //                             onClick={handleSubmitRating}
// //                             disabled={submittingRating || userRating === 0}
// //                             className="w-full bg-amber-600 hover:bg-amber-700 text-white"
// //                           >
// //                             {submittingRating ? (
// //                               <>
// //                                 <Loader2 className="w-5 h-5 ml-2 animate-spin" />
// //                                 جاري الإرسال...
// //                               </>
// //                             ) : (
// //                               "إرسال التقييم"
// //                             )}
// //                           </Button>
// //                         </div>
// //                       </div>
// //                     )}

// //                     {/* Ratings List */}
// //                     <div className="space-y-4">
// //                       {ratingsLoading ? (
// //                         <div className="text-center py-8">
// //                           <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto" />
// //                         </div>
// //                       ) : ratings.length > 0 ? (
// //                         <>
// //                           {ratings.map((rating) => (
// //                             <div
// //                               key={rating.id}
// //                               className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
// //                             >
// //                               <div className="flex items-start justify-between mb-3">
// //                                 <div>
// //                                   <p className="font-semibold text-gray-900 dark:text-white">{rating.user_name}</p>
// //                                   <p className="text-sm text-gray-500 dark:text-gray-400">
// //                                     {new Date(rating.created_at).toLocaleDateString("ar-IQ")}
// //                                   </p>
// //                                 </div>
// //                                 <div className="flex gap-1">
// //                                   {Array.from({ length: 5 }, (_, i) => (
// //                                     <Star
// //                                       key={i}
// //                                       className={`w-4 h-4 ${
// //                                         i < rating.rating
// //                                           ? "fill-amber-400 text-amber-400"
// //                                           : "text-gray-300 dark:text-gray-600"
// //                                       }`}
// //                                     />
// //                                   ))}
// //                                 </div>
// //                               </div>
// //                               {rating.comment && (
// //                                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{rating.comment}</p>
// //                               )}
// //                             </div>
// //                           ))}
// //                           {hasMoreRatings && (
// //                             <Button
// //                               onClick={() => setRatingsPage((p) => p + 1)}
// //                               variant="outline"
// //                               className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
// //                             >
// //                               عرض المزيد
// //                             </Button>
// //                           )}
// //                         </>
// //                       ) : (
// //                         <div className="text-center py-12">
// //                           <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
// //                           <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد تقييمات بعد</p>
// //                           <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">كن أول من يقيم هذا المنتج!</p>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </TabsContent>
// //                 </Tabs>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   )
// // }

// // export default ProductById





// "use client"

// // pages/ProductById.tsx
// import type React from "react"
// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useCart } from "../hooks/useCart"
// import { useFavorites } from "../hooks/useFavorites"
// import { useAuth } from "../hooks/useAuth"
// import { productsAPI } from "../api/products/index"
// import type { Product } from "../api/types/product.types"
// import { Card, CardContent, CardHeader } from "../components/ui/card"
// import { Button } from "../components/ui/button"
// import { Badge } from "../components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
// import {
//   ShoppingCart,
//   Heart,
//   Share2,
//   Truck,
//   Shield,
//   RotateCcw,
//   ArrowRight,
//   Home,
//   Star,
//   Package,
//   Loader2,
//   Minus,
//   Plus,
//   ArrowLeft,
// } from "lucide-react"
// import { toast } from "sonner"

// const ProductById: React.FC = () => {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const { addToCart, isLoading: cartLoading } = useCart()
//   const { toggleFavorite, checkIsFavorite } = useFavorites()
//   const { isAuthenticated } = useAuth()

//   const [product, setProduct] = useState<Product | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [quantity, setQuantity] = useState(1)
//   const [isWishlisted, setIsWishlisted] = useState(false)
//   const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
//   const [imageError, setImageError] = useState(false)
//   const [imageLoading, setImageLoading] = useState(true)
//   const [activeTab, setActiveTab] = useState("description")
//   const [addingToCart, setAddingToCart] = useState(false)

//   const [ratings, setRatings] = useState<any[]>([])
//   const [ratingsLoading, setRatingsLoading] = useState(false)
//   const [ratingStats, setRatingStats] = useState<any>(null)
//   const [userRating, setUserRating] = useState(0)
//   const [userComment, setUserComment] = useState("")
//   const [submittingRating, setSubmittingRating] = useState(false)
//   const [ratingsPage, setRatingsPage] = useState(1)
//   const [hasMoreRatings, setHasMoreRatings] = useState(true)

//   // جلب بيانات المنتج
//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (!id) return

//       try {
//         setLoading(true)
//         setError(null)
//         const productData = await productsAPI.getProduct(Number.parseInt(id))
//         setProduct(productData)
//       } catch (err) {
//         console.error("Error fetching product:", err)
//         setError("فشل في تحميل بيانات المنتج")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   // التحقق من حالة المفضلة
//   useEffect(() => {
//     const checkFavoriteStatus = async () => {
//       if (product && isAuthenticated) {
//         try {
//           const favoriteStatus = await checkIsFavorite(product.id)
//           setIsWishlisted(favoriteStatus)
//         } catch (error) {
//           console.error("Error checking favorite status:", error)
//         }
//       }
//     }

//     checkFavoriteStatus()
//   }, [product, isAuthenticated, checkIsFavorite])

//   useEffect(() => {
//     const fetchRatings = async () => {
//       if (!product) return

//       try {
//         setRatingsLoading(true)
//         const ratingsData = await productsAPI.getProductRatings(product.id, ratingsPage)
//         setRatings(ratingsData.ratings || [])
//         setRatingStats(ratingsData.stats || null)
//         setHasMoreRatings(ratingsData.hasMore || false)
//       } catch (error) {
//         console.error("Error fetching ratings:", error)
//       } finally {
//         setRatingsLoading(false)
//       }
//     }

//     fetchRatings()
//   }, [product, ratingsPage])

//   const handleAddToCart = async () => {
//     if (!product || addingToCart) return

//     try {
//       setAddingToCart(true)
//       await addToCart(product, quantity)
//       toast.success("تمت الإضافة إلى السلة!", {
//         description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
//         duration: 3000,
//       })
//     } catch (error) {
//       toast.error("فشل الإضافة إلى السلة", {
//         description: "يرجى المحاولة مرة أخرى.",
//         duration: 3000,
//       })
//     } finally {
//       setAddingToCart(false)
//     }
//   }

//   const handleQuantityChange = (delta: number) => {
//     const newQuantity = quantity + delta
//     if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
//       setQuantity(newQuantity)
//     }
//   }

//   const toggleWishlist = async () => {
//     if (!isAuthenticated) {
//       navigate("/login")
//       return
//     }

//     if (!product) return

//     setIsFavoriteLoading(true)
//     try {
//       const newFavoriteStatus = await toggleFavorite(product.id)
//       setIsWishlisted(newFavoriteStatus)

//       toast.success(newFavoriteStatus ? "تم الإضافة إلى المفضلة" : "تم الإزالة من المفضلة", {
//         description: product.name_ar || product.name,
//         duration: 3000,
//       })
//     } catch (error) {
//       console.error("Error toggling favorite:", error)
//       toast.error("فشل في العملية", {
//         description: "يرجى المحاولة مرة أخرى.",
//         duration: 3000,
//       })
//     } finally {
//       setIsFavoriteLoading(false)
//     }
//   }

//   const handleImageError = () => {
//     setImageError(true)
//     setImageLoading(false)
//   }

//   const handleImageLoad = () => {
//     setImageError(false)
//     setImageLoading(false)
//   }

//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null

//     if (imageUrl.startsWith("http")) {
//       return imageUrl
//     }

//     if (imageUrl.startsWith("/")) {
//       return `http://localhost:5000${imageUrl}`
//     }

//     return `http://localhost:5000/uploads/products/${imageUrl}`
//   }

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
//       />
//     ))
//   }

//   const formatPrice = (price: string | number) => {
//     const priceNumber = typeof price === "string" ? Number.parseFloat(price) : price
//     return priceNumber.toLocaleString("ar-IQ", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })
//   }

//   const calculateSavings = () => {
//     if (!product) return "0"
//     const original =
//       typeof product.original_price === "string" ? Number.parseFloat(product.original_price) : product.original_price
//     const current = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
//     const savings = (original || 0) - current
//     return savings.toLocaleString("ar-IQ", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })
//   }

//   const calculateTotalPrice = () => {
//     if (!product) return 0
//     const price = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
//     return price * quantity
//   }

//   const handleSubmitRating = async () => {
//     if (!isAuthenticated) {
//       navigate("/login")
//       return
//     }

//     if (!product || userRating === 0) {
//       toast.error("يرجى اختيار تقييم")
//       return
//     }

//     setSubmittingRating(true)
//     try {
//       await productsAPI.rateProduct(product.id, userRating, userComment)
//       toast.success("تم إضافة التقييم بنجاح")
//       setUserRating(0)
//       setUserComment("")
//       // Reload ratings to show the new one
//       setRatingsPage(1)
//     } catch (error: any) {
//       console.error("Error submitting rating:", error)
//       toast.error(error.response?.data?.message || "فشل في إضافة التقييم")
//     } finally {
//       setSubmittingRating(false)
//     }
//   }

//   const handleShare = async () => {
//     if (!product) return

//     const shareData = {
//       title: product.name_ar || product.name,
//       text: `${product.name_ar || product.name} - ${formatPrice(product.price)} د.ع`,
//       url: window.location.href,
//     }

//     try {
//       if (navigator.share) {
//         await navigator.share(shareData)
//         toast.success("تمت المشاركة بنجاح")
//       } else {
//         // Fallback: copy to clipboard
//         await navigator.clipboard.writeText(shareData.url)
//         toast.success("تم نسخ الرابط")
//       }
//     } catch (error) {
//       console.error("Error sharing:", error)
//       // Fallback: copy to clipboard
//       try {
//         await navigator.clipboard.writeText(shareData.url)
//         toast.success("تم نسخ الرابط")
//       } catch (clipboardError) {
//         toast.error("فشل في المشاركة")
//       }
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" />
//           <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">جاري تحميل المنتج...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
//         <div className="text-center bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-800">
//           <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Package className="w-10 h-10 text-red-600 dark:text-red-400" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المنتج غير موجود</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "لم يتم العثور على المنتج المطلوب"}</p>
//           <div className="flex gap-3 justify-center">
//             <Button
//               onClick={() => navigate(-1)}
//               variant="outline"
//               className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:text-amber-400"
//             >
//               <ArrowLeft className="w-4 h-4 ml-2" />
//               رجوع
//             </Button>
//             <Button
//               onClick={() => navigate("/categories")}
//               className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
//             >
//               <Home className="w-4 h-4 ml-2" />
//               التصنيفات
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   const fullImageUrl = getFullImageUrl(product.image_url)
//   const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99)

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black">
//       {/* الهيدر */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40">
//         <div className="container mx-auto px-4 pt-4">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
//             <Button
//               variant="ghost"
//               onClick={() => navigate("/")}
//               className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
//             <Button
//               variant="ghost"
//               onClick={() => navigate("/categories")}
//               className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
//             >
//               التصنيفات
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
//             <span className="text-gray-900 dark:text-white font-semibold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
//               {product.name_ar || product.name}
//             </span>
//           </nav>
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-4 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* الجزء الأيمن - صورة المنتج */}
//           <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
//             <CardContent className="p-6">
//               <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
//                 {fullImageUrl && !imageError ? (
//                   <>
//                     {imageLoading && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
//                         <Loader2 className="w-12 h-12 text-gray-400 dark:text-gray-600 animate-spin" />
//                       </div>
//                     )}
//                     <img
//                       src={fullImageUrl || "/placeholder.svg"}
//                       alt={product.name_ar || product.name}
//                       className={`w-full h-full object-cover transition-opacity duration-300 ${
//                         imageLoading ? "opacity-0" : "opacity-100"
//                       }`}
//                       onError={handleImageError}
//                       onLoad={handleImageLoad}
//                     />
//                   </>
//                 ) : (
//                   <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
//                     {product.emoji_icon ? (
//                       <span className="text-8xl mb-4">{product.emoji_icon}</span>
//                     ) : (
//                       <Package className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4" />
//                     )}
//                     <span className="text-gray-500 dark:text-gray-400 text-lg text-center">
//                       {imageError ? "خطأ في تحميل الصورة" : "لا توجد صورة متاحة"}
//                     </span>
//                   </div>
//                 )}

//                 {/* البادجات */}
//                 <div className="absolute top-4 left-4 flex flex-col gap-2">
//                   {product.badge && (
//                     <Badge className="bg-amber-600 text-white text-sm py-1 px-3 w-fit shadow-md">{product.badge}</Badge>
//                   )}

//                   {product.discount > 0 && (
//                     <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
//                       {product.discount}% خصم
//                     </Badge>
//                   )}

//                   {!product.in_stock && (
//                     <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">غير متوفر</Badge>
//                   )}
//                 </div>
//               </div>

//               {/* أزرار الإجراءات */}
//               <div className="flex gap-3 mt-6">
//                 <Button
//                   variant="outline"
//                   className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
//                   onClick={toggleWishlist}
//                   disabled={isFavoriteLoading}
//                 >
//                   <Heart
//                     className={`w-5 h-5 ml-2 transition-colors ${
//                       isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
//                     }`}
//                   />
//                   <span className="font-medium">{isWishlisted ? "في المفضلة" : "إضافة إلى المفضلة"}</span>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
//                   onClick={handleShare}
//                 >
//                   <Share2 className="w-5 h-5 ml-2" />
//                   <span className="font-medium">مشاركة</span>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* الجزء الأيسر - تفاصيل المنتج */}
//           <div className="space-y-6">
//             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
//               <CardHeader className="pb-4">
//                 <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-right">
//                   {product.name_ar || product.name}
//                 </h1>
//                 <p className="text-lg text-gray-600 dark:text-gray-400 text-right">{product.name}</p>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 {/* التقييم */}
//                 <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
//                   <div className="flex items-center gap-1">{renderStars(Number.parseFloat(product.rating))}</div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold text-gray-900 dark:text-white">
//                       {Number.parseFloat(product.rating).toFixed(1)}
//                     </span>
//                     <span className="text-gray-500 dark:text-gray-400">•</span>
//                     <span className="text-gray-600 dark:text-gray-400">({product.reviews_count} تقييم)</span>
//                   </div>
//                 </div>

//                 {/* السعر */}
//                 <div className="space-y-3">
//                   <div className="flex items-baseline gap-4">
//                     <span className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
//                       {formatPrice(product.price)} د.ع
//                     </span>
//                     {product.discount > 0 && product.original_price && (
//                       <span className="text-xl text-gray-400 dark:text-gray-600 line-through">
//                         {formatPrice(product.original_price)} د.ع
//                       </span>
//                     )}
//                   </div>
//                   {product.discount > 0 && product.original_price && (
//                     <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
//                       <p className="text-red-700 dark:text-red-400 font-semibold">
//                         وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* حالة المخزون */}
//                 <div
//                   className={`flex items-center gap-3 p-4 rounded-xl ${
//                     product.in_stock
//                       ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
//                       : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
//                   }`}
//                 >
//                   <div className={`w-4 h-4 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"}`} />
//                   <div>
//                     <span
//                       className={`text-lg font-semibold ${
//                         product.in_stock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
//                       }`}
//                     >
//                       {product.in_stock
//                         ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ""}`
//                         : "غير متوفر"}
//                     </span>
//                     {product.in_stock && (
//                       <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">✓ جاهز للتوصيل خلال 24 ساعة</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* اختيار الكمية */}
//                 {product.in_stock && (
//                   <div className="space-y-3">
//                     <p className="text-lg font-semibold text-gray-900 dark:text-white">الكمية</p>
//                     <div className="flex items-center gap-4">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
//                         onClick={() => handleQuantityChange(-1)}
//                         disabled={quantity <= 1}
//                       >
//                         <Minus className="w-5 h-5" />
//                       </Button>
//                       <div className="w-20 h-12 flex items-center justify-center border-2 border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-xl font-bold text-xl text-amber-700 dark:text-amber-400">
//                         {quantity}
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
//                         onClick={() => handleQuantityChange(1)}
//                         disabled={!isQuantityAvailable}
//                       >
//                         <Plus className="w-5 h-5" />
//                       </Button>
//                     </div>
//                     {product.stock_quantity && (
//                       <p className="text-sm text-gray-600 dark:text-gray-400">
//                         متبقي {product.stock_quantity} قطعة فقط
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* زر إضافة إلى السلة */}
//                 <Button
//                   onClick={handleAddToCart}
//                   disabled={!product.in_stock || addingToCart || cartLoading || !isQuantityAvailable}
//                   className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
//                   size="lg"
//                 >
//                   {addingToCart ? (
//                     <>
//                       <Loader2 className="w-5 h-5 ml-3 animate-spin" />
//                       جاري الإضافة...
//                     </>
//                   ) : product.in_stock && isQuantityAvailable ? (
//                     <>
//                       <ShoppingCart className="w-6 h-6 ml-3" />
//                       أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
//                     </>
//                   ) : (
//                     "غير متوفر حاليًا"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* المميزات */}
//             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
//               <CardContent className="p-6">
//                 <div className="grid grid-cols-1 gap-4">
//                   <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
//                     <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
//                       <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
//                     </div>
//                     <div>
//                       <p className="text-base font-semibold text-amber-900 dark:text-amber-300">شحن مجاني</p>
//                       <p className="text-sm text-amber-700 dark:text-amber-400">للطلبات فوق 50,000 د.ع</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
//                     <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
//                       <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
//                     </div>
//                     <div>
//                       <p className="text-base font-semibold text-green-900 dark:text-green-300">دفع آمن</p>
//                       <p className="text-sm text-green-700 dark:text-green-400">معاملات 100% آمنة ومشفرة</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
//                     <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
//                       <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
//                     </div>
//                     <div>
//                       <p className="text-base font-semibold text-purple-900 dark:text-purple-300">إرجاع سهل</p>
//                       <p className="text-sm text-purple-700 dark:text-purple-400">سياسة إرجاع لمدة 30 يوم</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* معلومات المنتج */}
//             <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
//               <CardContent className="p-6">
//                 <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//                   <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
//                     <TabsTrigger
//                       value="description"
//                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       الوصف
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="details"
//                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       المواصفات
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="reviews"
//                       className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
//                     >
//                       التقييمات
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="description" className="mt-2 space-y-6">
//                     <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
//                       <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">الوصف بالعربية</h4>
//                       <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="rtl">
//                         {product.description_ar || product.description || "لا يوجد وصف متاح لهذا المنتج حالياً."}
//                       </p>
//                     </div>
//                     {product.description && (
//                       <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
//                         <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
//                           English Description
//                         </h4>
//                         <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="ltr">
//                           {product.description}
//                         </p>
//                       </div>
//                     )}
//                   </TabsContent>

//                   <TabsContent value="details" className="mt-2">
//                     <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-700">
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
//                         <span className="text-gray-600 dark:text-gray-400 font-medium">رقم المنتج</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">{product.id}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
//                         <span className="text-gray-600 dark:text-gray-400 font-medium">العلامة التجارية</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
//                         <span className="text-gray-600 dark:text-gray-400 font-medium">الفئة</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                           {product.category_name_ar || product.category_name}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
//                         <span className="text-gray-600 dark:text-gray-400 font-medium">التقييم</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                           {Number.parseFloat(product.rating).toFixed(1)} / 5.0
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
//                         <span className="text-gray-600 dark:text-gray-400 font-medium">عدد التقييمات</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">{product.reviews_count}</span>
//                       </div>
//                       <div className="flex justify-between items-center py-3">
//                         <span className="text-gray-600 dark:text-gray-400 font-medium">تاريخ الإضافة</span>
//                         <span className="font-semibold text-gray-900 dark:text-white">
//                           {new Date(product.created_at).toLocaleDateString("ar-IQ", {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </span>
//                       </div>
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="reviews" className="mt-2 space-y-6">
//                     {/* Rating Stats */}
//                     {ratingStats && (
//                       <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div className="text-center">
//                             <div className="text-5xl font-bold text-amber-600 dark:text-amber-400 mb-2">
//                               {ratingStats.averageRating?.toFixed(1) || "0.0"}
//                             </div>
//                             <div className="flex justify-center gap-1 mb-2">
//                               {Array.from({ length: 5 }, (_, i) => (
//                                 <Star
//                                   key={i}
//                                   className={`w-6 h-6 ${
//                                     i < Math.floor(ratingStats.averageRating || 0)
//                                       ? "fill-amber-400 text-amber-400"
//                                       : "text-gray-300 dark:text-gray-600"
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                             <p className="text-gray-600 dark:text-gray-400">{ratingStats.totalRatings || 0} تقييم</p>
//                           </div>
//                           <div className="space-y-2">
//                             {[5, 4, 3, 2, 1].map((star) => {
//                               const count = ratingStats.distribution?.[star] || 0
//                               const percentage = ratingStats.totalRatings ? (count / ratingStats.totalRatings) * 100 : 0
//                               return (
//                                 <div key={star} className="flex items-center gap-3">
//                                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
//                                     {star} نجوم
//                                   </span>
//                                   <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                                     <div
//                                       className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
//                                       style={{ width: `${percentage}%` }}
//                                     />
//                                   </div>
//                                   <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
//                                     {count}
//                                   </span>
//                                 </div>
//                               )
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Add Rating Form */}
//                     {isAuthenticated && (
//                       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
//                         <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">أضف تقييمك</h3>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               التقييم
//                             </label>
//                             <div className="flex gap-2">
//                               {[1, 2, 3, 4, 5].map((star) => (
//                                 <button
//                                   key={star}
//                                   type="button"
//                                   onClick={() => setUserRating(star)}
//                                   className="transition-transform hover:scale-110"
//                                 >
//                                   <Star
//                                     className={`w-8 h-8 ${
//                                       star <= userRating
//                                         ? "fill-amber-400 text-amber-400"
//                                         : "text-gray-300 dark:text-gray-600"
//                                     }`}
//                                   />
//                                 </button>
//                               ))}
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                               التعليق (اختياري)
//                             </label>
//                             <textarea
//                               value={userComment}
//                               onChange={(e) => setUserComment(e.target.value)}
//                               placeholder="شارك تجربتك مع هذا المنتج..."
//                               className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
//                               rows={4}
//                             />
//                           </div>
//                           <Button
//                             onClick={handleSubmitRating}
//                             disabled={submittingRating || userRating === 0}
//                             className="w-full bg-amber-600 hover:bg-amber-700 text-white"
//                           >
//                             {submittingRating ? (
//                               <>
//                                 <Loader2 className="w-5 h-5 ml-2 animate-spin" />
//                                 جاري الإرسال...
//                               </>
//                             ) : (
//                               "إرسال التقييم"
//                             )}
//                           </Button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Ratings List */}
//                     <div className="space-y-4">
//                       {ratingsLoading ? (
//                         <div className="text-center py-8">
//                           <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto" />
//                         </div>
//                       ) : ratings.length > 0 ? (
//                         <>
//                           {ratings.map((rating) => (
//                             <div
//                               key={rating.id}
//                               className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
//                             >
//                               <div className="flex items-start justify-between mb-3">
//                                 <div>
//                                   <p className="font-semibold text-gray-900 dark:text-white">{rating.user_name}</p>
//                                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                                     {new Date(rating.created_at).toLocaleDateString("ar-IQ")}
//                                   </p>
//                                 </div>
//                                 <div className="flex gap-1">
//                                   {Array.from({ length: 5 }, (_, i) => (
//                                     <Star
//                                       key={i}
//                                       className={`w-4 h-4 ${
//                                         i < rating.rating
//                                           ? "fill-amber-400 text-amber-400"
//                                           : "text-gray-300 dark:text-gray-600"
//                                       }`}
//                                     />
//                                   ))}
//                                 </div>
//                               </div>
//                               {rating.comment && (
//                                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{rating.comment}</p>
//                               )}
//                             </div>
//                           ))}
//                           {hasMoreRatings && (
//                             <Button
//                               onClick={() => setRatingsPage((p) => p + 1)}
//                               variant="outline"
//                               className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
//                             >
//                               عرض المزيد
//                             </Button>
//                           )}
//                         </>
//                       ) : (
//                         <div className="text-center py-12">
//                           <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
//                           <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد تقييمات بعد</p>
//                           <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">كن أول من يقيم هذا المنتج!</p>
//                         </div>
//                       )}
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default ProductById




"use client"

// pages/ProductById.tsx
import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { useFavorites } from "../hooks/useFavorites"
import { useAuth } from "../hooks/useAuth"
import { productsAPI } from "../api/products/index"
import type { Product } from "../api/types/product.types"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ArrowRight,
  Home,
  Star,
  Package,
  Loader2,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react"
import { toast } from "sonner"

const ProductById: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart, isLoading: cartLoading } = useCart()
  const { toggleFavorite, checkIsFavorite } = useFavorites()
  const { isAuthenticated } = useAuth()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")
  const [addingToCart, setAddingToCart] = useState(false)

  const [ratings, setRatings] = useState<any[]>([])
  const [ratingsLoading, setRatingsLoading] = useState(false)
  const [ratingStats, setRatingStats] = useState<any>(null)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [submittingRating, setSubmittingRating] = useState(false)
  const [ratingsPage, setRatingsPage] = useState(1)
  const [hasMoreRatings, setHasMoreRatings] = useState(true)

  // جلب بيانات المنتج
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return

      try {
        setLoading(true)
        setError(null)
        const productData = await productsAPI.getProduct(Number.parseInt(id))
        setProduct(productData)
      } catch (err) {
        console.error("Error fetching product:", err)
        setError("فشل في تحميل بيانات المنتج")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // التحقق من حالة المفضلة
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (product && isAuthenticated) {
        try {
          const favoriteStatus = await checkIsFavorite(product.id)
          setIsWishlisted(favoriteStatus)
        } catch (error) {
          console.error("Error checking favorite status:", error)
        }
      }
    }

    checkFavoriteStatus()
  }, [product, isAuthenticated, checkIsFavorite])

  useEffect(() => {
    const fetchRatings = async () => {
      if (!product) return

      try {
        setRatingsLoading(true)
        const ratingsData = await productsAPI.getProductRatings(product.id, ratingsPage)
        setRatings(ratingsData.ratings || [])
        setRatingStats(ratingsData.stats || null)
        setHasMoreRatings(ratingsData.hasMore || false)
      } catch (error) {
        console.error("Error fetching ratings:", error)
      } finally {
        setRatingsLoading(false)
      }
    }

    fetchRatings()
  }, [product, ratingsPage])

  const handleAddToCart = async () => {
    if (!product || addingToCart) return

    try {
      setAddingToCart(true)
      await addToCart(product, quantity)
      toast.success("تمت الإضافة إلى السلة!", {
        description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
        duration: 3000,
      })
    } catch (error) {
      toast.error("فشل الإضافة إلى السلة", {
        description: "يرجى المحاولة مرة أخرى.",
        duration: 3000,
      })
    } finally {
      setAddingToCart(false)
    }
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
      setQuantity(newQuantity)
    }
  }

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (!product) return

    setIsFavoriteLoading(true)
    try {
      const newFavoriteStatus = await toggleFavorite(product.id)
      setIsWishlisted(newFavoriteStatus)

      toast.success(newFavoriteStatus ? "تم الإ��افة إلى المفضلة" : "تم الإزالة من المفضلة", {
        description: product.name_ar || product.name,
        duration: 3000,
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.error("فشل في العملية", {
        description: "يرجى المحاولة مرة أخرى.",
        duration: 3000,
      })
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageError(false)
    setImageLoading(false)
  }

  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null

    if (imageUrl.startsWith("http")) {
      return imageUrl
    }

    if (imageUrl.startsWith("/")) {
      return `http://localhost:5000${imageUrl}`
    }

    return `http://localhost:5000/uploads/products/${imageUrl}`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const formatPrice = (price: string | number) => {
    const priceNumber = typeof price === "string" ? Number.parseFloat(price) : price
    return priceNumber.toLocaleString("ar-IQ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const calculateSavings = () => {
    if (!product) return "0"
    const original =
      typeof product.original_price === "string" ? Number.parseFloat(product.original_price) : product.original_price
    const current = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
    const savings = (original || 0) - current
    return savings.toLocaleString("ar-IQ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const calculateTotalPrice = () => {
    if (!product) return 0
    const price = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
    return price * quantity
  }

  const handleSubmitRating = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (!product || userRating === 0) {
      toast.error("يرجى اختيار تقييم")
      return
    }

    setSubmittingRating(true)
    try {
      await productsAPI.rateProduct(product.id, userRating, userComment)
      toast.success("تم إضافة التقييم بنجاح")
      setUserRating(0)
      setUserComment("")
      // Reload ratings to show the new one
      setRatingsPage(1)
    } catch (error: any) {
      console.error("Error submitting rating:", error)
      toast.error(error.response?.data?.message || "فشل في إضافة التقييم")
    } finally {
      setSubmittingRating(false)
    }
  }

  const handleShare = async () => {
    if (!product) return

    const shareData = {
      title: product.name_ar || product.name,
      text: `${product.name_ar || product.name} - ${formatPrice(product.price)} د.ع`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast.success("تمت المشاركة بنجاح")
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareData.url)
        toast.success("تم نسخ الرابط")
      }
    } catch (error) {
      console.error("Error sharing:", error)
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url)
        toast.success("تم نسخ الرابط")
      } catch (clipboardError) {
        toast.error("فشل في المشاركة")
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">جاري تحميل المنتج...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
        <div className="text-center bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-800">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المنتج غير موجود</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "لم يتم العثور على المنتج المطلوب"}</p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-500 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:text-amber-400"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              رجوع
            </Button>
            <Button
              onClick={() => navigate("/categories")}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
            >
              <Home className="w-4 h-4 ml-2" />
              التصنيفات
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const fullImageUrl = getFullImageUrl(product.image_url)
  const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* الهيدر */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 pt-4">
          {/* مسار التنقل */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
            >
              <Home className="w-4 h-4" />
              الرئيسية
            </Button>
            <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
            <Button
              variant="ghost"
              onClick={() => navigate("/categories")}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-xl px-3 py-2 transition-all"
            >
              التصنيفات
            </Button>
            <ArrowRight className="w-4 h-4 rotate-180 text-gray-400 dark:text-gray-600" />
            <span className="text-gray-900 dark:text-white font-semibold bg-gradient-to-r from-amber-600 to-amber-700 bg-clip-text text-transparent">
              {product.name_ar || product.name}
            </span>
          </nav>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* الجزء الأيمن - صورة المنتج */}
          <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
            <CardContent className="p-6">
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden">
                {fullImageUrl && !imageError ? (
                  <>
                    {imageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <Loader2 className="w-12 h-12 text-gray-400 dark:text-gray-600 animate-spin" />
                      </div>
                    )}
                    <img
                      src={fullImageUrl || "/placeholder.svg"}
                      alt={product.name_ar || product.name}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoading ? "opacity-0" : "opacity-100"
                      }`}
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                    />
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-8">
                    {product.emoji_icon ? (
                      <span className="text-8xl mb-4">{product.emoji_icon}</span>
                    ) : (
                      <Package className="w-24 h-24 text-gray-400 dark:text-gray-600 mb-4" />
                    )}
                    <span className="text-gray-500 dark:text-gray-400 text-lg text-center">
                      {imageError ? "خطأ في تحميل الصورة" : "لا توجد صورة متاحة"}
                    </span>
                  </div>
                )}

                {/* البادجات */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <Badge className="bg-amber-600 text-white text-sm py-1 px-3 w-fit shadow-md">{product.badge}</Badge>
                  )}

                  {product.discount > 0 && (
                    <Badge className="bg-red-600 text-white text-sm py-1 px-3 w-fit shadow-md">
                      {product.discount}% خصم
                    </Badge>
                  )}

                  {!product.in_stock && (
                    <Badge className="bg-gray-600 text-white text-sm py-1 px-3 w-fit shadow-md">غير متوفر</Badge>
                  )}
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-red-500 dark:hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
                  onClick={toggleWishlist}
                  disabled={isFavoriteLoading}
                >
                  <Heart
                    className={`w-5 h-5 ml-2 transition-colors ${
                      isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"
                    }`}
                  />
                  <span className="font-medium">{isWishlisted ? "في المفضلة" : "إضافة إلى المفضلة"}</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 text-gray-700 dark:text-gray-300 bg-transparent"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 ml-2" />
                  <span className="font-medium">مشاركة</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* الجزء الأيسر - تفاصيل المنتج */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight text-right">
                  {product.name_ar || product.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 text-right">{product.name}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* التقييم */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-1">{renderStars(Number.parseFloat(product.rating))}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {Number.parseFloat(product.rating).toFixed(1)}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">•</span>
                    <span className="text-gray-600 dark:text-gray-400">({product.reviews_count} تقييم)</span>
                  </div>
                </div>

                {/* السعر */}
                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">
                      {formatPrice(product.price)} د.ع
                    </span>
                    {product.discount > 0 && product.original_price && (
                      <span className="text-xl text-gray-400 dark:text-gray-600 line-through">
                        {formatPrice(product.original_price)} د.ع
                      </span>
                    )}
                  </div>
                  {product.discount > 0 && product.original_price && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-red-700 dark:text-red-400 font-semibold">
                        وفرت {calculateSavings()} د.ع (خصم {product.discount}%)
                      </p>
                    </div>
                  )}
                </div>

                {/* حالة المخزون */}
                <div
                  className={`flex items-center gap-3 p-4 rounded-xl ${
                    product.in_stock
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"}`} />
                  <div>
                    <span
                      className={`text-lg font-semibold ${
                        product.in_stock ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {product.in_stock
                        ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ""}`
                        : "غير متوفر"}
                    </span>
                    {product.in_stock && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">✓ جاهز للتوصيل خلال 24 ساعة</p>
                    )}
                  </div>
                </div>

                {/* اختيار الكمية */}
                {product.in_stock && (
                  <div className="space-y-3">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">الكمية</p>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      <div className="w-20 h-12 flex items-center justify-center border-2 border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-xl font-bold text-xl text-amber-700 dark:text-amber-400">
                        {quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-12 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all disabled:opacity-50 bg-transparent"
                        onClick={() => handleQuantityChange(1)}
                        disabled={!isQuantityAvailable}
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </div>
                    {product.stock_quantity && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        متبقي {product.stock_quantity} قطعة فقط
                      </p>
                    )}
                  </div>
                )}

                {/* زر إضافة إلى السلة */}
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.in_stock || addingToCart || cartLoading || !isQuantityAvailable}
                  className="w-full h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {addingToCart ? (
                    <>
                      <Loader2 className="w-5 h-5 ml-3 animate-spin" />
                      جاري الإضافة...
                    </>
                  ) : product.in_stock && isQuantityAvailable ? (
                    <>
                      <ShoppingCart className="w-6 h-6 ml-3" />
                      أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
                    </>
                  ) : (
                    "غير متوفر حاليًا"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* المميزات */}
            <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center">
                      <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-amber-900 dark:text-amber-300">شحن سريع</p>
                       <p className="text-xs text-amber-700 dark:text-amber-400">توصيل سريع للطلبات  من 1-2 يوم</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-green-900 dark:text-green-300">دفع آمن</p>
                      <p className="text-sm text-green-700 dark:text-green-400">معاملات 100% آمنة ومشفرة</p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center">
                      <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-purple-900 dark:text-purple-300">إرجاع سهل</p>
                      <p className="text-sm text-purple-700 dark:text-purple-400">سياسة إرجاع لمدة 30 يوم</p>
                    </div>
                  </div> */}
                </div>
              </CardContent>
            </Card>

            {/* معلومات المنتج */}
            <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    <TabsTrigger
                      value="description"
                      className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
                    >
                      الوصف
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
                    >
                      المواصفات
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-medium text-gray-700 dark:text-gray-300"
                    >
                      التقييمات
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-2 space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">الوصف بالعربية</h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="rtl">
                        {product.description_ar || product.description || "لا يوجد وصف متاح لهذا المنتج حالياً."}
                      </p>
                    </div>
                    {product.description && (
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
                          English Description
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg" dir="ltr">
                          {product.description}
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="details" className="mt-2">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl space-y-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">رقم المنتج</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{product.id}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">العلامة التجارية</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">الفئة</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {product.category_name_ar || product.category_name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">التقييم</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {Number.parseFloat(product.rating).toFixed(1)} / 5.0
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">عدد التقييمات</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{product.reviews_count}</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">تاريخ الإضافة</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {new Date(product.created_at).toLocaleDateString("ar-IQ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="mt-2 space-y-6">
                    {/* Rating Stats */}
                    {ratingStats && (
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                              {ratingStats.averageRating?.toFixed(1) || "0.0"}
                            </div>
                            <div className="flex justify-center gap-1 mb-2">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-6 h-6 ${
                                    i < Math.floor(ratingStats.averageRating || 0)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{ratingStats.totalRatings || 0} تقييم</p>
                          </div>
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((star) => {
                              const count = ratingStats.distribution?.[star] || 0
                              const percentage = ratingStats.totalRatings ? (count / ratingStats.totalRatings) * 100 : 0
                              return (
                                <div key={star} className="flex items-center gap-3">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                                    {star} نجوم
                                  </span>
                                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                                    {count}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Add Rating Form */}
                    {isAuthenticated && (
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">أضف تقييمك</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              التقييم
                            </label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setUserRating(star)}
                                  className="transition-transform hover:scale-110"
                                >
                                  <Star
                                    className={`w-8 h-8 ${
                                      star <= userRating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              التعليق (اختياري)
                            </label>
                            <textarea
                              value={userComment}
                              onChange={(e) => setUserComment(e.target.value)}
                              placeholder="شارك تجربتك مع هذا المنتج..."
                              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                              rows={4}
                            />
                          </div>
                          <Button
                            onClick={handleSubmitRating}
                            disabled={submittingRating || userRating === 0}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            {submittingRating ? (
                              <>
                                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                                جاري الإرسال...
                              </>
                            ) : (
                              "إرسال التقييم"
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Ratings List */}
                    <div className="space-y-4">
                      {ratingsLoading ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto" />
                        </div>
                      ) : ratings.length > 0 ? (
                        <>
                          {ratings.map((rating) => (
                            <div
                              key={rating.id}
                              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <p className="font-semibold text-gray-900 dark:text-white">{rating.user_name}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(rating.created_at).toLocaleDateString("ar-IQ")}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < rating.rating
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-gray-300 dark:text-gray-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              {rating.comment && (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{rating.comment}</p>
                              )}
                            </div>
                          ))}
                          {hasMoreRatings && (
                            <Button
                              onClick={() => setRatingsPage((p) => p + 1)}
                              variant="outline"
                              className="w-full border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                            >
                              عرض المزيد
                            </Button>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-500 dark:text-gray-400 text-lg">لا توجد تقييمات بعد</p>
                          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">كن أول من يقيم هذا المنتج!</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductById
