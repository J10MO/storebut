// components/categories/CategoryGrid.tsx
import React from 'react';
import { useCategories } from '../../hooks/useCategory';
import { Category } from '../../api/types/category.types';
import { Package, Loader2, Grid3X3 } from 'lucide-react';

// تأكد من تعريف الـ interface بشكل صحيح
interface CategoryGridProps {
  onCategorySelect: (categoryId: number | null) => void;
  selectedCategoryId?: number | null;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  onCategorySelect, 
  selectedCategoryId 
}) => {
  const { categories, isLoading, error } = useCategories();

  // دالة لإنشاء رابط صورة كامل
  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5000${imageUrl}`;
    }
    
    return `http://localhost:5000/uploads/categories/${imageUrl}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        <span className="mr-2 text-gray-600 text-sm">جاري تحميل التصنيفات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-600 text-sm">
        <p>خطأ في تحميل التصنيفات</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        <Package className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm">لا توجد تصنيفات متاحة</p>
      </div>
    );
  }

  return (
    <div className="w-full mb-8">
      {/* العنوان */}
      <div className="flex items-center gap-2 mb-4">
        <Grid3X3 className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">التصنيفات</h2>
      </div>

      {/* شبكة التصنيفات */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {/* تصنيف الكل */}
        <button
          onClick={() => onCategorySelect(null)}
          className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
            selectedCategoryId === null
              ? 'border-blue-500 bg-blue-50 shadow-sm'
              : 'border-gray-200 bg-white hover:border-blue-300'
          }`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2">
            <span className="text-white text-sm">📦</span>
          </div>
          <span className="text-xs font-medium text-gray-900 text-center leading-tight">
            الكل
          </span>
        </button>

        {/* التصنيفات */}
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 hover:shadow-md group ${
              selectedCategoryId === category.id
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            {/* صورة التصنيف */}
            <div className="w-10 h-10 rounded-lg overflow-hidden mb-2 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              {category.image_url ? (
                <img
                  src={getFullImageUrl(category.image_url)}
                  alt={category.name_ar || category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                  loading="lazy"
                />
              ) : category.emoji_icon ? (
                <span className="text-sm">{category.emoji_icon}</span>
              ) : (
                <Package className="w-5 h-5 text-gray-400" />
              )}
            </div>

            {/* اسم التصنيف */}
            <span className="text-xs font-medium text-gray-900 text-center leading-tight">
              {category.name_ar || category.name}
            </span>

            {/* عدد المنتجات */}
            {category.product_count !== undefined && category.product_count > 0 && (
              <span className="text-[10px] text-gray-500 mt-1">
                {category.product_count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
