import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '../types'

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product, quantity?: number, size?: string) => void
  removeFromCart: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: number, size?: string) => boolean
}

export const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = useCallback((product: Product, quantity = 1, size = 'M') => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      )
      if (existing) {
        // আগে থেকে থাকলে quantity বাড়াও
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      // নতুন item যোগ করো
      return [...prev, { product, quantity, size }]
    })
  }, [])

  const removeFromCart = useCallback((productId: number, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    )
  }, [])

  const updateQuantity = useCallback((productId: number, size: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const isInCart = useCallback(
    (productId: number, size?: string) =>
      cart.some((item) =>
        size
          ? item.product.id === productId && item.size === size
          : item.product.id === productId
      ),
    [cart]
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
