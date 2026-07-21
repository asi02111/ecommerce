import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Category, NavLink } from '../../types'
import { useCart }     from '../../hooks/useStore'
import { useAuth }     from '../../hooks/useStore'
import { useWishlist } from '../../hooks/useStore'

const categories: Category[] = [
  {
    label: 'Men', href: '/men',
    subcategories: [
      { label: 'T-Shirts', href: '/men/tshirts' },
      { label: 'Shirts',   href: '/men/shirts'   },
      { label: 'Pants',    href: '/men/pants'     },
      { label: 'Shoes',    href: '/men/shoes'     },
      { label: 'Watches',  href: '/men/watches'   },
      { label: 'Bags',     href: '/men/bags'      },
    ],
  },
  {
    label: 'Women', href: '/women',
    subcategories: [
      { label: 'Dresses',  href: '/women/dresses'  },
      { label: 'Tops',     href: '/women/tops'      },
      { label: 'Saree',    href: '/women/saree'     },
      { label: 'Handbags', href: '/women/handbags'  },
      { label: 'Shoes',    href: '/women/shoes'     },
      { label: 'Jewelry',  href: '/women/jewelry'   },
    ],
  },
  {
    label: 'Electronics', href: '/electronics',
    subcategories: [
      { label: 'Smartphones', href: '/electronics/smartphones' },
      { label: 'Laptops',     href: '/electronics/laptops'     },
      { label: 'Headphones',  href: '/electronics/headphones'  },
      { label: 'Cameras',     href: '/electronics/cameras'     },
      { label: 'Smart Watch', href: '/electronics/smartwatch'  },
      { label: 'Accessories', href: '/electronics/accessories' },
    ],
  },
  {
    label: 'Home & Living', href: '/home',
    subcategories: [
      { label: 'Furniture', href: '/home/furniture' },
      { label: 'Kitchen',   href: '/home/kitchen'   },
      { label: 'Bedding',   href: '/home/bedding'   },
      { label: 'Lighting',  href: '/home/lighting'  },
      { label: 'Decor',     href: '/home/decor'     },
      { label: 'Storage',   href: '/home/storage'   },
    ],
  },
  {
    label: 'Sports', href: '/sports',
    subcategories: [
      { label: 'Cricket',    href: '/sports/cricket'    },
      { label: 'Football',   href: '/sports/football'   },
      { label: 'Gym',        href: '/sports/gym'        },
      { label: 'Cycling',    href: '/sports/cycling'    },
      { label: 'Outdoor',    href: '/sports/outdoor'    },
      { label: 'Sportswear', href: '/sports/sportswear' },
    ],
  },
]

const topLinks: NavLink[] = [
  { label: 'Track Order',   href: '/track-order' },
  { label: 'Sell on ShopBD', href: '/sell'        },
  { label: 'Help',           href: '/help'        },
]

