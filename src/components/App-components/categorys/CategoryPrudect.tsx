// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { useCategories } from '../../../hooks/useCategory';
// // import { useCategoryProducts } from '../../../hooks/useCategory'; // استخدم هذا الهوك الجديد
// // import Catpro from './Catpro';
// // import { Button } from '../../ui/button';
// // import { Input } from '../../ui/input';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// // import { Search, Filter, Grid, List, ArrowRight, Home, Loader2 } from 'lucide-react';

// // const CategoryProducts: React.FC = () => {
// //   const { categoryId } = useParams<{ categoryId: string }>();
// //   const navigate = useNavigate();
  
// //   // تحويل categoryId إلى رقم والتأكد من صحته
// //   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
// //   const isValidCategoryId = !isNaN(numericCategoryId) && numericCategoryId > 0;

// //   const { categories } = useCategories();
// //   const [sortBy, setSortBy] = useState<string>('newest');
// //   const [searchTerm, setSearchTerm] = useState<string>('');
// //   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

// //   // استخدام الهوك المعدل لجلب منتجات التصنيف
// //   const { 
// //     products, 
// //     isLoading, 
// //     error, 
// //     refetch,
// //     category 
// //   } = useCategoryProducts(numericCategoryId, {
// //     sortBy,
// //     enabled: isValidCategoryId // تفعيل فقط إذا كان ال ID صحيح
// //   });

// //   // العثور على التصنيف الحالي من قائمة التصنيفات كنسخة احتياطية
// //   const currentCategoryFromList = categories.find(cat => cat.id === numericCategoryId);
  
// //   // استخدام البيانات من الهوك أو من القائمة
// //   const currentCategory = category || currentCategoryFromList;

// //   // تصفية المنتجات بناءً على البحث
// //   const filteredProducts = products.filter(product =>
// //     product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     product.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   // إذا كان ال ID غير صحيح
// //   if (!isValidCategoryId) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">التصنيف غير موجود</h2>
// //           <Button onClick={() => navigate('/')}>
// //             العودة للرئيسية
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
// //           <p className="text-gray-600">جاري تحميل المنتجات...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في تحميل المنتجات</h2>
// //           <p className="text-gray-600 mb-4">{error}</p>
// //           <Button onClick={refetch}>
// //             إعادة المحاولة
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* الهيدر */}
// //       <header className="bg-white shadow-sm border-b">
// //         <div className="container mx-auto px-4 py-6">
// //           {/* مسار التنقل */}
// //           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
// //             <Button
// //               variant="ghost"
// //               onClick={() => navigate('/')}
// //               className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
// //             >
// //               <Home className="w-4 h-4" />
// //               الرئيسية
// //             </Button>
// //             <ArrowRight className="w-4 h-4 rotate-180" />
// //             <Button
// //               variant="ghost"
// //               onClick={() => navigate('/categories')}
// //               className="text-gray-600 hover:text-gray-900"
// //             >
// //               التصنيفات
// //             </Button>
// //             <ArrowRight className="w-4 h-4 rotate-180" />
// //             <span className="text-gray-900 font-medium">
// //               {currentCategory?.name_ar || currentCategory?.name || 'التصنيف'}
// //             </span>
// //           </nav>

// //           {/* عنوان التصنيف */}
// //           <div className="flex items-center gap-4 mb-6">
// //             <div
// //               className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
// //               style={{ backgroundColor: currentCategory?.color || '#3B82F6' }}
// //             >
// //               {currentCategory?.icon || '📦'}
// //             </div>
// //             <div>
// //               <h1 className="text-3xl font-bold text-gray-900">
// //                 {currentCategory?.name_ar || currentCategory?.name || 'التصنيف'}
// //               </h1>
// //               <p className="text-gray-600 mt-1">
// //                 {filteredProducts.length} منتج متوفر
// //               </p>
// //             </div>
// //           </div>

// //           {/* شريط البحث والتصفية */}
// //           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
// //             <div className="flex-1 w-full lg:max-w-md">
// //               <div className="relative">
// //                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                 <Input
// //                   type="text"
// //                   placeholder="ابحث في المنتجات..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pr-10 text-right"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-4 w-full lg:w-auto">
// //               {/* زر التبديل بين العرض الشبكي والعمودي */}
// //               <div className="flex items-center gap-1 bg-white border rounded-lg p-1">
// //                 <Button
// //                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
// //                   size="sm"
// //                   onClick={() => setViewMode('grid')}
// //                   className="h-8 w-8 p-0"
// //                 >
// //                   <Grid className="w-4 h-4" />
// //                 </Button>
// //                 <Button
// //                   variant={viewMode === 'list' ? 'default' : 'ghost'}
// //                   size="sm"
// //                   onClick={() => setViewMode('list')}
// //                   className="h-8 w-8 p-0"
// //                 >
// //                   <List className="w-4 h-4" />
// //                 </Button>
// //               </div>

// //               {/* ترتيب المنتجات */}
// //               <Select value={sortBy} onValueChange={setSortBy}>
// //                 <SelectTrigger className="w-40">
// //                   <SelectValue placeholder="ترتيب حسب" />
// //                 </SelectTrigger>
// //                 <SelectContent>
// //                   <SelectItem value="name">الاسم</SelectItem>
// //                   <SelectItem value="price">السعر من الأقل للأعلى</SelectItem>
// //                   <SelectItem value="price_desc">السعر من الأعلى للأقل</SelectItem>
// //                   <SelectItem value="rating">الأعلى تقييماً</SelectItem>
// //                   <SelectItem value="newest">الأحدث</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* المحتوى الرئيسي */}
// //       <main className="container mx-auto px-4 py-8">
// //         {filteredProducts.length === 0 ? (
// //           <div className="text-center py-16">
// //             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <Search className="w-8 h-8 text-gray-400" />
// //             </div>
// //             <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //               لا توجد منتجات
// //             </h3>
// //             <p className="text-gray-600 mb-6">
// //               {searchTerm ? 'لم نتمكن من العثور على منتجات تطابق بحثك.' : 'لا توجد منتجات في هذا التصنيف حالياً.'}
// //             </p>
// //             {searchTerm && (
// //               <Button onClick={() => setSearchTerm('')}>
// //                 عرض كل المنتجات
// //               </Button>
// //             )}
// //           </div>
// //         ) : (
// //           <div className={
// //             viewMode === 'grid' 
// //               ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
// //               : "space-y-4"
// //           }>
// //             {filteredProducts.map((product) => (
// //               <Catpro
// //                 key={product.id}
// //                 product={product}
// //                 variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default CategoryProducts;




// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { useCategories } from '../../../hooks/useCategory';
// // import { useCategoryProducts } from '../../../hooks/useCategory';
// // import Catpro from './Catpro';
// // import { Button } from '../../ui/button';
// // import { Input } from '../../ui/input';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// // import { Search, Filter, Grid, List, ArrowRight, Home, Loader2, SlidersHorizontal, X } from 'lucide-react';

// // const CategoryProducts: React.FC = () => {
// //   const { categoryId } = useParams<{ categoryId: string }>();
// //   const navigate = useNavigate();
  
// //   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
// //   const isValidCategoryId = !isNaN(numericCategoryId) && numericCategoryId > 0;

// //   const { categories } = useCategories();
// //   const [sortBy, setSortBy] = useState<string>('newest');
// //   const [searchTerm, setSearchTerm] = useState<string>('');
// //   const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
// //   const [showFilters, setShowFilters] = useState(false);
// //   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

// //   const { 
// //     products, 
// //     isLoading, 
// //     error, 
// //     refetch,
// //     category 
// //   } = useCategoryProducts(numericCategoryId, {
// //     sortBy,
// //     enabled: isValidCategoryId
// //   });

// //   const currentCategoryFromList = categories.find(cat => cat.id === numericCategoryId);
// //   const currentCategory = category || currentCategoryFromList;

// //   // تصفية المنتجات
// //   const filteredProducts = products.filter(product => {
// //     const matchesSearch = product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                          product.name.toLowerCase().includes(searchTerm.toLowerCase());
// //     const productPrice = parseFloat(product.price);
// //     const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
    
// //     return matchesSearch && matchesPrice;
// //   });

