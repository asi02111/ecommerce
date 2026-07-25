import { Box } from '@mui/material'
import TopBar         from '../navbar/TopBar'
import CategoryBar     from '../navbar/CategoryBar'
import MobileDrawer    from '../navbar/MobileDrawer'
import ThemeSwitcherDialog from '../common/ThemeSwitcherDialog'
import MainNavbar from './MainNavbar'
import { useNavbar } from '../../hooks/useNavbar'

// Navbar এখন শুধু orchestrator — নিজের কোনো markup detail নেই,
// শুধু useNavbar() থেকে state নিয়ে ছোট ছোট component এ ছড়িয়ে দেয়।
const Navbar = () => {
  const nav = useNavbar()

  return (
    <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 1100, boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
      <TopBar />
      <MainNavbar {...nav} />
      <CategoryBar
        activeCategory={nav.activeCategory}
        onEnter={nav.openMegaMenu}
        onLeave={nav.closeMegaMenuDelayed}
      />

      <MobileDrawer
        open={nav.drawerOpen}
        onClose={() => nav.setDrawerOpen(false)}
        isLoggedIn={nav.isLoggedIn}
        user={nav.user}
        onLogout={nav.handleLogout}
      />

      <ThemeSwitcherDialog
        open={nav.themeDialogOpen}
        onClose={() => nav.setThemeDialogOpen(false)}
      />
    </Box>
  )
}

export default Navbar
