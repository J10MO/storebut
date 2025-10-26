export const AdsCarouselSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex overflow-x-auto scrollbar-hide gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-shrink-0 w-[90vw] max-w-md md:w-auto">
            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md animate-pulse">
              {/* Image skeleton */}
              <div className="w-full h-[160px] sm:h-[200px] md:h-[180px] lg:h-[220px] xl:h-[250px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />

              {/* Content skeleton */}
              <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
