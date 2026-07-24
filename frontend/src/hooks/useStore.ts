import { useContext } from 'react'
import { CartContext }     from '../context/CartContext'
import { AuthContext }     from '../context/AuthContext'
import { WishlistContext } from '../context/WishlistContext'
import { ToastContext }    from '../context/ToastContext'
import { AppThemeContext } from '../theme/ThemeContext'

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider')
  return ctx
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}

// নতুন — theme switcher এর জন্য
export const useAppTheme = () => {
  const ctx = useContext(AppThemeContext)
  if (!ctx) throw new Error('useAppTheme must be used inside AppThemeProvider')
  return ctx
}