// //   if (!isValidCategoryId) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
// //           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <X className="w-10 h-10 text-red-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">التصنيف غير موجود</h2>
// //           <Button 
// //             onClick={() => navigate('/')}
// //             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
// //           >
// //             العودة للرئيسية
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="relative">
// //             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
// //             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-20 animate-pulse"></div>
// //           </div>
// //           <p className="text-gray-700 text-lg font-medium">جاري تحميل المنتجات...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
// //         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
// //           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //             <X className="w-10 h-10 text-red-600" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
// //           <p className="text-gray-600 mb-6">{error}</p>
// //           <Button 
// //             onClick={refetch}
// //             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
// //           >
// //             إعادة المحاولة
// //           </Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
// //       {/* الهيدر */}
// //       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
// //         <div className="container mx-auto px-4 py-6">
// //           {/* مسار التنقل */}
// //           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
// //             <Button
// //               variant="ghost"
// //               onClick={() => navigate('/')}
// //               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
// //             >
// //               <Home className="w-4 h-4" />
// //               الرئيسية
// //             </Button>
// //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
// //             <Button
// //               variant="ghost"
// //               onClick={() => navigate('/categories')}
// //               className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
// //             >
// //               التصنيفات
// //             </Button>
// //             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
// //             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
// //               {currentCategory?.name_ar || currentCategory?.name || 'التصنيف'}
// //             </span>
// //           </nav>

// //           {/* عنوان التصنيف */}
// //           <div className="flex items-center gap-6 mb-8">
// //             <div
// //               className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-2xl border-4 border-white"
// //               style={{ 
// //                 background: currentCategory?.color 
// //                   ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
// //                   : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
// //               }}
// //             >
// //               {currentCategory?.icon || '📦'}
// //             </div>
// //             <div className="flex-1">
// //               <h1 className="text-4xl font-bold text-gray-900 mb-2">
// //                 {currentCategory?.name_ar || currentCategory?.name || 'التصنيف'}
// //               </h1>
// //               <div className="flex items-center gap-6 text-gray-600">
// //                 <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">
// //                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                   {filteredProducts.length} منتج متوفر
// //                 </span>
// //                 <span className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full text-sm font-medium">
// //                   💫 تصنيف نشط
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* شريط البحث والتصفية */}
// //           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
// //             <div className="flex-1 w-full lg:max-w-xl">
// //               <div className="relative">
// //                 <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
// //                 <Input
// //                   type="text"
// //                   placeholder="ابحث في منتجات التصنيف..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pr-12 text-right h-12 text-lg rounded-2xl border-2 border-gray-200/50 focus:border-blue-500 focus:ring-0 bg-white/50 backdrop-blur-sm"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-3 w-full lg:w-auto">
// //               {/* زر الفلاتر */}
// //               <Button
// //                 variant="outline"
// //                 onClick={() => setShowFilters(!showFilters)}
// //                 className="h-12 px-4 rounded-2xl border-2 border-gray-200/50 hover:border-blue-500 transition-all"
// //               >
// //                 <SlidersHorizontal className="w-4 h-4 ml-2" />
// //                 الفلاتر
// //               </Button>

// //               {/* زر التبديل بين العرض */}
// //               <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl p-1">
// //                 <Button
// //                   variant={viewMode === 'single' ? 'default' : 'ghost'}
// //                   size="sm"
// //                   onClick={() => setViewMode('single')}
// //                   className="h-10 w-10 p-0 rounded-xl transition-all"
// //                 >
// //                   <List className="w-4 h-4" />
// //                 </Button>
// //                 <Button
// //                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
// //                   size="sm"
// //                   onClick={() => setViewMode('grid')}
// //                   className="h-10 w-10 p-0 rounded-xl transition-all"
// //                 >
// //                   <Grid className="w-4 h-4" />
// //                 </Button>
// //               </div>

// //               {/* ترتيب المنتجات */}
// //               <Select value={sortBy} onValueChange={setSortBy}>
// //                 <SelectTrigger className="w-48 h-12 rounded-2xl border-2 border-gray-200/50 focus:border-blue-500 focus:ring-0 bg-white/50 backdrop-blur-sm">
// //                   <SelectValue placeholder="ترتيب حسب" />
// //                 </SelectTrigger>
// //                 <SelectContent className="rounded-2xl border-2 border-gray-200/50">
// //                   <SelectItem value="name" className="text-right">الاسم</SelectItem>
// //                   <SelectItem value="price" className="text-right">السعر من الأقل للأعلى</SelectItem>
// //                   <SelectItem value="price_desc" className="text-right">السعر من الأعلى للأقل</SelectItem>
// //                   <SelectItem value="rating" className="text-right">الأعلى تقييماً</SelectItem>
// //                   <SelectItem value="newest" className="text-right">الأحدث</SelectItem>
// //                 </SelectContent>
// //               </Select>
// //             </div>
// //           </div>

// //           {/* الفلاتر */}
// //           {showFilters && (
// //             <div className="mt-6 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-gray-200/50">
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-3">نطاق السعر</label>
// //                   <div className="space-y-2">
// //                     <input
// //                       type="range"
// //                       min="0"
// //                       max="1000"
// //                       value={priceRange[1]}
// //                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
// //                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
// //                     />
// //                     <div className="flex justify-between text-sm text-gray-600">
// //                       <span>{priceRange[0]} د.ع</span>
// //                       <span>{priceRange[1]} د.ع</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </header>

// //       {/* المحتوى الرئيسي */}
// //       <main className="container mx-auto px-4 py-8">
// //         {filteredProducts.length === 0 ? (
// //           <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-gray-200/50">
// //             <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
// //               <Search className="w-16 h-16 text-blue-600" />
// //             </div>
// //             <h3 className="text-3xl font-bold text-gray-900 mb-4">
// //               {searchTerm ? 'لا توجد نتائج' : 'لا توجد منتجات'}
// //             </h3>
// //             <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
// //               {searchTerm 
// //                 ? 'لم نتمكن من العثور على منتجات تطابق بحثك. حاول استخدام كلمات أخرى.'
// //                 : 'لا توجد منتجات في هذا التصنيف حالياً.'}
// //             </p>
// //             {searchTerm && (
// //               <Button 
// //                 onClick={() => setSearchTerm('')}
// //                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
// //               >
// //                 عرض كل المنتجات
// //               </Button>
// //             )}
// //           </div>
// //         ) : viewMode === 'single' ? (
// //           // عرض كارت واحد في الصف
// //           <div className="space-y-6 max-w-6xl mx-auto">
// //             {filteredProducts.map((product) => (
// //               <div key={product.id} className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200/50 hover:shadow-3xl transition-all duration-500 hover:border-blue-200/50">
// //                 <Catpro
// //                   product={product}
// //                   variant="horizontal"
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           // العرض الشبكي (إذا أردت الاحتفاظ به)
// //           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
// //             {filteredProducts.map((product) => (
// //               <div key={product.id} className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200/50 hover:shadow-3xl transition-all duration-500 hover:border-blue-200/50">
// //                 <Catpro
// //                   product={product}
// //                   variant="vertical"
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* إحصائيات الصفحة */}
// //         {filteredProducts.length > 0 && (
// //           <div className="mt-12 text-center">
// //             <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-200/50 inline-block">
// //               <p className="text-gray-600">
// //                 عرض <span className="font-bold text-blue-600">{filteredProducts.length}</span> من أصل{' '}
// //                 <span className="font-bold text-purple-600">{products.length}</span> منتج
// //               </p>
// //             </div>
// //           </div>
// //         )}
// //       </main>
// //     </div>
// //   );
// // };

// // export default CategoryProducts;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCategories } from '../../../hooks/useCategory';
// import { useCategoryProducts } from '../../../hooks/useCategory';
// import Catpro from './CatPro';
// import { Button } from '../../ui/button';
// import { Input } from '../../ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// import { Search, Filter, Grid, List, ArrowRight, Home, Loader2, SlidersHorizontal, X, Star } from 'lucide-react';

// const CategoryProducts: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
  
//   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
//   const isValidCategoryId = !isNaN(numericCategoryId) && numericCategoryId > 0;

//   const { categories } = useCategories();
//   const [sortBy, setSortBy] = useState<string>('newest');
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [showSearch, setShowSearch] = useState(false);

//   const { 
//     products, 
//     isLoading, 
//     error, 
//     refetch,
//     category 
//   } = useCategoryProducts(numericCategoryId, {
//     sortBy,
//     enabled: isValidCategoryId
//   });

//   const currentCategoryFromList = categories.find(cat => cat.id === numericCategoryId);
//   const currentCategory = category || currentCategoryFromList;
// console.log('categories', category)
//   // دالة لبناء رابط الصورة الكامل للتصنيف
//   const getFullCategoryImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/categories/${imageUrl}`;
//   };

//   // تصفية المنتجات
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = !searchTerm || 
//       product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const productPrice = parseFloat(product.price);
//     const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
    
//     return matchesSearch && matchesPrice;
//   });

