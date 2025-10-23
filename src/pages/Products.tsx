// import React from 'react';
// import { useProducts } from '../hooks/useProducts';
// import ProductCard from '../components/App-components/ProductCard';

// const Products: React.FC = () => {
//   const { products, loading, error } = useProducts();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-lg text-gray-600">Loading products...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-lg text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {products.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No products found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;




// import React from 'react';
// import { useProducts } from '../hooks/useProducts';
// import ProductCard from '../components/App-components/ProductCard';

// const Products: React.FC = () => {
//   const { products, loading, error } = useProducts();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-lg text-gray-600">Loading products...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-64">
//         <div className="text-lg text-red-600">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Products</h1>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {products.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No products found.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;



// // pages/ProductsPage.tsx
// import React from 'react';
// import ProductsList from '../components/App-components/Product/ProductsList';

// const ProductsPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
//           <p className="text-gray-600">Discover our amazing collection of products</p>
//         </div>
        
//         <ProductsList />
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;




// pages/Products.tsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductsList from '../components/App-components/Product/ProductsList';

import { Search, Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // الحصول على categoryId من URL parameters
  const urlCategoryId = searchParams.get('category');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    urlCategoryId ? parseInt(urlCategoryId) : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // دالة التعامل مع اختيار التصنيف
  const handleCategorySelect = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    
    // تحديث URL parameters
    if (categoryId) {
      searchParams.set('category', categoryId.toString());
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const hasActiveFilters = selectedCategoryId !== null || searchQuery !== '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
       

        {/* قائمة المنتجات */}
        <ProductsList 
          categoryId={selectedCategoryId}
          searchQuery={searchQuery}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default Products;
