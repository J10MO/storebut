// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { useAuth } from "../hooks/useAuth"
// // import { useNavigate } from "react-router-dom"
// // import {
// //   User,
// //   Package,
// //   Settings,
// //   LogOut,
// //   Star,
// //   MapPin,
// //   Phone,
// //   Mail,
// //   Calendar,
// //   Award,
// //   TrendingUp,
// //   Bell,
// //   Lock,
// //   Trash2,
// //   ChevronRight,
// // } from "lucide-react"

// // const Account: React.FC = () => {
// //   const { user, logout } = useAuth()
// //   const navigate = useNavigate()
// //   const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile")

// //   const handleLogout = () => {
// //     logout()
// //     navigate("/")
// //   }

// //   const calculateLoyaltyProgress = () => {
// //     const points = user?.points || 0
// //     const nextMilestone = Math.ceil(points / 1000) * 1000
// //     const progress = (points / nextMilestone) * 100
// //     return { progress, nextMilestone, points }
// //   }

// //   const loyaltyData = calculateLoyaltyProgress()

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-black animate-fade-in transition-colors duration-300" dir="rtl">
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         <div className="glass rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 dark:border-white/10 animate-fade-in-up">
// //           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
// //             <div className="flex items-center gap-5">
// //               <div className="relative">
// //                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl animate-glow">
// //                   {user?.name?.charAt(0) || "م"}
// //                 </div>
// //                 <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
// //                   <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
// //                 </div>
// //               </div>
// //               <div>
// //                 <h1 className="text-4xl font-bold gradient-text mb-2">{user?.name || "مستخدم"}</h1>
// //                 <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2 text-lg">
// //                   <Phone className="w-5 h-5" />
// //                   {user?.phone || "لا يوجد رقم"}
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-4">
// //               <div className="relative group">
// //                 <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
// //                 <div className="relative text-center px-8 py-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105">
// //                   <div className="text-white text-sm font-semibold mb-1">نقاط الولاء</div>
// //                   <div className="text-white text-3xl font-bold">{user?.points || 0}</div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //           <div className="lg:col-span-1 animate-slide-in-right">
// //             <div className="glass rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-white/10 sticky top-4">
// //               <nav className="space-y-3">
// //                 <button
// //                   onClick={() => setActiveTab("profile")}
// //                   className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
// //                     activeTab === "profile"
// //                       ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl scale-105"
// //                       : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102"
// //                   }`}
// //                 >
// //                   <ChevronRight
// //                     className={`w-5 h-5 transition-transform duration-300 ${activeTab === "profile" ? "rotate-180" : "group-hover:translate-x-1"}`}
// //                   />
// //                   <div className="flex items-center gap-3">
// //                     <span className="font-semibold text-lg">الملف الشخصي</span>
// //                     <User className="w-6 h-6" />
// //                   </div>
// //                 </button>

// //                 <button
// //                   onClick={() => navigate("/orders")}
// //                   className="w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102 group"
// //                 >
// //                   <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //                   <div className="flex items-center gap-3">
// //                     <span className="font-semibold text-lg">طلباتي</span>
// //                     <Package className="w-6 h-6" />
// //                   </div>
// //                 </button>

// //                 <button
// //                   onClick={() => setActiveTab("settings")}
// //                   className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
// //                     activeTab === "settings"
// //                       ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl scale-105"
// //                       : "text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102"
// //                   }`}
// //                 >
// //                   <ChevronRight
// //                     className={`w-5 h-5 transition-transform duration-300 ${activeTab === "settings" ? "rotate-180" : "group-hover:translate-x-1"}`}
// //                   />
// //                   <div className="flex items-center gap-3">
// //                     <span className="font-semibold text-lg">الإعدادات</span>
// //                     <Settings className="w-6 h-6" />
// //                   </div>
// //                 </button>

// //                 <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-700/50">
// //                   <button
// //                     onClick={handleLogout}
// //                     className="w-full flex items-center justify-between px-6 py-5 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-102 group btn-ripple"
// //                   >
// //                     <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //                     <div className="flex items-center gap-3">
// //                       <span className="font-semibold text-lg">تسجيل الخروج</span>
// //                       <LogOut className="w-6 h-6" />
// //                     </div>
// //                   </button>
// //                 </div>
// //               </nav>
// //             </div>
// //           </div>

