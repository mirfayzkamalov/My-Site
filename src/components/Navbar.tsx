import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Code2 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage, Lang } from '../contexts/LanguageContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { lang, setLang, t } = useLanguage()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: t('nav_home') },
    { path: '/about', label: t('nav_about') },
    { path: '/bots', label: t('nav_bots') },
    { path: '/sites', label: t('nav_projects') },
    { path: '/contact', label: t('nav_contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [location])

  const langs: Lang[] = ['uz', 'en', 'ru']

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'nav-scrolled backdrop-blur-xl border-b py-3' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Code2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight hidden sm:block">
              &lt;Mysite <span className="text-sky-400">/&gt;</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-sky-500/10 border border-sky-500/20 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center rounded-full border border-white/10 p-0.5 bg-white/5">
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase transition-all ${
                    lang === l
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#020617] text-xs font-semibold hover:bg-sky-400 hover:text-white transition-all"
            >
              {t('btn_contact')} →
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-white/10 hover:border-sky-500/30 transition-colors"
              aria-label="Tema"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-600" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg border border-white/10"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden nav-mobile border-t overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm ${
                    location.pathname === link.path ? 'bg-sky-500/10 text-sky-400' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 px-4 pt-2">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase ${
                      lang === l ? 'bg-sky-500 text-white' : 'border border-white/10 text-slate-400'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
