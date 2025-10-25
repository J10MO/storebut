// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"
// import { useCart } from "../hooks/useCart"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
// import { Loader2, Phone, Lock, ArrowRight, Home, User, MapPin, Navigation, Shield, Smartphone } from "lucide-react"

// interface LoginProps {
//   showCloseButton?: boolean
//   onClose?: () => void
// }

// interface AddressForm {
//   governorate: string
//   district: string
//   area: string
//   street: string
//   landmark: string
//   postalCode: string
// }

// interface SendOTPResponse {
//   success: boolean
//   exists?: boolean
//   message?: string
//   debugOtp?: string
//   data?: {
//     exists?: boolean
//     debugOtp?: string
//   }
// }

// const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
//   const { login, sendOTP } = useAuth()
//   const { transferGuestCartToUser } = useCart()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [phone, setPhone] = useState("")
//   const [code, setCode] = useState("")
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [step, setStep] = useState<"phone" | "verify">("phone")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [userExists, setUserExists] = useState<boolean>(false)
//   const [debugOtp, setDebugOtp] = useState<string>("")

//   // Address form for new users
//   const [address, setAddress] = useState<AddressForm>({
//     governorate: "",
//     district: "",
//     area: "",
//     street: "",
//     landmark: "",
//     postalCode: "",
//   })

//   const governorates = [
//     "بغداد",
//     "البصرة",
//     "نينوى",
//     "أربيل",
//     "الأنبار",
//     "كربلاء",
//     "بابل",
//     "صلاح الدين",
//     "ذي قار",
//     "واسط",
//     "ميسان",
//     "القادسية",
//     "المثنى",
//     "دهوك",
//     "السليمانية",
//   ]

//   const handleAddressChange = (field: keyof AddressForm, value: string) => {
//     setAddress((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleSendOTP = async () => {
//     if (!phone.trim()) {
//       setError("الرجاء إدخال رقم الهاتف")
//       return
//     }

//     const phoneRegex = /^07[0-9]{9}$/
//     const cleanPhone = phone.replace(/\s/g, "")

//     if (!phoneRegex.test(cleanPhone)) {
//       setError("رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 11 رقماً")
//       return
//     }

//     setLoading(true)
//     setError(null)
//     setDebugOtp("")
// console.log('cleanPhone', cleanPhone)
//     try {
//       console.log("إرسال رمز التحقق إلى:", cleanPhone)
//       const result = (await sendOTP(cleanPhone)) as SendOTPResponse
//       console.log("نتيجة إرسال الرمز:", result)

//       if (result.success) {
//         const exists = result.data?.exists ?? false

//         setStep("verify")
//         setUserExists(exists)

//         // حفظ رمز التحقق لعرضه على الشاشة
//         if (result.data?.debugOtp) {
//           setDebugOtp(result.data.debugOtp)
//           console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`)
//         }

//         console.log("userExists:", exists)
//         console.log("result.data.exists:", result.data?.exists)
//       } else {
//         setError(result.message || "فشل في إرسال رمز التحقق")
//       }
//     } catch (err: any) {
//       console.error("خطأ في إرسال الرمز:", err)
//       setError("حدث خطأ أثناء إرسال رمز التحقق")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleVerify = async () => {
//     if (!code.trim()) {
//       setError("الرجاء إدخال رمز التحقق")
//       return
//     }

//     // If the user is new, check additional data
//     if (!userExists) {
//       if (!name.trim()) {
//         setError("الرجاء إدخال اسمك")
//         return
//       }

//       if (!address.governorate || !address.district || !address.area || !address.street) {
//         setError("الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، الحي، والشارع)")
//         return
//       }
//     }

//     setLoading(true)
//     setError(null)

//     try {
//       const cleanPhone = phone.replace(/\s/g, "")
//       console.log("Verifying code:", {
//         phone: cleanPhone,
//         code,
//         userExists,
//         hasName: !!name.trim(),
//         hasAddress: !!address.street,
//       })

//       // Prepare user data - only if it's a new user
//       const userData = userExists
//         ? undefined
//         : {
//             name: name.trim(),
//             email: email.trim() || `${cleanPhone}@example.com`,
//             address: {
//               street: address.street,
//               city: address.governorate,
//               district: address.district,
//               area: address.area,
//               landmark: address.landmark,
//               postalCode: address.postalCode || "00000",
//             },
//           }

//       const result = await login(cleanPhone, code, userData)
//       console.log("Login result:", result)

