import {
  Box, Typography, Checkbox, FormControlLabel, Slider,
  Accordion, AccordionSummary, AccordionDetails, Switch,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, Badge } from '../common'
import { allCategories, allBadges, discountThresholds } from '../../hooks/useProductFilters'

interface Props {
  selectedCategories: string[]
  onToggleCategory: (cat: string) => void
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  minRating: number
  onRatingChange: (rating: number) => void
  minDiscount: number
  onDiscountChange: (discount: number) => void
  selectedBadges: string[]
  onToggleBadge: (badge: string) => void
  inStockOnly: boolean
  onInStockChange: (val: boolean) => void
  activeFilterCount: number
  onClearFilters: () => void
}

const badgeVariant = (b: string): 'red' | 'orange' | 'indigo' => (b === 'Sale' ? 'red' : b === 'Hot' ? 'orange' : 'indigo')
const ratingOptions = [4, 3, 2, 1]

// প্রতিটা filter section এক-একটা Accordion — জিনিস বেশি হওয়ায় collapse করে রাখা হয়েছে,
// scroll কম লাগবে আর কোনটা দরকার সেটাই খুলে দেখা যাবে।
const Section = ({ title, defaultExpanded = true, children }: { title: string; defaultExpanded?: boolean; children: React.ReactNode }) => (
  <Accordion disableGutters elevation={0} defaultExpanded={defaultExpanded} sx={{ '&:before': { display: 'none' }, border: 'none' }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0, minHeight: 36, '& .MuiAccordionSummary-content': { my: 0.5 } }}>
      <Typography sx={{ fontWeight: 700, fontSize: 13.5 }}>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ px: 0, pt: 0, pb: 1.5 }}>{children}</AccordionDetails>
  </Accordion>
)

const FilterSidebar = ({
  selectedCategories, onToggleCategory,
  priceRange, onPriceChange,
  minRating, onRatingChange,
  minDiscount, onDiscountChange,
  selectedBadges, onToggleBadge,
  inStockOnly, onInStockChange,
  activeFilterCount, onClearFilters,
}: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Filters</Typography>
        {activeFilterCount > 0 && <Badge variant="indigo" size="sm">{activeFilterCount}</Badge>}
      </Box>
      {activeFilterCount > 0 && (
        <Typography variant="caption" onClick={onClearFilters} sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}>
          Clear All
        </Typography>
      )}
    </Box>

    {/* Availability — সবার উপরে, দ্রুত toggle */}
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>In Stock Only</Typography>
      <Switch size="small" checked={inStockOnly} onChange={(e) => onInStockChange(e.target.checked)} />
    </Box>

    <Section title="Category">
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {allCategories.map((cat) => (
          <FormControlLabel
            key={cat}
            control={<Checkbox size="small" checked={selectedCategories.includes(cat)} onChange={() => onToggleCategory(cat)} />}
            label={<Typography variant="body2">{cat}</Typography>}
          />
        ))}
      </Box>
    </Section>

    <Section title="Price Range">
      <Slider
        value={priceRange}
        onChange={(_, val) => onPriceChange(val as [number, number])}
        min={0}
        max={5000}
        step={100}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => `৳${v}`}
        sx={{ mx: 0.5, mt: 1 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">৳{priceRange[0]}</Typography>
        <Typography variant="caption" color="text.secondary">৳{priceRange[1]}</Typography>
      </Box>
    </Section>

    <Section title="Discount">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
        {discountThresholds.map((d) => (
          <Box
            key={d}
            onClick={() => onDiscountChange(minDiscount === d ? 0 : d)}
            sx={{
              px: 1, py: 0.6, borderRadius: 1.5, cursor: 'pointer',
              bgcolor: minDiscount === d ? 'primary.50' : 'transparent',
              '&:hover': { bgcolor: 'grey.50' },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: minDiscount === d ? 700 : 400, color: minDiscount === d ? 'primary.main' : 'text.primary' }}>
              {d}% off or more
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>

    <Section title="Rating">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
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
    </Section>

    <Section title="Special Offers" defaultExpanded={false}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {allBadges.map((badge) => (
          <FormControlLabel
            key={badge}
            control={<Checkbox size="small" checked={selectedBadges.includes(badge)} onChange={() => onToggleBadge(badge)} />}
            label={
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <Badge variant={badgeVariant(badge)} size="sm">{badge}</Badge>
              </Box>
            }
          />
        ))}
      </Box>
    </Section>

    <Button variant="outline" fullWidth onClick={onClearFilters} sx={{ mt: 1 }}>
      Reset All Filters
    </Button>
  </Box>
)

export default FilterSidebar