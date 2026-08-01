import { Route } from 'react-router-dom'
import CheckoutPage from '../pages/CheckoutPage'
import OrdersPage   from '../pages/OrdersPage'
import ProfilePage  from '../pages/ProfilePage'
import WishlistPage from '../pages/WishlistPage'

// Login বাধ্যতামূলক এমন সব route — AppRoutes.tsx এ <ProtectedRoute /> wrapper এর ভেতরে বসে।
// একইভাবে {ProtectedRoutes()} হিসেবে function call করে বসাতে হবে, JSX component না।
const ProtectedRoutes = () => (
  <>
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/orders"   element={<OrdersPage />} />
    <Route path="/profile"  element={<ProfilePage />} />
    <Route path="/wishlist" element={<WishlistPage />} />
  </>
)

export default ProtectedRoutes
