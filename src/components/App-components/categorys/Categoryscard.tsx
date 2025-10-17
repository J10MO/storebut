// // import React from 'react';
// // import { useCategories } from '../../../hooks/useCategory'; // عدل المسار بحسب مشروعك
// // import CategoryCircleList from './CategoryList';

// // const CategoriesOverview: React.FC = () => {
// //   // تحميل التصنيفات
// //   const { categories, isLoading, error, refetch } = useCategories();

// //   if (isLoading) return <div>جار التحميل...</div>;
// //   if (error) return <div>خطأ: {error}</div>;

// //   return (
// //     <section aria-label="Categories">
// //       <h2>التصنيفات</h2>
// //       <CategoryCircleList categories={categories} size={110} spacing={18} />
// //       <button onClick={refetch} style={{ display: 'block', marginTop: 16 }}>
// //         إعادة التحميل
// //       </button>
// //     </section>
// //   );
// // };

// // export default CategoriesOverview;



// import React from 'react';
// import { useCategories } from '../../../hooks/useCategory';
// import CategoryCircleList from './CategoryList';

// const CategoriesOverview: React.FC = () => {
//   const { categories, isLoading, error, refetch } = useCategories();

//   if (isLoading) return (
//     <div className="flex justify-center items-center py-12">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="text-center py-8 text-red-600">
//       <p>خطأ في تحميل التصنيفات</p>
//       <button 
//         onClick={refetch}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//       >
//         إعادة المحاولة
//       </button>
//     </div>
//   );

//   return (
//     <section aria-label="التصنيفات" className="py-8 bg-gray-50">
//       <div className="container mx-auto px-4">
      
        
//         <CategoryCircleList 
//           categories={categories} 
//           size={110} 
//           spacing={24} 
//         />
        
//         <div className="text-center mt-8">
//           <button 
//             onClick={refetch}
//             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             تحديث التصنيفات
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoriesOverview;



import React from 'react';
import { useCategories } from '../../../hooks/useCategory';
import CategoryCircleList from './CategoryList';
import { Button } from '../../ui/button';
import { RefreshCw, Star, Package, TrendingUp } from 'lucide-react';

const CategoriesOverview: React.FC = () => {
  const { categories, isLoading, error, refetch } = useCategories();

  if (isLoading) return (
    <div className="min-h-60 flex items-center justify-center py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
        <p className="text-gray-600 text-sm">جاري تحميل التصنيفات...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-60 flex items-center justify-center py-8">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{error}</p>
        <Button 
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          <RefreshCw className="w-3 h-3 ml-1" />
          إعادة المحاولة
        </Button>
      </div>
    </div>
  );

  // إحصائيات سريعة
  const totalProducts = categories.reduce((total, cat) => total + parseInt(cat.product_count || '0'), 0);
  const activeCategories = categories.filter(cat => parseInt(cat.product_count || '0') > 0).length;

  return (
    <section className="w-full bg-white py-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="container mx-auto px-4">
        {/* الإحصائيات السريعة */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package className="w-4 h-4 text-blue-600" />
              <span>{categories.length} تصنيف</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>{totalProducts} منتج</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-600" />
              <span>{activeCategories} نشط</span>
            </div>
          </div>

          <Button
            onClick={refetch}
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
          >
            <RefreshCw className="w-3 h-3 ml-1" />
            تحديث
          </Button>
        </div>

        {/* السلايدر */}
        <CategoryCircleList 
          categories={categories} 
          size={90}
          spacing={16}
          showNameAr={true}
        />

        {/* نص توجيهي */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            انقر على أي تصنيف لعرض المنتجات الخاصة به
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoriesOverview;