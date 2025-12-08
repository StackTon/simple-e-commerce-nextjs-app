import { API_BASE_URL, CACHE_TIMES, PAGINATION } from '@/lib/constants'
import type { Product, ProductsResponse } from '@/types'
import {
  validateProduct,
  validateProductsResponse,
  validateCategories,
} from '@/lib/utils/validation'

export async function fetchProducts(params?: {
  limit?: number
  skip?: number
  search?: string
  category?: string
}): Promise<ProductsResponse> {
  const limit = params?.limit ?? PAGINATION.DEFAULT_LIMIT
  const skip = params?.skip ?? PAGINATION.DEFAULT_SKIP
  const search = params?.search
  const category = params?.category

  let url = `${API_BASE_URL}/products`

  if (search) {
    url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit.toString()}&skip=${skip.toString()}`
  } else if (category) {
    url = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${limit.toString()}&skip=${skip.toString()}`
  } else {
    url = `${API_BASE_URL}/products?limit=${limit.toString()}&skip=${skip.toString()}`
  }

  const response = await fetch(url, {
    next: { revalidate: CACHE_TIMES.PRODUCTS },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  const data: unknown = await response.json()
  return validateProductsResponse(data)
}

export async function fetchProduct(id: number): Promise<Product> {
  const url = `${API_BASE_URL}/products/${id.toString()}`

  const response = await fetch(url, {
    next: { revalidate: CACHE_TIMES.PRODUCT_DETAILS },
  })

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found')
    }
    throw new Error(`Failed to fetch product: ${response.statusText}`)
  }

  const data: unknown = await response.json()
  return validateProduct(data)
}

export async function fetchCategories(): Promise<string[]> {
  const url = `${API_BASE_URL}/products/categories`

  const response = await fetch(url, {
    next: { revalidate: CACHE_TIMES.CATEGORIES },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`)
  }

  const data: unknown = await response.json()
  return validateCategories(data)
}
