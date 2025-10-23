// pages/CategoryProducts.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategory, useCategoryProducts } from '../hooks/useCategory';
import ProductsList from '../components/App-components/Product/ProductsList';
import { ArrowRight, Home, Package, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';

const CategoryProducts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const categoryId = id ? parseInt(id) : null;
  
  const { 
    category, 
    isLoading: categoryLoading, 
    error: categoryError 
  } = useCategory(categoryId!);
  
  const { 
    products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useCategoryProducts(categoryId!);

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">جاري تحميل ال��صنيف...</p>
        </div>
      </div>
    );
  }

  if (categoryError || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">التصنيف غير موجود</h2>
          <p className="text-gray-500 mb-6">لم نتمكن من العثور على هذا التصنيف.</p>
          <Button onClick={() => navigate('/products')}>
    العودة إلى المنتجات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* مسار التنقل */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/" 
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <Home className="w-4 h-4" />
                الرئيسية
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                المنتجات
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-gray-900 font-medium">
                {category.name_ar}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* هيدر التصنيف */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* صورة التصنيف */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                {category.image_url ? (
                  <img
                    src={category.image_url.startsWith('http') 
                      ? category.image_url 
                      : `http://localhost:5000${category.image_url}`
                    }
                    alt={category.name_ar}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : category.emoji_icon ? (
                  <span className="text-2xl">{category.emoji_icon}</span>
                ) : (
                  <Package className="w-8 h-8 text-blue-600" />
                )}
              </div>

              {/* معلومات التصنيف */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {category.name_ar}
                </h1>
                <p className="text-gray-600 mb-3">
                  {category.name}
                </p>
                {category.description_ar && (
                  <p className="text-sm text-gray-500 max-w-2xl">
                    {category.description_ar}
                  </p>
                )}
              </div>
            </div>

            {/* إحصائيات التصنيف */}
            <div className="flex items-center gap-6 bg-gray-50 px-4 py-3 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {products.length}
                </div>
                <div className="text-sm text-gray-600">منتج</div>
              </div>
              
              <div className="w-px h-8 bg-gray-300"></div>
              
              <Button
                variant="outline"
                onClick={() => navigate('/products')}
                className="flex items-center gap-2"
              >
                جميع التصنيفات
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* قائمة المنتجات */}
        <ProductsList 
          categoryId={categoryId}
          isLoading={productsLoading}
          error={productsError}
          products={products}
        />
      </div>
    </div>
  );
};

export default CategoryProducts;