//   // إعادة تعيين الفلاتر عند تغيير التصنيف
//   useEffect(() => {
//     setSearchTerm('');
//     setPriceRange([0, 1000]);
//     setShowFilters(false);
//     setShowSearch(false);
//   }, [categoryId]);

//   // إغلاق الفلاتر عند التمرير
//   useEffect(() => {
//     const handleScroll = () => {
//       if (showFilters) {
//         setShowFilters(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [showFilters]);

//   if (!isValidCategoryId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">التصنيف غير موجود</h2>
//           <Button 
//             onClick={() => navigate('/')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             العودة للرئيسية
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-20 animate-pulse"></div>
//           </div>
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل المنتجات...</p>
//           <p className="text-gray-500 text-sm mt-2">تصنيف: {currentCategory?.name_ar || currentCategory?.name}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Button 
//             onClick={refetch}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             إعادة المحاولة
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const categoryImageUrl = getFullCategoryImageUrl(currentCategory?.image_url);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* الهيدر */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
//         <div className="container mx-auto px-4 py-4">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/categories')}
//               className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               التصنيفات
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {currentCategory?.name_ar || currentCategory?.name || 'التصنيف'}
//             </span>
//           </nav>

//           {/* عنوان التصنيف */}
//           <div className="flex items-center gap-4 mb-6">
//             <div className="relative">
//               <div
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white overflow-hidden"
//                 style={{ 
//                   background: currentCategory?.color 
//                     ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
//                     : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
//                 }}
//               >
//                 {categoryImageUrl ? (
//                   <img
//                     src={categoryImageUrl}
//                     alt={currentCategory?.name_ar || currentCategory?.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span>{currentCategory?.icon || '📦'}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                 {currentCategory?.name_ar || currentCategory?.name || 'التصنيف'}
//               </h1>
//               <div className="flex items-center gap-4 text-gray-600">
//                 <span className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-full text-xs font-medium">
//                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
//                   {filteredProducts.length} منتج متوفر
//                 </span>
//               </div>
//             </div>

//             {/* أزرار التحكم */}
//             <div className="flex items-center gap-2">
//               {/* زر البحث */}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setShowSearch(!showSearch)}
//                 className="h-10 w-10 p-0 rounded-xl"
//               >
//                 <Search className="w-4 h-4" />
//               </Button>

//               {/* زر الفلاتر */}
//               <Button
//                 variant={showFilters ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`h-10 px-3 rounded-xl border transition-all ${
//                   showFilters 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 hover:border-blue-500'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//               </Button>

//               {/* زر التبديل بين العرض */}
//               <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض شبكي"
//                 >
//                   <Grid className="w-3 h-3" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض قائمة"
//                 >
//                   <List className="w-3 h-3" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* شريط البحث */}
//           {showSearch && (
//             <div className="mb-4">
//               <div className="relative">
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   type="text"
//                   placeholder="ابحث في منتجات التصنيف..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pr-10 text-right h-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white"
//                 />
//               </div>
//             </div>
//           )}

//           {/* الفلاتر */}
//           {showFilters && (
//             <div className="mb-4 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-base font-semibold text-gray-900">الفلاتر</h3>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setPriceRange([0, 1000]);
//                     }}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
//                   >
//                     إعادة التعيين
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowFilters(false)}
//                     className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs"
//                   >
//                     <X className="w-3 h-3" />
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر (د.ع)</label>
//                   <div className="space-y-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max="1000"
//                       step="10"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                     />
//                     <div className="flex justify-between text-xs text-gray-600">
//                       <span className="bg-blue-100 px-2 py-1 rounded">{priceRange[0]} د.ع</span>
//                       <span className="bg-green-100 px-2 py-1 rounded">{priceRange[1]} د.ع</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-full h-9 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white">
//                       <SelectValue placeholder="ترتيب حسب" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-xl border-2 border-gray-200">
//                       <SelectItem value="name" className="text-right">الاسم</SelectItem>
//                       <SelectItem value="price" className="text-right">السعر من الأقل للأعلى</SelectItem>
//                       <SelectItem value="price_desc" className="text-right">السعر من الأعلى للأقل</SelectItem>
//                       <SelectItem value="rating" className="text-right">الأعلى تقييماً</SelectItem>
//                       <SelectItem value="newest" className="text-right">الأحدث</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-4 py-6">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-12 h-12 text-blue-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               {searchTerm || priceRange[1] < 1000 ? 'لا توجد نتائج' : 'لا توجد منتجات'}
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {searchTerm 
//                 ? 'لم نتمكن من العثور على منتجات تطابق بحثك.'
//                 : priceRange[1] < 1000
//                 ? 'لا توجد منتجات في نطاق السعر المحدد.'
//                 : 'لا توجد منتجات في هذا التصنيف حالياً.'}
//             </p>
//             <div className="flex gap-3 justify-center">
//               {(searchTerm || priceRange[1] < 1000) && (
//                 <Button 
//                   onClick={() => {
//                     setSearchTerm('');
//                     setPriceRange([0, 1000]);
//                   }}
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//                 >
//                   عرض كل المنتجات
//                 </Button>
//               )}
//               <Button 
//                 variant="outline"
//                 onClick={() => navigate('/categories')}
//                 className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 py-2 rounded-xl font-semibold transition-all"
//               >
//                 استعرض التصنيفات
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* عرض 2 كارت في الصف */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px]"
//                 >
//                   <Catpro
//                     product={product}
//                     variant="vertical"
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* إحصائيات الصفحة */}
//             <div className="mt-8 text-center">
//               <div className="bg-white rounded-xl p-4 border-2 border-gray-200 inline-block">
//                 <div className="flex items-center gap-6 text-sm text-gray-600">
//                   <span>
//                     عرض <span className="font-bold text-blue-600">{filteredProducts.length}</span> من أصل{' '}
//                     <span className="font-bold text-purple-600">{products.length}</span> منتج
//                   </span>
//                   {searchTerm && (
//                     <span className="flex items-center gap-1">
//                       <Search className="w-3 h-3" />
//                       البحث: "{searchTerm}"
//                     </span>
//                   )}
//                   {priceRange[1] < 1000 && (
//                     <span className="flex items-center gap-1">
//                       <Filter className="w-3 h-3" />
//                       السعر: حتى {priceRange[1]} د.ع
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       {/* الفوتر */}
//       <footer className="bg-white border-t border-gray-200 mt-8">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center text-gray-600 text-sm">
//             <p>© 2024 جميع الحقوق محفوظة. {currentCategory?.name_ar || currentCategory?.name}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CategoryProducts;

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCategories } from '../../../hooks/useCategory';
// import { useCategoryProducts } from '../../../hooks/useCategory';
// import Catpro from './CatPro';
// import { Button } from '../../ui/button';
// import { Input } from '../../ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// import { Search, Filter, Grid, List, ArrowRight, Home, Loader2, SlidersHorizontal, X, Star } from 'lucide-react';

// const CategoryProducts: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_URL
//   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
//   const isValidCategoryId = !isNaN(numericCategoryId) && numericCategoryId > 0;

//   const { categories, isLoading: categoriesLoading } = useCategories();
//   const [sortBy, setSortBy] = useState<string>('newest');
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [showSearch, setShowSearch] = useState(false);
//   const [categoryImageError, setCategoryImageError] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState<any>(null);

//   const { 
//     products, 
//     isLoading: productsLoading, 
//     error, 
//     refetch,
//     category 
//   } = useCategoryProducts(numericCategoryId, {
//     sortBy,
//     enabled: isValidCategoryId
//   });

//   // دالة لبناء رابط الصورة الكامل للتصنيف
//   const getFullCategoryImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL} ${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/categories/${imageUrl}`;
//   };

//   // دالة لبناء رابط الصورة الكامل للمنتج
//   const getFullProductImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/products/${imageUrl}`;
//   };

//   // تحديث currentCategory عندما تتوفر البيانات
//   useEffect(() => {
//     // if (category) {
//     //   setCurrentCategory(category);
//     // } else {
//       const categoryFromList = categories.find(cat => cat.id === numericCategoryId);
//       if (categoryFromList) {
//         setCurrentCategory(categoryFromList);
//     //   }
//     }
//   }, [category, categories, numericCategoryId]);
// console.log('category', categories)
//   // تصفية المنتجات
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = !searchTerm || 
//       product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const productPrice = parseFloat(product.price);
//     const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
    
//     return matchesSearch && matchesPrice;
//   });

//   // إعادة تعيين الفلاتر عند تغيير التصنيف
//   useEffect(() => {
//     setSearchTerm('');
//     setPriceRange([0, 1000]);
//     setShowFilters(false);
//     setShowSearch(false);
//     setCategoryImageError(false);
//   }, [categoryId]);

