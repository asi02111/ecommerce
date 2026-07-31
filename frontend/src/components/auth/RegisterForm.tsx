import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Checkbox, FormControlLabel } from '@mui/material'
import { Input, Button } from '../common'
import { useAuth, useToast } from '../../hooks/useStore'

interface Props {
  onSuccess: () => void
  onSwitchTab: () => void
}

const initialData = { name: '', email: '', phone: '', password: '', confirmPassword: '' }

const RegisterForm = ({ onSuccess, onSwitchTab }: Props) => {
  const { login } = useAuth()
  const { success } = useToast()

  const [data,   setData]   = useState(initialData)
  const [errors, setErrors] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = { ...initialData }
    let valid = true
    if (!data.name.trim()) { errs.name = 'Full name is required'; valid = false }
    if (!data.email) { errs.email = 'Email is required'; valid = false }
    else if (!/\S+@\S+\.\S+/.test(data.email)) { errs.email = 'Enter a valid email'; valid = false }
    if (!data.phone || !/^01[3-9]\d{8}$/.test(data.phone)) { errs.phone = 'Enter a valid BD phone number'; valid = false }
    if (!data.password) { errs.password = 'Password is required'; valid = false }
    else if (data.password.length < 6) { errs.password = 'Min. 6 characters'; valid = false }
    if (data.password !== data.confirmPassword) { errs.confirmPassword = 'Passwords do not match'; valid = false }
    setErrors(errs)
    return valid
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000)) // পরে real register API আসবে
    await login(data.email, data.password)
    setLoading(false)
    success('Account created! Welcome to ShopBD 🎉')
    onSuccess()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Input
        label="Full Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        placeholder="Rahim Khan"
        error={errors.name}
      />
      <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder="you@example.com"
        error={errors.email}
      />

      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>Phone Number</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2.5, px: 2, display: 'flex', alignItems: 'center', bgcolor: 'grey.50', fontSize: 14, color: 'text.secondary' }}>
            +880
          </Box>
          <Box sx={{ flex: 1 }}>
            <Input
              type="tel"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              error={errors.phone}
            />
          </Box>
        </Box>
      </Box>

      <Input
        label="Password"
        type="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
        placeholder="Min. 6 characters"
        error={errors.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={data.confirmPassword}
        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
        placeholder="Re-enter password"
        error={errors.confirmPassword}
      />

      <FormControlLabel
        control={<Checkbox size="small" />}
        label={
          <Typography variant="body2">
            I agree to the{' '}
            <Box component={Link} to="/terms" sx={{ color: 'primary.main' }}>Terms</Box>{' '}
            and{' '}
            <Box component={Link} to="/privacy" sx={{ color: 'primary.main' }}>Privacy Policy</Box>
          </Typography>
        }
      />

      <Button fullWidth loading={loading} onClick={handleSubmit}>Create Account</Button>

      <Typography variant="body2" align="center" color="text.secondary">
        Already have an account?{' '}
        <Box component="span" onClick={onSwitchTab} sx={{ color: 'primary.main', fontWeight: 700, cursor: 'pointer' }}>
          Login
        </Box>
      </Typography>
    </Box>
  )
}

export default RegisterForm
