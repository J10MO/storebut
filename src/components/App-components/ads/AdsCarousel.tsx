// import React from 'react';
// import { Card, CardContent } from '../../ui/card';
// import { Button } from '../../ui/button';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '../../ui/carousel';
// import { useHomepageAds } from '../../../hooks/useAd';
// import { Badge } from '../../ui/badge';
// import { Eye, Clock, Tag } from 'lucide-react';
// import { Ad } from '../../../api/types/ads.types';

// interface AdsCarouselProps {
//   className?: string;
//   autoPlay?: boolean;
//   interval?: number;
// }

// export const AdsCarousel: React.FC<AdsCarouselProps> = ({
//   className,
//   autoPlay = true,
//   interval = 5000,
// }) => {
//   const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();
//  console.log(homepageAds)
//   const handleAdClick = async (ad: Ad) => {
//     await trackClick(ad.id);
//     console.log("123")
//     // يمكنك إضافة أي منطق إضافي هنا
//     window.open(`/products/${ad.product_id}`, '_blank');
//   };

//   const handleAdView = async (ad: Ad) => {
//     await trackView(ad.id);
//   };

//   if (loading) {
//     return (
//       <div className={`w-full max-w-4xl mx-auto ${className}`}>
//         <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
//             <p className="mt-2 text-muted-foreground">جاري تحميل الإعلانات...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`w-full max-w-4xl mx-auto ${className}`}>
//         <div className="flex items-center justify-center h-64 bg-destructive/10 rounded-lg">
//           <p className="text-destructive">خطأ في تحميل الإعلانات: {error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!homepageAds || homepageAds.length === 0) {
//     return (
//       <div className={`w-full max-w-4xl mx-auto ${className}`}>
//         <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
//           <p className="text-muted-foreground">لا توجد إعلانات متاحة حالياً</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full max-w-4xl mx-auto ${className}`}>
//       <Carousel
//         opts={{
//           align: "start",
//           loop: true,
//         }}
//         className="w-full"
//       >
//         <CarouselContent>
//           {homepageAds.map((ad, index) => (
//             <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3">
//               <div className="p-1">
//                 <Card 
//                   className="overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg cursor-pointer"
//                   onClick={() => handleAdClick(ad)}
//                   onMouseEnter={() => handleAdView(ad)}
//                 >
//                   <div className="relative">
//                     {/* صورة الإعلان */}
//                     <div className="aspect-video relative overflow-hidden">
//                       <img
//                         src={ad.image_url || '/placeholder-ad.jpg'}
//                         alt={ad.title}
//                         className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
//                       />
                      
//                       {/* Badge للنشاط */}
//                       <Badge 
//                         className={`absolute top-2 left-2 ${
//                           ad.is_active ? 'bg-green-500' : 'bg-gray-500'
//                         }`}
//                       >
//                         {ad.is_active ? 'نشط' : 'غير نشط'}
//                       </Badge>

//                       {/* عداد المشاهدات */}
//                       <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
//                         <Eye className="w-3 h-3" />
//                         <span>{ad.view_count}</span>
//                       </div>
//                     </div>

//                     <CardContent className="p-4">
//                       {/* العنوان */}
//                       <h3 className="font-bold text-lg mb-2 line-clamp-1">
//                         {ad.title}
//                       </h3>
                      
//                       {/* الوصف */}
//                       <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
//                         {ad.description}
//                       </p>

//                       {/* معلومات المنتج */}
//                       {ad.product_name && (
//                         <div className="space-y-2 mb-3">
//                           <div className="flex items-center justify-between">
//                             <span className="font-medium text-sm">المنتج:</span>
//                             <span className="text-sm">{ad.product_name}</span>
//                           </div>
                          
//                           {ad.product_price && (
//                             <div className="flex items-center justify-between">
//                               <span className="font-medium text-sm">السعر:</span>
//                               <div className="flex items-center gap-2">
//                                 {ad.product_original_price && (
//                                   <span className="text-sm line-through text-muted-foreground">
//                                     ${ad.product_original_price}
//                                   </span>
//                                 )}
//                                 <span className="font-bold text-green-600">
//                                   ${ad.product_price}
//                                 </span>
//                               </div>
//                             </div>
//                           )}

//                           {ad.product_discount && ad.product_discount > 0 && (
//                             <Badge variant="secondary" className="bg-orange-100 text-orange-800">
//                               <Tag className="w-3 h-3 ml-1" />
//                               خصم {ad.product_discount}%
//                             </Badge>
//                           )}
//                         </div>
//                       )}

//                       {/* تاريخ الانتهاء */}
//                       <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-2">
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-3 h-3" />
//                           <span>ينتهي في</span>
//                         </div>
//                         <span>
//                           {new Date(ad.end_date).toLocaleDateString('ar-SA')}
//                         </span>
//                       </div>

//                       {/* زر التفاعل */}
//                       <Button 
//                         className="w-full mt-3"
//                         size="sm"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleAdClick(ad);
//                         }}
//                       >
//                         عرض العرض
//                       </Button>
//                     </CardContent>
//                   </div>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
        
//         {/* أزرار التنقل */}
//         <CarouselPrevious className="hidden md:flex -left-4" />
//         <CarouselNext className="hidden md:flex -right-4" />
//       </Carousel>

//       {/* مؤشرات الصفحات */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {homepageAds.map((_, index) => (
//           <button
//             key={index}
//             className="w-2 h-2 rounded-full bg-muted-foreground/30 transition-all duration-300"
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };







// import React from 'react';
// import { Carousel, CarouselContent, CarouselItem } from '../../ui/carousel';
// import { Card } from '../../ui/card';
// import { useHomepageAds } from '../../../hooks/useAd';
// import { Ad } from '../../../api/types/ads.types';

// interface AdsCarouselProps {
//   className?: string;
//   autoPlay?: boolean;
//   interval?: number;
// }

// export const AdsCarousel: React.FC<AdsCarouselProps> = ({
//   className,
//   autoPlay = true,
//   interval = 5000,
// }) => {
//   const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();

//   const handleAdClick = async (ad: Ad) => {
//     try {
//       await trackClick(ad.id);
//     } catch {
//       // ignore tracking errors to keep UX smooth
//     }
//     window.open(`/products/${ad.product_id}`, '_blank');
//   };

//   const handleAdView = async (ad: Ad) => {
//     try {
//       await trackView(ad.id);
//     } catch {
//       // ignore
//     }
//   };

//   if (loading) {
//     return (
//       <div className={`w-full max-w-4xl mx-auto ${className}`}>
//         <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
//           <span className="text-muted-foreground">جاري التحميل...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`w-full max-w-4xl mx-auto ${className}`}>
//         <div className="flex items-center justify-center h-48 bg-destructive/10 rounded-lg">
//           <span className="text-destructive">خطأ في تحميل الإعلانات: {error}</span>
//         </div>
//       </div>
//     );
//   }

//   if (!homepageAds || homepageAds.length === 0) {
//     return (
//       <div className={`w-full max-w-4xl mx-auto ${className}`}>
//         <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
//           <span className="text-muted-foreground">لا توجد إعلانات حالياً</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full max-w-4xl mx-auto ${className}`}>
//       <Carousel
//         opts={{
//           align: 'start',
//           loop: true,
//           // If your Carousel supports autoplay, wire it here when available
//         }}
//         className="w-full"
//       >
//         <CarouselContent>
//           {homepageAds.map((ad) => (
//             <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3 p-1">
//               <Card
//                 className="overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//                 onClick={() => handleAdClick(ad)}
//               >
//                 <div className="relative w-full h-48 overflow-hidden" onMouseEnter={() => handleAdView(ad)}>
//                   <img
//                     src={ad.image_url || '/placeholder-ad.jpg'}
//                     alt={ad.title}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                   />
//                 </div>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// };







// import React, { useCallback, useEffect, useRef } from 'react';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';
// import { Card } from '../../ui/card';
// import { useHomepageAds } from '../../../hooks/useAd';
// import { Ad } from '../../../api/types/ads.types';
// import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import type { CarouselApi } from '@/components/ui/carousel';

// interface AdsCarouselProps {
//   className?: string;
//   autoPlay?: boolean;
//   interval?: number;
// }

// export const AdsCarousel: React.FC<AdsCarouselProps> = ({
//   className = '',
//   autoPlay = true,
//   interval = 5000,
// }) => {
//   const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();
//   const [api, setApi] = React.useState<CarouselApi>();
//   const [current, setCurrent] = React.useState(0);
//   const [count, setCount] = React.useState(0);
//   const autoPlayRef = useRef<NodeJS.Timeout>();
//   const viewedAdsRef = useRef<Set<string>>(new Set());

//   // Handle ad click with tracking
//   const handleAdClick = useCallback(async (ad: Ad, e: React.MouseEvent) => {
//     e.preventDefault();
    
//     try {
//       await trackClick(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad click:', error);
//     }
    
//     window.open(`/products/${ad.product_id}`, '_blank', 'noopener,noreferrer');
//   }, [trackClick]);

//   // Track ad view when visible
//   const handleAdView = useCallback(async (ad: Ad) => {
//     if (viewedAdsRef.current.has(ad.id)) return;
    
//     viewedAdsRef.current.add(ad.id);
//     try {
//       await trackView(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad view:', error);
//     }
//   }, [trackView]);

//   // Setup carousel API
//   useEffect(() => {
//     if (!api) return;

//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);

//     api.on('select', () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });
//   }, [api]);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!api || !autoPlay || homepageAds.length <= 1) return;

//     const startAutoPlay = () => {
//       autoPlayRef.current = setInterval(() => {
//         if (api.canScrollNext()) {
//           api.scrollNext();
//         } else {
//           api.scrollTo(0);
//         }
//       }, interval);
//     };

//     const stopAutoPlay = () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };

//     startAutoPlay();

//     // Pause on hover
//     const carouselElement = api.rootNode();
//     carouselElement.addEventListener('mouseenter', stopAutoPlay);
//     carouselElement.addEventListener('mouseleave', startAutoPlay);

//     return () => {
//       stopAutoPlay();
//       carouselElement.removeEventListener('mouseenter', stopAutoPlay);
//       carouselElement.removeEventListener('mouseleave', startAutoPlay);
//     };
//   }, [api, autoPlay, interval, homepageAds.length]);

//   // Track current ad view
//   useEffect(() => {
//     if (homepageAds.length > 0 && current > 0) {
//       const currentAd = homepageAds[current - 1];
//       if (currentAd) {
//              handleAdView(currentAd);
//       }
//     }
//   }, [current, homepageAds, handleAdView]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[400px] bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-4">
//               <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
//               <p className="text-muted-foreground font-medium">جاري تحميل الإعلانات...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[400px] bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl overflow-hidden border-2 border-destructive/20">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-3 px-4">
//               <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-3xl">⚠️</span>
//               </div>
//               <p className="text-destructive font-semibold text-lg">خطأ في تحميل الإعلانات</p>
//               <p className="text-destructive/70 text-sm">{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!homepageAds || homepageAds.length === 0) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[400px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl overflow-hidden border-2 border-dashed border-muted-foreground/20">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-3">
//               <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-3xl">📢</span>
//               </div>
//               <p className="text-muted-foreground font-medium">لا توجد إعلانات حالياً</p>
//               <p className="text-muted-foreground/60 text-sm">سيتم عرض الإعلانات قريباً</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full ${className}`}>
//       <Carousel
//         setApi={setApi}
//         opts={{
//           align: 'start',
//           loop: true,
//           direction: 'rtl',
//         }}
//         className="w-full"
//       >
//         <CarouselContent className="-ml-2 md:-ml-4">
//           {homepageAds.map((ad) => (
//             <CarouselItem key={ad.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
//               <Card
//                 className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 bg-background"
//                 onClick={(e) => handleAdClick(ad, e)}
//               >
//                 {/* Image Container */}
//                                <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden bg-muted">
//                   <img
//                     src={ad.image_url || '/placeholder-ad.jpg'}
//                     alt={ad.title}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     loading="lazy"
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.src = '/placeholder-ad.jpg';
//                     }}
//                   />
                  
//                   {/* Gradient Overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
//                   {/* Ad Badge */}
//                   <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
//                     إعلان
//                   </div>
                  
//                   {/* Hover Content */}
//                   <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
//                     <h3 className="text-white font-bold text-xl mb-2 line-clamp-2">
//                       {ad.title}
//                     </h3>
//                     {ad.description && (
//                       <p className="text-white/90 text-sm line-clamp-2 mb-3">
//                         {ad.description}
//                       </p>
//                     )}
//                     <div className="flex items-center justify-between">
//                       <span className="text-white font-semibold text-sm">
//                         اضغط للمزيد
//                       </span>
//                       <ChevronLeft className="w-5 h-5 text-white" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bottom Info Bar */}
//                 <div className="p-4 bg-gradient-to-r from-background to-muted/30">
//                   <h4 className="font-semibold text-foreground line-clamp-1 text-base">
//                     {ad.title}
//                   </h4>
//                 </div>
//               </Card>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Navigation Buttons */}
//         {homepageAds.length > 1 && (
//           <>
//             <CarouselPrevious className="hidden md:flex -left-12 h-12 w-12 border-2 shadow-lg hover:scale-110 transition-transform" />
//             <CarouselNext className="hidden md:flex -right-12 h-12 w-12 border-2 shadow-lg hover:scale-110 transition-transform" />
//           </>
//         )}
//       </Carousel>

//       {/* Pagination Dots */}
//       {homepageAds.length > 1 && (
//         <div className="flex items-center justify-center gap-2 mt-6">
//           {Array.from({ length: count }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => api?.scrollTo(index)}
//               className={`transition-all duration-300 rounded-full ${
//                 current === index + 1
//                   ? 'w-8 h-2.5 bg-primary'
//                   : 'w-2.5 h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
//               }`}
//               aria-label={`الانتقال إلى الإعلان ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//           {/* Ad Counter */}
//       {homepageAds.length > 1 && (
//         <div className="text-center mt-3">
//           <p className="text-sm text-muted-foreground font-medium">
//             {current} من {count}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };





// import React, { useCallback, useEffect, useRef } from 'react';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../ui/carousel';
// import { Card } from '../../ui/card';
// import { useHomepageAds } from '../../../hooks/useAd';
// import { Ad } from '../../../api/types/ads.types';
// import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import type { CarouselApi } from '@/components/ui/carousel';

// interface AdsCarouselProps {
//   className?: string;
//   autoPlay?: boolean;
//   interval?: number;
// }

// export const AdsCarousel: React.FC<AdsCarouselProps> = ({
//   className = '',
//   autoPlay = true,
//   interval = 5000,
// }) => {
//   const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();
//   const [api, setApi] = React.useState<CarouselApi>();
//   const [current, setCurrent] = React.useState(0);
//   const [count, setCount] = React.useState(0);
//   const autoPlayRef = useRef<NodeJS.Timeout>();
//   const viewedAdsRef = useRef<Set<string>>(new Set());

//   // Handle ad click with tracking
//   const handleAdClick = useCallback(async (ad: Ad, e: React.MouseEvent) => {
//     e.preventDefault();
    
//     try {
//       await trackClick(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad click:', error);
//     }
    
//     window.open(`/products/${ad.product_id}`, '_blank', 'noopener,noreferrer');
//   }, [trackClick]);

//   // Track ad view when visible
//   const handleAdView = useCallback(async (ad: Ad) => {
//     if (viewedAdsRef.current.has(ad.id)) return;
    
//     viewedAdsRef.current.add(ad.id);
//     try {
//       await trackView(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad view:', error);
//     }
//   }, [trackView]);

//   // Setup carousel API
//   useEffect(() => {
//     if (!api) return;

//     const updateCount = () => {
//       const snapList = api.scrollSnapList();
//       setCount(snapList.length);
//       setCurrent(api.selectedScrollSnap() + 1);
//     };

//     updateCount();

//     api.on('select', () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });

//     api.on('reInit', updateCount);
//   }, [api]);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!api || !autoPlay || homepageAds.length <= 1) return;

//     const startAutoPlay = () => {
//       stopAutoPlay(); // Clear any existing interval
//       autoPlayRef.current = setInterval(() => {
//         if (api.canScrollNext()) {
//           api.scrollNext();
//         } else {
//           api.scrollTo(0);
//         }
//       }, interval);
//     };

