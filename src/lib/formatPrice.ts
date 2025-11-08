/**
 * Format price with thousands separator (comma after every 3 digits)
 * @param price - Price as number or string
 * @param currency - Currency symbol (default: "د.ع")
 * @returns Formatted price string with commas
 */
export const formatPrice = (price: number | string, currency = "د.ع"): string => {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price

  if (isNaN(numPrice)) {
    return `0 ${currency}`
  }

  // Format with commas as thousands separator
  const formatted = numPrice.toLocaleString("en-US")

  return `${formatted} ${currency}`
}

/**
 * Format price without currency
 */
export const formatPriceNumber = (price: number | string): string => {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price

  if (isNaN(numPrice)) {
    return "0"
  }

  return numPrice.toLocaleString("en-US")
}
