// pages/OrderSuccess.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Home, Phone } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const result = await response.json();
        if (response.ok) {
          setOrderDetails(result.order);
        }
      } catch (error) {
        console.error('خطأ في جلب تفاصيل الطلب:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mb-30" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* رسالة النجاح */}
          <Card className="text-center mb-6">
            <CardContent className="pt-12 pb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                تم استلام طلبك بنجاح!
              </h1>
              <p className="text-gray-600 mb-4">
                شكراً لك على طلبك. سنتواصل معك قريباً لتأكيد التفاصيل.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600 mb-1">رقم الطلب</p>
                               <p className="text-2xl font-bold text-blue-600">#{orderId}</p>
              </div>
            </CardContent>
          </Card>

          {/* تفاصيل الطلب */}
          {orderDetails && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  تفاصيل الطلب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">حالة الطلب</p>
                    <p className="font-medium">
                      {orderDetails.status === 'pending' && 'قيد المراجعة'}
                      {orderDetails.status === 'confirmed' && 'تم التأكيد'}
                      {orderDetails.status === 'shipped' && 'قيد التوصيل'}
                      {orderDetails.status === 'delivered' && 'تم التوصيل'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">طريقة الدفع</p>
                    <p className="font-medium">
                      {orderDetails.payment_method === 'cash' ? 'الدفع عند الاستلام' : 'دفع إلكتروني'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المدينة</p>
                    <p className="font-medium">{orderDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">رقم الهاتف</p>
                    <p className="font-medium" dir="ltr">{orderDetails.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">العنوان</p>
                  <p className="font-medium">{orderDetails.shipping_address}</p>
                </div>

                {orderDetails.notes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">ملاحظات</p>
                    <p className="text-gray-700">{orderDetails.notes}</p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع الكلي</span>
                    <span className="text-green-600">
                      {parseFloat(orderDetails.total_amount).toLocaleString()} د.ع
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* معلومات التواصل */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">هل لديك استفسار؟</p>
                  <p className="text-sm text-blue-800">
                    تواصل معنا على الرقم: <span className="font-bold" dir="ltr">07XX XXX XXXX</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* أزرار التنقل */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Home className="ml-2 h-5 w-5" />
              العودة للرئيسية
            </Button>
            <Button
              onClick={() => navigate('/orders')}
              className="flex-1"
              size="lg"
            >
              <Package className="ml-2 h-5 w-5" />
              عرض طلباتي
            </Button>
          </div>

          {/* رسالة شكر */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-sm">
              نقدر ثقتك بنا ونتطلع لخدمتك مرة أخرى 💙
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
