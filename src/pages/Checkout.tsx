// // "use client"

// // import type React from "react"
// // import { useState, useEffect } from "react"
// // import { Navigate, useNavigate } from "react-router-dom"
// // import { useAuth } from "../hooks/useAuth"
// // import { useCart } from "../hooks/useCart"
// // import { useOrders } from "../hooks/useOrders"
// // import { Button } from "../components/ui/button"
// // import { Input } from "../components/ui/input"
// // import { Textarea } from "../components/ui/textarea"
// // import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
// // import { Separator } from "../components/ui/separator"
// // import { ShoppingBag, MapPin, Phone, User, CreditCard, Truck, Loader2, Edit, Check, X } from "lucide-react"
// // import { toast } from "sonner"

// // interface AddressForm {
// //   governorate: string
// //   district: string
// //   area: string
// //   landmark: string
// // }

// // const Checkout: React.FC = () => {
// //   const { isAuthenticated, user } = useAuth()
// //   const { items, getTotalPrice, clearCart } = useCart()
// //   const { createOrder } = useOrders()
// //   const navigate = useNavigate()

// //   const [loading, setLoading] = useState(false)
// //   const [isEditingAddress, setIsEditingAddress] = useState(false)
// //   const [useCustomAddress, setUseCustomAddress] = useState(false)

// //   // حالة العنوان الافتراضي من بيانات المستخدم
// //   const [userAddress, setUserAddress] = useState<AddressForm>({
// //     governorate: user?.address?.city || "",
// //     district: user?.address?.district || "",
// //     area: user?.address?.area || "",
// //     landmark: user?.address?.landmark || "",
// //   })

// //   // حالة العنوان المخصص للتوصيل
// //   const [customAddress, setCustomAddress] = useState<AddressForm>({
// //     governorate: "",
// //     district: "",
// //     area: "",
// //     landmark: "",
// //   })

// //   const [formData, setFormData] = useState({
// //     delivery_phone: user?.phone || "",
// //     delivery_name: user?.name || "",
// //     notes: "",
// //     paymentMethod: "cash",
// //   })

// //   // تحديث عنوان المستخدم عندما تتغير بيانات المستخدم
// //   useEffect(() => {
// //     if (user?.address) {
// //       setUserAddress({
// //         governorate: user.address.city || "",
// //         district: user.address.district || "",
// //         area: user.address.area || "",
// //         landmark: user.address.landmark || "",
// //       })
// //     }
// //   }, [user])

// //   // قائمة المحافظات المطلوبة (4 محافظات)
// //   const governorates = ["بغداد", "البصرة", "نينوى", "أربيل"]

// //   // إعادة التوجيه إذا كانت السلة فارغة
// //   if (items.length === 0) {
// //     return <Navigate to="/cart" />
// //   }

// //   // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" state={{ from: "/checkout" }} />
// //   }

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     })
// //   }

// //   const handleUserAddressChange = (field: keyof AddressForm, value: string) => {
// //     setUserAddress((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }))
// //   }

// //   const handleCustomAddressChange = (field: keyof AddressForm, value: string) => {
// //     setCustomAddress((prev) => ({
// //       ...prev,
// //       [field]: value,
// //     }))
// //   }

// //   const saveUserAddress = async () => {
// //     try {
// //       setIsEditingAddress(false)
// //       toast.success("تم حفظ العنوان بنجاح")
// //     } catch (error) {
// //       toast.error("حدث خطأ في حفظ العنوان")
// //     }
// //   }

// //   const cancelEditAddress = () => {
// //     // إعادة تعيين العنوان إلى القيم الأصلية
// //     setUserAddress({
// //       governorate: user?.address?.city || "",
// //       district: user?.address?.district || "",
// //       area: user?.address?.area || "",
// //       landmark: user?.address?.landmark || "",
// //     })
// //     setIsEditingAddress(false)
// //   }

// //   const getDeliveryAddress = () => {
// //     if (useCustomAddress) {
// //       return customAddress
// //     }
// //     return userAddress
// //   }

// //   const formatAddress = (address: AddressForm) => {
// //     const parts = [address.area, address.district, address.governorate].filter(Boolean)

// //     return parts.join("، ")
// //   }

// //   const validateAddress = (address: AddressForm) => {
// //     if (!address.governorate || !address.district || !address.area) {
// //       return "الرجاء إدخال العنوان الكامل (المحافظة، القضاء/المنطقة، والحي)"
// //     }
// //     return null
// //   }

// //   const handleSubmitOrder = async () => {
// //     if (!formData.delivery_phone.trim()) {
// //       toast.error("الرجاء إدخال رقم الهاتف")
// //       return
// //     }

// //     if (!formData.delivery_name.trim()) {
// //       toast.error("الرجاء إدخال اسم المستلم")
// //       return
// //     }

// //     const deliveryAddress = getDeliveryAddress()
// //     const addressError = validateAddress(deliveryAddress)
// //     if (addressError) {
// //       toast.error(addressError)
// //       return
// //     }

// //     setLoading(true)

// //     try {
// //       const orderData = {
// //         delivery_address: formatAddress(deliveryAddress),
// //         delivery_phone: formData.delivery_phone,
// //         delivery_name: formData.delivery_name,
// //         notes: formData.notes,
// //         city: deliveryAddress.governorate,
// //         district: deliveryAddress.district,
// //         area: deliveryAddress.area,
// //         landmark: deliveryAddress.landmark,
// //         payment_method: formData.paymentMethod,
// //         items: items.map((item) => ({
// //           product_id: item.product.id,
// //           quantity: item.quantity,
// //           price: item.product.price,
// //         })),
// //         total_amount: getTotalPrice() + shippingCost,
// //         shipping_cost: shippingCost,
// //       }

// //       console.log("[v0] Submitting order with data:", orderData)

// //       const result = await createOrder(orderData)

// //       console.log("[v0] Order creation result:", result)

// //       // Backend returns: { message, order: { id, ... }, pointsEarned }
// //       let orderId = null

