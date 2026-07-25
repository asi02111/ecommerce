import { Box, Paper, Avatar, Typography, Chip, Stack, IconButton, Tooltip } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined'
import StarBorderIcon from '@mui/icons-material/StarBorderOutlined'
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

interface Stat { icon: React.ReactNode; value: string; label: string }
interface Props {
  name: string
  email: string
  onLogout: () => void
}

const ProfileHero = ({ name, email, onLogout }: Props) => {
  const stats: Stat[] = [
    { icon: <ShoppingBagOutlinedIcon />, value: '12', label: 'Orders' },
    { icon: <FavoriteBorderIcon />, value: '5', label: 'Wishlist' },
    { icon: <StarBorderIcon />, value: '8', label: 'Reviews' },
    { icon: <PaymentOutlinedIcon />, value: '৳24k', label: 'Spent' },
  ]

  return (
    <Box sx={{ background: 'linear-gradient(135deg,#1e1b4b 0%,#312e81 40%,#4f46e5 100%)', position: 'relative', overflow: 'hidden', pb: 6 }}>
      {/* Background circles */}
      <Box sx={{ position: 'absolute', top: -100, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
      <Box sx={{ position: 'absolute', bottom: -80, left: -60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.04)' }} />

      <Box sx={{ maxWidth: '1152px', mx: 'auto', px: { xs: 2, md: 4 }, pt: 5 }}>
        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>

          {/* Cover */}
          <Box sx={{ height: 120, background: 'linear-gradient(90deg,#4f46e5,#7c3aed,#6366f1)' }} />

          <Box sx={{ px: { xs: 3, md: 5 }, pb: 4, mt: -7, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-end' }, gap: { xs: 2, md: 4 } }}>

            {/* Avatar */}
            <Box sx={{ position: 'relative', flexShrink: 0 }}>
              <Avatar sx={{ width: 120, height: 120, fontSize: 44, fontWeight: 800, bgcolor: '#eef2ff', color: '#4338ca', border: '5px solid white', boxShadow: '0 12px 32px rgba(0,0,0,.18)' }}>
                {name?.[0] ?? 'U'}
              </Avatar>
              <Tooltip title="Change photo">
                <IconButton size="small" sx={{ position: 'absolute', bottom: 6, right: 6, bgcolor: '#4f46e5', color: '#fff', border: '3px solid white', width: 32, height: 32, '&:hover': { bgcolor: '#4338ca' } }}>
                  <EditOutlinedIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mt: { xs: 1, md: 0 } }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }} >
                {name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {email}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1.5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Chip label="✓ Verified" color="success" size="small" />
                <Chip label="Member since 2025" variant="outlined" size="small" />
              </Stack>
            </Box>

            {/* Stats */}
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-end" },
                mt: { xs: 2, md: 0 },
                flexShrink: 0,
              }}
            >
              {stats.map((s) => (
                <Paper
                  key={s.label}
                  elevation={0}
                  sx={{
                    width: 88,
                    height: 88,
                    border: '1.5px solid #eef2ff',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.3,
                    transition: '.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 28px rgba(79,70,229,.12)',
                      borderColor: '#c7d2fe'
                    }
                  }}
                >
                  <Box color="primary.main">{s.icon}</Box>
                  <Typography sx={{ fontWeight: 800 }}>{s.value}</Typography>
                  <Typography variant="caption">{s.label}</Typography>
                </Paper>
              ))}
            </Stack>

            {/* Logout — desktop */}
            <Tooltip title="Logout">
              <IconButton onClick={onLogout} sx={{ display: { xs: 'none', md: 'flex' }, color: 'error.main', bgcolor: 'error.50', '&:hover': { bgcolor: 'error.100' }, alignSelf: 'flex-end', mb: 0.5 }}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>

          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default ProfileHero
