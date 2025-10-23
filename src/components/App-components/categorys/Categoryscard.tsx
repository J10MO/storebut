"use client"

import type React from "react"
import { useCategories } from "../../../hooks/useCategory"
import { Button } from "../../ui/button"
import { RefreshCw, Star, Package, TrendingUp, Loader2 } from "lucide-react"
import ProductsList from "../Product/ProductsList"
import CategoryCircleList from "./CategoryList"

// ============================================================================
// Helper Functions
// ============================================================================

const calculateStatistics = (categories: any[]) => {
  const totalProducts = categories.reduce((total, cat) => total + Number.parseInt(cat.product_count || "0"), 0)
  const activeCategories = categories.filter((cat) => Number.parseInt(cat.product_count || "0") > 0).length

  return { totalProducts, activeCategories }
}

// ============================================================================
// Sub Components
// ============================================================================

const LoadingState: React.FC = () => (
  <div className="min-h-60 flex items-center justify-center py-8">
    <div className="text-center">
      <Loader2 className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
      <p className="text-gray-600 dark:text-gray-400 text-sm">جاري تحميل التصنيفات...</p>
    </div>
  </div>
)

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="min-h-60 flex items-center justify-center py-8">
    <div className="text-center">
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{error}</p>
      <Button
        onClick={onRetry}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <RefreshCw className="w-3 h-3 ml-1" />
        إعادة المحاولة
      </Button>
    </div>
  </div>
)

interface StatisticItemProps {
  icon: React.ReactNode
  label: string
  value: number
  color: string
}

const StatisticItem: React.FC<StatisticItemProps> = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform duration-200">
    <div className={color}>{icon}</div>
    <span className="font-medium">{value}</span>
    <span className="text-xs">{label}</span>
  </div>
)

// ============================================================================
// Main Component
// ============================================================================

const CategoriesOverview: React.FC = () => {
  const { categories, isLoading, error, refetch } = useCategories()

  // ============================================================================
  // Loading & Error States
  // ============================================================================

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} onRetry={refetch} />

  // ============================================================================
  // Calculate Statistics
  // ============================================================================

  const { totalProducts, activeCategories } = calculateStatistics(categories)

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="space-y-6">
      {/* Categories Section */}
      <section className="w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl py-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* Header with Statistics */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            {/* Statistics */}
            <div className="flex items-center gap-3 flex-wrap">
              <StatisticItem
                icon={<Package className="w-4 h-4" />}
                label="تصنيف"
                value={categories.length}
                color="text-blue-600 dark:text-blue-400"
              />
              <StatisticItem
                icon={<TrendingUp className="w-4 h-4" />}
                label="منتج"
                value={totalProducts}
                color="text-green-600 dark:text-green-400"
              />
              <StatisticItem
                icon={<Star className="w-4 h-4" />}
                label="نشط"
                value={activeCategories}
                color="text-yellow-600 dark:text-yellow-400"
              />
            </div>

            {/* Refresh Button */}
            <Button
              onClick={refetch}
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <RefreshCw className="w-3 h-3 ml-1" />
              تحديث
            </Button>
          </div>

          {/* Category Circle List */}
          <CategoryCircleList categories={categories} size={90} showNameAr={true} />

          {/* Helper Text */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30 px-4 py-2 rounded-full inline-block">
              انقر على أي تصنيف لعرض المنتجات الخاصة به
            </p>
          </div>
        </div>
      </section>

      {/* Products List Section */}
      <ProductsList />
    </div>
  )
}

export default CategoriesOverview