// //           <div className="lg:col-span-3 animate-slide-in-left">
// //             {activeTab === "profile" && (
// //               <div className="space-y-6">
// //                 <div className="relative group">
// //                   <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-glow" />
// //                   <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl p-10 text-white overflow-hidden">
// //                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
// //                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl" />

// //                     <div className="relative z-10">
// //                       <div className="flex items-center justify-between mb-8">
// //                         <div>
// //                           <h2 className="text-3xl font-bold mb-2">برنامج الولاء</h2>
// //                           <p className="text-indigo-100 text-lg">اكسب نقاط مع كل عملية شراء</p>
// //                         </div>
// //                         <Award className="w-16 h-16 text-yellow-300 animate-bounce" />
// //                       </div>

// //                       <div className="glass rounded-2xl p-8 mb-6 border border-white/30">
// //                         <div className="flex justify-between items-center mb-4">
// //                           <span className="text-base font-semibold">التقدم نحو {loyaltyData.nextMilestone} نقطة</span>
// //                           <span className="text-base font-bold">{loyaltyData.points} نقطة</span>
// //                         </div>
// //                         <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
// //                           <div
// //                             className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 h-4 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
// //                             style={{ width: `${loyaltyData.progress}%` }}
// //                           >
// //                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
// //                           </div>
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-2 gap-5">
// //                         <div className="glass rounded-2xl p-6 text-center border border-white/20 card-hover">
// //                           <TrendingUp className="w-8 h-8 mx-auto mb-3" />
// //                           <div className="text-3xl font-bold mb-1">{user?.totalOrders || 0}</div>
// //                           <div className="text-sm text-indigo-100">إجمالي الطلبات</div>
// //                         </div>
// //                         <div className="glass rounded-2xl p-6 text-center border border-white/20 card-hover">
// //                           <Star className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
// //                           <div className="text-3xl font-bold mb-1 capitalize">{user?.membershipLevel || "برونزي"}</div>
// //                           <div className="text-sm text-indigo-100">مستوى العضوية</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
// //                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
// //                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
// //                       <User className="w-7 h-7 text-white" />
// //                     </div>
// //                     المعلومات الشخصية
// //                   </h2>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {[
// //                       {
// //                         icon: User,
// //                         label: "الاسم الكامل",
// //                         value: user?.name || "غير محدد",
// //                         color: "from-blue-500 to-cyan-500",
// //                       },
// //                       {
// //                         icon: Phone,
// //                         label: "رقم الهاتف",
// //                         value: user?.phone || "غير محدد",
// //                         color: "from-green-500 to-emerald-500",
// //                       },
// //                       {
// //                         icon: Mail,
// //                         label: "البريد الإلكتروني",
// //                         value: user?.email || "غير محدد",
// //                         color: "from-purple-500 to-pink-500",
// //                       },
// //                       {
// //                         icon: Calendar,
// //                         label: "تاريخ الانضمام",
// //                         value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ar-SA") : "مؤخراً",
// //                         color: "from-orange-500 to-red-500",
// //                       },
// //                     ].map((item, idx) => (
// //                       <div key={idx} className="group relative">
// //                         <div
// //                           className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}
// //                         />
// //                         <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all card-hover">
// //                           <div className="flex items-center gap-4 mb-3">
// //                             <div
// //                               className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
// //                             >
// //                               <item.icon className="w-5 h-5 text-white" />
// //                             </div>
// //                             <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
// //                               {item.label}
// //                             </label>
// //                           </div>
// //                           <p className="text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>

// //                   {user?.address && (
// //                     <div className="mt-8 group relative">
// //                       <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
// //                       <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all card-hover">
// //                         <div className="flex items-center gap-4 mb-4">
// //                           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
// //                             <MapPin className="w-6 h-6 text-white" />
// //                           </div>
// //                           <h3 className="text-2xl font-bold text-slate-900 dark:text-white">العنوان</h3>
// //                         </div>
// //                         <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
// //                           {user.address.street && `${user.address.street}, `}
// //                           {user.address.city && `${user.address.city}, `}
// //                           {user.address.district && `${user.address.district}`}
// //                         </p>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {activeTab === "settings" && (
// //               <div className="space-y-6">
// //                 <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
// //                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
// //                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
// //                       <Bell className="w-7 h-7 text-white" />
// //                     </div>
// //                     الإشعارات
// //                   </h3>
// //                   <div className="space-y-4">
// //                     {[
// //                       { label: "تحديثات الطلبات", checked: true, color: "from-blue-500 to-cyan-500" },
// //                       { label: "العروض والخصومات", checked: true, color: "from-green-500 to-emerald-500" },
// //                       { label: "توصيات المنتجات", checked: false, color: "from-purple-500 to-pink-500" },
// //                       { label: "النشرة الإخبارية", checked: false, color: "from-orange-500 to-red-500" },
// //                     ].map((item, idx) => (
// //                       <label
// //                         key={idx}
// //                         className="group flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 card-hover"
// //                       >
// //                         <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
// //                         <div className="relative">
// //                           <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
// //                           <div
// //                             className={`w-14 h-7 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-gradient-to-r peer-checked:${item.color} transition-all shadow-inner`}
// //                           />
// //                           <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-lg" />
// //                         </div>
// //                       </label>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
// //                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
// //                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
// //                       <Lock className="w-7 h-7 text-white" />
// //                     </div>
// //                     الأمان والخصوصية
// //                   </h3>
// //                   <div className="space-y-4">
// //                     {[
// //                       { label: "تغيير كلمة المرور", action: "تحديث", icon: Lock, color: "from-blue-500 to-cyan-500" },
// //                       { label: "الأجهزة المتصلة", action: "عرض", icon: Settings, color: "from-purple-500 to-pink-500" },
// //                       { label: "سجل النشاط", action: "عرض", icon: TrendingUp, color: "from-orange-500 to-red-500" },
// //                     ].map((item, idx) => (
// //                       <button
// //                         key={idx}
// //                         className="w-full flex justify-between items-center p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 group card-hover btn-ripple"
// //                       >
// //                         <div
// //                           className={`px-5 py-2 rounded-xl bg-gradient-to-r ${item.color} text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow`}
// //                         >
// //                           {item.action}
// //                         </div>
// //                         <div className="flex items-center gap-3">
// //                           <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
// //                           <div
// //                             className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
// //                           >
// //                             <item.icon className="w-5 h-5 text-white" />
// //                           </div>
// //                         </div>
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="relative group">
// //                   <div className="absolute inset-0 bg-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
// //                   <div className="relative bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-4 border-red-200 dark:border-red-800 rounded-3xl shadow-2xl p-10">
// //                     <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center gap-3 mb-6">
// //                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center animate-pulse">
// //                         <Trash2 className="w-7 h-7 text-white" />
// //                       </div>
// //                       منطقة الخطر
// //                     </h3>
// //                     <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
// //                       حذف الحساب بشكل دائم سيؤدي إلى فقدان جميع بياناتك ونقاطك وطلباتك بشكل نهائي ولا يمكن التراجع عن
// //                       هذا الإجراء.
// //                     </p>
// //                     <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-5 rounded-2xl transition-all font-bold shadow-2xl hover:shadow-red-500/50 hover:scale-105 btn-ripple text-lg">
// //                       حذف الحساب نهائياً
// //                     </button>
// //                     <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border-2 border-red-300 dark:border-red-700">
// //                       <p className="text-sm text-red-700 dark:text-red-300 text-center font-bold flex items-center justify-center gap-2">
// //                         <span className="text-2xl">⚠️</span>
// //                         تحذير: هذا الإجراء لا يمكن التراجع عنه أبداً
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Account









// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useAuth } from "../hooks/useAuth"
// import { useNavigate } from "react-router-dom"
// import {
//   User,
//   Package,
//   Settings,
//   LogOut,
//   Star,
//   MapPin,
//   Phone,
//   Mail,
//   Calendar,
//   Award,
//   TrendingUp,
//   Bell,
//   Lock,
//   Trash2,
//   ChevronRight,
// } from "lucide-react"

