// import type React from "react"
// import { Link } from "react-router-dom"
// import { Package } from "lucide-react"

// interface CategoryCardProps {
//   id: number
//   name: string
//   name_ar: string
//   image_url?: string
//   emoji_icon?: string
//   product_count?: string
//   size?: number
// }

// const CategoryCard: React.FC<CategoryCardProps> = ({
//   id,
//   name_ar,
//   image_url,
//   emoji_icon,
//   product_count,
//   size = 90,
// }) => {
//   const productCountNum = Number.parseInt(product_count || "0")

//   return (
//     <Link
//       to={`/category/${id}`}
//       className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
//     >
//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//       <div className="relative p-4 flex flex-col items-center text-center">
//         {/* Category Image/Icon */}
//         <div className="relative mb-3">
//           <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-pink-500/20 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
//             {image_url ? (
//               <img
//                 src={image_url || "/placeholder.svg"}
//                 alt={name_ar}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//             ) : emoji_icon ? (
//               <span className="text-4xl">{emoji_icon}</span>
//             ) : (
//               <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
//             )}
//           </div>

//           {/* Product count badge */}
//           {productCountNum > 0 && (
//             <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
//               {productCountNum}
//             </div>
//           )}
//         </div>

//         {/* Category Name */}
//         <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//           {name_ar}
//         </h3>

//         {/* Product count text */}
//         <p className="text-xs text-gray-500 dark:text-gray-400">{productCountNum} منتج</p>
//       </div>
//     </Link>
//   )
// }

// export default CategoryCard




"use client"

import type React from "react"
import type { Category } from "../../../api/types/category.types"

// ============================================================================
// Types & Interfaces
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

// ============================================================================
// Category Circle Card Component
// ============================================================================

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

export default CategoryCircleCard