// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Footer: React.FC = () => {
//   const location = useLocation();

//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   return (
//     <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4">
//       <div className="flex justify-between items-center">
//         {/* Home Button */}
//         <Link 
//           to="/dashboard" 
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
//             isActive('/dashboard') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//           </svg>
//           <span className="text-xs mt-1">Home</span>
//         </Link>

//         {/* Search Button */}
//         <Link 
//           to="/search" 
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
//             isActive('/search') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//           <span className="text-xs mt-1">Search</span>
//         </Link>

//         {/* Cart Button */}
//         <Link 
//           to="/cart" 
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
//             isActive('/cart') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <div className="relative">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
//             </svg>
//             {/* Cart badge - you can dynamically update the count */}
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//               0
//             </span>
//           </div>
//           <span className="text-xs mt-1">Cart</span>
//         </Link>

//         {/* Account Button */}
//         <Link 
//           to="/account" 
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
//             isActive('/account') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//           </svg>
//           <span className="text-xs mt-1">Account</span>
//         </Link>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
// import { useState, useEffect } from 'react';

// const Footer: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();
//   const [cartItemCount, setCartItemCount] = useState(0);

//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   const fetchCartCount = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         // For non-logged in users, get cart from localStorage or context
//         const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
//         const totalQuantity = guestCart.reduce((acc: number, item: any) => acc + item.quantity, 0);
//         setCartItemCount(totalQuantity);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/cart', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.ok) {
//         const cartData = await response.json();
//         const totalQuantity = cartData.reduce((acc: number, item: any) => acc + item.quantity, 0);
//         setCartItemCount(totalQuantity);
//       }
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//       setCartItemCount(0);
//     }
//   };

//   const handleCartClick = () => {
//     navigate('/cart');
//   };

//   const handleAccountClick = () => {
//     if (isAuthenticated) {
//       navigate('/account');
//     } else {
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     fetchCartCount();

//     const handleCartUpdate = () => {
//       fetchCartCount();
//     };

//     window.addEventListener('cartUpdated', handleCartUpdate);
//     window.addEventListener('authStateChanged', fetchCartCount);

//     return () => {
//       window.removeEventListener('cartUpdated', handleCartUpdate);
//       window.removeEventListener('authStateChanged', fetchCartCount);
//     };
//   }, [isAuthenticated]);

//   return (
//     <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 safe-area-bottom">
//       <div className="flex justify-between items-center max-w-md mx-auto">
//         {/* Home Button */}
//         <Link 
//           to="/home" 
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 text-center ${
//             isActive('/home') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//           </svg>
//           <span className="text-xs mt-1">Home</span>
//         </Link>

//         {/* Categories Button */}
//         <Link 
//           to="/categories" 
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 text-center ${
//             isActive('/categories') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//           </svg>
//           <span className="text-xs mt-1">Categories</span>
//         </Link>

//         {/* Cart Button */}
//         <button
//           onClick={handleCartClick}
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 text-center ${
//             isActive('/cart') ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <div className="relative">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21" />
//             </svg>
//             {cartItemCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartItemCount}
//               </span>
//             )}
//           </div>
//           <span className="text-xs mt-1">Cart</span>
//         </button>

//         {/* Account Button */}
//         <button
//           onClick={handleAccountClick}
//           className={`flex flex-col items-center p-2 rounded-lg transition-colors flex-1 text-center ${
//             (isActive('/account') || isActive('/login')) ? 'text-blue-600' : 'text-gray-600'
//           }`}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//           </svg>
//           <span className="text-xs mt-1">
//             {isAuthenticated ? 'Account' : 'Login'}
//           </span>
//         </button>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { useState, useEffect } from 'react';
import { Home, Grid, ShoppingCart, User } from 'lucide-react';

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  // تحديث عداد السلة عند تغيير عدد العناصر
  useEffect(() => {
    setCartItemCount(getTotalItems());
  }, [getTotalItems]);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 safe-area-bottom shadow-lg z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {/* زر الرئيسية */}
        <Link 
          to="/home" 
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 flex-1 text-center group ${
            isActive('/home') 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            isActive('/home') ? 'bg-blue-100' : 'group-hover:bg-blue-50'
          }`}>
            <Home className="w-5 h-5" />
          </div>
          <span className="text-xs mt-1 font-medium">الرئيسية</span>
        </Link>

        {/* زر التصنيفات */}
        <Link 
          to="/categories" 
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 flex-1 text-center group ${
            isActive('/categories') 
              ? 'text-green-600 bg-green-50' 
              : 'text-gray-600 hover:text-green-500 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            isActive('/categories') ? 'bg-green-100' : 'group-hover:bg-green-50'
          }`}>
            <Grid className="w-5 h-5" />
          </div>
          <span className="text-xs mt-1 font-medium">التصنيفات</span>
        </Link>

        {/* زر السلة */}
        <button
          onClick={handleCartClick}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 flex-1 text-center group relative ${
            isActive('/cart') 
              ? 'text-orange-600 bg-orange-50' 
              : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            isActive('/cart') ? 'bg-orange-100' : 'group-hover:bg-orange-50'
          }`}>
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white shadow-sm">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
          </div>
          <span className="text-xs mt-1 font-medium">السلة</span>
        </button>

        {/* زر الحساب */}
        <button
          onClick={handleAccountClick}
          className={`flex flex-col items-center p-2 rounded-xl transition-all duration-300 flex-1 text-center group ${
            (isActive('/account') || isActive('/login')) 
              ? 'text-purple-600 bg-purple-50' 
              : 'text-gray-600 hover:text-purple-500 hover:bg-gray-50'
          }`}
        >
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            (isActive('/account') || isActive('/login')) ? 'bg-purple-100' : 'group-hover:bg-purple-50'
          }`}>
            <User className="w-5 h-5" />
          </div>
          <span className="text-xs mt-1 font-medium">
            {isAuthenticated ? 'حسابي' : 'تسجيل'}
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;