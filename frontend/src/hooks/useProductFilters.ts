import { useState, useMemo, useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { products } from '../data/products'

// URL path → category label mapping। Navbar এর href গুলো এখান থেকেই আসে।
const categoryBySlug: Record<string, string> = {
  '/men': 'Men',
  '/women': 'Women',
  '/electronics': 'Electronics',
  '/sports': 'Sports',
  '/home': 'Home & Living',
}

export const allCategories = ['Men', 'Women', 'Electronics', 'Sports', 'Home & Living']

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'

export const useProductFilters = () => {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') ?? ''

  const initialCategory = categoryBySlug[location.pathname]

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // URL বদলালে (Navbar থেকে অন্য category ক্লিক করলে) filter reset করে নতুন category বসাও
  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : [])
  }, [initialCategory])

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 5000])
    setMinRating(0)
  }

  const filteredProducts = useMemo(() => {
    let list = [...products]

    if (searchQuery) {
      list = list.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (selectedCategories.length > 0) {
      list = list.filter((p) => selectedCategories.includes(p.category))
    }
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (minRating > 0) {
      list = list.filter((p) => p.rating >= minRating)
    }

    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => a.price - b.price); break
      case 'price-high': list.sort((a, b) => b.price - a.price); break
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break
      case 'newest':     list.sort((a, b) => b.id - a.id); break
      default: break // featured — original order
    }

    return list
  }, [searchQuery, selectedCategories, priceRange, minRating, sortBy])

  const pageTitle = initialCategory ?? (searchQuery ? `Search: "${searchQuery}"` : 'All Products')

  return {
    filteredProducts, pageTitle, searchQuery,
    selectedCategories, toggleCategory,
    priceRange, setPriceRange,
    minRating, setMinRating,
    sortBy, setSortBy,
    clearFilters,
    mobileFilterOpen, setMobileFilterOpen,
  }
}
