import { Route } from 'react-router-dom'
import HomePage          from '../pages/HomePage'
import ProductsPage      from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import CartPage          from '../pages/CartPage'
import AuthPage          from '../pages/AuthPage'
import NotFoundPage from '../pages/NotFoundPage'

// লগইন ছাড়াই দেখা যায় এমন সব route এখানে।
// NOTE: এটাকে <PublicRoutes /> হিসেবে JSX component না বসিয়ে {PublicRoutes()} হিসেবে
// function call করে বসাতে হবে AppRoutes.tsx এ — কারণ <Routes> এর direct child
// শুধু <Route> বা <Fragment> হতে পারে, custom component না।
const PublicRoutes = () => (
  <>
    <Route path="/"      element={<HomePage />} />
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<AuthPage />} />

    {/* Product listing — সব category একই ProductsPage এ যায়, URL দেখে filter হয় */}
    <Route path="/products"    element={<ProductsPage />} />
    <Route path="/men"         element={<ProductsPage />} />
    <Route path="/women"       element={<ProductsPage />} />
    <Route path="/electronics" element={<ProductsPage />} />
    <Route path="/sports"      element={<ProductsPage />} />
    <Route path="/home"        element={<ProductsPage />} />

    <Route path="/product/:id" element={<ProductDetailPage />} />
    <Route path="/cart"        element={<CartPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </>
)

export default PublicRoutes
