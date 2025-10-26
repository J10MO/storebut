// // // utils/favoritesStorage.ts
// // class FavoritesStorage {
// //   private readonly STORAGE_KEY = 'local_favorites';
// //   private readonly LAST_SYNC_KEY = 'last_favorites_sync';
// //   private readonly SYNC_INTERVAL = 5 * 60 * 1000; // 5 دقائق

// //   // الحصول على المفضلات المحلية
// //   getLocalFavorites(): number[] {
// //     if (typeof window === 'undefined') return [];
    
// //     try {
// //       const stored = localStorage.getItem(this.STORAGE_KEY);
// //       return stored ? JSON.parse(stored) : [];
// //     } catch (error) {
// //       console.error('Error reading local favorites:', error);
// //       return [];
// //     }
// //   }

// //   // حفظ المفضلات محلياً
// //   saveLocalFavorites(productIds: number[]): void {
// //     if (typeof window === 'undefined') return;
    
// //     try {
// //       localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productIds));
// //     } catch (error) {
// //       console.error('Error saving local favorites:', error);
// //     }
// //   }

// //   // إضافة منتج للمفضلة محلياً
// //   addToLocalFavorites(productId: number): number[] {
// //     const currentFavorites = this.getLocalFavorites();
    
// //     if (!currentFavorites.includes(productId)) {
// //       const newFavorites = [...currentFavorites, productId];
// //       this.saveLocalFavorites(newFavorites);
// //       return newFavorites;
// //     }
    
// //     return currentFavorites;
// //   }

// //   // إزالة منتج من المفضلة محلياً
// //   removeFromLocalFavorites(productId: number): number[] {
// //     const currentFavorites = this.getLocalFavorites();
// //     const newFavorites = currentFavorites.filter(id => id !== productId);
    
// //     this.saveLocalFavorites(newFavorites);
// //     return newFavorites;
// //   }

// //   // التحقق مما إذا كان المنتج في المفضلة محلياً
// //   isInLocalFavorites(productId: number): boolean {
// //     const currentFavorites = this.getLocalFavorites();
// //     return currentFavorites.includes(productId);
// //   }

// //   // الحصول على عدد المفضلات المحلي
// //   getLocalFavoritesCount(): number {
// //     return this.getLocalFavorites().length;
// //   }

// //   // التحقق إذا كان وقت المزامنة قد حان
// //   shouldSyncWithServer(): boolean {
// //     if (typeof window === 'undefined') return false;
    
// //     try {
// //       const lastSync = localStorage.getItem(this.LAST_SYNC_KEY);
// //       if (!lastSync) return true;
      
// //       const lastSyncTime = parseInt(lastSync);
// //       return Date.now() - lastSyncTime > this.SYNC_INTERVAL;
// //     } catch (error) {
// //       return true;
// //     }
// //   }

// //   // تحديث وقت آخر مزامنة
// //   updateLastSyncTime(): void {
// //     if (typeof window === 'undefined') return;
    
// //     try {
// //       localStorage.setItem(this.LAST_SYNC_KEY, Date.now().toString());
// //     } catch (error) {
// //       console.error('Error updating sync time:', error);
// //     }
// //   }

// //   // مسح التخزين المحلي
// //   clearLocalStorage(): void {
// //     if (typeof window === 'undefined') return;
    
// //     try {
// //       localStorage.removeItem(this.STORAGE_KEY);
// //       localStorage.removeItem(this.LAST_SYNC_KEY);
// //     } catch (error) {
// //       console.error('Error clearing local storage:', error);
// //     }
// //   }
// // }

// // export const favoritesStorage = new FavoritesStorage();



// // utils/favoritesCacheManager.ts

// /**
//  * مدير Cache للمفضلات لمنع الطلبات المتكررة
//  */



// // utils/favoritesStorage.ts

// /**
//  * مدير التخزين المحلي للمفضلات
//  * يستخدم localStorage للحفاظ على بيانات المفضلات
//  */

// const FAVORITES_KEY = 'favorites_ids';
// const FAVORITES_COUNT_KEY = 'favorites_count';

// class FavoritesStorageManager {
//   /**
//    * حفظ قائمة المفضلات المحلية
//    */
//   saveLocalFavorites(productIds: number[]): void {
//     try {
//       localStorage.setItem(FAVORITES_KEY, JSON.stringify(productIds));
//       localStorage.setItem(FAVORITES_COUNT_KEY, productIds.length.toString());
//       console.log('💾 [Storage] Saved favorites:', productIds.length);
//     } catch (error) {
//       console.error('❌ [Storage] Failed to save favorites:', error);
//     }
//   }

//   /**
//    * جلب قائمة المفضلات المحلية
//    */
//   getLocalFavorites(): number[] {
//     try {
//       const stored = localStorage.getItem(FAVORITES_KEY);
//       if (!stored) return [];

