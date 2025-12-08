import type { CartItem } from '@/types/cart'

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number,
): number {
  return price - (price * discountPercentage) / 100
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)
}

export function calculateDiscount(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const discountAmount =
      (item.product.price * item.product.discountPercentage) / 100
    return sum + discountAmount * item.quantity
  }, 0)
}

export function calculateTotal(items: CartItem[]): number {
  const subtotal = calculateSubtotal(items)
  const discount = calculateDiscount(items)
  return subtotal - discount
}

export function calculateTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
