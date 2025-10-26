export interface Product {
  id: number;
  name: string;
  name_ar: string;
  brand: string;
  price: string;
  original_price: string;
  description: string;
  description_ar: string;
  category_id: number;
  image_url: string | null;
  emoji_icon: string | null;
  rating: string;
  reviews_count: number;
  stock_quantity: number;
  in_stock: boolean;
  discount: number;
  badge: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_name_ar: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}