//   // إغلاق الفلاتر عند التمرير
//   useEffect(() => {
//     const handleScroll = () => {
//       if (showFilters) {
//         setShowFilters(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [showFilters]);

//   const categoryImageUrl = currentCategory ? getFullCategoryImageUrl(currentCategory.image_url) : null;

//   // تحميل شامل (التصنيفات والمنتجات)
//   const isLoading = categoriesLoading || productsLoading;

//   if (!isValidCategoryId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">التصنيف غير موجود</h2>
//           <Button 
//             onClick={() => navigate('/')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             العودة للرئيسية
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-20 animate-pulse"></div>
//           </div>
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل البيانات...</p>
//           <p className="text-gray-500 text-sm mt-2">تصنيف رقم: {numericCategoryId}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Button 
//             onClick={refetch}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             إعادة المحاولة
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // إذا لم يتم تحميل currentCategory بعد
//   if (!currentCategory) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل معلومات التصنيف...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* الهيدر */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
//         <div className="container mx-auto px-4 pt-4">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/categories')}
//               className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               التصنيفات
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {currentCategory.name_ar || currentCategory.name}
//             </span>
//           </nav>

//           {/* عنوان التصنيف */}
//           <div className="flex items-center gap-4 mb-6">
//             <div className="relative">
//               <div
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white overflow-hidden"
//                 style={{ 
//                   background: currentCategory.color 
//                     ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
//                     : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
//                 }}
//               >
//                 {categoryImageUrl && !categoryImageError ? (
//                   <img
//                     src={categoryImageUrl}
//                     alt={currentCategory.name_ar || currentCategory.name}
//                     className="w-full h-full object-cover"
//                     onError={() => setCategoryImageError(true)}
//                     onLoad={() => setCategoryImageError(false)}
//                   />
//                 ) : (
//                   <span className="text-2xl">{currentCategory.icon || '📦'}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                 {currentCategory.name_ar || currentCategory.name}
//               </h1>
          
//             </div>

//             {/* أزرار التحكم */}
//             <div className="flex items-center gap-2">
//               {/* زر البحث */}
//               <Button
//                 variant={showSearch ? "default" : "ghost"}
//                 size="sm"
//                 onClick={() => setShowSearch(!showSearch)}
//                 className={`h-10 w-10 p-0 rounded-xl transition-all ${
//                   showSearch ? 'bg-blue-600 text-white' : ''
//                 }`}
//               >
//                 <Search className="w-4 h-4" />
//               </Button>

//               {/* زر الفلاتر */}
//               <Button
//                 variant={showFilters ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`h-10 px-3 rounded-xl border transition-all ${
//                   showFilters 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 hover:border-blue-500'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//               </Button>

//               {/* زر التبديل بين العرض */}
//               <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض شبكي"
//                 >
//                   <Grid className="w-3 h-3" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض قائمة"
//                 >
//                   <List className="w-3 h-3" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* شريط البحث */}
//           {showSearch && (
//             <div className="mb-4">
//               <div className="relative">
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   type="text"
//                   placeholder="ابحث في منتجات التصنيف..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pr-10 text-right h-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* الفلاتر */}
//           {showFilters && (
//             <div className="mb-4 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-base font-semibold text-gray-900">الفلاتر</h3>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setPriceRange([0, 1000]);
//                       setSearchTerm('');
//                     }}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
//                   >
//                     إعادة التعيين
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowFilters(false)}
//                     className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs"
//                   >
//                     <X className="w-3 h-3" />
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر (د.ع)</label>
//                   <div className="space-y-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max="1000"
//                       step="10"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                     />
//                     <div className="flex justify-between text-xs text-gray-600">
//                       <span className="bg-blue-100 px-2 py-1 rounded">{priceRange[0]} د.ع</span>
//                       <span className="bg-green-100 px-2 py-1 rounded">{priceRange[1]} د.ع</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-full h-9 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white">
//                       <SelectValue placeholder="ترتيب حسب" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-xl border-2 border-gray-200">
//                       <SelectItem value="name" className="text-right">الاسم</SelectItem>
//                       <SelectItem value="price" className="text-right">السعر من الأقل للأعلى</SelectItem>
//                       <SelectItem value="price_desc" className="text-right">السعر من الأعلى للأقل</SelectItem>
//                       <SelectItem value="rating" className="text-right">الأعلى تقييماً</SelectItem>
//                       <SelectItem value="newest" className="text-right">الأحدث</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-4 py-6">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-12 h-12 text-blue-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               {searchTerm || priceRange[1] < 1000 ? 'لا توجد نتائج' : 'لا توجد منتجات'}
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {searchTerm 
//                 ? 'لم نتمكن من العثور على منتجات تطابق بحثك.'
//                 : priceRange[1] < 1000
//                 ? 'لا توجد منتجات في نطاق السعر المحدد.'
//                 : 'لا توجد منتجات في هذا التصنيف حالياً.'}
//             </p>
//             <div className="flex gap-3 justify-center">
//               {(searchTerm || priceRange[1] < 1000) && (
//                 <Button 
//                   onClick={() => {
//                     setSearchTerm('');
//                     setPriceRange([0, 1000]);
//                   }}
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//                 >
//                   عرض كل المنتجات
//                 </Button>
//               )}
//               <Button 
//                 variant="outline"
//                 onClick={() => navigate('/categories')}
//                 className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 py-2 rounded-xl font-semibold transition-all"
//               >
//                 استعرض التصنيفات
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* عرض 2 كارت في الصف */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px]"
//                 >
//                   <Catpro
//                     product={product}
//                     variant="vertical"
//                     getImageUrl={getFullProductImageUrl}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* إحصائيات الصفحة */}
//             <div className="mt-8 text-center">
//               <div className="bg-white rounded-xl p-4 border-2 border-gray-200 inline-block">
//                 <div className="flex items-center gap-6 text-sm text-gray-600">
//                   <span>
//                     عرض <span className="font-bold text-blue-600">{filteredProducts.length}</span> من أصل{' '}
//                     <span className="font-bold text-purple-600">{products.length}</span> منتج
//                   </span>
//                   {searchTerm && (
//                     <span className="flex items-center gap-1">
//                       <Search className="w-3 h-3" />
//                       البحث: "{searchTerm}"
//                     </span>
//                   )}
//                   {priceRange[1] < 1000 && (
//                     <span className="flex items-center gap-1">
//                       <Filter className="w-3 h-3" />
//                       السعر: حتى {priceRange[1]} د.ع
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       {/* الفوتر */}
//       <footer className="bg-white border-t border-gray-200 mt-8">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center text-gray-600 text-sm">
//             <p>© 2024 جميع الحقوق محفوظة. {currentCategory.name_ar || currentCategory.name}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CategoryProducts;




// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCategories } from '../../../hooks/useCategory';
// import { useCategoryProducts } from '../../../hooks/useCategory';
// import Catpro from './CatPro';
// import { Button } from '../../ui/button';
// import { Input } from '../../ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// import { Search, Filter, Grid, List, ArrowRight, Home, Loader2, SlidersHorizontal, X, Star } from 'lucide-react';

// const CategoryProducts: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_URL;
  
//   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
//   const isValidCategoryId = !isNaN(numericCategoryId) && numericCategoryId > 0;

//   const { categories, isLoading: categoriesLoading } = useCategories();
//   const [sortBy, setSortBy] = useState<string>('newest');
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   const [showSearch, setShowSearch] = useState(false);
//   const [categoryImageError, setCategoryImageError] = useState(false);

//   const { 
//     products, 
//     isLoading: productsLoading, 
//     error, 
//     refetch,
//     category 
//   } = useCategoryProducts(numericCategoryId, {
//     sortBy,
//     enabled: isValidCategoryId
//   });

//   // استخدام useMemo لتجنب إعادة الحساب في كل render
//   const currentCategory = useMemo(() => {
//     if (category) return category;
//     return categories.find(cat => cat.id === numericCategoryId) || null;
//   }, [category, categories, numericCategoryId]);

//   // دالة لبناء رابط الصورة الكامل للتصنيف
//   const getFullCategoryImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/categories/${imageUrl}`;
//   };

//   // دالة لبناء رابط الصورة الكامل للمنتج
//   const getFullProductImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/products/${imageUrl}`;
//   };

//   // تصفية المنتجات باستخدام useMemo لتجنب إعادة الحساب
//   const filteredProducts = useMemo(() => {
//     return products.filter(product => {
//       const matchesSearch = !searchTerm || 
//         product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const productPrice = parseFloat(product.price);
//       const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
      
//       return matchesSearch && matchesPrice;
//     });
//   }, [products, searchTerm, priceRange]);

