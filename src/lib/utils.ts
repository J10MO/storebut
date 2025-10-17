// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number): string {
  return `$${parseFloat(price.toString()).toFixed(2)}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function calculateDiscount(originalPrice: string, salePrice: string): number {
  const original = parseFloat(originalPrice);
  const sale = parseFloat(salePrice);
  return Math.round(((original - sale) / original) * 100);
}
