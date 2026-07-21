import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Paper, Avatar, Typography, Chip, Stack } from '@mui/material'
import { Button, Input, Card, EmptyState, Badge } from '../components/common'
import { useAuth }  from '../hooks/useStore'
import { useToast } from '../hooks/useStore'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'

type Tab = 'profile' | 'address' | 'password' | 'orders' | 'wishlist'

const ProfilePage = () => {
  const { user, isLoggedIn, logout, updateUser } = useAuth()
  const { success, error: showError } = useToast()
  const navigate = useNavigate()

  const [tab, setTab] = useState<Tab>('profile')
  const [saving, setSaving] = useState(false)

  const [profileData, setProfileData] = useState({
    name:  user?.name  ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  })

  const [passwordData, setPasswordData] = useState({
    current: '', newPass: '', confirm: '',
  })
  const [passwordErrors, setPasswordErrors] = useState({
    current: '', newPass: '', confirm: '',
  })

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon="🔐"
          title="Please login to view profile"
          action={<Link to="/login"><Button>Login</Button></Link>}
        />
      </div>
    )
  }

  const handleSaveProfile = async () => {
    if (!profileData.name.trim()) { showError('Name is required'); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    updateUser({ name: profileData.name, phone: profileData.phone })
    setSaving(false)
    success('Profile updated!')
  }

  const handleChangePassword = async () => {
    const errors = { current: '', newPass: '', confirm: '' }
    let valid = true
    if (!passwordData.current) { errors.current = 'Required'; valid = false }
    if (passwordData.newPass.length < 6) { errors.newPass = 'Min. 6 characters'; valid = false }
    if (passwordData.newPass !== passwordData.confirm) { errors.confirm = 'Passwords do not match'; valid = false }
    setPasswordErrors(errors)
    if (!valid) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    success('Password changed!')
    setPasswordData({ current: '', newPass: '', confirm: '' })
  }

  const handleLogout = () => {
    logout()
    success('Logged out')
    navigate('/')
  }

  const navItems = [
    { id: 'profile'  as Tab, icon: '👤', label: 'My Info'    },
    { id: 'orders'   as Tab, icon: '📦', label: 'Orders'     },
    { id: 'address'  as Tab, icon: '📍', label: 'Addresses'  },
    { id: 'wishlist' as Tab, icon: '🤍', label: 'Wishlist'   },
    { id: 'password' as Tab, icon: '🔒', label: 'Security'   },
  ]

  // ── Demo stats ──
  const stats = [
    { label: 'Total Orders',  value: '12',   icon: '📦' },
    { label: 'Wishlist',      value: '5',    icon: '🤍' },
    { label: 'Total Spent',   value: '৳24k', icon: '💳' },
    { label: 'Reviews',       value: '8',    icon: '⭐' },
  ]

  // ── Tab content ──
  const renderContent = () => {
    switch (tab) {

      case 'profile':
        return (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((s) => (
                <Card key={s.label} padding="sm" className="text-center">
                  <p className="text-2xl mb-1">{s.icon}</p>
                  <p className="text-lg font-extrabold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </Card>
              ))}
            </div>

            {/* Form */}
            <Card padding="md">
              <h2 className="text-base font-extrabold text-gray-900 mb-1">Personal Information</h2>
              <p className="text-xs text-gray-400 mb-5">Update your name and contact details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Input
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="Rahim Khan"
                  />
                </div>
                <Input
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  disabled
                  hint="Email cannot be changed"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                />
              </div>
              <div className="mt-5 flex gap-3">
                <Button loading={saving} onClick={handleSaveProfile}>Save Changes</Button>
                <Button variant="ghost" onClick={() => setProfileData({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' })}>
                  Discard
                </Button>
              </div>
            </Card>

            {/* Danger zone */}
            <Card padding="md" className="border-red-100">
              <h2 className="text-sm font-extrabold text-red-600 mb-1">Danger Zone</h2>
              <p className="text-xs text-gray-400 mb-4">These actions are irreversible. Please be careful.</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="danger" size="sm" onClick={handleLogout}>🚪 Logout</Button>
                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600">Delete Account</Button>
              </div>
            </Card>
          </div>
        )

      case 'orders':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-gray-900">Recent Orders</h2>
              <Link to="/orders"><Button size="sm" variant="outline">View All</Button></Link>
            </div>
            {[
              { id: 'ORD-12345', date: '20 Jan 2025', total: 4750, status: 'delivered', items: 3 },
              { id: 'ORD-12289', date: '12 Jan 2025', total: 3200, status: 'shipped',   items: 1 },
              { id: 'ORD-12100', date: '5 Jan 2025',  total: 1100, status: 'pending',   items: 1 },
            ].map((order) => (
              <Card key={order.id} padding="md" hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.date} · {order.items} items</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={order.status === 'delivered' ? 'green' : order.status === 'shipped' ? 'indigo' : 'orange'}
                      dot
                    >
                      {order.status === 'delivered' ? 'Delivered' : order.status === 'shipped' ? 'Shipped' : 'Pending'}
                    </Badge>
                    <span className="text-sm font-bold text-gray-900">৳{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )

      case 'address':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-gray-900">Saved Addresses</h2>
              <Button size="sm" variant="outline">+ Add New</Button>
            </div>

            {/* Default address */}
            <Card padding="md" className="border-indigo-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                    <Badge variant="indigo">Default</Badge>
                  </div>
                  <p className="text-sm text-gray-600">House 12, Road 5, Gulshan-1</p>
                  <p className="text-sm text-gray-600">Dhaka, Dhaka Division — 1212</p>
                  <p className="text-sm text-gray-500 mt-1">{user?.phone}</p>
                </div>
                <span className="text-2xl">🏠</span>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                <Button size="sm" variant="outline">Edit</Button>
                <Button size="sm" variant="ghost">Remove</Button>
              </div>
            </Card>

            {/* Add new placeholder */}
            <button className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center gap-2 hover:border-indigo-300 hover:bg-indigo-50 transition-all group">
              <span className="text-3xl group-hover:scale-110 transition-transform">📍</span>
              <p className="text-sm font-medium text-gray-500 group-hover:text-indigo-600">Add New Address</p>
            </button>
          </div>
        )

      case 'wishlist':
        return (
          <div>
            <h2 className="text-base font-extrabold text-gray-900 mb-4">My Wishlist</h2>
            <EmptyState
              icon="🤍"
              title="Your wishlist is empty"
              description="Save items you love to find them easily later."
              action={<Link to="/"><Button>Explore Products</Button></Link>}
            />
          </div>
        )

      case 'password':
        return (
          <Card padding="md">
            <h2 className="text-base font-extrabold text-gray-900 mb-1">Change Password</h2>
            <p className="text-xs text-gray-400 mb-5">Make sure it's at least 6 characters long</p>
            <div className="space-y-4 max-w-sm">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                placeholder="••••••••"
                error={passwordErrors.current}
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData.newPass}
                onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                placeholder="Min. 6 characters"
                error={passwordErrors.newPass}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                placeholder="Re-enter new password"
                error={passwordErrors.confirm}
              />
              <Button loading={saving} onClick={handleChangePassword}>Update Password</Button>
            </div>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Profile Hero Banner ── */}
      <Box
  sx={{
    background: 'linear-gradient(135deg,#312E81 0%,#4F46E5 55%,#6366F1 100%)',
    position: 'relative',
    overflow: 'hidden',
    pb: 7,
  }}
>
  {/* Background Decoration */}
  <Box
    sx={{
      position: 'absolute',
      top: -120,
      right: -80,
      width: 320,
      height: 320,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.08)',
    }}
  />

  <Box
    sx={{
      position: 'absolute',
      bottom: -100,
      left: -80,
      width: 250,
      height: 250,
      borderRadius: '50%',
      background: 'rgba(255,255,255,.05)',
    }}
  />

  <Box sx={{ maxWidth: 'xl', mx: 'auto', px: 3, pt: 6 }}>
    <Paper
      elevation={0}
      sx={{
        borderRadius: 5,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <Box
        sx={{
          height: 110,
          background:
            'linear-gradient(90deg,#4F46E5,#6366F1)',
        }}
      />

      <Box
        sx={{
          px: 4,
          pb: 4,
          mt: -6,
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          alignItems: {
            xs: 'center',
            md: 'flex-end',
          },
          gap: 4,
        }}
      >
        {/* Avatar */}
        <Box sx={{ position: 'relative' }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              fontSize: 42,
              fontWeight: 700,
              bgcolor: '#EEF2FF',
              color: '#4338CA',
              border: '5px solid white',
              boxShadow: '0 15px 35px rgba(0,0,0,.15)',
            }}
          >
            {user?.name?.[0]}
          </Avatar>

          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              width: 34,
              height: 34,
              bgcolor: '#4F46E5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              border: '3px solid white',
            }}
          >
            <EditOutlinedIcon sx={{ fontSize: 18 }} />
          </Box>
        </Box>

        {/* User Info */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700 }}
          >
            {user?.name}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {user?.email}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}
          >
            <Chip
              label="Verified"
              color="success"
              size="small"
            />

            <Chip
              label="Member since 2025"
              variant="outlined"
              size="small"
            />
          </Stack>
        </Box>

        {/* Stats */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {[
            {
              icon: <ShoppingBagOutlinedIcon />,
              value: '12',
              label: 'Orders',
            },
            {
              icon: <FavoriteBorderOutlinedIcon />,
              value: '5',
              label: 'Wishlist',
            },
            {
              icon: <StarBorderOutlinedIcon />,
              value: '8',
              label: 'Reviews',
            },
          ].map((item) => (
            <Paper
              key={item.label}
              elevation={0}
              sx={{
                width: 95,
                height: 95,
                border: '1px solid #EEF2F7',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: '.25s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow:
                    '0 12px 30px rgba(0,0,0,.08)',
                },
              }}
            >
              <Box color="primary.main">
                {item.icon}
              </Box>

              <Typography
                sx={{ fontWeight: 700, mt: 1 }}
              >
                {item.value}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {item.label}
              </Typography>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Paper>
  </Box>
</Box>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">

          {/* ── Desktop Sidebar ── */}
          <aside className="hidden md:block w-56 shrink-0">
            <Card padding="sm" className="sticky top-24">
              <nav className="flex flex-col gap-0.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left w-full ${
                      tab === item.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                    {tab === item.id && <span className="ml-auto">›</span>}
                  </button>
                ))}
              </nav>

              <hr className="my-3 border-gray-100" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
              >
                🚪 Logout
              </button>
            </Card>
          </aside>

          {/* ── Main Content ── */}
          <main className="flex-1 min-w-0 pb-24 md:pb-0">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
        <div className="flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                tab === item.id
                  ? 'text-indigo-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className={`text-xl transition-transform ${tab === item.id ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {tab === item.id && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ProfilePage