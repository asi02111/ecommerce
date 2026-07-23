import { Box, Paper, Typography, TextField, Button,  Alert, Grid } from '@mui/material'
import SaveOutlinedIcon  from '@mui/icons-material/SaveOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

interface Props {
  name:     string
  email:    string
  phone:    string
  saving:   boolean
  onNameChange:  (v: string) => void
  onPhoneChange: (v: string) => void
  onSave:   () => void
  onDiscard:() => void
  onLogout: () => void
}

// Stat card — reusable mini component
// const StatCard = ({ icon, value, label }: { icon: string; value: string; label: string }) => (
//   <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2, textAlign: 'center', transition: '.2s', '&:hover': { borderColor: 'primary.main', transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(79,70,229,.1)' } }}>
//     <Typography sx={{ fontSize: 26 }}>{icon}</Typography>
//     <Typography sx={{ fontWeight: 800, fontSize: 18, mt: 0.5 }}>{value}</Typography>
//     <Typography variant="caption" color="text.secondary">{label}</Typography>
//   </Paper>
// )

const ProfileInfoTab = ({ name, email, phone, saving, onNameChange, onPhoneChange, onSave, onDiscard, onLogout }: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

    {/* Stats */}
    {/* <Grid container spacing={2}>
      {[
        { icon: '📦', value: '12',    label: 'Total Orders' },
        { icon: '🤍', value: '5',     label: 'Wishlist'     },
        { icon: '💳', value: '৳24k',  label: 'Total Spent'  },
        { icon: '⭐', value: '8',     label: 'Reviews'      },
      ].map((s) => (
        <Grid sx={{ xs: 6, md: 3 }} key={s.label}>
          <StatCard {...s} />
        </Grid>
      ))}
    </Grid> */}

    {/* Personal Info */}
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 3 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 2 }}>Personal Information</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
        Update your name and contact details
      </Typography>

      <Grid container spacing={2.5}>
        <Grid sx={{ xs: 12 }}>
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            fullWidth
            size="small"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }}>
          <TextField
            label="Email Address"
            value={email}
            disabled
            fullWidth
            size="small"
            helperText="Email cannot be changed"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }}>
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            fullWidth
            size="small"
            placeholder="01XXXXXXXXX"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          onClick={onSave}
          disabled={saving}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          variant="outlined"
          color="inherit"
          onClick={onDiscard}
          sx={{ borderRadius: 2, textTransform: 'none', color: 'text.secondary', borderColor: 'divider' }}
        >
          Discard
        </Button>
      </Box>
    </Paper>

    {/* Danger Zone */}
    <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'error.200', borderRadius: 3, p: 3 }}>
      <Typography sx={{ fontWeight: 800, fontSize: 14, color: 'error.main', mb: 2 }}>Danger Zone</Typography>
      <Alert severity="warning" sx={{ mb: 2, borderRadius: 2, fontSize: 12 }}>
        These actions are permanent and cannot be undone.
      </Alert>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<LogoutOutlinedIcon />}
          onClick={onLogout}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Logout
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          startIcon={<DeleteOutlineIcon />}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Delete Account
        </Button>
      </Box>
    </Paper>

  </Box>
)

export default ProfileInfoTab
