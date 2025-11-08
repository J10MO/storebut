// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import { useCart } from "../hooks/useCart"
// // import { useAuth } from "../hooks/useAuth"
// // import { Button } from "../components/ui/button"
// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
// // import { Separator } from "../components/ui/separator"
// // import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, RotateCcw, ImageIcon, ArrowLeft } from "lucide-react"
// // import { toast } from "sonner"

// // const CartPage: React.FC = () => {
// //   const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart()
// //   const { isAuthenticated } = useAuth()
// //   const navigate = useNavigate()
// //   const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

// //   const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
// //     try {
// //       await updateQuantity(productId, newQuantity)
// //     } catch (error) {
// //       toast.error("فشل في تحديث الكمية")
// //     }
// //   }

// //   const handleRemoveItem = async (productId: number, productName: string) => {
// //     if (window.confirm(`هل تريد حذف ${productName} من السلة؟`)) {
// //       try {
// //         await removeFromCart(productId)
// //         toast.success("تم الحذف من السلة")
// //       } catch (error) {
// //         toast.error("فشل في حذف المنتج")
// //       }
// //     }
// //   }

// //   const handleClearCart = async () => {
// //     if (window.confirm("هل تريد إفراغ السلة بالكامل؟")) {
// //       try {
// //         await clearCart()
// //         toast.success("تم إفراغ السلة")
// //       } catch (error) {
// //         toast.error("فشل في إفراغ السلة")
// //       }
// //     }
// //   }

// //   const handleCheckout = () => {
// //     if (isAuthenticated) {
// //       navigate("/checkout")
// //     } else {
// //       navigate("/login", { state: { from: "/checkout" } })
// //     }
// //   }

// //   const handleImageError = (productId: number) => {
// //     setImageErrors((prev) => ({ ...prev, [productId]: true }))
// //   }

// //   const getFullImageUrl = (imageUrl: string | null) => {
// //     if (!imageUrl) return null

// //     if (imageUrl.startsWith("http")) {
// //       return imageUrl
// //     }

// //     if (imageUrl.startsWith("/")) {
// //       return `https://markt-x51r.onrender.com/api${imageUrl}`
// //     }

// //     return `https://markt-x51r.onrender.com/api/uploads/products/${imageUrl}`
// //   }

// //   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000
// //   const totalWithShipping = getTotalPrice() + shippingCost

// //   if (items.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4" dir="rtl">
// //         <div className="max-w-md w-full text-center">
// //           <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
// //             <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 dark:text-amber-400" />
// //           </div>
// //           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3">سلتك فارغة</h2>
// //           <p className="text-gray-600 dark:text-gray-400 mb-8 text-base sm:text-lg">
// //             ابدأ بإضافة بعض المنتجات الرائعة!
// //           </p>
// //           <div className="space-y-4">
// //             <Button
// //               onClick={() => navigate("/products")}
// //               size="lg"
// //               className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg shadow-lg"
// //             >
// //               تصفح المنتجات
// //             </Button>
// //             <Button
// //               variant="outline"
// //               onClick={() => navigate("/")}
// //               className="w-full sm:w-auto border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
// //             >
// //               <ArrowLeft className="w-5 h-5 ml-2" />
// //               العودة للرئيسية
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-black py-4 sm:py-8 pb-24" dir="rtl">
// //       <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
// //         <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// //           <div className="text-center sm:text-right w-full sm:w-auto">
// //             <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">سلة التسوق</h1>
// //             <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
// //               <span className="font-semibold text-amber-600 dark:text-amber-400">{getTotalItems()}</span> منتج في سلتك
// //             </p>
// //           </div>
// //           <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
// //             <Button
// //               variant="outline"
// //               onClick={() => navigate("/products")}
// //               className="flex-1 sm:flex-none text-sm sm:text-base border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
// //             >
// //               <ArrowLeft className="w-4 h-4 ml-2" />
// //               <span className="hidden sm:inline">متابعة التسوق</span>
// //               <span className="sm:hidden">التسوق</span>
// //             </Button>
// //             <Button
// //               variant="outline"
// //               onClick={handleClearCart}
// //               className="flex-1 sm:flex-none text-sm sm:text-base text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent"
// //             >
// //               <Trash2 className="w-4 h-4 ml-2" />
// //               <span className="hidden sm:inline">إفراغ السلة</span>
// //               <span className="sm:hidden">إفراغ</span>
// //             </Button>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
// //           <div className="lg:col-span-2 space-y-4 sm:space-y-6">
// //             <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
// //               <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
// //                 منتجاتك المختارة
// //               </h2>
// //               <div className="space-y-3 sm:space-y-4">
// //                 {items.map((item) => {
// //                   const fullImageUrl = getFullImageUrl(item.product.image_url)
// //                   const hasImageError = imageErrors[item.product.id]

