// // components/products/ProductsList.tsx
// import React from 'react';
// import ProductCard from '../ProductCard';
// import { useProducts } from '../../../hooks/useProducts';
// import { Loader2, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

// interface ProductsListProps {
//   categoryId?: string | number;
// }

// const ProductsList: React.FC<ProductsListProps> = ({ categoryId }) => {
//   const { products, loading, error, refetch } = useProducts(categoryId);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px] p-4">
//         <Alert variant="destructive" className="max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription className="mt-2">
//             {error}
//             <button
//               onClick={refetch}
//                            className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
//             >
//               Try Again
//             </button>
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
//           <p className="text-gray-500">
//             {categoryId 
//               ? 'No products available in this category.' 
//               : 'No products available at the moment.'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsList;




// // components/products/ProductsList.tsx
// import React from 'react';
// import ProductCard from '../ProductCard';
// import { useProducts } from '../../../hooks/useProducts';
// import { Loader2, AlertCircle, Package } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

// interface ProductsListProps {
//   categoryId?: string | number;
// }

// const ProductsList: React.FC<ProductsListProps> = ({ categoryId }) => {
//   const { products, loading, error, refetch } = useProducts(categoryId);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
//           <p className="text-gray-600 text-sm">جاري تحميل المنتجات...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] p-4 py-8">
//         <Alert variant="destructive" className="max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>خطأ</AlertTitle>
//           <AlertDescription className="mt-2">
//             {error}
//             <button
//               onClick={refetch}
//               className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
//             >
//               حاول مرة أخرى
//             </button>
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-gray-700 mb-1">لا توجد منتجات</h3>
//           <p className="text-gray-500 text-sm">
//             {categoryId 
//               ? 'لا توجد منتجات متاحة في هذا القسم.' 
//               : 'لا توجد منتجات متاحة حالياً.'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-3 py-6">
//       {/* Products Grid - 2 columns on mobile */}
//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
      
//       {/* Products Count */}
//       <div className="text-center mt-6">
//         <p className="text-sm text-gray-600">
//           عرض {products.length} منتج
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductsList;







// // components/products/ProductsList.tsx
// import React from 'react';
// import ProductCard from '../ProductCard';
// import { useProducts } from '../../../hooks/useProducts';
// import { Loader2, AlertCircle, Package, Search } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

// interface ProductsListProps {
//   categoryId?: number | null;
//   searchQuery?: string;
//   viewMode?: 'grid' | 'list';
// }

// const ProductsList: React.FC<ProductsListProps> = ({ 
//   categoryId, 
//   searchQuery = '',
//   viewMode = 'grid'
// }) => {
//   const { products, loading, error, refetch } = useProducts(
//     categoryId && categoryId > 0 ? categoryId : undefined
//   );

//   // فلترة المنتجات حسب البحث
//   const filteredProducts = products.filter(product =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
//           <p className="text-gray-600 text-sm">جاري تحميل المنتجات...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] p-4 py-8">
//         <Alert variant="destructive" className="max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>خطأ</AlertTitle>
//           <AlertDescription className="mt-2">
//             {error}
//             <button
//               onClick={refetch}
//               className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
//             >
//               حاول مرة أخرى
//             </button>
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   const displayProducts = searchQuery ? filteredProducts : products;

//   if (!displayProducts || displayProducts.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-gray-700 mb-1">لا توجد منتجات</h3>
//           <p className="text-gray-500 text-sm">
//             {searchQuery 
//               ? 'لم نتمكن من العثور على منتجات تطابق بحثك' 
//               : categoryId 
//                 ? 'لا توجد منتجات متاحة في هذا التصنيف.' 
//                 : 'لا توجد منتجات متاحة حالياً.'}
//           </p>
//           {searchQuery && (
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
//             >
//               عرض جميع المنتجات
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-6">
    

//       {/* شبكة المنتجات */}
//       <div className={
//         viewMode === 'grid' 
//           ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
//           : "grid grid-cols-1 gap-4"
//       }>
//         {displayProducts.map((product) => (
//           <ProductCard 
//             key={product.id} 
//             product={product}
//             variant={viewMode}
//           />
//         ))}
//       </div>

