import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Typography, Grid } from '@mui/material'
import { products } from '../../data/products'
import ProductCard from './ProductCard'
import CategoryFilterTabs from './CategoryFilterTabs'
import { EmptyState } from '../common'

const categories = ['All', 'Men', 'Women', 'Electronics', 'Sports', 'Home & Living']

const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <Box component="section" sx={{ py: 3 }}>
      <Container maxWidth="xl">

        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: 'text.primary' }}>
              Featured Products
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
              Handpicked just for you
            </Typography>
          </Box>
          <Typography component={Link} to="/products" sx={{ fontSize: 13.5, fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}>
            View All →
          </Typography>
        </Box>

        <CategoryFilterTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />

        {/* Grid */}
        <Grid container spacing={2}>
          {filtered.map((product) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {filtered.length === 0 && (
          <EmptyState icon="🛍️" title="No products found" />
        )}
      </Container>
    </Box>
  )
}

export default ProductGrid