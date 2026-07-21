import { useState } from 'react'
import { products } from '../../data/products'
import ProductCard from './ProductCard'

const categories = ['All', 'Men', 'Women', 'Electronics', 'Sports', 'Home & Living']

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">Featured Products</h2>
          <p className="text-gray-500 text-sm mt-1">Handpicked just for you</p>
        </div>
        <a href="/products" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          View All →
        </a>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🛍️</p>
          <p className="font-medium">No products found</p>
        </div>
      )}
    </section>
  )
}

export default ProductGrid