//       {/* تذييل الصفحة */}
//       <div className="text-center mt-8 pt-6 border-t border-gray-200">
//         <p className="text-sm text-gray-600">
//           تم عرض {displayProducts.length} من أصل {products.length} منتج
//         </p>
//         {searchQuery && filteredProducts.length === 0 && products.length > 0 && (
//           <p className="text-sm text-gray-500 mt-1">
//             جرب مصطلحات بحث أخرى أو امسح البحث لعرض جميع المنتجات
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsList;










// // components/products/ProductsList.tsx
// import React, { useEffect, useState } from 'react';
// import ProductCard from '../ProductCard';
// import { useProducts } from '../../../hooks/useProducts';
// import { Loader2, AlertCircle, Package, Search } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

// interface ProductsListProps {
//   categoryId?: number | null;
//   searchQuery?: string;
//   viewMode?: 'grid' | 'list';
// }

// const ProductsList: React.FC<ProductsListProps> = ({ 
//   categoryId, 
//   searchQuery = '',
//   viewMode = 'grid'
// }) => {
//   const { products, loading, error, refetch } = useProducts(
//     categoryId && categoryId > 0 ? categoryId : undefined
//   );
  
//   const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

//   // فلترة المنتجات حسب البحث
//   useEffect(() => {
//     if (searchQuery.trim()) {
//       const filtered = products.filter(product =>
//         product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.category?.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   }, [products, searchQuery]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px] py-8">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-600 text-lg">جاري تحميل المنتجات...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px] p-4 py-8">
//         <Alert variant="destructive" className="max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>خطأ في التحميل</AlertTitle>
//           <AlertDescription className="mt-2">
//             {error}
//             <button
//               onClick={refetch}
//               className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
//             >
//               حاول مرة أخرى
//             </button>
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   const displayProducts = searchQuery ? filteredProducts : products;

//   if (!displayProducts || displayProducts.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px] py-8">
//         <div className="text-center max-w-md mx-auto">
//           {searchQuery ? (
//             <>
//               <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد نتائج</h3>
//               <p className="text-gray-500 mb-4">
//                 لم نتمكن من العثور على منتجات تطابق "<strong>{searchQuery}</strong>"
//               </p>
//               <div className="space-y-2 text-sm text-gray-600">
//                 <p>✻ حاول استخدام كلمات بحث مختلفة</p>
//                 <p>✻ تحقق من الأخطاء الإملائية</p>
//                 <p>✻ جرب مصطلحات بحث عامة أكثر</p>
//               </div>
//             </>
//           ) : (
//             <>
//               <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">لا توجد منتجات</h3>
//               <p className="text-gray-500">
//                 {categoryId 
//                   ? 'لا توجد منتجات متاحة في هذا التصنيف حالياً.' 
//                   : 'لا توجد منتجات متاحة حالياً.'}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-6">
//       {/* معلومات النتائج */}
//       <div className="flex justify-between items-center mb-6">
//         <p className="text-gray-600 text-sm">
//           عرض {displayProducts.length} من أصل {products.length} منتج
//           {searchQuery && (
//             <span> لـ "<strong>{searchQuery}</strong>"</span>
//           )}
//         </p>
        
//         <div className="text-sm text-gray-500">
//           {viewMode === 'grid' ? 'عرض شبكي' : 'عرض قائمة'}
//         </div>
//       </div>

//       {/* شبكة المنتجات */}
//       <div className={
//         viewMode === 'grid' 
//           ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
//           : "grid grid-cols-1 gap-4"
//       }>
//         {displayProducts.map((product) => (
//           <ProductCard 
//             key={product.id} 
//             product={product}
//             variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
//           />
//         ))}
//       </div>

