import { Link } from 'react-router-dom'
import { Paper, Typography, Box, Divider } from '@mui/material'
import { Button } from '../common'

interface Props {
  itemCount: number
  subtotal:  number
  discount:  number
  shipping:  number
  total:     number
}

const paymentMethods = ['💳 Visa', '💳 Mastercard', '🏦 bKash', '🏦 Nagad', '🏦 Rocket']

const Row = ({ label, value, color }: { label: string; value: string; color?: string }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 14 }}>
    <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{label}</Typography>
    <Typography sx={{ fontWeight: 600, color: color ?? 'text.primary' }}>{value}</Typography>
  </Box>
)

const CartOrderSummary = ({ itemCount, subtotal, discount, shipping, total }: Props) => (
  <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5, position: 'sticky', top: 96 }}>
    <Typography sx={{ fontWeight: 800, fontSize: 15, mb: 2 }}>Order Summary</Typography>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
      <Row label={`Subtotal (${itemCount} items)`} value={`৳${subtotal.toLocaleString()}`} />
      {discount > 0 && <Row label="Discount (SHOPBD10)" value={`-৳${discount.toLocaleString()}`} color="#16A34A" />}
      <Row label="Shipping" value={shipping === 0 ? 'FREE' : `৳${shipping}`} color={shipping === 0 ? '#16A34A' : undefined} />

      {shipping > 0 && (
        <Typography variant="caption" sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1.5, color: 'text.disabled' }}>
          Add ৳{(999 - subtotal).toLocaleString()} more for free shipping
        </Typography>
      )}

      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16 }}>Total</Typography>
        <Typography sx={{ fontWeight: 800, fontSize: 16 }}>৳{total.toLocaleString()}</Typography>
      </Box>
    </Box>

    <Box component={Link} to="/checkout" sx={{ textDecoration: 'none', display: 'block', mt: 2.5 }}>
      <Button fullWidth>Proceed to Checkout →</Button>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.8, flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
      {paymentMethods.map((m) => (
        <Box key={m} sx={{ fontSize: 11, bgcolor: 'grey.100', color: 'text.secondary', px: 1, py: 0.4, borderRadius: 1.5 }}>
          {m}
        </Box>
      ))}
    </Box>
  </Paper>
)

export default CartOrderSummary
