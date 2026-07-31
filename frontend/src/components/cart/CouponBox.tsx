import { useState } from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { Input, Button } from '../common'

interface Props {
  onApply: (code: string) => boolean   // true হলে coupon valid
}

const CouponBox = ({ onApply }: Props) => {
  const [code,    setCode]    = useState('')
  const [applied, setApplied] = useState(false)
  const [error,   setError]   = useState('')

  const handleApply = () => {
    const ok = onApply(code)
    if (ok) { setApplied(true); setError('') }
    else { setApplied(false); setError('Invalid coupon code') }
  }

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2.5 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1.5 }}>🎟️ Have a coupon?</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <Input
            value={code}
            onChange={(e) => { setCode(e.target.value); setError('') }}
            placeholder="Enter coupon code"
            error={error}
          />
        </Box>
        <Button onClick={handleApply}>Apply</Button>
      </Box>

      {applied && (
        <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600, mt: 1, display: 'block' }}>
          ✓ Coupon applied successfully!
        </Typography>
      )}

      <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
        Try: <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>SHOPBD10</Box> for 10% off
      </Typography>
    </Paper>
  )
}

export default CouponBox
