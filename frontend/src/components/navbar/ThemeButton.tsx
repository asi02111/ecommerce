import { Button } from '@mui/material'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'

interface Props {
  onClick: () => void
}

const ThemeButton = ({ onClick }: Props) => (
  <Button
    onClick={onClick}
    startIcon={<PaletteOutlinedIcon />}
    sx={{
      color: 'text.secondary',
      textTransform: 'none',
      fontWeight: 500,
      display: { xs: 'none', sm: 'inline-flex' },
      '&:hover': { bgcolor: 'primary.50', color: 'primary.main' },
    }}
  >
    Theme
  </Button>
)

export default ThemeButton
