'use client'

import { useCart } from '@/contexts/CartContext'
import type { Product } from '@/types'

interface AddToCartButtonProps {
  product: Product
  quantity: number
  className?: string
}

export function AddToCartButton({
  product,
  quantity,
  className = '',
}: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart()
  const outOfStock = product.stock === 0

  const handleAddToCart = () => {
    if (!outOfStock) {
      addToCart(product, quantity)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={outOfStock}
      className={`w-full rounded-lg px-4 py-2 font-semibold transition-colors ${
        outOfStock
          ? 'cursor-not-allowed bg-gray-300 text-gray-500'
          : isInCart(product.id)
            ? 'bg-green-600 text-white hover:bg-green-700'
            : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${className}`}
    >
      {outOfStock
        ? 'Out of Stock'
        : isInCart(product.id)
          ? 'Added to Cart'
          : 'Add to Cart'}
    </button>
  )
}
