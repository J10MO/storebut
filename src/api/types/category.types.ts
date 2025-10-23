// export interface Category {
//   id: number;
//   name: string;
//   name_ar: string;
//   description: string;
//   description_ar: string;
//   image_url: string | null;
//   emoji_icon: string | null;
//   created_at: string;
//   updated_at: string;
// }



import { Product } from './product.types';

export interface Category {
  id: number;
  name: string;
  name_ar: string;
  icon: string | null;
  color: string | null;
  image_url: string | null;
  product_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryData {
  name: string;
  name_ar: string;
  icon?: string;
  color?: string;
  image?: File;
}

export interface UpdateCategoryData {
  name?: string;
  name_ar?: string;
  icon?: string;
  color?: string;
  image?: File;
}

export interface CategoryProductsResponse {
  category: Category;
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CategoryFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
