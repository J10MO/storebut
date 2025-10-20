// // pages/SearchPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Search, Filter, X, Grid, List, SlidersHorizontal } from 'lucide-react';
// import ProductsList from '../components/App-components/Product/ProductsList';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Badge } from '../components/ui/badge';

// const SearchPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // الحصول على معاملات البحث من URL
//   const urlQuery = searchParams.get('q') || '';
//   const urlCategoryId = searchParams.get('category');
//   const urlViewMode = searchParams.get('view') as 'grid' | 'list' || 'grid';
  
//   // حالات المكون
//   const [searchQuery, setSearchQuery] = useState(urlQuery);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     urlCategoryId ? parseInt(urlCategoryId) : null
//   );
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>(urlViewMode);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [localSearch, setLocalSearch] = useState(urlQuery);

//   // تحديث معاملات URL عند تغيير البحث
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (localSearch !== urlQuery) {
//         if (localSearch.trim()) {
//           searchParams.set('q', localSearch.trim());
//         } else {
//           searchParams.delete('q');
//         }
//         setSearchParams(searchParams);
//         setSearchQuery(localSearch.trim());
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [localSearch, searchParams, setSearchParams, urlQuery]);

//   // تحديث حالة البحث عند تغيير URL
//   useEffect(() => {
//     setSearchQuery(urlQuery);
//     setLocalSearch(urlQuery);
//   }, [urlQuery]);

//   // معالجة إرسال النموذج
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (localSearch.trim()) {
//       searchParams.set('q', localSearch.trim());
//     } else {
//       searchParams.delete('q');
//     }
//     setSearchParams(searchParams);
//     setSearchQuery(localSearch.trim());
//   };

//   // معالجة اختيار التصنيف
//   const handleCategorySelect = (categoryId: number | null) => {
//     setSelectedCategoryId(categoryId);
    
//     if (categoryId) {
//       searchParams.set('category', categoryId.toString());
//     } else {
//       searchParams.delete('category');
//     }
//     setSearchParams(searchParams);
//   };

//   // تغيير وضع العرض
//   const handleViewModeChange = (mode: 'grid' | 'list') => {
//     setViewMode(mode);
//     searchParams.set('view', mode);
//     setSearchParams(searchParams);
//   };

//   // مسح جميع الفلاتر
//   const clearAllFilters = () => {
//     setSelectedCategoryId(null);
//     setLocalSearch('');
//     setSearchQuery('');
//     setSearchParams({});
//   };

//   const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* شريط البحث */}
//         <div className="mb-8">
//           <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
//             <div className="relative">
//               <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <Input
//                 type="text"
//                 placeholder="ابحث عن المنتجات بالعربية أو الإنجليزية..."
//                 value={localSearch}
//                 onChange={(e) => setLocalSearch(e.target.value)}
//                 className="w-full pl-4 pr-10 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 bg-white"
//               />
//             </div>
//             <Button 
//               type="submit" 
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6"
//             >
//               بحث
//             </Button>
//           </form>
//         </div>

//         {/* رأس الصفحة */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div className="flex-1">
//             <h1 className="text-2xl font-bold text-gray-900">
//               {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'جميع المنتجات'}
//             </h1>
//             <p className="text-gray-600 mt-1">
//               {searchQuery 
//                 ? `تم العثور على منتجات تطابق بحثك` 
//                 : 'تصفح جميع المنتجات المتاحة'}
//             </p>
//           </div>

//           {/* أدوات التحكم */}
//           <div className="flex items-center gap-3">
//             {/* زر الفلاتر */}
//             <Button
//               variant="outline"
//               onClick={() => setIsFilterOpen(!isFilterOpen)}
//               className="flex items-center gap-2"
//             >
//               <SlidersHorizontal className="w-4 h-4" />
//               فلاتر
//               {hasActiveFilters && (
//                 <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
//                   !
//                 </Badge>
//               )}
//             </Button>

//             {/* أزرار تغيير العرض */}
//             <div className="flex border border-gray-200 rounded-lg overflow-hidden">
//               <Button
//                 variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => handleViewModeChange('grid')}
//                 className="rounded-none"
//               >
//                 <Grid className="w-4 h-4" />
//               </Button>
//               <Button
//                 variant={viewMode === 'list' ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => handleViewModeChange('list')}
//                 className="rounded-none"
//               >
//                 <List className="w-4 h-4" />
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* الفلاتر النشطة */}
//         {hasActiveFilters && (
//           <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-lg border border-gray-200">
//             <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
            
