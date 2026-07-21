import { createContext, useState, useCallback, type ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // পরে real API call আসবে এখানে
    // এখন dummy login
    const dummyUser: User = {
      id: '1',
      name: 'Rahim Khan',
      email,
      phone: '01700000000',
      isAdmin: false,
    }
    setUser(dummyUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null))
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