// const Account: React.FC = () => {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()
//   const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile")

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   const calculateLoyaltyProgress = () => {
//     const points = user?.points || 0
//     const nextMilestone = Math.ceil(points / 1000) * 1000
//     const progress = (points / nextMilestone) * 100
//     return { progress, nextMilestone, points }
//   }

//   const loyaltyData = calculateLoyaltyProgress()

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-black animate-fade-in transition-colors duration-300" dir="rtl">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="glass rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 dark:border-white/10 animate-fade-in-up">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
//             <div className="flex items-center gap-5">
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl animate-glow">
//                   {user?.name?.charAt(0) || "م"}
//                 </div>
//                 <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
//                   <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
//                   {user?.name || "مستخدم"}
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-lg">
//                   <Phone className="w-5 h-5" />
//                   {user?.phone || "لا يوجد رقم"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="relative group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
//                 <div className="relative text-center px-8 py-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105">
//                   <div className="text-white text-sm font-semibold mb-1">نقاط الولاء</div>
//                   <div className="text-white text-3xl font-bold">{user?.points || 0}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           <div className="lg:col-span-1 animate-slide-in-right">
//             <div className="glass rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-white/10 sticky top-4">
//               <nav className="space-y-3">
//                 <button
//                   onClick={() => setActiveTab("profile")}
//                   className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
//                     activeTab === "profile"
//                       ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl scale-105"
//                       : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102"
//                   }`}
//                 >
//                   <ChevronRight
//                     className={`w-5 h-5 transition-transform duration-300 ${activeTab === "profile" ? "rotate-180" : "group-hover:translate-x-1"}`}
//                   />
//                   <div className="flex items-center gap-3">
//                     <span className="font-semibold text-lg">الملف الشخصي</span>
//                     <User className="w-6 h-6" />
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => navigate("/orders")}
//                   className="w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102 group"
//                 >
//                   <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                   <div className="flex items-center gap-3">
//                     <span className="font-semibold text-lg">طلباتي</span>
//                     <Package className="w-6 h-6" />
//                   </div>
//                 </button>

//                 <button
//                   onClick={() => setActiveTab("settings")}
//                   className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
//                     activeTab === "settings"
//                       ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl scale-105"
//                       : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102"
//                   }`}
//                 >
//                   <ChevronRight
//                     className={`w-5 h-5 transition-transform duration-300 ${activeTab === "settings" ? "rotate-180" : "group-hover:translate-x-1"}`}
//                   />
//                   <div className="flex items-center gap-3">
//                     <span className="font-semibold text-lg">الإعدادات</span>
//                     <Settings className="w-6 h-6" />
//                   </div>
//                 </button>

//                 <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-700/50">
//                   <button
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-between px-6 py-5 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-102 group btn-ripple"
//                   >
//                     <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                     <div className="flex items-center gap-3">
//                       <span className="font-semibold text-lg">تسجيل الخروج</span>
//                       <LogOut className="w-6 h-6" />
//                     </div>
//                   </button>
//                 </div>
//               </nav>
//             </div>
//           </div>

//           <div className="lg:col-span-3 animate-slide-in-left">
//             {activeTab === "profile" && (
//               <div className="space-y-6">
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-glow" />
//                   <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl shadow-2xl p-10 text-white overflow-hidden">
//                     <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
//                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl" />

//                     <div className="relative z-10">
//                       <div className="flex items-center justify-between mb-8">
//                         <div>
//                           <h2 className="text-3xl font-bold mb-2">برنامج الولاء</h2>
//                           <p className="text-indigo-100 text-lg">اكسب نقاط مع كل عملية شراء</p>
//                         </div>
//                         <Award className="w-16 h-16 text-yellow-300 animate-bounce" />
//                       </div>

