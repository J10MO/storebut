"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../../ui/card"
import { useHomepageAds } from "../../../hooks/useAd"
import type { Ad } from "../../../api/types/ads.types"
import { Loader2, Eye, MousePointerClick } from "lucide-react"

interface AdsCarouselProps {
  className?: string
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({ className = "" }) => {
  const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds()
  const navigate = useNavigate()
  const viewedAdsRef = useRef<Set<number>>(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleAdClick = useCallback(
    async (ad: Ad, e: React.MouseEvent) => {
      e.preventDefault()

      try {
        // Track the click
        await trackClick(ad.id)
        console.log("[v0] Ad clicked:", ad.id, "Product ID:", ad.product_id)

        // Navigate to product page
        navigate(`/product/${ad.product_id}`)
      } catch (error) {
        console.error("[v0] Failed to track ad click:", error)
      }
    },
    [trackClick, navigate],
  )

  const handleAdView = useCallback(
    async (ad: Ad) => {
      if (viewedAdsRef.current.has(ad.id)) return

      viewedAdsRef.current.add(ad.id)
      try {
        await trackView(ad.id)
        console.log("[v0] Ad viewed:", ad.id)
      } catch (error) {
        console.error("[v0] Failed to track ad view:", error)
      }
    },
    [trackView],
  )

  useEffect(() => {
    homepageAds.forEach((ad) => {
      handleAdView(ad)
    })
  }, [homepageAds, handleAdView])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const diff = startX - currentX

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < homepageAds.length - 1) {
        setCurrentIndex((prev) => prev + 1)
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1)
      }
      setIsDragging(false)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (homepageAds.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === homepageAds.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [homepageAds.length])

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const card = container.children[currentIndex] as HTMLElement
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        })
      }
    }
  }, [currentIndex])

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
              <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">جاري تحميل الإعلانات...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl overflow-hidden border border-red-200 dark:border-red-800 backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 px-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl">⚠️</span>
              </div>
              <p className="text-red-600 dark:text-red-400 font-semibold text-sm">خطأ في تحميل الإعلانات</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!homepageAds || homepageAds.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden border border-dashed border-gray-300 dark:border-gray-700 backdrop-blur-sm">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <span className="text-xl">📢</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium text-sm">لا توجد إعلانات حالياً</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6 md:overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {homepageAds.map((ad, index) => (
            <div key={ad.id} className="flex-shrink-0 w-[90vw] max-w-md snap-center md:w-auto md:flex-shrink">
              <Card
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md"
                onClick={(e) => handleAdClick(ad, e)}
              >
                <div className="relative w-full h-[160px] sm:h-[200px] md:h-[180px] lg:h-[220px] xl:h-[250px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src={ad.image_url || "/placeholder-ad.jpg"}
                    alt={ad.title_ar || ad.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 3 ? "eager" : "lazy"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder-ad.jpg"
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Eye className="w-3 h-3" />
                      <span>{ad.view_count}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                      <MousePointerClick className="w-3 h-3" />
                      <span>{ad.click_count}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-semibold text-sm line-clamp-2">{ad.title_ar || ad.title}</h3>
                  {ad.product_price && <p className="text-green-400 font-bold text-lg mt-1">${ad.product_price}</p>}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {homepageAds.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4 md:hidden">
            {homepageAds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-blue-600 dark:bg-blue-400 w-6" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
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