//       {/* تذييل الصفحة */}
//       <div className="text-center mt-12 pt-6 border-t border-gray-200">
//         <p className="text-sm text-gray-600">
//           تم عرض {displayProducts.length} منتج
//         </p>
//         {searchQuery && filteredProducts.length === 0 && products.length > 0 && (
//           <p className="text-sm text-gray-500 mt-2">
//             جرب مصطلحات بحث أخرى أو امسح البحث لعرض جميع المنتجات
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsList;


// // components/products/ProductsList.tsx
// import React from 'react';
// import ProductCard from '../ProductCard';
// import { useProducts } from '../../../hooks/useProducts';
// import { Loader2, AlertCircle, Package, Search } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

// interface ProductsListProps {
//   categoryId?: number | null;
//   searchQuery?: string;
//   viewMode?: 'grid' | 'list';
// }

// const ProductsList: React.FC<ProductsListProps> = ({ 
//   categoryId, 
//   searchQuery = '',
//   viewMode = 'grid'
// }) => {
//   const { products, loading, error, refetch } = useProducts(
//     categoryId && categoryId > 0 ? categoryId : undefined
//   );

//   // فلترة المنتجات حسب البحث
//   const filteredProducts = products.filter(product =>
//     product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     product.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
//           <p className="text-gray-600 text-sm">جاري تحميل المنتجات...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] p-4 py-8">
//         <Alert variant="destructive" className="max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>خطأ</AlertTitle>
//           <AlertDescription className="mt-2">
//             {error}
//             <button
//               onClick={refetch}
//               className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
//             >
//               حاول مرة أخرى
//             </button>
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   const displayProducts = searchQuery ? filteredProducts : products;

//   if (!displayProducts || displayProducts.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-gray-700 mb-1">لا توجد منتجات</h3>
//           <p className="text-gray-500 text-sm">
//             {searchQuery 
//               ? 'لم نتمكن من العثور على منتجات تطابق بحثك' 
//               : categoryId 
//                 ? 'لا توجد منتجات متاحة في هذا التصنيف.' 
//                 : 'لا توجد منتجات متاحة حالياً.'}
//           </p>
//           {searchQuery && (
//             <button 
//               onClick={() => window.location.reload()}
//               className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
//             >
//               عرض جميع المنتجات
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-6">
//       {/* شبكة المنتجات */}
//       <div className={
//         viewMode === 'grid' 
//           ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" // 2 كروت في الصف على الموبايل
//           : "grid grid-cols-1 gap-4" // كرت واحد في الصف في وضع القائمة
//       }>
//         {displayProducts.map((product) => (
//           <ProductCard 
//             key={product.id} 
//             product={product}
//             variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
//           />
//         ))}
//       </div>

//       {/* تذييل الصفحة */}
//       <div className="text-center mt-8 pt-6 border-t border-gray-200">
//         <p className="text-sm text-gray-600">
//           تم عرض {displayProducts.length} من أصل {products.length} منتج
//         </p>
//         {searchQuery && filteredProducts.length === 0 && products.length > 0 && (
//           <p className="text-sm text-gray-500 mt-1">
//             جرب مصطلحات بحث أخرى أو امسح البحث لعرض جميع المنتجات
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductsList;




// components/products/ProductsList.tsx
import React, { useMemo } from 'react';
import ProductCard from '../ProductCard';
import { useProducts } from '../../../hooks/useProducts';
import { useFavorites } from '../../../hooks/useFavorites';
import { Loader2, AlertCircle, Package } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

interface ProductsListProps {
  categoryId?: number | null;
  searchQuery?: string;
  viewMode?: 'grid' | 'list';
}