//             {searchQuery && (
//               <Badge variant="secondary" className="flex items-center gap-1">
//                 بحث: {searchQuery}
//                 <X 
//                   className="w-3 h-3 cursor-pointer" 
//                   onClick={() => {
//                     setLocalSearch('');
//                     setSearchQuery('');
//                     searchParams.delete('q');
//                     setSearchParams(searchParams);
//                   }}
//                 />
//               </Badge>
//             )}
            
//             {selectedCategoryId && (
//               <Badge variant="secondary" className="flex items-center gap-1">
//                 تصنيف: {selectedCategoryId}
//                 <X 
//                   className="w-3 h-3 cursor-pointer" 
//                   onClick={() => handleCategorySelect(null)}
//                 />
//               </Badge>
//             )}
            
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={clearAllFilters}
//               className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
//             >
//               مسح الكل
//             </Button>
//           </div>
//         )}

//         {/* لوحة الفلاتر */}
//         {isFilterOpen && (
//           <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">الفلاتر</h3>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsFilterOpen(false)}
//               >
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               {/* هنا يمكن إضافة فلاتر إضافية مثل:
//                  - فلاتر بالسعر
//                  - فلاتر بالتقييم
//                  - فلاتر بالتوفر
//               */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   التصنيفات
//                 </label>
//                 <div className="space-y-2">
//                   {/* يمكن استبدال هذا بقائمة تصنيفات ديناميكية */}
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={selectedCategoryId === null}
//                       onChange={() => handleCategorySelect(null)}
//                       className="ml-2"
//                     />
//                     جميع التصنيفات
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={selectedCategoryId === 1}
//                       onChange={() => handleCategorySelect(1)}
//                       className="ml-2"
//                     />
//                     التصنيف 1
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* قائمة المنتجات */}
//         <ProductsList 
//           categoryId={selectedCategoryId}
//           searchQuery={searchQuery}
//           viewMode={viewMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;







// // pages/SearchPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Search, Filter, X, Grid, List, SlidersHorizontal, Home, ChevronRight } from 'lucide-react';
// import ProductsList from '../components/App-components/Product/ProductsList';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Badge } from '../components/ui/badge';

// const SearchPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // الحصول على معاملات البحث من URL
//   const urlQuery = searchParams.get('q') || '';
//   const urlCategoryId = searchParams.get('category');
//   const urlViewMode = searchParams.get('view') as 'grid' | 'list' || 'grid';
  
//   // حالات المكون
//   const [searchQuery, setSearchQuery] = useState(urlQuery);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     urlCategoryId ? parseInt(urlCategoryId) : null
//   );
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>(urlViewMode);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [localSearch, setLocalSearch] = useState(urlQuery);

//   // تحديث معاملات URL عند تغيير البحث
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (localSearch !== urlQuery) {
//         if (localSearch.trim()) {
//           searchParams.set('q', localSearch.trim());
//         } else {
//           searchParams.delete('q');
//         }
//         setSearchParams(searchParams);
//         setSearchQuery(localSearch.trim());
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [localSearch, searchParams, setSearchParams, urlQuery]);

//   // تحديث حالة البحث عند تغيير URL
//   useEffect(() => {
//     setSearchQuery(urlQuery);
//     setLocalSearch(urlQuery);
//   }, [urlQuery]);

