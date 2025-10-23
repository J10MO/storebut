"use client"

// components/products/ProductDetailDialog.tsx
import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Dialog, DialogContent } from "../../ui/dialog"
import { Button } from "../../ui/button"
import { Badge } from "../../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import type { Product } from "../../../api/types/product.types"
import { useFavorites } from "../../../hooks/useFavorites"
import { useAuth } from "../../../hooks/useAuth"
import {
  Star,
  ShoppingCart,
  Package,
  Minus,
  Plus,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  X,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

interface ProductDetailDialogProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddToCart: (product: Product, quantity: number) => void
}

const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({ product, open, onOpenChange, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const { toggleFavorite, isFavorite } = useFavorites()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const previousProductRef = useRef<Product | null>(null)
  const imageDebugLoggedRef = useRef(false)

  const isWishlisted = product ? isFavorite(product.id) : false

  useEffect(() => {
    if (open && product) {
      setQuantity(1)
      setImageError(false)
      setImageLoading(true)
      setActiveTab("description")
      setSelectedImageIndex(0)

      if (product.id !== previousProductRef.current?.id) {
        const fullImageUrl = getFullImageUrl(product.image_url)
        console.log("ProductDetailDialog image debug:", {
          originalUrl: product.image_url,
          fullUrl: fullImageUrl,
          productId: product.id,
          productName: product.name,
        })
        previousProductRef.current = product
        imageDebugLoggedRef.current = true
      }
    } else if (!open) {
      previousProductRef.current = null
      imageDebugLoggedRef.current = false
    }
  }, [open, product])

  const handleQuantityChange = useCallback(
    (delta: number) => {
      const newQuantity = quantity + delta
      if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 99)) {
        setQuantity(newQuantity)
      }
    },
    [quantity, product],
  )

  const handleAddToCart = useCallback(() => {
    if (product) {
      onAddToCart(product, quantity)
    }
  }, [product, quantity, onAddToCart])

  const handleImageError = useCallback(() => {
    console.error("Failed to load image:", product?.image_url)
    setImageError(true)
    setImageLoading(false)
  }, [product])

  const handleImageLoad = useCallback(() => {
    setImageError(false)
    setImageLoading(false)
  }, [])

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (!product) return

    setIsFavoriteLoading(true)
    try {
      await toggleFavorite(product.id)
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.error("فشل في العملية", {
        description: "يرجى المحاولة مرة أخرى.",
        duration: 3000,
      })
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  const getFullImageUrl = useCallback((imageUrl: string | null) => {
    if (!imageUrl) return null

    if (imageUrl.startsWith("http")) {
      return imageUrl
    }

    if (imageUrl.startsWith("/")) {
      return `http://localhost:5000${imageUrl}`
    }

    return `http://localhost:5000/uploads/products/${imageUrl}`
  }, [])

  const fullImageUrl = product ? getFullImageUrl(product.image_url) : null

  const renderStars = useCallback((rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }, [])

  const formatPrice = useCallback((price: string | number) => {
    const priceNumber = typeof price === "string" ? Number.parseFloat(price) : price
    return priceNumber.toLocaleString("ar-IQ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [])

  const calculateSavings = useCallback(() => {
    if (!product) return "0"
    const original =
      typeof product.original_price === "string" ? Number.parseFloat(product.original_price) : product.original_price
    const current = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
    const savings = original - current
    return savings.toLocaleString("ar-IQ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [product])

  const calculateTotalPrice = useCallback(() => {
    if (!product) return 0
    const price = typeof product.price === "string" ? Number.parseFloat(product.price) : product.price
    return price * quantity
  }, [product, quantity])

  if (!product) return null

  const isQuantityAvailable = product.in_stock && quantity <= (product.stock_quantity || 99)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0 rtl rounded-3xl bg-white dark:bg-gray-900">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 w-10 h-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700 hover:shadow-xl"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-[95vh] overflow-y-auto">
          {/* LEFT SIDE - Image */}
          <div className="lg:w-2/5 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 flex flex-col sticky top-0 lg:max-h-[95vh] lg:overflow-y-auto">
            {/* Badges Section */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.badge && (
                <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  ⚡ {product.badge}
                </Badge>
              )}

              {product.discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  🔥 {product.discount}% خصم
                </Badge>
              )}

              {!product.in_stock && (
                <Badge className="bg-gray-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-md">
                  غير متوفر
                </Badge>
              )}
            </div>

            {/* Main Image Container */}
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border-2 border-gray-100 dark:border-gray-700 mb-4 flex-shrink-0">
              {fullImageUrl && !imageError ? (
                <>
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                      <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
                    </div>
                  )}
                  <img
                    src={fullImageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className={`w-full h-full object-contain p-6 transition-all duration-300 ${
                      imageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                    loading="lazy"
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6">
                  {product.emoji_icon ? (
                    <span className="text-7xl mb-4 animate-pulse">{product.emoji_icon}</span>
                  ) : (
                    <Package className="w-20 h-20 text-gray-400 dark:text-gray-500 mb-4" />
                  )}
                  <span className="text-gray-500 dark:text-gray-400 text-center font-medium">
                    {imageError ? "خطأ في تحميل الصورة" : "لا توجد صورة متاحة"}
                  </span>
                </div>
              )}

              {/* Stock Status Indicator */}
              {product.in_stock && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  متوفر
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <Button
                onClick={toggleWishlist}
                disabled={isFavoriteLoading}
                className={`flex-1 h-12 rounded-2xl font-semibold transition-all duration-300 border-2 ${
                  isWishlisted
                    ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ml-2 transition-all ${
                    isWishlisted ? "fill-red-600 dark:fill-red-400" : ""
                  } ${isFavoriteLoading ? "animate-pulse" : ""}`}
                />
                {isWishlisted ? "في المفضلة" : "إضافة للمفضلة"}
              </Button>
              <Button className="flex-1 h-12 rounded-2xl font-semibold transition-all duration-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600">
                <Share2 className="w-5 h-5 ml-2" />
                مشاركة
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE - Details */}
          <div className="lg:w-3/5 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-white dark:bg-gray-900" dir="rtl">
            {/* Product Title & Name */}
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                {product.name_ar || product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{product.name}</p>
            </div>

            {/* Rating Section */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1">{renderStars(Number.parseFloat(product.rating))}</div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {Number.parseFloat(product.rating).toFixed(1)}
                </span>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="text-gray-600 dark:text-gray-400 text-sm">{product.reviews_count} تقييم</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl text-gray-400 dark:text-gray-500 font-medium">د.ع</span>
                {product.discount > 0 && product.original_price && (
                  <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
              {product.discount > 0 && product.original_price && (
                <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-2 rounded-full font-semibold text-sm border border-red-200 dark:border-red-800">
                  💰 وفرت {calculateSavings()} د.ع
                </div>
              )}
            </div>

            {/* Stock Status Card */}
            <div
              className={`mb-6 pb-6 border-b-2 p-4 rounded-2xl ${
                product.in_stock
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                    product.in_stock ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <div>
                  <p
                    className={`font-semibold text-lg ${
                      product.in_stock ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {product.in_stock
                      ? `متوفر في المخزون${product.stock_quantity ? ` (${product.stock_quantity} قطعة)` : ""}`
                      : "غير متوفر حالياً"}
                  </p>
                  {product.in_stock && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
                      ✓ التوصيل خلال 24-48 ساعة
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            {product.in_stock && (
              <div className="mb-6 pb-6 border-b-2 border-gray-100 dark:border-gray-800">
                <p className="text-lg font-bold mb-4 text-gray-900 dark:text-white">الكمية المطلوبة</p>
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl w-fit">
                  <Button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-11 h-11 rounded-xl p-0 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </Button>
                  <div className="w-16 h-12 flex items-center justify-center text-2xl font-bold text-amber-600 dark:text-amber-400 bg-white dark:bg-gray-700 border-2 border-amber-500 dark:border-amber-600 rounded-xl">
                    {quantity}
                  </div>
                  <Button
                    onClick={() => handleQuantityChange(1)}
                    disabled={!isQuantityAvailable}
                    className="w-11 h-11 rounded-xl p-0 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.in_stock || !isQuantityAvailable}
              className="w-full h-14 text-lg font-bold mb-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.in_stock && isQuantityAvailable ? (
                <>
                  <ShoppingCart className="w-6 h-6 ml-3" />
                  أضف إلى السلة - {formatPrice(calculateTotalPrice())} د.ع
                </>
              ) : (
                "غير متوفر حالياً"
              )}
            </Button>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              <div className="flex items-center gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border-2 border-amber-200 dark:border-amber-800">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-900 dark:text-amber-300">شحن مجاني</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400">للطلبات فوق 50,000 د.ع</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-900 dark:text-green-300">دفع آمن</p>
                  <p className="text-xs text-green-700 dark:text-green-400">معاملات 100% آمنة</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-purple-900 dark:text-purple-300">إرجاع سهل</p>
                  <p className="text-xs text-purple-700 dark:text-purple-400">سياسة إرجاع 30 يوم</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-2xl">
                <TabsTrigger
                  value="description"
                  className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-semibold text-sm text-gray-700 dark:text-gray-300"
                >
                  الوصف
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 font-semibold text-sm text-gray-700 dark:text-gray-300"
                >
                  المواصفات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-0">
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                  {product.description_ar || product.description ? (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base" dir="rtl">
                      {product.description_ar || product.description}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center italic">لا يوجد وصف متاح</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-0">
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 space-y-0">
                  {[
                    { label: "رقم المنتج", value: product.id },
                    { label: "العلامة التجارية", value: product.brand },
                    { label: "الفئة", value: product.category_name_ar || product.category_name },
                    { label: "التقييم", value: `${Number.parseFloat(product.rating).toFixed(1)} / 5.0` },
                    { label: "عدد التقييمات", value: product.reviews_count },
                    { label: "الحالة", value: product.in_stock ? "متوفر ✓" : "غير متوفر", isStatus: true },
                    ...(product.stock_quantity
                      ? [{ label: "الكمية المتاحة", value: `${product.stock_quantity} قطعة` }]
                      : []),
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center py-3 ${idx !== product.stock_quantity ? "border-b border-gray-200 dark:border-gray-700" : ""}`}
                    >
                      <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">{item.label}</span>
                      <span
                        className={`font-semibold text-sm ${item.isStatus && !product.in_stock ? "text-red-600 dark:text-red-400" : item.isStatus ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailDialog
