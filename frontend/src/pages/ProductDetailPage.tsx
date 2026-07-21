import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

const ProductDetailPage = () => {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('M')
  const [wishlisted, setWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description')

  // Product not found
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-6xl">😕</p>
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/" className="text-indigo-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    )
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <span>›</span>
          <span className="hover:text-indigo-600 transition-colors cursor-pointer">{product.category}</span>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Product Image */}
            <div className="space-y-3">
              <div className="relative rounded-2xl overflow-hidden bg-gray-50 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-lg ${
                    product.badge === 'Sale' ? 'bg-red-500 text-white' :
                    product.badge === 'Hot' ? 'bg-orange-500 text-white' :
                    'bg-indigo-600 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                {discount > 0 && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    -{discount}%
                  </span>
                )}
              </div>

              {/* Thumbnail row — same image x4 for demo */}
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }, (_, i) => (
                  <div
                    key={i}
                    className={`rounded-xl overflow-hidden aspect-square cursor-pointer border-2 transition-colors ${
                      i === 0 ? 'border-indigo-500' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4">

              {/* Category + Name */}
              <div>
                <p className="text-sm text-indigo-500 font-medium mb-1">{product.category}</p>
                <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-gray-900">
                  ৳{product.price.toLocaleString()}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-gray-400 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-0.5 rounded-lg">
                      Save ৳{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                  {product.inStock ? 'In Stock — Ready to ship' : 'Out of Stock'}
                </span>
              </div>

              <hr className="border-gray-100" />

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">Select Size</p>
                  <button className="text-xs text-indigo-500 hover:underline">Size Guide</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl text-sm font-semibold border-2 transition-all ${
                        selectedSize === size
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 text-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 text-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: <span className="font-bold text-gray-800">৳{(product.price * quantity).toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                    !product.inStock
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>

                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all text-xl ${
                    wishlisted
                      ? 'border-pink-400 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {wishlisted ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Buy Now */}
              <Link
                to="/cart"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-center border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                ⚡ Buy Now
              </Link>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
                {[
                  { icon: '🚚', text: 'Free delivery on orders over ৳999' },
                  { icon: '🔄', text: '7-day easy return policy' },
                  { icon: '🔒', text: '100% secure checkout' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs — Description, Reviews, Shipping */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex gap-1 border-b mb-6">
            {(['description', 'reviews', 'shipping'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-500 border-transparent hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>This premium quality {product.name} is crafted with attention to detail and superior materials. Designed for everyday comfort and style, it features a modern fit that works for both casual and semi-formal occasions.</p>
              <p>Available in multiple sizes, this piece is perfect for those who value both aesthetics and functionality. Easy to care for and built to last.</p>
              <ul className="list-disc list-inside space-y-1 mt-3">
                <li>Premium quality material</li>
                <li>Comfortable and durable</li>
                <li>Easy to wash and maintain</li>
                <li>Available in multiple sizes</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[
                { name: 'Rahim K.', rating: 5, comment: 'Excellent quality! Very happy with the purchase. Fast delivery too.', date: '2 days ago' },
                { name: 'Sumaiya T.', rating: 4, comment: 'Good product, matches the description. Sizing is accurate.', date: '1 week ago' },
                { name: 'Kamal H.', rating: 5, comment: 'Best purchase this month! Highly recommended.', date: '2 weeks ago' },
              ].map((review, i) => (
                <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                        {review.name[0]}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{review.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <div className="flex mb-1">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j} className={`text-sm ${j < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="text-sm text-gray-600 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🚀', title: 'Express Delivery', desc: 'Dhaka: 1-2 days — ৳80' },
                  { icon: '🚚', title: 'Standard Delivery', desc: 'Outside Dhaka: 3-5 days — ৳120' },
                  { icon: '🎁', title: 'Free Delivery', desc: 'On orders above ৳999' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <p className="text-2xl mb-2">{item.icon}</p>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-800 line-clamp-1">{p.name}</p>
                    <p className="text-indigo-600 font-bold mt-1">৳{p.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProductDetailPage
