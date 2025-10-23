"use client"

import type React from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Category } from "../../../api/types/category.types"

const API_BASE_URL = import.meta.env.VITE_API_URL

// ============================================================================
// Types & Interfaces
// ============================================================================

interface CategoryCircleListProps {
  categories: Category[]
  size?: number
  spacing?: number
  showNameAr?: boolean
}

// ============================================================================
// Helper Functions
// ============================================================================

const getFullImageUrl = (imageUrl: string | null): string | null => {
  if (!imageUrl) return null
  if (imageUrl.startsWith("http")) return imageUrl

  const baseUrl = API_BASE_URL?.replace(/\/$/, "")

  if (imageUrl.startsWith("/uploads/")) return `${baseUrl}${imageUrl}`
  if (imageUrl.startsWith("/")) return `${baseUrl}${imageUrl}`

  return `${baseUrl}/uploads/categories/${imageUrl}`
}

const getUniqueCategories = (categories: Category[]): Category[] => {
  return categories.filter((cat, index, self) => index === self.findIndex((c) => c.id === cat.id))
}

// ============================================================================
// Main Component
// ============================================================================

const CategoryCircleList: React.FC<CategoryCircleListProps> = ({
  categories,
  size = 80,
  spacing = 16,
  showNameAr = true,
}) => {
  const navigate = useNavigate()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // ============================================================================
  // Event Handlers
  // ============================================================================

  const handleCategoryClick = (id: number) => {
    const categoryId = Number(id)
    if (!isNaN(categoryId)) {
      navigate(`/products/categories/${categoryId}`)
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.style.display = "none"
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    target.style.opacity = "1"
  }

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -150, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 150, behavior: "smooth" })
  }

  // ============================================================================
  // Data Processing
  // ============================================================================

  const uniqueCategories = getUniqueCategories(categories)
  const showNavigationButtons = uniqueCategories.length > 4

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className="w-full relative">
      <div className="relative">
        {/* Navigation Buttons */}
        {/* {showNavigationButtons && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:scale-110"
              aria-label="السابق"
            >
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-700 dark:text-gray-300" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-1.5 md:p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-xl hover:scale-110"
              aria-label="التالي"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </>
        )} */}

        {/* Categories Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-2 px-"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {uniqueCategories.map((cat) => {
            const label = showNameAr && cat.name_ar ? cat.name_ar : cat.name
            const fullImageUrl = getFullImageUrl(cat.image_url)
            const productCount = Number.parseInt(cat.product_count || "0")

            return (
              <CategoryCircleCard
                key={cat.id}
                category={cat}
                label={label}
                imageUrl={fullImageUrl}
                productCount={productCount}
                size={size}
                onClick={() => handleCategoryClick(cat.id)}
                onImageError={handleImageError}
                onImageLoad={handleImageLoad}
              />
            )
          })}
        </div>
      </div>

      {/* Hide Scrollbar Styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

// ============================================================================
// Category Circle Card Component
// ============================================================================

interface CategoryCircleCardProps {
  category: Category
  label: string
  imageUrl: string | null
  productCount: number
  size: number
  onClick: () => void
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

const CategoryCircleCard: React.FC<CategoryCircleCardProps> = ({
  category,
  label,
  imageUrl,
  productCount,
  size,
  onClick,
  onImageError,
  onImageLoad,
}) => {
  const gradientBackground = category.color
    ? `linear-gradient(135deg, ${category.color}20, ${category.color}40)`
    : "linear-gradient(135deg, #f8fafc, #f1f5f9)"

  return (
    <div
      className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
      style={{ width: size }}
      onClick={onClick}
    >
      {/* Circle Container */}
      <div className="relative">
        {/* Circle Background */}
        <div
          className="rounded-full border-2 md:border-3 border-white dark:border-gray-700 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 dark:shadow-gray-900/50"
          style={{
            width: size,
            height: size,
            background: gradientBackground,
          }}
        >
          {/* Image Container */}
          <div className="w-full h-full rounded-full overflow-hidden p-1">
            {imageUrl ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={label}
                className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ opacity: 0, transition: "opacity 0.3s" }}
                loading="lazy"
                onLoad={onImageLoad}
                onError={onImageError}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                <span className="text-lg md:text-xl">{category.icon || "📦"}</span>
              </div>
            )}
          </div>

          {/* Product Count Badge */}
          {productCount > 0 && (
            <div className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] md:text-xs font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center shadow-md border-2 border-white dark:border-gray-800 animate-pulse">
              {productCount > 99 ? "99+" : productCount}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-all duration-300" />
        </div>

        {/* Active Indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
      </div>

      {/* Category Name */}
      <div className="mt-2 text-center w-full">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 text-xs md:text-sm line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 px-1">
          {label}
        </h3>
      </div>
    </div>
  )
}

export default CategoryCircleList
