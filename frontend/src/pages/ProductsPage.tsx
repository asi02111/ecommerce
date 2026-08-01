import { Box, Container, Typography, Grid, Drawer, IconButton } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'
import { EmptyState } from '../components/common'
import ProductCard from '../components/product/ProductCard'
import FilterSidebar from '../components/products/FilterSidebar'
import SortDropdown from '../components/products/SortDropdown'
import { useProductFilters } from '../hooks/useProductFilters'

const ProductsPage = () => {
  const {
    filteredProducts, pageTitle,
    selectedCategories, toggleCategory,
    priceRange, setPriceRange,
    minRating, setMinRating,
    sortBy, setSortBy,
    clearFilters,
    mobileFilterOpen, setMobileFilterOpen,
  } = useProductFilters()

  const sidebarProps = {
    selectedCategories,
    onToggleCategory: toggleCategory,
    priceRange,
    onPriceChange: setPriceRange,
    minRating,
    onRatingChange: setMinRating,
    onClearFilters: clearFilters,
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800 }}>{pageTitle}</Typography>
            <Typography variant="body2" color="text.secondary">{filteredProducts.length} products found</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              onClick={() => setMobileFilterOpen(true)}
              sx={{ display: { md: 'none' }, border: '1px solid', borderColor: 'divider', borderRadius: 2.5 }}
            >
              <TuneIcon fontSize="small" />
            </IconButton>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </Box>
        </Box>

        <Grid container spacing={3}>

          {/* Desktop sidebar */}
          <Grid size={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 96, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5 }}>
              <FilterSidebar {...sidebarProps} />
            </Box>
          </Grid>

          {/* Product grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            {filteredProducts.length === 0 ? (
              <EmptyState icon="🔍" title="No products match your filters" description="Try adjusting the filters or clearing them." />
            ) : (
              <Grid container spacing={2}>
                {filteredProducts.map((product) => (
                  <Grid size={{ xs: 6, sm: 4, lg: 4 }} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>

      {/* Mobile filter drawer */}
      <Drawer anchor="left" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)}>
        <Box sx={{ width: 280, p: 2.5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ fontWeight: 800 }}>Filters</Typography>
            <IconButton size="small" onClick={() => setMobileFilterOpen(false)}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          <FilterSidebar {...sidebarProps} />
        </Box>
      </Drawer>
    </Box>
  )
}

export default ProductsPage