// //                   return (
// //                     <div
// //                       key={item.product.id}
// //                       className="group bg-white dark:bg-gray-800/90 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-300 p-3 sm:p-5"
// //                     >
// //                       <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
// //                         <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-500 group-hover:border-amber-300 dark:group-hover:border-amber-500 transition-all duration-300">
// //                           {fullImageUrl && !hasImageError ? (
// //                             <img
// //                               src={fullImageUrl || "/placeholder.svg"}
// //                               alt={item.product.name}
// //                               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
// //                               onError={() => handleImageError(item.product.id)}
// //                             />
// //                           ) : (
// //                             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 p-2">
// //                               {item.product.emoji_icon ? (
// //                                 <span className="text-3xl sm:text-2xl mb-1">{item.product.emoji_icon}</span>
// //                               ) : (
// //                                 <ImageIcon className="w-10 h-10 sm:w-8 sm:h-8 text-gray-400 mb-1" />
// //                               )}
// //                               <span className="text-xs text-gray-500 dark:text-gray-300 text-center">لا توجد صورة</span>
// //                             </div>
// //                           )}
// //                         </div>

// //                         <div className="flex-1 flex flex-col">
// //                           <div className="flex justify-between items-start mb-3">
// //                             <div className="flex-1">
// //                               <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 line-clamp-2 sm:line-clamp-1">
// //                                 {item.product.name}
// //                               </h3>
// //                               <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-1">
// //                                 {item.product.name_ar}
// //                               </p>
// //                               {item.product.brand && (
// //                                 <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 px-2 sm:px-3 py-1 rounded-full inline-block font-medium">
// //                                   {item.product.brand}
// //                                 </p>
// //                               )}
// //                             </div>
// //                             <Button
// //                               variant="ghost"
// //                               size="icon"
// //                               onClick={() => handleRemoveItem(item.product.id, item.product.name)}
// //                               className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all"
// //                             >
// //                               <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
// //                             </Button>
// //                           </div>

// //                           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto pt-3 border-t border-gray-200 dark:border-gray-600">
// //                             <div className="flex items-center justify-center sm:justify-start gap-2 bg-white dark:bg-gray-700/80 rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-500 p-1 shadow-sm">
// //                               <Button
// //                                 variant="ghost"
// //                                 size="icon"
// //                                 className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all"
// //                                 onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
// //                                 disabled={item.quantity <= 1}
// //                               >
// //                                 <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
// //                               </Button>
// //                               <span className="w-12 sm:w-14 text-center font-bold text-gray-900 dark:text-white text-base sm:text-lg">
// //                                 {item.quantity}
// //                               </span>
// //                               <Button
// //                                 variant="ghost"
// //                                 size="icon"
// //                                 className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 transition-all"
// //                                 onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
// //                                 disabled={item.quantity >= 99}
// //                               >
// //                                 <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
// //                               </Button>
// //                             </div>

// //                             <div className="text-center sm:text-left">
// //                               <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
// //                                 {(Number.parseFloat(item.product.price) * item.quantity).toLocaleString()} د.ع
// //                               </p>
// //                               <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
// //                                 {Number.parseFloat(item.product.price).toLocaleString()} د.ع للواحد
// //                               </p>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )
// //                 })}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="lg:col-span-1">
// //             <Card className="sticky top-4 sm:top-8 border-0 shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden dark:bg-gray-900/90 dark:border-gray-700">
// //               <CardHeader className="bg-gradient-to-l from-amber-600 to-amber-500 text-white pb-4 sm:pb-6">
// //                 <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
// //                   <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
// //                   ملخص الطلب
// //                 </CardTitle>
// //               </CardHeader>