//       const parsed = JSON.parse(stored);
      
//       // التحقق من صحة البيانات
//       if (!Array.isArray(parsed)) {
//         console.warn('⚠️ [Storage] Invalid favorites data, resetting');
//         this.clearLocalFavorites();
//         return [];
//       }

//       // تصفية القيم غير الصحيحة
//       const validIds = parsed.filter(id => typeof id === 'number' && id > 0);
      
//       if (validIds.length !== parsed.length) {
//         console.warn('⚠️ [Storage] Cleaned invalid IDs');
//         this.saveLocalFavorites(validIds);
//       }

//       return validIds;
//     } catch (error) {
//       console.error('❌ [Storage] Failed to load favorites:', error);
//       return [];
//     }
//   }

//   /**
//    * إضافة منتج إلى المفضلة المحلية
//    */
//   addToLocalFavorites(productId: number): void {
//     try {
//       const current = this.getLocalFavorites();
      
//       // تجنب التكرار
//       if (current.includes(productId)) {
//         console.log('ℹ️ [Storage] Product already in favorites:', productId);
//         return;
//       }

//       const updated = [...current, productId];
//       this.saveLocalFavorites(updated);
//       console.log('➕ [Storage] Added to favorites:', productId);
//     } catch (error) {
//       console.error('❌ [Storage] Failed to add favorite:', error);
//     }
//   }

//   /**
//    * إزالة منتج من المفضلة المحلية
//    */
//   removeFromLocalFavorites(productId: number): void {
//     try {
//       const current = this.getLocalFavorites();
//       const updated = current.filter(id => id !== productId);
      
//       if (updated.length === current.length) {
//         console.log('ℹ️ [Storage] Product not in favorites:', productId);
//         return;
//       }

//       this.saveLocalFavorites(updated);
//       console.log('➖ [Storage] Removed from favorites:', productId);
//     } catch (error) {
//       console.error('❌ [Storage] Failed to remove favorite:', error);
//     }
//   }

//   /**
//    * التحقق من وجود منتج في المفضلة المحلية
//    */
//   isInLocalFavorites(productId: number): boolean {
//     const favorites = this.getLocalFavorites();
//     return favorites.includes(productId);
//   }

//   /**
//    * الحصول على عدد المفضلات المحلية
//    */
//   getLocalFavoritesCount(): number {
//     try {
//       const countStr = localStorage.getItem(FAVORITES_COUNT_KEY);
//       if (countStr) {
//         const count = parseInt(countStr, 10);
//         return isNaN(count) ? 0 : count;
//       }

//       // إذا لم يوجد عداد، احسبه من القائمة
//       const favorites = this.getLocalFavorites();
//       return favorites.length;
//     } catch (error) {
//       console.error('❌ [Storage] Failed to get count:', error);
//       return 0;
//     }
//   }

//   /**
//    * مسح جميع المفضلات المحلية
//    */
//   clearLocalFavorites(): void {
//     try {
//       localStorage.removeItem(FAVORITES_KEY);
//       localStorage.removeItem(FAVORITES_COUNT_KEY);
//       console.log('🗑️ [Storage] Cleared all favorites');
//     } catch (error) {
//       console.error('❌ [Storage] Failed to clear favorites:', error);
//     }
//   }

//   /**
//    * مزامنة المفضلات مع السيرفر
//    */
//   syncWithServer(serverIds: number[]): void {
//     try {
//       const localIds = this.getLocalFavorites();
      
//       // دمج البيانات المحلية والسيرفر
//       const merged = Array.from(new Set([...localIds, ...serverIds]));
      
//       this.saveLocalFavorites(merged);
//       console.log('🔄 [Storage] Synced with server:', {
//         local: localIds.length,
//         server: serverIds.length,
//         merged: merged.length
//       });
//     } catch (error) {
//       console.error('❌ [Storage] Failed to sync:', error);
//     }
//   }

//   /**
//    * الحصول على معلومات التخزين
//    */
//   getStorageInfo() {
//     return {
//       count: this.getLocalFavoritesCount(),
//       ids: this.getLocalFavorites(),
//       hasData: this.getLocalFavorites().length > 0
//     };
//   }

//   /**
//    * تصدير البيانات كـ JSON
//    */
//   exportData(): string {
//     const data = {
//       favorites: this.getLocalFavorites(),
//       count: this.getLocalFavoritesCount(),
//       timestamp: new Date().toISOString()
//     };
//     return JSON.stringify(data, null, 2);
//   }

//   /**
//    * استيراد البيانات من JSON
//    */
//   importData(jsonString: string): boolean {
//     try {
//       const data = JSON.parse(jsonString);
      
