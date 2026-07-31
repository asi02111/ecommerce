import { Box, Typography } from '@mui/material'
import { sizes } from '../../hooks/useProductDetail'

interface Props {
  selected: string
  onSelect: (size: string) => void
}

const SizeSelector = ({ selected, onSelect }: Props) => (
  <Box>
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 1 }}>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>Select Size</Typography>
      <Typography variant="caption" sx={{ color: 'primary.main', cursor: 'pointer' }}>Size Guide</Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}>
      {sizes.map((size) => (
        <Box
          key={size}
          onClick={() => onSelect(size)}
          sx={{
            width: 44, height: 44, borderRadius: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid', cursor: 'pointer', fontSize: 13.5, fontWeight: 700,
            borderColor: selected === size ? 'primary.main' : 'divider',
            bgcolor: selected === size ? 'primary.main' : 'transparent',
            color: selected === size ? '#fff' : 'text.primary',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          {size}
        </Box>
      ))}
    </Box>
  </Box>
)

export default SizeSelector