//   // إعادة تعيين الفلاتر عند تغيير التصنيف فقط
//   useEffect(() => {
//     setSearchTerm('');
//     setPriceRange([0, 1000]);
//     setShowFilters(false);
//     setShowSearch(false);
//     setCategoryImageError(false);
//   }, [categoryId]); // فقط categoryId كم dependency

//   // إغلاق الفلاتر عند التمرير
//   useEffect(() => {
//     const handleScroll = () => {
//       if (showFilters) {
//         setShowFilters(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [showFilters]);

//   const categoryImageUrl = currentCategory ? getFullCategoryImageUrl(currentCategory.image_url) : null;

//   // تحميل شامل (التصنيفات والمنتجات)
//   const isLoading = categoriesLoading || productsLoading;

//   if (!isValidCategoryId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">التصنيف غير موجود</h2>
//           <Button 
//             onClick={() => navigate('/')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             العودة للرئيسية
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-20 animate-pulse"></div>
//           </div>
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل البيانات...</p>
//           <p className="text-gray-500 text-sm mt-2">تصنيف رقم: {numericCategoryId}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Button 
//             onClick={refetch}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             إعادة المحاولة
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // إذا لم يتم تحميل currentCategory بعد
//   if (!currentCategory) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل معلومات التصنيف...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* الهيدر */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
//         <div className="container mx-auto px-4 pt-4">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/categories')}
//               className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               التصنيفات
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {currentCategory.name_ar || currentCategory.name}
//             </span>
//           </nav>

//           {/* عنوان التصنيف */}
//           <div className="flex items-center gap-4 mb-6">
//             <div className="relative">
//               <div
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white overflow-hidden"
//                 style={{ 
//                   background: currentCategory.color 
//                     ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
//                     : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
//                 }}
//               >
//                 {categoryImageUrl && !categoryImageError ? (
//                   <img
//                     src={categoryImageUrl}
//                     alt={currentCategory.name_ar || currentCategory.name}
//                     className="w-full h-full object-cover"
//                     onError={() => setCategoryImageError(true)}
//                   />
//                 ) : (
//                   <span className="text-2xl">{currentCategory.icon || '📦'}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                 {currentCategory.name_ar || currentCategory.name}
//               </h1>
//             </div>

//             {/* أزرار التحكم */}
//             <div className="flex items-center gap-2">
//               {/* زر البحث */}
//               <Button
//                 variant={showSearch ? "default" : "ghost"}
//                 size="sm"
//                 onClick={() => setShowSearch(!showSearch)}
//                 className={`h-10 w-10 p-0 rounded-xl transition-all ${
//                   showSearch ? 'bg-blue-600 text-white' : ''
//                 }`}
//               >
//                 <Search className="w-4 h-4" />
//               </Button>

//               {/* زر الفلاتر */}
//               <Button
//                 variant={showFilters ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`h-10 px-3 rounded-xl border transition-all ${
//                   showFilters 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 hover:border-blue-500'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//               </Button>

//               {/* زر التبديل بين العرض */}
//               <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض شبكي"
//                 >
//                   <Grid className="w-3 h-3" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض قائمة"
//                 >
//                   <List className="w-3 h-3" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* شريط البحث */}
//           {showSearch && (
//             <div className="mb-4">
//               <div className="relative">
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   type="text"
//                   placeholder="ابحث في منتجات التصنيف..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pr-10 text-right h-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* الفلاتر */}
//           {showFilters && (
//             <div className="mb-4 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-base font-semibold text-gray-900">الفلاتر</h3>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setPriceRange([0, 1000]);
//                       setSearchTerm('');
//                     }}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
//                   >
//                     إعادة التعيين
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowFilters(false)}
//                     className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs"
//                   >
//                     <X className="w-3 h-3" />
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر (د.ع)</label>
//                   <div className="space-y-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max="1000"
//                       step="10"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                     />
//                     <div className="flex justify-between text-xs text-gray-600">
//                       <span className="bg-blue-100 px-2 py-1 rounded">{priceRange[0]} د.ع</span>
//                       <span className="bg-green-100 px-2 py-1 rounded">{priceRange[1]} د.ع</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-full h-9 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white">
//                       <SelectValue placeholder="ترتيب حسب" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-xl border-2 border-gray-200">
//                       <SelectItem value="name" className="text-right">الاسم</SelectItem>
//                       <SelectItem value="price" className="text-right">السعر من الأقل للأعلى</SelectItem>
//                       <SelectItem value="price_desc" className="text-right">السعر من الأعلى للأقل</SelectItem>
//                       <SelectItem value="rating" className="text-right">الأعلى تقييماً</SelectItem>
//                       <SelectItem value="newest" className="text-right">الأحدث</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-4 py-6">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-12 h-12 text-blue-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               {searchTerm || priceRange[1] < 1000 ? 'لا توجد نتائج' : 'لا توجد منتجات'}
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {searchTerm 
//                 ? 'لم نتمكن من العثور على منتجات تطابق بحثك.'
//                 : priceRange[1] < 1000
//                 ? 'لا توجد منتجات في نطاق السعر المحدد.'
//                 : 'لا توجد منتجات في هذا التصنيف حالياً.'}
//             </p>
//             <div className="flex gap-3 justify-center">
//               {(searchTerm || priceRange[1] < 1000) && (
//                 <Button 
//                   onClick={() => {
//                     setSearchTerm('');
//                     setPriceRange([0, 1000]);
//                   }}
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//                 >
//                   عرض كل المنتجات
//                 </Button>
//               )}
//               <Button 
//                 variant="outline"
//                 onClick={() => navigate('/categories')}
//                 className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 py-2 rounded-xl font-semibold transition-all"
//               >
//                 استعرض التصنيفات
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* عرض 2 كارت في الصف */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px]"
//                 >
//                   <Catpro
//                     product={product}
//                     variant="vertical"
//                     getImageUrl={getFullProductImageUrl}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* إحصائيات الصفحة */}
//             <div className="mt-8 text-center">
//               <div className="bg-white rounded-xl p-4 border-2 border-gray-200 inline-block">
//                 <div className="flex items-center gap-6 text-sm text-gray-600">
//                   <span>
//                     عرض <span className="font-bold text-blue-600">{filteredProducts.length}</span> من أصل{' '}
//                     <span className="font-bold text-purple-600">{products.length}</span> منتج
//                   </span>
//                   {searchTerm && (
//                     <span className="flex items-center gap-1">
//                       <Search className="w-3 h-3" />
//                       البحث: "{searchTerm}"
//                     </span>
//                   )}
//                   {priceRange[1] < 1000 && (
//                     <span className="flex items-center gap-1">
//                       <Filter className="w-3 h-3" />
//                       السعر: حتى {priceRange[1]} د.ع
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       {/* الفوتر */}
//       <footer className="bg-white border-t border-gray-200 mt-8">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center text-gray-600 text-sm">
//             <p>© 2024 جميع الحقوق محفوظة. {currentCategory.name_ar || currentCategory.name}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CategoryProducts;





// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCategories, useCategoryProducts } from '../../../hooks/useCategory';
// import Catpro from './CatPro';
// import { Button } from '../../ui/button';
// import { Input } from '../../ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// import { Search, Filter, Grid, List, ArrowRight, Home, Loader2, SlidersHorizontal, X, Star } from 'lucide-react';

// const CategoryProducts: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_URL;
  
//   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
//   const isValidCategoryId =(numericCategoryId) && numericCategoryId > 0;

//   const { categories, isLoading: categoriesLoading } = useCategories();
//   const [sortBy, setSortBy] = useState<string>('newest');
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
//   const [categoryImageError, setCategoryImageError] = useState(false);

//   const { 
//     products, 
//     isLoading: productsLoading, 
//     error, 
//     refetch,
//     category 
//   } = useCategoryProducts(numericCategoryId, {
//     enabled: isValidCategoryId
//   });

//   // استخدام useMemo لتجنب إعادة الحساب في كل render
//   const currentCategory = useMemo(() => {
//     if (category) return category;
//     return categories?.find(cat => cat.id === numericCategoryId) || null;
//   }, [category, categories, numericCategoryId]);

//   // دالة لبناء رابط الصورة الكامل للتصنيف
//   const getFullCategoryImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/categories/${imageUrl}`;
//   };

//   // دالة لبناء رابط الصورة الكامل للمنتج
//   const getFullProductImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/products/${imageUrl}`;
//   };

//   // تصفية المنتجات باستخدام useMemo لتجنب إعادة الحساب
//   const filteredProducts = useMemo(() => {
//     if (!products || !Array.isArray(products)) return [];
    
