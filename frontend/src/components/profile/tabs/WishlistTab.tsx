import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Chip, Stack, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useCart, useToast, useWishlist } from '../../../hooks/useStore'


const WishlistTab = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { success } = useToast()

  if (wishlist.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <FavoriteBorderIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
        <Typography gutterBottom sx={{ fontWeight: 700, color: 'text.secondary', }}>Your wishlist is empty</Typography>
        <Typography variant="body2" sx={{ color: 'text.disabled', mb: 3 }}>Save items you love to find them easily later.</Typography>
        <Button component={Link} to="/" variant="contained" sx={{ borderRadius: 2, textTransform: 'none' }}>
          Explore Products
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack sx={{ direction: "row", alignItems: "center", justifyContent: "space-between", mb: 2.5 }} >
        <Typography sx={{ fontWeight: 800, fontSize: 16 }}>My Wishlist</Typography>
        <Typography variant="caption" color="text.secondary">{wishlist.length} items saved</Typography>
      </Stack>

      <Grid container spacing={2}>
        {wishlist.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          return (
            <Grid size={{ xs: 6, md: 4 }} key={product.id}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', transition: '.2s', '&:hover': { boxShadow: '0 6px 24px rgba(0,0,0,.1)', transform: 'translateY(-2px)' } }}>

                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component={Link}
                    to={`/product/${product.id}`}
                    image={product.image}
                    title={product.name}
                    sx={{ height: 160, display: 'block', bgcolor: 'grey.100' }}
                  />
                  {discount > 0 && (
                    <Chip
                      label={`-${discount}%`}
                      color="error"
                      size="small"
                      sx={{ position: 'absolute', top: 8, left: 8, fontWeight: 700, height: 22 }}
                    />
                  )}
                  <IconButton
                    size="small"
                    onClick={() => { removeFromWishlist(product.id); success('Removed from wishlist') }}
                    sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'white', boxShadow: 1, '&:hover': { bgcolor: 'error.50', color: 'error.main' } }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>

                <CardContent sx={{ pb: 1, pt: 1.5, px: 2 }}>
                  <Typography variant="caption" sx={{ color: 'primary', fontWeight: 600 }}>{product.category}</Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, mt: 0.3, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.name}
                  </Typography>
                  <Stack sx={{ direction: "row", spacing: 1, alignItems: "center", mt: 0.8 }}>
                    <Typography sx={{ fontWeight: 800 }} color="text.primary">৳{product.price.toLocaleString()}</Typography>
                    {discount > 0 && (
                      <Typography variant="caption" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                        ৳{product.originalPrice.toLocaleString()}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    disabled={!product.inStock}
                    onClick={() => { addToCart(product); removeFromWishlist(product.id); success('Moved to cart!') }}
                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: 12 }}
                  >
                    {product.inStock ? 'Move to Cart' : 'Out of Stock'}
                  </Button>
                </CardActions>

              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default WishlistTab
