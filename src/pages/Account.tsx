// // import React, { useState } from 'react';
// // import { useAuth } from '../hooks/useAuth';
// // import { useOrders } from '../hooks/useOrders';

// // const Account: React.FC = () => {
// //   const { user, logout } = useAuth();
// //   const { orders, loading: ordersLoading } = useOrders();
// //   const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');

// //   const handleLogout = () => {
// //     logout();
// //     window.location.href = '/';
// //   };

// //   const calculateNextLevelProgress = () => {
// //     const levels = {
// //       bronze: { min: 0, next: 'silver' },
// //       silver: { min: 10, next: 'gold' },
// //       gold: { min: 20, next: 'platinum' },
// //       platinum: { min: 50, next: null }
// //     };

// //     const currentLevel = user?.membershipLevel || 'bronze';
// //     const currentOrders = user?.totalOrders || 0;
// //     const levelInfo = levels[currentLevel as keyof typeof levels];
    
// //     if (!levelInfo.next) return { progress: 100, nextLevel: null, needed: 0 };

// //     const nextLevelMin = levels[levelInfo.next as keyof typeof levels].min;
// //     const progress = ((currentOrders - levelInfo.min) / (nextLevelMin - levelInfo.min)) * 100;
    
// //     return {
// //       progress: Math.min(Math.max(progress, 0), 100),
// //       nextLevel: levelInfo.next,
// //       needed: nextLevelMin - currentOrders
// //     };
// //   };

// //   const levelProgress = calculateNextLevelProgress();

// //   return (
// //     <div className="max-w-4xl mx-auto px-4 py-8">
// //       {/* Header */}
// //       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
// //             <p className="text-gray-600">Welcome back, {user?.name || 'User'}!</p>
// //           </div>
// //           <div className="text-right">
// //             <div className="text-sm text-gray-500">Member since</div>
// //             <div className="font-semibold">
// //               {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// //         {/* Sidebar Navigation */}
// //         <div className="lg:col-span-1">
// //           <div className="bg-white rounded-lg shadow-md p-4">
// //             <nav className="space-y-2">
// //               <button
// //                 onClick={() => setActiveTab('profile')}
// //                 className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
// //                   activeTab === 'profile' 
// //                     ? 'bg-blue-100 text-blue-700 font-semibold' 
// //                     : 'text-gray-700 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 👤 Profile & Score
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('orders')}
// //                 className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
// //                   activeTab === 'orders' 
// //                     ? 'bg-blue-100 text-blue-700 font-semibold' 
// //                     : 'text-gray-700 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 📦 My Orders
// //               </button>
// //               <button
// //                 onClick={() => setActiveTab('settings')}
// //                 className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
// //                   activeTab === 'settings' 
// //                     ? 'bg-blue-100 text-blue-700 font-semibold' 
// //                     : 'text-gray-700 hover:bg-gray-100'
// //                 }`}
// //               >
// //                 ⚙️ Settings
// //               </button>
// //               <button
// //                 onClick={handleLogout}
// //                 className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
// //               >
// //                 🚪 Logout
// //               </button>
// //             </nav>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="lg:col-span-3">
// //           {activeTab === 'profile' && (
// //             <div className="space-y-6">
// //               {/* Profile Information */}
// //               <div className="bg-white rounded-lg shadow-md p-6">
// //                 <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
// //                     <p className="text-gray-900 font-semibold">{user?.name || 'Not provided'}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
// //                     <p className="text-gray-900 font-semibold">{user?.email || 'Not provided'}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
// //                     <p className="text-gray-900 font-semibold">{user?.phone}</p>
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">Member Status</label>
// //                     <p className="text-gray-900 font-semibold capitalize">{user?.membershipLevel || 'bronze'}</p>
// //                   </div>
// //                 </div>

// //                 {/* Address Information */}
// //                 {user?.address && (
// //                   <div className="mt-6">
// //                     <h3 className="text-lg font-medium mb-3">Address</h3>
// //                     <div className="bg-gray-50 rounded-lg p-4">
// //                       <p className="text-gray-900">
// //                         {user.address.street && `${user.address.street}, `}
// //                         {user.address.city && `${user.address.city}, `}
// //                         {user.address.district && `${user.address.district}, `}
// //                         {user.address.postalCode && user.address.postalCode}
// //                       </p>
// //                       {!user.address.street && !user.address.city && (
// //                         <p className="text-gray-500 text-sm">No address provided</p>
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Loyalty Score & Membership */}
// //               <div className="bg-white rounded-lg shadow-md p-6">
// //                 <h2 className="text-xl font-semibold mb-4">Loyalty Program</h2>
                
