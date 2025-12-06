'use client'

import { useState } from 'react'
import type { Product } from '@/types'
import { QuantitySelector } from './QuantitySelector'
import { AddToCartButton } from './AddToCartButton'

interface ProductDetailActionsProps {
  product: Product
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(product.minimumOrderQuantity)

  return (
    <div className="mb-8">
      {/* Quantity Selector */}
      <div className="mb-4">
        <label
          htmlFor="quantity"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Quantity
          {product.minimumOrderQuantity > 1 && (
            <span className="ml-2 text-gray-500">
              (Min: {product.minimumOrderQuantity})
            </span>
          )}
        </label>
        <QuantitySelector
          product={product}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </div>

      {/* Add to Cart Button */}
      <AddToCartButton
        product={product}
        quantity={quantity}
        className="py-3 text-lg"
      />
    </div>
  )
}