//     return products.filter(product => {
//       const matchesSearch = !searchTerm || 
//         product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const productPrice = parseFloat(product.price || '0');
//       const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
      
//       return matchesSearch && matchesPrice;
//     });
//   }, [products, searchTerm, priceRange]);

//   // إعادة تعيين الفلاتر عند تغيير التصنيف فقط
//   useEffect(() => {
//     setSearchTerm('');
//     setPriceRange([0, 1000]);
//     setShowFilters(false);
//     setCategoryImageError(false);
//   }, [categoryId]);

//   // إغلاق الفلاتر عند التمرير
//   useEffect(() => {
//     const handleScroll = () => {
//       if (showFilters) {
//         setShowFilters(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [showFilters]);

//   const categoryImageUrl = currentCategory ? getFullCategoryImageUrl(currentCategory.image_url) : null;

//   // تحميل شامل (التصنيفات والمنتجات)
//   const isLoading = categoriesLoading || productsLoading;

//   if (!isValidCategoryId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">التصنيف غير موجود</h2>
//           <Button 
//             onClick={() => navigate('/')}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             العودة للرئيسية
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-lg opacity-20 animate-pulse"></div>
//           </div>
//           <p className="text-gray-700 text-lg font-medium">جاري تحميل البيانات...</p>
//           <p className="text-gray-500 text-sm mt-2">تصنيف رقم: {numericCategoryId}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
//           <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-10 h-10 text-red-600" />
//           </div>
//           <h2 className="text-2xl font-bold text-red-600 mb-4">خطأ في التحميل</h2>
//           <p className="text-gray-600 mb-6">{error}</p>
//           <Button 
//             onClick={refetch}
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//           >
//             إعادة المحاولة
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* الهيدر */}
//       <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
//         <div className="container mx-auto px-4 pt-4">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/')}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               <Home className="w-4 h-4" />
//               الرئيسية
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/categories')}
//               className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl px-3 py-2 transition-all"
//             >
//               التصنيفات
//             </Button>
//             <ArrowRight className="w-4 h-4 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               {currentCategory?.name_ar || currentCategory?.name}
//             </span>
//           </nav>

//           {/* عنوان التصنيف */}
//           <div className="flex items-center gap-4 mb-6">
//             <div className="relative">
//               <div
//                 className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-2xl border-4 border-white overflow-hidden"
//                 style={{ 
//                   background: currentCategory?.color 
//                     ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
//                     : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
//                 }}
//               >
//                 {categoryImageUrl && !categoryImageError ? (
//                   <img
//                     src={categoryImageUrl}
//                     alt={currentCategory?.name_ar || currentCategory?.name}
//                     className="w-full h-full object-cover"
//                     onError={() => setCategoryImageError(true)}
//                   />
//                 ) : (
//                   <span className="text-2xl">{currentCategory?.icon || '📦'}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex-1">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">
//                 {currentCategory?.name_ar || currentCategory?.name}
//               </h1>
//               <p className="text-gray-600 text-sm">
//                 {filteredProducts.length} منتج متوفر
//               </p>
//             </div>

//             {/* أزرار التحكم */}
//             <div className="flex items-center gap-2">
//               {/* زر البحث */}
//               <div className="relative">
//                 <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   type="text"
//                   placeholder="ابحث في منتجات التصنيف..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pr-10 text-right h-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white w-64"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               {/* زر الفلاتر */}
//               <Button
//                 variant={showFilters ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`h-10 px-3 rounded-xl border transition-all ${
//                   showFilters 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 hover:border-blue-500'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-4 h-4" />
//               </Button>

//               {/* زر التبديل بين العرض */}
//               <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
//                 <Button
//                   variant={viewMode === 'grid' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('grid')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض شبكي"
//                 >
//                   <Grid className="w-3 h-3" />
//                 </Button>
//                 <Button
//                   variant={viewMode === 'list' ? 'default' : 'ghost'}
//                   size="sm"
//                   onClick={() => setViewMode('list')}
//                   className="h-8 w-8 p-0 rounded-lg transition-all"
//                   title="عرض قائمة"
//                 >
//                   <List className="w-3 h-3" />
//                 </Button>
//               </div>
//             </div>
//           </div>

//           {/* الفلاتر */}
//           {showFilters && (
//             <div className="mb-4 p-4 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-base font-semibold text-gray-900">الفلاتر</h3>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setPriceRange([0, 9999999]);
//                       setSearchTerm('');
//                     }}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
//                   >
//                     إعادة التعيين
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowFilters(false)}
//                     className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs"
//                   >
//                     <X className="w-3 h-3" />
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">نطاق السعر (د.ع)</label>
//                   <div className="space-y-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max="9999999"
//                       step="9999999"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
//                     />
//                     <div className="flex justify-between text-xs text-gray-600">
//                       <span className="bg-blue-100 px-2 py-1 rounded">{priceRange[0]} د.ع</span>
//                       <span className="bg-green-100 px-2 py-1 rounded">{priceRange[1]} د.ع</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب حسب</label>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-full h-9 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white">
//                       <SelectValue placeholder="ترتيب حسب" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-xl border-2 border-gray-200">
//                       <SelectItem value="name" className="text-right">الاسم</SelectItem>
//                       <SelectItem value="price" className="text-right">السعر من الأقل للأعلى</SelectItem>
//                       <SelectItem value="price_desc" className="text-right">السعر من الأعلى للأقل</SelectItem>
//                       <SelectItem value="rating" className="text-right">الأعلى تقييماً</SelectItem>
//                       <SelectItem value="newest" className="text-right">الأحدث</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-4 py-6">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
//             <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-12 h-12 text-blue-600" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-3">
//               {searchTerm || priceRange[1] < 9999999 ? 'لا توجد نتائج' : 'لا توجد منتجات'}
//             </h3>
//             <p className="text-gray-600 mb-6 max-w-md mx-auto">
//               {searchTerm 
//                 ? 'لم نتمكن من العثور على منتجات تطابق بحثك.'
//                 : priceRange[1] < 9999999
//                 ? 'لا توجد منتجات في نطاق السعر المحدد.'
//                 : 'لا توجد منتجات في هذا التصنيف حالياً.'}
//             </p>
//             <div className="flex gap-3 justify-center">
//               {(searchTerm || priceRange[1] < 9999999) && (
//                 <Button 
//                   onClick={() => {
//                     setSearchTerm('');
//                     setPriceRange([0, 9999999]);
//                   }}
//                   className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//                 >
//                   عرض كل المنتجات
//                 </Button>
//               )}
//               <Button 
//                 variant="outline"
//                 onClick={() => navigate('/categories')}
//                 className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-6 py-2 rounded-xl font-semibold transition-all"
//               >
//                 استعرض التصنيفات
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* عرض 2 كارت في الصف */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:translate-y-[-2px]"
//                 >
//                   <Catpro
//                     product={product}
//                     variant="vertical"
//                     getImageUrl={getFullProductImageUrl}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* إحصائيات الصفحة */}
//             <div className="mt-8 text-center">
//               <div className="bg-white rounded-xl p-4 border-2 border-gray-200 inline-block">
//                 <div className="flex items-center gap-6 text-sm text-gray-600">
//                   <span>
//                     عرض <span className="font-bold text-blue-600">{filteredProducts.length}</span> من أصل{' '}
//                     <span className="font-bold text-purple-600">{products.length}</span> منتج
//                   </span>
//                   {searchTerm && (
//                     <span className="flex items-center gap-1">
//                       <Search className="w-3 h-3" />
//                       البحث: "{searchTerm}"
//                     </span>
//                   )}
//                   {priceRange[1] < 1000 && (
//                     <span className="flex items-center gap-1">
//                       <Filter className="w-3 h-3" />
//                       السعر: حتى {priceRange[1]} د.ع
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       {/* الفوتر */}
//       <footer className="bg-white border-t border-gray-200 mt-8">
//         <div className="container mx-auto px-4 py-6">
//           <div className="text-center text-gray-600 text-sm">
//             <p>© 2024 جميع الحقوق محفوظة. {currentCategory?.name_ar || currentCategory?.name}</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CategoryProducts;










// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCategories, useCategoryProducts } from '../../../hooks/useCategory';
// import Catpro from './CatPro';
// import { Button } from '../../ui/button';
// import { Input } from '../../ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
// import { Search, Filter, Grid, List, ArrowRight, Home, Loader2, SlidersHorizontal, X, Star } from 'lucide-react';

// const CategoryProducts: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_URL;
  
//   const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
//   const isValidCategoryId = numericCategoryId && numericCategoryId > 0;

