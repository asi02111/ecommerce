import { Box, Chip } from '@mui/material'

interface Props {
  categories: string[]
  active:     string
  onChange:   (cat: string) => void
}

const CategoryFilterTabs = ({ categories, active, onChange }: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1, mb: 3 }}>
    {categories.map((cat) => (
      <Chip
        key={cat}
        label={cat}
        onClick={() => onChange(cat)}
        color={active === cat ? 'primary' : 'default'}
        variant={active === cat ? 'filled' : 'outlined'}
        sx={{ fontWeight: 600, borderRadius: 5 }}
      />
    ))}
  </Box>
)

export default CategoryFilterTabs
