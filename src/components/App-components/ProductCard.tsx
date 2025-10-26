"use client"

// components/products/ProductCard.tsx
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import type { Product } from "../../api/types/product.types"
import { useCart } from "../../hooks/useCart"
import { useAuth } from "../../hooks/useAuth"
import ProductDetailDialog from "./Product/Productdaialog"
import { ShoppingCart, Eye, Star, Package, Loader2, Heart } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

interface ProductCardProps {
  product: Product
  variant?: "vertical" | "horizontal"
  isFavorite: boolean
  onToggleFavorite: (productId: number) => Promise<boolean>
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = "vertical", isFavorite, onToggleFavorite }) => {
  const { addToCart, isLoading } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!product.in_stock || isAddingToCart) return

    try {
      setIsAddingToCart(true)
      await addToCart(product, 1)
      toast.success("تمت الإضافة إلى السلة!", {
        description: `${product.name_ar || product.name}`,
        duration: 3000,
      })
    } catch (error) {
      toast.error("فشل الإضافة إلى السلة", {
        description: "يرجى المحاولة مرة أخرى.",
        duration: 3000,
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleViewDetails = () => {
    setIsDialogOpen(true)
  }

  const handleAddToCartFromDialog = async (product: Product, quantity: number) => {
    try {
      await addToCart(product, quantity)
      toast.success("تمت الإضافة إلى السلة!", {
        description: `${product.name_ar || product.name} | الكمية: ${quantity}`,
        duration: 3000,
      })
    } catch (error) {
      toast.error("فشل الإضافة إلى السلة", {
        description: "يرجى المحاولة مرة أخرى.",
        duration: 3000,
      })
    }
  }

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    setIsFavoriteLoading(true)
    try {
      await onToggleFavorite(product.id)
      toast.success(isFavorite ? "تمت الإزالة من المفضلة" : "تمت الإضافة إلى المفضلة", {
        description: product.name_ar || product.name,
        duration: 2000,
      })
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

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageError(false)
    setImageLoading(false)
  }

  const getFullImageUrl = (imageUrl: string | null) => {
    if (!imageUrl) return null

    if (imageUrl.startsWith("http")) {
      return imageUrl
    }

    if (imageUrl.startsWith("/")) {
      return `http://localhost:5000${imageUrl}`
    }

    return `http://localhost:5000/uploads/products/${imageUrl}`
  }

  const fullImageUrl = getFullImageUrl(product.image_url)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const formatPrice = (price: string) => {
    return Number.parseInt(price).toLocaleString("ar-IQ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  const calculateDiscount = () => {
    if (product.discount > 0 && product.original_price) {
      const original = Number.parseFloat(product.original_price)
      const current = Number.parseFloat(product.price)
      return original - current
    }
    return 0
  }

  // العرض الأفقي (List)
  if (variant === "horizontal") {
    return (
      <>
        <Card className="group flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden backdrop-blur-sm">
          {/* الصورة - حجم ثابت */}
          <div className="relative w-full sm:w-56 h-48 sm:h-56 bg-gradient-to-br from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-900 overflow-hidden flex-shrink-0">
            {fullImageUrl && !imageError ? (
              <>
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-10">
                    <Loader2 className="w-6 h-6 text-amber-600 animate-spin" />
                  </div>
                )}
                <img
                  src={fullImageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  loading="lazy"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900">
                {product.emoji_icon ? (
                  <span className="text-5xl">{product.emoji_icon}</span>
                ) : (
                  <Package className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                )}
              </div>
            )}

            {/* البادجات */}
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.badge && (
                <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border-0">
                  ⚡ {product.badge}
                </Badge>
              )}
              {product.discount > 0 && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border-0">
                  🔥 {product.discount}%
                </Badge>
              )}
            </div>

            {/* زر المفضلة */}
            <button
              onClick={toggleWishlist}
              disabled={isFavoriteLoading}
              className="absolute top-3 right-3 w-10 h-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 hover:scale-110 transition-all duration-300 disabled:opacity-50 border border-gray-200/50 dark:border-gray-700/50"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400 group-hover:text-red-400"
                } ${isFavoriteLoading ? "animate-pulse" : ""}`}
              />
            </button>
          </div>

          {/* المحتوى */}
          <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg sm:text-xl line-clamp-2 text-gray-900 dark:text-gray-100 text-right mb-3 leading-tight">
                {product.name_ar || product.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 text-right leading-relaxed">
                {product.description || product.name}
              </p>

              {/* التقييم */}
              <div className="flex items-center gap-2 mb-4 justify-end">
                <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews_count})</span>
                <span className="text-sm text-gray-900 dark:text-gray-100 font-semibold">
                  {Number.parseFloat(product.rating).toFixed(1)}
                </span>
                <div className="flex items-center gap-0.5">{renderStars(Number.parseFloat(product.rating))}</div>
              </div>

              {/* السعر */}
              <div className="text-right mb-4">
                <div className="flex items-center gap-3 justify-end mb-2">
                  {product.discount > 0 && product.original_price && (
                    <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                      {formatPrice(product.original_price)} د.ع
                    </span>
                  )}
                  <span className="text-2xl font-bold text-green-600 dark:text-green-500">
                    {formatPrice(product.price)} د.ع
                  </span>
                </div>
                {product.discount > 0 && product.original_price && (
                  <p className="text-sm text-red-600 dark:text-red-500 font-semibold bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full inline-block border border-red-100 dark:border-red-800/50">
                    وفر {formatPrice(calculateDiscount().toString())} د.ع
                  </p>
                )}
              </div>

              {/* حالة التوفر */}
              {!product.in_stock && (
                <Badge className="text-sm px-4 py-1.5 bg-gray-500 dark:bg-gray-700 text-white border-0 rounded-full">
                  غير متوفر
                </Badge>
              )}
            </div>

            {/* الأزرار */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                onClick={handleViewDetails}
                variant="outline"
                size="lg"
                className="flex-1 h-11 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-500 text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-500 text-sm font-semibold bg-transparent hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
              >
                <Eye className="w-4 h-4 ml-2" />
                عرض التفاصيل
              </Button>
              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock || isAddingToCart || isLoading}
                className="flex-1 h-11 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-sm font-bold transition-all disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isAddingToCart ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 ml-2" />
                    أضف إلى السلة
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>

        <ProductDetailDialog
          product={product}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onAddToCart={handleAddToCartFromDialog}
        />
      </>
    )
  }

  // العرض العمودي (Grid)
  return (
    <>
      <Card
        className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl flex flex-col h-full hover:scale-[1.02] hover:-translate-y-1"
        onClick={() => handleViewDetails()}
      >
        {/* البادجات */}
        <div className="absolute top-2 left-1 z-10 flex flex-col gap-2">
          {/* {product.badge && (
            <Badge className="bg-gradient-to-r from-amber-200 to-amber-400 text-white text-xs px-1 py-0.5 rounded-full shadow-xl border-0 whitespace-nowrap">
              ⚡ {product.badge}
            </Badge>
          )} */}
          {product.discount > 0 && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full shadow-xl border-0 whitespace-nowrap">
              {product.discount}%
            </Badge>
          )}
        </div>

        {/* زر المفضلة */}
        <button
          onClick={toggleWishlist}
          disabled={isFavoriteLoading}
          className="absolute top-3 right-3 z-10 w-10 h-10  dark: backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:bg-white dark:hover:bg-gray-00 hover:scale-110 transition-all duration-300 border  dark:border-none disabled:opacity-50"
        >
          <Heart
            className={`w-5 h-5 transition-all ${
              isFavorite
                ? "fill-red-500 text-red-500 scale-110"
                : "text-gray-600 dark:text-gray-300 group-hover:text-red-400"
            } ${isFavoriteLoading ? "animate-pulse" : ""}`}
          />
        </button>

        {/* حالة التوفر */}
        {!product.in_stock && (
          <div className="absolute top-14 right-3 z-10">
            <Badge className="text-xs px-3 py-1.5 bg-gray-500/90 dark:bg-gray-700/90 text-white rounded-full shadow-md border-0 backdrop-blur-sm whitespace-nowrap">
              غير متوفر
            </Badge>
          </div>
        )}

        {/* صورة المنتج */}
        <div className="relative h-48 bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900 overflow-hidden flex-shrink-0">
          {fullImageUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900 z-10">
                  <Loader2 className="w-10 h-10 text-amber-600 animate-spin" />
                </div>
              )}
              <img
                src={fullImageUrl || "/placeholder.svg"}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                loading="lazy"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 dark:from-gray-800 to-gray-200 dark:to-gray-900 p-4">
              {product.emoji_icon ? (
                <span className="text-6xl transition-transform duration-300 group-hover:scale-110 mb-2">
                  {product.emoji_icon}
                </span>
              ) : (
                <Package className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-2" />
              )}
              <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {imageError ? "خطأ في التحميل" : "لا توجد صورة"}
              </span>
            </div>
          )}

          {/* زر العرض السريع */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <Button
              size="sm"
              className="h-9 text-xs bg-black/80 hover:bg-black dark:bg-white/90 dark:hover:bg-white text-white dark:text-black backdrop-blur-sm border-0 rounded-lg shadow-lg font-semibold"
              onClick={(e) => {
                e.stopPropagation()
                handleViewDetails()
              }}
            >
              <Eye className="w-4 h-4 ml-2" />
              عرض سريع
            </Button>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <CardHeader className="pb-2 px-4 pt-4 flex-shrink-0">
          <h3 className="font-bold text-base line-clamp-2 text-gray-900 dark:text-gray-100 text-right leading-tight h-14">
            {product.name_ar || product.name}
          </h3>
        </CardHeader>

        <CardContent className="pb-2 px-4 space-y-2 flex-shrink-0">
          {/* التقييم */}
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-xs text-gray-600 dark:text-gray-400">({product.reviews_count})</span>
            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
              {Number.parseFloat(product.rating).toFixed(1)}
            </span>
            <div className="flex items-center gap-0.5">{renderStars(Number.parseFloat(product.rating))}</div>
          </div>

          {/* السعر */}
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 justify-end">
              {product.discount > 0 && product.original_price && (
                <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
              <span className="text-lg font-bold text-green-600 dark:text-green-500">
                {formatPrice(product.price)} د.ع
              </span>
            </div>
            {product.discount > 0 && product.original_price && (
              <p className="text-xs text-red-600 dark:text-red-500 font-medium bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-full inline-block border border-red-100 dark:border-red-800/50">
                وفر {formatPrice(calculateDiscount().toString())} د.ع
              </p>
            )}
          </div>
        </CardContent>

        {/* الزر */}
        <CardFooter className="pt-2 px-4 pb-4 mt-auto flex-shrink-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAddingToCart || isLoading}
            className={`w-full h-10 text-base transition-all duration-300 rounded-lg font-bold shadow-lg ${
              product.in_stock
                ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white hover:shadow-xl hover:scale-105"
                : "bg-gray-200 text-gray-500 cursor-not-allowed hover:scale-100 dark:bg-gray-700 dark:text-gray-400"
            }`}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري...
              </>
            ) : product.in_stock ? (
              <>
                <ShoppingCart className="w-4 h-4 ml-2" />
                أضف إلى السلة
              </>
            ) : (
              "غير متوفر"
            )}
          </Button>
        </CardFooter>
      </Card>

      <ProductDetailDialog
        product={product}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddToCart={handleAddToCartFromDialog}
      />
    </>
  )
}

export default ProductCard