//       if (!data.favorites || !Array.isArray(data.favorites)) {
//         throw new Error('Invalid data format');
//       }

//       this.saveLocalFavorites(data.favorites);
//       console.log('✅ [Storage] Imported favorites:', data.favorites.length);
//       return true;
//     } catch (error) {
//       console.error('❌ [Storage] Failed to import:', error);
//       return false;
//     }
//   }
// }

// // تصدير instance واحد (Singleton)
// export const favoritesStorage = new FavoritesStorageManager();

// // تصدير default أيضاً للتوافق
// export default favoritesStorage;




// // utils/favoritesStorage.ts
// class FavoritesStorage {
//   private readonly STORAGE_KEY = 'local_favorites';
//   private readonly LAST_SYNC_KEY = 'last_favorites_sync';
//   private readonly SYNC_INTERVAL = 5 * 60 * 1000; // 5 دقائق

//   // الحصول على المفضلات المحلية
//   getLocalFavorites(): number[] {
//     if (typeof window === 'undefined') return [];
    
//     try {
//       const stored = localStorage.getItem(this.STORAGE_KEY);
//       return stored ? JSON.parse(stored) : [];
//     } catch (error) {
//       console.error('Error reading local favorites:', error);
//       return [];
//     }
//   }

//   // حفظ المفضلات محلياً
//   saveLocalFavorites(productIds: number[]): void {
//     if (typeof window === 'undefined') return;
    
//     try {
//       localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productIds));
//     } catch (error) {
//       console.error('Error saving local favorites:', error);
//     }
//   }

//   // إضافة منتج للمفضلة محلياً
//   addToLocalFavorites(productId: number): number[] {
//     const currentFavorites = this.getLocalFavorites();
    
//     if (!currentFavorites.includes(productId)) {
//       const newFavorites = [...currentFavorites, productId];
//       this.saveLocalFavorites(newFavorites);
//       return newFavorites;
//     }
    
//     return currentFavorites;
//   }

//   // إزالة منتج من المفضلة محلياً
//   removeFromLocalFavorites(productId: number): number[] {
//     const currentFavorites = this.getLocalFavorites();
//     const newFavorites = currentFavorites.filter(id => id !== productId);
    
//     this.saveLocalFavorites(newFavorites);
//     return newFavorites;
//   }

//   // التحقق مما إذا كان المنتج في المفضلة محلياً
//   isInLocalFavorites(productId: number): boolean {
//     const currentFavorites = this.getLocalFavorites();
//     return currentFavorites.includes(productId);
//   }

//   // الحصول على عدد المفضلات المحلي
//   getLocalFavoritesCount(): number {
//     return this.getLocalFavorites().length;
//   }

//   // التحقق إذا كان وقت المزامنة قد حان
//   shouldSyncWithServer(): boolean {
//     if (typeof window === 'undefined') return false;
    
//     try {
//       const lastSync = localStorage.getItem(this.LAST_SYNC_KEY);
//       if (!lastSync) return true;
      
//       const lastSyncTime = parseInt(lastSync);
//       return Date.now() - lastSyncTime > this.SYNC_INTERVAL;
//     } catch (error) {
//       return true;
//     }
//   }

//   // تحديث وقت آخر مزامنة
//   updateLastSyncTime(): void {
//     if (typeof window === 'undefined') return;
    
//     try {
//       localStorage.setItem(this.LAST_SYNC_KEY, Date.now().toString());
//     } catch (error) {
//       console.error('Error updating sync time:', error);
//     }
//   }

//   // مسح التخزين المحلي
//   clearLocalStorage(): void {
//     if (typeof window === 'undefined') return;
    
//     try {
//       localStorage.removeItem(this.STORAGE_KEY);
//       localStorage.removeItem(this.LAST_SYNC_KEY);
//     } catch (error) {
//       console.error('Error clearing local storage:', error);
//     }
//   }
// }

// export const favoritesStorage = new FavoritesStorage();



// utils/favoritesCacheManager.ts

/**
 * مدير Cache للمفضلات لمنع الطلبات المتكررة
 */



// utils/favoritesStorage.ts

/**
 * مدير التخزين المحلي للمفضلات
 * يستخدم localStorage للحفاظ على بيانات المفضلات
 */

const FAVORITES_KEY = 'favorites_ids';
const FAVORITES_COUNT_KEY = 'favorites_count';

class FavoritesStorageManager {
  /**
   * حفظ قائمة المفضلات المحلية
   */
  saveLocalFavorites(productIds: number[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(productIds));
      localStorage.setItem(FAVORITES_COUNT_KEY, productIds.length.toString());
      console.log('💾 [Storage] Saved favorites:', productIds.length);
    } catch (error) {
      console.error('❌ [Storage] Failed to save favorites:', error);
    }
  }

  /**
   * جلب قائمة المفضلات المحلية
   */
  getLocalFavorites(): number[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      
      // التحقق من صحة البيانات
      if (!Array.isArray(parsed)) {
        console.warn('⚠️ [Storage] Invalid favorites data, resetting');
        this.clearLocalFavorites();
        return [];
      }

      // ت��فية القيم غير الصحيحة
      const validIds = parsed.filter(id => typeof id === 'number' && id > 0);
      
      if (validIds.length !== parsed.length) {
        console.warn('⚠️ [Storage] Cleaned invalid IDs');
        this.saveLocalFavorites(validIds);
      }

      return validIds;
    } catch (error) {
      console.error('❌ [Storage] Failed to load favorites:', error);
      return [];
    }
  }

  /**
   * إضافة منتج إلى المفضلة المحلية
   */
  addToLocalFavorites(productId: number): void {
    try {
      const current = this.getLocalFavorites();
      
      // تجنب التكرار
      if (current.includes(productId)) {
        console.log('ℹ️ [Storage] Product already in favorites:', productId);
        return;
      }

      const updated = [...current, productId];
      this.saveLocalFavorites(updated);
      console.log('➕ [Storage] Added to favorites:', productId);
    } catch (error) {
      console.error('❌ [Storage] Failed to add favorite:', error);
    }
  }

  /**
   * إزالة منتج من المفضلة المحلية
   */
  removeFromLocalFavorites(productId: number): void {
    try {
      const current = this.getLocalFavorites();
      const updated = current.filter(id => id !== productId);
      
      if (updated.length === current.length) {
        console.log('ℹ️ [Storage] Product not in favorites:', productId);
        return;
      }

      this.saveLocalFavorites(updated);
      console.log('➖ [Storage] Removed from favorites:', productId);
    } catch (error) {
      console.error('❌ [Storage] Failed to remove favorite:', error);
    }
  }

  /**
   * التحقق من وجود منتج في المفضلة المحلية
   */
  isInLocalFavorites(productId: number): boolean {
    const favorites = this.getLocalFavorites();
    return favorites.includes(productId);
  }

  /**
   * الحصول على عدد المفضلات المحلية
   */
  getLocalFavoritesCount(): number {
    try {
      const countStr = localStorage.getItem(FAVORITES_COUNT_KEY);
      if (countStr) {
        const count = parseInt(countStr, 10);
        return isNaN(count) ? 0 : count;
      }

      // إذا لم يوجد عداد، احسبه من القائمة
      const favorites = this.getLocalFavorites();
      return favorites.length;
    } catch (error) {
      console.error('❌ [Storage] Failed to get count:', error);
      return 0;
    }
  }

  /**
   * مسح جميع المفضلات المحلية
   */
  clearLocalFavorites(): void {
    try {
      localStorage.removeItem(FAVORITES_KEY);
      localStorage.removeItem(FAVORITES_COUNT_KEY);
      console.log('🗑️ [Storage] Cleared all favorites');
    } catch (error) {
      console.error('❌ [Storage] Failed to clear favorites:', error);
    }
  }

  /**
   * مزامنة المفضلات مع السيرفر
   */
  syncWithServer(serverIds: number[]): void {
    try {
      const localIds = this.getLocalFavorites();
      
      // دمج البيانات المحلية والسيرفر
      const merged = Array.from(new Set([...localIds, ...serverIds]));
      
      this.saveLocalFavorites(merged);
      console.log('🔄 [Storage] Synced with server:', {
        local: localIds.length,
        server: serverIds.length,
        merged: merged.length
      });
    } catch (error) {
      console.error('❌ [Storage] Failed to sync:', error);
    }
  }

  /**
   * الحصول على معلومات التخزين
   */
  getStorageInfo() {
    return {
      count: this.getLocalFavoritesCount(),
      ids: this.getLocalFavorites(),
      hasData: this.getLocalFavorites().length > 0
    };
  }

  /**
   * تصدير البيانات كـ JSON
   */
  exportData(): string {
    const data = {
      favorites: this.getLocalFavorites(),
      count: this.getLocalFavoritesCount(),
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  /**
   * استيراد البيانات من JSON
   */
  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      
      if (!data.favorites || !Array.isArray(data.favorites)) {
        throw new Error('Invalid data format');
      }

      this.saveLocalFavorites(data.favorites);
      console.log('✅ [Storage] Imported favorites:', data.favorites.length);
      return true;
    } catch (error) {
      console.error('❌ [Storage] Failed to import:', error);
      return false;
    }
  }
}

// تصدير instance واحد (Singleton)
export const favoritesStorage = new FavoritesStorageManager();

// تصدير default أيضاً للتوافق
export default favoritesStorage;
