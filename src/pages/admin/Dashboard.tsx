import { motion } from 'framer-motion'
import { Code2, Eye, Star, Users } from 'lucide-react'
import { useData } from '../../contexts/DataContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { projects, profile, socials } = useData()

  const stats = [
    { label: 'Jami loyihalar', value: projects.length, icon: Code2, color: 'from-violet-500 to-purple-600' },
    { label: 'Tanlangan', value: projects.filter(p => p.featured).length, icon: Star, color: 'from-amber-500 to-orange-600' },
    { label: 'Ijtimoiy tarmoqlar', value: socials.length, icon: Users, color: 'from-blue-500 to-cyan-600' },
    { label: 'Profil', value: profile.full_name ? 'Faol' : 'Bo\'sh', icon: Eye, color: 'from-emerald-500 to-teal-600' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Tezkor amallar</h2>
          <div className="space-y-2">
            <Link to="/admin/projects" className="block p-3 rounded-xl hover:bg-white/5 transition-colors text-sm">
              + Yangi loyiha qo'shish
            </Link>
            <Link to="/admin/home" className="block p-3 rounded-xl hover:bg-white/5 transition-colors text-sm">
              Bosh sahifani tahrirlash
            </Link>
            <Link to="/admin/about" className="block p-3 rounded-xl hover:bg-white/5 transition-colors text-sm">
              Ma'lumotlarni yangilash
            </Link>
            <Link to="/admin/security" className="block p-3 rounded-xl hover:bg-white/5 transition-colors text-sm">
              Parolni o'zgartirish
            </Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">So'nggi loyihalar</h2>
          {projects.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
              <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{p.title}</p>
                <p className="text-xs text-[var(--text-secondary)]">{p.featured ? 'Tanlangan' : 'Oddiy'}</p>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <p className="text-sm text-[var(--text-secondary)]">Loyihalar yo'q</p>
          )}
        </div>
      </div>
    </div>
  )
}