// //       if (result) {
// //         // Check if order data is nested in result.order
// //         if (result.order && (result.order.id || result.order.order_number)) {
// //           orderId = result.order.id || result.order.order_number
// //         }
// //         // Fallback: check if id is directly on result
// //         else if (result.id || result.order_number) {
// //           orderId = result.id || result.order_number
// //         }
// //       }

// //       if (orderId) {
// //         await clearCart()

// //         // Show points earned if available
// //         const pointsMessage = result.pointsEarned
// //           ? `لقد ربحت ${result.pointsEarned} نقطة!`
// //           : "سيتم التواصل معك قريباً لتأكيد الطلب"

// //         toast.success("تم إرسال طلبك بنجاح!", {
// //           description: pointsMessage,
// //         })

// //         navigate(`/order-success/${orderId}`)
// //       } else {
// //         console.error("[v0] Order ID not found in response:", result)
// //         toast.error("تم إنشاء الطلب ولكن حدث خطأ في الحصول على رقم الطلب")
// //       }
// //     } catch (error: any) {
// //       console.error("[v0] Order submission error:", error)

// //       const errorMessage =
// //         error.message || error.response?.data?.message || error.response?.data?.error || "حدث خطأ في إرسال الطلب"

// //       toast.error(errorMessage, {
// //         description: "الرجاء التحقق من البيانات والمحاولة مرة أخرى",
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000
// //   const totalWithShipping = getTotalPrice() + shippingCost

