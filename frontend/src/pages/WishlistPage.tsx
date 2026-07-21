import { Link } from 'react-router-dom'
import { Button, Card, EmptyState, Badge } from '../components/common'
import { useWishlist } from '../hooks/useStore'
import { useCart }     from '../hooks/useStore'
import { useToast }    from '../hooks/useStore'

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { success }   = useToast()

  const handleMoveToCart = (product: typeof wishlist[0]) => {
    addToCart(product)
    removeFromWishlist(product.id)
    success(`${product.name} moved to cart!`)
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon="🤍"
          title="Your wishlist is empty"
          description="Save items you love by clicking the heart icon on any product."
          action={<Link to="/"><Button>Explore Products</Button></Link>}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500 mt-1">{wishlist.length} saved items</p>
          </div>
          <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">← Continue Shopping</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlist.map((product) => {
            const discount = Math.round(
              ((product.originalPrice - product.price) / product.originalPrice) * 100
            )
            return (
              <Card key={product.id} padding="none" hover className="overflow-hidden group">
                <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2">
                      <Badge variant={product.badge === 'Sale' ? 'red' : product.badge === 'Hot' ? 'orange' : 'indigo'}>
                        {product.badge}
                      </Badge>
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="absolute top-2 right-2">
                      <Badge variant="green">-{discount}%</Badge>
                    </span>
                  )}
                </Link>

                <div className="p-3">
                  <p className="text-xs text-indigo-500 font-medium mb-1">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 hover:text-indigo-600 transition-colors mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-extrabold text-gray-900">৳{product.price.toLocaleString()}</span>
                    {discount > 0 && (
                      <span className="text-xs text-gray-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      fullWidth
                      size="sm"
                      onClick={() => handleMoveToCart(product)}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Move to Cart' : 'Out of Stock'}
                    </Button>
                    <Button
                      fullWidth
                      size="sm"
                      variant="ghost"
                      onClick={() => { removeFromWishlist(product.id); success('Removed from wishlist') }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
