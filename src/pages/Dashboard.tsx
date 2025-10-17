// import React from 'react';
// import { useAuth } from '../hooks/useAuth';
// import { Link } from 'react-router-dom';
// import Products from './Products';
// import { AdsCarousel } from '../components/App-components/ads/AdsCarousel';


// const Home: React.FC = () => {
//   // const { isAuthenticated, user } = useAuth();

//   return (
//     <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
  
//       <section>

//       <AdsCarousel 
    
//       />

//       </section>
//       <Products/>

    
  
//     </div>
//   );
// };

// export default Home;




// components/Home.tsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import Products from './Products';
import { AdsCarousel } from '../components/App-components/ads/AdsCarousel';
import ProductsList from '../components/App-components/Product/ProductsList';
import CategoryGrid from '../components/App-components/category';
// import CategoriesOverview from '../components/App-components/categorys/Categoryscard';
import CategoryCircleList from '../components/App-components/categorys/CategoryList';
import { useCategories } from '../hooks/useCategory';

const Home: React.FC = () => {
  // const { isAuthenticated, user } = useAuth();
    const { categories, isLoading, error, refetch } = useCategories();

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4">
      {/* Ads Section */}

      <section className="mb-6">
        <AdsCarousel />
      </section>
     <CategoryCircleList 
          categories={categories} 
          size={90}
          spacing={16}
          showNameAr={true}
        />
      
      {/* Products Section */}
      <section>
<ProductsList/>
      </section>
    </div>
  );
};

export default Home;