'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CartItem as CartItemType } from '@/types'
import { formatPrice, calculateDiscountedPrice } from '@/lib/utils/cart'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: number, quantity: number) => void
  onRemove: (productId: number) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item
  const itemTotal = product.price * quantity
  const finalPrice = calculateDiscountedPrice(
    itemTotal,
    product.discountPercentage,
  )

  return (
    <div className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4">
      <Link
        href={`/products/${product.id.toString()}`}
        className="relative h-24 w-24 flex-shrink-0"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="rounded-md object-cover"
          sizes="96px"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${product.id.toString()}`}
          className="line-clamp-2 font-semibold text-gray-900 hover:text-blue-600"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(finalPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(itemTotal)}
              </span>
              <span className="text-sm font-medium text-green-600">
                {product.discountPercentage.toFixed(0)}% off
              </span>
            </>
          )}
        </div>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              onClick={() => {
                onUpdateQuantity(product.id, quantity - 1)
              }}
              className="px-3 py-1 transition-colors hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="border-x border-gray-300 px-4 py-1 font-medium">
              {quantity}
            </span>
            <button
              onClick={() => {
                onUpdateQuantity(product.id, quantity + 1)
              }}
              className="px-3 py-1 transition-colors hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              onRemove(product.id)
            }}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}
