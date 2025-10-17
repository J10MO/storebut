// Hook for category products - الإصدار المصحح
export const useCategoryProducts = (
  categoryId: string | number, 
  options: UseCategoryProductsOptions = {}
) => {
  const { 
    page = 1, 
    limit = 20, 
    sortBy = 'newest', 
    enabled = true 
  } = options;

  const [data, setData] = useState<CategoryProductsResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategoryProducts = async () => {
    // تحقق من أن categoryId صالح و enabled
    const numericId = Number(categoryId);
    if (!enabled || !numericId || isNaN(numericId)) {
      console.warn('Invalid category ID or disabled hook:', categoryId);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await categoriesAPI.getCategoryProducts(
        numericId, // تأكد من تمرير رقم وليس كائن
        page, 
        limit, 
        sortBy
      );
      setData(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'فشل في جلب منتجات التصنيف';
      setError(errorMessage);
      console.error('Error fetching category products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryId, page, limit, sortBy, enabled]);

  const refetch = () => {
    fetchCategoryProducts();
  };

  return {
    category: data?.category || null,
    products: data?.products || [],
    pagination: data?.pagination || {
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0
    },
    isLoading,
    error,
    refetch
  };
};