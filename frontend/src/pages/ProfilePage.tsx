import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { EmptyState, Button } from '../components/common'

import ProfileHero      from '../components/profile/ProfileHero'
import ProfileSidebar   from '../components/profile/ProfileSidebar'
import ProfileMobileNav from '../components/profile/ProfileMobileNav'

import ProfileInfoTab from '../components/profile/tabs/ProfileInfoTab'
import OrdersTab      from '../components/profile/tabs/OrdersTab'
import AddressTab     from '../components/profile/tabs/AddressTab'
import WishlistTab    from '../components/profile/tabs/WishlistTab'
import SecurityTab    from '../components/profile/tabs/SecurityTab'

import { useAuth }  from '../hooks/useStore'
import { useToast } from '../hooks/useStore'

import type { Tab } from '../components/profile/ProfileSidebar'

const ProfilePage = () => {
  const { user, isLoggedIn, logout, updateUser } = useAuth()
  const { success } = useToast()
  const navigate = useNavigate()

  const [tab,     setTab]     = useState<Tab>('profile')
  const [saving,  setSaving]  = useState(false)
  const [profile, setProfile] = useState({
    name:  user?.name  ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })

  if (!isLoggedIn) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <EmptyState
          icon="🔐"
          title="Please login to view profile"
          action={<Link to="/login"><Button>Login</Button></Link>}
        />
      </Box>
    )
  }

  const handleLogout = () => {
    logout()
    success('Logged out successfully')
    navigate('/')
  }

  const handleSaveProfile = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    updateUser({ name: profile.name, phone: profile.phone })
    setSaving(false)
    success('Profile updated!')
  }

  const renderTab = () => {
    switch (tab) {
      case 'profile':
        return (
          <ProfileInfoTab
            name={profile.name}
            email={profile.email}
            phone={profile.phone}
            saving={saving}
            onNameChange={(v)  => setProfile({ ...profile, name: v  })}
            onPhoneChange={(v) => setProfile({ ...profile, phone: v })}
            onSave={handleSaveProfile}
            onDiscard={() => setProfile({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' })}
            onLogout={handleLogout}
          />
        )
      case 'orders':   return <OrdersTab />
      case 'address':  return <AddressTab />
      case 'wishlist': return <WishlistTab />
      case 'password': return <SecurityTab />
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pb: { xs: 10, md: 6 } }}>

      {/* Hero Banner */}
      <ProfileHero
        name={user?.name  ?? ''}
        email={user?.email ?? ''}
        onLogout={handleLogout}
      />

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>

          {/* Desktop Sidebar */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <ProfileSidebar
              tab={tab}
              onChange={setTab}
              onLogout={handleLogout}
              username={user?.name  ?? ''}
              email={user?.email ?? ''}
            />
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            {renderTab()}
          </Box>

        </Box>
      </Container>

      {/* Mobile Bottom Nav */}
      <ProfileMobileNav tab={tab} onChange={setTab} />

    </Box>
  )
}

export default ProfilePage
