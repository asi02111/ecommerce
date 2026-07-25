import { Box, InputBase, Select, MenuItem, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'

interface Props {
  value:    string
  onChange: (v: string) => void
  onSearch: () => void
}

const categoryOptions = ['All', 'Men', 'Women', 'Electronics', 'Sports']

const DesktopSearch = ({ value, onChange, onSearch }: Props) => {
  const [category, setCategory] = useState('All')

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flex: 1,
        maxWidth: 640,
        mx: 3,
        border: '2px solid',
        borderColor: 'primary.main',
        borderRadius: 2.5,
        overflow: 'hidden',
        '&:focus-within': { borderColor: 'primary.dark' },
      }}
    >
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        variant="standard"
        disableUnderline
        sx={{ bgcolor: 'grey.100', px: 1.5, fontSize: 13, borderRight: '1px solid', borderColor: 'divider' }}
      >
        {categoryOptions.map((c) => (
          <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>{c}</MenuItem>
        ))}
      </Select>

      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder="Search products, brands..."
        sx={{ flex: 1, px: 2, fontSize: 14 }}
      />

      <IconButton onClick={onSearch} sx={{ bgcolor: 'primary.main', color: '#fff', borderRadius: 0, px: 2.5, '&:hover': { bgcolor: 'primary.dark' } }}>
        <SearchIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default DesktopSearch
