import { Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Box, Typography, IconButton } from '@mui/material'
import FavoriteIcon        from '@mui/icons-material/Favorite'
import FavoriteBorderIcon  from '@mui/icons-material/FavoriteBorderOutlined'
import { Button, Badge } from '../common'
import { useCart, useWishlist, useToast } from '../../hooks/useStore'
import type { Product } from '../../types'

interface Props {
  product: Product
}

const badgeVariant = (badge: string): 'red' | 'orange' | 'indigo' =>
  badge === 'Sale' ? 'red' : badge === 'Hot' ? 'orange' : 'indigo'

const Stars = ({ rating }: { rating: number }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
    {Array.from({ length: 5 }, (_, i) => (
      <Typography key={i} sx={{ fontSize: 13, color: i < Math.floor(rating) ? '#FBBF24' : 'grey.300' }}>★</Typography>
    ))}
  </Box>
)

const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart }         = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { success } = useToast()

  const inCart     = isInCart(product.id)
  const wishlisted = isWishlisted(product.id)
  const discount   = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleAddToCart = () => {
    addToCart(product)
    success(`${product.name} added to cart!`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
    success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden',
        transition: '.25s', '&:hover': { boxShadow: '0 10px 28px rgba(0,0,0,.1)', transform: 'translateY(-3px)' },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component={Link}
          to={`/product/${product.id}`}
          image={product.image}
          title={product.name}
          sx={{ aspectRatio: '5/3', display: 'block', bgcolor: 'grey.100', '&:hover': { transform: 'scale(1.05)', transition: '.5s' } }}
        />

        {product.badge && (
          <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
            <Badge variant={badgeVariant(product.badge)}>{product.badge}</Badge>
          </Box>
        )}

        {discount > 0 && (
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <Badge variant="green">-{discount}%</Badge>
          </Box>
        )}

        {!product.inStock && (
          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Badge variant="gray">Out of Stock</Badge>
          </Box>
        )}

        <IconButton
          onClick={handleWishlist}
          size="small"
          sx={{
            position: 'absolute', bottom: 10, right: 10, bgcolor: '#fff', boxShadow: 1,
            '&:hover': { bgcolor: 'grey.50', transform: 'scale(1.1)' },
          }}
        >
          {wishlisted
            ? <FavoriteIcon fontSize="small" sx={{ color: 'error.main' }} />
            : <FavoriteBorderIcon fontSize="small" sx={{ color: 'grey.500' }} />}
        </IconButton>
      </Box>

      {/* Info */}
      <CardContent sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600 }}>
          {product.category}
        </Typography>

        <Box component={Link} to={`/product/${product.id}`} sx={{ textDecoration: 'none', display: 'block' }}>
          <Typography
            sx={{
              fontSize: 13.5, fontWeight: 600, color: 'text.primary', mt: 0.3, mb: 1,
              lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {product.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.7, mb: 1.2 }}>
          <Stars rating={product.rating} />
          <Typography variant="caption" color="text.secondary">({product.reviewCount})</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: 'text.primary' }}>
            ৳{product.price.toLocaleString()}
          </Typography>
          {discount > 0 && (
            <Typography variant="caption" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              ৳{product.originalPrice.toLocaleString()}
            </Typography>
          )}
        </Box>

        <Button
          fullWidth
          size="lg"
          variant={!product.inStock ? 'ghost' : inCart ? 'success' : 'primary'}
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {!product.inStock ? 'Unavailable' : inCart ? '✓ In Cart' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard


// import { Link } from 'react-router-dom'
// import { Card, CardMedia, CardContent, Box, Typography, IconButton } from '@mui/material'
// import FavoriteIcon        from '@mui/icons-material/Favorite'
// import FavoriteBorderIcon  from '@mui/icons-material/FavoriteBorderOutlined'
// import { Button, Badge } from '../common'
// import { useCart, useWishlist, useToast } from '../../hooks/useStore'
// import type { Product } from '../../types'

// interface Props {
//   product: Product
// }

// const badgeVariant = (badge: string): 'red' | 'orange' | 'indigo' =>
//   badge === 'Sale' ? 'red' : badge === 'Hot' ? 'orange' : 'indigo'

// const Stars = ({ rating }: { rating: number }) => (
//   <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1px' }}>
//     {Array.from({ length: 5 }, (_, i) => (
//       <Typography
//         key={i}
//         sx={{
//           fontSize: 13,
//           lineHeight: 1,
//           color: i < Math.floor(rating) ? '#FBBF24' : '#E5E7EB',
//         }}
//       >
//         ★
//       </Typography>
//     ))}
//   </Box>
// )

// const ProductCard = ({ product }: Props) => {
//   const { addToCart, isInCart }          = useCart()
//   const { toggleWishlist, isWishlisted } = useWishlist()
//   const { success } = useToast()

//   const inCart     = isInCart(product.id)
//   const wishlisted = isWishlisted(product.id)
//   const discount   = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

//   const handleAddToCart = () => {
//     addToCart(product)
//     success(`${product.name} added to cart!`)
//   }

//   const handleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault()
//     toggleWishlist(product)
//     success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
//   }

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         position: 'relative',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         border: '1px solid',
//         borderColor: '#EAECEF',
//         borderRadius: '16px',
//         overflow: 'hidden',
//         bgcolor: '#fff',
//         transition: 'all .3s cubic-bezier(.4,0,.2,1)',
//         '&:hover': {
//           transform: 'translateY(-6px)',
//           borderColor: 'rgba(3,3,58,.12)',
//           boxShadow: '0 18px 45px rgba(15,23,42,.11)',
//           '& .product-image': {
//             transform: 'scale(1.055)',
//           },
//           '& .product-overlay': {
//             opacity: 1,
//           },
//           '& .wishlist-button': {
//             transform: 'translateY(0)',
//             opacity: 1,
//           },
//         },
//       }}
//     >
//       {/* Image */}
//       <Box
//         sx={{
//           position: 'relative',
//           overflow: 'hidden',
//           bgcolor: '#F7F8FA',
//           aspectRatio: '1 / 1',
//         }}
//       >
//         <CardMedia
//           component={Link}
//           to={`/product/${product.id}`}
//           image={product.image}
//           title={product.name}
//           className="product-image"
//           sx={{
//             width: '100%',
//             height: '100%',
//             display: 'block',
//             transition: 'transform .5s cubic-bezier(.2,.8,.2,1)',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />

//         {/* Image overlay */}
//         <Box
//           className="product-overlay"
//           sx={{
//             position: 'absolute',
//             inset: 0,
//             background: 'linear-gradient(to top, rgba(0,0,0,.18), transparent 45%)',
//             opacity: 0,
//             transition: 'opacity .3s ease',
//             pointerEvents: 'none',
//           }}
//         />

//         {/* Top badges */}
//         <Box
//           sx={{
//             position: 'absolute',
//             top: 12,
//             left: 12,
//             right: 12,
//             display: 'flex',
//             alignItems: 'flex-start',
//             justifyContent: 'space-between',
//             gap: 1,
//           }}
//         >
//           <Box>
//             {product.badge && (
//               <Badge variant={badgeVariant(product.badge)}>
//                 {product.badge}
//               </Badge>
//             )}
//           </Box>

//           {discount > 0 && (
//             <Box
//               sx={{
//                 px: 1,
//                 py: 0.45,
//                 borderRadius: '7px',
//                 bgcolor: '#DCFCE7',
//                 color: '#15803D',
//                 fontSize: 11,
//                 fontWeight: 800,
//                 letterSpacing: '.2px',
//                 boxShadow: '0 2px 8px rgba(0,0,0,.06)',
//               }}
//             >
//               -{discount}%
//             </Box>
//           )}
//         </Box>

//         {/* Wishlist */}
//         <IconButton
//           className="wishlist-button"
//           onClick={handleWishlist}
//           size="small"
//           sx={{
//             position: 'absolute',
//             bottom: 12,
//             right: 12,
//             width: 36,
//             height: 36,
//             bgcolor: 'rgba(255,255,255,.96)',
//             backdropFilter: 'blur(8px)',
//             border: '1px solid rgba(0,0,0,.06)',
//             boxShadow: '0 5px 16px rgba(0,0,0,.12)',
//             opacity: { xs: 1, md: 0 },
//             transform: { xs: 'translateY(0)', md: 'translateY(6px)' },
//             transition: 'all .25s ease',
//             '&:hover': {
//               bgcolor: '#fff',
//               transform: 'scale(1.08)',
//               boxShadow: '0 7px 20px rgba(0,0,0,.15)',
//             },
//           }}
//         >
//           {wishlisted
//             ? <FavoriteIcon fontSize="small" sx={{ color: '#EF4444' }} />
//             : <FavoriteBorderIcon fontSize="small" sx={{ color: '#475569' }} />}
//         </IconButton>

//         {/* Out of stock */}
//         {!product.inStock && (
//           <Box
//             sx={{
//               position: 'absolute',
//               inset: 0,
//               bgcolor: 'rgba(15,23,42,.48)',
//               backdropFilter: 'blur(2px)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Box
//               sx={{
//                 px: 1.8,
//                 py: 0.8,
//                 borderRadius: '8px',
//                 bgcolor: 'rgba(255,255,255,.95)',
//                 color: '#334155',
//                 fontSize: 12,
//                 fontWeight: 700,
//                 boxShadow: '0 5px 18px rgba(0,0,0,.15)',
//               }}
//             >
//               Out of Stock
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* Info */}
//       <CardContent
//         sx={{
//           p: 2,
//           pt: 1.8,
//           display: 'flex',
//           flexDirection: 'column',
//           flex: 1,
//         }}
//       >
//         {/* Category */}
//         <Typography
//           variant="caption"
//           sx={{
//             color: 'primary.main',
//             fontSize: 10.5,
//             fontWeight: 800,
//             textTransform: 'uppercase',
//             letterSpacing: '.7px',
//             mb: 0.5,
//           }}
//         >
//           {product.category}
//         </Typography>

