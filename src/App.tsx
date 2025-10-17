// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';
// import Header from './components/App-components/Header';
// import Login from './pages/Login';
// import Products from './pages/Products';
// import Dashboard from './pages/Dashboard';

// function App() {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <main>
//           <Routes>
//             <Route 
//               path="/login" 
//               element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
//             />
//             <Route 
//               path="/products" 
//               element={<Products />} 
//             />
//             <Route 
//               path="/dashboard" 
//               element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
//             />
//             <Route 
//               path="/" 
//               element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
//             />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';
// import Header from './components/App-components/Header';
// import Footer from './components/layout/footer';
// import Login from './pages/Login';
// import Products from './pages/Products';
// import Home from './pages/Dashboard';

// function App() {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-lg text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         {/* Show header only when authenticated */}
//          <Header />
        
//         <main className="flex-1 pb-16"> {/* Added padding-bottom for footer */}
//           <Routes>
//             {/* <Route 
//               path="/login" 
//               element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} 
//             /> */}
//             <Route 
//               path="/products" 
//               element={<Products />} 
//             />
//             <Route 
//               path="/Home" 
//               element={ <Home />} 
//             />
//             <Route 
//               path="/" 
//               element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
//             />
//           </Routes>
//         </main>
        
//         {/* Show footer only when authenticated */}
//          <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';
// // import Header from './components/App-components/Header';
// import Footer from './components/layout/footer';
// import Login from './pages/Login';
// import Products from './pages/Products';
// import Home from './pages/Dashboard';
// // import Categories from './pages/Categories';
// import Cart from './pages/Cart';
// import Checkout from './pages/Checkout';
// import Account from './pages/Account';
// import { Toaster } from 'sonner';
// import Layout from './components/layout/appCuontuner';
// function App() {
//   // const { loading } = useAuth();

//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen flex items-center justify-center">
//   //       <div className="text-lg text-gray-600">Loading...</div>
//   //     </div>
//   //   );
//   // }

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         {/* Show header always */}
//         {/* <Header /> */}
//         <Layout>
//         <main className="flex-1 pb-16">
//           <Routes>
//             {/* Public routes */}
//             <Route path="/" element={<Home />} />
//             <Route 
//   path="/account" 
//   element={<Account />} 
// />
//             <Route path="/home" element={<Home />} />
//             <Route path="/products" element={<Products />} />
//             {/* <Route path="/categories" element={<Categories />} /> */}
//             <Route path="/cart" element={<Cart />} />
            
//             {/* Protected route - only for checkout */}
//             <Route path="/checkout" element={<Checkout />} />
            
//             {/* Auth routes */}
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </main>
        
//         {/* Show footer always */}
//         <Footer />
//               {/* Your app content */}
//       <Toaster 
//         position="top-right"
//         richColors
//         expand={false}
//         duration={3000}
//       />
//       </div>
//       <Layout/>
//     </Router>
//   );
// }

// export default App;




// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Products from './pages/Products';

import Home from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import { Toaster } from 'sonner';
import Layout from './components/layout/appCuontuner';
import CategoriesOverview from './components/App-components/categorys/Categoryscard';
import CategoryProducts from './components/App-components/categorys/CategoryPrudect';
import CategoryCards from './pages/imtest';
import FavoritesPage from './pages/fevPage';
import ProductById from './pages/productById';
// import CategoryProducts from './components/App-components/categorys/CategoryPrudect';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
 <Route path="/categories" element={<CategoriesOverview />} />
  <Route path="/categories/:categoryId/products" element={<CategoryProducts />}/>
            <Route path="/cart" element={<Cart />} />
            <Route path="/FavoritesPage" element={<FavoritesPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:id" element={<ProductById />} />
            <Route path="/login" element={<Login />} />
            <Route path="/CategoryCards" element={<CategoryCards />} />
          </Routes>
        </Layout>
        
        <Toaster 
          position="top-right"
          richColors
          expand={false}
          duration={3000}
        />
      </div>
    </Router>
  );
}

export default App;