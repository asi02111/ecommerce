import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Divider, Checkbox, FormControlLabel } from '@mui/material'
import { Input, Button } from '../common'
import { useAuth, useToast } from '../../hooks/useStore'

interface Props {
  onSuccess: () => void
  onSwitchTab: () => void
}

const LoginForm = ({ onSuccess, onSwitchTab }: Props) => {
  const { login } = useAuth()
  const { success, error: showError } = useToast()

  const [data,   setData]   = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const validate = () => {
    const errs = { email: '', password: '' }
    let valid = true
    if (!data.email) { errs.email = 'Email is required'; valid = false }
    else if (!/\S+@\S+\.\S+/.test(data.email)) { errs.email = 'Enter a valid email'; valid = false }
    if (!data.password) { errs.password = 'Password is required'; valid = false }
    else if (data.password.length < 6) { errs.password = 'Min. 6 characters'; valid = false }
    setErrors(errs)
    return valid
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    const ok = await login(data.email, data.password)
    setLoading(false)
    if (ok) { success('Welcome back!'); onSuccess() }
    else showError('Invalid email or password')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Input
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        placeholder="you@example.com"
        error={errors.email}
      />

      <Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>Password</Typography>
          <Typography component={Link} to="/forgot-password" variant="caption" sx={{ color: 'primary.main', textDecoration: 'none' }}>
            Forgot password?
          </Typography>
        </Box>
        <Input
          type={showPass ? 'text' : 'password'}
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="••••••••"
          error={errors.password}
          rightIcon={
            <Box component="span" sx={{ cursor: 'pointer' }} onClick={() => setShowPass(!showPass)}>
              {showPass ? '🙈' : '👁️'}
            </Box>
          }
        />
      </Box>

      <FormControlLabel control={<Checkbox size="small" />} label={<Typography variant="body2">Remember me</Typography>} />

      <Button fullWidth loading={loading} onClick={handleSubmit}>Login</Button>

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
        <Divider sx={{ flex: 1 }} />
        <Typography variant="caption" color="text.secondary">or continue with</Typography>
        <Divider sx={{ flex: 1 }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
        <Button variant="outline" fullWidth size="sm">🔵 Google</Button>
        <Button variant="outline" fullWidth size="sm">📘 Facebook</Button>
      </Box>

      <Typography variant="body2" align="center" color="text.secondary">
        Don't have an account?{' '}
        <Box component="span" onClick={onSwitchTab} sx={{ color: 'primary.main', fontWeight: 700, cursor: 'pointer' }}>
          Register now
        </Box>
      </Typography>
    </Box>
  )
}

export default LoginForm