const ProductsList: React.FC<ProductsListProps> = ({ 
  categoryId, 
  searchQuery = '',
  viewMode = 'grid'
}) => {
  const { products, loading, error, refetch } = useProducts(
    categoryId && categoryId > 0 ? categoryId : undefined
  );

  // جلب المفضلات مرة واحدة للقائمة بأكملها
  const { favoriteIds, toggleFavorite } = useFavorites();

  // فلترة المنتجات حسب البحث
  const filteredProducts = useMemo(() => 
    products.filter(product =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ), [products, searchQuery]
  );

  const displayProducts = searchQuery ? filteredProducts : products;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] py-8">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">جاري تحميل المنتجات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-4 py-8">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>خطأ</AlertTitle>
          <AlertDescription className="mt-2">
            {error}
            <button
              onClick={refetch}
              className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
            >
              حاول مرة أخرى
            </button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] py-8">
        <div className="text-center">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">لا توجد منتجات</h3>
          <p className="text-gray-500 text-sm">
            {searchQuery 
              ? 'لم نتمكن من العثور على منتجات تطابق بحثك' 
              : categoryId 
                ? 'لا توجد منتجات متاحة في هذا التصنيف.' 
                : 'لا توجد منتجات متاحة حالياً.'}
          </p>
          {searchQuery && (
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
            >
              عرض جميع المنتجات
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      {/* شبكة المنتجات - تمرير معلومات المفضلة دفعة واحدة */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          : "grid grid-cols-1 gap-4"
      }>
        {displayProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
            isFavorite={favoriteIds.has(product.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* تذييل الصفحة */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          تم عرض {displayProducts.length} من أصل {products.length} منتج
        </p>
        {searchQuery && filteredProducts.length === 0 && products.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            جرب مصطلحات بحث أخرى أو امسح البحث لعرض جميع المنتجات
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsList;




// import React, { useMemo } from 'react';
// import ProductCard from '../ProductCard';
// import { useProducts } from '../../../hooks/useProducts';
// import { useFavorites } from '../../../hooks/useFavorites';
// import { Loader2, AlertCircle, Package } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

// interface ProductsListProps {
//   categoryId?: number | null;
//   searchQuery?: string;
//   viewMode?: 'grid' | 'list';
// }

// const ProductsList: React.FC<ProductsListProps> = ({ 
//   categoryId, 
//   searchQuery = '',
//   viewMode = 'grid'
// }) => {
//   const { products, loading, error, refetch } = useProducts(
//     categoryId && categoryId > 0 ? categoryId : undefined
//   );

//   // ✅ جلب المفضلات مرة واحدة فقط
//   const { favoriteIds, toggleFavorite } = useFavorites();

//   const filteredProducts = useMemo(() => 
//     products.filter(product =>
//       product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.name_ar?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
//     ), [products, searchQuery]
//   );

//   const displayProducts = searchQuery ? filteredProducts : products;

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
//           <p className="text-gray-600 text-sm">جاري تحميل المنتجات...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] p-4 py-8">
//         <Alert variant="destructive" className="max-w-md">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>خطأ</AlertTitle>
//           <AlertDescription className="mt-2">
//             {error}
//             <button
//               onClick={refetch}
//               className="mt-3 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm"
//             >
//               حاول مرة أخرى
//             </button>
//           </AlertDescription>
//         </Alert>
//       </div>
//     );
//   }

//   if (!displayProducts || displayProducts.length === 0) {
//     return (
//       <div className="flex items-center justify-center min-h-[200px] py-8">
//         <div className="text-center">
//           <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//           <h3 className="text-lg font-semibold text-gray-700 mb-1">لا توجد منتجات</h3>
//           <p className="text-gray-500 text-sm">
//             {searchQuery 
//               ? 'لم نتمكن من العثور على منتجات تطابق بحثك' 
//               : categoryId 
//                 ? 'لا توجد منتجات متاحة في هذا التصنيف.' 
//                 : 'لا توجد منتجات متاحة حالياً.'}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="py-6">
//       <div className={
//         viewMode === 'grid' 
//           ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
//           : "grid grid-cols-1 gap-4"
//       }>
//         {displayProducts.map((product) => (
//           <ProductCard 
//             key={product.id} 
//             product={product}
//             variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
//             isFavorite={favoriteIds.has(product.id)}
//             onToggleFavorite={toggleFavorite}
//           />
//         ))}
//       </div>

//       <div className="text-center mt-8 pt-6 border-t border-gray-200">
//         <p className="text-sm text-gray-600">
//           تم عرض {displayProducts.length} من أصل {products.length} منتج
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductsList;