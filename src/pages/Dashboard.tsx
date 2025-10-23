// import type React from "react"
// import ProductsList from "../components/App-components/Product/ProductsList"
// import CategoryCircleList from "../components/App-components/categorys/CategoryList"
// import { useCategories } from "../hooks/useCategory"
// import { Sparkles, TrendingUp, Package } from "lucide-react"
// import { HeroAdsCarousel } from "../components/App-components/ads/HeroAdsCarousel"
// import { AdsCarousel } from "../components/App-components/ads/AdsCarousel"

// const Home: React.FC = () => {
//   const { categories, isLoading, error } = useCategories()

//   return (
//     <div className="min-h-screen  py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        // <section className="animate-fade-in">
        //   <AdsCarousel/>
        // </section>



        // {/* Categories Section */}
        // {!isLoading && !error && categories.length > 0 && (
        //   <section className="backdrop-blur-xl0 animate-fade-in">
        //     <div className=" mb-2">
              
              
        //     </div>
        //     <CategoryCircleList categories={categories} size={90} spacing={16} showNameAr={true} />
        //   </section>
        // )}

        // {/* Products Section */}
        // <section className="   animate-fade-in">
        //   <div className="flex items-center justify-between mb-1">
        //     <div className="flex items-center gap-3">
        //       <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
        //         <TrendingUp className="w-5 h-5 text-white" />
        //       </div>
        //       <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
        //         المنتجات المميزة
        //       </h2>
        //     </div>
        //     <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        //       <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
        //       <span>جديد</span>
        //     </div>
        //   </div>
        //   <ProductsList />
        // </section>
//       </div>
//     </div>
//   )
// }

// export default Home


import type React from "react"
import ProductsList from "../components/App-components/Product/ProductsList"
import CategoryCircleList from "../components/App-components/categorys/CategoryList"
import { useCategories } from "../hooks/useCategory"
import { Sparkles, TrendingUp, Package } from "lucide-react"
import { HeroAdsCarousel } from "../components/App-components/ads/HeroAdsCarousel"
import { AdsCarousel } from "../components/App-components/ads/AdsCarousel"
const Home: React.FC = () => {
  const { categories, isLoading, error } = useCategories()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
         <section className="animate-fade-in">
          <AdsCarousel/>
        </section>



        {/* Categories Section */}
        {!isLoading && !error && categories.length > 0 && (
          <section className="backdrop-blur-xl0 animate-fade-in">
            <div className=" mb-2">
              
              
            </div>
            <CategoryCircleList categories={categories} size={90} spacing={16} showNameAr={true} />
          </section>
        )}

        {/* Products Section */}
        <section className="   animate-fade-in">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                المنتجات المميزة
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
              <span>جديد</span>
            </div>
          </div>
          <ProductsList />
        </section>
      </div>
    </div>
  )
}

export default Home
