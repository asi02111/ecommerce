import { Box, Typography } from '@mui/material'

interface Props {
  quantity: number
  price:    number
  onIncrease: () => void
  onDecrease: () => void
}

const QuantitySelector = ({ quantity, price, onIncrease, onDecrease }: Props) => (
  <Box>
    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Quantity</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '2px solid', borderColor: 'divider', borderRadius: 2.5, overflow: 'hidden' }}>
        <Box onClick={onDecrease} sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, fontWeight: 700, color: 'text.secondary', '&:hover': { bgcolor: 'grey.50' } }}>
          −
        </Box>
        <Typography sx={{ width: 48, textAlign: 'center', fontWeight: 700, fontSize: 13.5 }}>{quantity}</Typography>
        <Box onClick={onIncrease} sx={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, fontWeight: 700, color: 'text.secondary', '&:hover': { bgcolor: 'grey.50' } }}>
          +
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary">
        Total: <Box component="span" sx={{ fontWeight: 700, color: 'text.primary' }}>৳{(price * quantity).toLocaleString()}</Box>
      </Typography>
    </Box>
  </Box>
)

export default QuantitySelector