// //                 {/* Points Display */}
// //                 <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 text-white mb-6">
// //                   <div className="flex justify-between items-center">
// //                     <div>
// //                       <p className="text-sm opacity-90">Your Points</p>
// //                       <p className="text-3xl font-bold">{user?.points || 0}</p>
// //                     </div>
// //                     <div className="text-right">
// //                       <p className="text-sm opacity-90">Membership Level</p>
// //                       <p className="text-xl font-bold capitalize">{user?.membershipLevel || 'bronze'}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Level Progress */}
// //                 <div className="mb-4">
// //                   <div className="flex justify-between text-sm text-gray-600 mb-2">
// //                     <span>Progress to {levelProgress.nextLevel ? levelProgress.nextLevel : 'Max Level'}</span>
// //                     <span>{user?.totalOrders || 0} orders</span>
// //                   </div>
// //                   <div className="w-full bg-gray-200 rounded-full h-3">
// //                     <div 
// //                       className="bg-green-500 h-3 rounded-full transition-all duration-500"
// //                       style={{ width: `${levelProgress.progress}%` }}
// //                     ></div>
// //                   </div>
// //                   {levelProgress.nextLevel && (
// //                     <p className="text-sm text-gray-600 mt-2">
// //                       {levelProgress.needed} more orders to reach {levelProgress.nextLevel} level
// //                     </p>
// //                   )}
// //                 </div>

// //                 {/* Benefits by Level */}
// //                 <div className="mt-6">
// //                   <h3 className="font-semibold mb-3">Membership Benefits</h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// //                     <div className="flex items-center">
// //                       <span className="text-green-500 mr-2">✓</span>
// //                       <span>Earn 10% points on every purchase</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <span className="text-green-500 mr-2">✓</span>
// //                       <span>Exclusive member discounts</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <span className="text-green-500 mr-2">✓</span>
// //                       <span>Priority customer support</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <span className="text-green-500 mr-2">✓</span>
// //                       <span>Early access to new products</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'orders' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-semibold mb-4">My Orders</h2>
              
// //               {ordersLoading ? (
// //                 <div className="text-center py-8">
// //                   <div className="text-gray-500">Loading orders...</div>
// //                 </div>
// //               ) : orders.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <div className="text-6xl mb-4">📦</div>
// //                   <h3 className="text-lg font-semibold text-gray-700 mb-2">No orders yet</h3>
// //                   <p className="text-gray-500">Start shopping to see your orders here!</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   {orders.map((order) => (
// //                     <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
// //                       <div className="flex justify-between items-start mb-3">
// //                         <div>
// //                           <h3 className="font-semibold">Order #{order.order_number}</h3>
// //                           <p className="text-sm text-gray-600">
// //                             {new Date(order.created_at).toLocaleDateString()} • 
// //                             <span className={`ml-2 capitalize ${
// //                               order.status === 'delivered' ? 'text-green-600' : 
// //                               order.status === 'shipped' ? 'text-blue-600' : 
// //                               order.status === 'cancelled' ? 'text-red-600' : 
// //                               'text-orange-600'
// //                             }`}>
// //                               {order.status}
// //                             </span>
// //                           </p>
// //                         </div>
// //                         <div className="text-right">
// //                           <p className="font-semibold text-lg">${order.total_amount}</p>
// //                           <p className="text-sm text-gray-600">{order.items?.length || 0} items</p>
// //                         </div>
// //                       </div>
                      
// //                       {order.items && (
// //                         <div className="border-t pt-3">
// //                           {order.items.slice(0, 2).map((item: any) => (
// //                             <div key={item.id} className="flex items-center text-sm text-gray-600 mb-1">
// //                               <span>{item.quantity}x</span>
// //                               <span className="ml-2 flex-1">{item.name}</span>
// //                               <span>${item.price}</span>
// //                             </div>
// //                           ))}
// //                           {order.items.length > 2 && (
// //                             <p className="text-sm text-gray-500 mt-1">
// //                               +{order.items.length - 2} more items
// //                             </p>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {activeTab === 'settings' && (
// //             <div className="bg-white rounded-lg shadow-md p-6">
// //               <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              
// //               <div className="space-y-6">
// //                 {/* Notification Settings */}
// //                 <div>
// //                   <h3 className="font-medium mb-3">Notifications</h3>
// //                   <div className="space-y-3">
// //                     <label className="flex items-center">
// //                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
// //                       <span className="ml-2 text-sm text-gray-700">Order updates</span>
// //                     </label>
// //                     <label className="flex items-center">
// //                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
// //                       <span className="ml-2 text-sm text-gray-700">Promotions and offers</span>
// //                     </label>
// //                     <label className="flex items-center">
// //                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
// //                       <span className="ml-2 text-sm text-gray-700">Product recommendations</span>
// //                     </label>
// //                   </div>
// //                 </div>

// //                 {/* Privacy Settings */}
// //                 <div>
// //                   <h3 className="font-medium mb-3">Privacy</h3>
// //                   <div className="space-y-3">
// //                     <label className="flex items-center">
// //                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
// //                       <span className="ml-2 text-sm text-gray-700">Share data for personalized experience</span>
// //                     </label>
// //                     <label className="flex items-center">
// //                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
// //                       <span className="ml-2 text-sm text-gray-700">Make profile public</span>
// //                     </label>
// //                   </div>
// //                 </div>

