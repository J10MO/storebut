// // import { ShoppingBag } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { useState, useEffect } from "react";
// // import olivia from "../../assets/olivia.png";
// // import { cartAPI } from "../../api/cart";
// // import { useAuth } from "@/hooks/useAuth";

// // const Header = ({ setActiveTab }) => {
// //   const [cartItemCount, setCartItemCount] = useState(0);
// //   const { isAuthenticated } = useAuth();

// //   const fetchCartCount = async () => {
// //     if (!isAuthenticated) {
// //       setCartItemCount(0);
// //       return;
// //     }

// //     try {
// //       const response = await cartAPI.getCart();
// //       const totalQuantity = response.data.reduce((acc: number, item: any) => acc + item.quantity, 0);
// //       setCartItemCount(totalQuantity);
// //     } catch (error) {
// //       setCartItemCount(0);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCartCount();

// //     const handleCartUpdate = () => {
// //       fetchCartCount();
// //     };

// //     window.addEventListener('cartUpdated', handleCartUpdate);
// //     window.addEventListener('authStateChanged', fetchCartCount);

// //     return () => {
// //       window.removeEventListener('cartUpdated', handleCartUpdate);
// //       window.removeEventListener('authStateChanged', fetchCartCount);
// //     };
// //   }, [isAuthenticated]);

// //   return (
// //     <div
// //       className="p-4 sticky top-0 z-30 shadow-2xs"
// //       style={{
// //         background: 'linear-gradient(280deg, rgba(87, 199, 133, 0.30) 22%, rgba(237, 221, 83, 0.1) 50%, rgba(237, 221, 83, 0.11) 80%)'
// //       }}
// //     >
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center w-25 h-8">
// //           <img src={olivia} alt="Olivia Logo" />
// //         </div>
        
// //         <div className="flex items-center gap-3">
// //           {/* Shopping Cart */}
// //           <div className="relative">
// //             <Button
// //               variant="ghost"
// //               size="sm"
// //               className="h-9 w-9 p-0 text-white hover:bg-white/20"
// //               onClick={() => setActiveTab('cart')}
// //             >
// //               <ShoppingBag size={20} />
// //             </Button>
// //             {cartItemCount > 0 && (
// //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
// //                 {cartItemCount}
// //               </span>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Header;







// // // components/layout/Navbar.tsx
// // import React from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Badge } from '@/components/ui/badge';
// // import { ShoppingCart, Menu, Search, User } from 'lucide-react';
// // import { useCart } from '../../hooks/useCart';
// // import { Link } from 'react-router-dom'; // or your routing library

// // const Navbar: React.FC = () => {
// //   const { getTotalItems } = useCart();
// //   const totalItems = getTotalItems();

// //   return (
// //     <nav className="bg-white shadow-md sticky top-0 z-50">
// //       <div className="container mx-auto px-4">
// //         <div className="flex items-center justify-between h-16">
// //           {/* Logo */}
// //           <Link to="/" className="flex items-center gap-2">
// //             <div className="text-2xl font-bold text-blue-600">YourStore</div>
// //           </Link>

// //           {/* Search Bar - Desktop */}
// //           <div className="hidden md:flex flex-1 max-w-xl mx-8">
// //             <div className="relative w-full">
// //               <input
// //                 type="text"
// //                 placeholder="Search products..."
// //                 className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               />
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
// //             </div>
// //           </div>

// //           {/* Navigation Items */}
// //           <div className="flex items-center gap-4">
// //             {/* Search - Mobile */}
// //             <Button variant="ghost" size="icon" className="md:hidden">
// //               <Search className="w-5 h-5" />
// //             </Button>

// //             {/* User Account */}
// //                      <Button variant="ghost" size="icon" className="hidden sm:flex">
// //               <User className="w-5 h-5" />
// //             </Button>

// //             {/* Cart */}
// //             <Link to="/cart">
// //               <Button variant="ghost" size="icon" className="relative">
// //                 <ShoppingCart className="w-5 h-5" />
// //                 {totalItems > 0 && (
// //                   <Badge 
// //                     className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 hover:bg-red-700"
// //                   >
// //                     {totalItems > 99 ? '99+' : totalItems}
// //                   </Badge>
// //                 )}
// //               </Button>
// //             </Link>

// //             {/* Mobile Menu */}
// //             <Button variant="ghost" size="icon" className="md:hidden">
// //               <Menu className="w-5 h-5" />
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// // components/layout/Navbar.tsx
// import React, { useState } from 'react';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { 
//   ShoppingCart, 
//   Menu, 
//   Search, 
//   User, 
//   Heart,
//   MapPin,
//   Phone,
//   ChevronDown
// } from 'lucide-react';
// import { useCart } from '../../hooks/useCart';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   const { getTotalItems } = useCart();
//   const totalItems = getTotalItems();
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
//       {/* Top Bar */}
   

