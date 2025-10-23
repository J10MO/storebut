// Global API cache manager to prevent duplicate requests and rate limiting
interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface PendingRequest<T> {
  promise: Promise<T>
  abortController: AbortController
}

class ApiCacheManager {
  private cache = new Map<string, CacheEntry<any>>()
  private pendingRequests = new Map<string, PendingRequest<any>>()
  private requestCounts = new Map<string, { count: number; resetTime: number }>()

  // Rate limiting: max 10 requests per endpoint per second
  private readonly MAX_REQUESTS_PER_SECOND = 10
  private readonly RATE_LIMIT_WINDOW = 1000 // 1 second

  getCacheKey(endpoint: string, params?: any): string {
    return `${endpoint}:${JSON.stringify(params || {})}`
  }

  isRateLimited(endpoint: string): boolean {
    const now = Date.now()
    const rateInfo = this.requestCounts.get(endpoint)

    if (!rateInfo || now > rateInfo.resetTime) {
      this.requestCounts.set(endpoint, {
        count: 1,
        resetTime: now + this.RATE_LIMIT_WINDOW,
      })
      return false
    }

    if (rateInfo.count >= this.MAX_REQUESTS_PER_SECOND) {
      console.warn(`[v0] Rate limit reached for ${endpoint}. Waiting...`)
      return true
    }

    rateInfo.count++
    return false
  }

  getCached<T>(key: string, maxAge: number): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const age = Date.now() - entry.timestamp
    if (age > maxAge) {
      this.cache.delete(key)
      return null
    }

    console.log(`[v0] Cache hit for ${key}`)
    return entry.data
  }

  setCached<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  getPending<T>(key: string): Promise<T> | null {
    return this.pendingRequests.get(key)?.promise || null
  }

  setPending<T>(key: string, promise: Promise<T>, abortController: AbortController): void {
    this.pendingRequests.set(key, { promise, abortController })

    // Clean up after request completes
    promise.finally(() => {
      this.pendingRequests.delete(key)
    })
  }

  abortPending(key: string): void {
    const pending = this.pendingRequests.get(key)
    if (pending) {
      pending.abortController.abort()
      this.pendingRequests.delete(key)
    }
  }

  clearCache(): void {
    this.cache.clear()
    console.log("[v0] API cache cleared")
  }

  clearEndpointCache(endpoint: string): void {
    const keysToDelete: string[] = []
    this.cache.forEach((_, key) => {
      if (key.startsWith(endpoint)) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach((key) => this.cache.delete(key))
    console.log(`[v0] Cleared cache for ${endpoint}`)
  }
}

// Export singleton instance
export const apiCache = new ApiCacheManager()