//       if (result.success) {
//         // Transfer guest cart to user cart
//         await transferGuestCartToUser()

//         // Redirect to the previous page or home page
//         const from = (location.state as any)?.from?.pathname || "/"

//         if (onClose) {
//           onClose()
//         } else {
//           navigate(from, { replace: true })
//         }
//       } else {
//         setError(result.error || "Verification failed. Please check the entered code.")
//       }
//     } catch (err: any) {
//       console.error("Verification error:", err)
//       setError("An error occurred during verification.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleBackToHome = () => {
//     navigate("/")
//   }

//   const handleBack = () => {
//     setStep("phone")
//     setCode("")
//     setName("")
//     setEmail("")
//     setAddress({
//       governorate: "",
//       district: "",
//       area: "",
//       street: "",
//       landmark: "",
//       postalCode: "",
//     })
//     setUserExists(false)
//     setError(null)
//     setDebugOtp("")
//   }

//   const formatPhoneNumber = (value: string) => {
//     const numbers = value.replace(/\D/g, "")
//     let formatted = numbers
//     if (numbers.startsWith("07") && numbers.length > 2) {
//       formatted = `07${numbers.slice(2, 11)}`
//     }

//     // Format: 07X XXX XXXX
//     if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3")
//     } else if (formatted.length > 5) {
//       formatted = formatted.replace(/(\d{2})(\d{3})(\d{0,4})/, "$1 $2 $3")
//     } else if (formatted.length > 2) {
//       formatted = formatted.replace(/(\d{2})(\d{0,3})/, "$1 $2")
//     }

//     return formatted
//   }

//   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const formatted = formatPhoneNumber(e.target.value)
//     setPhone(formatted)
//   }

//   const isPhoneValid = phone.replace(/\s/g, "").length === 11

//   useEffect(() => {
//     if (step === "phone") {
//       setUserExists(false)
//       setDebugOtp("")
//     }
//   }, [step])

//   return (
//     <div
//       className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300"
//       dir="rtl"
//     >
//       <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
//         <CardHeader className="space-y-3 text-center pb-6">
//           {showCloseButton && (
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={handleBackToHome}
//               className="absolute left-6 top-6 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
//             >
//               <Home className="w-5 h-5" />
//             </Button>
//           )}

//           <div className="flex justify-center mb-2">
//             <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
//               <Shield className="w-10 h-10 text-white" />
//             </div>
//           </div>

//           <CardTitle className="text-3xl font-bold bg-gradient-to-l from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
//             {step === "phone" ? "مرحباً بك في Aura" : "التحقق من الهوية"}
//           </CardTitle>
//           <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
//             {step === "phone"
//               ? "أدخل رقم هاتفك للمتابعة"
//               : userExists
//                 ? "أدخل رمز التحقق المرسل إلى هاتفك"
//                 : "أكمل معلوماتك الشخصية"}
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="space-y-6">
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-right text-sm flex items-start gap-2 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300">
//               <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 dark:bg-red-800">
//                 <span className="text-red-600 text-xs dark:text-red-400">!</span>
//               </div>
//               <span>{error}</span>
//             </div>
//           )}

//           {step === "phone" ? (
//             <div className="space-y-6">
//               <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 dark:bg-gray-800 dark:border-gray-700">
//                 <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center gap-2 dark:text-gray-300">
//                   <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                   رقم الهاتف
//                 </label>
//                 <div className="relative">
//                   <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="tel"
//                     value={phone}
//                     onChange={handlePhoneChange}
//                     placeholder="07X XXX XXXX"
//                     className="pr-12 text-right text-lg h-14 border-2 border-gray-200 focus:border-amber-500 bg-white rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                     disabled={loading}
//                     dir="ltr"
//                     maxLength={14}
//                   />
//                 </div>
//                 <div className="flex justify-between items-center mt-3">
//                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                     {phone ? `${11 - phone.replace(/\s/g, "").length} أرقام متبقية` : "أدخل 11 رقماً"}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400">مثال: 0799 999 9999</p>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleSendOTP}
//                 disabled={loading || !isPhoneValid}
//                 className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-l from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-600 dark:hover:to-orange-700 shadow-lg shadow-amber-500/25 transition-all duration-200"
//                 size="lg"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                     جاري الإرسال...
//                   </>
//                 ) : (
//                   <>
//                     متابعة
//                     <ArrowRight className="ml-2 h-5 w-5" />
//                   </>
//                 )}
//               </Button>