//     const stopAutoPlay = () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//         autoPlayRef.current = undefined;
//       }
//     };

//     startAutoPlay();

//     // Pause on hover
//     const carouselElement = api.rootNode();
//     if (carouselElement) {
//       carouselElement.addEventListener('mouseenter', stopAutoPlay);
//       carouselElement.addEventListener('mouseleave', startAutoPlay);
//     }

//     return () => {
//       stopAutoPlay();
//       if (carouselElement) {
//         carouselElement.removeEventListener('mouseenter', stopAutoPlay);
//         carouselElement.removeEventListener('mouseleave', startAutoPlay);
//       }
//     };
//   }, [api, autoPlay, interval, homepageAds.length]);

//   // Track current ad view
//   useEffect(() => {
//     if (homepageAds.length > 0 && current > 0) {
//       const currentAd = homepageAds[current - 1];
//       if (currentAd) {
//         handleAdView(currentAd);
//       }
//     }
//   }, [current, homepageAds, handleAdView]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-br from-muted/50 to-muted rounded-xl md:rounded-2xl overflow-hidden">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-3 sm:space-y-4">
//               <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-spin text-primary mx-auto" />
//               <p className="text-muted-foreground font-medium text-sm sm:text-base">جاري تحميل الإعلانات...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl md:rounded-2xl overflow-hidden border border-destructive/20">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-2 sm:space-y-3 px-4">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-xl sm:text-2xl md:text-3xl">⚠️</span>
//               </div>
//               <p className="text-destructive font-semibold text-base sm:text-lg">خطأ في تحميل الإعلانات</p>
//               <p className="text-destructive/70 text-xs sm:text-sm">{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!homepageAds || homepageAds.length === 0) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl md:rounded-2xl overflow-hidden border border-dashed border-muted-foreground/20">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-2 sm:space-y-3">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-xl sm:text-2xl md:text-3xl">📢</span>
//               </div>
//               <p className="text-muted-foreground font-medium text-sm sm:text-base">لا توجد إعلانات حالياً</p>
//               <p className="text-muted-foreground/60 text-xs sm:text-sm">سيتم عرض الإعلانات قريباً</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full ${className}`}>
//       <Carousel
//         setApi={setApi}
//         opts={{
//           align: 'start',
//           loop: true,
//           direction: 'rtl',
//         }}
//         className="w-full relative"
//       >
//         <CarouselContent className="ml-0 rtl:space-x-reverse">
//           {homepageAds.map((ad, index) => (
//             <CarouselItem 
//               key={ad.id} 
//               className="basis-full sm:basis-1/2 lg:basis-1/3 pl-2 sm:pl-4 pr-2 sm:pr-4"
//             >
//               <div className="p-1 sm:p-2">
//                 <Card
//                   className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer border border-muted/50 bg-background"
//                   onClick={(e) => handleAdClick(ad, e)}
//                 >
//                   {/* Image Container */}
//                   <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px] overflow-hidden bg-muted">
//                     <img
//                       src={ad.image_url || '/placeholder-ad.jpg'}
//                       alt={ad.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                       loading={index === 0 ? "eager" : "lazy"}
//                       onError={(e) => {
//                         const target = e.target as HTMLImageElement;
//                         target.src = '/placeholder-ad.jpg';
//                       }}
//                     />
                    
//                     {/* Gradient Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
//                     {/* Ad Badge */}
//                     <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold shadow-lg">
//                       إعلان
//                     </div>
                    
//                     {/* Hover Content - Only on desktop */}
//                     <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-500 hidden sm:block">
//                       <h3 className="text-white font-bold text-lg sm:text-xl mb-2 line-clamp-2">
//                         {ad.title}
//                       </h3>
//                       {ad.description && (
//                         <p className="text-white/90 text-xs sm:text-sm line-clamp-2 mb-3">
//                           {ad.description}
//                         </p>
//                       )}
//                       <div className="flex items-center justify-between">
//                         <span className="text-white font-semibold text-xs sm:text-sm">
//                           اضغط للمزيد
//                         </span>
//                         <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                       </div>
//                     </div>

//                     {/* Mobile Info Overlay */}
//                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent sm:hidden">
//                       <h3 className="text-white font-bold text-sm line-clamp-1 mb-1">
//                         {ad.title}
//                       </h3>
//                       {ad.description && (
//                         <p className="text-white/80 text-xs line-clamp-1">
//                           {ad.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Bottom Info Bar - Hidden on mobile */}
//                   <div className="hidden sm:block p-3 sm:p-4 bg-gradient-to-r from-background to-muted/30">
//                     <h4 className="font-semibold text-foreground line-clamp-1 text-sm sm:text-base">
//                       {ad.title}
//                     </h4>
//                   </div>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>

//         {/* Navigation Buttons - Hidden on mobile, visible on tablet and up */}
//         {homepageAds.length > 1 && (
//           <>
//             <CarouselPrevious className="hidden sm:flex -left-2 md:-left-4 lg:-left-6 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 border shadow-lg hover:scale-105 transition-transform bg-background/80 backdrop-blur-sm" />
//             <CarouselNext className="hidden sm:flex -right-2 md:-right-4 lg:-right-6 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 border shadow-lg hover:scale-105 transition-transform bg-background/80 backdrop-blur-sm" />
//           </>
//         )}
//       </Carousel>

//       {/* Pagination Dots */}
//       {homepageAds.length > 1 && (
//         <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
//           {Array.from({ length: count }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => api?.scrollTo(index)}
//               className={`transition-all duration-300 rounded-full ${
//                 current === index + 1
//                   ? 'w-6 sm:w-8 h-1.5 sm:h-2.5 bg-primary'
//                   : 'w-1.5 sm:w-2.5 h-1.5 sm:h-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
//               }`}
//               aria-label={`الانتقال إلى الإعلان ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Ad Counter */}
//       {homepageAds.length > 1 && (
//         <div className="text-center mt-2 sm:mt-3">
//           <p className="text-xs sm:text-sm text-muted-foreground font-medium">
//             {current} من {count}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };








// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Card } from '../../ui/card';
// import { useHomepageAds } from '../../../hooks/useAd';
// import { Ad } from '../../../api/types/ads.types';
// import { Loader2, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// interface AdsCarouselProps {
//   className?: string;
//   autoPlay?: boolean;
//   interval?: number;
// }

// export const AdsCarousel: React.FC<AdsCarouselProps> = ({
//   className = '',
//   autoPlay = true,
//   interval = 5000,
// }) => {
//   const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();
//   const viewedAdsRef = useRef<Set<string>>(new Set());
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);
//   const [isHovered, setIsHovered] = useState(false);
//   const autoPlayRef = useRef<NodeJS.Timeout>();
//   const touchStartRef = useRef<number>(0);
//   const touchEndRef = useRef<number>(0);

//   // Handle ad click with tracking
//   const handleAdClick = useCallback(async (ad: Ad, e: React.MouseEvent) => {
//     e.preventDefault();
    
//     try {
//       await trackClick(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad click:', error);
//     }
    
//     window.open(`/products/${ad.product_id}`, '_blank', 'noopener,noreferrer');
//   }, [trackClick]);

//   // Track ad view when visible
//   const handleAdView = useCallback(async (ad: Ad) => {
//     if (viewedAdsRef.current.has(ad.id)) return;
    
//     viewedAdsRef.current.add(ad.id);
//     try {
//       await trackView(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad view:', error);
//     }
//   }, [trackView]);

//   // Navigation functions
//   const goToNext = useCallback(() => {
//     if (homepageAds.length === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % homepageAds.length);
//   }, [homepageAds.length]);

//   const goToPrev = useCallback(() => {
//     if (homepageAds.length === 0) return;
//     setCurrentIndex((prev) => (prev - 1 + homepageAds.length) % homepageAds.length);
//   }, [homepageAds.length]);

//   const goToSlide = useCallback((index: number) => {
//     setCurrentIndex(index);
//   }, []);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isPlaying || homepageAds.length <= 1 || isHovered) {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//       return;
//     }

//     autoPlayRef.current = setInterval(goToNext, interval);

//     return () => {
//       if (autoPlayRef.current) {
//         clearInterval(autoPlayRef.current);
//       }
//     };
//   }, [isPlaying, homepageAds.length, isHovered, goToNext, interval]);

//   // Track current ad view
//   useEffect(() => {
//     if (homepageAds.length > 0) {
//       const currentAd = homepageAds[currentIndex];
//       if (currentAd) {
//         handleAdView(currentAd);
//       }
//     }
//   }, [currentIndex, homepageAds, handleAdView]);
//   // Touch handlers for mobile swipe
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartRef.current = e.targetTouches<a href="" class="citation-link" target="_blank" style="vertical-align: super; font-size: 0.8em; margin-left: 3px;">[0]</a>.clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndRef.current = e.targetTouches<a href="" class="citation-link" target="_blank" style="vertical-align: super; font-size: 0.8em; margin-left: 3px;">[0]</a>.clientX;
//   };

//   const handleTouchEnd = () => {
//     if (touchStartRef.current - touchEndRef.current > 50) {
//       goToNext();
//     }
//     if (touchStartRef.current - touchEndRef.current < -50) {
//       goToPrev();
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-primary/5 via-muted/50 to-primary/10 rounded-3xl overflow-hidden shadow-2xl">
//           <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
//             <div className="text-center space-y-4">
//               <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto drop-shadow-lg" />
//               <p className="text-muted-foreground font-semibold text-lg">جاري تحميل الإعلانات...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-3xl overflow-hidden border-2 border-destructive/20 shadow-xl">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-4 px-4">
//               <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto shadow-lg">
//                 <span className="text-4xl">⚠️</span>
//               </div>
//               <p className="text-destructive font-bold text-xl">خطأ في تحميل الإعلانات</p>
//               <p className="text-destructive/70 text-sm max-w-md">{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!homepageAds || homepageAds.length === 0) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-muted/30 via-background to-muted/20 rounded-3xl overflow-hidden border-2 border-dashed border-muted-foreground/20 shadow-xl">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-4">
//               <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto shadow-lg">
//                 <span className="text-4xl">📢</span>
//               </div>
//               <p className="text-muted-foreground font-semibold text-lg">لا توجد إعلانات حالياً</p>
//               <p className="text-muted-foreground/60 text-sm">سيتم عرض الإعلانات قريباً</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const currentAd = homepageAds[currentIndex];
//   return (
//     <div 
//       className={`w-full relative ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       {/* Main Slider Container */}
//       <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-3xl shadow-2xl">
//         {/* Slides */}
//         <div className="relative w-full h-full">
//           {homepageAds.map((ad, index) => (
//             <div
//               key={ad.id}
//               className={`absolute inset-0 transition-all duration-700 ease-in-out ${
//                 index === currentIndex
//                   ? 'opacity-100 scale-100 z-10'
//                   : 'opacity-0 scale-95 z-0'
//               }`}
//             >
//               <Card
//                 className="relative w-full h-full overflow-hidden border-0 rounded-3xl cursor-pointer group"
//                 onClick={(e) => handleAdClick(ad, e)}
//               >
//                 {/* Background Image */}
//                 <div className="absolute inset-0">
//                   <img
//                     src={ad.image_url || '/placeholder-ad.jpg'}
//                     alt={ad.title}
//                     className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-110"
//                     loading={index === currentIndex ? "eager" : "lazy"}
//                     onError={(e) => {
//                       const target = e.target as HTMLImageElement;
//                       target.src = '/placeholder-ad.jpg';
//                     }}
//                   />
//                 </div>

//                 {/* Gradient Overlays */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />

//                 {/* Ad Badge */}
//                 <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
//                   <div className="bg-primary/95 backdrop-blur-md text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-2xl border border-primary-foreground/20 flex items-center gap-2">
//                     <span className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></span>
//                     إعلان مميز
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12 z-20">
//                   <div className="max-w-3xl">
//                     {/* Title */}
//                     <h2 className="text-white font-bold text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 drop-shadow-2xl line-clamp-2 transform transition-all duration-500 group-hover:translate-x-2">
//                       {ad.title}
//                     </h2>

//                     {/* Description */}
//                     {ad.description && (
//                       <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 md:mb-8 line-clamp-2 md:line-clamp-3 drop-shadow-lg transform transition-all duration-500 delay-75 group-hover:translate-x-2">
//                         {ad.description}
//                       </p>
//                     )}

//                                     {/* CTA Button */}
//                     <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 transform group-hover:translate-x-2 flex items-center gap-2">
//                       <span>اعرض المنتج</span>
//                       <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Decorative Elements */}
//                 <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
//                 <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50" />
//               </Card>
//             </div>
//           ))}
//         </div>

//         {/* Navigation Arrows */}
//         {homepageAds.length > 1 && (
//           <>
//             {/* Previous Button */}
//             <button
//               onClick={goToPrev}
//               className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group border border-white/20"
//               aria-label="الإعلان السابق"
//             >
//               <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
//             </button>

//             {/* Next Button */}
//             <button
//               onClick={goToNext}
//               className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group border border-white/20"
//               aria-label="الإعلان التالي"
//             >
//               <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
//             </button>
//           </>
//         )}

//         {/* Play/Pause Button */}
//         {homepageAds.length > 1 && (
//           <button
//             onClick={() => setIsPlaying(!isPlaying)}
//             className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border border-white/20"
//             aria-label={isPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}
//           >
//             {isPlaying ? (
//               <Pause className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
//             ) : (
//               <Play className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" />
//             )}
//           </button>
//         )}
//       </div>
//       {/* Pagination Dots */}
//       {homepageAds.length > 1 && (
//         <div className="flex items-center justify-center gap-2 md:gap-3 mt-6 md:mt-8">
//           {homepageAds.map((ad, index) => (
//             <button
//               key={ad.id}
//               onClick={() => goToSlide(index)}
//               className={`transition-all duration-500 rounded-full hover:scale-110 ${
//                 currentIndex === index
//                   ? 'w-12 md:w-16 h-2.5 md:h-3 bg-primary shadow-lg shadow-primary/50'
//                   : 'w-2.5 md:w-3 h-2.5 md:h-3 bg-muted-foreground/30 hover:bg-muted-foreground/50'
//               }`}
//               aria-label={`الانتقال إلى الإعلان ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Counter & Info */}
//       <div className="flex items-center justify-between mt-4 md:mt-6 px-2">
//         {/* Current Slide Counter */}
//         {homepageAds.length > 1 && (
//           <div className="flex items-center gap-2">
//             <div className="bg-muted/50 backdrop-blur-sm px-4 py-2 rounded-full">
//               <p className="text-sm md:text-base font-bold text-foreground">
//                 <span className="text-primary text-lg md:text-xl">{currentIndex + 1}</span>
//                 <span className="text-muted-foreground mx-1">/</span>
//                 <span className="text-muted-foreground">{homepageAds.length}</span>
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Progress Bar */}
//         {homepageAds.length > 1 && isPlaying && !isHovered && (
//           <div className="flex-1 mx-4 md:mx-6 max-w-xs">
//             <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
//               <div 
//                 className="h-full bg-primary rounded-full transition-all"
//                 style={{
//                   animation: `progress ${interval}ms linear infinite`,
//                 }}
//               />
//             </div>
//           </div>
//         )}

//         {/* Ads Info */}
//         <div className="bg-muted/50 backdrop-blur-sm px-4 py-2 rounded-full">
//           <p className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//             إعلانات نشطة
//           </p>
//         </div>
//       </div>

//       {/* Thumbnail Preview (Desktop Only) */}
//       {homepageAds.length > 1 && (
//         <div className="hidden lg:flex items-center justify-center gap-4 mt-8">
//           {homepageAds.map((ad, index) => (
//             <button
//               key={ad.id}
//               onClick={() => goToSlide(index)}
//               className={`relative group overflow-hidden rounded-xl transition-all duration-500 ${
//                 currentIndex === index
//                   ? 'w-32 h-20 ring-4 ring-primary shadow-xl shadow-primary/30 scale-110'
//                   : 'w-24 h-16 opacity-50 hover:opacity-100 hover:scale-105'
//               }`}
//             >
//               <img
//                 src={ad.image_url || '/placeholder-ad.jpg'}
//                 alt={ad.title}
//                 className="w-full h-full object-cover"
//               />              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//               <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
//                 currentIndex === index ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
//               }`}>
//                 <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
//                   <Play className="w-4 h-4 text-white" fill="white" />
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Keyboard Navigation Hint */}
//       {homepageAds.length > 1 && (
//         <div className="hidden md:flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
//           <div className="flex items-center gap-2">
//             <kbd className="px-2 py-1 bg-muted rounded border border-border">←</kbd>
//             <span>السابق</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <kbd className="px-2 py-1 bg-muted rounded border border-border">→</kbd>
//             <span>التالي</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <kbd className="px-2 py-1 bg-muted rounded border border-border">Space</kbd>
//             <span>إيقاف/تشغيل</span>
//           </div>
//         </div>
//       )}

//       {/* Add CSS Animation for Progress Bar */}
//       <style jsx>{`
//         @keyframes progress {
//           from {
//             width: 0%;
//           }
//           to {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // Add keyboard navigation support
// useEffect(() => {
//   const handleKeyDown = (e: KeyboardEvent) => {
//     if (homepageAds.length <= 1) return;
    
//     switch (e.key) {
//       case 'ArrowLeft':
//         goToPrev();
//         break;
//       case 'ArrowRight':
//         goToNext();
//         break;
//       case ' ':
//         e.preventDefault();
//         setIsPlaying(prev => !prev);
//         break;
//     }
//   };

//   window.addEventListener('keydown', handleKeyDown);
//   return () => window.removeEventListener('keydown', handleKeyDown);
// }, [homepageAds.length, goToNext, goToPrev]);





// import React, { useCallback, useEffect, useRef } from 'react';
// import { Card } from '../../ui/card';
// import { useHomepageAds } from '../../../hooks/useAd';
// import { Ad } from '../../../api/types/ads.types';
// import { Loader2 } from 'lucide-react';

// interface AdsCarouselProps {
//   className?: string;
// }

// export const AdsCarousel: React.FC<AdsCarouselProps> = ({
//   className = '',
// }) => {
//   const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();
//   const viewedAdsRef = useRef<Set<string>>(new Set());

//   // Handle ad click with tracking
//   const handleAdClick = useCallback(async (ad: Ad, e: React.MouseEvent) => {
//     e.preventDefault();
    
//     try {
//       await trackClick(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad click:', error);
//     }
    
//     window.open(`/products/${ad.product_id}`, '_blank', 'noopener,noreferrer');
//   }, [trackClick]);

//   // Track ad view when visible
//   const handleAdView = useCallback(async (ad: Ad) => {
//     if (viewedAdsRef.current.has(ad.id)) return;
    
//     viewedAdsRef.current.add(ad.id);
//     try {
//       await trackView(ad.id);
//     } catch (error) {
//       console.error('Failed to track ad view:', error);
//     }
//   }, [trackView]);

//   // Track initial ad views
//   useEffect(() => {
//     homepageAds.forEach(ad => {
//       handleAdView(ad);
//     });
//   }, [homepageAds, handleAdView]);

//   // Loading state
//   if (loading) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[300px] bg-gradient-to-br from-muted/50 to-muted rounded-xl overflow-hidden">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-3">
//               <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
//               <p className="text-muted-foreground font-medium text-sm">جاري تحميل الإعلانات...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[300px] bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-xl overflow-hidden border border-destructive/20">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-2 px-4">
//               <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-xl">⚠️</span>
//               </div>
//               <p className="text-destructive font-semibold text-base">خطأ في تحميل الإعلانات</p>
//               <p className="text-destructive/70 text-xs">{error}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Empty state
//   if (!homepageAds || homepageAds.length === 0) {
//     return (
//       <div className={`w-full ${className}`}>
//         <div className="relative w-full h-[300px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl overflow-hidden border border-dashed border-muted-foreground/20">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="text-center space-y-2">
//               <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
//                 <span className="text-xl">📢</span>
//               </div>
//               <p className="text-muted-foreground font-medium text-sm">لا توجد إعلانات حالياً</p>
//               <p className="text-muted-foreground/60 text-xs">سيتم عرض الإعلانات قريباً</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`w-full ${className}`}>
//       {/* Grid Container */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//         {homepageAds.map((ad, index) => (
//           <Card
//             key={ad.id}
//             className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer border border-muted/50 bg-background"
//             onClick={(e) => handleAdClick(ad, e)}
//           >
//             {/* Image Container */}
//             <div className="relative w-full h-[200px] sm:h-[180px] md:h-[200px] overflow-hidden bg-muted">
//               <img
//                 src={ad.image_url || '/placeholder-ad.jpg'}
//                 alt={ad.title}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 loading={index < 4 ? "eager" : "lazy"}
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement;
//                   target.src = '/placeholder-ad.jpg';
//                 }}
//               />
              
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
//               {/* Ad Badge */}
//               <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
//                 إعلان
//               </div>
              
//               {/* Hover Content - Only on desktop */}
//               <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden sm:block">
//                 <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
//                   {ad.title}
//                 </h3>
//                 {ad.description && (
//                   <p className="text-white/90 text-xs line-clamp-2 mb-3">
//                     {ad.description}
//                   </p>
//                 )}
//                 <div className="flex items-center justify-between">
//                   <span className="text-white font-semibold text-xs">
//                     اضغط للمزيد
//                   </span>
//                 </div>
//               </div>

//               {/* Mobile Info Overlay */}
//               <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent sm:hidden">
//                 <h3 className="text-white font-bold text-xs line-clamp-1 mb-1">
//                   {ad.title}
//                 </h3>
//                 {ad.description && (
//                   <p className="text-white/80 text-xs line-clamp-1">
//                     {ad.description}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Bottom Info Bar */}
//             <div className="p-3 bg-gradient-to-r from-background to-muted/30">
//               <h4 className="font-semibold text-foreground line-clamp-1 text-sm">
//                 {ad.title}
//               </h4>
//               {ad.description && (
//                 <p className="text-muted-foreground text-xs line-clamp-1 mt-1">
//                   {ad.description}
//                 </p>
//               )}
//             </div>
//           </Card>
//         ))}
//       </div>

