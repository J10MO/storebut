import React, { useState, useEffect } from 'react';

// تعريف نوع البيانات للفئة
interface Category {
  id: number;
  name: string;
  name_ar: string;
  icon: string;
  color: string;
  image_url: string;
  product_count: string;
  created_at: string;
}

const CategoryCards: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // عنوان API الأساسي
  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // دالة لبناء رابط الصورة الكامل
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder-image.jpg';
    
    // إذا كان الرابط يحتوي بالفعل على http، ارجعه كما هو
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // إذا بدأ بـ /، أضف العنوان الأساسي
    if (imagePath.startsWith('/')) {
      return `${API_BASE_URL}${imagePath}`;
    }
    
    // إذا لم يبدأ بـ /، أضف العنوان الأساسي و /
    return `${API_BASE_URL}/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
        <strong>خطأ:</strong> {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          فئات المنتجات
        </h1>
        <p className="text-center text-gray-600 mb-8">
          استعرض جميع الفئات المتاحة
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* صورة الفئة - إصدار محسن */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={getImageUrl(category.image_url)}
                  alt={category.name_ar}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // إذا فشل تحميل الصورة، استخدم اللون الخلفي
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                
                {/* خلفية احتياطية إذا فشلت الصورة */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundColor: category.color || '#f3f4f6',
                    display: 'none' // مخفي افتراضياً
                  }}
                  id={`fallback-${category.id}`}
                ></div>
                
                {/* أيقونة الفئة */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                
                {/* عدد المنتجات */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                  {category.product_count} منتج
                </div>
              </div>
              
              {/* محتوى البطاقة */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {category.name_ar}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {category.name}
                  </span>
                </div>
                
                {/* تاريخ الإنشاء */}
                <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                  تم الإنشاء: {new Date(category.created_at).toLocaleDateString('ar-EG')}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد فئات متاحة حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCards;