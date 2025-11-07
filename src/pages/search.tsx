"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Search, X, Grid, List, SlidersHorizontal, ChevronRight, ArrowUpDown, Calendar } from "lucide-react"
import ProductsList from "../components/App-components/Product/ProductsList"
import { useCategories } from "../hooks/useCategory"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"

const SearchPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { categories, isLoading: categoriesLoading } = useCategories()

  const urlQuery = searchParams.get("q") || ""
  const urlCategoryId = searchParams.get("category")
  const urlViewMode = (searchParams.get("view") as "grid" | "list") || "grid"

  const [searchQuery, setSearchQuery] = useState(urlQuery)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    urlCategoryId ? Number.parseInt(urlCategoryId) : null,
  )
  const [viewMode, setViewMode] = useState<"grid" | "list">(urlViewMode)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localSearch, setLocalSearch] = useState(urlQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== urlQuery) {
        if (localSearch.trim()) {
          searchParams.set("q", localSearch.trim())
        } else {
          searchParams.delete("q")
        }
        setSearchParams(searchParams)
        setSearchQuery(localSearch.trim())
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [localSearch, searchParams, setSearchParams, urlQuery])

  useEffect(() => {
    setSearchQuery(urlQuery)
    setLocalSearch(urlQuery)
  }, [urlQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localSearch.trim()) {
      searchParams.set("q", localSearch.trim())
    } else {
      searchParams.delete("q")
    }
    setSearchParams(searchParams)
    setSearchQuery(localSearch.trim())
  }

  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId)

    if (categoryId) {
      searchParams.set("category", categoryId.toString())
    } else {
      searchParams.delete("category")
    }
    setSearchParams(searchParams)
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode)
    searchParams.set("view", mode)
    setSearchParams(searchParams)
  }

  const clearAllFilters = () => {
    setSelectedCategoryId(null)
    setLocalSearch("")
    setSearchQuery("")
    setSearchParams({})
  }

  const hasActiveFilters = selectedCategoryId !== null || searchQuery !== ""

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-24 sm:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <form onSubmit={handleSubmit}>
            <div className="relative p-[2px] rounded-[24px] bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="relative bg-white dark:bg-gray-900 rounded-[22px] overflow-hidden">
                <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-6 h-6 z-10" />
                <Input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pr-16 pl-6 py-6 text-lg border-0 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1 px-3 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 transition-all"
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="font-medium">ترتيب</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-90" : ""}`} />
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-1 px-3 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium">التاريخ</span>
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1 px-3 py-2.5 rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="font-medium">الفلاتر</span>
            {hasActiveFilters && (
              <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full ml-1">
                {(searchQuery ? 1 : 0) + (selectedCategoryId ? 1 : 0)}
              </Badge>
            )}
          </Button>
 <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewModeChange("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Grid className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewModeChange("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <List className="w-5 h-5" />
            </Button>
          {/* <div className="mr-auto flex items-center gap-2">
           
          </div> */}
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {searchQuery && (
              <Badge className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600 transition-all">
                <span className="max-w-[200px] truncate">{searchQuery}</span>
                <button
                  onClick={() => {
                    setLocalSearch("")
                    setSearchQuery("")
                    searchParams.delete("q")
                    setSearchParams(searchParams)
                  }}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            )}

            {selectedCategoryId && (
              <Badge className="flex items-center gap-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:border-gray-300 dark:hover:border-gray-600 transition-all">
                <span className="max-w-[150px] truncate">
                  {categories.find((c) => c.id === selectedCategoryId)?.name_ar ||
                    categories.find((c) => c.id === selectedCategoryId)?.name}
                </span>
                <button
                  onClick={() => handleCategorySelect(null)}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </Badge>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm font-medium"
            >
              مسح الكل
            </Button>
          </div>
        )}

        {isFilterOpen && (
          <div className="mb-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">التصنيفات</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              <label className="flex items-center cursor-pointer group p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategoryId === null}
                  onChange={() => handleCategorySelect(null)}
                  className="w-4 h-4 text-blue-600 cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-medium transition-colors mr-3">
                  جميع التصنيفات
                </span>
              </label>
              {categoriesLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">جاري التحميل...</p>
                </div>
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center cursor-pointer group p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategoryId === category.id}
                      onChange={() => handleCategorySelect(category.id)}
                      className="w-4 h-4 text-blue-600 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-400 font-medium transition-colors mr-3 truncate">
                      {category.name_ar || category.name}
                    </span>
                  </label>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500 dark:text-gray-400">لا توجد تصنيفات متاحة</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className=" overflow-hidden">
          <ProductsList categoryId={selectedCategoryId} searchQuery={searchQuery} viewMode={viewMode} />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