//               <div className="text-center">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">سنرسل رمز تحقق إلى هاتفك</p>
//               </div>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {/* Test OTP display */}
//               {debugOtp && (
//                 <div className="bg-gradient-to-l from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 dark:bg-green-900/50 dark:border-green-800">
//                   <div className="flex items-center gap-3 mb-2">
//                     <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
//                     <h4 className="font-semibold text-green-800 text-sm dark:text-green-300">رمز التحقق للاختبار</h4>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-green-700 font-mono tracking-widest bg-green-100 py-3 rounded-lg dark:bg-green-800/50 dark:text-green-200">
//                       {debugOtp}
//                     </div>
//                     <p className="text-xs text-green-600 mt-2 dark:text-green-400">هذا الرمز معروض للاختبار فقط</p>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 dark:bg-gray-800 dark:border-gray-700">
//                 <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center gap-2 dark:text-gray-300">
//                   <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
//                   رمز التحقق *
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <Input
//                     type="text"
//                     value={code}
//                     onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
//                     placeholder="أدخل رمز التحقق المكون من 4 أرقام"
//                     className="pr-12 text-center tracking-widest text-xl font-mono h-14 border-2 border-gray-200 focus:border-amber-500 bg-white rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                     disabled={loading}
//                     maxLength={4}
//                     dir="ltr"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2 text-right dark:text-gray-400">
//                   أدخل الرمز المكون من 4 أرقام المرسل إلى {phone}
//                 </p>
//               </div>

//               {/* Personal Information and Address - for new users only */}
//               {!userExists && (
//                 <>
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900 text-right border-b pb-3 flex items-center gap-2 dark:text-gray-200 dark:border-gray-700">
//                       <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                       المعلومات الشخصية
//                     </h3>

//                     <div className="grid gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                           الاسم الكامل *
//                         </label>
//                         <div className="relative">
//                           <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                           <Input
//                             type="text"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             placeholder="أدخل اسمك الكامل"
//                             className="pr-10 text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                             disabled={loading}
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                           البريد الإلكتروني (اختياري)
//                         </label>
//                         <Input
//                           type="email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           placeholder="example@email.com"
//                           className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                           disabled={loading}
//                           dir="ltr"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Address */}
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-semibold text-gray-900 text-right border-b pb-3 flex items-center gap-2 dark:text-gray-200 dark:border-gray-700">
//                       <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                       العنوان
//                     </h3>

//                     <div className="grid gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                           المحافظة *
//                         </label>
//                         <select
//                           value={address.governorate}
//                           onChange={(e) => handleAddressChange("governorate", e.target.value)}
//                           className="w-full p-3 border-2 border-gray-200 rounded-xl text-right bg-white focus:border-amber-500 focus:ring-0 h-12 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                           disabled={loading}
//                         >
//                           <option value="">اختر المحافظة</option>
//                           {governorates.map((gov) => (
//                             <option key={gov} value={gov}>
//                               {gov}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                             المنطقة / القضاء *
//                           </label>
//                           <Input
//                             type="text"
//                             value={address.district}
//                             onChange={(e) => handleAddressChange("district", e.target.value)}
//                             placeholder="المنطقة"
//                             className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                             disabled={loading}
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                             الحي / المنطقة *
//                           </label>
//                           <Input
//                             type="text"
//                             value={address.area}
//                             onChange={(e) => handleAddressChange("area", e.target.value)}
//                             placeholder="الحي"
//                             className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                             disabled={loading}
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                           الشارع والتفاصيل *
//                         </label>
//                         <div className="relative">
//                           <Navigation className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
//                           <textarea
//                             value={address.street}
//                             onChange={(e) => handleAddressChange("street", e.target.value)}
//                             placeholder="اسم الشارع، رقم المنزل، التفاصيل..."
//                             className="w-full p-3 border-2 border-gray-200 rounded-xl text-right pr-10 min-h-[80px] resize-none focus:border-amber-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                             disabled={loading}
//                           />
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                             أقرب نقطة دالة
//                           </label>
//                           <Input
//                             type="text"
//                             value={address.landmark}
//                             onChange={(e) => handleAddressChange("landmark", e.target.value)}
//                             placeholder="مقابل، بجانب..."
//                             className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                             disabled={loading}
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
//                             الرمز البريدي
//                           </label>
//                           <Input
//                             type="text"
//                             value={address.postalCode}
//                             onChange={(e) => handleAddressChange("postalCode", e.target.value.replace(/\D/g, ""))}
//                             placeholder="الرمز البريدي"
//                             className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
//                             disabled={loading}
//                             dir="ltr"
//                             maxLength={5}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div className="flex gap-3 pt-2">
//                 <Button
//                   variant="outline"
//                   onClick={handleBack}
//                   disabled={loading}
//                   className="flex-1 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 dark:bg-gray-800 dark:text-white bg-transparent"
//                 >
//                   رجوع
//                 </Button>
//                 <Button
//                   onClick={handleVerify}
//                   disabled={
//                     loading ||
//                     !code.trim() ||
//                     code.length !== 4 ||
//                     (!userExists &&
//                       (!name.trim() || !address.governorate || !address.district || !address.area || !address.street))
//                   }
//                   className="flex-1 h-12 text-base font-semibold rounded-xl bg-gradient-to-l from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-600 dark:hover:to-orange-700 shadow-lg shadow-amber-500/25"
//                   size="lg"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="ml-2 h-5 w-5 animate-spin" />
//                       {userExists ? "جاري تسجيل الدخول..." : "جاري إنشاء الحساب..."}
//                     </>
//                   ) : userExists ? (
//                     "تسجيل الدخول"
//                   ) : (
//                     "إنشاء الحساب"
//                   )}
//                 </Button>
//               </div>

