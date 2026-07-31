import { Link } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import { Button } from '../common'
import type { Address, PaymentMethod } from '../../types/checkout'

interface Props {
  address: Address
  paymentMethod: PaymentMethod
  total: number
  orderNumber: string
}

const paymentLabel: Record<PaymentMethod, string> = {
  bkash: 'bKash', nagad: 'Nagad', card: 'Credit/Debit Card', cod: 'Cash on Delivery',
}

const OrderSuccess = ({ address, paymentMethod, total, orderNumber }: Props) => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, p: 5, maxWidth: 420, width: '100%', textAlign: 'center' }}>

      <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5 }}>
        <Typography sx={{ fontSize: 40 }}>✅</Typography>
      </Box>

      <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 1 }}>Order Placed!</Typography>
      <Typography variant="body2" color="text.secondary">
        Thank you, <b>{address.fullName}</b>!
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Your order <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main' }}>#{orderNumber}</Box> has been placed successfully.
      </Typography>

      <Box sx={{ bgcolor: 'grey.50', borderRadius: 2.5, p: 2, textAlign: 'left', mb: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {[
          { label: 'Order ID', value: `#${orderNumber}` },
          { label: 'Total',    value: `৳${total.toLocaleString()}` },
          { label: 'Payment',  value: paymentLabel[paymentMethod] },
          { label: 'Delivery', value: '3–5 business days' },
        ].map((row, i) => (
          <Box key={i} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 13 }}>
            <Typography variant="body2" color="text.secondary">{row.label}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>{row.value}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        <Link to="/" style={{ flex: 1, textDecoration: 'none' }}>
          <Button fullWidth variant="outline">Continue Shopping</Button>
        </Link>
        <Link to="/orders" style={{ flex: 1, textDecoration: 'none' }}>
          <Button fullWidth>Track Order</Button>
        </Link>
      </Box>
    </Paper>
  </Box>
)

export default OrderSuccess
