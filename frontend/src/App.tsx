import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider }     from './context/CartContext'
import { AuthProvider }     from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider }    from './context/ToastContext'
import { AppThemeProvider } from './theme/ThemeContext'

import Navbar  from './components/layout/Navbar'
import Footer  from './components/layout/Footer'

import HomePage          from './pages/HomePage'
import ProductsPage      from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage          from './pages/CartPage'
import CheckoutPage      from './pages/CheckoutPage'
import AuthPage          from './pages/AuthPage'
import OrdersPage        from './pages/OrdersPage'
import WishlistPage      from './pages/WishlistPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    // সব Provider এ wrap করা — যেকোনো component থেকে এখন context ব্যবহার করা যাবে
    <AppThemeProvider>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/"            element={<HomePage />} />
                    <Route path="/products"    element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart"        element={<CartPage />} />
                    <Route path="/checkout"    element={<CheckoutPage />} />
                    <Route path="/login"       element={<AuthPage />} />
                    <Route path="/register"    element={<AuthPage />} />
                    <Route path="/orders"      element={<OrdersPage />} />
                    <Route path="/profile"     element={<ProfilePage />} />
                    <Route path="/wishlist"    element={<WishlistPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
    </AppThemeProvider>
  )
}

export default App




// import './App.css'
// import Footer from './components/Footer'
// import HeroBanner from './components/HeroBanner'
// import Navbar from './components/Navbar'
// import ProductGrid from './components/ProductGrid'

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <HeroBanner />
//       <ProductGrid />
//       <Footer />
//     </div>
//   )
// }

// export default App


// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Footer from './components/layout/Footer'
// import HomePage from './pages/HomePage'
// import ProductsPage from './pages/ProductsPage'
// import CartPage from './pages/CartPage'
// // import LoginPage from './pages/LoginPage'
// import ProductDetailPage from './pages/ProductDetailPage'
// import AuthPage from './pages/AuthPage'
// import CheckoutPage from './pages/CheckoutPage'
// import Navbar from './components/layout/Navbar'

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Navbar />

//         <main className="flex-1">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             {/* <Route path="/login" element={<LoginPage />} /> */}
//             <Route path="/product/:id" element={<ProductDetailPage />} />
//             <Route path="/login" element={<AuthPage />} />
//             <Route path="/register" element={<AuthPage />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   )
// }

// export default App