//   // معالجة إرسال النموذج
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (localSearch.trim()) {
//       searchParams.set('q', localSearch.trim());
//     } else {
//       searchParams.delete('q');
//     }
//     setSearchParams(searchParams);
//     setSearchQuery(localSearch.trim());
//   };

//   // معالجة اختيار التصنيف
//   const handleCategorySelect = (categoryId: number | null) => {
//     setSelectedCategoryId(categoryId);
    
//     if (categoryId) {
//       searchParams.set('category', categoryId.toString());
//     } else {
//       searchParams.delete('category');
//     }
//     setSearchParams(searchParams);
//   };

//   // تغيير وضع العرض
//   const handleViewModeChange = (mode: 'grid' | 'list') => {
//     setViewMode(mode);
//     searchParams.set('view', mode);
//     setSearchParams(searchParams);
//   };

//   // مسح جميع الفلاتر
//   const clearAllFilters = () => {
//     setSelectedCategoryId(null);
//     setLocalSearch('');
//     setSearchQuery('');
//     setSearchParams({});
//   };

//   const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">

//       <div className="container mx-auto px-4 py-6 sm:py-8">
//         {/* Search Bar Section */}
//         <div className="mb-8">
//           <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
//             <div className="relative group">
//               <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
//               <Input
//                 type="text"
//                 placeholder="ابحث عن المنتجات..."
//                 value={localSearch}
//                 onChange={(e) => setLocalSearch(e.target.value)}
//                 className="w-full pl-4 pr-12 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white transition-all duration-300 shadow-sm hover:shadow-md"
//               />
//               <Button 
//                 type="submit" 
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-semibold"
//               >
//                 بحث
//               </Button>
//             </div>
//           </form>
//           <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">
//             ابحث بالعربية أو الإنجليزية • تصفية سريعة وسهلة
//           </p>
//         </div>

//         {/* Header Section */}
//         <div className="mb-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <div className="flex-1">
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                 {searchQuery ? `نتائج البحث: "${searchQuery}"` : 'جميع المنتجات'}
//               </h1>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 {searchQuery 
//                   ? 'اختر المنتج الذي يناسبك من النتائج أدناه' 
//                   : 'استعرض جميع المنتجات المتاحة'}
//               </p>
//             </div>

//             {/* Control Buttons */}
//             <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
//               {/* Filters Button */}
//               <Button
//                 variant={isFilterOpen ? "default" : "outline"}
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className={`flex items-center gap-2 transition-all duration-300 rounded-lg py-2 px-3 sm:px-4 ${
//                   isFilterOpen 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-200 text-gray-700 hover:border-blue-500'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 <span className="hidden sm:inline">فلاتر</span>
//                 {hasActiveFilters && (
//                   <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold">
//                     1
//                   </Badge>
//                 )}
//               </Button>

//               {/* View Mode Buttons */}
//               <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => handleViewModeChange('grid')}
//                   className={`rounded-none border-r border-gray-200 transition-all ${
//                     viewMode === 'grid'
//                       ? 'bg-blue-600 text-white border-blue-600'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                   title="عرض الشبكة"
//                 >
//                   <Grid className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => handleViewModeChange('list')}
//                   className={`rounded-none transition-all ${
//                     viewMode === 'list'
//                       ? 'bg-blue-600 text-white border-blue-600'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                   title="عرض القائمة"
//                 >
//                   <List className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Active Filters */}
//           {hasActiveFilters && (
//             <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
//               <span className="text-sm font-semibold text-gray-700">الفلاتر النشطة:</span>
              
//               {searchQuery && (
//                 <Badge className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full border border-blue-300 text-sm">
//                   <Search className="w-3 h-3" />
//                   {searchQuery}
//                   <X 
//                     className="w-3 h-3 cursor-pointer hover:text-blue-600 transition-colors" 
//                     onClick={() => {
//                       setLocalSearch('');
//                       setSearchQuery('');
//                       searchParams.delete('q');
//                       setSearchParams(searchParams);
//                     }}
//                   />
//                 </Badge>
//               )}
              
//               {selectedCategoryId && (
//                 <Badge className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full border border-green-300 text-sm">
//                   تصنيف #{selectedCategoryId}
//                   <X 
//                     className="w-3 h-3 cursor-pointer hover:text-green-600 transition-colors" 
//                     onClick={() => handleCategorySelect(null)}
//                   />
//                 </Badge>
//               )}
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={clearAllFilters}
//                 className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm ml-auto font-medium"
//               >
//                 <X className="w-3 h-3 ml-1" />
//                 مسح الكل
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Filters Panel */}
//         {isFilterOpen && (
//           <div className="mb-6 p-4 sm:p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900">الفلاتر والتصفية</h3>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Categories Filter */}
//               <div className="border-2 border-gray-100 rounded-xl p-4">
//                 <label className="block text-sm sm:text-base font-bold text-gray-900 mb-4">
//                   🏷️ التصنيفات
//                 </label>
//                 <div className="space-y-3">
//                   <label className="flex items-center cursor-pointer group">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={selectedCategoryId === null}
//                       onChange={() => handleCategorySelect(null)}
//                       className="ml-3 w-4 h-4 text-blue-600 cursor-pointer"
//                     />
//                     <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm sm:text-base">
//                       جميع التصنيفات
//                     </span>
//                   </label>
//                   {[1, 2, 3, 4].map((id) => (
//                     <label key={id} className="flex items-center cursor-pointer group">
//                       <input
//                         type="radio"
//                         name="category"
//                         checked={selectedCategoryId === id}
//                         onChange={() => handleCategorySelect(id)}
//                         className="ml-3 w-4 h-4 text-blue-600 cursor-pointer"
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors text-sm sm:text-base">
//                         التصنيف {id}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Filter Placeholder */}
//               <div className="border-2 border-gray-100 rounded-xl p-4">
//                 <label className="block text-sm sm:text-base font-bold text-gray-900 mb-4">
//                   💰 نطاق السعر
//                 </label>
//                 <p className="text-gray-500 text-xs sm:text-sm italic">
//                   قريباً: فلاتر السعر
//                 </p>
//               </div>

//               {/* Rating Filter Placeholder */}
//               <div className="border-2 border-gray-100 rounded-xl p-4">
//                 <label className="block text-sm sm:text-base font-bold text-gray-900 mb-4">
//                   ⭐ التقييم
//                 </label>
//                 <p className="text-gray-500 text-xs sm:text-sm italic">
//                   قريباً: فلاتر التقييم
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products List */}
//         <ProductsList 
//           categoryId={selectedCategoryId}
//           searchQuery={searchQuery}
//           viewMode={viewMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;







// // pages/SearchPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Search, X, Grid, List, SlidersHorizontal, Home, ChevronRight } from 'lucide-react';
// import ProductsList from '../components/App-components/Product/ProductsList';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Badge } from '../components/ui/badge';

// const SearchPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   const urlQuery = searchParams.get('q') || '';
//   const urlCategoryId = searchParams.get('category');
//   const urlViewMode = searchParams.get('view') as 'grid' | 'list' || 'grid';
  
//   const [searchQuery, setSearchQuery] = useState(urlQuery);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     urlCategoryId ? parseInt(urlCategoryId) : null
//   );
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>(urlViewMode);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [localSearch, setLocalSearch] = useState(urlQuery);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (localSearch !== urlQuery) {
//         if (localSearch.trim()) {
//           searchParams.set('q', localSearch.trim());
//         } else {
//           searchParams.delete('q');
//         }
//         setSearchParams(searchParams);
//         setSearchQuery(localSearch.trim());
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [localSearch, searchParams, setSearchParams, urlQuery]);

//   useEffect(() => {
//     setSearchQuery(urlQuery);
//     setLocalSearch(urlQuery);
//   }, [urlQuery]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (localSearch.trim()) {
//       searchParams.set('q', localSearch.trim());
//     } else {
//       searchParams.delete('q');
//     }
//     setSearchParams(searchParams);
//     setSearchQuery(localSearch.trim());
//   };

//   const handleCategorySelect = (categoryId: number | null) => {
//     setSelectedCategoryId(categoryId);
    
//     if (categoryId) {
//       searchParams.set('category', categoryId.toString());
//     } else {
//       searchParams.delete('category');
//     }
//     setSearchParams(searchParams);
//   };

//   const handleViewModeChange = (mode: 'grid' | 'list') => {
//     setViewMode(mode);
//     searchParams.set('view', mode);
//     setSearchParams(searchParams);
//   };

//   const clearAllFilters = () => {
//     setSelectedCategoryId(null);
//     setLocalSearch('');
//     setSearchQuery('');
//     setSearchParams({});
//   };

//   const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

//   return (
//     <div className="min-h-screen bg-white pb-24 sm:pb-0">
//       {/* Breadcrumb Navigation */}
//       <div className="border-b border-gray-200 bg-white sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
//           <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
//             <button 
//               onClick={() => navigate('/')}
//               className="flex items-center gap-1 hover:text-gray-900 transition-colors"
//             >
//               <Home className="w-4 h-4" />
//               <span className="hidden sm:inline">الرئيسية</span>
//             </button>
//             <ChevronRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold">البحث</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
//         {/* Search Bar Section */}
//         <div className="mb-6 sm:mb-8">
//           <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
//             <div className="relative group">
//               <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
//               <Input
//                 type="text"
//                 placeholder="ابحث عن المنتجات..."
//                 value={localSearch}
//                 onChange={(e) => setLocalSearch(e.target.value)}
//                 className="w-full pl-12 sm:pl-14 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
//               />
//               <Button 
//                 type="submit" 
//                 className="absolute left-1.5 sm:left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all"
//               >
//                 بحث
//               </Button>
//             </div>
//           </form>
//           <p className="text-center text-gray-500 text-xs mt-2 sm:text-sm sm:mt-3">
//             ابحث بالعربية أو الإنجليزية
//           </p>
//         </div>

//         {/* Header & Controls Section */}
//         <div className="mb-6">
//           <div className="flex flex-col gap-4 mb-4">
//             <div className="flex items-center justify-between gap-3">
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
//                   {searchQuery ? `نتائج: "${searchQuery}"` : ''}
//                 </h1>
//                 <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                   {searchQuery ? 'اختر المنتج الذي يناسبك' : ''}
//                 </p>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
//               <Button
//                 variant={isFilterOpen ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all flex-shrink-0 ${
//                   isFilterOpen 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 <span className="hidden sm:inline">فلاتر</span>
//                 {hasActiveFilters && (
//                   <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
//                     1
//                   </Badge>
//                 )}
//               </Button>

//               <div className="flex border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => handleViewModeChange('grid')}
//                   className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-none text-sm transition-all ${
//                     viewMode === 'grid'
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                   title="عرض الشبكة"
//                 >
//                   <Grid className="w-4 h-4" />
//                 </Button>
//                 <div className="w-px bg-gray-300" />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => handleViewModeChange('list')}
//                   className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-none text-sm transition-all ${
//                     viewMode === 'list'
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                   title="عرض القائمة"
//                 >
//                   <List className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Active Filters Display */}
//           {hasActiveFilters && (
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <span className="text-xs sm:text-sm font-semibold text-gray-700">الفلاتر:</span>
              
//               {searchQuery && (
//                 <Badge className="flex items-center gap-1.5 bg-white text-blue-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-blue-200 text-xs sm:text-sm font-medium">
//                   <Search className="w-3 h-3" />
//                   {searchQuery}
//                   <button
//                     onClick={() => {
//                       setLocalSearch('');
//                       setSearchQuery('');
//                       searchParams.delete('q');
//                       setSearchParams(searchParams);
//                     }}
//                     className="hover:text-blue-900 transition-colors"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </Badge>
//               )}
              
//               {selectedCategoryId && (
//                 <Badge className="flex items-center gap-1.5 bg-white text-green-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-green-200 text-xs sm:text-sm font-medium">
//                   التصنيف #{selectedCategoryId}
//                   <button
//                     onClick={() => handleCategorySelect(null)}
//                     className="hover:text-green-900 transition-colors"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </Badge>
//               )}
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={clearAllFilters}
//                 className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-medium ml-auto"
//               >
//                 <X className="w-3 h-3 ml-1" />
//                 مسح
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Filters Panel */}
//         {isFilterOpen && (
//           <div className="mb-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm">
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//               <h3 className="text-base sm:text-lg font-bold text-gray-900">الفلاتر والتصفية</h3>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {/* Categories Filter */}
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <label className="block text-sm font-bold text-gray-900 mb-3">التصنيفات</label>
//                 <div className="space-y-2.5">
//                   <label className="flex items-center cursor-pointer group">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={selectedCategoryId === null}
//                       onChange={() => handleCategorySelect(null)}
//                       className="w-4 h-4 text-blue-600 cursor-pointer"
//                     />
//                     <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors ml-3">
//                       جميع التصنيفات
//                     </span>
//                   </label>
//                   {[1, 2, 3, 4].map((id) => (
//                     <label key={id} className="flex items-center cursor-pointer group">
//                       <input
//                         type="radio"
//                         name="category"
//                         checked={selectedCategoryId === id}
//                         onChange={() => handleCategorySelect(id)}
//                         className="w-4 h-4 text-blue-600 cursor-pointer"
//                       />
//                       <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors ml-3">
//                         التصنيف {id}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Filter */}
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <label className="block text-sm font-bold text-gray-900 mb-3">نطاق السعر</label>
//                 <p className="text-xs text-gray-500">قريباً: فلاتر السعر</p>
//               </div>

