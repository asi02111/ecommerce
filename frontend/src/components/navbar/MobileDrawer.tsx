import { Link } from 'react-router-dom'
import {
  Drawer, Box, Avatar, Typography, Button, Accordion, AccordionSummary,
  AccordionDetails, List, ListItemButton, ListItemText, Divider,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { navbarCategories } from '../../data/navbarCategories'
import type { User } from '../../context/AuthContext'

interface Props {
  open: boolean
  onClose: () => void
  isLoggedIn: boolean
  user: User | null
  onLogout: () => void
}

const quickLinks = [
  { label: "🔥 Today's Deals", href: '/deals' },
  { label: '✨ New Arrivals', href: '/new-arrivals' },
  { label: '📦 My Orders', href: '/orders' },
  { label: '🤍 Wishlist', href: '/wishlist' },
  { label: '❓ Help', href: '/help' },
]

const MobileDrawer = ({ open, onClose, isLoggedIn, user, onLogout }: Props) => (
  <Drawer anchor="right" open={open} onClose={onClose} slotProps={{ paper: { sx: { width: 300 } } }}>

    {/* Auth section */}
    <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
      {isLoggedIn ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontWeight: 700 }}>
              {user?.name?.[0] ?? 'U'}
            </Avatar>
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{user?.name}</Typography>
          </Box>
          <Button size="small" color="error" onClick={onLogout} sx={{ textTransform: 'none' }}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Button component={Link} to="/login" onClick={onClose} fullWidth variant="outlined" sx={{ textTransform: 'none' }}>
            Login
          </Button>
          <Button component={Link} to="/register" onClick={onClose} fullWidth variant="contained" sx={{ textTransform: 'none' }}>
            Sign Up
          </Button>
        </Box>
      )}
    </Box>

    {/* Categories accordion */}
    <Box sx={{ flex: 1, overflowY: 'auto' }}>
      {navbarCategories.map((cat) => (
        <Accordion key={cat.label} disableGutters elevation={0} square sx={{ '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{cat.label}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: 'grey.50', pt: 0 }}>
            <List dense disablePadding>
              {cat.subcategories.map((sub) => (
                <ListItemButton key={sub.href} component={Link} to={sub.href} onClick={onClose} sx={{ py: 0.6 }}>
                  <ListItemText
                    primary={`› ${sub.label}`}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 13,
                          color: 'text.secondary',
                        },
                      },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>

    <Divider />

    {/* Quick links */}
    <List disablePadding sx={{ py: 1 }}>
      {quickLinks.map((link) => (
        <ListItemButton key={link.href} component={Link} to={link.href} onClick={onClose}>
          <ListItemText primary={link.label} slotProps={{ primary: { sx: { fontSize: 13.5 } } }} />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
)

export default MobileDrawer
