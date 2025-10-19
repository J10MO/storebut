// utils/favoritesStorage.ts
class FavoritesStorage {
  private readonly STORAGE_KEY = 'local_favorites';
  private readonly LAST_SYNC_KEY = 'last_favorites_sync';
  private readonly SYNC_INTERVAL = 5 * 60 * 1000; // 5 دقائق

  // الحصول على المفضلات المحلية
  getLocalFavorites(): number[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading local favorites:', error);
      return [];
    }
  }

  // حفظ المفضلات محلياً
  saveLocalFavorites(productIds: number[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productIds));
    } catch (error) {
      console.error('Error saving local favorites:', error);
    }
  }

  // إضافة منتج للمفضلة محلياً
  addToLocalFavorites(productId: number): number[] {
    const currentFavorites = this.getLocalFavorites();
    
    if (!currentFavorites.includes(productId)) {
      const newFavorites = [...currentFavorites, productId];
      this.saveLocalFavorites(newFavorites);
      return newFavorites;
    }
    
    return currentFavorites;
  }

  // إزالة منتج من المفضلة محلياً
  removeFromLocalFavorites(productId: number): number[] {
    const currentFavorites = this.getLocalFavorites();
    const newFavorites = currentFavorites.filter(id => id !== productId);
    
    this.saveLocalFavorites(newFavorites);
    return newFavorites;
  }

  // التحقق مما إذا كان المنتج في المفضلة محلياً
  isInLocalFavorites(productId: number): boolean {
    const currentFavorites = this.getLocalFavorites();
    return currentFavorites.includes(productId);
  }

  // الحصول على عدد المفضلات المحلي
  getLocalFavoritesCount(): number {
    return this.getLocalFavorites().length;
  }

  // التحقق إذا كان وقت المزامنة قد حان
  shouldSyncWithServer(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const lastSync = localStorage.getItem(this.LAST_SYNC_KEY);
      if (!lastSync) return true;
      
      const lastSyncTime = parseInt(lastSync);
      return Date.now() - lastSyncTime > this.SYNC_INTERVAL;
    } catch (error) {
      return true;
    }
  }

  // تحديث وقت آخر مزامنة
  updateLastSyncTime(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.LAST_SYNC_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error updating sync time:', error);
    }
  }

  // مسح التخزين المحلي
  clearLocalStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.LAST_SYNC_KEY);
    } catch (error) {
      console.error('Error clearing local storage:', error);
    }
  }
}

export const favoritesStorage = new FavoritesStorage();