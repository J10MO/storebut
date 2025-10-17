// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Category } from '../../../api/types/category.types';

// interface CategoryCircleListProps {
//   categories: Category[];
//   size?: number; // قطر الدائرة بالبيكسل
//   spacing?: number; // المسافة بين الدوائر
//   showNameAr?: boolean; // هل اعرض name_ar تحت الدائرة أم لا
// }

// const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
//   categories,
//   size = 120,
//   spacing = 16,
//   showNameAr = true,
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (id: number) => {
//     // يوجه المستخدم لصفحة المنتجات الخاصة بالتصنيف
//     navigate(`/categories/${id}/products`);
//   };

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing }}>
//       {categories.map((cat) => {
//         const diameter = size;
//         // اختيار التسمية: الاسم العربي إذا متاح و showNameAr فعّال
//         const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
//         return (
//           <div key={cat.id} style={{ textAlign: 'center' }}>
//             <button
//               onClick={() => handleClick(cat.id)}
//               aria-label={cat.name}
//               style={{
//                 width: diameter,
//                 height: diameter,
//                 borderRadius: '50%',
//                 border: 'none',
//                 padding: 0,
//                 // استخدم color كخلفية إذا متاح، وإلا لون افتراضي
//                 background: cat.color ?? '#e5e7eb',
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 cursor: 'pointer',
//                 // تعزيز التباين حتى لو color غير معروف
//                 boxShadow: '0 2px 6px rgba(0,0,0,.15)',
//               }}
//             >
//               {/* استخدم icon كـ محتوى مركزي، مع حماية من القيمة الفارغة */}
//               <span style={{ fontSize: diameter * 0.42 }}>
//                 {cat.icon ?? '🧴'}
//               </span>
//             </button>
//             <div style={{ marginTop: 8, fontSize: 14, color: '#374151' }}>
//               {label}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CategoryCircleList;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Category } from '../../../api/types/category.types';

// interface CategoryCircleListProps {
//   categories: Category[];
//   size?: number;
//   spacing?: number;
//   showNameAr?: boolean;
// }

