import type { Product, ProductsResponse } from '@/types'

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function validateProduct(data: unknown): Product {
  if (!isObject(data)) {
    throw new ValidationError('Product must be an object')
  }

  // Required fields validation
  if (!isNumber(data.id) || data.id <= 0) {
    throw new ValidationError('Product.id must be a positive number')
  }

  if (!isString(data.title) || data.title.trim() === '') {
    throw new ValidationError('Product.title must be a non-empty string')
  }

  if (!isString(data.description)) {
    throw new ValidationError('Product.description must be a string')
  }

  if (!isString(data.category)) {
    throw new ValidationError('Product.category must be a string')
  }

  if (!isNumber(data.price) || data.price < 0) {
    throw new ValidationError('Product.price must be a non-negative number')
  }

  if (!isNumber(data.discountPercentage) || data.discountPercentage < 0) {
    throw new ValidationError(
      'Product.discountPercentage must be a non-negative number',
    )
  }

  if (!isNumber(data.rating) || data.rating < 0) {
    throw new ValidationError('Product.rating must be a non-negative number')
  }

  if (!isNumber(data.stock) || data.stock < 0) {
    throw new ValidationError('Product.stock must be a non-negative number')
  }

  if (!isArray(data.tags) || !data.tags.every(isString)) {
    throw new ValidationError('Product.tags must be an array of strings')
  }

  if (!isString(data.sku)) {
    throw new ValidationError('Product.sku must be a string')
  }

  if (!isNumber(data.weight) || data.weight < 0) {
    throw new ValidationError('Product.weight must be a non-negative number')
  }

  if (!isObject(data.dimensions)) {
    throw new ValidationError('Product.dimensions must be an object')
  }

  if (
    !isNumber(data.dimensions.width) ||
    !isNumber(data.dimensions.height) ||
    !isNumber(data.dimensions.depth)
  ) {
    throw new ValidationError(
      'Product.dimensions must have width, height, depth as numbers',
    )
  }

  if (!isString(data.warrantyInformation)) {
    throw new ValidationError('Product.warrantyInformation must be a string')
  }

  if (!isString(data.shippingInformation)) {
    throw new ValidationError('Product.shippingInformation must be a string')
  }

  if (!isString(data.availabilityStatus)) {
    throw new ValidationError('Product.availabilityStatus must be a string')
  }

  if (!isArray(data.reviews)) {
    throw new ValidationError('Product.reviews must be an array')
  }

  // Validate reviews array
  for (const review of data.reviews) {
    if (!isObject(review)) {
      throw new ValidationError('Product.reviews items must be objects')
    }
    if (!isNumber(review.rating)) {
      throw new ValidationError('Product review rating must be a number')
    }
    if (!isString(review.comment)) {
      throw new ValidationError('Product review comment must be a string')
    }
    if (!isString(review.date)) {
      throw new ValidationError('Product review date must be a string')
    }
    if (!isString(review.reviewerName)) {
      throw new ValidationError('Product review reviewerName must be a string')
    }
    if (!isString(review.reviewerEmail)) {
      throw new ValidationError('Product review reviewerEmail must be a string')
    }
  }

  if (!isString(data.returnPolicy)) {
    throw new ValidationError('Product.returnPolicy must be a string')
  }

  if (!isNumber(data.minimumOrderQuantity) || data.minimumOrderQuantity < 0) {
    throw new ValidationError(
      'Product.minimumOrderQuantity must be a non-negative number',
    )
  }

  if (!isObject(data.meta)) {
    throw new ValidationError('Product.meta must be an object')
  }

  if (
    !isString(data.meta.createdAt) ||
    !isString(data.meta.updatedAt) ||
    !isString(data.meta.barcode) ||
    !isString(data.meta.qrCode)
  ) {
    throw new ValidationError(
      'Product.meta must have createdAt, updatedAt, barcode, qrCode as strings',
    )
  }

  if (!isString(data.thumbnail)) {
    throw new ValidationError('Product.thumbnail must be a string')
  }

  if (!isArray(data.images) || !data.images.every(isString)) {
    throw new ValidationError('Product.images must be an array of strings')
  }

  // Optional brand field
  if (data.brand !== undefined && !isString(data.brand)) {
    throw new ValidationError('Product.brand must be a string if provided')
  }

  return data as unknown as Product
}

export function validateProductsResponse(data: unknown): ProductsResponse {
  if (!isObject(data)) {
    throw new ValidationError('ProductsResponse must be an object')
  }

  if (!isArray(data.products)) {
    throw new ValidationError('ProductsResponse.products must be an array')
  }

  // Validate each product
  const validatedProducts = data.products.map((product, index) => {
    try {
      return validateProduct(product)
    } catch (error) {
      throw new ValidationError(
        `Invalid product at index ${index.toString()}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    }
  })

  if (!isNumber(data.total) || data.total < 0) {
    throw new ValidationError(
      'ProductsResponse.total must be a non-negative number',
    )
  }

  if (!isNumber(data.skip) || data.skip < 0) {
    throw new ValidationError(
      'ProductsResponse.skip must be a non-negative number',
    )
  }

  if (!isNumber(data.limit) || data.limit < 0) {
    throw new ValidationError(
      'ProductsResponse.limit must be a non-negative number',
    )
  }

  return {
    products: validatedProducts,
    total: data.total,
    skip: data.skip,
    limit: data.limit,
  }
}

export function validateCategories(data: unknown): string[] {
  if (!isArray(data)) {
    throw new ValidationError('Categories must be an array')
  }

  // Handle both string[] and object[] responses
  if (data.length === 0) {
    return []
  }

  // Check if it's an array of objects with slug property
  if (isObject(data[0]) && 'slug' in data[0]) {
    const categories: string[] = []
    for (const item of data) {
      if (!isObject(item) || !isString(item.slug)) {
        throw new ValidationError(
          'Category object must have a slug string property',
        )
      }
      categories.push(item.slug)
    }
    return categories
  }

  // Check if it's an array of strings
  if (!data.every(isString)) {
    throw new ValidationError('Categories must be an array of strings')
  }

  return data
}

export function sanitizeSearchInput(input: string): string {
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent XSS
    .replace(/[{}]/g, '') // Remove curly braces
    .slice(0, 100) // Limit length to prevent abuse
}

export function sanitizeNumericInput(
  input: unknown,
  defaultValue: number,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
): number {
  const num = Number(input)
  if (Number.isNaN(num) || num < min || num > max) {
    return defaultValue
  }
  return Math.floor(num)
}