//               {/* Rating Filter */}
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <label className="block text-sm font-bold text-gray-900 mb-3">التقييم</label>
//                 <p className="text-xs text-gray-500">قريباً: فلاتر التقييم</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products List */}
//         <ProductsList 
//           categoryId={selectedCategoryId}
//           searchQuery={searchQuery}
//           viewMode={viewMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;







// // pages/SearchPage.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Search, X, Grid, List, SlidersHorizontal, Home, ChevronRight } from 'lucide-react';
// import ProductsList from '../components/App-components/Product/ProductsList';
// import { useCategories } from '../hooks/useCategory';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Badge } from '../components/ui/badge';

// const SearchPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { categories, isLoading: categoriesLoading } = useCategories();
  
//   const urlQuery = searchParams.get('q') || '';
//   const urlCategoryId = searchParams.get('category');
//   const urlViewMode = searchParams.get('view') as 'grid' | 'list' || 'grid';
  
//   const [searchQuery, setSearchQuery] = useState(urlQuery);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     urlCategoryId ? parseInt(urlCategoryId) : null
//   );
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>(urlViewMode);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [localSearch, setLocalSearch] = useState(urlQuery);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (localSearch !== urlQuery) {
//         if (localSearch.trim()) {
//           searchParams.set('q', localSearch.trim());
//         } else {
//           searchParams.delete('q');
//         }
//         setSearchParams(searchParams);
//         setSearchQuery(localSearch.trim());
//       }
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [localSearch, searchParams, setSearchParams, urlQuery]);

