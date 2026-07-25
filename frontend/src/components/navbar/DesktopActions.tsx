import { Box, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ThemeButton from './ThemeButton'
import WishlistButton from './WishlistButton'
import CartButton from './CartButton'
import UserMenu from './UserMenu'
import type { User } from '../../context/AuthContext'

interface Props {
  cartCount: number
  wishlistCount: number
  isLoggedIn: boolean
  user: User | null
  userMenuAnchor: HTMLElement | null
  drawerOpen: boolean
  onThemeOpen: () => void
  onUserMenuOpen: (e: React.MouseEvent<HTMLElement>) => void
  onUserMenuClose: () => void
  onLogout: () => void
  onMobileSearchToggle: () => void
  onDrawerToggle: () => void
}

// পুরো right-side action bar — desktop এ সব button label সহ, mobile এ শুধু icon
const DesktopActions = ({
  cartCount, wishlistCount, isLoggedIn, user, userMenuAnchor, drawerOpen,
  onThemeOpen, onUserMenuOpen, onUserMenuClose, onLogout,
  onMobileSearchToggle, onDrawerToggle,
}: Props) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 'auto', gap: 0.5 }}>
    {/* Mobile search icon */}
    <IconButton onClick={onMobileSearchToggle} sx={{ display: { md: 'none' }, color: 'text.secondary' }}>
      <SearchIcon />
    </IconButton>

    <ThemeButton onClick={onThemeOpen} />
    <WishlistButton count={wishlistCount} />
    <CartButton count={cartCount} />

    <UserMenu
      isLoggedIn={isLoggedIn}
      user={user}
      anchorEl={userMenuAnchor}
      onOpen={onUserMenuOpen}
      onClose={onUserMenuClose}
      onLogout={onLogout}
    />

    {/* Mobile hamburger */}
    <IconButton onClick={onDrawerToggle} sx={{ display: { md: 'none' }, color: 'text.secondary' }}>
      {drawerOpen ? <CloseIcon /> : <MenuIcon />}
    </IconButton>
  </Box>
)

export default DesktopActions
