import { useContext } from 'react'
import { CartContext }     from '../context/CartContext'
import { AuthContext }     from '../context/AuthContext'
import { WishlistContext } from '../context/WishlistContext'
import { ToastContext }    from '../context/ToastContext'

// useCart — cart এর সব কিছু এক জায়গা থেকে
export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

// useAuth — user login state
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

// useWishlist — wishlist state
export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}

// useToast — notification
export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
