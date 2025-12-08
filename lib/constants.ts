export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://dummyjson.com'

export const PAGINATION = {
  DEFAULT_LIMIT: 20,
  DEFAULT_SKIP: 0,
} as const

export const CACHE_TIMES = {
  PRODUCTS: 3600, // 1 hour
  PRODUCT_DETAILS: 3600, // 1 hour
  CATEGORIES: 86400, // 24 hours
} as const

export const STORAGE_KEYS = {
  CART: 'ecommerce_cart',
} as const
