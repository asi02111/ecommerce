import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Box, Container, Paper, Typography, Tabs, Tab } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import LoginForm    from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { useAuth } from '../hooks/useStore'

type Tab_ = 'login' | 'register'

const AuthPage = () => {
  const location = useLocation()
  const navigate  = useNavigate()
  const theme     = useTheme()
  const { isLoggedIn } = useAuth()

  const [tab, setTab] = useState<Tab_>('login')

  useEffect(() => {
    setTab(location.pathname === '/register' ? 'register' : 'login')
  }, [location.pathname])

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn, navigate])

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', alignItems: 'center', py: 8 }}>
      <Container maxWidth="xs">

        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography component={Link} to="/" sx={{ fontSize: 30, fontWeight: 800, color: theme.palette.primary.main, textDecoration: 'none' }}>
            Shop<span style={{ color: theme.palette.text.primary }}>BD</span>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {tab === 'login' ? 'Welcome back! Please login.' : 'Create your account to start shopping.'}
          </Typography>
        </Box>

        {/* Card */}
        <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, p: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{ mb: 3, minHeight: 40, '& .MuiTabs-indicator': { height: 3, borderRadius: 3 } }}
          >
            <Tab label="Login"    value="login"    sx={{ minHeight: 40, fontWeight: 700, textTransform: 'none' }} />
            <Tab label="Register" value="register" sx={{ minHeight: 40, fontWeight: 700, textTransform: 'none' }} />
          </Tabs>

          {tab === 'login' ? (
            <LoginForm onSuccess={() => navigate('/')} onSwitchTab={() => setTab('register')} />
          ) : (
            <RegisterForm onSuccess={() => navigate('/')} onSwitchTab={() => setTab('login')} />
          )}
        </Paper>

        <Typography align="center" variant="body2" sx={{ mt: 3 }}>
          <Box component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
            ← Back to ShopBD
          </Box>
        </Typography>
      </Container>
    </Box>
  )
}

export default AuthPage
