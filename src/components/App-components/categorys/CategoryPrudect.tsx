"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCategories } from "../../../hooks/useCategory"
import ProductsList from "../Product/ProductsList"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Search, ArrowRight, Home, Loader2, SlidersHorizontal, X } from "lucide-react"

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_URL

  const numericCategoryId = categoryId ? Number.parseInt(categoryId) : 0
  const isValidCategoryId = numericCategoryId && numericCategoryId > 0

  const { categories, isLoading: categoriesLoading } = useCategories()
  const [sortBy, setSortBy] = useState<string>("newest")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [categoryImageError, setCategoryImageError] = useState(false)

  const currentCategory = useMemo(() => {
    return categories?.find((cat) => cat.id === numericCategoryId) || null
  }, [categories, numericCategoryId])

  const getFullCategoryImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null

    if (imageUrl.startsWith("http")) {
      return imageUrl
    }

    if (imageUrl.startsWith("/")) {
      return `${API_BASE_URL}${imageUrl}`
    }

    return `${API_BASE_URL}/uploads/categories/${imageUrl}`
  }

  useEffect(() => {
    setSearchTerm("")
    setShowFilters(false)
    setCategoryImageError(false)
  }, [categoryId])

  useEffect(() => {
    const handleScroll = () => {
      if (showFilters) {
        setShowFilters(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showFilters])

  const categoryImageUrl = currentCategory ? getFullCategoryImageUrl(currentCategory.image_url) : null

  if (!isValidCategoryId) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
        <div className="text-center bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 max-w-md w-full border border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">التصنيف غير موجود</h2>
          <Button
            onClick={() => navigate("/")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium w-full"
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    )
  }

  if (categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-amber-600 dark:text-amber-400 mx-auto mb-4" />
          <p className="text-gray-700 dark:text-gray-300 font-medium">جاري تحميل البيانات...</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">تصنيف رقم: {numericCategoryId}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* الهيدر */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-900/95">
        <div className="container mx-auto px-4 py-3">
          {/* مسار التنقل */}
          <nav className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-1 text-xs"
            >
              <Home className="w-3 h-3" />
              <span className="hidden xs:inline">الرئيسية</span>
            </Button>
            <ArrowRight className="w-3 h-3 rotate-180 text-gray-400 dark:text-gray-600" />
            <Button
              variant="ghost"
              onClick={() => navigate("/categories")}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-2 py-1 text-xs"
            >
              <span className="hidden xs:inline">التصنيفات</span>
            </Button>
            <ArrowRight className="w-3 h-3 rotate-180 text-gray-400 dark:text-gray-600" />
            <span className="text-gray-900 dark:text-white font-semibold text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
              {currentCategory?.name_ar || currentCategory?.name}
            </span>
          </nav>

          {/* عنوان التصنيف */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl shadow-lg border-2 border-white dark:border-gray-800 overflow-hidden"
                style={{
                  background: currentCategory?.color
                    ? `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}60)`
                    : "linear-gradient(135deg, #D9730020, #D9730060)",
                }}
              >
                {categoryImageUrl && !categoryImageError ? (
                  <img
                    src={categoryImageUrl || "/placeholder.svg"}
                    alt={currentCategory?.name_ar || currentCategory?.name}
                    className="w-full h-full object-cover"
                    onError={() => setCategoryImageError(true)}
                  />
                ) : (
                  <span className="text-xl">{currentCategory?.icon || "📦"}</span>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                {currentCategory?.name_ar || currentCategory?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">استعرض المنتجات المتاحة</p>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-2">
              {/* زر البحث */}
              <div className="relative hidden sm:block">
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
                <Input
                  type="text"
                  placeholder="ابحث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-8 text-right h-8 sm:h-9 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-32 sm:w-48 text-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
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
                  const search = prompt("ابحث في المنتجات:")
                  if (search !== null) setSearchTerm(search)
                }}
                className="sm:hidden h-8 w-8 p-0 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </Button>

              {/* زر الفلاتر */}
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-8 sm:h-9 px-2 sm:px-3 rounded-lg border text-xs ${
                  showFilters
                    ? "bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
                    : "border-gray-300 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <Input
                type="text"
                placeholder="ابحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-8 text-right h-9 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white w-full text-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* الفلاتر */}
          {showFilters && (
            <div className="mb-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">الفلاتر</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">ترتيب حسب</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full h-8 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs">
                      <SelectItem value="name" className="text-right text-xs dark:text-white">
                        الاسم
                      </SelectItem>
                      <SelectItem value="price" className="text-right text-xs dark:text-white">
                        السعر من الأقل للأعلى
                      </SelectItem>
                      <SelectItem value="price_desc" className="text-right text-xs dark:text-white">
                        السعر من الأعلى للأقل
                      </SelectItem>
                      <SelectItem value="rating" className="text-right text-xs dark:text-white">
                        الأعلى تقييماً
                      </SelectItem>
                      <SelectItem value="newest" className="text-right text-xs dark:text-white">
                        الأحدث
                      </SelectItem>
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
        <ProductsList categoryId={numericCategoryId} searchQuery={searchTerm} viewMode={viewMode} />
      </main>

      {/* الفوتر */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-6">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-gray-600 dark:text-gray-400 text-xs">
            <p>© 2025 جميع الحقوق محفوظة. {currentCategory?.name_ar || currentCategory?.name}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default CategoryProducts
