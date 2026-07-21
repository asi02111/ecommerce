import { Link } from 'react-router-dom'
import { Button, Badge } from '../../components/common'
import { useCart }     from '../../hooks/useStore'
import { useWishlist } from '../../hooks/useStore'
import { useToast }    from '../../hooks/useStore'
import type { Product } from '../../types'

interface Props {
  product: Product
}

const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart }       = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { success }                   = useToast()

  const inCart     = isInCart(product.id)
  const wishlisted = isWishlisted(product.id)

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const handleAddToCart = () => {
    addToCart(product)
    success(`${product.name} added to cart!`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
    success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  const badgeVariant = (badge: string) =>
    badge === 'Sale' ? 'red' : badge === 'Hot' ? 'orange' : 'indigo'

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
    ))

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">

      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square bg-gray-50 block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <span className="absolute top-3 left-3">
            <Badge variant={badgeVariant(product.badge) as 'red' | 'orange' | 'indigo'}>
              {product.badge}
            </Badge>
          </span>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3">
            <Badge variant="green">-{discount}%</Badge>
          </span>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge variant="gray">Out of Stock</Badge>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
        >
          <span className={`text-lg ${wishlisted ? 'text-pink-500' : 'text-gray-400'}`}>
            {wishlisted ? '❤️' : '🤍'}
          </span>
        </button>
      </Link>

      <div className="p-4">
        <p className="text-xs text-indigo-500 font-medium mb-1">{product.category}</p>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-sm">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-extrabold text-gray-900">৳{product.price.toLocaleString()}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <Button
          fullWidth
          size="sm"
          variant={!product.inStock ? 'ghost' : inCart ? 'success' : 'primary'}
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {!product.inStock ? 'Unavailable' : inCart ? '✓ In Cart' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
