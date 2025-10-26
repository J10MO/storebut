export const CategoryCircleSkeleton = ({ count = 8, size = 80 }: { count?: number; size?: number }) => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-2 px-1">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col items-center flex-shrink-0 animate-pulse" style={{ width: size }}>
          {/* Circle skeleton */}
          <div
            className="rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 border-2 border-gray-300 dark:border-gray-600"
            style={{ width: size, height: size }}
          />

          {/* Name skeleton */}
          <div className="mt-2 w-full">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          </div>
        </div>
      ))}

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