//   useEffect(() => {
//     setSearchQuery(urlQuery);
//     setLocalSearch(urlQuery);
//   }, [urlQuery]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (localSearch.trim()) {
//       searchParams.set('q', localSearch.trim());
//     } else {
//       searchParams.delete('q');
//     }
//     setSearchParams(searchParams);
//     setSearchQuery(localSearch.trim());
//   };

//   const handleCategorySelect = (categoryId: number | null) => {
//     setSelectedCategoryId(categoryId);
    
//     if (categoryId) {
//       searchParams.set('category', categoryId.toString());
//     } else {
//       searchParams.delete('category');
//     }
//     setSearchParams(searchParams);
//   };

//   const handleViewModeChange = (mode: 'grid' | 'list') => {
//     setViewMode(mode);
//     searchParams.set('view', mode);
//     setSearchParams(searchParams);
//   };

//   const clearAllFilters = () => {
//     setSelectedCategoryId(null);
//     setLocalSearch('');
//     setSearchQuery('');
//     setSearchParams({});
//   };

//   const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

//   return (
//     <div className="min-h-screen bg-white pb-24 sm:pb-0">
//       {/* Breadcrumb Navigation */}
//       <div className="border-b border-gray-200 bg-white sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
//           <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
//             <button 
//               onClick={() => navigate('/')}
//               className="flex items-center gap-1 hover:text-gray-900 transition-colors"
//             >
//               <Home className="w-4 h-4" />
//               <span className="hidden sm:inline">الرئيسية</span>
//             </button>
//             <ChevronRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold">البحث</span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
//         {/* Search Bar Section with Filters Sidebar */}
//         <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
//           {/* Search Area - 3 columns on desktop */}
//           <div className="lg:col-span-3">
//             <form onSubmit={handleSubmit} className="w-full">
//               <div className="relative group">
//                 <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
//                 <Input
//                   type="text"
//                   placeholder="ابحث عن المنتجات..."
//                   value={localSearch}
//                   onChange={(e) => setLocalSearch(e.target.value)}
//                   className="w-full pl-12 sm:pl-14 pr-3 sm:pr-4 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
//                 />
//                 <Button 
//                   type="submit" 
//                   className="absolute left-1.5 sm:left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all"
//                 >
//                   بحث
//                 </Button>
//               </div>
//             </form>
//             <p className="text-center text-gray-500 text-xs mt-2 sm:text-sm">
//               ابحث بالعربية أو الإنجليزية
//             </p>
//           </div>