// //               <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
// //                 <div className="space-y-3 sm:space-y-4">
// //                   <div className="flex justify-between items-center text-base sm:text-lg">
// //                     <span className="text-gray-600 dark:text-gray-300">المجموع الفرعي</span>
// //                     <span className="font-bold text-gray-900 dark:text-white">
// //                       {getTotalPrice().toLocaleString()} د.ع
// //                     </span>
// //                   </div>
// //                   <div className="flex justify-between items-center text-base sm:text-lg">
// //                     <span className="text-gray-600 dark:text-gray-300">التوصيل</span>
// //                     <span
// //                       className={`font-bold ${shippingCost === 0 ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
// //                     >
// //                       {shippingCost === 0 ? "مجاني 🎉" : `${shippingCost.toLocaleString()} د.ع`}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {getTotalPrice() < 50000 && (
// //                   <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-lg sm:rounded-xl p-3 sm:p-4">
// //                     <div className="flex items-center gap-3">
// //                       <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
// //                       <div>
// //                         <p className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-200">
// //                           أنت قريب من التوصيل المجاني!
// //                         </p>
// //                         <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
// //                           أضف {(50000 - getTotalPrice()).toLocaleString()} د.ع للحصول على توصيل مجاني
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <Separator className="my-2 dark:bg-gray-700" />

// //                 <div className="flex justify-between items-center pt-2">
// //                   <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">المجموع الكلي</span>
// //                   <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl">
// //                     {totalWithShipping.toLocaleString()} د.ع
// //                   </span>
// //                 </div>
// //               </CardContent>

// //               <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col gap-4">
// //                 <Button
// //                   className="w-full py-3 text-base sm:text-lg font-semibold bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-0 text-white shadow-lg hover:shadow-xl transition-all"
// //                   size="lg"
// //                   onClick={handleCheckout}
// //                 >
// //                   {isAuthenticated ? "🛒 إتمام الشراء" : "🔐 تسجيل الدخول للمتابعة"}
// //                 </Button>

// //                 <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
// //                   <h4 className="font-semibold text-gray-900 dark:text-white text-center mb-2 sm:mb-3 text-sm sm:text-base">
// //                     مميزات الشراء
// //                   </h4>

// //                   <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
// //                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 dark:bg-green-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
// //                       <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
// //                     </div>
// //                     <div>
// //                       <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">توصيل سريع</p>
// //                       <p className="text-xs text-gray-600 dark:text-gray-300">لجميع المحافظات خلال 2-3 أيام</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
// //                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 dark:bg-amber-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
// //                       <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
// //                     </div>
// //                     <div>
// //                       <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">ضمان الجودة</p>
// //                       <p className="text-xs text-gray-600 dark:text-gray-300">أصالة المنتجات مضمونة 100%</p>
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
// //                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 dark:bg-orange-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
// //                       <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
// //                     </div>
// //                     <div>
// //                       <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">إرجاع سهل</p>
// //                       <p className="text-xs text-gray-600 dark:text-gray-300">إمكانية الإرجاع خلال 7 أيام</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardFooter>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default CartPage




// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useCart } from "../hooks/useCart"
// import { useAuth } from "../hooks/useAuth"
// import { useSettings } from "../hooks/useSettings"
// import { Button } from "../components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
// import { Separator } from "../components/ui/separator"
// import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, RotateCcw, ImageIcon, ArrowLeft } from "lucide-react"
// import { toast } from "sonner"
// import { formatPrice } from "../lib/formatPrice"

// const CartPage: React.FC = () => {
//   const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart()
//   const { isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

//   const { deliveryPrice, isLoading: loadingDeliveryPrice } = useSettings()

//   const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
//     try {
//       await updateQuantity(productId, newQuantity)
//     } catch (error) {
//       toast.error("فشل في تحديث الكمية")
//     }
//   }

