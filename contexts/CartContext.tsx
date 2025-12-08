'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import type { ReactNode } from 'react'
import type { Product, Cart, CartItem, CartContextType } from '@/types'
import {
  calculateSubtotal,
  calculateDiscount,
  calculateTotal,
  calculateTotalItems,
} from '@/lib/utils/cart'
import { getFromStorage, saveToStorage } from '@/lib/utils/storage'
import { STORAGE_KEYS } from '@/lib/constants'
import { useToast } from '@/contexts/ToastContext'

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialCart: Cart = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discount: 0,
  total: 0,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(initialCart)
  const [isHydrated, setIsHydrated] = useState(false)
  const toast = useToast()

  useEffect(() => {
    queueMicrotask(() => {
      const stored = getFromStorage(STORAGE_KEYS.CART)
      if (stored && Array.isArray(stored)) {
        const storedItems = stored as CartItem[]
        const subtotal = calculateSubtotal(storedItems)
        const discount = calculateDiscount(storedItems)
        const total = calculateTotal(storedItems)
        const totalItems = calculateTotalItems(storedItems)

        setCart({
          items: storedItems,
          totalItems,
          subtotal,
          discount,
          total,
        })
      }
      setIsHydrated(true)
    })
  }, [])

  useEffect(() => {
    if (isHydrated) {
      const success = saveToStorage(STORAGE_KEYS.CART, cart.items)
      if (!success) {
        toast.error('Failed to save cart. Your changes may not persist.')
      }
    }
  }, [cart.items, isHydrated, toast])

  const recalculateCart = useCallback((items: CartItem[]): Cart => {
    const subtotal = calculateSubtotal(items)
    const discount = calculateDiscount(items)
    const total = calculateTotal(items)
    const totalItems = calculateTotalItems(items)

    return {
      items,
      totalItems,
      subtotal,
      discount,
      total,
    }
  }, [])

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      if (quantity < product.minimumOrderQuantity) {
        toast.warning(
          `Minimum order quantity for ${product.title} is ${product.minimumOrderQuantity.toString()}`,
        )
        return
      }

      const resultRef = { success: false, error: '' }

      setCart((prevCart) => {
        const existingItemIndex = prevCart.items.findIndex(
          (item) => item.product.id === product.id,
        )

        let newItems: CartItem[]
        let newQuantity: number

        if (existingItemIndex > -1) {
          const existingItem = prevCart.items[existingItemIndex]
          newQuantity = existingItem.quantity + quantity

          if (newQuantity > product.stock) {
            resultRef.error = `Cannot add more. Only ${product.stock.toString()} in stock (${existingItem.quantity.toString()} already in cart)`
            return prevCart
          }

          newItems = prevCart.items.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: newQuantity }
              : item,
          )
        } else {
          if (quantity > product.stock) {
            resultRef.error = `Cannot add ${quantity.toString()}. Only ${product.stock.toString()} in stock`
            return prevCart
          }

          newItems = [...prevCart.items, { product, quantity }]
        }

        resultRef.success = true
        return recalculateCart(newItems)
      })

      queueMicrotask(() => {
        if (resultRef.error) {
          toast.error(resultRef.error)
        } else if (resultRef.success) {
          toast.success(`Added ${product.title} to cart`)
        }
      })
    },
    [recalculateCart, toast],
  )

  const removeFromCart = useCallback(
    (productId: number) => {
      const resultRef = { title: '' }

      setCart((prevCart) => {
        const item = prevCart.items.find(
          (item) => item.product.id === productId,
        )
        const newItems = prevCart.items.filter(
          (item) => item.product.id !== productId,
        )

        if (item) {
          resultRef.title = item.product.title
        }

        return recalculateCart(newItems)
      })

      queueMicrotask(() => {
        if (resultRef.title) {
          toast.info(`Removed ${resultRef.title} from cart`)
        }
      })
    },
    [recalculateCart, toast],
  )

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }

      const resultRef = { warning: '', error: '' }

      setCart((prevCart) => {
        const item = prevCart.items.find(
          (item) => item.product.id === productId,
        )

        if (!item) {
          return prevCart
        }

        if (quantity < item.product.minimumOrderQuantity) {
          resultRef.warning = `Minimum order quantity for ${item.product.title} is ${item.product.minimumOrderQuantity.toString()}`
          return prevCart
        }

        if (quantity > item.product.stock) {
          resultRef.error = `Cannot set quantity to ${quantity.toString()}. Only ${item.product.stock.toString()} in stock`
          return prevCart
        }

        const newItems = prevCart.items.map((cartItem) =>
          cartItem.product.id === productId
            ? { ...cartItem, quantity }
            : cartItem,
        )
        return recalculateCart(newItems)
      })

      queueMicrotask(() => {
        if (resultRef.warning) {
          toast.warning(resultRef.warning)
        } else if (resultRef.error) {
          toast.error(resultRef.error)
        }
      })
    },
    [recalculateCart, removeFromCart, toast],
  )

  const clearCart = useCallback(() => {
    setCart(initialCart)
    queueMicrotask(() => {
      toast.info('Cart cleared')
    })
  }, [toast])

  const isInCart = useCallback(
    (productId: number) => {
      return cart.items.some((item) => item.product.id === productId)
    },
    [cart.items],
  )

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = cart.items.find((item) => item.product.id === productId)
      return item?.quantity ?? 0
    },
    [cart.items],
  )

  const value: CartContextType = {
    cart,
    isInitialized: isHydrated,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
