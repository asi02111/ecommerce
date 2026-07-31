import { Box, Typography, Grid } from '@mui/material'
import ProductCard from '../product/ProductCard'
import type { Product } from '../../types'

interface Props {
  products: Product[]
}

const RelatedProducts = ({ products }: Props) => {
  if (products.length === 0) return null

  return (
    <Box>
      <Typography sx={{ fontSize: 19, fontWeight: 800, mb: 2 }}>Related Products</Typography>
      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid size={{ xs: 6, md: 3 }} key={p.id}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default RelatedProducts
