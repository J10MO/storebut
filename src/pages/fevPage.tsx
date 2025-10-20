// // pages/FavoritesPage.tsx
// import React, { useEffect, useState } from 'react';
// import { useFavorites } from '../hooks/useFavorites';
// import { useAuth } from '../hooks/useAuth';
// import { Heart, ArrowRight, Home, Loader2, ShoppingBag, Filter, Grid, List } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { Product } from '../api/types/product.types';
// import ProductCard from '../components/App-components/ProductCard';
// import { toast } from 'sonner';

// const FavoritesPage: React.FC = () => {
//   const { 
//     favorites, 
//     loading, 
//     error,
//     toggleFavorite,
//     refetch 
//   } = useFavorites();
//   const { isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');

//   useEffect(() => {
//     if (favorites.length > 0) {
//       console.log('Loaded favorites:', favorites.length);
//     }
//   }, [favorites]);

//   const sortedFavorites = React.useMemo(() => {
//     let sorted = [...favorites];
    
//     switch (sortBy) {
//       case 'price-low':
//         sorted.sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
//         break;
//       case 'price-high':
//         sorted.sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
//         break;
//       case 'rating':
//         sorted.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
//         break;
//       default:
//         break;
//     }
    
//     return sorted;
//   }, [favorites, sortBy]);

//   const handleRemoveFavorite = async (productId: number) => {
//     try {
//       await toggleFavorite(productId);
//       toast.success('تم الإزالة من المفضلة');
//     } catch (err) {
//       console.error('Error removing favorite:', err);
//       toast.error('فشل الإزالة من المفضلة');
//     }
//   };

//   // Not authenticated state
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Heart className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-3">يجب تسجيل الدخول</h2>
//           <p className="text-gray-600 mb-6">يجب عليك تسجيل الدخول لعرض منتجاتك المفضلة</p>
//           <button 
//             onClick={() => navigate('/login')}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             تسجيل الدخول
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل المفضلة...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Heart className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-3">خطأ في التحميل</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <button 
//             onClick={() => refetch()}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             إعادة المحاولة
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* Navigation */}
//       <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 py-3">
//           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <button
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold">المفضلة</span>
//           </nav>

//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100 border-2 border-white shadow-lg">
//                 <Heart className="w-7 h-7 text-red-600 fill-current" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">منتجاتي المفضلة</h1>
//                 <p className="text-gray-600 text-sm">{favorites.length} منتج</p>
//               </div>
//             </div>

//             {/* Controls */}
//             {favorites.length > 0 && (
//               <div className="flex items-center gap-2">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value as any)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-blue-500 focus:outline-none focus:border-blue-500 transition-colors"
//                 >
//                   <option value="newest">الأحدث</option>
//                   <option value="price-low">السعر: الأقل للأعلى</option>
//                   <option value="price-high">السعر: الأعلى للأقل</option>
//                   <option value="rating">الأعلى تقييماً</option>
//                 </select>

//                 <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//                   <button
//                     onClick={() => setViewMode('grid')}
//                     className={`p-2 transition-all ${
//                       viewMode === 'grid'
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-white text-gray-600 hover:bg-gray-50'
//                     }`}
//                     title="عرض الشبكة"
//                   >
//                     <Grid className="w-4 h-4" />
//                   </button>
//                   <button
//                     onClick={() => setViewMode('list')}
//                     className={`p-2 transition-all ${
//                       viewMode === 'list'
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-white text-gray-600 hover:bg-gray-50'
//                     }`}
//                     title="عرض القائمة"
//                   >
//                     <List className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {favorites.length === 0 ? (
//           // Empty state
//           <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Heart className="w-12 h-12 text-red-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد منتجات في المفضلة</h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               أضف منتجاتك المفضلة بالنقر على أيقونة القلب في أي منتج
//             </p>
//             <button 
//               onClick={() => navigate('/categories')}
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//             >
//               <ShoppingBag className="w-4 h-4" />
//               استعرض المنتجات
//             </button>
//           </div>
//         ) : (
//           // Products Grid/List
//           <div className={
//             viewMode === 'grid'
//               ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'
//               : 'grid grid-cols-1 gap-4'
//           }>
//             {sortedFavorites.map((product: Product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
//                 isFavorite={true}
//                 onToggleFavorite={async (productId) => {
//                   try {
//                     const result = await toggleFavorite(productId);
//                     if (!result) {
//                       toast.success('تم الإزالة من المفضلة');
//                     }
//                     return result;
//                   } catch (err) {
//                     toast.error('فشل تحديث المفضلة');
//                     throw err;
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Stats Footer */}
//         {favorites.length > 0 && (
//           <div className="mt-8 text-center p-4 bg-white rounded-lg border border-gray-200">
//             <p className="text-sm text-gray-600">
//               عرض <span className="font-bold text-blue-600">{sortedFavorites.length}</span> منتج
//               {sortBy !== 'newest' && (
//                 <span> • مرتبة حسب <span className="font-semibold">
//                   {sortBy === 'price-low' ? 'السعر (الأقل للأعلى)' :
//                    sortBy === 'price-high' ? 'السعر (الأعلى للأقل)' :
//                    'التقييم'}
//                 </span></span>
//               )}
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default FavoritesPage;



// pages/FavoritesPage.tsx
import React, { useEffect, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';
import { Heart, ArrowRight, Home, Loader2, ShoppingBag, Grid, List, RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../api/types/product.types';
import ProductCard from '../components/App-components/ProductCard';
import { toast } from 'sonner';

const FavoritesPage: React.FC = () => {
  const { 
    favorites, 
    loading, 
    error,
    toggleFavorite,
    refetch 
  } = useFavorites();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'rating'>('newest');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch favorites on page load
  useEffect(() => {
    if (isAuthenticated) {
      const loadFavorites = async () => {
        try {
          await refetch();
          console.log('Favorites loaded from server:', favorites.length);
        } catch (err) {
          console.error('Error loading favorites:', err);
        }
      };
      
      loadFavorites();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (favorites.length > 0) {
      console.log('Loaded favorites:', favorites.length);
    }
  }, [favorites]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast.success('تم تحديث المفضلة');
    } catch (err) {
      console.error('Error refreshing favorites:', err);
      toast.error('فشل تحديث المفضلة');
    } finally {
      setIsRefreshing(false);
    }
  };

  const sortedFavorites = React.useMemo(() => {
    let sorted = [...favorites];
    
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => parseFloat(a.price || '0') - parseFloat(b.price || '0'));
        break;
      case 'price-high':
        sorted.sort((a, b) => parseFloat(b.price || '0') - parseFloat(a.price || '0'));
        break;
      case 'rating':
        sorted.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
        break;
      default:
        break;
    }
    
    return sorted;
  }, [favorites, sortBy]);

  // Not authenticated state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-6 sm:p-8 max-w-md w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">يجب تسجيل الدخول</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">يجب عليك تسجيل الدخول لعرض منتجاتك المفضلة</p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 sm:active:scale-100"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 animate-spin text-blue-600 mx-auto mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg font-medium text-gray-700">جاري تحميل المفضلة...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-6 sm:p-8 max-w-md w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-2 sm:mb-3">خطأ في التحميل</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{error}</p>
          <button 
            onClick={() => refetch()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 sm:active:scale-100"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24 sm:pb-0">
      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1 transition-all"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180 text-gray-400" />
            <span className="text-gray-900 font-semibold text-xs sm:text-sm">المفضلة</span>
          </nav>

          {/* Header Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-red-100 to-pink-100 border-2 border-white shadow-md sm:shadow-lg flex-shrink-0">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-red-600 fill-current" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">منتجاتي المفضلة</h1>
                <p className="text-xs sm:text-sm text-gray-600">{favorites.length} منتج</p>
              </div>
            </div>

            {/* Controls */}
            {favorites.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                  title="تحديث البيانات"
                >
                  <RotateCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">تحديث</span>
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm bg-white hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-colors flex-shrink-0"
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر ↑</option>
                  <option value="price-high">السعر ↓</option>
                  <option value="rating">التقييم</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 sm:p-2 transition-all ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title="عرض الشبكة"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 sm:p-2 transition-all border-l border-gray-300 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white border-l-0'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                    title="عرض القائمة"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {favorites.length === 0 ? (
          // Empty state
          <div className="text-center py-12 sm:py-16 bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">لا توجد منتجات في المفضلة</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto px-4">
              أضف منتجاتك المفضلة بالنقر على أيقونة القلب في أي منتج
            </p>
            <button 
              onClick={() => navigate('/categories')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-lg font-semibold text-sm sm:text-base shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all active:scale-95 sm:active:scale-100"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              استعرض المنتجات
            </button>
          </div>
        ) : (
          // Products Grid/List
          <>
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4'
                : 'grid grid-cols-1 gap-3 sm:gap-4'
            }>
              {sortedFavorites.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
                  isFavorite={true}
                  onToggleFavorite={async (productId) => {
                    try {
                      const result = await toggleFavorite(productId);
                      if (!result) {
                        toast.success('تم الإزالة من المفضلة');
                      }
                      return result;
                    } catch (err) {
                      toast.error('فشل تحديث المفضلة');
                      throw err;
                    }
                  }}
                />
              ))}
            </div>

            {/* Stats Footer */}
            {favorites.length > 0 && (
              <div className="mt-6 sm:mt-8 text-center p-3 sm:p-4 bg-white rounded-lg sm:rounded-lg border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600">
                  عرض <span className="font-bold text-blue-600">{sortedFavorites.length}</span> منتج
                  {sortBy !== 'newest' && (
                    <span> • مرتبة حسب <span className="font-semibold">
                      {sortBy === 'price-low' ? 'السعر (الأقل للأعلى)' :
                       sortBy === 'price-high' ? 'السعر (الأعلى للأقل)' :
                       'التقييم'}
                    </span></span>
                  )}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;