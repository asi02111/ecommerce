import { Box, Typography } from '@mui/material'
import FavoriteIcon       from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { Button } from '../common'
import { useCart, useWishlist, useToast } from '../../hooks/useStore'
import type { Product } from '../../types'
import SizeSelector from './SizeSelector'
import QuantitySelector from './QuantitySelector'

interface Props {
  product: Product
  discount: number
  quantity: number
  selectedSize: string
  onIncrease: () => void
  onDecrease: () => void
  onSizeSelect: (size: string) => void
}

const Stars = ({ rating }: { rating: number }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    {Array.from({ length: 5 }, (_, i) => (
      <Typography key={i} sx={{ fontSize: 18, color: i < Math.floor(rating) ? '#FBBF24' : 'grey.300' }}>★</Typography>
    ))}
  </Box>
)

const ProductInfo = ({ product, discount, quantity, selectedSize, onIncrease, onDecrease, onSizeSelect }: Props) => {
  const { addToCart }                    = useCart()
  const { toggleWishlist, isWishlisted }  = useWishlist()
  const { success }                      = useToast()

  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    success(`${product.name} added to cart!`)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize)
    success(`${product.name} added — proceed to checkout!`)
    // পরে এখানে সরাসরি /checkout তে navigate করানো যাবে
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>

      <Box>
        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>{product.category}</Typography>
        <Typography sx={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3 }}>{product.name}</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <Stars rating={product.rating} />
        <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{product.rating}</Typography>
        <Typography variant="body2" color="text.disabled">({product.reviewCount} reviews)</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ fontSize: 30, fontWeight: 800 }}>৳{product.price.toLocaleString()}</Typography>
        {discount > 0 && (
          <>
            <Typography sx={{ fontSize: 16, color: 'text.disabled', textDecoration: 'line-through' }}>
              ৳{product.originalPrice.toLocaleString()}
            </Typography>
            <Box sx={{ fontSize: 13, fontWeight: 700, color: '#15803D', bgcolor: '#DCFCE7', px: 1, py: 0.3, borderRadius: 1.5 }}>
              Save ৳{(product.originalPrice - product.price).toLocaleString()}
            </Box>
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: product.inStock ? 'success.main' : 'error.main' }} />
        <Typography variant="body2" sx={{ fontWeight: 600, color: product.inStock ? 'success.main' : 'error.main' }}>
          {product.inStock ? 'In Stock — Ready to ship' : 'Out of Stock'}
        </Typography>
      </Box>

      <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

      <SizeSelector selected={selectedSize} onSelect={onSizeSelect} />
      <QuantitySelector quantity={quantity} price={product.price} onIncrease={onIncrease} onDecrease={onDecrease} />

      {/* Add to Cart + Wishlist + Buy Now — সব এক লাইনে, Add to Cart ও Buy Now সমান size */}
      <Box
  sx={{
    display: 'flex',
    flexDirection: 'row',
    gap: 1.5,
    pt: 1,
    alignItems: 'center',
  }}
>
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Button
      fullWidth
      size="lg"
      variant={product.inStock ? 'primary' : 'ghost'}
      disabled={!product.inStock}
      onClick={handleAddToCart}
      sx={{
        whiteSpace: 'nowrap',
      }}
    >
      🛒 Add to Cart
    </Button>
  </Box>

  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Button
      fullWidth
      size="lg"
      variant="outline"
      disabled={!product.inStock}
      onClick={handleBuyNow}
      sx={{
        whiteSpace: 'nowrap',
      }}
    >
      ⚡ Buy Now
    </Button>
  </Box>

  <Box
    onClick={handleWishlist}
    sx={{
      width: 52,
      height: 52,
      flexShrink: 0,
      borderRadius: 2.5,
      border: '2px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      borderColor: wishlisted ? 'error.light' : 'divider',
      bgcolor: wishlisted ? 'error.50' : 'transparent',
    }}
  >
    {wishlisted
      ? <FavoriteIcon sx={{ color: 'error.main' }} />
      : <FavoriteBorderIcon sx={{ color: 'text.secondary' }} />}
  </Box>
</Box>

      {/* নিচের trust box কে flex-grow দিয়ে বাকি জায়গা fill করানো হয়েছে — এতে left/right column height match করে */}
      <Box sx={{ bgcolor: 'grey.50', borderRadius: 2.5, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1, flex: 1 }}>
        {[
          { icon: '🚚', text: 'Free delivery on orders over ৳999' },
          { icon: '🔄', text: '7-day easy return policy' },
          { icon: '🔒', text: '100% secure checkout' },
        ].map((item, i) => (
          <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: 14 }}>{item.icon}</Typography>
            <Typography variant="body2" color="text.secondary">{item.text}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ProductInfo