//               <div className="text-center">
//                 <button
//                   onClick={handleSendOTP}
//                   disabled={loading}
//                   className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 disabled:text-gray-400 font-medium transition-colors"
//                 >
//                   لم يصلك الرمز؟ إعادة إرسال
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
//             <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
//               بالمتابعة، أنت توافق على{" "}
//               <a href="/terms" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
//                 الشروط والأحكام
//               </a>{" "}
//               و{" "}
//               <a href="/privacy" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
//                 سياسة الخصوصية
//               </a>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default Login





"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useCart } from "../hooks/useCart"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Loader2, Phone, Lock, ArrowRight, Home, User, MapPin, Shield, Smartphone } from "lucide-react"

interface LoginProps {
  showCloseButton?: boolean
  onClose?: () => void
}

interface AddressForm {
  governorate: string
  district: string
  area: string
  landmark: string
}

interface SendOTPResponse {
  success: boolean
  exists?: boolean
  message?: string
  debugOtp?: string
  data?: {
    exists?: boolean
    debugOtp?: string
  }
}

const Login: React.FC<LoginProps> = ({ showCloseButton = true, onClose }) => {
  const { login, sendOTP } = useAuth()
  const { transferGuestCartToUser } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"phone" | "verify">("phone")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userExists, setUserExists] = useState<boolean>(false)
  const [debugOtp, setDebugOtp] = useState<string>("")

  // Address form for new users
  const [address, setAddress] = useState<AddressForm>({
    governorate: "",
    district: "",
    area: "",
    landmark: "",
  })

  const governorates = [
    "بغداد",
    "البصرة",
    "نينوى",
    "أربيل",
    "الأنبار",
    "كربلاء",
    "بابل",
    "صلاح الدين",
    "ذي قار",
    "واسط",
    "ميسان",
    "القادسية",
    "المثنى",
    "دهوك",
    "السليمانية",
  ]

  const handleAddressChange = (field: keyof AddressForm, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSendOTP = async () => {
    if (!phone.trim()) {
      setError("الرجاء إدخال رقم الهاتف")
      return
    }

    const phoneRegex = /^07[0-9]{9}$/
    const cleanPhone = phone.replace(/\s/g, "")

    if (!phoneRegex.test(cleanPhone)) {
      setError("رقم الهاتف يجب أن يبدأ بـ 07 ويحتوي على 11 رقماً")
      return
    }

    setLoading(true)
    setError(null)
    setDebugOtp("")

    try {
      console.log("إرسال رمز التحقق إلى:", cleanPhone)
      const result = (await sendOTP(cleanPhone)) as SendOTPResponse
      console.log("نتيجة إرسال الرمز:", result)

      if (result.success) {
        const exists = result.data?.exists ?? false

        setStep("verify")
        setUserExists(exists)

        // حفظ رمز التحقق لعرضه على الشاشة
        if (result.data?.debugOtp) {
          setDebugOtp(result.data.debugOtp)
          console.log(`رمز التحقق للاختبار: ${result.data.debugOtp}`)
        }

        console.log("userExists:", exists)
        console.log("result.data.exists:", result.data?.exists)
      } else {
        setError(result.message || "فشل في إرسال رمز التحقق")
      }
    } catch (err: any) {
      console.error("خطأ في إرسال الرمز:", err)
      setError("حدث خطأ أثناء إرسال رمز التحقق")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!code.trim()) {
      setError("الرجاء إدخال رمز التحقق")
      return
    }

    // If the user is new, check additional data
    if (!userExists) {
      if (!name.trim()) {
        setError("الرجاء إدخال اسمك")
        return
      }

      if (!address.governorate || !address.district || !address.area) {
        setError("الرجاء إدخال العنوان الكامل (المحافظة، المنطقة، والحي)")
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      const cleanPhone = phone.replace(/\s/g, "")
      console.log("Verifying code:", {
        phone: cleanPhone,
        code,
        userExists,
        hasName: !!name.trim(),
        hasAddress: !!address.area,
      })

      // Prepare user data - only if it's a new user
      const userData = userExists
        ? undefined
        : {
            name: name.trim(),
            email: email.trim() || `${cleanPhone}@example.com`,
            address: {
              city: address.governorate,
              district: address.district,
              area: address.area,
              landmark: address.landmark,
            },
          }

      const result = await login(cleanPhone, code, userData)
      console.log("Login result:", result)

      if (result.success) {
        // Transfer guest cart to user cart
        await transferGuestCartToUser()

        // Redirect to the previous page or home page
        const from = (location.state as any)?.from?.pathname || "/"

        if (onClose) {
          onClose()
        } else {
          navigate(from, { replace: true })
        }
      } else {
        setError(result.error || "Verification failed. Please check the entered code.")
      }
    } catch (err: any) {
      console.error("Verification error:", err)
      setError("An error occurred during verification.")
    } finally {
      setLoading(false)
    }
  }

  const handleBackToHome = () => {
    navigate("/")
  }

  const handleBack = () => {
    setStep("phone")
    setCode("")
    setName("")
    setEmail("")
    setAddress({
      governorate: "",
      district: "",
      area: "",
      landmark: "",
    })
    setUserExists(false)
    setError(null)
    setDebugOtp("")
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    let formatted = numbers
    if (numbers.startsWith("07") && numbers.length > 2) {
      formatted = `07${numbers.slice(2, 11)}`
    }

    // Format: 07X XXX XXXX
    if (formatted.length > 2) {
      formatted = formatted.replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3")
    } else if (formatted.length > 5) {
      formatted = formatted.replace(/(\d{2})(\d{3})(\d{0,4})/, "$1 $2 $3")
    } else if (formatted.length > 2) {
      formatted = formatted.replace(/(\d{2})(\d{0,3})/, "$1 $2")
    }

    return formatted
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhone(formatted)
  }

  const isPhoneValid = phone.replace(/\s/g, "").length === 11

  useEffect(() => {
    if (step === "phone") {
      setUserExists(false)
      setDebugOtp("")
    }
  }, [step])

  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4 transition-colors duration-300"
      dir="rtl"
    >
      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center pb-6">
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToHome}
              className="absolute left-6 top-6 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <Home className="w-5 h-5" />
            </Button>
          )}

          <div className="flex justify-center mb-2">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>

          <CardTitle className="text-3xl font-bold bg-gradient-to-l from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            {step === "phone" ? "مرحباً بك في Aura" : "التحقق من الهوية"}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
            {step === "phone"
              ? "أدخل رقم هاتفك للمتابعة"
              : userExists
                ? "أدخل رمز التحقق المرسل إلى هاتفك"
                : "أكمل معلوماتك الشخصية"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-right text-sm flex items-start gap-2 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300">
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 dark:bg-red-800">
                <span className="text-red-600 text-xs dark:text-red-400">!</span>
              </div>
              <span>{error}</span>
            </div>
          )}

          {step === "phone" ? (
            <div className="space-y-6">
              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 dark:bg-gray-800 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center gap-2 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  رقم الهاتف
                </label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="07X XXX XXXX"
                    className="pr-12 text-right text-lg h-14 border-2 border-gray-200 focus:border-amber-500 bg-white rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                    disabled={loading}
                    dir="ltr"
                    maxLength={14}
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {phone ? `${11 - phone.replace(/\s/g, "").length} أرقام متبقية` : "أدخل 11 رقماً"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">مثال: 0799 999 9999</p>
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={loading || !isPhoneValid}
                className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-l from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-600 dark:hover:to-orange-700 shadow-lg shadow-amber-500/25 transition-all duration-200"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    متابعة
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">سنرسل رمز تحقق إلى هاتفك</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Test OTP display */}
              {debugOtp && (
                <div className="bg-gradient-to-l from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 dark:bg-green-900/50 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-semibold text-green-800 text-sm dark:text-green-300">رمز التحقق للاختبار</h4>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 font-mono tracking-widest bg-green-100 py-3 rounded-lg dark:bg-green-800/50 dark:text-green-200">
                      {debugOtp}
                    </div>
                    <p className="text-xs text-green-600 mt-2 dark:text-green-400">هذا الرمز معروض للاختبار فقط</p>
                  </div>
                </div>
              )}

              <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 dark:bg-gray-800 dark:border-gray-700">
                <label className="block text-sm font-semibold text-gray-700 mb-3 text-right flex items-center gap-2 dark:text-gray-300">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  رمز التحقق *
                </label>
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="أدخل رمز التحقق المكون من 4 أرقام"
                    className="pr-12 text-center tracking-widest text-xl font-mono h-14 border-2 border-gray-200 focus:border-amber-500 bg-white rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                    disabled={loading}
                    maxLength={4}
                    dir="ltr"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right dark:text-gray-400">
                  أدخل الرمز المكون من 4 أرقام المرسل إلى {phone}
                </p>
              </div>

              {/* Personal Information and Address - for new users only */}
              {!userExists && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-right border-b pb-3 flex items-center gap-2 dark:text-gray-200 dark:border-gray-700">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      المعلومات الشخصية
                    </h3>

                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
                          الاسم الكامل *
                        </label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="أدخل اسمك الكامل"
                            className="pr-10 text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
                          البريد الإلكتروني (اختياري)
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@email.com"
                          className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                          disabled={loading}
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-right border-b pb-3 flex items-center gap-2 dark:text-gray-200 dark:border-gray-700">
                      <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      العنوان
                    </h3>

                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
                          المحافظة *
                        </label>
                        <select
                          value={address.governorate}
                          onChange={(e) => handleAddressChange("governorate", e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl text-right bg-white focus:border-amber-500 focus:ring-0 h-12 dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                          disabled={loading}
                        >
                          <option value="">اختر المحافظة</option>
                          {governorates.map((gov) => (
                            <option key={gov} value={gov}>
                              {gov}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
                            المنطقة او القضاء *
                          </label>
                          <Input
                            type="text"
                            value={address.district}
                            onChange={(e) => handleAddressChange("district", e.target.value)}
                            placeholder="المنطقة او القضاء"
                            className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                            disabled={loading}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
                            اسم الشارع او الحي *
                          </label>
                          <Input
                            type="text"
                            value={address.area}
                            onChange={(e) => handleAddressChange("area", e.target.value)}
                            placeholder="اسم الحي او الشارع"
                            className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-right dark:text-gray-300">
                          أقرب نقطة دالة (اختياري)
                        </label>
                        <Input
                          type="text"
                          value={address.landmark}
                          onChange={(e) => handleAddressChange("landmark", e.target.value)}
                          placeholder="مقابل، بجانب..."
                          className="text-right h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl dark:bg-gray-700 dark:border-gray-700 dark:focus:border-amber-400"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 h-12 rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 dark:bg-gray-800 dark:text-white bg-transparent"
                >
                  رجوع
                </Button>
                <Button
                  onClick={handleVerify}
                  disabled={
                    loading ||
                    !code.trim() ||
                    code.length !== 4 ||
                    (!userExists && (!name.trim() || !address.governorate || !address.district || !address.area))
                  }
                  className="flex-1 h-12 text-base font-semibold rounded-xl bg-gradient-to-l from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-600 dark:hover:to-orange-700 shadow-lg shadow-amber-500/25"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      {userExists ? "جاري تسجيل الدخول..." : "جاري إنشاء الحساب..."}
                    </>
                  ) : userExists ? (
                    "تسجيل الدخول"
                  ) : (
                    "إنشاء الحساب"
                  )}
                </Button>
              </div>

              <div className="text-center">
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 disabled:text-gray-400 font-medium transition-colors"
                >
                  لم يصلك الرمز؟ إعادة إرسال
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              بالمتابعة، أنت توافق على{" "}
              <a href="/terms" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                الشروط والأحكام
              </a>{" "}
              و{" "}
              <a href="/privacy" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
                سياسة الخصوصية
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