//         {/* Product name */}
//         <Box
//           component={Link}
//           to={`/product/${product.id}`}
//           sx={{
//             textDecoration: 'none',
//             display: 'block',
//             minHeight: 39,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 13.5,
//               fontWeight: 650,
//               color: '#1E293B',
//               lineHeight: 1.45,
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//               overflow: 'hidden',
//               transition: 'color .2s ease',
//               '&:hover': {
//                 color: 'primary.main',
//               },
//             }}
//           >
//             {product.name}
//           </Typography>
//         </Box>

//         {/* Rating */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: 0.8,
//             mt: 1,
//             mb: 1.2,
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 0.5,
//               px: 0.8,
//               py: 0.35,
//               borderRadius: '6px',
//               bgcolor: '#FFFBEB',
//             }}
//           >
//             <Stars rating={product.rating} />

//             <Typography
//               sx={{
//                 fontSize: 10.5,
//                 fontWeight: 700,
//                 color: '#92400E',
//                 lineHeight: 1,
//               }}
//             >
//               {product.rating.toFixed(1)}
//             </Typography>
//           </Box>

//           <Typography
//             sx={{
//               fontSize: 10.5,
//               color: '#94A3B8',
//             }}
//           >
//             ({product.reviewCount})
//           </Typography>
//         </Box>

//         {/* Price */}
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'baseline',
//             gap: 1,
//             mb: 1.5,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: 18,
//               fontWeight: 850,
//               color: '#0F172A',
//               letterSpacing: '-.3px',
//             }}
//           >
//             ৳{product.price.toLocaleString()}
//           </Typography>

//           {discount > 0 && (
//             <Typography
//               sx={{
//                 fontSize: 11.5,
//                 color: '#94A3B8',
//                 textDecoration: 'line-through',
//               }}
//             >
//               ৳{product.originalPrice.toLocaleString()}
//             </Typography>
//           )}
//         </Box>

//         {/* Add to cart */}
//         <Button
//           fullWidth
//           size="sm"
//           variant={!product.inStock ? 'ghost' : inCart ? 'success' : 'primary'}
//           disabled={!product.inStock}
//           onClick={handleAddToCart}
//         >
//           {!product.inStock
//             ? 'Unavailable'
//             : inCart
//               ? '✓ In Cart'
//               : 'Add to Cart'}
//         </Button>
//       </CardContent>
//     </Card>
//   )
// }

// export default ProductCard
