export interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
}

export interface FavoriteWithProduct extends Favorite {
  product: {
    id: number;
    name: string;
    name_ar: string;
    brand?: string;
    price: number;
    original_price?: number;
    description?: string;
    description_ar?: string;
    image_url?: string;
    discount: number;
    in_stock: boolean;
    rating: number;
    reviews_count: number;
    category_id: number;
    emoji_icon?: string;
    badge?: string;
    stock_quantity: number;
    sale_price?: number;
    created_at: string;
    updated_at: string;
  };
  category_name?: string;
  category_name_ar?: string;
}

export interface FavoritesResponse {
  favorites: FavoriteWithProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FavoriteCheckResponse {
  isFavorite: boolean;
  favorite: Favorite | null;
}

export interface FavoriteCountResponse {
  count: number;
}

export interface FavoriteActionResponse {
  message: string;
  message_ar: string;
  favorite?: Favorite;
  product?: any;
}