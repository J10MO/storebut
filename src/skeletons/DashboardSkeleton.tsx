import { ProductCardSkeleton } from "./ProductCardSkeleton"
import { CategoryCardSkeleton } from "./CategoryCardSkeleton"

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Hero Skeleton */}
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />

        {/* Categories Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-48" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Products Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
