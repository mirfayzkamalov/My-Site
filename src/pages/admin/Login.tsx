import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Code2, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signInWithPassword, isAdmin, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && isAdmin) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [isAdmin, authLoading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signInWithPassword(password)
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/admin/dashboard')
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 animated-gradient opacity-40" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 flex items-center justify-center glow-purple mb-4"
            >
              <Code2 className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">My Site boshqaruv paneli</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-6"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolni kiriting"
                  required
                  autoFocus
                  className="w-full pl-11 pr-12 py-3 rounded-xl glass border border-white/10 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-violet-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium shadow-lg shadow-violet-500/20 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner w-5 h-5 border-2" />
                  Kirish...
                </span>
              ) : (
                'Kirish'
              )}
            </button>
          </form>

          <p className="text-xs text-center text-[var(--text-secondary)] mt-6">
            Faqat administratorlar uchun
          </p>
        </div>
      </motion.div>
    </div>
  )
}