//           {/* Quick Filters Sidebar - 1 column on desktop */}
//           <div className="bg-white border border-gray-200 rounded-lg p-4 h-fit">
//             <h3 className="text-sm font-bold text-gray-900 mb-4">الفلاتر السريعة</h3>
//             <div className="space-y-2.5">
//               <label className="flex items-center cursor-pointer group">
//                 <input
//                   type="radio"
//                   name="quick-category"
//                   checked={selectedCategoryId === null}
//                   onChange={() => handleCategorySelect(null)}
//                   className="w-4 h-4 text-blue-600 cursor-pointer"
//                 />
//                 <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors ml-3">جميع الأقسام</span>
//               </label>
//               {categoriesLoading ? (
//                 <p className="text-xs text-gray-500">جاري التحميل...</p>
//               ) : categories.length > 0 ? (
//                 categories.map((category) => (
//                   <label key={category.id} className="flex items-center cursor-pointer group">
//                     <input
//                       type="radio"
//                       name="quick-category"
//                       checked={selectedCategoryId === category.id}
//                       onChange={() => handleCategorySelect(category.id)}
//                       className="w-4 h-4 text-blue-600 cursor-pointer"
//                     />
//                     <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors ml-3 truncate">
//                       {category.name_ar || category.name}
//                     </span>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-xs text-gray-500">لا توجد أقسام</p>
//               )}
//             </div>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setIsFilterOpen(true)}
//               className="w-full text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-4 font-medium"
//             >
//               فلاتر متقدمة
//             </Button>
//           </div>
//         </div>

//         {/* Header & Controls Section */}
//         <div className="mb-6">
//           <div className="flex flex-col gap-4 mb-4">
//             <div className="flex items-center justify-between gap-3">
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
//                   {searchQuery ? `نتائج: "${searchQuery}"` : 'جميع المنتجات'}
//                 </h1>
//                 <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                   {searchQuery ? 'اختر المنتج الذي يناسبك' : 'استعرض المنتجات المتاحة'}
//                 </p>
//               </div>
//             </div>