// //                 {/* Danger Zone */}
// //                 <div className="border-t pt-6">
// //                   <h3 className="font-medium text-red-600 mb-3">Danger Zone</h3>
// //                   <div className="space-y-3">
// //                     <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
// //                       Delete Account
// //                     </button>
// //                     <p className="text-xs text-gray-500">
// //                       Once you delete your account, there is no going back. Please be certain.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Account;




// import React, { useState } from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { useOrders } from '../hooks/useOrders';
// import { useNavigate } from 'react-router-dom';
// import { 
//   User, 
//   Package, 
//   Settings, 
//   LogOut, 
//   Star, 
//   MapPin,
//   Calendar,
//   CreditCard,
//   Truck,
//   CheckCircle,
//   XCircle,
//   Clock
// } from 'lucide-react';

// const Account: React.FC = () => {
//   const { user, logout } = useAuth();
//   const { orders, loading: ordersLoading } = useOrders();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const calculateNextLevelProgress = () => {
//     const levels = {
//       bronze: { min: 0, next: 'silver' },
//       silver: { min: 10, next: 'gold' },
//       gold: { min: 20, next: 'platinum' },
//       platinum: { min: 50, next: null }
//     };

//     const currentLevel = user?.membershipLevel || 'bronze';
//     const currentOrders = user?.totalOrders || 0;
//     const levelInfo = levels[currentLevel as keyof typeof levels];
    
//     if (!levelInfo.next) return { progress: 100, nextLevel: null, needed: 0 };

//     const nextLevelMin = levels[levelInfo.next as keyof typeof levels].min;
//     const progress = ((currentOrders - levelInfo.min) / (nextLevelMin - levelInfo.min)) * 100;
    
//     return {
//       progress: Math.min(Math.max(progress, 0), 100),
//       nextLevel: levelInfo.next,
//       needed: nextLevelMin - currentOrders
//     };
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'delivered':
//         return <CheckCircle className="w-4 h-4 text-green-500" />;
//       case 'cancelled':
//         return <XCircle className="w-4 h-4 text-red-500" />;
//       case 'shipped':
//         return <Truck className="w-4 h-4 text-blue-500" />;
//       default:
//         return <Clock className="w-4 h-4 text-orange-500" />;
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'delivered':
//         return 'text-green-600 bg-green-100';
//       case 'cancelled':
//         return 'text-red-600 bg-red-100';
//       case 'shipped':
//         return 'text-blue-600 bg-blue-100';
//       default:
//         return 'text-orange-600 bg-orange-100';
//     }
//   };

//   const levelProgress = calculateNextLevelProgress();

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8" dir="rtl">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">حسابي</h1>
//             <p className="text-gray-600 text-lg">مرحباً بعودتك، {user?.name || 'مستخدم'}!</p>
//           </div>
//           <div className="text-left">
//             <div className="text-sm text-gray-500 mb-1">عضو منذ</div>
//             <div className="font-semibold text-gray-700">
//               {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-SA') : 'مؤخراً'}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Sidebar Navigation */}
//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <nav className="space-y-3">
//               <button
//                 onClick={() => setActiveTab('profile')}
//                 className={`w-full flex items-center px-6 py-4 rounded-xl transition-all duration-200 ${
//                   activeTab === 'profile' 
//                     ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' 
//                     : 'text-gray-700 hover:bg-gray-50 border border-transparent'
//                 }`}
//               >
//                 <User className="w-5 h-5 ml-3" />
//                 <span>الملف الشخصي والنقاط</span>
//               </button>
              
//               <button
//                 onClick={() => setActiveTab('orders')}
//                 className={`w-full flex items-center px-6 py-4 rounded-xl transition-all duration-200 ${
//                   activeTab === 'orders' 
//                     ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' 
//                     : 'text-gray-700 hover:bg-gray-50 border border-transparent'
//                 }`}
//               >
//                 <Package className="w-5 h-5 ml-3" />
//                 <span>طلباتي</span>
//               </button>
              
