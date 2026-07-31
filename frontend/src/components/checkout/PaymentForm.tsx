import { useState } from 'react'
import { Paper, Typography, Box, Grid } from '@mui/material'
import { Input, Button } from '../common'
import type { PaymentMethod, CardInfo } from '../../types/checkout'

interface Props {
  paymentMethod: PaymentMethod
  total: number
  onMethodChange: (method: PaymentMethod) => void
  onNext: () => void
  onBack: () => void
}

const paymentOptions = [
  { id: 'bkash', label: 'bKash',            icon: '📱', color: '#DB2777' },
  { id: 'nagad', label: 'Nagad',            icon: '📱', color: '#EA580C' },
  { id: 'card',  label: 'Card',             icon: '💳', color: '#2563EB' },
  { id: 'cod',   label: 'Cash on Delivery', icon: '💵', color: '#16A34A' },
] as const

const PaymentForm = ({ paymentMethod, total, onMethodChange, onNext, onBack }: Props) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({ number: '', name: '', expiry: '', cvv: '' })

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 2.5 }}>💳 Payment Method</Typography>

      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {paymentOptions.map((option) => (
          <Grid size={{ xs: 6, sm: 3 }} key={option.id}>
            <Box
              onClick={() => onMethodChange(option.id)}
              sx={{
                p: 1.5, borderRadius: 2.5, border: '2px solid', textAlign: 'center', cursor: 'pointer',
                borderColor: paymentMethod === option.id ? 'primary.main' : 'divider',
                bgcolor: paymentMethod === option.id ? 'primary.50' : 'transparent',
                '&:hover': { borderColor: 'grey.400' },
              }}
            >
              <Typography sx={{ fontSize: 24 }}>{option.icon}</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: option.color, mt: 0.3 }}>{option.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
        <Box sx={{ bgcolor: '#FDF2F8', p: 2, borderRadius: 2.5, mb: 3, border: '1px solid #FBCFE8' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#BE185D' }}>
            📱 {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Payment
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#BE185D', mt: 0.5 }}>
            Send to: <b>01700-000000</b>
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#BE185D' }}>
            Amount: <b>৳{total.toLocaleString()}</b>
          </Typography>
          <Box sx={{ mt: 1.5 }}>
            <Input placeholder="Enter Transaction ID" />
          </Box>
        </Box>
      )}

      {paymentMethod === 'card' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <Input label="Card Number" value={cardInfo.number} onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })} placeholder="1234 5678 9012 3456" slotProps={{ htmlInput: { maxLength: 19 } }} />
          <Input label="Cardholder Name" value={cardInfo.name} onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })} placeholder="RAHIM KHAN" />
          <Grid container spacing={2}>
            <Grid size={6}>
              <Input label="Expiry" value={cardInfo.expiry} onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })} placeholder="MM / YY" slotProps={{ htmlInput: { maxLength: 7 } }} />
            </Grid>
            <Grid size={6}>
              <Input label="CVV" type="password" value={cardInfo.cvv} onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })} placeholder="•••" slotProps={{ htmlInput: { maxLength: 4 } }} />
            </Grid>
          </Grid>
        </Box>
      )}

      {paymentMethod === 'cod' && (
        <Box sx={{ bgcolor: '#F0FDF4', p: 2, borderRadius: 2.5, mb: 3, border: '1px solid #BBF7D0' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: '#15803D' }}>💵 Cash on Delivery</Typography>
          <Typography sx={{ fontSize: 13, color: '#15803D', mt: 0.5 }}>
            Pay ৳{total.toLocaleString()} when your order arrives. Available inside Dhaka only.
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <Button fullWidth onClick={onNext}>Review Order →</Button>
      </Box>
    </Paper>
  )
}

export default PaymentForm
