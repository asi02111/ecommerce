import { Box, InputBase, IconButton, Collapse } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  open:     boolean
  value:    string
  onChange: (v: string) => void
  onSearch: () => void
}

const MobileSearch = ({ open, value, onChange, onSearch }: Props) => (
  <Collapse in={open}>
    <Box sx={{ display: { md: 'none' }, px: 2, pb: 1.5 }}>
      <Box
        sx={{
          display: 'flex',
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 2.5,
          overflow: 'hidden',
        }}
      >
        <InputBase
          autoFocus={open}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Search products..."
          sx={{ flex: 1, px: 2, fontSize: 14 }}
        />
        <IconButton onClick={onSearch} sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 0, px: 2 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  </Collapse>
)

export default MobileSearch
