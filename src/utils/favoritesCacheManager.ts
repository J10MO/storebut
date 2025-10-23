class FavoritesCacheManager {
  private cache: Set<number> | null = null;
  private fetchPromise: Promise<any> | null = null;
  private lastFetchTime: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق

  setCache(ids: Set<number>): void {
    this.cache = new Set(ids);
    this.lastFetchTime = Date.now();
    console.log('💾 [Cache] Updated:', ids.size, 'items');
  }

  getCache(): Set<number> | null {
    if (!this.cache) return null;

    const isExpired = Date.now() - this.lastFetchTime > this.CACHE_DURATION;
    if (isExpired) {
      console.log('⏰ [Cache] Expired');
      this.clearCache();
      return null;
    }

    return this.cache;
  }

  hasValidCache(): boolean {
    return this.getCache() !== null;
  }

  addToCache(id: number): void {
    if (!this.cache) this.cache = new Set();
    this.cache.add(id);
  }

  removeFromCache(id: number): void {
    this.cache?.delete(id);
  }

  clearCache(): void {
    this.cache = null;
    this.lastFetchTime = 0;
  }

  setFetchPromise(promise: Promise<any>): void {
    this.fetchPromise = promise;
  }

  getFetchPromise(): Promise<any> | null {
    return this.fetchPromise;
  }

  clearFetchPromise(): void {
    this.fetchPromise = null;
  }

  isFetching(): boolean {
    return this.fetchPromise !== null;
  }

  getCacheSize(): number {
    return this.cache?.size || 0;
  }

  getStats() {
    return {
      size: this.getCacheSize(),
      lastFetch: this.lastFetchTime ? new Date(this.lastFetchTime).toISOString() : null,
      age: this.lastFetchTime ? Date.now() - this.lastFetchTime : null,
      isFetching: this.isFetching(),
      isValid: this.hasValidCache()
    };
  }
}

export const favoritesCacheManager = new FavoritesCacheManager();