//       {/* Main Navbar */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-lg">م</span>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-xl font-bold text-gray-900 leading-5">متجرك</span>
//               <span className="text-xs text-gray-500">Matajarak</span>
//             </div>
//           </Link>

//           {/* Search Bar - Desktop */}
//           <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="ابحث عن المنتجات..."
//                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-right"
//                 dir="rtl"
//               />
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <Button 
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
//               >
//                 بحث
//               </Button>
//             </div>
//           </div>

//           {/* Navigation Items */}
//           <div className="flex items-center gap-2">
//             {/* Search - Mobile */}
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="lg:hidden"
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//             >
//               <Search className="w-5 h-5" />
//             </Button>

//             {/* Wishlist */}
//             <Button variant="ghost" size="icon" className="relative hidden sm:flex">
//               <Heart className="w-5 h-5" />
//               <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-pink-500 text-[10px]">
//                 3
//               </Badge>
//             </Button>

//             {/* User Account */}
//             <div className="relative group hidden sm:block">
//               <Button variant="ghost" className="flex items-center gap-2 h-10 px-3">
//                 <User className="w-5 h-5" />
//                 <span className="text-sm">حسابي</span>
//                 <ChevronDown className="w-4 h-4" />
//               </Button>
//               <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                 <div className="py-2">
//                   <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     الملف الشخصي
//                   </Link>
//                   <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     طلباتي
//                   </Link>
//                   <Link to="/addresses" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     العناوين
//                   </Link>
//                   <div className="border-t border-gray-200 mt-2 pt-2">
//                     <button className="block w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
//                       تسجيل الخروج
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Cart */}
//             <Link to="/cart">
//               <Button variant="ghost" size="icon" className="relative">
//                 <div className="relative">
//                   <ShoppingCart className="w-6 h-6" />
//                   {totalItems > 0 && (
//                     <Badge 
//                       className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-600 hover:bg-red-700 text-xs font-medium"
//                     >
//                       {totalItems > 99 ? '99+' : totalItems}
//                     </Badge>
//                   )}
//                 </div>
//               </Button>
//             </Link>

//             {/* Mobile Menu */}
//             <Button variant="ghost" size="icon" className="lg:hidden">
//               <Menu className="w-6 h-6" />
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         {isSearchOpen && (
//           <div className="lg:hidden pb-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="ابحث عن المنتجات..."
//                 className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-right"
//                 dir="rtl"
//               />
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <Button 
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4"
//               >
//                 بحث
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Categories Bar */}
//       <div className="border-t border-gray-100 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between overflow-x-auto">
//             {/* <div className="flex items-center gap-6 py-3 text-sm">
//               <Link to="/categories/electronics" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
//                 إلكترونيات
//               </Link>
//               <Link to="/categories/fashion" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
//                 موضة
//               </Link>
//               <Link to="/categories/home" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
//                 المنزل
//               </Link>
//               <Link to="/categories/sports" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
//                 رياضة
//               </Link>
//               <Link to="/categories/beauty" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
//                 جمال
//               </Link>
//               <Link to="/categories/toys" className="text-gray-700 hover:text-blue-600 whitespace-nowrap">
//                 ألعاب
//               </Link>
//               <Link to="/categories/offers" className="text-red-600 hover:text-red-700 font-medium whitespace-nowrap">
//                 العروض
//               </Link>
//             </div> */}
            
//             {/* Special Offers Badge */}
//             <div className="hidden md:flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium">
//               <span>🔥</span>
//               <span>عروض خاصة</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// // components/layout/Navbar.tsx
// import React from 'react';
// import { Button } from '../ui/button';
// import { Badge } from '../ui/badge';
// import { 
//   Menu, 
//   User, 
//   Heart,
//   ChevronDown,
//   Sparkles
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-pink-100">
 
  

//       {/* Main Navbar */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
//             <div className="w-11 h-11 bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-xl">✨</span>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent leading-5">
//                 جمالك
//               </span>
//               <span className="text-xs text-gray-500 font-medium">Beauty & Care</span>
//             </div>
//           </Link>

//           {/* Spacer */}
//           <div className="flex-1"></div>

//           {/* Navigation Items */}
//           <div className="flex items-center gap-2">
//             {/* Favorites/Wishlist */}
//             <Link to="/FavoritesPage">
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 className="relative hover:bg-pink-50 transition-colors group"
//               >
//                 <Heart className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors group-hover:fill-pink-100" />
//                 <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-[10px] font-semibold border-2 border-white">
//                   3
//                 </Badge>
//               </Button>
//             </Link>

//             {/* User Account Dropdown */}
//             <div className="relative group hidden sm:block">
//               <Button 
//                 variant="ghost" 
//                 className="flex items-center gap-2 h-10 px-3 hover:bg-pink-50 transition-colors rounded-full"
//               >
//                 <User className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
//                               <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">حسابي</span>
//                 <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-pink-600 group-hover:rotate-180 transition-all duration-200" />
//               </Button>
              
//               {/* Dropdown Menu */}
//               <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-pink-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
//                 <div className="py-2">
//                   <Link 
//                     to="/account" 
//                     className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg mx-2 font-medium"
//                   >
//                     <div className="flex items-center gap-2">
//                       <User className="w-4 h-4" />
//                       <span>الملف الشخصي</span>
//                     </div>
//                   </Link>
//                   <Link 
//                     to="/orders" 
//                     className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg mx-2 font-medium"
//                   >
//                     <div className="flex items-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                       </svg>
//                       <span>طلباتي</span>
//                     </div>
//                   </Link>
//                   <Link 
//                     to="/FavoritesPage" 
//                     className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg mx-2 font-medium"
//                   >
//                     <div className="flex items-center gap-2">
//                       <Heart className="w-4 h-4" />
//                       <span>المفضلة</span>
//                     </div>
//                   </Link>
//                   <div className="border-t border-pink-100 mt-2 pt-2">
//                     <button className="block w-full text-right px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium rounded-lg mx-2">
//                       <div className="flex items-center gap-2">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                         </svg>
//                         <span>تسجيل الخروج</span>
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Menu Button */}
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="lg:hidden hover:bg-pink-50 transition-colors"
//             >                  <Menu className="w-6 h-6 text-gray-700" />
//             </Button>
//           </div>
//         </div>
//       </div>

     
     
