import { Box, Typography, Checkbox, FormControlLabel, Slider, Divider } from '@mui/material'
import { Button } from '../common'
import { allCategories } from '../../hooks/useProductFilters'

interface Props {
  selectedCategories: string[]
  onToggleCategory: (cat: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  minRating: number
  onRatingChange: (rating: number) => void
  onClearFilters: () => void
}

const ratingOptions = [4, 3, 2, 1]

const FilterSidebar = ({
  selectedCategories, onToggleCategory,
  priceRange, onPriceChange,
  minRating, onRatingChange,
  onClearFilters,
}: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Filters</Typography>
      <Typography variant="caption" onClick={onClearFilters} sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}>
        Clear All
      </Typography>
    </Box>

    <Divider />

    {/* Category */}
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 13.5, mb: 1 }}>Category</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {allCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={
              <Checkbox
                size="small"
                checked={selectedCategories.includes(cat)}
                onChange={() => onToggleCategory(cat)}
              />
            }
            label={<Typography variant="body2">{cat}</Typography>}
          />
        ))}
      </Box>
    </Box>

    <Divider />

    {/* Price range */}
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 13.5, mb: 1.5 }}>Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={(_, val) => onPriceChange(val as [number, number])}
        min={0}
        max={5000}
        step={100}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `৳${v}`}
        sx={{ mx: 0.5 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">৳{priceRange[0]}</Typography>
        <Typography variant="caption" color="text.secondary">৳{priceRange[1]}</Typography>
      </Box>
    </Box>

    <Divider />

    {/* Rating */}
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: 13.5, mb: 1 }}>Minimum Rating</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {ratingOptions.map((r) => (
          <Box
            key={r}
            onClick={() => onRatingChange(minRating === r ? 0 : r)}
            sx={{
              display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 0.5, cursor: 'pointer',
              px: 1, py: 0.5, borderRadius: 1.5,
              bgcolor: minRating === r ? 'primary.50' : 'transparent',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Typography key={i} sx={{ fontSize: 13, color: i < r ? '#FBBF24' : 'grey.300' }}>★</Typography>
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>& up</Typography>
          </Box>
        ))}
      </Box>
    </Box>

    <Button variant="outline" fullWidth onClick={onClearFilters}>Reset Filters</Button>
  </Box>
)

export default FilterSidebar
