import { Routes, Route } from 'react-router-dom'
import PublicRoutes    from './PublicRoutes'
import ProtectedRoutes from './ProtectedRoutes'
import ProtectedRoute  from './ProtectedRoute'

// AppRoutes এখন App.tsx থেকে সব route detail সরিয়ে এনেছে —
// App.tsx শুধু Providers আর Layout (Navbar/Footer) রাখবে।
//
// PublicRoutes()/ProtectedRoutes() — এখানে ইচ্ছাকৃতভাবে <PublicRoutes /> না লিখে
// function হিসেবে call করা হয়েছে। কারণ React Router এর <Routes> এর সরাসরি child
// শুধু <Route> বা <React.Fragment> হতে পারে — কোনো custom component না।
// function call করলে সেটা সরাসরি <Route> এর Fragment রিটার্ন করে, তাই কাজ করে।
const AppRoutes = () => (
  <Routes>
    {PublicRoutes()}

    <Route element={<ProtectedRoute />}>
      {ProtectedRoutes()}
    </Route>
  </Routes>
)

export default AppRoutes