//     </nav>
//   );
// };

// export default Navbar;
   



// components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Menu, 
  User, 
  Heart,
  ChevronDown,
  Sparkles,
  X,
  ShoppingBag,
  Phone,
  LogOut
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { favorites } = useFavorites();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-pink-100">
      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-11 h-11 bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">✨</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent leading-5">
                جمالك
              </span>
              <span className="text-xs text-gray-500 font-medium">Beauty & Care</span>
            </div>
          </Link>

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {/* Favorites/Wishlist */}
            <Link to="/FavoritesPage">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-pink-50 transition-colors group"
              >
                <Heart className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors group-hover:fill-pink-100" />
                {favorites.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-[10px] font-semibold border-2 border-white">
                    {favorites.length > 9 ? '9+' : favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Account Dropdown */}
            {isAuthenticated ? (
              <div className="relative group hidden sm:block">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 h-10 px-3 hover:bg-pink-50 transition-colors rounded-full"
                >
                  <User className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors">حسابي</span>
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-pink-600 group-hover:rotate-180 transition-all duration-200" />
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-pink-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="py-2">
                    <Link 
                      to="/account" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg mx-2 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>الملف الشخصي</span>
                      </div>
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg mx-2 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>طلباتي</span>
                      </div>
                    </Link>
                    <Link 
                      to="/favorites" 
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors rounded-lg mx-2 font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        <span>المفضلة ({favorites.length})</span>
                      </div>
                    </Link>
                    <div className="border-t border-pink-100 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-right px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium rounded-lg mx-2"
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="w-4 h-4" />
                          <span>تسجيل الخروج</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 h-10 px-4 hover:bg-pink-50 transition-colors rounded-full"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">تسجيل الدخول</span>
                </Button>
              </Link>
            )}

            {/* Contact Us - Always Visible */}
            <Link to="/contact" className="hidden sm:block">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 h-10 px-4 hover:bg-blue-50 transition-colors rounded-full"
              >
                <Phone className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">اتصل بنا</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden hover:bg-pink-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-pink-100 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-2">
              {/* User Section */}
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/account" 
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-xl transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">الملف الشخصي</span>
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-xl transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="font-medium">طلباتي</span>
                  </Link>
                  <Link 
                    to="/favorites" 
                    className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-xl transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">المفضلة ({favorites.length})</span>
                  </Link>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-3 p-3 text-gray-700 hover:bg-pink-50 rounded-xl transition-colors"
                  onClick={closeMobileMenu}
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">تسجيل الدخول</span>
                </Link>
              )}

              {/* Contact Us */}
              <Link 
                to="/contact" 
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 rounded-xl transition-colors"
                onClick={closeMobileMenu}
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">اتصل بنا</span>
              </Link>

              {/* Logout for authenticated users */}
              {isAuthenticated && (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-right"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">تسجيل الخروج</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;