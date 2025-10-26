import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"

export const ProductCardSkeleton = ({ variant = "vertical" }: { variant?: "vertical" | "horizontal" }) => {
  if (variant === "horizontal") {
    return (
      <Card className="flex flex-col sm:flex-row border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
        <div className="relative w-full sm:w-56 h-48 sm:h-56 bg-gray-200 dark:bg-gray-800 animate-pulse flex-shrink-0" />
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-2/3" />
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2" />
          </div>
          <div className="flex gap-3 mt-4">
            <div className="flex-1 h-11 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
            <div className="flex-1 h-11 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 rounded-2xl overflow-hidden">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
      </CardHeader>
      <CardContent className="pb-2 px-4 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2" />
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-2/3" />
      </CardContent>
      <CardFooter className="pt-2 px-4 pb-4">
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CardFooter>
    </Card>
  )
}
