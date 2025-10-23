// import React from 'react';
// import { useAuth } from '../../hooks/useAuth';

// const Header: React.FC = () => {
//   const { isAuthenticated, logout } = useAuth();

//   return (
//     <header className="bg-white shadow-sm border-b">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center">
//             <h1 className="text-xl font-bold text-gray-900">
//               My Shop
//             </h1>
//           </div>
          
//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <button
//                 onClick={logout}
//                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
//               >
//                 Logout
//               </button>
//             ) : (
//               <span className="text-gray-600">Welcome Guest</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
