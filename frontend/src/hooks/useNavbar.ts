import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart, useAuth, useWishlist } from './useStore'

// Navbar এর সব state এবং logic এক জায়গায় — component গুলো শুধু UI render করে,
// কোনো business logic নিজে রাখে না। এতে প্রতিটা component ছোট, testable, আর reusable থাকে।
export const useNavbar = () => {
  const { cartCount }      = useCart()
  const { wishlistCount }  = useWishlist()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const [drawerOpen,     setDrawerOpen]     = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery,    setSearchQuery]    = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [themeDialogOpen, setThemeDialogOpen] = useState(false)

  const closeMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMegaMenu = useCallback((label: string) => {
    if (closeMenuTimeout.current) clearTimeout(closeMenuTimeout.current)
    setActiveCategory(label)
  }, [])

  const closeMegaMenuDelayed = useCallback(() => {
    closeMenuTimeout.current = setTimeout(() => setActiveCategory(null), 150)
  }, [])

  const toggleMobileCategory = useCallback((label: string) => {
    setActiveCategory((prev) => (prev === label ? null : label))
  }, [])

  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) navigate(`/products?q=${searchQuery}`)
  }, [searchQuery, navigate])

  const handleLogout = useCallback(() => {
    logout()
    setUserMenuAnchor(null)
    setDrawerOpen(false)
    navigate('/')
  }, [logout, navigate])

  return {
    // state
    cartCount, wishlistCount, user, isLoggedIn,
    drawerOpen, activeCategory, searchQuery, mobileSearchOpen, userMenuAnchor, themeDialogOpen,
    // setters
    setDrawerOpen, setSearchQuery, setMobileSearchOpen, setUserMenuAnchor, setThemeDialogOpen,
    // handlers
    openMegaMenu, closeMegaMenuDelayed, toggleMobileCategory, handleSearch, handleLogout,
  }
}

export type UseNavbarReturn = ReturnType<typeof useNavbar>
