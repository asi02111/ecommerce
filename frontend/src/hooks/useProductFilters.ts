import { useState, useMemo, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'

const categoryBySlug: Record<string, string> = {
  '/men': 'Men',
  '/women': 'Women',
  '/electronics': 'Electronics',
  '/sports': 'Sports',
  '/home': 'Home & Living',
}

export const allCategories = ['Men', 'Women', 'Electronics', 'Sports', 'Home & Living']
export const allBadges = ['Sale', 'New', 'Hot']
export const discountThresholds = [10, 25, 50] // % off অথবা তার বেশি

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'

const getDiscount = (price: number, originalPrice: number) =>
  originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

export const useProductFilters = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') ?? ''

  const initialCategory = categoryBySlug[location.pathname]

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [priceRange,   setPriceRange]   = useState<[number, number]>([0, 5000])
  const [minRating,    setMinRating]    = useState(0)
  const [minDiscount,  setMinDiscount]  = useState(0)
  const [selectedBadges, setSelectedBadges] = useState<string[]>([])
  const [inStockOnly,  setInStockOnly]  = useState(false)
  const [sortBy,       setSortBy]       = useState<SortOption>('featured')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : [])
  }, [initialCategory])

  const toggleCategory = (cat: string) =>
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))

  const toggleBadge = (badge: string) =>
    setSelectedBadges((prev) => (prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]))

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 5000])
    setMinRating(0)
    setMinDiscount(0)
    setSelectedBadges([])
    setInStockOnly(false)
  }

  // কতগুলো filter active আছে — badge count আর "Active Filters" chip দেখাতে কাজে লাগে
  const activeFilterCount =
    selectedCategories.length +
    selectedBadges.length +
    (minRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0)

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (searchQuery) list = list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    if (selectedCategories.length > 0) list = list.filter((p) => selectedCategories.includes(p.category))
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating)
    if (minDiscount > 0) list = list.filter((p) => getDiscount(p.price, p.originalPrice) >= minDiscount)
    if (selectedBadges.length > 0) list = list.filter((p) => p.badge && selectedBadges.includes(p.badge))
    if (inStockOnly) list = list.filter((p) => p.inStock)

    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => a.price - b.price); break
      case 'price-high': list.sort((a, b) => b.price - a.price); break
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break
      case 'newest':     list.sort((a, b) => b.id - a.id); break
      default: break
    }

    return list
  }, [searchQuery, selectedCategories, priceRange, minRating, minDiscount, selectedBadges, inStockOnly, sortBy])

  const pageTitle = initialCategory ?? (searchQuery ? `Search: "${searchQuery}"` : 'All Products')

  return {
    filteredProducts, pageTitle, searchQuery, activeFilterCount,
    selectedCategories, toggleCategory,
    priceRange, setPriceRange,
    minRating, setMinRating,
    minDiscount, setMinDiscount,
    selectedBadges, toggleBadge,
    inStockOnly, setInStockOnly,
    sortBy, setSortBy,
    clearFilters,
    mobileFilterOpen, setMobileFilterOpen,
  }
}