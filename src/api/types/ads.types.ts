

export interface Ad {
  id: number;
  product_id: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  image_url: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  click_count: number;
  view_count: number;
  position: string;
  priority: number;
  created_at: string;
  updated_at: string;
  
  // المنتج المرتبط (من JOIN queries)
  product_name?: string;
  product_name_ar?: string;
  product_price?: number;
  product_image?: string;
  product_original_price?: number;
  product_discount?: number;
  product_description?: string;
  product_description_ar?: string;
}

export interface CreateAdData {
  product_id: number;
  title: string;
  title_ar: string;
  description?: string;
  description_ar?: string;
  image_url: string;
  start_date: string;
  end_date: string;
  position?: string;
  priority?: number;
}

export interface UpdateAdData extends Partial<CreateAdData> {
  is_active?: boolean;
}

export interface AdsResponse {
  success: boolean;
  ads: Ad[];
}

export interface AdResponse {
  success: boolean;
  ad: Ad;
}

export interface AdsFilters {
  active_only?: boolean;
  position?: string;
}