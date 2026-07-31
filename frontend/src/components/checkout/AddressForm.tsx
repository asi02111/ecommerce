import { Paper, Typography, Grid, Box } from '@mui/material'
import { Input, Select, Button } from '../common'
import type { Address, AddressErrors } from '../../types/checkout'

const divisionOptions = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna',
  'Sylhet', 'Barisal', 'Rangpur', 'Mymensingh',
].map((d) => ({ value: d, label: d }))

interface Props {
  address: Address
  errors:  AddressErrors
  onChange: (address: Address) => void
  onNext:   () => void
}

const AddressForm = ({ address, errors, onChange, onNext }: Props) => {
  const update = (field: keyof Address, value: string) => onChange({ ...address, [field]: value })

  return (
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 2.5 }}>📍 Delivery Address</Typography>

      <Grid container spacing={2}>
        <Grid size={12}>
          <Input label="Full Name" value={address.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Rahim Khan" error={errors.fullName} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="Phone" type="tel" value={address.phone} onChange={(e) => update('phone', e.target.value)} placeholder="01XXXXXXXXX" error={errors.phone} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="Email" type="email" value={address.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" error={errors.email} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Select label="Division" value={address.division} onChange={(e) => update('division', e.target.value)} options={divisionOptions} placeholder="Select Division" error={errors.division} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="District" value={address.district} onChange={(e) => update('district', e.target.value)} placeholder="e.g. Dhaka" error={errors.district} />
        </Grid>
        <Grid size={12}>
          <Input label="Street Address" value={address.address} onChange={(e) => update('address', e.target.value)} placeholder="House no, road, area..." multiline rows={2} error={errors.address} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Input label="Postal Code (optional)" value={address.postalCode} onChange={(e) => update('postalCode', e.target.value)} placeholder="1200" />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button fullWidth onClick={onNext}>Continue to Payment →</Button>
      </Box>
    </Paper>
  )
}

export default AddressForm