//   const handleRemoveItem = async (productId: number, productName: string) => {
//     if (window.confirm(`هل تريد حذف ${productName} من السلة؟`)) {
//       try {
//         await removeFromCart(productId)
//         toast.success("تم الحذف من السلة")
//       } catch (error) {
//         toast.error("فشل في حذف المنتج")
//       }
//     }
//   }

//   const handleClearCart = async () => {
//     if (window.confirm("هل تريد إفراغ السلة بالكامل؟")) {
//       try {
//         await clearCart()
//         toast.success("تم إفراغ السلة")
//       } catch (error) {
//         toast.error("فشل في إفراغ السلة")
//       }
//     }
//   }

//   const handleCheckout = () => {
//     if (isAuthenticated) {
//       navigate("/checkout")
//     } else {
//       navigate("/login", { state: { from: "/checkout" } })
//     }
//   }

//   const handleImageError = (productId: number) => {
//     setImageErrors((prev) => ({ ...prev, [productId]: true }))
//   }

//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null

//     if (imageUrl.startsWith("http")) {
//       return imageUrl
//     }

//     if (imageUrl.startsWith("/")) {
//       return `https://markt-x51r.onrender.com/api${imageUrl}`
//     }

//     return `https://markt-x51r.onrender.com/api/uploads/products/${imageUrl}`
//   }

//   const shippingCost = getTotalPrice() >= 50000 ? 0 : deliveryPrice
//   const totalWithShipping = getTotalPrice() + shippingCost

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4" dir="rtl">
//         <div className="max-w-md w-full text-center">
//           <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//             <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 dark:text-amber-400" />
//           </div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3">سلتك فارغة</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-8 text-base sm:text-lg">
//             ابدأ بإضافة بعض المنتجات الرائعة!
//           </p>
//           <div className="space-y-4">
//             <Button
//               onClick={() => navigate("/products")}
//               size="lg"
//               className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg shadow-lg"
//             >
//               تصفح المنتجات
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => navigate("/")}
//               className="w-full sm:w-auto border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
//             >
//               <ArrowLeft className="w-5 h-5 ml-2" />
//               العودة للرئيسية
//             </Button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black py-4 sm:py-8 pb-24" dir="rtl">
//       <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
//         <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="text-center sm:text-right w-full sm:w-auto">
//             <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">سلة التسوق</h1>
//             <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
//               <span className="font-semibold text-amber-600 dark:text-amber-400">{getTotalItems()}</span> منتج في سلتك
//             </p>
//           </div>
//           <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
//             <Button
//               variant="outline"
//               onClick={() => navigate("/products")}
//               className="flex-1 sm:flex-none text-sm sm:text-base border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
//             >
//               <ArrowLeft className="w-4 h-4 ml-2" />
//               <span className="hidden sm:inline">متابعة التسوق</span>
//               <span className="sm:hidden">التسوق</span>
//             </Button>
//             <Button
//               variant="outline"
//               onClick={handleClearCart}
//               className="flex-1 sm:flex-none text-sm sm:text-base text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent"
//             >
//               <Trash2 className="w-4 h-4 ml-2" />
//               <span className="hidden sm:inline">إفراغ السلة</span>
//               <span className="sm:hidden">إفراغ</span>
//             </Button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
//           <div className="lg:col-span-2 space-y-4 sm:space-y-6">
//             <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
//                 منتجاتك المختارة
//               </h2>
//               <div className="space-y-3 sm:space-y-4">
//                 {items.map((item) => {
//                   const fullImageUrl = getFullImageUrl(item.product.image_url)
//                   const hasImageError = imageErrors[item.product.id]

//                   return (
//                     <div
//                       key={item.product.id}
//                       className="group bg-white dark:bg-gray-800/90 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-300 p-3 sm:p-5"
//                     >
//                       <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
//                         <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-500 group-hover:border-amber-300 dark:group-hover:border-amber-500 transition-all duration-300">
//                           {fullImageUrl && !hasImageError ? (
//                             <img
//                               src={fullImageUrl || "/placeholder.svg"}
//                               alt={item.product.name}
//                               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                               onError={() => handleImageError(item.product.id)}
//                             />
//                           ) : (
//                             <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 p-2">
//                               {item.product.emoji_icon ? (
//                                 <span className="text-3xl sm:text-2xl mb-1">{item.product.emoji_icon}</span>
//                               ) : (
//                                 <ImageIcon className="w-10 h-10 sm:w-8 sm:h-8 text-gray-400 mb-1" />
//                               )}
//                               <span className="text-xs text-gray-500 dark:text-gray-300 text-center">لا توجد صورة</span>
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex-1 flex flex-col">
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 line-clamp-2 sm:line-clamp-1">
//                                 {item.product.name}
//                               </h3>
//                               <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-1">
//                                 {item.product.name_ar}
//                               </p>
//                               {item.product.brand && (
//                                 <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 px-2 sm:px-3 py-1 rounded-full inline-block font-medium">
//                                   {item.product.brand}
//                                 </p>
//                               )}
//                             </div>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               onClick={() => handleRemoveItem(item.product.id, item.product.name)}
//                               className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all"
//                             >
//                               <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                             </Button>
//                           </div>

//                           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto pt-3 border-t border-gray-200 dark:border-gray-600">
//                             <div className="flex items-center justify-center sm:justify-start gap-2 bg-white dark:bg-gray-700/80 rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-500 p-1 shadow-sm">
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all"
//                                 onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
//                                 disabled={item.quantity <= 1}
//                               >
//                                 <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
//                               </Button>
//                               <span className="w-12 sm:w-14 text-center font-bold text-gray-900 dark:text-white text-base sm:text-lg">
//                                 {item.quantity}
//                               </span>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 transition-all"
//                                 onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
//                                 disabled={item.quantity >= 99}
//                               >
//                                 <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
//                               </Button>
//                             </div>

//                             <div className="text-center sm:text-left">
//                               <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
//                                 {formatPrice(Number.parseFloat(item.product.price) * item.quantity)}
//                               </p>
//                               <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
//                                 {formatPrice(Number.parseFloat(item.product.price))} للواحد
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <Card className="sticky top-4 sm:top-8 border-0 shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden dark:bg-gray-900/90 dark:border-gray-700">
//               <CardHeader className="bg-gradient-to-l from-amber-600 to-amber-500 text-white pb-4 sm:pb-6">
//                 <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
//                   <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
//                   ملخص الطلب
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
//                 <div className="space-y-3 sm:space-y-4">
//                   <div className="flex justify-between items-center text-base sm:text-lg">
//                     <span className="text-gray-600 dark:text-gray-300">المجموع الفرعي</span>
//                     <span className="font-bold text-gray-900 dark:text-white">{formatPrice(getTotalPrice())}</span>
//                   </div>
//                   <div className="flex justify-between items-center text-base sm:text-lg">
//                     <span className="text-gray-600 dark:text-gray-300">التوصيل</span>
//                     <span
//                       className={`font-bold ${shippingCost === 0 ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
//                     >
//                       {shippingCost === 0 ? "مجاني 🎉" : formatPrice(shippingCost)}
//                     </span>
//                   </div>
//                 </div>

//                 {getTotalPrice() < 50000 && (
//                   <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-lg sm:rounded-xl p-3 sm:p-4">
//                     <div className="flex items-center gap-3">
//                       <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
//                       <div>
//                         <p className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-200">
//                           أنت قريب من التوصيل المجاني!
//                         </p>
//                         <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
//                           أضف {formatPrice(50000 - getTotalPrice())} للحصول على توصيل مجاني
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <Separator className="my-2 dark:bg-gray-700" />

//                 <div className="flex justify-between items-center pt-2">
//                   <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">المجموع الكلي</span>
//                   <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl">
//                     {formatPrice(totalWithShipping)}
//                   </span>
//                 </div>
//               </CardContent>

