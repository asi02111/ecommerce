import { Paper, List, ListItemButton, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material'
import PersonOutlinedIcon  from '@mui/icons-material/PersonOutlined'
import ShoppingBagIcon     from '@mui/icons-material/ShoppingBagOutlined'
import LocationOnIcon      from '@mui/icons-material/LocationOnOutlined'
import FavoriteIcon        from '@mui/icons-material/FavoriteBorderOutlined'
import LockIcon            from '@mui/icons-material/LockOutlined'
import LogoutIcon          from '@mui/icons-material/LogoutOutlined'

export type Tab = 'profile' | 'orders' | 'address' | 'wishlist' | 'password'

const navItems = [
  { id: 'profile'  as Tab, icon: <PersonOutlinedIcon />, label: 'My Info'   },
  { id: 'orders'   as Tab, icon: <ShoppingBagIcon />,    label: 'Orders'    },
  { id: 'address'  as Tab, icon: <LocationOnIcon />,     label: 'Addresses' },
  { id: 'wishlist' as Tab, icon: <FavoriteIcon />,       label: 'Wishlist'  },
  { id: 'password' as Tab, icon: <LockIcon />,           label: 'Security'  },
]

interface Props {
  tab:      Tab
  onChange: (tab: Tab) => void
  onLogout: () => void
  username: string
  email:    string
}

const ProfileSidebar = ({ tab, onChange, onLogout, username, email }: Props) => (
  <Paper
    elevation={0}
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 3,
      overflow: 'hidden',
      position: 'sticky',
      top: 88,
      width: 220,
      flexShrink: 0,
    }}
  >
    {/* Mini user info */}
    <Box sx={{ px: 2.5, py: 2, bgcolor: 'primary.50', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Typography sx={{ fontWeight: 700, fontSize: 14 }} noWrap>{username}</Typography>
      <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>{email}</Typography>
    </Box>

    <List disablePadding>
      {navItems.map((item) => (
        <ListItemButton
          key={item.id}
          selected={tab === item.id}
          onClick={() => onChange(item.id)}
          sx={{
            py: 1.4,
            px: 2.5,
            '&.Mui-selected': {
              bgcolor: 'primary.50',
              color: 'primary.main',
              '& .MuiListItemIcon-root': { color: 'primary.main' },
            },
            '&.Mui-selected:hover': { bgcolor: 'primary.100' },
            '&:hover': { bgcolor: 'grey.50' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.label}
            slotProps={{
              primary: {
                style: {
                  fontSize: 13.5,
                  fontWeight: tab === item.id ? 700 : 500,
                },
              },
            }}
          />
          {tab === item.id && (
            <Box sx={{ width: 3, height: 20, bgcolor: 'primary.main', borderRadius: 2, ml: 1 }} />
          )}
        </ListItemButton>
      ))}
    </List>

    <Divider />

    <ListItemButton
      onClick={onLogout}
      sx={{
        py: 1.4,
        px: 2.5,
        color: 'error.main',
        '&:hover': { bgcolor: 'error.50' },
      }}
    >
      <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}><LogoutIcon /></ListItemIcon>
      <ListItemText
        primary="Logout"
        slotProps={{ primary: { style: { fontSize: 13.5, fontWeight: 500 } } }}
      />
    </ListItemButton>
  </Paper>
)

export { navItems }
export default ProfileSidebar