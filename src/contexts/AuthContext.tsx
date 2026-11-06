import React, { createContext, useContext, useEffect, useState } from 'react'

// Oddiy admin parol (Supabase bo'lmasa ham ishlaydi)
const ADMIN_PASSWORD = 'mirfayzbek2016mirfayzm'
const AUTH_KEY = 'mysite_admin_auth'

interface AuthContextType {
  user: { email: string } | null
  session: { token: string } | null
  loading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signInWithPassword: (password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  updatePassword: (newPassword: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [session, setSession] = useState<{ token: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUTH_KEY)
      if (saved === 'authenticated') {
        setUser({ email: 'admin@mysite.com' })
        setSession({ token: 'local' })
        setIsAdmin(true)
      }
    } catch (_) {}
    setLoading(false)
  }, [])

  const signIn = async (_email: string, password: string) => {
    return signInWithPassword(password)
  }

  const signInWithPassword = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, 'authenticated')
      setUser({ email: 'admin@mysite.com' })
      setSession({ token: 'local' })
      setIsAdmin(true)
      return { error: null }
    }
    return { error: new Error("Parol noto'g'ri") }
  }

  const signOut = async () => {
    localStorage.removeItem(AUTH_KEY)
    setUser(null)
    setSession(null)
    setIsAdmin(false)
  }

  const updatePassword = async (_newPassword: string) => {
    return { error: new Error("Parolni o'zgartirish uchun kodda ADMIN_PASSWORD ni o'zgartiring") }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signIn, signInWithPassword, signOut, updatePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