//               <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col gap-4">
//                 <Button
//                   className="w-full py-3 text-base sm:text-lg font-semibold bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-0 text-white shadow-lg hover:shadow-xl transition-all"
//                   size="lg"
//                   onClick={handleCheckout}
//                 >
//                   {isAuthenticated ? "🛒 إتمام الشراء" : "🔐 تسجيل الدخول للمتابعة"}
//                 </Button>

//                 <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
//                   <h4 className="font-semibold text-gray-900 dark:text-white text-center mb-2 sm:mb-3 text-sm sm:text-base">
//                     مميزات الشراء
//                   </h4>

//                   <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 dark:bg-green-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">توصيل سريع</p>
//                       <p className="text-xs text-gray-600 dark:text-gray-300">لجميع المحافظات خلال 2-3 أيام</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 dark:bg-amber-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">ضمان الجودة</p>
//                       <p className="text-xs text-gray-600 dark:text-gray-300">أصالة المنتجات مضمونة 100%</p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
//                     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 dark:bg-orange-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
//                       <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">إرجاع سهل</p>
//                       <p className="text-xs text-gray-600 dark:text-gray-300">إمكانية الإرجاع خلال 7 أيام</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartPage




"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { useSettings } from "../hooks/useSettings"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, Truck, Shield, RotateCcw, ImageIcon, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { formatPrice } from "../lib/formatPrice"

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})

  const { deliveryPrice, isLoading: loadingDeliveryPrice } = useSettings()

  const handleUpdateQuantity = async (productId: number, newQuantity: number) => {
    try {
      await updateQuantity(productId, newQuantity)
    } catch (error) {
      toast.error("فشل في تحديث الكمية")
    }
  }

  const handleRemoveItem = async (productId: number, productName: string) => {
    if (window.confirm(`هل تريد حذف ${productName} من السلة؟`)) {
      try {
        await removeFromCart(productId)
        toast.success("تم الحذف من السلة")
      } catch (error) {
        toast.error("فشل في حذف المنتج")
      }
    }
  }

  const handleClearCart = async () => {
    if (window.confirm("هل تريد إفراغ السلة بالكامل؟")) {
      try {
        await clearCart()
        toast.success("تم إفراغ السلة")
      } catch (error) {
        toast.error("فشل في إفراغ السلة")
      }
    }
  }

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout")
    } else {
      navigate("/login", { state: { from: "/checkout" } })
    }
  }

  const handleImageError = (productId: number) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }))
  }

  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null

    if (imageUrl.startsWith("http")) {
      return imageUrl
    }

    if (imageUrl.startsWith("/")) {
      return `https://markt-x51r.onrender.com/api${imageUrl}`
    }

    return `https://markt-x51r.onrender.com/api/uploads/products/${imageUrl}`
  }

  const shippingCost = getTotalPrice() >= 50000 ? 0 : deliveryPrice
  const totalWithShipping = getTotalPrice() + shippingCost
  
  // Check if delivery is free (either because order >= 50000 or deliveryPrice is 1)
  const isDeliveryFree = shippingCost === 0 || deliveryPrice === 1

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4" dir="rtl">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 dark:text-amber-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-3">سلتك فارغة</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-base sm:text-lg">
            ابدأ بإضافة بعض المنتجات الرائعة!
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/products")}
              size="lg"
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg shadow-lg"
            >
              تصفح المنتجات
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
            >
              <ArrowLeft className="w-5 h-5 ml-2" />
              العودة للرئيسية
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-4 sm:py-8 pb-24" dir="rtl">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-center sm:text-right w-full sm:w-auto">
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">سلة التسوق</h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-amber-600 dark:text-amber-400">{getTotalItems()}</span> منتج في سلتك
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => navigate("/products")}
              className="flex-1 sm:flex-none text-sm sm:text-base border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
            >
              <ArrowLeft className="w-4 h-4 ml-2" />
              <span className="hidden sm:inline">متابعة التسوق</span>
              <span className="sm:hidden">التسوق</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="flex-1 sm:flex-none text-sm sm:text-base text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 bg-transparent"
            >
              <Trash2 className="w-4 h-4 ml-2" />
              <span className="hidden sm:inline">إفراغ السلة</span>
              <span className="sm:hidden">إفراغ</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
                منتجاتك المختارة
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {items.map((item) => {
                  const fullImageUrl = getFullImageUrl(item.product.image_url)
                  const hasImageError = imageErrors[item.product.id]

                  return (
                    <div
                      key={item.product.id}
                      className="group bg-white dark:bg-gray-800/90 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-300 p-3 sm:p-5"
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                        <div className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 bg-white dark:bg-gray-700 rounded-lg sm:rounded-xl overflow-hidden shadow-md border-2 border-gray-200 dark:border-gray-500 group-hover:border-amber-300 dark:group-hover:border-amber-500 transition-all duration-300">
                          {fullImageUrl && !hasImageError ? (
                            <img
                              src={fullImageUrl || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={() => handleImageError(item.product.id)}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 p-2">
                              {item.product.emoji_icon ? (
                                <span className="text-3xl sm:text-2xl mb-1">{item.product.emoji_icon}</span>
                              ) : (
                                <ImageIcon className="w-10 h-10 sm:w-8 sm:h-8 text-gray-400 mb-1" />
                              )}
                              <span className="text-xs text-gray-500 dark:text-gray-300 text-center">لا توجد صورة</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 line-clamp-2 sm:line-clamp-1">
                                {item.product.name}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-1">
                                {item.product.name_ar}
                              </p>
                              {item.product.brand && (
                                <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 px-2 sm:px-3 py-1 rounded-full inline-block font-medium">
                                  {item.product.brand}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-all"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto pt-3 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-center sm:justify-start gap-2 bg-white dark:bg-gray-700/80 rounded-lg sm:rounded-xl border-2 border-gray-300 dark:border-gray-500 p-1 shadow-sm">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all"
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                              <span className="w-12 sm:w-14 text-center font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 transition-all"
                                onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= 99}
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>

                            <div className="text-center sm:text-left">
                              <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                                {formatPrice(Number.parseFloat(item.product.price) * item.quantity)}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {formatPrice(Number.parseFloat(item.product.price))} للواحد
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4 sm:top-8 border-0 shadow-2xl rounded-xl sm:rounded-2xl overflow-hidden dark:bg-gray-900/90 dark:border-gray-700">
              <CardHeader className="bg-gradient-to-l from-amber-600 to-amber-500 text-white pb-4 sm:pb-6">
                <CardTitle className="text-xl sm:text-2xl flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
                  ملخص الطلب
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span className="text-gray-600 dark:text-gray-300">المجموع الفرعي</span>
                    <span className="font-bold text-gray-900 dark:text-white">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between items-center text-base sm:text-lg">
                    <span className="text-gray-600 dark:text-gray-300">التوصيل</span>
                    <span
                      className={`font-bold ${isDeliveryFree ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
                    >
                      {isDeliveryFree ? "مجاني 🎉" : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                {getTotalPrice() < 50000 && deliveryPrice !== 1 && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-200">
                          أنت قريب من التوصيل المجاني!
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                          أضف {formatPrice(50000 - getTotalPrice())} للحصول على توصيل مجاني
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator className="my-2 dark:bg-gray-700" />

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">المجموع الكلي</span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/40 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl">
                    {formatPrice(totalWithShipping)}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="p-4 sm:p-6 pt-0 flex flex-col gap-4">
                <Button
                  className="w-full py-3 text-base sm:text-lg font-semibold bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-0 text-white shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onClick={handleCheckout}
                >
                  {isAuthenticated ? "🛒 إتمام الشراء" : "🔐 تسجيل الدخول للمتابعة"}
                </Button>

                <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-center mb-2 sm:mb-3 text-sm sm:text-base">
                    مميزات الشراء
                  </h4>

                  <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 dark:bg-green-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">توصيل سريع</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">لجميع المحافظات خلال 2-3 أيام</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-50 dark:bg-amber-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">ضمان الجودة</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">أصالة المنتجات مضمونة 100%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-gray-800/80 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-600 transition-all">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-50 dark:bg-orange-900/40 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                      <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">إرجاع سهل</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">إمكانية الإرجاع خلال 7 أيام</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage