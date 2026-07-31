import { Link } from 'react-router-dom'
import { Paper, Typography, Box } from '@mui/material'
import { Button } from '../common'
import type { Address, PaymentMethod, CartItem } from '../../types/checkout'

interface Props {
  address: Address
  paymentMethod: PaymentMethod
  cartItems: CartItem[]
  total: number
  onBack: () => void
  onPlaceOrder: () => void
}

const paymentLabel: Record<PaymentMethod, string> = {
  bkash: '📱 bKash', nagad: '📱 Nagad', card: '💳 Credit/Debit Card', cod: '💵 Cash on Delivery',
}

const OrderReview = ({ address, paymentMethod, cartItems, total, onBack, onPlaceOrder }: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 14 }}>📍 Delivery Address</Typography>
        <Typography variant="caption" onClick={onBack} sx={{ color: 'primary.main', cursor: 'pointer' }}>Edit</Typography>
      </Box>
      <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>{address.fullName}</Typography>
      <Typography variant="body2" color="text.secondary">{address.phone} · {address.email}</Typography>
      <Typography variant="body2" color="text.secondary">{address.address}, {address.district}, {address.division}</Typography>
    </Paper>

    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 14 }}>💳 Payment</Typography>
        <Typography variant="caption" onClick={onBack} sx={{ color: 'primary.main', cursor: 'pointer' }}>Edit</Typography>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{paymentLabel[paymentMethod]}</Typography>
    </Paper>

    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 14, mb: 1.5 }}>🛍️ Order Items</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {cartItems.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
            <Box component="img" src={item.product.image} alt={item.product.name} sx={{ width: 52, height: 52, borderRadius: 2, objectFit: 'cover', bgcolor: 'grey.100' }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }} noWrap>{item.product.name}</Typography>
              <Typography variant="caption" color="text.secondary">Size: {item.size} · Qty: {item.quantity}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, fontWeight: 700 }}>৳{(item.product.price * item.quantity).toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>

    <Button fullWidth variant="success" size="lg" onClick={onPlaceOrder}>
      ✅ Place Order — ৳{total.toLocaleString()}
    </Button>

    <Typography variant="caption" align="center" color="text.disabled">
      By placing this order you agree to our{' '}
      <Box component={Link} to="/terms" sx={{ color: 'primary.main' }}>Terms & Conditions</Box>
    </Typography>
  </Box>
)

export default OrderReview
