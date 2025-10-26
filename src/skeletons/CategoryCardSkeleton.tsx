export const CategoryCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <div className="relative w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-16" />
    </div>
  )
}
