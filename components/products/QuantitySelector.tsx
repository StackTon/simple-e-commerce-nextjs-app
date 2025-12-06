'use client'

import type { Product } from '@/types'

interface QuantitySelectorProps {
  product: Product
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export function QuantitySelector({
  product,
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > product.minimumOrderQuantity) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      onQuantityChange(quantity + 1)
    }
  }

  const isDecrementDisabled = quantity <= product.minimumOrderQuantity
  const isIncrementDisabled = quantity >= product.stock

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center rounded-lg border border-gray-300">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
          className="px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="min-w-[3rem] border-x border-gray-300 px-4 py-2 text-center font-medium text-gray-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={isIncrementDisabled}
          className="px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <div className="text-sm text-gray-500">
        {product.stock > 0 ? (
          <span>{product.stock} available</span>
        ) : (
          <span className="text-red-600">Out of stock</span>
        )}
      </div>
    </div>
  )
}
