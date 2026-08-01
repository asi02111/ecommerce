import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useStore'

// Login না থাকলে /login এ পাঠিয়ে দেয়, সাথে "কোথা থেকে এসেছিল" state এ রাখে —
// পরে login সফল হলে সেই page এ ফিরিয়ে আনা যাবে (AuthPage এ চাইলে ব্যবহার করা যাবে)।
const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
