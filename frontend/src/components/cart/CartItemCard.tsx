import { Link } from 'react-router-dom'
import { Paper, Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import type { CartItem } from '../../context/CartContext'

interface Props {
  item: CartItem
  onIncrease: () => void
  onDecrease: () => void
  onRemove:   () => void
}

const CartItemCard = ({ item, onIncrease, onDecrease, onRemove }: Props) => {
  const discount = Math.round(
    ((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100
  )

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>

        <Box component={Link} to={`/product/${item.product.id}`} sx={{ flexShrink: 0 }}>
          <Box
            component="img"
            src={item.product.image}
            alt={item.product.name}
            sx={{ width: 88, height: 88, borderRadius: 2.5, objectFit: 'cover', bgcolor: 'grey.100' }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1 }}>
            <Box>
              <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                {item.product.category}
              </Typography>
              <Typography
                component={Link}
                to={`/product/${item.product.id}`}
                sx={{ display: 'block', fontSize: 13.5, fontWeight: 600, color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
              >
                {item.product.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Size: <b>{item.size}</b>
              </Typography>
            </Box>
            <IconButton size="small" onClick={onRemove} sx={{ color: 'text.disabled', '&:hover': { color: 'error.main' } }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ fontWeight: 800 }}>৳{item.product.price.toLocaleString()}</Typography>
              {discount > 0 && (
                <>
                  <Typography variant="caption" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                    ৳{item.product.originalPrice.toLocaleString()}
                  </Typography>
                  <Box sx={{ fontSize: 11, fontWeight: 700, color: 'success.main', bgcolor: 'success.50', px: 0.7, borderRadius: 1 }}>
                    -{discount}%
                  </Box>
                </>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '1.5px solid', borderColor: 'divider', borderRadius: 2.5, overflow: 'hidden' }}>
              <IconButton size="small" onClick={onDecrease} sx={{ borderRadius: 0, width: 30, height: 30 }}>−</IconButton>
              <Typography sx={{ width: 28, textAlign: 'center', fontWeight: 700, fontSize: 13 }}>{item.quantity}</Typography>
              <IconButton size="small" onClick={onIncrease} sx={{ borderRadius: 0, width: 30, height: 30 }}>+</IconButton>
            </Box>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Item total: <b>৳{(item.product.price * item.quantity).toLocaleString()}</b>
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default CartItemCard
