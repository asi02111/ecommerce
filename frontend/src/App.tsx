import { BrowserRouter } from 'react-router-dom'
import { AppThemeProvider } from './theme/ThemeContext'
import { AuthProvider }     from './context/AuthContext'
import { CartProvider }     from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider }    from './context/ToastContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'

import { Box } from '@mui/material'

// App.tsx এখন শুধু Provider stack + Layout + Routes — কোনো route detail এখানে নেই।
// নতুন page/route যোগ করতে হলে routes/PublicRoutes.tsx বা routes/ProtectedRoutes.tsx এ যাও।
function App() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <BrowserRouter>
                <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  <Navbar />
                  <Box component="main" sx={{ flex: 1 }}>
                    <AppRoutes />
                  </Box>
                  <Footer />
                </Box>
              </BrowserRouter>
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </AppThemeProvider>
  )
}

export default App