//   const { categories, isLoading: categoriesLoading } = useCategories();
//   const [sortBy, setSortBy] = useState<string>('newest');
//   const [searchTerm, setSearchTerm] = useState<string>('');
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [showFilters, setShowFilters] = useState(false);
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999999]);
//   const [categoryImageError, setCategoryImageError] = useState(false);

//   const { 
//     products, 
//     isLoading: productsLoading, 
//     error, 
//     refetch,
//     category 
//   } = useCategoryProducts(numericCategoryId, {
//     enabled: isValidCategoryId
//   });

//   // استخدام useMemo لتجنب إعادة الحساب في كل render
//   const currentCategory = useMemo(() => {
//     if (category) return category;
//     return categories?.find(cat => cat.id === numericCategoryId) || null;
//   }, [category, categories, numericCategoryId]);

//   // دالة لبناء رابط الصورة الكامل للتصنيف
//   const getFullCategoryImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/categories/${imageUrl}`;
//   };

//   // دالة لبناء رابط الصورة الكامل للمنتج
//   const getFullProductImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/products/${imageUrl}`;
//   };

//   // حساب الحد الأقصى للسعر تلقائياً من المنتجات
//   const maxPrice = useMemo(() => {
//     if (!products || products.length === 0) return 9999999;
//     return Math.max(...products.map(p => parseFloat(p.price) || 0));
//   }, [products]);

//   // تصفية المنتجات باستخدام useMemo لتجنب إعادة الحساب
//   const filteredProducts = useMemo(() => {
//     if (!products || !Array.isArray(products)) return [];
    
//     console.log('🔍 Filtering products:', {
//       totalProducts: products.length,
//       priceRange,
//       searchTerm,
//       maxPrice
//     });
    
//     return products.filter(product => {
//       const matchesSearch = !searchTerm || 
//         product.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const productPrice = parseFloat(product.price || '0');
//       const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
      
//       const shouldInclude = matchesSearch && matchesPrice;
      
//       if (!shouldInclude) {
//         console.log('❌ Product filtered out:', {
//           name: product.name_ar,
//           price: productPrice,
//           matchesSearch,
//           matchesPrice
//         });
//       }
      
//       return shouldInclude;
//     });
//   }, [products, searchTerm, priceRange, maxPrice]);

//   // إعادة تعيين الفلاتر عند تغيير التصنيف فقط
//   useEffect(() => {
//     setSearchTerm('');
//     setPriceRange([0, maxPrice]);
//     setShowFilters(false);
//     setCategoryImageError(false);
//   }, [categoryId, maxPrice]);

//   // إغلاق الفلاتر عند التمرير
//   useEffect(() => {
//     const handleScroll = () => {
//       if (showFilters) {
//         setShowFilters(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [showFilters]);

//   const categoryImageUrl = currentCategory ? getFullCategoryImageUrl(currentCategory.image_url) : null;

//   // تحميل شامل (التصنيفات والمنتجات)
//   const isLoading = categoriesLoading || productsLoading;

//   if (!isValidCategoryId) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-bold text-gray-900 mb-3">التصنيف غير موجود</h2>
//           <Button 
//             onClick={() => navigate('/')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium w-full"
//           >
//             العودة للرئيسية
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
//           <p className="text-gray-700 font-medium">جاري تحميل البيانات...</p>
//           <p className="text-gray-500 text-sm mt-2">تصنيف رقم: {numericCategoryId}</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//         <div className="text-center bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="w-8 h-8 text-red-600" />
//           </div>
//           <h2 className="text-xl font-bold text-red-600 mb-3">خطأ في التحميل</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <Button 
//             onClick={refetch}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium w-full"
//           >
//             إعادة المحاولة
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//       {/* الهيدر */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
//         <div className="container mx-auto px-4 py-3">
//           {/* مسار التنقل */}
//           <nav className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mb-3">
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/')}
//               className="flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1 text-xs"
//             >
//               <Home className="w-3 h-3" />
//               <span className="hidden xs:inline">الرئيسية</span>
//             </Button>
//             <ArrowRight className="w-3 h-3 rotate-180 text-gray-400" />
//             <Button
//               variant="ghost"
//               onClick={() => navigate('/categories')}
//               className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1 text-xs"
//             >
//               <span className="hidden xs:inline">التصنيفات</span>
//             </Button>
//             <ArrowRight className="w-3 h-3 rotate-180 text-gray-400" />
//             <span className="text-gray-900 font-semibold text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
//               {currentCategory?.name_ar || currentCategory?.name}
//             </span>
//           </nav>

//           {/* عنوان التصنيف */}
//           <div className="flex items-center gap-3 mb-4">
//             <div className="relative">
//               <div
//                 className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl shadow-lg border-2 border-white overflow-hidden"
//                 style={{ 
//                   background: currentCategory?.color 
//                     ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
//                     : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
//                 }}
//               >
//                 {categoryImageUrl && !categoryImageError ? (
//                   <img
//                     src={categoryImageUrl}
//                     alt={currentCategory?.name_ar || currentCategory?.name}
//                     className="w-full h-full object-cover"
//                     onError={() => setCategoryImageError(true)}
//                   />
//                 ) : (
//                   <span className="text-xl">{currentCategory?.icon || '📦'}</span>
//                 )}
//               </div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
//                 {currentCategory?.name_ar || currentCategory?.name}
//               </h1>
//               <p className="text-gray-600 text-xs sm:text-sm">
//                 {filteredProducts.length} منتج متوفر
//               </p>
//             </div>

//             {/* أزرار التحكم */}
//             <div className="flex items-center gap-2">
//               {/* زر البحث */}
//               <div className="relative hidden sm:block">
//                 <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
//                 <Input
//                   type="text"
//                   placeholder="ابحث..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pr-8 text-right h-8 sm:h-9 rounded-lg border border-gray-300 focus:border-blue-500 bg-white w-32 sm:w-48 text-xs"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm('')}
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 )}
//               </div>

//               {/* زر البحث للجوال */}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => {
//                   const search = prompt('ابحث في المنتجات:');
//                   if (search !== null) setSearchTerm(search);
//                 }}
//                 className="sm:hidden h-8 w-8 p-0 rounded-lg"
//               >
//                 <Search className="w-4 h-4" />
//               </Button>

//               {/* زر الفلاتر */}
//               <Button
//                 variant={showFilters ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`h-8 sm:h-9 px-2 sm:px-3 rounded-lg border text-xs ${
//                   showFilters 
//                     ? 'bg-blue-600 text-white border-blue-600' 
//                     : 'border-gray-300 hover:border-blue-500'
//                 }`}
//               >
//                 <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
//                 <span className="hidden xs:inline mr-1">فلاتر</span>
//               </Button>
//             </div>
//           </div>

//           {/* شريط البحث للجوال */}
//           <div className="sm:hidden mb-3">
//             <div className="relative">
//               <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 type="text"
//                 placeholder="ابحث في المنتجات..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pr-8 text-right h-9 rounded-lg border border-gray-300 focus:border-blue-500 bg-white w-full text-sm"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm('')}
//                   className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* الفلاتر */}
//           {showFilters && (
//             <div className="mb-3 p-3 bg-white rounded-xl border border-gray-200 shadow-lg">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-sm font-semibold text-gray-900">الفلاتر</h3>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => {
//                       setPriceRange([0, maxPrice]);
//                       setSearchTerm('');
//                     }}
//                     className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
//                   >
//                     إعادة التعيين
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowFilters(false)}
//                     className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs"
//                   >
//                     <X className="w-3 h-3" />
//                   </Button>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-2">
//                     نطاق السعر (د.ع) - حتى {priceRange[1].toLocaleString()} د.ع
//                   </label>
//                   <div className="space-y-3">
//                     <input
//                       type="range"
//                       min="0"
//                       max={maxPrice}
//                       step="1000"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
//                       className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                     />
//                     <div className="flex justify-between text-xs text-gray-600">
//                       <span className="bg-blue-100 px-2 py-1 rounded">0 د.ع</span>
//                       <span className="bg-green-100 px-2 py-1 rounded">{priceRange[1].toLocaleString()} د.ع</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-xs font-medium text-gray-700 mb-2">ترتيب حسب</label>
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-full h-8 rounded-lg border border-gray-300 focus:border-blue-500 bg-white text-xs">
//                       <SelectValue placeholder="ترتيب حسب" />
//                     </SelectTrigger>
//                     <SelectContent className="rounded-lg border border-gray-300 text-xs">
//                       <SelectItem value="name" className="text-right text-xs">الاسم</SelectItem>
//                       <SelectItem value="price" className="text-right text-xs">السعر من الأقل للأعلى</SelectItem>
//                       <SelectItem value="price_desc" className="text-right text-xs">السعر من الأعلى للأقل</SelectItem>
//                       <SelectItem value="rating" className="text-right text-xs">الأعلى تقييماً</SelectItem>
//                       <SelectItem value="newest" className="text-right text-xs">الأحدث</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* المحتوى الرئيسي */}
//       <main className="container mx-auto px-3 sm:px-4 py-4">
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 mx-2">
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Search className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-lg font-bold text-gray-900 mb-2">
//               {searchTerm || priceRange[1] < maxPrice ? 'لا توجد نتائج' : 'لا توجد منتجات'}
//             </h3>
//             <p className="text-gray-600 mb-4 text-sm px-4">
//               {searchTerm 
//                 ? 'لم نتمكن من العثور على منتجات تطابق بحثك.'
//                 : priceRange[1] < maxPrice
//                 ? `لا توجد منتجات في نطاق السعر المحدد (حتى ${priceRange[1].toLocaleString()} د.ع).`
//                 : 'لا توجد منتجات في هذا التصنيف حالياً.'}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-2 justify-center px-4">
//               {(searchTerm || priceRange[1] < maxPrice) && (
//                 <Button 
//                   onClick={() => {
//                     setSearchTerm('');
//                     setPriceRange([0, maxPrice]);
//                   }}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
//                 >
//                   عرض كل المنتجات
//                 </Button>
//               )}
//               <Button 
//                 variant="outline"
//                 onClick={() => navigate('/categories')}
//                 className="border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-4 py-2 rounded-lg font-medium text-sm"
//               >
//                 استعرض التصنيفات
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* عرض 2 كارت في الصف للهاتف */}
//             <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//               {filteredProducts.map((product) => (
//                 <div 
//                   key={product.id} 
//                   className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-300"
//                 >
//                   <Catpro
//                     product={product}
//                     variant="vertical"
//                     getImageUrl={getFullProductImageUrl}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* إحصائيات الصفحة */}
//             <div className="mt-6 text-center">
//               <div className="bg-white rounded-lg p-3 border border-gray-200 inline-block">
//                 <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-gray-600">
//                   <span>
//                     عرض <span className="font-bold text-blue-600">{filteredProducts.length}</span> من أصل{' '}
//                     <span className="font-bold text-purple-600">{products.length}</span> منتج
//                   </span>
//                   {searchTerm && (
//                     <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded">
//                       <Search className="w-3 h-3" />
//                       البحث: "{searchTerm}"
//                     </span>
//                   )}
//                   {priceRange[1] < maxPrice && (
//                     <span className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded">
//                       <Filter className="w-3 h-3" />
//                       السعر: حتى {priceRange[1].toLocaleString()} د.ع
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </main>

//       {/* الفوتر */}
//       <footer className="bg-white border-t border-gray-200 mt-6">
//         <div className="container mx-auto px-4 py-4">
//           <div className="text-center text-gray-600 text-xs">
//             <p>© 2024 جميع الحقوق محفوظة. {currentCategory?.name_ar || currentCategory?.name}</p>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 18px;
//           width: 18px;
//           border-radius: 50%;
//           background: #3b82f6;
//           cursor: pointer;
//           border: 2px solid white;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//         }
        
//         .slider::-moz-range-thumb {
//           height: 18px;
//           width: 18px;
//           border-radius: 50%;
//           background: #3b82f6;
//           cursor: pointer;
//           border: 2px solid white;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CategoryProducts;








import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategory';
import ProductsList from '../Product/ProductsList';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Search, Filter, ArrowRight, Home, Loader2, SlidersHorizontal, X } from 'lucide-react';

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  const numericCategoryId = categoryId ? parseInt(categoryId) : 0;
  const isValidCategoryId = numericCategoryId && numericCategoryId > 0;

  const { categories, isLoading: categoriesLoading } = useCategories();
  const [sortBy, setSortBy] = useState<string>('newest');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryImageError, setCategoryImageError] = useState(false);

  const currentCategory = useMemo(() => {
    return categories?.find(cat => cat.id === numericCategoryId) || null;
  }, [categories, numericCategoryId]);

  const getFullCategoryImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `${API_BASE_URL}${imageUrl}`;
    }
    
    return `${API_BASE_URL}/uploads/categories/${imageUrl}`;
  };

  useEffect(() => {
    setSearchTerm('');
    setShowFilters(false);
    setCategoryImageError(false);
  }, [categoryId]);

  useEffect(() => {
    const handleScroll = () => {
      if (showFilters) {
        setShowFilters(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showFilters]);

  const categoryImageUrl = currentCategory ? getFullCategoryImageUrl(currentCategory.image_url) : null;

  if (!isValidCategoryId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">التصنيف غير موجود</h2>
          <Button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium w-full"
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    );
  }

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">جاري تحميل البيانات...</p>
          <p className="text-gray-500 text-sm mt-2">تصنيف رقم: {numericCategoryId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* الهيدر */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          {/* مسار التنقل */}
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 mb-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1 text-xs"
            >
              <Home className="w-3 h-3" />
              <span className="hidden xs:inline">الرئيسية</span>
            </Button>
            <ArrowRight className="w-3 h-3 rotate-180 text-gray-400" />
            <Button
              variant="ghost"
              onClick={() => navigate('/categories')}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg px-2 py-1 text-xs"
            >
              <span className="hidden xs:inline">التصنيفات</span>
            </Button>
            <ArrowRight className="w-3 h-3 rotate-180 text-gray-400" />
            <span className="text-gray-900 font-semibold text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
              {currentCategory?.name_ar || currentCategory?.name}
            </span>
          </nav>

          {/* عنوان التصنيف */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl shadow-lg border-2 border-white overflow-hidden"
                style={{ 
                  background: currentCategory?.color 
                    ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
                    : 'linear-gradient(135deg, #3B82F620, #8B5CF620)'
                }}
              >
                {categoryImageUrl && !categoryImageError ? (
                  <img
                    src={categoryImageUrl}
                    alt={currentCategory?.name_ar || currentCategory?.name}
                    className="w-full h-full object-cover"
                    onError={() => setCategoryImageError(true)}
                  />
                ) : (
                  <span className="text-xl">{currentCategory?.icon || '📦'}</span>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {currentCategory?.name_ar || currentCategory?.name}
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm">
                استعرض المنتجات المتاحة
              </p>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-2">
              {/* زر البحث */}
              <div className="relative hidden sm:block">
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                <Input
                  type="text"
                  placeholder="ابحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8 text-right h-8 sm:h-9 rounded-lg border border-gray-300 focus:border-blue-500 bg-white w-32 sm:w-48 text-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* زر البحث للجوال */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const search = prompt('ابحث في المنتجات:');
                  if (search !== null) setSearchTerm(search);
                }}
                className="sm:hidden h-8 w-8 p-0 rounded-lg"
              >
                <Search className="w-4 h-4" />
              </Button>

              {/* زر الفلاتر */}
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-8 sm:h-9 px-2 sm:px-3 rounded-lg border text-xs ${
                  showFilters 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 hover:border-blue-500'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline mr-1">فلاتر</span>
              </Button>
            </div>
          </div>

          {/* شريط البحث للجوال */}
          <div className="sm:hidden mb-3">
            <div className="relative">
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="ابحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8 text-right h-9 rounded-lg border border-gray-300 focus:border-blue-500 bg-white w-full text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* الفلاتر */}
          {showFilters && (
            <div className="mb-3 p-3 bg-white rounded-xl border border-gray-200 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">الفلاتر</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-xs"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">ترتيب حسب</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full h-8 rounded-lg border border-gray-300 focus:border-blue-500 bg-white text-xs">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-gray-300 text-xs">
                      <SelectItem value="name" className="text-right text-xs">الاسم</SelectItem>
                      <SelectItem value="price" className="text-right text-xs">السعر من الأقل للأعلى</SelectItem>
                      <SelectItem value="price_desc" className="text-right text-xs">السعر من الأعلى للأقل</SelectItem>
                      <SelectItem value="rating" className="text-right text-xs">الأعلى تقييماً</SelectItem>
                      <SelectItem value="newest" className="text-right text-xs">الأحدث</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-3 sm:px-4 py-4">
        {/* استخدام ProductsList مع تمرير categoryId و searchQuery */}
        <ProductsList 
          categoryId={numericCategoryId}
          searchQuery={searchTerm}
          viewMode={viewMode}
        />
      </main>

      {/* الفوتر */}
      <footer className="bg-white border-t border-gray-200 mt-6">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-gray-600 text-xs">
            <p>© 2024 جميع الحقوق محفوظة. {currentCategory?.name_ar || currentCategory?.name}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryProducts;