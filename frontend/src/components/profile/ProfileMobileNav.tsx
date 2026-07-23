import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'
import ShoppingBagIcon   from '@mui/icons-material/ShoppingBagOutlined'
import LocationOnIcon    from '@mui/icons-material/LocationOnOutlined'
import FavoriteIcon      from '@mui/icons-material/FavoriteBorderOutlined'
import LockIcon          from '@mui/icons-material/LockOutlined'
import type { Tab }      from './ProfileSidebar'

interface Props {
  tab:      Tab
  onChange: (tab: Tab) => void
}

const mobileNavItems = [
  { id: 'profile'  as Tab, icon: <PersonOutlineIcon />, label: 'Info'      },
  { id: 'orders'   as Tab, icon: <ShoppingBagIcon />,   label: 'Orders'    },
  { id: 'address'  as Tab, icon: <LocationOnIcon />,    label: 'Address'   },
  { id: 'wishlist' as Tab, icon: <FavoriteIcon />,      label: 'Wishlist'  },
  { id: 'password' as Tab, icon: <LockIcon />,          label: 'Security'  },
]

const ProfileMobileNav = ({ tab, onChange }: Props) => (
  <Paper
    elevation={4}
    sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { md: 'none' }, zIndex: 50, borderTop: '1px solid', borderColor: 'divider' }}
  >
    <BottomNavigation
      value={tab}
      onChange={(_, val) => onChange(val as Tab)}
      sx={{ height: 64 }}
    >
      {mobileNavItems.map((item) => (
        <BottomNavigationAction
          key={item.id}
          label={item.label}
          value={item.id}
          icon={item.icon}
          sx={{
            minWidth: 0,
            fontSize: 11,
            '&.Mui-selected': { color: 'primary.main' },
            '& .MuiBottomNavigationAction-label': { fontSize: '10px !important' },
          }}
        />
      ))}
    </BottomNavigation>
  </Paper>
)

export default ProfileMobileNav
