import { Link } from 'react-router-dom'
import { Box, Container, Paper, Typography, Grid } from '@mui/material'
import { EmptyState, Button } from '../components/common'
import { useProductDetail } from '../hooks/useProductDetail'
import ProductGallery   from '../components/product-detail/ProductGallery'
import ProductInfo      from '../components/product-detail/ProductInfo'
import ProductTabs      from '../components/product-detail/ProductTabs'
import RelatedProducts  from '../components/product-detail/RelatedProducts'

const ProductDetailPage = () => {
  const {
    product, quantity, selectedSize, activeTab, relatedProducts, discount,
    setSelectedSize, setActiveTab, increaseQty, decreaseQty,
  } = useProductDetail()

  if (!product) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState icon="😕" title="Product not found" action={<Link to="/"><Button>← Back to Home</Button></Link>} />
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>

        {/* Breadcrumb */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 3, fontSize: 13, color: 'text.secondary', flexWrap: 'wrap' }}>
          <Typography component={Link} to="/" variant="body2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Home</Typography>
          <Typography variant="body2">›</Typography>
          <Typography component={Link} to="/products" variant="body2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Products</Typography>
          <Typography variant="body2">›</Typography>
          <Typography variant="body2">{product.category}</Typography>
          <Typography variant="body2">›</Typography>
          <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }} noWrap>{product.name}</Typography>
        </Box>

        {/* Main product section — Grid container default alignItems="stretch" করে দুই column কে সমান height দেয় */}
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: { xs: 2.5, md: 4 }, mb: 3 }}>
          <Grid container spacing={5} sx={{ alignItems: 'stretch' }}>
            {/* sx display:'flex' না দিলে ভেতরের height:'100%' Box কাজ করবে না */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <ProductGallery product={product} discount={discount} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex' }}>
              <ProductInfo
                product={product}
                discount={discount}
                quantity={quantity}
                selectedSize={selectedSize}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onSizeSelect={setSelectedSize}
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <ProductTabs product={product} activeTab={activeTab} onChange={setActiveTab} />
        </Box>

        <RelatedProducts products={relatedProducts} />
      </Container>
    </Box>
  )
}

export default ProductDetailPage