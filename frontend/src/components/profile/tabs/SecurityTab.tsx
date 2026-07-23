import { useState } from 'react'
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert, Divider, Stack } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import PhonelinkLockOutlinedIcon from '@mui/icons-material/PhonelinkLockOutlined'
import { useToast } from '../../../hooks/useStore'

const SecurityTab = () => {
  const { success } = useToast()
  const [saving, setSaving] = useState(false)
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false })

  const [data, setData] = useState({ current: '', newPass: '', confirm: '' })
  const [errors, setErrors] = useState({ current: '', newPass: '', confirm: '' })

  const toggle = (field: keyof typeof show) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }))

  const handleSubmit = async () => {
    const errs = { current: '', newPass: '', confirm: '' }
    let valid = true
    if (!data.current) { errs.current = 'Current password is required'; valid = false }
    if (data.newPass.length < 6) { errs.newPass = 'Min. 6 characters'; valid = false }
    if (data.newPass !== data.confirm) { errs.confirm = 'Passwords do not match'; valid = false }
    setErrors(errs)
    if (!valid) return

    setSaving(true)
    await new Promise((r) => setTimeout(r, 900))
    setSaving(false)
    success('Password changed successfully!')
    setData({ current: '', newPass: '', confirm: '' })
  }

  const inputSx = { '& .MuiOutlinedInput-root': { borderRadius: 2 } }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

      {/* Change Password */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
        <Stack sx={{ direction: "row", spacing: 1.5, alignItems: "center", mb: 0.5 }}>
          <LockOutlinedIcon color="primary" />
          <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Change Password</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }} >
          Use a strong password with at least 6 characters, including numbers and symbols.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, maxWidth: 420 }}>
          {(['current', 'newPass', 'confirm'] as const).map((field) => (
            <TextField
              key={field}
              label={field === 'current' ? 'Current Password' : field === 'newPass' ? 'New Password' : 'Confirm New Password'}
              type={show[field] ? 'text' : 'password'}
              value={data[field]}
              onChange={(e) => setData({ ...data, [field]: e.target.value })}
              error={!!errors[field]}
              helperText={errors[field]}
              fullWidth
              size="small"
              sx={inputSx}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => toggle(field)}
                        edge="end"
                      >
                        {show[field]
                          ? <VisibilityOffIcon fontSize="small" />
                          : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          ))}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={saving}
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, alignSelf: 'flex-start', px: 3 }}
          >
            {saving ? 'Updating...' : 'Update Password'}
          </Button>
        </Box>
      </Paper>

      {/* 2-Step Verification */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
        <Stack sx={{ direction: "row", spacing: 1.5, alignItems: "center", mb: 0.5 }}>
          <PhonelinkLockOutlinedIcon color="primary" />
          <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Two-Step Verification</Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          Add an extra layer of security to your account.
        </Typography>
        <Alert severity="info" sx={{ borderRadius: 2, mb: 2 }}>
          Two-factor authentication is currently <strong>disabled</strong>.
        </Alert>
        <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none' }}>
          Enable 2FA
        </Button>
      </Paper>

      {/* Active Sessions */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
        <Stack sx={{ direction: "row", spacing: 1.5, alignItems: "center", mb: 2 }}>
          <SecurityOutlinedIcon color="primary" />
          <Typography sx={{ fontWeight: 800, fontSize: 15 }}>Active Sessions</Typography>
        </Stack>

        {[
          { device: 'Chrome on Windows', location: 'Dhaka, Bangladesh', time: 'Active now', current: true },
          { device: 'Firefox on Android', location: 'Dhaka, Bangladesh', time: '2 hours ago', current: false },
        ].map((session, i) => (
          <Box key={i}>
            <Stack sx={{ direction: "row", alignItems: "center", justifyContent: "space-between", py: 1.5 }}>
              <Box>
                <Stack sx={{ direction: "row", spacing: 1, alignItems: "center" }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{session.device}</Typography>
                  {session.current && (
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: 'success.main' }} />
                  )}
                </Stack>
                <Typography variant="caption" color="text.secondary">{session.location} · {session.time}</Typography>
              </Box>
              {!session.current && (
                <Button size="small" color="error" sx={{ borderRadius: 2, textTransform: 'none', fontSize: 12 }}>
                  Revoke
                </Button>
              )}
            </Stack>
            {i < 1 && <Divider />}
          </Box>
        ))}
      </Paper>

    </Box>
  )
}

export default SecurityTab
