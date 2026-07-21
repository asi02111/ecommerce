import { createContext, useState, useCallback, type ReactNode } from 'react'
import type { Product } from '../types'

interface WishlistContextType {
  wishlist: Product[]
  wishlistCount: number
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  toggleWishlist: (product: Product) => void
  isWishlisted: (productId: number) => boolean
}

export const WishlistContext = createContext<WishlistContextType | null>(null)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([])

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    )
  }, [])

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    )
  }, [])

  const isWishlisted = useCallback(
    (productId: number) => wishlist.some((p) => p.id === productId),
    [wishlist]
  )

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
