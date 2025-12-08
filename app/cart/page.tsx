'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { Header } from '@/components/layout/Header'
import { CartItem } from '@/components/cart/CartItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Loading } from '@/components/ui/Loading'

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, isInitialized } =
    useCart()

  if (!isInitialized) {
    return (
      <>
        <Header />
        <Loading />
      </>
    )
  }

  if (!cart.items.length) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-4 h-24 w-24 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <h2 className="mb-2 text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="mb-6 text-gray-600">
              Start adding some products to your cart!
            </p>
            <Link
              href="/"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary cart={cart} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
