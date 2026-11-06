import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import About from './pages/About'
import Sites from './pages/Sites'
import Contact from './pages/Contact'
import Bots from './pages/Bots'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminHome from './pages/admin/AdminHome'
import AdminAbout from './pages/admin/AdminAbout'
import AdminProjects from './pages/admin/AdminProjects'
import AdminBots from './pages/admin/AdminBots'
import AdminResume from './pages/admin/AdminResume'
import AdminSocials from './pages/admin/AdminSocials'
import AdminSecurity from './pages/admin/AdminSecurity'
import AdminSettings from './pages/admin/AdminSettings'
import AdminImages from './pages/admin/AdminImages'
import AdminDesign from './pages/admin/AdminDesign'
import { useData } from './contexts/DataContext'
import { useAuth } from './contexts/AuthContext'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

function ProtectedAdmin({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="spinner" />
      </div>
    )
  }
  if (!isAdmin) return <Navigate to="/admin" replace />
  return <>{children}</>
}

export default function App() {
  const location = useLocation()
  const { loading } = useData()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Premium loading — 5 soniya
    const timer = setTimeout(() => setShowLoader(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (showLoader) {
    return <LoadingScreen />
  }

  return (
    <>
      <CustomCursor />
      <Routes location={location}>
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/bots" element={<PublicLayout><Bots /></PublicLayout>} />
        <Route path="/sites" element={<PublicLayout><Sites /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="resume" element={<AdminResume />} />
          <Route path="bots" element={<AdminBots />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="socials" element={<AdminSocials />} />
          <Route path="security" element={<AdminSecurity />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="images" element={<AdminImages />} />
          <Route path="design" element={<AdminDesign />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