// //   const deliveryAddress = getDeliveryAddress()

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-black py-8 mb-15 transition-colors duration-300" dir="rtl">
// //       <div className="container mx-auto px-4">
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">إتمام الطلب</h1>
// //           <p className="text-gray-600 dark:text-gray-400">أكمل بياناتك لإتمام عملية الشراء</p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-15">
// //           {/* نموذج بيانات التوصيل */}
// //           <div className="lg:col-span-2 space-y-6">
// //             {/* معلومات المستلم */}
// //             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 dark:text-white">
// //                   <User className="w-5 h-5" />
// //                   معلومات المستلم
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     اسم المستلم *
// //                   </label>
// //                   <Input
// //                     type="text"
// //                     name="delivery_name"
// //                     value={formData.delivery_name}
// //                     onChange={handleInputChange}
// //                     placeholder="اسم الشخص الذي سيتسلم الطلب"
// //                     className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                   />
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     رقم الهاتف *
// //                   </label>
// //                   <div className="relative">
// //                     <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                     <Input
// //                       type="tel"
// //                       name="delivery_phone"
// //                       value={formData.delivery_phone}
// //                       onChange={handleInputChange}
// //                       placeholder="07XX XXX XXXX"
// //                       className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       dir="ltr"
// //                     />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* عنوان التوصيل */}
// //             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
// //               <CardHeader>
// //                 <div className="flex items-center justify-between">
// //                   <CardTitle className="flex items-center gap-2 dark:text-white">
// //                     <MapPin className="w-5 h-5" />
// //                     عنوان التوصيل
// //                   </CardTitle>
// //                   <div className="flex gap-2">
// //                     {!useCustomAddress && (
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => setIsEditingAddress(!isEditingAddress)}
// //                         className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
// //                       >
// //                         {isEditingAddress ? <X className="w-4 h-4 ml-1" /> : <Edit className="w-4 h-4 ml-1" />}
// //                         {isEditingAddress ? "إلغاء" : "تعديل"}
// //                       </Button>
// //                     )}
// //                     <Button
// //                       variant={useCustomAddress ? "default" : "outline"}
// //                       size="sm"
// //                       onClick={() => setUseCustomAddress(!useCustomAddress)}
// //                       className={
// //                         useCustomAddress
// //                           ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
// //                           : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
// //                       }
// //                     >
// //                       {useCustomAddress ? "استخدام عنواني" : "عنوان مختلف"}
// //                     </Button>
// //                   </div>
// //                 </div>
// //                 {!useCustomAddress && !isEditingAddress && userAddress.area && (
// //                   <CardDescription className="dark:text-gray-400">{formatAddress(userAddress)}</CardDescription>
// //                 )}
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {useCustomAddress ? (
// //                   // نموذج العنوان المخصص
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         المحافظة *
// //                       </label>
// //                       <select
// //                         value={customAddress.governorate}
// //                         onChange={(e) => handleCustomAddressChange("governorate", e.target.value)}
// //                         className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-right bg-white dark:bg-gray-800 dark:text-white"
// //                       >
// //                         <option value="">اختر المحافظة</option>
// //                         {governorates.map((gov) => (
// //                           <option key={gov} value={gov}>
// //                             {gov}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         المنطقة او القضاء *
// //                       </label>
// //                       <Input
// //                         type="text"
// //                         value={customAddress.district}
// //                         onChange={(e) => handleCustomAddressChange("district", e.target.value)}
// //                         placeholder="اسم القضاء أو المنطقة"
// //                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         اسم الشارع او الحي *
// //                       </label>
// //                       <Input
// //                         type="text"
// //                         value={customAddress.area}
// //                         onChange={(e) => handleCustomAddressChange("area", e.target.value)}
// //                         placeholder="اسم الحي أو الشارع"
// //                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         أقرب نقطة دالة
// //                       </label>
// //                       <Input
// //                         type="text"
// //                         value={customAddress.landmark}
// //                         onChange={(e) => handleCustomAddressChange("landmark", e.target.value)}
// //                         placeholder="مقابل، بجانب..."
// //                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       />
// //                     </div>
// //                   </div>
// //                 ) : isEditingAddress ? (
// //                   // نموذج تعديل العنوان الأساسي
// //                   <div className="space-y-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         المحافظة *
// //                       </label>
// //                       <select
// //                         value={userAddress.governorate}
// //                         onChange={(e) => handleUserAddressChange("governorate", e.target.value)}
// //                         className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-right bg-white dark:bg-gray-800 dark:text-white"
// //                       >
// //                         <option value="">اختر المحافظة</option>
// //                         {governorates.map((gov) => (
// //                           <option key={gov} value={gov}>
// //                             {gov}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         المنطقة او القضاء *
// //                       </label>
// //                       <Input
// //                         type="text"
// //                         value={userAddress.district}
// //                         onChange={(e) => handleUserAddressChange("district", e.target.value)}
// //                         placeholder="اسم القضاء أو المنطقة"
// //                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         اسم الشارع او الحي *
// //                       </label>
// //                       <Input
// //                         type="text"
// //                         value={userAddress.area}
// //                         onChange={(e) => handleUserAddressChange("area", e.target.value)}
// //                         placeholder="اسم الحي أو الشارع"
// //                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       />
// //                     </div>

// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                         أقرب نقطة دالة
// //                       </label>
// //                       <Input
// //                         type="text"
// //                         value={userAddress.landmark}
// //                         onChange={(e) => handleUserAddressChange("landmark", e.target.value)}
// //                         placeholder="مقابل، بجانب..."
// //                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                       />
// //                     </div>

// //                     <div className="flex gap-2">
// //                       <Button
// //                         onClick={saveUserAddress}
// //                         className="flex-1 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
// //                       >
// //                         <Check className="w-4 h-4 ml-1" />
// //                         حفظ العنوان
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         onClick={cancelEditAddress}
// //                         className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 bg-transparent"
// //                       >
// //                         <X className="w-4 h-4 ml-1" />
// //                         إلغاء
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ) : userAddress.area ? (
// //                   // عرض العنوان الحالي
// //                   <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
// //                     <div className="flex items-start gap-3">
// //                       <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
// //                       <div className="flex-1">
// //                         <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">عنوان التوصيل الحالي</h4>
// //                         <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
// //                           {formatAddress(userAddress)}
// //                           {userAddress.landmark && (
// //                             <>
// //                               <br />
// //                               <span className="text-green-600 dark:text-green-500">قرب: {userAddress.landmark}</span>
// //                             </>
// //                           )}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   // لا يوجد عنوان
// //                   <div className="text-center py-8">
// //                     <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
// //                     <p className="text-gray-500 dark:text-gray-400 mb-4">لا يوجد عنوان مسجل في ملفك الشخصي</p>
// //                     <Button
// //                       onClick={() => setIsEditingAddress(true)}
// //                       className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
// //                     >
// //                       <Edit className="w-4 h-4 ml-1" />
// //                       إضافة عنوان
// //                     </Button>
// //                   </div>
// //                 )}

// //                 {/* ملاحظات إضافية */}
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
// //                     ملاحظات إضافية (اختيارية)
// //                   </label>
// //                   <Textarea
// //                     name="notes"
// //                     value={formData.notes}
// //                     onChange={handleInputChange}
// //                     placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
// //                     rows={2}
// //                     className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
// //                   />
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* طريقة الدفع */}
// //             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 dark:text-white">
// //                   <CreditCard className="w-5 h-5" />
// //                   طريقة الدفع
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-3">
// //                 <div
// //                   onClick={() => setFormData({ ...formData, paymentMethod: "cash" })}
// //                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
// //                     formData.paymentMethod === "cash"
// //                       ? "border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30"
// //                       : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
// //                   }`}
// //                 >
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                       <div
// //                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
// //                           formData.paymentMethod === "cash"
// //                             ? "border-amber-600 dark:border-amber-500"
// //                             : "border-gray-300 dark:border-gray-600"
// //                         }`}
// //                       >
// //                         {formData.paymentMethod === "cash" && (
// //                           <div className="w-3 h-3 rounded-full bg-amber-600 dark:bg-amber-500" />
// //                         )}
// //                       </div>
// //                       <div>
// //                         <p className="font-medium dark:text-white">الدفع عند الاستلام</p>
// //                         <p className="text-sm text-gray-600 dark:text-gray-400">ادفع نقداً عند استلام الطلب</p>
// //                       </div>
// //                     </div>
// //                     <Truck className="w-6 h-6 text-gray-400 dark:text-gray-500" />
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* ملخص الطلب */}
// //           <div className="space-y-6">
// //             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2 dark:text-white">
// //                   <ShoppingBag className="w-5 h-5" />
// //                   ملخص الطلب
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 {items.map((item) => (
// //                   <div key={item.product.id} className="flex justify-between items-center">
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
// //                         {item.product.image ? (
// //                           <img
// //                             src={item.product.image || "/placeholder.svg"}
// //                             alt={item.product.name}
// //                             className="w-10 h-10 object-cover rounded"
// //                           />
// //                         ) : (
// //                           <ShoppingBag className="w-6 h-6 text-gray-400" />
// //                         )}
// //                       </div>
// //                       <div>
// //                         <p className="font-medium text-sm dark:text-white">{item.product.name}</p>
// //                         <p className="text-gray-600 dark:text-gray-400 text-sm">الكمية: {item.quantity}</p>
// //                       </div>
// //                     </div>
// //                     <p className="font-medium dark:text-white">
// //                       {(item.product.price * item.quantity).toLocaleString()} دينار
// //                     </p>
// //                   </div>
// //                 ))}

// //                 <Separator className="dark:bg-gray-800" />

// //                 <div className="space-y-2">
// //                   <div className="flex justify-between dark:text-gray-300">
// //                     <span>المجموع الفرعي</span>
// //                     <span>{getTotalPrice().toLocaleString()} دينار</span>
// //                   </div>
// //                   <div className="flex justify-between dark:text-gray-300">
// //                     <span>تكلفة التوصيل</span>
// //                     <span>{shippingCost === 0 ? "مجاني" : `${shippingCost.toLocaleString()} دينار`}</span>
// //                   </div>
// //                   <Separator className="dark:bg-gray-800" />
// //                   <div className="flex justify-between font-bold text-lg dark:text-white">
// //                     <span>الإجمالي</span>
// //                     <span>{totalWithShipping.toLocaleString()} دينار</span>
// //                   </div>
// //                 </div>

// //                 <Button
// //                   onClick={handleSubmitOrder}
// //                   disabled={loading || !deliveryAddress.area}
// //                   className="w-full mt-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
// //                   size="lg"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <Loader2 className="w-4 h-4 ml-2 animate-spin" />
// //                       جاري إرسال الطلب...
// //                     </>
// //                   ) : (
// //                     "تأكيد الطلب"
// //                   )}
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Checkout




// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Navigate, useNavigate } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"
// import { useCart } from "../hooks/useCart"
// import { useOrders } from "../hooks/useOrders"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Textarea } from "../components/ui/textarea"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
// import { Separator } from "../components/ui/separator"
// import { ShoppingBag, MapPin, Phone, User, CreditCard, Truck, Loader2, Edit, Check, X } from "lucide-react"
// import { toast } from "sonner"

// interface AddressForm {
//   governorate: string
//   district: string
//   area: string
//   landmark: string
// }

// const Checkout: React.FC = () => {
//   const { isAuthenticated, user } = useAuth()
//   const { items, getTotalPrice, clearCart } = useCart()
//   const { createOrder } = useOrders()
//   const navigate = useNavigate()

//   const [loading, setLoading] = useState(false)
//   const [isEditingAddress, setIsEditingAddress] = useState(false)
//   const [useCustomAddress, setUseCustomAddress] = useState(false)

//   // حالة العنوان الافتراضي من بيانات المستخدم
//   const [userAddress, setUserAddress] = useState<AddressForm>({
//     governorate: user?.address?.city || "",
//     district: user?.address?.district || "",
//     area: user?.address?.postalCode || "",
//     landmark: user?.address?.street || "",
//   })

//   // حالة العنوان المخصص للتوصيل
//   const [customAddress, setCustomAddress] = useState<AddressForm>({
//     governorate: "",
//     district: "",
//     area: "",
//     landmark: "",
//   })

//   const [formData, setFormData] = useState({
//     delivery_phone: user?.phone || "",
//     delivery_name: user?.name || "",
//     notes: "",
//     paymentMethod: "cash",
//   })

//   // تحديث عنوان المستخدم عندما تتغير بيانات المستخدم
//   useEffect(() => {
//     if (user?.address) {
//       setUserAddress({
//         governorate: user.address.city || "",
//         district: user.address.district || "",
//         area: user.address.postalCode || "",
//         landmark: user.address.street || "",
//       })
//     }
//   }, [user])

//   // قائمة المحافظات المطلوبة (4 محافظات)
//   const governorates = ["بغداد", "البصرة", "نينوى", "أربيل"]

//   // إعادة التوجيه إذا كانت السلة فارغة
//   if (items.length === 0) {
//     return <Navigate to="/cart" />
//   }

//   // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: "/checkout" }} />
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleUserAddressChange = (field: keyof AddressForm, value: string) => {
//     setUserAddress((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleCustomAddressChange = (field: keyof AddressForm, value: string) => {
//     setCustomAddress((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const saveUserAddress = async () => {
//     try {
//       setIsEditingAddress(false)
//       toast.success("تم حفظ العنوان بنجاح")
//     } catch (error) {
//       toast.error("حدث خطأ في حفظ العنوان")
//     }
//   }

//   const cancelEditAddress = () => {
//     // إعادة تعيين العنوان إلى القيم الأصلية
//     setUserAddress({
//       governorate: user?.address?.city || "",
//       district: user?.address?.district || "",
//       area: user?.address?.postalCode || "",
//       landmark: user?.address?.street || "",
//     })
//     setIsEditingAddress(false)
//   }

//   const getDeliveryAddress = () => {
//     if (useCustomAddress) {
//       return customAddress
//     }
//     return userAddress
//   }

//   const formatAddress = (address: AddressForm) => {
//     const parts = [address.area, address.district, address.governorate].filter(Boolean)

//     return parts.join("، ")
//   }

//   const validateAddress = (address: AddressForm) => {
//     if (!address.governorate || !address.district || !address.area) {
//       return "الرجاء إدخال العنوان الكامل (المحافظة، القضاء/المنطقة، والحي)"
//     }
//     return null
//   }

//   const handleSubmitOrder = async () => {
//     if (!formData.delivery_phone.trim()) {
//       toast.error("الرجاء إدخال رقم الهاتف")
//       return
//     }

//     if (!formData.delivery_name.trim()) {
//       toast.error("الرجاء إدخال اسم المستلم")
//       return
//     }

//     const deliveryAddress = getDeliveryAddress()
//     const addressError = validateAddress(deliveryAddress)
//     if (addressError) {
//       toast.error(addressError)
//       return
//     }

//     setLoading(true)

//     try {
//       const orderData = {
//         delivery_address: formatAddress(deliveryAddress),
//         delivery_phone: formData.delivery_phone,
//         delivery_name: formData.delivery_name,
//         notes: formData.notes,
//         street: deliveryAddress.landmark, // اقرب نقطة دالة
//         city: deliveryAddress.governorate, // المحافظة (بغداد)
//         district: deliveryAddress.district, // المنطقة او القضاء
//         postalCode: deliveryAddress.area, // الحي
//         payment_method: formData.paymentMethod,
//         items: items.map((item) => ({
//           product_id: item.product.id,
//           quantity: item.quantity,
//           price: item.product.price,
//         })),
//         total_amount: getTotalPrice() + shippingCost,
//         shipping_cost: shippingCost,
//       }

//       console.log("[v0] Submitting order with data:", orderData)

//       const result = await createOrder(orderData)

//       console.log("[v0] Order creation result:", result)

//       // Backend returns: { message, order: { id, ... }, pointsEarned }
//       let orderId = null

//       if (result) {
//         // Check if order data is nested in result.order
//         if (result.order && (result.order.id || result.order.order_number)) {
//           orderId = result.order.id || result.order.order_number
//         }
//         // Fallback: check if id is directly on result
//         else if (result.id || result.order_number) {
//           orderId = result.id || result.order_number
//         }
//       }

//       if (orderId) {
//         await clearCart()

//         // Show points earned if available
//         const pointsMessage = result.pointsEarned
//           ? `لقد ربحت ${result.pointsEarned} نقطة!`
//           : "سيتم التواصل معك قريباً لتأكيد الطلب"

//         toast.success("تم إرسال طلبك بنجاح!", {
//           description: pointsMessage,
//         })

//         navigate(`/order-success/${orderId}`)
//       } else {
//         console.error("[v0] Order ID not found in response:", result)
//         toast.error("تم إنشاء الطلب ولكن حدث خطأ في الحصول على رقم الطلب")
//       }
//     } catch (error: any) {
//       console.error("[v0] Order submission error:", error)

//       const errorMessage =
//         error.message || error.response?.data?.message || error.response?.data?.error || "حدث خطأ في إرسال الطلب"

//       toast.error(errorMessage, {
//         description: "الرجاء التحقق من البيانات والمحاولة مرة أخرى",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000
//   const totalWithShipping = getTotalPrice() + shippingCost

//   const deliveryAddress = getDeliveryAddress()

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black py-8 mb-15 transition-colors duration-300" dir="rtl">
//       <div className="container mx-auto px-4">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">إتمام الطلب</h1>
//           <p className="text-gray-600 dark:text-gray-400">أكمل بياناتك لإتمام عملية الشراء</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-15">
//           {/* نموذج بيانات التوصيل */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* معلومات المستلم */}
//             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 dark:text-white">
//                   <User className="w-5 h-5" />
//                   معلومات المستلم
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     اسم المستلم *
//                   </label>
//                   <Input
//                     type="text"
//                     name="delivery_name"
//                     value={formData.delivery_name}
//                     onChange={handleInputChange}
//                     placeholder="اسم الشخص الذي سيتسلم الطلب"
//                     className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
//                       className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       dir="ltr"
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* عنوان التوصيل */}
//             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="flex items-center gap-2 dark:text-white">
//                     <MapPin className="w-5 h-5" />
//                     عنوان التوصيل
//                   </CardTitle>
//                   <div className="flex gap-2">
//                     {!useCustomAddress && (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setIsEditingAddress(!isEditingAddress)}
//                         className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
//                       >
//                         {isEditingAddress ? <X className="w-4 h-4 ml-1" /> : <Edit className="w-4 h-4 ml-1" />}
//                         {isEditingAddress ? "إلغاء" : "تعديل"}
//                       </Button>
//                     )}
//                     <Button
//                       variant={useCustomAddress ? "default" : "outline"}
//                       size="sm"
//                       onClick={() => setUseCustomAddress(!useCustomAddress)}
//                       className={
//                         useCustomAddress
//                           ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
//                           : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
//                       }
//                     >
//                       {useCustomAddress ? "استخدام عنواني" : "عنوان مختلف"}
//                     </Button>
//                   </div>
//                 </div>
//                 {!useCustomAddress && !isEditingAddress && userAddress.area && (
//                   <CardDescription className="dark:text-gray-400">{formatAddress(userAddress)}</CardDescription>
//                 )}
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {useCustomAddress ? (
//                   // نموذج العنوان المخصص
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         المحافظة *
//                       </label>
//                       <select
//                         value={customAddress.governorate}
//                         onChange={(e) => handleCustomAddressChange("governorate", e.target.value)}
//                         className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-right bg-white dark:bg-gray-800 dark:text-white"
//                       >
//                         <option value="">اختر المحافظة</option>
//                         {governorates.map((gov) => (
//                           <option key={gov} value={gov}>
//                             {gov}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         المنطقة او القضاء *
//                       </label>
//                       <Input
//                         type="text"
//                         value={customAddress.district}
//                         onChange={(e) => handleCustomAddressChange("district", e.target.value)}
//                         placeholder="اسم القضاء أو المنطقة"
//                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         اسم الشارع او الحي *
//                       </label>
//                       <Input
//                         type="text"
//                         value={customAddress.area}
//                         onChange={(e) => handleCustomAddressChange("area", e.target.value)}
//                         placeholder="اسم الحي أو الشارع"
//                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         أقرب نقطة دالة
//                       </label>
//                       <Input
//                         type="text"
//                         value={customAddress.landmark}
//                         onChange={(e) => handleCustomAddressChange("landmark", e.target.value)}
//                         placeholder="مقابل، بجانب..."
//                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       />
//                     </div>
//                   </div>
//                 ) : isEditingAddress ? (
//                   // نموذج تعديل العنوان الأساسي
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         المحافظة *
//                       </label>
//                       <select
//                         value={userAddress.governorate}
//                         onChange={(e) => handleUserAddressChange("governorate", e.target.value)}
//                         className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-right bg-white dark:bg-gray-800 dark:text-white"
//                       >
//                         <option value="">اختر المحافظة</option>
//                         {governorates.map((gov) => (
//                           <option key={gov} value={gov}>
//                             {gov}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         المنطقة او القضاء *
//                       </label>
//                       <Input
//                         type="text"
//                         value={userAddress.district}
//                         onChange={(e) => handleUserAddressChange("district", e.target.value)}
//                         placeholder="اسم القضاء أو المنطقة"
//                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         اسم الشارع او الحي *
//                       </label>
//                       <Input
//                         type="text"
//                         value={userAddress.area}
//                         onChange={(e) => handleUserAddressChange("area", e.target.value)}
//                         placeholder="اسم الحي أو الشارع"
//                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                         أقرب نقطة دالة
//                       </label>
//                       <Input
//                         type="text"
//                         value={userAddress.landmark}
//                         onChange={(e) => handleUserAddressChange("landmark", e.target.value)}
//                         placeholder="مقابل، بجانب..."
//                         className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <div className="flex gap-2">
//                       <Button
//                         onClick={saveUserAddress}
//                         className="flex-1 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
//                       >
//                         <Check className="w-4 h-4 ml-1" />
//                         حفظ العنوان
//                       </Button>
//                       <Button
//                         variant="outline"
//                         onClick={cancelEditAddress}
//                         className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 bg-transparent"
//                       >
//                         <X className="w-4 h-4 ml-1" />
//                         إلغاء
//                       </Button>
//                     </div>
//                   </div>
//                 ) : userAddress.area ? (
//                   // عرض العنوان الحالي
//                   <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
//                     <div className="flex items-start gap-3">
//                       <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
//                       <div className="flex-1">
//                         <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">عنوان التوصيل الحالي</h4>
//                         <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
//                           {formatAddress(userAddress)}
//                           {userAddress.landmark && (
//                             <>
//                               <br />
//                               <span className="text-green-600 dark:text-green-500">قرب: {userAddress.landmark}</span>
//                             </>
//                           )}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   // لا يوجد عنوان
//                   <div className="text-center py-8">
//                     <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
//                     <p className="text-gray-500 dark:text-gray-400 mb-4">لا يوجد عنوان مسجل في ملفك الشخصي</p>
//                     <Button
//                       onClick={() => setIsEditingAddress(true)}
//                       className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
//                     >
//                       <Edit className="w-4 h-4 ml-1" />
//                       إضافة عنوان
//                     </Button>
//                   </div>
//                 )}

//                 {/* ملاحظات إضافية */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     ملاحظات إضافية (اختيارية)
//                   </label>
//                   <Textarea
//                     name="notes"
//                     value={formData.notes}
//                     onChange={handleInputChange}
//                     placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
//                     rows={2}
//                     className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             {/* طريقة الدفع */}
//             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 dark:text-white">
//                   <CreditCard className="w-5 h-5" />
//                   طريقة الدفع
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div
//                   onClick={() => setFormData({ ...formData, paymentMethod: "cash" })}
//                   className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                     formData.paymentMethod === "cash"
//                       ? "border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30"
//                       : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
//                   }`}
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                           formData.paymentMethod === "cash"
//                             ? "border-amber-600 dark:border-amber-500"
//                             : "border-gray-300 dark:border-gray-600"
//                         }`}
//                       >
//                         {formData.paymentMethod === "cash" && (
//                           <div className="w-3 h-3 rounded-full bg-amber-600 dark:bg-amber-500" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium dark:text-white">الدفع عند الاستلام</p>
//                         <p className="text-sm text-gray-600 dark:text-gray-400">ادفع نقداً عند استلام الطلب</p>
//                       </div>
//                     </div>
//                     <Truck className="w-6 h-6 text-gray-400 dark:text-gray-500" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* ملخص الطلب */}
//           <div className="space-y-6">
//             <Card className="dark:bg-gray-900/90 dark:border-gray-800">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 dark:text-white">
//                   <ShoppingBag className="w-5 h-5" />
//                   ملخص الطلب
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {items.map((item) => (
//                   <div key={item.product.id} className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
//                         {item.product.image ? (
//                           <img
//                             src={item.product.image || "/placeholder.svg"}
//                             alt={item.product.name}
//                             className="w-10 h-10 object-cover rounded"
//                           />
//                         ) : (
//                           <ShoppingBag className="w-6 h-6 text-gray-400" />
//                         )}
//                       </div>
//                       <div>
//                         <p className="font-medium text-sm dark:text-white">{item.product.name}</p>
//                         <p className="text-gray-600 dark:text-gray-400 text-sm">الكمية: {item.quantity}</p>
//                       </div>
//                     </div>
//                     <p className="font-medium dark:text-white">
//                       {(item.product.price * item.quantity).toLocaleString()} دينار
//                     </p>
//                   </div>
//                 ))}

//                 <Separator className="dark:bg-gray-800" />

//                 <div className="space-y-2">
//                   <div className="flex justify-between dark:text-gray-300">
//                     <span>المجموع الفرعي</span>
//                     <span>{getTotalPrice().toLocaleString()} دينار</span>
//                   </div>
//                   <div className="flex justify-between dark:text-gray-300">
//                     <span>تكلفة التوصيل</span>
//                     <span>{shippingCost === 0 ? "مجاني" : `${shippingCost.toLocaleString()} دينار`}</span>
//                   </div>
//                   <Separator className="dark:bg-gray-800" />
//                   <div className="flex justify-between font-bold text-lg dark:text-white">
//                     <span>الإجمالي</span>
//                     <span>{totalWithShipping.toLocaleString()} دينار</span>
//                   </div>
//                 </div>

//                 <Button
//                   onClick={handleSubmitOrder}
//                   disabled={loading || !deliveryAddress.area}
//                   className="w-full mt-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 ml-2 animate-spin" />
//                       جاري إرسال الطلب...
//                     </>
//                   ) : (
//                     "تأكيد الطلب"
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Checkout






"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useCart } from "../hooks/useCart"
import { useOrders } from "../hooks/useOrders"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import { ShoppingBag, MapPin, Phone, User, CreditCard, Truck, Loader2, Edit, Check, X } from "lucide-react"
import { toast } from "sonner"

interface AddressForm {
  governorate: string
  district: string
  area: string
  landmark: string
}

const Checkout: React.FC = () => {
  const { isAuthenticated, user } = useAuth()
  const { items, getTotalPrice, clearCart } = useCart()
  const { createOrder } = useOrders()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [useCustomAddress, setUseCustomAddress] = useState(false)

  // حالة العنوان الافتراضي من بيانات المستخدم
  const [userAddress, setUserAddress] = useState<AddressForm>({
    governorate: user?.address?.city || "",
    district: user?.address?.district || "",
    area: user?.address?.postalCode || "",
    landmark: user?.address?.street || "",
  })

  // حالة العنوان المخصص للتوصيل
  const [customAddress, setCustomAddress] = useState<AddressForm>({
    governorate: "",
    district: "",
    area: "",
    landmark: "",
  })

  const [formData, setFormData] = useState({
    delivery_phone: user?.phone || "",
    delivery_name: user?.name || "",
    notes: "",
    paymentMethod: "cash",
  })

  // تحديث عنوان المستخدم عندما تتغير بيانات المستخدم
  useEffect(() => {
    if (user?.address) {
      setUserAddress({
        governorate: user.address.city || "",
        district: user.address.district || "",
        area: user.address.postalCode || "",
        landmark: user.address.street || "",
      })
    }
  }, [user])

  // قائمة المحافظات المطلوبة (4 محافظات)
  const governorates = ["بغداد", "البصرة", "نينوى", "أربيل"]

  // إعادة التوجيه إذا كانت السلة فارغة
  if (items.length === 0) {
    return <Navigate to="/cart" />
  }

  // إعادة التوجيه إلى تسجيل الدخول إذا لم يكن مسجل
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: "/checkout" }} />
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUserAddressChange = (field: keyof AddressForm, value: string) => {
    setUserAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCustomAddressChange = (field: keyof AddressForm, value: string) => {
    setCustomAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const saveUserAddress = async () => {
    try {
      setIsEditingAddress(false)
      toast.success("تم حفظ العنوان بنجاح")
    } catch (error) {
      toast.error("حدث خطأ في حفظ العنوان")
    }
  }

  const cancelEditAddress = () => {
    // إعادة تعيين العنوان إلى القيم الأصلية
    setUserAddress({
      governorate: user?.address?.city || "",
      district: user?.address?.district || "",
      area: user?.address?.postalCode || "",
      landmark: user?.address?.street || "",
    })
    setIsEditingAddress(false)
  }

  const getDeliveryAddress = () => {
    if (useCustomAddress) {
      return customAddress
    }
    return userAddress
  }

  const formatAddress = (address: AddressForm) => {
    const parts = [address.area, address.district, address.governorate].filter(Boolean)

    return parts.join("، ")
  }

  const validateAddress = (address: AddressForm) => {
    if (!address.governorate || !address.district || !address.area) {
      return "الرجاء إدخال العنوان الكامل (المحافظة، القضاء/المنطقة، والحي)"
    }
    return null
  }

  const handleSubmitOrder = async () => {
    if (!formData.delivery_phone.trim()) {
      toast.error("الرجاء إدخال رقم الهاتف")
      return
    }

    if (!formData.delivery_name.trim()) {
      toast.error("الرجاء إدخال اسم المستلم")
      return
    }

    const deliveryAddress = getDeliveryAddress()
    const addressError = validateAddress(deliveryAddress)
    if (addressError) {
      toast.error(addressError)
      return
    }

    setLoading(true)

    try {
      const orderData = {
        delivery_address: formatAddress(deliveryAddress),
        delivery_phone: formData.delivery_phone,
        delivery_name: formData.delivery_name,
        notes: formData.notes,
        street: deliveryAddress.landmark, // اقرب نقطة دالة
        city: deliveryAddress.governorate, // المحافظة (بغداد)
        district: deliveryAddress.district, // المنطقة او القضاء
        postalCode: deliveryAddress.area, // الحي
        payment_method: formData.paymentMethod,
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total_amount: getTotalPrice() + shippingCost,
        shipping_cost: shippingCost,
      }

      console.log("[v0] Submitting order with data:", orderData)

      const result = await createOrder(orderData)

      console.log("[v0] Order creation result:", result)

      // Backend returns: { message, order: { id, ... }, pointsEarned }
      let orderId = null

      if (result) {
        // Check if order data is nested in result.order
        if (result.order && (result.order.id || result.order.order_number)) {
          orderId = result.order.id || result.order.order_number
        }
        // Fallback: check if id is directly on result
        else if (result.id || result.order_number) {
          orderId = result.id || result.order_number
        }
      }

      if (orderId) {
        await clearCart()

        // Show points earned if available
        const pointsMessage = result.pointsEarned
          ? `لقد ربحت ${result.pointsEarned} نقطة!`
          : "سيتم التواصل معك قريباً لتأكيد الطلب"

        toast.success("تم إرسال طلبك بنجاح!", {
          description: pointsMessage,
        })

        navigate(`/order-success/${orderId}`)
      } else {
        console.error("[v0] Order ID not found in response:", result)
        toast.error("تم إنشاء الطلب ولكن حدث خطأ في الحصول على رقم الطلب")
      }
    } catch (error: any) {
      console.error("[v0] Order submission error:", error)

      const errorMessage =
        error.message || error.response?.data?.message || error.response?.data?.error || "حدث خطأ في إرسال الطلب"

      toast.error(errorMessage, {
        description: "الرجاء التحقق من البيانات والمحاولة مرة أخرى",
      })
    } finally {
      setLoading(false)
    }
  }

  const shippingCost = getTotalPrice() >= 50000 ? 0 : 5000
  const totalWithShipping = getTotalPrice() + shippingCost

  const deliveryAddress = getDeliveryAddress()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8 mb-15 transition-colors duration-300" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">إتمام الطلب</h1>
          <p className="text-gray-600 dark:text-gray-400">أكمل بياناتك لإتمام عملية الشراء</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-15">
          {/* نموذج بيانات التوصيل */}
          <div className="lg:col-span-2 space-y-6">
            {/* معلومات المستلم */}
            <Card className="dark:bg-gray-900/90 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <User className="w-5 h-5" />
                  معلومات المستلم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    اسم المستلم *
                  </label>
                  <Input
                    type="text"
                    name="delivery_name"
                    value={formData.delivery_name}
                    onChange={handleInputChange}
                    placeholder="اسم الشخص الذي سيتسلم الطلب"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                      className="pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      dir="ltr"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* عنوان التوصيل */}
            <Card className="dark:bg-gray-900/90 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <MapPin className="w-5 h-5" />
                    عنوان التوصيل
                  </CardTitle>
                  <div className="flex gap-2">
                    {!useCustomAddress && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                      >
                        {isEditingAddress ? <X className="w-4 h-4 ml-1" /> : <Edit className="w-4 h-4 ml-1" />}
                        {isEditingAddress ? "إلغاء" : "��عديل"}
                      </Button>
                    )}
                    <Button
                      variant={useCustomAddress ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUseCustomAddress(!useCustomAddress)}
                      className={
                        useCustomAddress
                          ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                          : "dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                      }
                    >
                      {useCustomAddress ? "استخدام عنواني" : "عنوان مختلف"}
                    </Button>
                  </div>
                </div>
                {!useCustomAddress && !isEditingAddress && userAddress.area && (
                  <CardDescription className="dark:text-gray-400">{formatAddress(userAddress)}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {useCustomAddress ? (
                  // نموذج العنوان المخصص
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        المحافظة *
                      </label>
                      <select
                        value={customAddress.governorate}
                        onChange={(e) => handleCustomAddressChange("governorate", e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-right bg-white dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">اختر المحافظة</option>
                        {governorates.map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        المنطقة او القضاء *
                      </label>
                      <Input
                        type="text"
                        value={customAddress.district}
                        onChange={(e) => handleCustomAddressChange("district", e.target.value)}
                        placeholder="اسم القضاء أو المنطقة"
                        className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        اسم الشارع او الحي *
                      </label>
                      <Input
                        type="text"
                        value={customAddress.area}
                        onChange={(e) => handleCustomAddressChange("area", e.target.value)}
                        placeholder="اسم الحي أو الشارع"
                        className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        أقرب نقطة دالة
                      </label>
                      <Input
                        type="text"
                        value={customAddress.landmark}
                        onChange={(e) => handleCustomAddressChange("landmark", e.target.value)}
                        placeholder="مقابل، بجانب..."
                        className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                ) : isEditingAddress ? (
                  // نموذج تعديل العنوان الأساسي
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        المحافظة *
                      </label>
                      <select
                        value={userAddress.governorate}
                        onChange={(e) => handleUserAddressChange("governorate", e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-right bg-white dark:bg-gray-800 dark:text-white"
                      >
                        <option value="">اختر المحافظة</option>
                        {governorates.map((gov) => (
                          <option key={gov} value={gov}>
                            {gov}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        المنطقة او القضاء *
                      </label>
                      <Input
                        type="text"
                        value={userAddress.district}
                        onChange={(e) => handleUserAddressChange("district", e.target.value)}
                        placeholder="اسم القضاء أو المنطقة"
                        className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        اسم الشارع او الحي *
                      </label>
                      <Input
                        type="text"
                        value={userAddress.area}
                        onChange={(e) => handleUserAddressChange("area", e.target.value)}
                        placeholder="اسم الحي أو الشارع"
                        className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        أقرب نقطة دالة
                      </label>
                      <Input
                        type="text"
                        value={userAddress.landmark}
                        onChange={(e) => handleUserAddressChange("landmark", e.target.value)}
                        placeholder="مقابل، بجانب..."
                        className="text-right dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={saveUserAddress}
                        className="flex-1 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                      >
                        <Check className="w-4 h-4 ml-1" />
                        حفظ العنوان
                      </Button>
                      <Button
                        variant="outline"
                        onClick={cancelEditAddress}
                        className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 bg-transparent"
                      >
                        <X className="w-4 h-4 ml-1" />
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : userAddress.area ? (
                  // عرض العنوان الحالي
                  <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">عنوان التوصيل الحالي</h4>
                        <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                          {formatAddress(userAddress)}
                          {userAddress.landmark && (
                            <>
                              <br />
                              <span className="text-green-600 dark:text-green-500">قرب: {userAddress.landmark}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // لا يوجد عنوان
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">لا يوجد عنوان مسجل في ملفك الشخصي</p>
                    <Button
                      onClick={() => setIsEditingAddress(true)}
                      className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                    >
                      <Edit className="w-4 h-4 ml-1" />
                      إضافة عنوان
                    </Button>
                  </div>
                )}

                {/* ملاحظات إضافية */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ملاحظات إضافية (اختيارية)
                  </label>
                  <Textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أي ملاحظات أو تعليمات خاصة للتوصيل..."
                    rows={2}
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* طريقة الدفع */}
            <Card className="dark:bg-gray-900/90 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <CreditCard className="w-5 h-5" />
                  طريقة الدفع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  onClick={() => setFormData({ ...formData, paymentMethod: "cash" })}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.paymentMethod === "cash"
                      ? "border-amber-600 dark:border-amber-500 bg-amber-50 dark:bg-amber-900/30"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === "cash"
                            ? "border-amber-600 dark:border-amber-500"
                            : "border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {formData.paymentMethod === "cash" && (
                          <div className="w-3 h-3 rounded-full bg-amber-600 dark:bg-amber-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">الدفع عند الاستلام</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ادفع نقداً عند استلام الطلب</p>
                      </div>
                    </div>
                    <Truck className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ملخص الطلب */}
          <div className="space-y-6">
            <Card className="dark:bg-gray-900/90 dark:border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <ShoppingBag className="w-5 h-5" />
                  ملخص الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
                        {item.product.image ? (
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <ShoppingBag className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm dark:text-white">{item.product.name}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">الكمية: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium dark:text-white">
                      {(item.product.price * item.quantity).toLocaleString()} دينار
                    </p>
                  </div>
                ))}

                <Separator className="dark:bg-gray-800" />

                <div className="space-y-2">
                  <div className="flex justify-between dark:text-gray-300">
                    <span>المجموع الفرعي</span>
                    <span>{getTotalPrice().toLocaleString()} دينار</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-300">
                    <span>تكلفة التوصيل</span>
                    <span>{shippingCost === 0 ? "مجاني" : `${shippingCost.toLocaleString()} دينار`}</span>
                  </div>
                  <Separator className="dark:bg-gray-800" />
                  <div className="flex justify-between font-bold text-lg dark:text-white">
                    <span>الإجمالي</span>
                    <span>{totalWithShipping.toLocaleString()} دينار</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={loading || !deliveryAddress.area}
                  className="w-full mt-4 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      جاري إرسال الطلب...
                    </>
                  ) : (
                    "تأكيد الطلب"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