//             {/* Control Buttons */}
//             <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
//               <Button
//                 variant={isFilterOpen ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//                 className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all flex-shrink-0 ${
//                   isFilterOpen 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//                 <span className="hidden sm:inline">فلاتر</span>
//                 {hasActiveFilters && (
//                   <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
//                     1
//                   </Badge>
//                 )}
//               </Button>

//               <div className="flex border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => handleViewModeChange('grid')}
//                   className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-none text-sm transition-all ${
//                     viewMode === 'grid'
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                   title="عرض الشبكة"
//                 >
//                   <Grid className="w-4 h-4" />
//                 </Button>
//                 <div className="w-px bg-gray-300" />
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => handleViewModeChange('list')}
//                   className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-none text-sm transition-all ${
//                     viewMode === 'list'
//                       ? 'bg-blue-600 text-white'
//                       : 'text-gray-600 hover:bg-gray-50'
//                   }`}
//                   title="عرض القائمة"
//                 >
//                   <List className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* Active Filters Display */}
//           {hasActiveFilters && (
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <span className="text-xs sm:text-sm font-semibold text-gray-700">الفلاتر:</span>
              
//               {searchQuery && (
//                 <Badge className="flex items-center gap-1.5 bg-white text-blue-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-blue-200 text-xs sm:text-sm font-medium">
//                   <Search className="w-3 h-3" />
//                   {searchQuery}
//                   <button
//                     onClick={() => {
//                       setLocalSearch('');
//                       setSearchQuery('');
//                       searchParams.delete('q');
//                       setSearchParams(searchParams);
//                     }}
//                     className="hover:text-blue-900 transition-colors"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </Badge>
//               )}
              
//               {selectedCategoryId && (
//                 <Badge className="flex items-center gap-1.5 bg-white text-green-700 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-green-200 text-xs sm:text-sm font-medium">
//                   {categories.find(c => c.id === selectedCategoryId)?.name_ar || categories.find(c => c.id === selectedCategoryId)?.name}
//                   <button
//                     onClick={() => handleCategorySelect(null)}
//                     className="hover:text-green-900 transition-colors"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </Badge>
//               )}
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={clearAllFilters}
//                 className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-medium ml-auto"
//               >
//                 <X className="w-3 h-3 ml-1" />
//                 مسح
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Filters Panel */}
//         {isFilterOpen && (
//           <div className="mb-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-sm">
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//               <h3 className="text-base sm:text-lg font-bold text-gray-900">الفلاتر والتصفية</h3>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setIsFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
//               >
//                 <X className="w-5 h-5" />
//               </Button>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//               {/* Categories Filter */}
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <label className="block text-sm font-bold text-gray-900 mb-3">التصنيفات</label>
//                 <div className="space-y-2.5">
//                   <label className="flex items-center cursor-pointer group">
//                     <input
//                       type="radio"
//                       name="category"
//                       checked={selectedCategoryId === null}
//                       onChange={() => handleCategorySelect(null)}
//                       className="w-4 h-4 text-blue-600 cursor-pointer"
//                     />
//                     <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors ml-3">
//                       جميع التصنيفات
//                     </span>
//                   </label>
//                   {[1, 2, 3, 4].map((id) => (
//                     <label key={id} className="flex items-center cursor-pointer group">
//                       <input
//                         type="radio"
//                         name="category"
//                         checked={selectedCategoryId === id}
//                         onChange={() => handleCategorySelect(id)}
//                         className="w-4 h-4 text-blue-600 cursor-pointer"
//                       />
//                       <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors ml-3">
//                         التصنيف {id}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Filter */}
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <label className="block text-sm font-bold text-gray-900 mb-3">نطاق السعر</label>
//                 <p className="text-xs text-gray-500">قريباً: فلاتر السعر</p>
//               </div>

//               {/* Rating Filter */}
//               <div className="border border-gray-200 rounded-lg p-4">
//                 <label className="block text-sm font-bold text-gray-900 mb-3">التقييم</label>
//                 <p className="text-xs text-gray-500">قريباً: فلاتر التقييم</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products List */}
//         <ProductsList 
//           categoryId={selectedCategoryId}
//           searchQuery={searchQuery}
//           viewMode={viewMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchPage;




// pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, Grid, List, SlidersHorizontal, Home, ChevronRight, Filter } from 'lucide-react';
import ProductsList from '../components/App-components/Product/ProductsList';
import { useCategories } from '../hooks/useCategory';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, isLoading: categoriesLoading } = useCategories();
  
  const urlQuery = searchParams.get('q') || '';
  const urlCategoryId = searchParams.get('category');
  const urlViewMode = searchParams.get('view') as 'grid' | 'list' || 'grid';
  
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    urlCategoryId ? parseInt(urlCategoryId) : null
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(urlViewMode);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(urlQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== urlQuery) {
        if (localSearch.trim()) {
          searchParams.set('q', localSearch.trim());
        } else {
          searchParams.delete('q');
        }
        setSearchParams(searchParams);
        setSearchQuery(localSearch.trim());
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, searchParams, setSearchParams, urlQuery]);

  useEffect(() => {
    setSearchQuery(urlQuery);
    setLocalSearch(urlQuery);
  }, [urlQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      searchParams.set('q', localSearch.trim());
    } else {
      searchParams.delete('q');
    }
    setSearchParams(searchParams);
    setSearchQuery(localSearch.trim());
  };

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    
    if (categoryId) {
      searchParams.set('category', categoryId.toString());
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    searchParams.set('view', mode);
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setLocalSearch('');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

  return (
    <div className="min-h-screen bg-gray-50 pb-24 sm:pb-0">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1 hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </button>
            <ChevronRight className="w-4 h-4 rotate-180 text-gray-400" />
            <span className="text-gray-900 font-semibold">البحث</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Header Section */}
        {/* <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {searchQuery ? `نتائج البحث: "${searchQuery}"` : 'جميع المنتجات'}
          </h1>
          <p className="text-gray-600">
            {searchQuery ? 'اختر المنتج الذي يناسبك من نتائج البحث' : 'استعرض جميع المنتجات المتاحة'}
          </p>
        </div> */}

        {/* Search and Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 w-full lg:max-w-2xl">
              <form onSubmit={handleSubmit}>
                <div className="relative group">
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                  <Input
                    type="text"
                    placeholder="ابحث عن المنتجات بالعربية أو الإنجليزية..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Button 
                    type="submit" 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm"
                  >
                    بحث
                  </Button>
                </div>
              </form>
            </div>

            {/* Controls - Filters and View Toggle */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Filters Button */}
              <Button
                variant={isFilterOpen ? "default" : "outline"}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                  isFilterOpen 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 bg-white'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>الفلاتر</span>
                {hasActiveFilters && (
                  <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full ml-1">
                    !
                  </Badge>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewModeChange('grid')}
                  className={`px-3 py-2 rounded-md text-sm transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="عرض الشبكة"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewModeChange('list')}
                  className={`px-3 py-2 rounded-md text-sm transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="عرض القائمة"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                الفلاتر النشطة:
              </span>
              
              {searchQuery && (
                <Badge className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-200 text-sm font-medium">
                  <Search className="w-3 h-3" />
                  {searchQuery}
                  <button
                    onClick={() => {
                      setLocalSearch('');
                      setSearchQuery('');
                      searchParams.delete('q');
                      setSearchParams(searchParams);
                    }}
                    className="hover:text-blue-900 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              
              {selectedCategoryId && (
                <Badge className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200 text-sm font-medium">
                  {categories.find(c => c.id === selectedCategoryId)?.name_ar || categories.find(c => c.id === selectedCategoryId)?.name}
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className="hover:text-green-900 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-medium mr-auto"
              >
                <X className="w-4 h-4 ml-1" />
                مسح الكل
              </Button>
            </div>
          )}
        </div>

        {/* Advanced Filters Panel */}
        {isFilterOpen && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">الفلاتر المتقدمة</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Categories Filter */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900">التصنيفات</label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  <label className="flex items-center cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategoryId === null}
                      onChange={() => handleCategorySelect(null)}
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors mr-3">
                      جميع التصنيفات
                    </span>
                  </label>
                  {categoriesLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <label key={category.id} className="flex items-center cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategoryId === category.id}
                          onChange={() => handleCategorySelect(category.id)}
                          className="w-4 h-4 text-blue-600 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors mr-3 truncate">
                          {category.name_ar || category.name}
                        </span>
                      </label>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-2">لا توجد تصنيفات</p>
                  )}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900">نطاق السعر</label>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">فلاتر السعر قريباً</p>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900">مستوى التقييم</label>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">فلاتر التقييم قريباً</p>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900">الحالة</label>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">فلاتر الحالة قريباً</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ProductsList 
            categoryId={selectedCategoryId}
            searchQuery={searchQuery}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;