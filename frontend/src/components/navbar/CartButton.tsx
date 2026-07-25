import { Link } from 'react-router-dom'
import { Button, Badge, IconButton } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

interface Props {
  count: number
}

const CartButton = ({ count }: Props) => (
  <>
    {/* Desktop — labeled button */}
    <Button
      component={Link}
      to="/cart"
      startIcon={
        <Badge badgeContent={count} color="primary" max={99}>
          <ShoppingCartOutlinedIcon />
        </Badge>
      }
      sx={{
        display: { xs: 'none', sm: 'inline-flex' },
        color: 'text.secondary',
        textTransform: 'none',
        fontWeight: 500,
        '&:hover': { bgcolor: 'primary.50', color: 'primary.main' },
      }}
    >
      Cart
    </Button>

    {/* Mobile — icon only */}
    <IconButton component={Link} to="/cart" sx={{ display: { sm: 'none' }, color: 'text.secondary' }}>
      <Badge badgeContent={count} color="primary" max={99}>
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  </>
)

export default CartButton