//       {/* Ads Counter */}
//       <div className="text-center mt-6">
//         <p className="text-sm text-muted-foreground font-medium">
//           عرض {homepageAds.length} إعلان
//         </p>
//       </div>
//     </div>
//   );
// };



import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card } from '../../ui/card';
import { useHomepageAds } from '../../../hooks/useAd';
import { Ad } from '../../../api/types/ads.types';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface AdsCarouselProps {
  className?: string;
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({
  className = '',
}) => {
  const { homepageAds, loading, error, trackClick, trackView } = useHomepageAds();
  const viewedAdsRef = useRef<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Handle ad click with tracking
  const handleAdClick = useCallback(async (ad: Ad, e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      await trackClick(ad.id);
    } catch (error) {
      console.error('Failed to track ad click:', error);
    }
    
    window.open(`/products/${ad.product_id}`, '_blank', 'noopener,noreferrer');
  }, [trackClick]);

  // Track ad view when visible
  const handleAdView = useCallback(async (ad: Ad) => {
    if (viewedAdsRef.current.has(ad.id)) return;
    
    viewedAdsRef.current.add(ad.id);
    try {
      await trackView(ad.id);
    } catch (error) {
      console.error('Failed to track ad view:', error);
    }
  }, [trackView]);

  // Track initial ad views
  useEffect(() => {
    homepageAds.forEach(ad => {
      handleAdView(ad);
    });
  }, [homepageAds, handleAdView]);

  // Touch and drag handlers for mobile slider
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) { // Minimum drag distance
      if (diff > 0 && currentIndex < homepageAds.length - 1) {
        // Swipe left - next
        setCurrentIndex(prev => prev + 1);
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous
        setCurrentIndex(prev => prev - 1);
      }
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Auto-play for mobile
  useEffect(() => {
    if (homepageAds.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => 
        prev === homepageAds.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [homepageAds.length]);

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[currentIndex] as HTMLElement;
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - container.offsetLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  // Loading state
  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-[280px] bg-gradient-to-br from-muted/50 to-muted rounded-2xl overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
              <p className="text-muted-foreground font-medium">جاري تحميل الإعلانات...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-[280px] bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-2xl overflow-hidden border border-destructive/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3 px-6">
              <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-destructive font-semibold text-lg">خطأ في تحميل الإعلانات</p>
              <p className="text-destructive/70 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!homepageAds || homepageAds.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full h-[280px] bg-gradient-to-br from-muted/30 to-muted/10 rounded-2xl overflow-hidden border border-dashed border-muted-foreground/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📢</span>
              </div>
              <p className="text-muted-foreground font-medium">لا توجد إعلانات حالياً</p>
              <p className="text-muted-foreground/60 text-sm">سيتم عرض الإعلانات قريباً</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Slider Container */}
      <div className="relative">
        {/* Scroll Container for Mobile */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {homepageAds.map((ad, index) => (
            <div
              key={ad.id}
              className="flex-shrink-0 w-[85vw] max-w-sm snap-center md:w-auto md:flex-shrink"
            >
              <Card
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer border border-muted/30 bg-background md:rounded-xl"
                onClick={(e) => handleAdClick(ad, e)}
              >
                {/* Image Container */}
                <div className="relative w-full h-[220px] md:h-[180px] lg:h-[200px] overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img
                    src={ad.image_url || '/placeholder-ad.jpg'}
                    alt={ad.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index < 3 ? "eager" : "lazy"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-ad.jpg';
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Ad Badge */}
                  {/* <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-2xl">
                    إعلان
                  </div> */}
                  
                  {/* Hover Content - Desktop only */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center p-6">
                    <div className="text-center text-white">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {ad.title}
                      </h3>
                      {ad.description && (
                        <p className="text-white/90 text-sm line-clamp-3 mb-4">
                          {ad.description}
                        </p>
                      )}
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm">
                        اضغط للمزيد
                      </div>
                    </div>
                  </div>

                  {/* Mobile Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:hidden">
                    <h3 className="text-white font-bold text-base mb-1 line-clamp-1">
                      {ad.title}
                    </h3>
                    {ad.description && (
                      <p className="text-white/80 text-sm line-clamp-2">
                        {ad.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Info Bar - Desktop only */}
                <div className="hidden md:block p-4 bg-gradient-to-r from-background to-muted/20 border-t border-muted/30">
                  <h4 className="font-semibold text-foreground line-clamp-1 text-sm">
                    {ad.title}
                  </h4>
                  {ad.description && (
                    <p className="text-muted-foreground text-xs line-clamp-1 mt-1">
                      {ad.description}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Arrows */}
        {/* {homepageAds.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl md:hidden z-10"
              disabled={currentIndex === 0}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex(prev => Math.min(homepageAds.length - 1, prev + 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-2xl md:hidden z-10"
              disabled={currentIndex === homepageAds.length - 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )} */}

        {/* Mobile Pagination Dots */}
        {homepageAds.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {homepageAds.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Ads Counter */}
      <div className="text-center mt-6 md:mt-8">
        <p className="text-sm text-muted-foreground font-medium">
          عرض {homepageAds.length} إعلان
        </p>
      </div>
    </div>
  );
};