import { Link } from 'react-router-dom'
import { Box, Button, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import type { User } from '../../context/AuthContext'

interface Props {
  isLoggedIn: boolean
  user:       User | null
  anchorEl:   HTMLElement | null
  onOpen:     (e: React.MouseEvent<HTMLElement>) => void
  onClose:    () => void
  onLogout:   () => void
}

const menuItems = [
  { icon: <PersonOutlineIcon fontSize="small" />,       label: 'My Profile', to: '/profile'  },
  { icon: <ShoppingBagOutlinedIcon fontSize="small" />, label: 'My Orders',  to: '/orders'   },
  { icon: <FavoriteBorderOutlinedIcon fontSize="small" />, label: 'Wishlist', to: '/wishlist' },
]

const UserMenu = ({ isLoggedIn, user, anchorEl, onOpen, onClose, onLogout }: Props) => {
  if (!isLoggedIn) {
    return (
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, ml: 0.5 }}>
        <Button component={Link} to="/login" sx={{ textTransform: 'none', fontWeight: 500 }}>
          Login
        </Button>
        <Button component={Link} to="/register" variant="contained" sx={{ textTransform: 'none', fontWeight: 600 }}>
          Sign Up
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Button
        onClick={onOpen}
        startIcon={
          <Avatar sx={{ width: 28, height: 28, fontSize: 13, fontWeight: 700, bgcolor: 'primary.main' }}>
            {user?.name?.[0] ?? 'U'}
          </Avatar>
        }
        sx={{ color: 'text.primary', textTransform: 'none', fontWeight: 500 }}
      >
        {user?.name?.split(' ')[0]}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { borderRadius: 2.5, minWidth: 200, mt: 1 } } }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{user?.name}</Typography>
          <Typography variant="caption" color="text.secondary">{user?.email}</Typography>
        </Box>
        <Divider />

        {menuItems.map((item) => (
          <MenuItem key={item.to} component={Link} to={item.to} onClick={onClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: 13.5 } } }} />
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={onLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon><LogoutOutlinedIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText primary="Logout" slotProps={{ primary: { sx: { fontSize: 13.5 } } }} />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu
