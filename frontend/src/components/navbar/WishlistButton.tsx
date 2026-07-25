import { Link } from 'react-router-dom'
import { Button, Badge } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'

interface Props {
  count: number
}

const WishlistButton = ({ count }: Props) => (
  <Button
    component={Link}
    to="/wishlist"
    startIcon={
      <Badge badgeContent={count} color="secondary" max={99}>
        <FavoriteBorderOutlinedIcon />
      </Badge>
    }
    sx={{
      color: 'text.secondary',
      textTransform: 'none',
      fontWeight: 500,
      display: { xs: 'none', sm: 'inline-flex' },
      '&:hover': { bgcolor: 'error.50', color: 'error.main' },
    }}
  >
    Wishlist
  </Button>
)

export default WishlistButton