//                       <div className="glass rounded-2xl p-8 mb-6 border border-white/30">
//                         <div className="flex justify-between items-center mb-4">
//                           <span className="text-base font-semibold">التقدم نحو {loyaltyData.nextMilestone} نقطة</span>
//                           <span className="text-base font-bold">{loyaltyData.points} نقطة</span>
//                         </div>
//                         <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
//                           <div
//                             className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 h-4 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
//                             style={{ width: `${loyaltyData.progress}%` }}
//                           >
//                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-2 gap-5">
//                         <div className="glass rounded-2xl p-6 text-center border border-white/20 card-hover">
//                           <TrendingUp className="w-8 h-8 mx-auto mb-3" />
//                           <div className="text-3xl font-bold mb-1">{user?.totalOrders || 0}</div>
//                           <div className="text-sm text-indigo-100">إجمالي الطلبات</div>
//                         </div>
//                         <div className="glass rounded-2xl p-6 text-center border border-white/20 card-hover">
//                           <Star className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
//                           <div className="text-3xl font-bold mb-1 capitalize">{user?.membershipLevel || "برونزي"}</div>
//                           <div className="text-sm text-indigo-100">مستوى العضوية</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
//                   <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//                       <User className="w-7 h-7 text-white" />
//                     </div>
//                     المعلومات الشخصية
//                   </h2>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {[
//                       {
//                         icon: User,
//                         label: "الاسم الكامل",
//                         value: user?.name || "غير محدد",
//                         color: "from-blue-500 to-cyan-500",
//                       },
//                       {
//                         icon: Phone,
//                         label: "رقم الهاتف",
//                         value: user?.phone || "غير محدد",
//                         color: "from-green-500 to-emerald-500",
//                       },
//                       {
//                         icon: Mail,
//                         label: "البريد الإلكتروني",
//                         value: user?.email || "غير محدد",
//                         color: "from-purple-500 to-pink-500",
//                       },
//                       {
//                         icon: Calendar,
//                         label: "تاريخ الانضمام",
//                         value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ar-SA") : "مؤخراً",
//                         color: "from-orange-500 to-red-500",
//                       },
//                     ].map((item, idx) => (
//                       <div key={idx} className="group relative">
//                         <div
//                           className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}
//                         />
//                         <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all card-hover">
//                           <div className="flex items-center gap-4 mb-3">
//                             <div
//                               className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
//                             >
//                               <item.icon className="w-5 h-5 text-white" />
//                             </div>
//                             <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
//                               {item.label}
//                             </label>
//                           </div>
//                           <p className="text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {user?.address && (
//                     <div className="mt-8 group relative">
//                       <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
//                       <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all card-hover">
//                         <div className="flex items-center gap-4 mb-4">
//                           <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
//                             <MapPin className="w-6 h-6 text-white" />
//                           </div>
//                           <h3 className="text-2xl font-bold text-slate-900 dark:text-white">العنوان</h3>
//                         </div>
//                         <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
//                           {user.address.street && `${user.address.street}, `}
//                           {user.address.city && `${user.address.city}, `}
//                           {user.address.district && `${user.address.district}`}
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {activeTab === "settings" && (
//               <div className="space-y-6">
//                 <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
//                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
//                       <Bell className="w-7 h-7 text-white" />
//                     </div>
//                     الإشعارات
//                   </h3>
//                   <div className="space-y-4">
//                     {[
//                       { label: "تحديثات الطلبات", checked: true, color: "from-blue-500 to-cyan-500" },
//                       { label: "العروض والخصومات", checked: true, color: "from-green-500 to-emerald-500" },
//                       { label: "توصيات المنتجات", checked: false, color: "from-purple-500 to-pink-500" },
//                       { label: "النشرة الإخبارية", checked: false, color: "from-orange-500 to-red-500" },
//                     ].map((item, idx) => (
//                       <label
//                         key={idx}
//                         className="group flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 card-hover"
//                       >
//                         <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
//                         <div className="relative">
//                           <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
//                           <div
//                             className={`w-14 h-7 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-gradient-to-r peer-checked:${item.color} transition-all shadow-inner`}
//                           />
//                           <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-lg" />
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
//                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
//                       <Lock className="w-7 h-7 text-white" />
//                     </div>
//                     الأمان والخصوصية
//                   </h3>
//                   <div className="space-y-4">
//                     {[
//                       { label: "تغيير كلمة المرور", action: "تحديث", icon: Lock, color: "from-blue-500 to-cyan-500" },
//                       { label: "الأجهزة المتصلة", action: "عرض", icon: Settings, color: "from-purple-500 to-pink-500" },
//                       { label: "سجل النشاط", action: "عرض", icon: TrendingUp, color: "from-orange-500 to-red-500" },
//                     ].map((item, idx) => (
//                       <button
//                         key={idx}
//                         className="w-full flex justify-between items-center p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 group card-hover btn-ripple"
//                       >
//                         <div
//                           className={`px-5 py-2 rounded-xl bg-gradient-to-r ${item.color} text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow`}
//                         >
//                           {item.action}
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
//                           <div
//                             className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
//                           >
//                             <item.icon className="w-5 h-5 text-white" />
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
//                   <div className="relative bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-4 border-red-200 dark:border-red-800 rounded-3xl shadow-2xl p-10">
//                     <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center gap-3 mb-6">
//                       <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center animate-pulse">
//                         <Trash2 className="w-7 h-7 text-white" />
//                       </div>
//                       منطقة الخطر
//                     </h3>
//                     <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
//                       حذف الحساب بشكل دائم سيؤدي إلى فقدان جميع بياناتك ونقاطك وطلباتك بشكل نهائي ولا يمكن التراجع عن
//                       هذا الإجراء.
//                     </p>
//                     <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-5 rounded-2xl transition-all font-bold shadow-2xl hover:shadow-red-500/50 hover:scale-105 btn-ripple text-lg">
//                       حذف الحساب نهائياً
//                     </button>
//                     <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border-2 border-red-300 dark:border-red-700">
//                       <p className="text-sm text-red-700 dark:text-red-300 text-center font-bold flex items-center justify-center gap-2">
//                         <span className="text-2xl">⚠️</span>
//                         تحذير: هذا الإجراء لا يمكن التراجع عنه أبداً
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Account








"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import {
  User,
  Package,
  Settings,
  LogOut,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Bell,
  Lock,
  Trash2,
  ChevronRight,
} from "lucide-react"

const Account: React.FC = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile")

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const calculateLoyaltyProgress = () => {
    const points = user?.points || 0
    const nextMilestone = Math.ceil(points / 1000) * 1000
    const progress = (points / nextMilestone) * 100
    return { progress, nextMilestone, points }
  }

  const loyaltyData = calculateLoyaltyProgress()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black animate-fade-in transition-colors duration-300" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="glass rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 dark:border-white/10 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl animate-glow">
                  {user?.name?.charAt(0) || "م"}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {user?.name || "مستخدم"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2 text-lg">
                  <Phone className="w-5 h-5" />
                  {user?.phone || "لا يوجد رقم"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative text-center px-8 py-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105">
                  <div className="text-white text-sm font-semibold mb-1">نقاط الولاء</div>
                  <div className="text-white text-3xl font-bold">{user?.points || 0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 animate-slide-in-right">
            <div className="glass rounded-3xl shadow-2xl p-6 border border-white/20 dark:border-white/10 sticky top-4">
              <nav className="space-y-3">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
                    activeTab === "profile"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102"
                  }`}
                >
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${activeTab === "profile" ? "rotate-180" : "group-hover:translate-x-1"}`}
                  />
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">الملف الشخصي</span>
                    <User className="w-6 h-6" />
                  </div>
                </button>

                <button
                  onClick={() => navigate("/orders")}
                  className="w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102 group"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">طلباتي</span>
                    <Package className="w-6 h-6" />
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 group ${
                    activeTab === "settings"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-2xl scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5 hover:scale-102"
                  }`}
                >
                  <ChevronRight
                    className={`w-5 h-5 transition-transform duration-300 ${activeTab === "settings" ? "rotate-180" : "group-hover:translate-x-1"}`}
                  />
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">الإعدادات</span>
                    <Settings className="w-6 h-6" />
                  </div>
                </button>

                <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-between px-6 py-5 rounded-2xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-102 group btn-ripple"
                  >
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">تسجيل الخروج</span>
                      <LogOut className="w-6 h-6" />
                    </div>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 animate-slide-in-left">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-glow" />
                  <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl shadow-2xl p-10 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32 blur-3xl" />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-3xl font-bold mb-2">برنامج الولاء</h2>
                          <p className="text-indigo-100 text-lg">اكسب نقاط مع كل عملية شراء</p>
                        </div>
                        <Award className="w-16 h-16 text-yellow-300 animate-bounce" />
                      </div>

                      <div className="glass rounded-2xl p-8 mb-6 border border-white/30">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-base font-semibold">التقدم نحو {loyaltyData.nextMilestone} نقطة</span>
                          <span className="text-base font-bold">{loyaltyData.points} نقطة</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-4 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 h-4 rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
                            style={{ width: `${loyaltyData.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="glass rounded-2xl p-6 text-center border border-white/20 card-hover">
                          <TrendingUp className="w-8 h-8 mx-auto mb-3" />
                          <div className="text-3xl font-bold mb-1">{user?.totalOrders || 0}</div>
                          <div className="text-sm text-indigo-100">إجمالي الطلبات</div>
                        </div>
                        <div className="glass rounded-2xl p-6 text-center border border-white/20 card-hover">
                          <Star className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                          <div className="text-3xl font-bold mb-1 capitalize">{user?.membershipLevel || "بر��نزي"}</div>
                          <div className="text-sm text-indigo-100">مستوى العضوية</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    المعلومات الشخصية
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: User,
                        label: "الاسم الكامل",
                        value: user?.name || "غير محدد",
                        color: "from-blue-500 to-cyan-500",
                      },
                      {
                        icon: Phone,
                        label: "رقم الهاتف",
                        value: user?.phone || "غير محدد",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        icon: Mail,
                        label: "البريد الإلكتروني",
                        value: user?.email || "غير محدد",
                        color: "from-purple-500 to-pink-500",
                      },
                      {
                        icon: Calendar,
                        label: "تاريخ الانضمام",
                        value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ar-SA") : "مؤخراً",
                        color: "from-orange-500 to-red-500",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="group relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}
                        />
                        <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all card-hover">
                          <div className="flex items-center gap-4 mb-3">
                            <div
                              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                            >
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                              {item.label}
                            </label>
                          </div>
                          <p className="text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {user?.address && (
                    <div className="mt-8 group relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
                      <div className="relative bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-700 group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all card-hover">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">العنوان</h3>
                        </div>
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                          {user.address.street && `${user.address.street}, `}
                          {user.address.city && `${user.address.city}, `}
                          {user.address.district && `${user.address.district}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Bell className="w-7 h-7 text-white" />
                    </div>
                    الإشعارات
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "تحديثات الطلبات", checked: true, color: "from-blue-500 to-cyan-500" },
                      { label: "العروض والخصومات", checked: true, color: "from-green-500 to-emerald-500" },
                      { label: "توصيات المنتجات", checked: false, color: "from-purple-500 to-pink-500" },
                      { label: "النشرة الإخبارية", checked: false, color: "from-orange-500 to-red-500" },
                    ].map((item, idx) => (
                      <label
                        key={idx}
                        className="group flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 card-hover"
                      >
                        <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
                        <div className="relative">
                          <input type="checkbox" defaultChecked={item.checked} className="peer sr-only" />
                          <div
                            className={`w-14 h-7 bg-slate-300 dark:bg-slate-600 rounded-full peer-checked:bg-gradient-to-r peer-checked:${item.color} transition-all shadow-inner`}
                          />
                          <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-lg" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 p-10 card-hover">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Lock className="w-7 h-7 text-white" />
                    </div>
                    الأمان والخصوصية
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "تغيير كلمة المرور", action: "تحديث", icon: Lock, color: "from-blue-500 to-cyan-500" },
                      { label: "الأجهزة المتصلة", action: "عرض", icon: Settings, color: "from-purple-500 to-pink-500" },
                      { label: "سجل النشاط", action: "عرض", icon: TrendingUp, color: "from-orange-500 to-red-500" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        className="w-full flex justify-between items-center p-6 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 group card-hover btn-ripple"
                      >
                        <div
                          className={`px-5 py-2 rounded-xl bg-gradient-to-r ${item.color} text-white font-semibold shadow-lg group-hover:shadow-xl transition-shadow`}
                        >
                          {item.action}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-700 dark:text-slate-300 font-semibold text-lg">{item.label}</span>
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
                          >
                            <item.icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-red-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-4 border-red-200 dark:border-red-800 rounded-3xl shadow-2xl p-10">
                    <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center animate-pulse">
                        <Trash2 className="w-7 h-7 text-white" />
                      </div>
                      منطقة الخطر
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg leading-relaxed">
                      حذف الحساب بشكل دائم سيؤدي إلى فقدان جميع بياناتك ونقاطك وطلباتك بشكل نهائي ولا يمكن التراجع عن
                      هذا الإجراء.
                    </p>
                    <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-5 rounded-2xl transition-all font-bold shadow-2xl hover:shadow-red-500/50 hover:scale-105 btn-ripple text-lg">
                      حذف الحساب نهائياً
                    </button>
                    <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border-2 border-red-300 dark:border-red-700">
                      <p className="text-sm text-red-700 dark:text-red-300 text-center font-bold flex items-center justify-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        تحذير: هذا الإجراء لا يمكن التراجع عنه أبداً
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
