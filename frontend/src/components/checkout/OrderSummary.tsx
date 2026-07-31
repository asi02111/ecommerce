import { Paper, Typography, Box, Divider } from '@mui/material'
import type { CartItem } from '../../types/checkout'

interface Props {
  cartItems: CartItem[]
  subtotal:  number
  shipping:  number
  total:     number
}

const OrderSummary = ({ cartItems, subtotal, shipping, total }: Props) => (
  <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5, position: 'sticky', top: 96 }}>
    <Typography sx={{ fontWeight: 800, fontSize: 15, mb: 2 }}>Order Summary</Typography>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, mb: 2 }}>
      {cartItems.map((item, i) => (
        <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <Box sx={{ position: 'relative' }}>
            <Box component="img" src={item.product.image} alt="" sx={{ width: 38, height: 38, borderRadius: 1.5, objectFit: 'cover', bgcolor: 'grey.100' }} />
            <Box sx={{ position: 'absolute', top: -6, right: -6, width: 16, height: 16, borderRadius: '50%', bgcolor: 'primary.main', color: '#fff', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.quantity}
            </Box>
          </Box>
          <Typography sx={{ flex: 1, fontSize: 12, color: 'text.secondary' }} noWrap>{item.product.name}</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>৳{(item.product.price * item.quantity).toLocaleString()}</Typography>
        </Box>
      ))}
    </Box>

    <Divider sx={{ mb: 1.5 }} />

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">Subtotal</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>৳{subtotal.toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">Shipping</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: shipping === 0 ? 'success.main' : 'text.primary' }}>
          {shipping === 0 ? 'FREE' : `৳${shipping}`}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 800 }}>Total</Typography>
        <Typography sx={{ fontWeight: 800 }}>৳{total.toLocaleString()}</Typography>
      </Box>
    </Box>

    <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
      {[
        { icon: '🔒', text: 'Secure checkout' },
        { icon: '🔄', text: '7-day easy returns' },
        { icon: '🚚', text: 'Fast delivery' },
      ].map((b, i) => (
        <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: 13 }}>{b.icon}</Typography>
          <Typography variant="caption" color="text.disabled">{b.text}</Typography>
        </Box>
      ))}
    </Box>
  </Paper>
)

export default OrderSummary
