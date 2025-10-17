import React from 'react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel';
import { useHomepageAds } from '../../../hooks/useAd';
import { Badge } from '../../ui/badge';
import { Eye, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Ad } from '../../../api/types/ads.types';

interface HeroAdsCarouselProps {
  className?: string;
}

export const HeroAdsCarousel: React.FC<HeroAdsCarouselProps> = ({ className }) => {
  const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();

  const handleAdClick = async (ad: Ad) => {
    await trackClick(ad.id);
  };

  const handleAdView = async (ad: Ad) => {
    await trackView(ad.id);
  };

  if (loading || error || !homepageAds || homepageAds.length === 0) {
    return null;
  }

  // تصفية الإعلانات ذات الأولوية العالية فقط
  const heroAds = homepageAds
    .filter(ad => ad.priority >= 8)
    .slice(0, 3);

  if (heroAds.length === 0) return null;

  return (
    <div className={`w-full ${className}`}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {heroAds.map((ad) => (
            <CarouselItem key={ad.id}>
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* صورة الإعلان */}
                    <div className="relative h-80 lg:h-96">
                      <img
                        src={ad.image_url || '/placeholder-hero.jpg'}
                        alt={ad.title}
                        className="object-cover w-full h-full"
                        onLoad={() => handleAdView(ad)}
                      />
                      
                      {/* Badge */}
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        عرض خاص
                      </Badge>

                      {/* عداد المشاهدات */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        <Eye className="w-4 h-4" />
                        <span>{ad.view_count} مشاهدة</span>
                      </div>
        
                    </div>

                    {/* محتوى الإعلان */}
                    <CardContent className="flex flex-col justify-center p-8 space-y-6">
                      <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                          {ad.title}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {ad.description}
                        </p>
                      </div>

                      {/* معلومات المنتج */}
                      {ad.product_name && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="font-semibold">المنتج:</span>
                            <span className="text-foreground">{ad.product_name}</span>
                          </div>
                          
                          {ad.product_price && (
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">السعر:</span>
                              <div className="flex items-center gap-3">
                                {ad.product_original_price && (
                                  <span className="text-lg line-through text-muted-foreground">
                                    ${ad.product_original_price}
                                  </span>
                                )}
                                <span className="text-2xl font-bold text-green-600">
                                  ${ad.product_price}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* أزرار الإجراء */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button 
                          size="lg"
                          className="flex-1"
                          onClick={() => handleAdClick(ad)}
                        >
                          <ShoppingCart className="ml-2 h-5 w-5" />
                          تسوق الآن
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="flex-1"
                          onClick={() => window.open(`/products/${ad.product_id}`, '_blank')}
                        >
                          <ArrowLeft className="ml-2 h-5 w-5" />
                          عرض التفاصيل
                        </Button>
                      </div>

                      {/* مؤشر التوقيت */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>ينتهي العرض في:</span>
                          <span className="font-medium">
                            {new Date(ad.end_date).toLocaleDateString('ar-SA', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};