const Navbar = () => {
  const { cartCount }     = useCart()
  const { wishlistCount } = useWishlist()
  const { user, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const [menuOpen,       setMenuOpen]       = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery,    setSearchQuery]    = useState('')
  const [searchOpen,     setSearchOpen]     = useState(false)
  const [accountOpen,    setAccountOpen]    = useState(false)

  const megaMenuRef  = useRef<HTMLDivElement>(null)
  const accountRef   = useRef<HTMLDivElement>(null)
  const timeoutRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveCategory(label)
  }
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveCategory(null), 150)
  }

  // Outside click — mega menu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node))
        setActiveCategory(null)
      if (accountRef.current && !accountRef.current.contains(e.target as Node))
        setAccountOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/products?q=${searchQuery}`)
  }

  const handleLogout = () => {
    logout()
    setAccountOpen(false)
    navigate('/')
  }

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">

      {/* Top Bar */}
      <div className="bg-indigo-700 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>🚚 Free delivery on orders over ৳999</span>
          <div className="flex gap-5">
            {topLinks.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-indigo-200 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              Shop<span className="text-gray-800">BD</span>
            </h1>
          </Link>

          {/* Search — desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="flex w-full rounded-xl overflow-hidden border-2 border-indigo-500 focus-within:border-indigo-600 transition-colors">
              <select className="bg-gray-100 text-gray-600 text-sm px-3 border-r border-gray-300 outline-none cursor-pointer">
                <option>All</option>
                <option>Men</option>
                <option>Women</option>
                <option>Electronics</option>
                <option>Sports</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search products, brands..."
                className="flex-1 px-4 py-2 text-sm outline-none text-gray-700"
              />
              <button
                onClick={handleSearch}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 transition-colors text-lg"
              >
                🔍
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="ml-auto flex items-center gap-1">

            {/* Search mobile */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <span className="text-xl">🔍</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors hidden sm:flex items-center"
            >
              <span className="text-xl">🤍</span>
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="text-xl">🛒</span>
              <span className="hidden sm:block text-sm font-medium text-gray-700">Cart</span>
              {cartCount > 0 && (
                <span className="hidden sm:flex bg-indigo-600 text-white text-xs rounded-full w-5 h-5 items-center justify-center leading-none ml-1">
                  {cartCount}
                </span>
              )}
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 sm:hidden bg-indigo-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {isLoggedIn ? (
              <div className="relative hidden sm:block" ref={accountRef}>
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0] ?? 'U'}
                  </div>
                  <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                </button>

                {/* Account dropdown */}
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    {[
                      { label: '👤 My Profile', href: '/profile' },
                      { label: '📦 My Orders',  href: '/orders'  },
                      { label: '🤍 Wishlist',   href: '/wishlist' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setAccountOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="flex rounded-xl overflow-hidden border-2 border-indigo-500">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 text-sm outline-none text-gray-700"
                autoFocus
              />
              <button onClick={handleSearch} className="bg-indigo-600 text-white px-4">🔍</button>
            </div>
          </div>
        )}
      </div>

      {/* Category Nav + Mega Menu */}
      <div
        className="bg-white border-b hidden md:block"
        ref={megaMenuRef}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            <li>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-3 transition-colors">
                <span>☰</span> All Categories
              </button>
            </li>

            {categories.map((cat) => (
              <li key={cat.label} className="relative" onMouseEnter={() => handleMouseEnter(cat.label)}>
                <Link
                  to={cat.href}
                  className={`flex items-center gap-1 text-sm font-medium px-4 py-3 transition-colors border-b-2 ${
                    activeCategory === cat.label
                      ? 'text-indigo-600 border-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 border-transparent'
                  }`}
                >
                  {cat.label}
                  <span className="text-xs opacity-60">▾</span>
                </Link>

                {activeCategory === cat.label && (
                  <div
                    className="absolute top-full left-0 bg-white shadow-xl rounded-b-xl border border-t-0 p-5 min-w-55 z-50"
                    onMouseEnter={() => handleMouseEnter(cat.label)}
                  >
                    <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">
                      {cat.label}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            to={sub.href}
                            className="text-sm text-gray-600 hover:text-indigo-600 hover:pl-1 transition-all flex items-center gap-2"
                          >
                            <span className="text-indigo-300">›</span>
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t">
                      <Link to={cat.href} className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                        View all {cat.label} →
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}

            <li className="ml-auto">
              <Link to="/deals" className="text-sm font-semibold text-red-500 hover:text-red-600 px-4 py-3 flex items-center gap-1 animate-pulse">
                🔥 Today's Deals
              </Link>
            </li>
            <li>
              <Link to="/new-arrivals" className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-4 py-3 block">
                ✨ New Arrivals
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
          <div className="flex gap-2 p-4 border-b">
            {isLoggedIn ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.name?.[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="text-xs text-red-500 font-medium">Logout</button>
              </div>
            ) : (
              <>
                <Link to="/login" className="flex-1 text-center text-sm font-medium text-indigo-600 border border-indigo-600 py-2 rounded-lg">Login</Link>
                <Link to="/register" className="flex-1 text-center text-sm font-medium text-white bg-indigo-600 py-2 rounded-lg">Sign Up</Link>
              </>
            )}
          </div>

          {categories.map((cat) => (
            <div key={cat.label} className="border-b">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800"
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
              >
                {cat.label}
                <span className="text-gray-400">{activeCategory === cat.label ? '▲' : '▼'}</span>
              </button>
              {activeCategory === cat.label && (
                <div className="bg-gray-50 px-6 py-2 flex flex-col gap-2">
                  {cat.subcategories.map((sub) => (
                    <Link key={sub.href} to={sub.href} className="text-sm text-gray-600 hover:text-indigo-600 py-1">
                      › {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="p-4 flex flex-col gap-3">
            <Link to="/deals"       className="text-sm font-semibold text-red-500">🔥 Today's Deals</Link>
            <Link to="/new-arrivals" className="text-sm text-gray-700">✨ New Arrivals</Link>
            <Link to="/orders"       className="text-sm text-gray-700">📦 My Orders</Link>
            <Link to="/wishlist"     className="text-sm text-gray-700">🤍 Wishlist</Link>
            <Link to="/help"         className="text-sm text-gray-700">❓ Help</Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