//               <button
//                 onClick={() => setActiveTab('settings')}
//                 className={`w-full flex items-center px-6 py-4 rounded-xl transition-all duration-200 ${
//                   activeTab === 'settings' 
//                     ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' 
//                     : 'text-gray-700 hover:bg-gray-50 border border-transparent'
//                 }`}
//               >
//                 <Settings className="w-5 h-5 ml-3" />
//                 <span>الإعدادات</span>
//               </button>
              
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center px-6 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-200"
//               >
//                 <LogOut className="w-5 h-5 ml-3" />
//                 <span>تسجيل الخروج</span>
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           {activeTab === 'profile' && (
//             <div className="space-y-6">
//               {/* Profile Information */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
//                 <h2 className="text-2xl font-semibold mb-6 text-gray-900">المعلومات الشخصية</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-gray-50 rounded-lg p-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
//                     <p className="text-gray-900 font-semibold text-lg">{user?.name || 'غير متوفر'}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
//                     <p className="text-gray-900 font-semibold text-lg">{user?.email || 'غير متوفر'}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
//                     <p className="text-gray-900 font-semibold text-lg">{user?.phone || 'غير متوفر'}</p>
//                   </div>
//                   <div className="bg-gray-50 rounded-lg p-5">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">مستوى العضوية</label>
//                     <p className="text-gray-900 font-semibold text-lg capitalize">
//                       {user?.membershipLevel === 'bronze' ? 'برونزي' :
//                        user?.membershipLevel === 'silver' ? 'فضي' :
//                        user?.membershipLevel === 'gold' ? 'ذهبي' : 'بلاتينيوم'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Address Information */}
//                 {user?.address && (
//                   <div className="mt-8">
//                     <h3 className="text-xl font-medium mb-4 text-gray-900">العنوان</h3>
//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <div className="flex items-start">
//                         <MapPin className="w-6 h-6 text-blue-600 mt-1 ml-4" />
//                         <div>
//                           <p className="text-gray-900 text-lg">
//                             {user.address.street && `${user.address.street}, `}
//                             {user.address.city && `${user.address.city}, `}
//                             {user.address.district && `${user.address.district}, `}
//                             {user.address.postalCode && user.address.postalCode}
//                           </p>
//                           {!user.address.street && !user.address.city && (
//                             <p className="text-gray-500 text-sm mt-2">لم يتم إضافة عنوان</p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Loyalty Score & Membership */}
//               <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
//                 <h2 className="text-2xl font-semibold mb-6 text-gray-900">برنامج الولاء</h2>
                
//                 {/* Points Display */}
//                 <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-8 text-white mb-8">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm opacity-90 mb-2">نقاطك</p>
//                       <p className="text-4xl font-bold">{user?.points || 0}</p>
//                     </div>
//                     <div className="text-left">
//                       <p className="text-sm opacity-90 mb-2">مستوى العضوية</p>
//                       <p className="text-2xl font-bold">
//                         {user?.membershipLevel === 'bronze' ? 'برونزي' :
//                          user?.membershipLevel === 'silver' ? 'فضي' :
//                          user?.membershipLevel === 'gold' ? 'ذهبي' : 'بلاتينيوم'}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Level Progress */}
//                 <div className="mb-6">
//                   <div className="flex justify-between text-sm text-gray-600 mb-3">
//                     <span>
//                       التقدم إلى {levelProgress.nextLevel ? 
//                         (levelProgress.nextLevel === 'silver' ? 'فضي' :
//                          levelProgress.nextLevel === 'gold' ? 'ذهبي' : 'بلاتينيوم') : 'أعلى مستوى'}
//                     </span>
//                     <span>{user?.totalOrders || 0} طلبات</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
//                     <div 
//                       className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
//                       style={{ width: `${levelProgress.progress}%` }}
//                     ></div>
//                   </div>
//                   {levelProgress.nextLevel && (
//                     <p className="text-sm text-gray-600">
//                       تحتاج {levelProgress.needed} طلبات أخرى للوصول إلى المستوى {
//                         levelProgress.nextLevel === 'silver' ? 'الفضي' :
//                         levelProgress.nextLevel === 'gold' ? 'الذهبي' : 'البلاتينيوم'
//                       }
//                     </p>
//                   )}
//                 </div>

//                 {/* Benefits by Level */}
//                 <div className="mt-8">
//                   <h3 className="font-semibold text-xl mb-4 text-gray-900">مزايا العضوية</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="flex items-center bg-blue-50 rounded-lg p-4">
//                       <Star className="w-6 h-6 text-blue-600 ml-3" />
//                       <span>ربح 10% نقاط على كل عملية شراء</span>
//                     </div>
//                     <div className="flex items-center bg-blue-50 rounded-lg p-4">
//                       <CreditCard className="w-6 h-6 text-blue-600 ml-3" />
//                       <span>خصومات حصرية للأعضاء</span>
//                     </div>
//                     <div className="flex items-center bg-blue-50 rounded-lg p-4">
//                       <User className="w-6 h-6 text-blue-600 ml-3" />
//                       <span>دعم عملاء مميز</span>
//                     </div>
//                     <div className="flex items-center bg-blue-50 rounded-lg p-4">
//                       <Package className="w-6 h-6 text-blue-600 ml-3" />
//                       <span>وصول مبكر للمنتجات الجديدة</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'orders' && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
//               <h2 className="text-2xl font-semibold mb-6 text-gray-900">طلباتي</h2>
              
//               {ordersLoading ? (
//                 <div className="text-center py-12">
//                   <div className="text-gray-500 text-lg">جاري تحميل الطلبات...</div>
//                 </div>
//               ) : orders.length === 0 ? (
//                 <div className="text-center py-16">
//                   <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-700 mb-3">لا توجد طلبات بعد</h3>
//                   <p className="text-gray-500">ابدأ بالتسوق لترى طلباتك هنا!</p>
//                 </div>
//               ) : (
//                 <div className="space-y-5">
//                   {orders.map((order) => (
//                     <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="font-semibold text-lg mb-2">طلب #{order.order_number}</h3>
//                           <div className="flex items-center text-sm text-gray-600">
//                             <Calendar className="w-4 h-4 ml-2" />
//                             {new Date(order.created_at).toLocaleDateString('ar-SA')}
//                             <span className={`mx-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                               {getStatusIcon(order.status)}
//                               <span className="mr-1">
//                                 {order.status === 'delivered' ? 'تم التوصيل' :
//                                  order.status === 'cancelled' ? 'ملغي' :
//                                  order.status === 'shipped' ? 'شحن' : 'قيد المعالجة'}
//                               </span>
//                             </span>
//                           </div>
//                         </div>
//                         <div className="text-left">
//                           <p className="font-semibold text-xl text-gray-900">
//                             {order.total_amount} دينار
//                           </p>
//                           <p className="text-sm text-gray-600">{order.items?.length || 0} منتج</p>
//                         </div>
//                       </div>
                      
//                       {order.items && (
//                         <div className="border-t pt-4">
//                           {order.items.slice(0, 3).map((item: any) => (
//                             <div key={item.id} className="flex items-center justify-between text-sm text-gray-700 mb-2">
//                               <div className="flex items-center">
//                                 <span className="ml-3">{item.quantity}x</span>
//                                 <span className="flex-1">{item.name}</span>
//                               </div>
//                               <span>{item.price} دينار</span>
//                             </div>
//                           ))}
//                           {order.items.length > 3 && (
//                             <p className="text-sm text-gray-500 mt-2">
//                               +{order.items.length - 3} منتجات أخرى
//                             </p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === 'settings' && (
//             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
//               <h2 className="text-2xl font-semibold mb-6 text-gray-900">إعدادات الحساب</h2>
              
//               <div className="space-y-8">
//                 {/* Notification Settings */}
//                 <div>
//                   <h3 className="font-medium text-xl mb-4 text-gray-900">الإشعارات</h3>
//                   <div className="space-y-4">
//                     <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
//                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-3" defaultChecked />
//                       <span className="text-gray-700">تحديثات الطلبات</span>
//                     </label>
//                     <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
//                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-3" defaultChecked />
//                       <span className="text-gray-700">العروض الترويجية</span>
//                     </label>
//                     <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
//                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-3" />
//                       <span className="text-gray-700">توصيات المنتجات</span>
//                     </label>
//                   </div>
//                               </div>

//                 {/* Privacy Settings */}
//                 <div>
//                   <h3 className="font-medium text-xl mb-4 text-gray-900">الخصوصية</h3>
//                   <div className="space-y-4">
//                     <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
//                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-3" defaultChecked />
//                       <span className="text-gray-700">مشاركة البيانات لتجربة مخصصة</span>
//                     </label>
//                     <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
//                       <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 ml-3" />
//                       <span className="text-gray-700">جعل الملف الشخصي عاماً</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Security Settings */}
//                 <div>
//                   <h3 className="font-medium text-xl mb-4 text-gray-900">الأمان</h3>
//                   <div className="space-y-4">
//                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-right">
//                       <span className="text-gray-700">تغيير كلمة المرور</span>
//                       <span className="text-blue-600 text-sm">تحديث</span>
//                     </button>
//                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-right">
//                       <span className="text-gray-700">إدارة الأجهزة المتصلة</span>
//                       <span className="text-blue-600 text-sm">عرض</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Danger Zone */}
//                 <div className="border-t border-gray-200 pt-8">
//                   <h3 className="font-medium text-xl text-red-600 mb-4">منطقة الخطر</h3>
//                   <div className="space-y-4">
//                     <button className="w-full bg-red-50 text-red-600 px-6 py-4 rounded-lg text-right hover:bg-red-100 transition-colors border border-red-200">
//                       <div className="flex items-center justify-between">
//                         <span className="font-medium">حذف الحساب</span>
//                         <span className="text-sm">إجراء دائم</span>
//                       </div>
//                     </button>
//                     <p className="text-xs text-gray-500 text-right">
//                       بمجرد حذف حسابك، لا يمكن الرجوع فيه. يرجى التأكد من قرارك.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;




import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  Settings, 
  LogOut, 
  Star, 
  MapPin,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Shield,
  Bell,
  Trash2,
  Award,
  TrendingUp,
  Crown
} from 'lucide-react';

const Account: React.FC = () => {
  const { user, logout } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const calculateNextLevelProgress = () => {
    const levels = {
      bronze: { min: 0, next: 'silver', color: 'from-amber-600 to-amber-700' },
      silver: { min: 10, next: 'gold', color: 'from-gray-400 to-gray-500' },
      gold: { min: 20, next: 'platinum', color: 'from-yellow-500 to-yellow-600' },
      platinum: { min: 50, next: null, color: 'from-blue-400 to-blue-600' }
    };

    const currentLevel = user?.membershipLevel || 'bronze';
    const currentOrders = user?.totalOrders || 0;
    const levelInfo = levels[currentLevel as keyof typeof levels];
    
    if (!levelInfo.next) return { progress: 100, nextLevel: null, needed: 0, color: levelInfo.color };

    const nextLevelMin = levels[levelInfo.next as keyof typeof levels].min;
    const progress = ((currentOrders - levelInfo.min) / (nextLevelMin - levelInfo.min)) * 100;
    
    return {
      progress: Math.min(Math.max(progress, 0), 100),
      nextLevel: levelInfo.next,
      needed: nextLevelMin - currentOrders,
      color: levelInfo.color
    };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-orange-50 text-orange-700 border-orange-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'bronze':
        return <Award className="w-6 h-6 text-amber-600" />;
      case 'silver':
        return <Award className="w-6 h-6 text-gray-400" />;
      case 'gold':
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 'platinum':
        return <Crown className="w-6 h-6 text-blue-400" />;
      default:
        return <Award className="w-6 h-6 text-amber-600" />;
    }
  };

  const levelProgress = calculateNextLevelProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'م'}
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  مرحباً، {user?.name || 'مستخدم'}!
                </h1>
                <p className="text-gray-600 mt-1">نحن سعداء برؤيتك مرة أخرى</p>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-4 border border-gray-200/50">
              <div className="text-sm text-gray-500 mb-1">عضو منذ</div>
              <div className="font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 ml-2" />
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ar-SA') : 'مؤخراً'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 sticky top-8">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-300 group ${
                    activeTab === 'profile' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-700 hover:bg-white/80 hover:shadow-md border border-transparent hover:border-gray-200'
                  }`}
                >
                  <User className={`w-5 h-5 ml-3 transition-transform group-hover:scale-110 ${
                    activeTab === 'profile' ? 'text-white' : 'text-blue-500'
                  }`} />
                  <span className="font-medium">الملف الشخصي</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-300 group ${
                    activeTab === 'orders' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-700 hover:bg-white/80 hover:shadow-md border border-transparent hover:border-gray-200'
                  }`}
                >
                  <Package className={`w-5 h-5 ml-3 transition-transform group-hover:scale-110 ${
                    activeTab === 'orders' ? 'text-white' : 'text-blue-500'
                  }`} />
                  <span className="font-medium">طلباتي</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-4 rounded-xl transition-all duration-300 group ${
                    activeTab === 'settings' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-700 hover:bg-white/80 hover:shadow-md border border-transparent hover:border-gray-200'
                  }`}
                >
                  <Settings className={`w-5 h-5 ml-3 transition-transform group-hover:scale-110 ${
                    activeTab === 'settings' ? 'text-white' : 'text-blue-500'
                  }`} />
                  <span className="font-medium">الإعدادات</span>
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group border border-transparent hover:border-red-200 hover:shadow-md"
                >
                  <LogOut className="w-5 h-5 ml-3 transition-transform group-hover:scale-110" />
                  <span className="font-medium">تسجيل الخروج</span>
                </button>
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">النقاط</span>
                    <span className="font-bold text-blue-600">{user?.points || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">الطلبات</span>
                    <span className="font-bold text-green-600">{user?.totalOrders || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">المستوى</span>
                    <span className="font-bold text-purple-600 capitalize">
                      {user?.membershipLevel === 'bronze' ? 'برونزي' :
                       user?.membershipLevel === 'silver' ? 'فضي' :
                       user?.membershipLevel === 'gold' ? 'ذهبي' : 'بلاتينيوم'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Information */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                      الملف الشخصي
                    </h2>
                    <button 
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-4 h-4 ml-2" />
                      {isEditingProfile ? 'إلغاء التعديل' : 'تعديل البيانات'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                      <label className="block text-sm font-medium text-blue-700 mb-2">الاسم الكامل</label>
                      {isEditingProfile ? (
                        <input 
                          type="text" 
                          defaultValue={user?.name || ''}
                          className="w-full p-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg">{user?.name || 'غير متوفر'}</p>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                      <label className="block text-sm font-medium text-green-700 mb-2">البريد الإلكتروني</label>
                      {isEditingProfile ? (
                        <input 
                          type="email" 
                          defaultValue={user?.email || ''}
                          className="w-full p-3 border border-green-200 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg">{user?.email || 'غير متوفر'}</p>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                      <label className="block text-sm font-medium text-purple-700 mb-2">رقم الهاتف</label>
                      {isEditingProfile ? (
                        <input 
                          type="tel" 
                          defaultValue={user?.phone || ''}
                          className="w-full p-3 border border-purple-200 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-gray-900 font-semibold text-lg">{user?.phone || 'غير متوفر'}</p>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
                      <label className="block text-sm font-medium text-amber-700 mb-2">مستوى العضوية</label>
                      <div className="flex items-center">
                        {getLevelIcon(user?.membershipLevel || 'bronze')}
                        <p className="text-gray-900 font-semibold text-lg mr-3 capitalize">
                          {user?.membershipLevel === 'bronze' ? 'برونزي' :
                           user?.membershipLevel === 'silver' ? 'فضي' :
                           user?.membershipLevel === 'gold' ? 'ذهبي' : 'بلاتينيوم'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <MapPin className="w-6 h-6 ml-2 text-blue-600" />
                      العنوان
                    </h3>
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start">
                        <MapPin className="w-6 h-6 text-blue-600 mt-1 ml-4" />
                        <div className="flex-1">
                          {user?.address ? (
                            <div className="space-y-2">
                              <p className="text-gray-900 text-lg font-medium">
                                {user.address.city && `${user.address.city}, `}
                                {user.address.district && `${user.address.district}, `}
                                {user.address.area && user.address.area}
                              </p>
                              {user.address.landmark && (
                                <p className="text-gray-600 text-sm">
                                  <span className="font-medium">قرب:</span> {user.address.landmark}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-gray-500 text-lg mb-3">لم يتم إضافة عنوان</p>
                              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                إضافة عنوان
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Loyalty Program */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-8">
                    برنامج الولاء
                  </h2>
                  
                  {/* Points Display */}
                  <div className={`bg-gradient-to-r ${levelProgress.color} rounded-2xl p-8 text-white mb-8 shadow-lg`}>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="text-center md:text-right mb-6 md:mb-0">
                        <p className="text-sm opacity-90 mb-2">رصيد النقاط</p>
                        <p className="text-5xl font-bold mb-2">{user?.points || 0}</p>
                        <div className="flex items-center justify-center md:justify-start">
                          <TrendingUp className="w-5 h-5 ml-2" />
                          <span className="text-sm">+5 نقاط هذا الشهر</span>
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-sm opacity-90 mb-2">مستواك الحالي</p>
                        <div className="flex items-center justify-center md:justify-start">
                          {getLevelIcon(user?.membershipLevel || 'bronze')}
                          <p className="text-3xl font-bold mr-3">
                            {user?.membershipLevel === 'bronze' ? 'برونزي' :
                             user?.membershipLevel === 'silver' ? 'فضي' :
                             user?.membershipLevel === 'gold' ? 'ذهبي' : 'بلاتينيوم'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <span className="font-medium">
                        {levelProgress.nextLevel ? 
                          `التقدم للوصول إلى المستوى ${levelProgress.nextLevel === 'silver' ? 'الفضي' :
                           levelProgress.nextLevel === 'gold' ? 'الذهبي' : 'البلاتينيوم'}` 
                          : 'لقد وصلت إلى أعلى مستوى!'}
                      </span>
                      <span className="font-semibold">{user?.totalOrders || 0} طلبات مكتملة</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-3 shadow-inner">
                      <div 
                        className={`h-4 rounded-full bg-gradient-to-r ${levelProgress.color} transition-all duration-1000 ease-out shadow-lg`}
                        style={{ width: `${levelProgress.progress}%` }}
                      ></div>
                    </div>
                    {levelProgress.nextLevel && (
                      <p className="text-sm text-gray-600 text-center">
                        تحتاج {levelProgress.needed} طلباً إضافياً للترقية
                      </p>
                    )}
                  </div>

                  {/* Benefits Grid */}
                  <div className="mt-8">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 text-center">مزايا العضوية الحصرية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center border border-blue-100">
                        <Star className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <h4 className="font-semibold text-blue-700 mb-2">نقاط مكافآت</h4>
                        <p className="text-sm text-gray-600">اربح نقاطاً على كل عملية شراء</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-100">
                        <CreditCard className="w-8 h-8 text-green-500 mx-auto mb-3" />
                        <h4 className="font-semibold text-green-700 mb-2">خصومات حصرية</h4>
                        <p className="text-sm text-gray-600">عروض خاصة لأعضاء البرنامج</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center border border-purple-100">
                        <User className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                        <h4 className="font-semibold text-purple-700 mb-2">دعم مميز</h4>
                        <p className="text-sm text-gray-600">أولوية في خدمة العملاء</p>
                      </div>
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 text-center border border-amber-100">
                        <Package className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                        <h4 className="font-semibold text-amber-700 mb-2">وصول مبكر</h4>
                        <p className="text-sm text-gray-600">للمنتجات والعروض الجديدة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-8">
                  سجل الطلبات
                </h2>
                
                {ordersLoading ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div className="text-gray-500 text-lg">جاري تحميل الطلبات...</div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-16">
                    <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">لا توجد طلبات بعد</h3>
                    <p className="text-gray-500 text-lg mb-8">ابدأ رحلة التسوق لاكتشاف منتجاتنا المميزة</p>
                    <button 
                      onClick={() => navigate('/products')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                    >
      ابدأ التسوق الآن
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                          <div className="flex-1 mb-4 lg:mb-0">
                            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              طلب #{order.order_number}
                            </h3>
                            <div className="flex items-center text-gray-600">
                              <Calendar className="w-4 h-4 ml-2" />
                              <span className="text-sm">
                                {new Date(order.created_at).toLocaleDateString('ar-SA', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className={`mx-3 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)} flex items-center`}>
                                {getStatusIcon(order.status)}
                                <span className="mr-1">
                                  {order.status === 'delivered' ? 'تم التوصيل' :
                                   order.status === 'cancelled' ? 'ملغي' :
                                   order.status === 'shipped' ? 'قيد الشحن' : 'قيد المعالجة'}
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-2xl text-gray-900">
                              {order.total_amount?.toLocaleString()} دينار
                            </p>
                            <p className="text-sm text-gray-600">{order.items?.length || 0} منتج</p>
                          </div>
                        </div>
                        
                        {order.items && (
                          <div className="border-t pt-6">
                            <div className="space-y-3">
                              {order.items.slice(0, 3).map((item: any) => (
                                <div key={item.id} className="flex items-center justify-between py-2">
                                  <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                      <Package className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-900">{item.name}</span>
                                      <span className="text-sm text-gray-500 mr-3">× {item.quantity}</span>
                                    </div>
                                  </div>
                                  <span className="font-semibold text-gray-900">{item.price?.toLocaleString()} دينار</span>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <p className="text-center text-gray-500 text-sm pt-2">
                                  +{order.items.length - 3} منتجات أخرى
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-8">
                  إعدادات الحساب
                </h2>
                
                <div className="space-y-8">
                  {/* Notification Settings */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center">
                      <Bell className="w-6 h-6 ml-2 text-blue-600" />
                      الإشعارات
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'تحديثات حالة الطلبات', defaultChecked: true },
                        { label: 'العروض الترويجية والخصومات', defaultChecked: true },
                        { label: 'توصيات المنتجات المخصصة', defaultChecked: false },
                        { label: 'نشرة الأخبار الشهرية', defaultChecked: true }
                      ].map((item, index) => (
                        <label key={index} className="flex items-center p-4 bg-white/80 rounded-xl cursor-pointer hover:bg-white transition-all duration-200 border border-white/50">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 ml-3 transform scale-125" 
                            defaultChecked={item.defaultChecked} 
                          />
                          <span className="text-gray-700 font-medium flex-1">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center">
                      <Shield className="w-6 h-6 ml-2 text-green-600" />
                      الخصوصية والأمان
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'مشاركة البيانات لتحسين التجربة', description: 'مساعدتنا في تقديم تجربة تسوق أفضل', defaultChecked: true },
                        { label: 'الملف الشخصي العام', description: 'جعل معلوماتك الظاهرة للآخرين', defaultChecked: false },
                        { label: 'تخزين بيانات الدفع', description: 'حفظ طرق الدفع للمشتريات المستقبلية', defaultChecked: true }
                      ].map((item, index) => (
                        <label key={index} className="flex items-start p-4 bg-white/80 rounded-xl cursor-pointer hover:bg-white transition-all duration-200 border border-white/50">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 ml-3 mt-1 transform scale-125" 
                            defaultChecked={item.defaultChecked} 
                          />
                          <div className="flex-1 mr-3">
                            <span className="text-gray-700 font-medium block">{item.label}</span>
                            <span className="text-gray-500 text-sm">{item.description}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Security Actions */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                    <h3 className="font-bold text-xl text-gray-900 mb-6">إجراءات الأمان</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'تغيير كلمة المرور', description: 'تحديث كلمة المرور الحالية', action: 'تغيير' },
                        { label: 'إدارة الأجهزة المتصلة', description: 'عرض وجميع الأجهزة النشطة', action: 'عرض' },
                        { label: 'نشاط تسجيل الدخول', description: 'سجل عمليات الدخول إلى حسابك', action: 'مراجعة' }
                      ].map((item, index) => (
                        <button key={index} className="w-full flex items-center justify-between p-4 bg-white/80 rounded-xl hover:bg-white transition-all duration-200 border border-white/50 text-right group">
                          <div className="text-left">
                            <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                              {item.action}
                            </span>
                          </div>
                          <div className="flex-1 mr-4">
                            <span className="text-gray-700 font-medium block">{item.label}</span>
                            <span className="text-gray-500 text-sm">{item.description}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                    <h3 className="font-bold text-xl text-red-600 mb-6 flex items-center">
                      <Trash2 className="w-6 h-6 ml-2 text-red-600" />
                      منطقة الخطر
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full bg-white/80 text-red-600 px-6 py-4 rounded-xl text-right hover:bg-white transition-all duration-200 border border-red-200 group">
                        <div className="flex items-center justify-between">
                          <Trash2 className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                          <div className="flex-1 mr-4">
                            <span className="font-bold text-lg block">حذف الحساب</span>
                            <span className="text-red-500 text-sm">هذا الإجراء لا يمكن التراجع عنه</span>
                          </div>
                        </div>
                      </button>
                      <p className="text-xs text-red-500 text-center">
                        تحذير: سيتم حذف جميع بياناتك وطلباتك بشكل دائم ولا يمكن استعادتها.
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
  );
};

export default Account;