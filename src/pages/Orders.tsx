"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useOrders } from "../hooks/useOrders"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import {
  Package,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  Loader2,
  Truck,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react"

const Orders: React.FC = () => {
  const navigate = useNavigate()
  const { orders: ordersData, loading, error } = useOrders()
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const orders = Array.isArray(ordersData) ? ordersData : []
  const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter)

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: "قيد المراجعة",
        className:
          "bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-700",
        icon: Calendar,
      },
      confirmed: {
        label: "تم التأكيد",
        className:
          "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700",
        icon: CreditCard,
      },
      shipped: {
        label: "قيد التوصيل",
        className:
          "bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-700",
        icon: Truck,
      },
      delivered: {
        label: "تم التوصيل",
        className:
          "bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
        icon: CheckCircle,
      },
      cancelled: {
        label: "ملغي",
        className:
          "bg-gradient-to-r from-rose-100 to-red-100 dark:from-rose-900/30 dark:to-red-900/30 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-700",
        icon: XCircle,
      },
    }
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ar-IQ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full animate-ping opacity-20"></div>
            <Loader2 className="w-20 h-20 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">جاري تحميل الطلبات...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900">
        <Card className="max-w-md w-full mx-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">خطأ</CardTitle>
            <CardDescription className="dark:text-gray-300">{error}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-8 px-4 transition-colors duration-300"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                طلباتي
              </h1>
              <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                تتبع وإدارة جميع طلباتك
              </p>
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <Card className="mb-6 shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3">
              {[
                { value: "all", label: "الكل", count: orders.length },
                { value: "pending", label: "قيد المراجعة", count: orders.filter((o) => o.status === "pending").length },
                { value: "confirmed", label: "مؤكد", count: orders.filter((o) => o.status === "confirmed").length },
                { value: "shipped", label: "قيد التوصيل", count: orders.filter((o) => o.status === "shipped").length },
                { value: "delivered", label: "مكتمل", count: orders.filter((o) => o.status === "delivered").length },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  variant={statusFilter === filter.value ? "default" : "outline"}
                  className={`
                    transition-all duration-300 
                    ${
                      statusFilter === filter.value
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                        : "hover:scale-105 hover:shadow-md dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {filter.label}
                  <Badge variant="secondary" className="mr-2 dark:bg-gray-700 dark:text-gray-200">
                    {filter.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl animate-fade-in">
            <CardContent className="p-12 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-pulse opacity-20"></div>
                <Package className="w-24 h-24 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">لا توجد طلبات</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">لم تقم بإنشاء أي طلبات بعد</p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                تصفح المنتجات
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusBadge(order.status)
              const StatusIcon = statusInfo.icon

              return (
                <Card
                  key={order.id}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-emerald-200 dark:hover:border-emerald-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl animate-fade-in transform hover:scale-[1.02]"
                  onClick={() => navigate(`/order-success/${order.id}`)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-1">طلب رقم #{order.id}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {formatDate(order.created_at)}
                          </div>
                        </div>
                      </div>
                      <Badge className={`${statusInfo.className} border flex items-center gap-1.5 px-3 py-1`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg dark:bg-gray-700">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">العنوان</p>
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 dark:text-gray-200">
                            {order.delivery_address || order.shipping_address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">رقم الهاتف</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200" dir="ltr">
                            {order.delivery_phone || order.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">طريقة الدفع</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {order.payment_method === "cash" ? "الدفع عند الاستلام" : "دفع إلكتروني"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                      <span className="text-gray-600 font-medium dark:text-gray-300">المجموع الكلي</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                        {Number.parseFloat(order.total_amount).toLocaleString()} د.ع
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/order-success/${order.id}`)
                      }}
                    >
                      عرض التفاصيل الكاملة
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