// const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
//   categories,
//   size = 120,
//   spacing = 16,
//   showNameAr = true,
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (id: number) => {
//     // تأكد من أن id رقم صحيح
//     const categoryId = Number(id);
//     if (!isNaN(categoryId)) {
//       navigate(`/categories/${categoryId}/products`);
//     } else {
//       console.error('Invalid category ID:', id);
//     }
//   };

//   return (
//     <div 
//       className="flex flex-wrap justify-center gap-6 px-4"
//       style={{ gap: `${spacing}px` }}
//     >
//       {categories.map((cat) => {
//         const diameter = size;
//         const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
        
//         return (
//           <div 
//             key={cat.id} 
//             className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
//             style={{ width: diameter }}
//           >
//             <button
//               onClick={() => handleClick(cat.id)}
//               aria-label={cat.name}
//               className="flex items-center justify-center border-2 border-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               style={{
//                 width: diameter,
//                 height: diameter,
//                 borderRadius: '50%',
//                 background: cat.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//               }}
//             >
//               <span 
//                 className="drop-shadow-sm"
//                 style={{ fontSize: `${diameter * 0.35}px` }}
//               >
//                 {cat.icon || '📦'}
//               </span>
//             </button>
            
//             <div 
//               className="mt-3 text-center font-medium text-gray-800 line-clamp-2 break-words"
//               style={{ 
//                 fontSize: `${Math.max(12, size * 0.12)}px`,
//                 maxWidth: diameter
//               }}
//             >
//               {label}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CategoryCircleList;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Category } from '../../../api/types/category.types';

// interface CategoryCircleListProps {
//   categories: Category[];
//   size?: number;
//   spacing?: number;
//   showNameAr?: boolean;
//   layout?: 'grid' | 'carousel'; // إضافة خيارات للعرض
// }

// const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
//   categories,
//   size = 140,
//   spacing = 24,
//   showNameAr = true,
//   layout = 'grid',
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (id: number) => {
//     const categoryId = Number(id);
//     if (!isNaN(categoryId)) {
//       navigate(`/categories/${categoryId}/products`);
//     } else {
//       console.error('Invalid category ID:', id);
//     }
//   };

//   // دالة لبناء رابط الصورة الكامل
//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `http://localhost:5000${imageUrl}`;
//     }
    
//     return `http://localhost:5000/uploads/categories/${imageUrl}`;
//   };

//   // تصميم الشبكة
//   if (layout === 'grid') {
//     return (
//       <div className="w-full">
//         {/* عنوان القسم */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-3">تصنيفات المنتجات</h2>
//           <p className="text-gray-600 text-lg">اختر من بين مجموعة متنوعة من التصنيفات</p>
//         </div>

//         {/* شبكة التصنيفات */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4">
//           {categories.map((cat) => {
//             const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
//             const fullImageUrl = getFullImageUrl(cat.image_url);
            
//             return (
//               <div 
//                 key={cat.id} 
//                 className="group cursor-pointer"
//                 onClick={() => handleClick(cat.id)}
//               >
//                 {/* كارت التصنيف */}
//                 <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 border border-gray-100 overflow-hidden">
                  
//                   {/* الصورة */}
//                   <div 
//                     className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
//                     style={{ 
//                       background: cat.color ? `linear-gradient(135deg, ${cat.color}20, ${cat.color}40)` : undefined 
//                     }}
//                   >
//                     {fullImageUrl ? (
//                       <img
//                         src={fullImageUrl}
//                         alt={label}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         loading="lazy"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <span className="text-4xl text-gray-400">
//                           {cat.icon || '📦'}
//                         </span>
//                       </div>
//                     )}
                    
//                     {/* طبقة hover */}
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                    
//                     {/* عدد المنتجات */}
//                     <div className="absolute top-3 left-3">
//                       <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700 shadow-sm">
//                         {cat.product_count} منتج
//                       </span>
//                     </div>
                    
//                     {/* أيقونة التأثير */}
//                     <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
//                       <div className="bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
//                         <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* معلومات التصنيف */}
//                   <div className="p-4 text-center">
//                     <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">
//                       {label}
//                     </h3>
//                     <p className="text-xs text-gray-500 line-clamp-1">
//                       {cat.name !== label ? cat.name : ''}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }

//   // تصميم الكاروسيل (إذا أردت)
//   return (
//     <div className="w-full">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-gray-900 mb-3">تصنيفاتنا</h2>
//         <p className="text-gray-600 text-lg">اكتشف مجموعتنا المميزة</p>
//       </div>

//       <div className="flex overflow-x-auto pb-6 px-4 gap-6 scrollbar-hide">
//         {categories.map((cat) => {
//           const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
//           const fullImageUrl = getFullImageUrl(cat.image_url);
          
//           return (
//             <div 
//               key={cat.id} 
//               className="flex-shrink-0 w-40 group cursor-pointer"
//               onClick={() => handleClick(cat.id)}
//             >
//               <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-gray-100 overflow-hidden">
//                 {/* الصورة في الكاروسيل */}
//                 <div 
//                   className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
//                   style={{ 
//                     background: cat.color ? `linear-gradient(135deg, ${cat.color}20, ${cat.color}40)` : undefined 
//                   }}
//                 >
//                   {fullImageUrl ? (
//                     <img
//                       src={fullImageUrl}
//                       alt={label}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       loading="lazy"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex items-center justify-center">
//                       <span className="text-3xl text-gray-400">
//                         {cat.icon || '📦'}
//                       </span>
//                     </div>
//                   )}
                  
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  
//                   <div className="absolute bottom-2 left-2">
//                     <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-700">
//                       {cat.product_count}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="p-3 text-center">
//                   <h3 className="font-semibold text-gray-900 text-xs line-clamp-2 leading-tight">
//                     {label}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CategoryCircleList;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Category } from '../../../api/types/category.types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// const API_BASE_URL = import.meta.env.VITE_API_URL
// interface CategoryCircleListProps {
//   categories: Category[];
//   size?: number;
//   spacing?: number;
//   showNameAr?: boolean;
// }

// const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
//   categories,
//   size = 100,
//   spacing = 20,
//   showNameAr = true,
// }) => {
//   const navigate = useNavigate();
//   const scrollContainerRef = React.useRef<HTMLDivElement>(null);

//   const handleClick = (id: number) => {
//     const categoryId = Number(id);
//     if (!isNaN(categoryId)) {
//       navigate(`/categories/${categoryId}/products`);
//     }
//   };

//   // دالة لبناء رابط الصورة الكامل
//   const getFullImageUrl = (imageUrl: string | null) => {
//     if (!imageUrl) return null;
    
//     if (imageUrl.startsWith('http')) {
//       return imageUrl;
//     }
    
//     if (imageUrl.startsWith('/')) {
//       return `${API_BASE_URL}${imageUrl}`;
//     }
    
//     return `${API_BASE_URL}/uploads/categories/${imageUrl}`;
//   };

//   // دوال التمرير للسلايدر
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="w-full relative px-1">
//       {/* أزرار التنقل */}
//       <div className="flex justify-between items-center mb-0">
//         {/* <h2 className="text-xl font-bold text-gray-900 flex-1">التصنيفات</h2> */}
        
//         {/* <div className="flex gap-2">
//           <button
//             onClick={scrollLeft}
//             className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
//             aria-label="السابق"
//           >
//             <ChevronRight className="w-4 h-4 text-gray-600" />
//           </button>
//           <button
//             onClick={scrollRight}
//             className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors"
//             aria-label="التالي"
//           >
//             <ChevronLeft className="w-4 h-4 text-gray-600" />
//           </button>
//         </div> */}
//       </div>

//       {/* السلايدر */}
//       <div className="relative">
//         {/* الزر الأيسر */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white transition-all hidden md:block"
//           aria-label="السابق"
//         >
//           <ChevronRight className="w-4 h-4 text-gray-700" />
//         </button>

//         {/* الزر الأيمن */}
//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white transition-all hidden md:block"
//           aria-label="التالي"
//         >
//           <ChevronLeft className="w-4 h-4 text-gray-700" />
//         </button>

//         {/* حاوية السلايدر */}
//         <div
//           ref={scrollContainerRef}
//           className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 p-2 px-2"
//           style={{ 
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none'
//           }}
//         >
//           {categories.map((cat) => {
//             const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
//             const fullImageUrl = getFullImageUrl(cat.image_url);
//             const productCount = parseInt(cat.product_count || '0');

//             return (
//               <div
//                 key={cat.id}
//                 className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
//                 style={{ width: size }}
//                 onClick={() => handleClick(cat.id)}
//               >
//                 {/* الدائرة - الكارت */}
//                 <div className="relative">
//                   {/* الخلفية الدائرية */}
//                   <div
//                     className="rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110"
//                     style={{
//                       width: size,
//                       height: size,
//                       background: cat.color 
//                         ? `linear-gradient(135deg, ${cat.color}30, ${cat.color}60)`
//                         : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
//                     }}
//                   >
//                     {/* الصورة */}
//                     <div className="w-full h-full rounded-full overflow-hidden p-1.5">
//                       {fullImageUrl ? (
//                         <img
//                           src={fullImageUrl}
//                           alt={label}
//                           className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
//                           loading="lazy"
//                           onError={(e) => {
//                             // إذا فشل تحميل الصورة، استخدم الخلفية الملونة
//                             e.currentTarget.style.display = 'none';
//                           }}
//                         />
//                       ) : (
//                         <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                           <span className="text-2xl text-gray-500">
//                             {cat.icon || '📦'}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* عدد المنتجات */}
//                     {productCount > 0 && (
//                       <div className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white">
//                         {productCount}
//                       </div>
//                     )}

//                     {/* تأثير hover */}
//                     <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
//                   </div>

//                   {/* مؤشر النشاط */}
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full border-2 border-white shadow-sm" />
//                 </div>

//                 {/* اسم التصنيف */}
//                 <div className="mt-3 text-center">
//                   <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
//                     {label}
//                   </h3>
                  
//                   {/* الاسم الإنجليزي (إذا كان مختلفاً) */}
//                   {/* {cat.name !== label && (
//                     <p className="text-xs text-gray-500 mt-1 line-clamp-1">
//                       {cat.name}
//                     </p>
//                   )} */}
                  
//                   {/* عدد المنتجات تحت الاسم */}
//                   {/* <p className="text-xs text-gray-400 mt-1">
//                     {productCount} منتج
//                   </p> */}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* مؤشر التمرير */}
//       <div className="flex justify-center mt-4 gap-1">
//         {categories.slice(0, 6).map((_, index) => (
//           <div
//             key={index}
//             className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryCircleList;






// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Category } from '../../../api/types/category.types';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const API_BASE_URL = import.meta.env.VITE_API_URL;

// interface CategoryCircleListProps {
//   categories: Category[];
//   size?: number;
//   spacing?: number;
//   showNameAr?: boolean;
// }

// const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
//   categories,
//   size = 100,
//   spacing = 20,
//   showNameAr = true,
// }) => {
//   const navigate = useNavigate();
//   const scrollContainerRef = React.useRef<HTMLDivElement>(null);

//   const handleClick = (id: number) => {
//     const categoryId = Number(id);
//     if (!isNaN(categoryId)) {
//       navigate(`/categories/${categoryId}/products`);
//     }
//   };

//   // دالة محسنة لبناء رابط الصورة الكامل
// const getFullImageUrl = (imageUrl: string | null) => {
//   if (!imageUrl) return null;
  
//   // إذا كان الرابط كاملاً بالفعل
//   if (imageUrl.startsWith('http')) {
//     return imageUrl;
//   }
  
//   // تنظيف الـ base URL
//   const baseUrl = API_BASE_URL?.replace(/\/$/, '');
  
//   // تنظيف image URL
//   const cleanImageUrl = imageUrl.replace(/^\//, '');
  
//   return `${baseUrl}/${cleanImageUrl}`;
// };

//   // دوال التمرير للسلايدر
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
//     }
//   };

//   // دالة لمعالجة أخطاء تحميل الصور
//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     const target = e.target as HTMLImageElement;
//     console.warn('فشل تحميل الصورة:', target.src);
    
//     // إخفاء الصورة المعطلة
//     target.style.display = 'none';
    
//     // يمكنك أيضاً إظهار أيقونة بديلة هنا إذا أردت
//   };

//   // دالة لمعالجة تحميل الصور بنجاح
//   const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//     const target = e.target as HTMLImageElement;
//     target.style.opacity = '1';
//   };

//   return (
//     <div className="w-full relative px-1">
//       {/* السلايدر */}
//       <div className="relative">
//         {/* الزر الأيسر */}
//         <button
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white transition-all hidden md:block"
//           aria-label="السابق"
//         >
//           <ChevronRight className="w-4 h-4 text-gray-700" />
//         </button>

//         {/* الزر الأيمن */}
//         <button
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white transition-all hidden md:block"
//           aria-label="التالي"
//         >
//           <ChevronLeft className="w-4 h-4 text-gray-700" />
//         </button>

//         {/* حاوية السلايدر */}
//         <div
//           ref={scrollContainerRef}
//           className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 p-2 px-2"
//           style={{ 
//             scrollbarWidth: 'none',
//             msOverflowStyle: 'none'
//           }}
//         >
//           {categories.map((cat) => {
//             const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
//             const fullImageUrl = getFullImageUrl(cat.image_url);
//             const productCount = parseInt(cat.product_count || '0');

//             // سجل تصحيح للأغراض التنموية
//             console.log('Category Image Debug:', {
//               category: label,
//               originalImage: cat.image_url,
//               fullImageUrl: fullImageUrl,
//               apiBaseUrl: API_BASE_URL
//             });

//             return (
//               <div
//                 key={cat.id}
//                 className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
//                 style={{ width: size }}
//                 onClick={() => handleClick(cat.id)}
//               >
//                 {/* الدائرة - الكارت */}
//                 <div className="relative">
//                   {/* الخلفية الدائرية */}
//                   <div
//                     className="rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110"
//                     style={{
//                       width: size,
//                       height: size,
//                       background: cat.color 
//                         ? `linear-gradient(135deg, ${cat.color}30, ${cat.color}60)`
//                         : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
//                     }}
//                   >
//                     {/* الصورة */}
//                     <div className="w-full h-full rounded-full overflow-hidden p-1.5">
//                       {fullImageUrl ? (
//                         <img
//                           src={fullImageUrl}
//                           alt={label}
//                           className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
//                           style={{ opacity: 0, transition: 'opacity 0.3s' }}
//                           loading="lazy"
//                           onLoad={handleImageLoad}
//                           onError={handleImageError}
//                         />
//                       ) : (
//                         <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
//                           <span className="text-2xl text-gray-500">
//                             {cat.icon || '📦'}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* عدد المنتجات */}
//                     {productCount > 0 && (
//                       <div className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white">
//                         {productCount > 99 ? '99+' : productCount}
//                       </div>
//                     )}

//                     {/* تأثير hover */}
//                     <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
//                   </div>

//                   {/* مؤشر النشاط */}
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full border-2 border-white shadow-sm" />
//                 </div>

//                 {/* اسم التصنيف */}
//                 <div className="mt-3 text-center">
//                   <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
//                     {label}
//                   </h3>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* مؤشر التمرير */}
//       <div className="flex justify-center mt-4 gap-1">
//         {categories.slice(0, Math.min(6, categories.length)).map((_, index) => (
//           <div
//             key={index}
//             className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryCircleList;







import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../api/types/category.types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface CategoryCircleListProps {
  categories: Category[];
  size?: number;
  spacing?: number;
  showNameAr?: boolean;
}

const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
  categories,
  size = 100,
  spacing = 20,
  showNameAr = true,
}) => {
  const navigate = useNavigate();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (id: number) => {
    const categoryId = Number(id);
    if (!isNaN(categoryId)) {
      navigate(`/categories/${categoryId}/products`);
    }
  };

  // دالة محسنة لبناء رابط الصورة الكامل
  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    // إذا كان الرابط كاملاً بالفعل (يحتوي على http أو https)
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // تنظيف الـ base URL - إزالة أي / في النهاية
    const baseUrl = API_BASE_URL?.replace(/\/$/, '');
    
    // إذا كان imageUrl يبدأ بـ /uploads/ فهذا يعني أنه مسار كامل من الجذر
    if (imageUrl.startsWith('/uploads/')) {
      return `${baseUrl}${imageUrl}`;
    }
    
    // إذا كان imageUrl يبدأ بـ / فقط
    if (imageUrl.startsWith('/')) {
      return `${baseUrl}${imageUrl}`;
    }
    
    // إذا كان اسم ملف فقط (بدون /)
    return `${baseUrl}/uploads/categories/${imageUrl}`;
  };

  // دوال التمرير للسلايدر
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // دالة محسنة لمعالجة أخطاء تحميل الصور
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, categoryName: string) => {
    const target = e.target as HTMLImageElement;
    console.warn(`فشل تحميل الصورة للتصنيف "${categoryName}":`, target.src);
    
    // إخفاء الصورة المعطلة وإظهار الأيقونة البديلة
    const parent = target.parentElement;
    if (parent) {
      target.style.display = 'none';
      // إنشاء عنصر الأيقونة البديلة
      const fallback = document.createElement('div');
      fallback.className = 'w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center';
      fallback.innerHTML = '<span class="text-2xl text-gray-500">📦</span>';
      parent.appendChild(fallback);
    }
  };

  // دالة لمعالجة تحميل الصور بنجاح
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.opacity = '1';
  };

  // تصفية التصنيفات لتفادي التكرار
  const uniqueCategories = categories.filter((cat, index, self) => 
    index === self.findIndex(c => c.id === cat.id)
  );

  return (
    <div className="w-full relative px-1">
      {/* السلايدر */}
      <div className="relative">
        {/* الزر الأيسر */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white transition-all hidden md:block"
          aria-label="السابق"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>

        {/* الزر الأيمن */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg hover:bg-white transition-all hidden md:block"
          aria-label="التالي"
        >
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>

        {/* حاوية السلايدر */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 pb-4 p-2 px-2"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {uniqueCategories.map((cat) => {
            const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name;
            const fullImageUrl = getFullImageUrl(cat.image_url);
            const productCount = parseInt(cat.product_count || '0');

            // سجل تصحيح للأغراض التنموية
            if (cat.image_url) {
              console.log('Category Image Debug:', {
                category: label,
                originalImage: cat.image_url,
                fullImageUrl: fullImageUrl,
                apiBaseUrl: API_BASE_URL,
                isExternal: cat.image_url.startsWith('http')
              });
            }

            return (
              <div
                key={cat.id}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
                style={{ width: size }}
                onClick={() => handleClick(cat.id)}
              >
                {/* الدائرة - الكارت */}
                <div className="relative">
                  {/* الخلفية الدائرية */}
                  <div
                    className="rounded-full border-4 border-white shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110"
                    style={{
                      width: size,
                      height: size,
                      background: cat.color 
                        ? `linear-gradient(135deg, ${cat.color}30, ${cat.color}60)`
                        : 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    }}
                  >
                    {/* الصورة */}
                    <div className="w-full h-full rounded-full overflow-hidden p-1.5">
                      {fullImageUrl ? (
                        <img
                          src={fullImageUrl}
                          alt={label}
                          className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                          style={{ opacity: 0, transition: 'opacity 0.3s' }}
                          loading="lazy"
                          onLoad={handleImageLoad}
                          onError={(e) => handleImageError(e, label)}
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-2xl text-gray-500">
                            {cat.icon || '📦'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* عدد المنتجات */}
                    {productCount > 0 && (
                      <div className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white">
                        {productCount > 99 ? '99+' : productCount}
                      </div>
                    )}

                    {/* تأثير hover */}
                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>

                  {/* مؤشر النشاط */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                </div>

                {/* اسم التصنيف */}
                <div className="mt-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {label}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* مؤشر التمرير */}
      <div className="flex justify-center mt-4 gap-1">
        {uniqueCategories.slice(0, Math.min(6, uniqueCategories.length)).map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-gray-300 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCircleList;