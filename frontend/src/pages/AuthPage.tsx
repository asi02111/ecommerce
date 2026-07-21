import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Input } from '../components/common'
import { useAuth }  from '../hooks/useStore'
import { useToast } from '../hooks/useStore'

type Tab = 'login' | 'register'

const AuthPage = () => {
  const location = useLocation()
  const navigate  = useNavigate()
  const { login, isLoggedIn } = useAuth()
  const { success, error: showError } = useToast()

  const [tab, setTab] = useState<Tab>('login')

  useEffect(() => {
    setTab(location.pathname === '/register' ? 'register' : 'login')
  }, [location.pathname])

  // Already logged in হলে home এ পাঠাও
  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn, navigate])

  // Login state
  const [loginData,    setLoginData]    = useState({ email: '', password: '' })
  const [loginErrors,  setLoginErrors]  = useState({ email: '', password: '' })
  const [loginLoading, setLoginLoading] = useState(false)
  const [showPass,     setShowPass]     = useState(false)

  // Register state
  const [registerData,    setRegisterData]    = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [registerErrors,  setRegisterErrors]  = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [registerLoading, setRegisterLoading] = useState(false)

  const validateLogin = () => {
    const errors = { email: '', password: '' }
    let valid = true
    if (!loginData.email) { errors.email = 'Email is required'; valid = false }
    else if (!/\S+@\S+\.\S+/.test(loginData.email)) { errors.email = 'Enter a valid email'; valid = false }
    if (!loginData.password) { errors.password = 'Password is required'; valid = false }
    else if (loginData.password.length < 6) { errors.password = 'Min. 6 characters'; valid = false }
    setLoginErrors(errors)
    return valid
  }

  const validateRegister = () => {
    const errors = { name: '', email: '', phone: '', password: '', confirmPassword: '' }
    let valid = true
    if (!registerData.name.trim()) { errors.name = 'Full name is required'; valid = false }
    if (!registerData.email) { errors.email = 'Email is required'; valid = false }
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) { errors.email = 'Enter a valid email'; valid = false }
    if (!registerData.phone || !/^01[3-9]\d{8}$/.test(registerData.phone)) { errors.phone = 'Enter a valid BD phone number'; valid = false }
    if (!registerData.password) { errors.password = 'Password is required'; valid = false }
    else if (registerData.password.length < 6) { errors.password = 'Min. 6 characters'; valid = false }
    if (registerData.password !== registerData.confirmPassword) { errors.confirmPassword = 'Passwords do not match'; valid = false }
    setRegisterErrors(errors)
    return valid
  }

  const handleLogin = async () => {
    if (!validateLogin()) return
    setLoginLoading(true)
    const ok = await login(loginData.email, loginData.password)
    setLoginLoading(false)
    if (ok) {
      success('Welcome back!')
      navigate('/')
    } else {
      showError('Invalid email or password')
    }
  }

  const handleRegister = async () => {
    if (!validateRegister()) return
    setRegisterLoading(true)
    await new Promise((r) => setTimeout(r, 1200)) // পরে real API
    await login(registerData.email, registerData.password)
    setRegisterLoading(false)
    success('Account created! Welcome to ShopBD 🎉')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/"><h1 className="text-3xl font-extrabold text-indigo-600 inline-block">Shop<span className="text-gray-800">BD</span></h1></Link>
          <p className="text-gray-500 text-sm mt-2">
            {tab === 'login' ? 'Welcome back! Please login.' : 'Create your account to start shopping.'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">

          {/* Tabs */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
            <button onClick={() => setTab('login')}    className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${tab === 'login'    ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-800'}`}>Login</button>
            <button onClick={() => setTab('register')} className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${tab === 'register' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-800'}`}>Register</button>
          </div>

          {/* LOGIN */}
          {tab === 'login' && (
            <div className="space-y-4">
              <Input label="Email" type="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} placeholder="you@example.com" error={loginErrors.email} />
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline">Forgot password?</Link>
                </div>
                <Input
                  type={showPass ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="••••••••"
                  error={loginErrors.password}
                  rightIcon={<button type="button" onClick={() => setShowPass(!showPass)}>{showPass ? '🙈' : '👁️'}</button>}
                />
              </div>
              <Button fullWidth loading={loginLoading} onClick={handleLogin}>Login</Button>
              <div className="flex items-center gap-3"><hr className="flex-1 border-gray-200" /><span className="text-xs text-gray-400">or continue with</span><hr className="flex-1 border-gray-200" /></div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm">🔵 Google</Button>
                <Button variant="outline" size="sm">📘 Facebook</Button>
              </div>
              <p className="text-center text-sm text-gray-500">Don't have an account? <button onClick={() => setTab('register')} className="text-indigo-600 font-semibold hover:underline">Register now</button></p>
            </div>
          )}

          {/* REGISTER */}
          {tab === 'register' && (
            <div className="space-y-4">
              <Input label="Full Name"  type="text"  value={registerData.name}  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}  placeholder="Rahim Khan"        error={registerErrors.name} />
              <Input label="Email"      type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} placeholder="you@example.com"   error={registerErrors.email} />
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <span className="border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-500 bg-gray-50 shrink-0">+880</span>
                  <Input type="tel" value={registerData.phone} onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })} placeholder="01XXXXXXXXX" error={registerErrors.phone} />
                </div>
              </div>
              <Input label="Password"         type="password" value={registerData.password}        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}        placeholder="Min. 6 characters" error={registerErrors.password} />
              <Input label="Confirm Password" type="password" value={registerData.confirmPassword} onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} placeholder="Re-enter password"  error={registerErrors.confirmPassword} />
              <Button fullWidth loading={registerLoading} onClick={handleRegister}>Create Account</Button>
              <p className="text-center text-sm text-gray-500">Already have an account? <button onClick={() => setTab('login')} className="text-indigo-600 font-semibold hover:underline">Login</button></p>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link to="/" className="hover:text-indigo-600 transition-colors">← Back to ShopBD</Link>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
