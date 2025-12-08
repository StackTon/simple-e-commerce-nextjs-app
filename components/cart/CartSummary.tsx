'use client'

import type { Cart } from '@/types'
import { formatPrice } from '@/lib/utils/cart'

interface CartSummaryProps {
  cart: Cart
}

export function CartSummary({ cart }: CartSummaryProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal ({cart.totalItems} items)</span>
          <span className="font-medium">{formatPrice(cart.subtotal)}</span>
        </div>

        {cart.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-{formatPrice(cart.discount)}</span>
          </div>
        )}

        <div className="mt-3 border-t border-gray-300 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(cart.total)}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled
        className="mt-6 w-full cursor-not-allowed rounded-lg bg-gray-400 px-6 py-3 font-semibold text-white"
        aria-label="Checkout not available yet"
        title="Checkout feature coming soon"
      >
        Proceed to Checkout (Coming Soon)
      </button>

      <p className="mt-3 text-center text-xs text-gray-500">
        Checkout feature is under development
      </p>
    </div>
  )
}
