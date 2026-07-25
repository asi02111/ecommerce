import { Box, Container, Toolbar } from '@mui/material'
import Logo from '../navbar/Logo'
import type { UseNavbarReturn } from '../../hooks/useNavbar'
import DesktopSearch from '../navbar/DesktopSearch'
import DesktopActions from '../navbar/DesktopActions'
import MobileSearch from '../navbar/MobileSearch'

// useNavbar() hook এর পুরো return value props হিসেবে নেয় —
// এতে state এক জায়গায় থাকে (Navbar.tsx এ), কিন্তু UI ভাগ ভাগ component এ।
type Props = UseNavbarReturn

const MainNavbar = (props: Props) => (
  <Box sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters sx={{ gap: 2, py: 1 }}>
        <Logo />

        <DesktopSearch
          value={props.searchQuery}
          onChange={props.setSearchQuery}
          onSearch={props.handleSearch}
        />

        <DesktopActions
          cartCount={props.cartCount}
          wishlistCount={props.wishlistCount}
          isLoggedIn={props.isLoggedIn}
          user={props.user}
          userMenuAnchor={props.userMenuAnchor}
          drawerOpen={props.drawerOpen}
          onThemeOpen={() => props.setThemeDialogOpen(true)}
          onUserMenuOpen={(e) => props.setUserMenuAnchor(e.currentTarget)}
          onUserMenuClose={() => props.setUserMenuAnchor(null)}
          onLogout={props.handleLogout}
          onMobileSearchToggle={() => props.setMobileSearchOpen((v) => !v)}
          onDrawerToggle={() => props.setDrawerOpen((v) => !v)}
        />
      </Toolbar>
    </Container>

    <MobileSearch
      open={props.mobileSearchOpen}
      value={props.searchQuery}
      onChange={props.setSearchQuery}
      onSearch={props.handleSearch}
    />
  </Box>
)

export default MainNavbar
