// pages/SearchPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, X, Grid, List, SlidersHorizontal } from 'lucide-react';
import ProductsList from '../components/App-components/Product/ProductsList';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // الحصول على معاملات البحث من URL
  const urlQuery = searchParams.get('q') || '';
  const urlCategoryId = searchParams.get('category');
  const urlViewMode = searchParams.get('view') as 'grid' | 'list' || 'grid';
  
  // حالات المكون
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    urlCategoryId ? parseInt(urlCategoryId) : null
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(urlViewMode);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(urlQuery);

  // تحديث معاملات URL عند تغيير البحث
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

  // تحديث حالة البحث عند تغيير URL
  useEffect(() => {
    setSearchQuery(urlQuery);
    setLocalSearch(urlQuery);
  }, [urlQuery]);

  // معالجة إرسال النموذج
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

  // معالجة اختيار التصنيف
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    
    if (categoryId) {
      searchParams.set('category', categoryId.toString());
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  // تغيير وضع العرض
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    searchParams.set('view', mode);
    setSearchParams(searchParams);
  };

  // مسح جميع الفلاتر
  const clearAllFilters = () => {
    setSelectedCategoryId(null);
    setLocalSearch('');
    setSearchQuery('');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* شريط البحث */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="ابحث عن المنتجات بالعربية أو الإنجليزية..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 bg-white"
              />
            </div>
            <Button 
              type="submit" 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              بحث
            </Button>
          </form>
        </div>

        {/* رأس الصفحة */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : 'جميع المنتجات'}
            </h1>
            <p className="text-gray-600 mt-1">
              {searchQuery 
                ? `تم العثور على منتجات تطابق بحثك` 
                : 'تصفح جميع المنتجات المتاحة'}
            </p>
          </div>

          {/* أدوات التحكم */}
          <div className="flex items-center gap-3">
            {/* زر الفلاتر */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فلاتر
              {hasActiveFilters && (
                <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                  !
                </Badge>
              )}
            </Button>

            {/* أزرار تغيير العرض */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('grid')}
                className="rounded-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleViewModeChange('list')}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* الفلاتر النشطة */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
            
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                بحث: {searchQuery}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                    searchParams.delete('q');
                    setSearchParams(searchParams);
                  }}
                />
              </Badge>
            )}
            
            {selectedCategoryId && (
              <Badge variant="secondary" className="flex items-center gap-1">
                تصنيف: {selectedCategoryId}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleCategorySelect(null)}
                />
              </Badge>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm"
            >
              مسح الكل
            </Button>
          </div>
        )}

        {/* لوحة الفلاتر */}
        {isFilterOpen && (
          <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">الفلاتر</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* هنا يمكن إضافة فلاتر إضافية مثل:
                 - فلاتر بالسعر
                 - فلاتر بالتقييم
                 - فلاتر بالتوفر
              */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التصنيفات
                </label>
                <div className="space-y-2">
                  {/* يمكن استبدال هذا بقائمة تصنيفات ديناميكية */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategoryId === null}
                      onChange={() => handleCategorySelect(null)}
                      className="ml-2"
                    />
                    جميع التصنيفات
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategoryId === 1}
                      onChange={() => handleCategorySelect(1)}
                      className="ml-2"
                    />
                    التصنيف 1
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* قائمة المنتجات */}
        <ProductsList 
          categoryId={selectedCategoryId}
          searchQuery={searchQuery}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default SearchPage;