import type { Product } from './product'

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface ApiError {
  message: string
  status?: number
}
