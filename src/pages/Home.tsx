import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, User, Code2, Bot, LayoutDashboard, Palette, Headphones, Plug } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useLanguage } from '../contexts/LanguageContext'
import ProjectCard from '../components/ProjectCard'
import { useRef } from 'react'

const techs = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'Framer Motion',
  'Supabase', 'Python', 'Telegram Bot API', 'Git', 'GitHub', 'Figma',
  'HTML', 'CSS', 'JavaScript', 'Vite', 'SEO', 'Deploy', 'Linux', 'VS Code',
  'PostgreSQL', 'MongoDB', 'Express', 'Aiogram'
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
}
const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

export default function Home() {
  const { profile, projects } = useData()
  const { t } = useLanguage()
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  const nameParts = (profile.full_name || 'Mirfayz Kamolov').split(' ')
  const firstName = nameParts[0] || 'Mirfayz'
  const lastName = nameParts.slice(1).join(' ') || 'Kamolov'

  const services = [
    { icon: Code2, title: t('service_web'), desc: t('service_web_desc') },
    { icon: Bot, title: t('service_bot'), desc: t('service_bot_desc') },
    { icon: LayoutDashboard, title: t('service_admin'), desc: t('service_admin_desc') },
    { icon: Palette, title: t('service_ui'), desc: t('service_ui_desc') },
    { icon: Headphones, title: t('service_support'), desc: t('service_support_desc') },
    { icon: Plug, title: t('service_api'), desc: t('service_api_desc') },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-20">
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.055]" style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.7) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020617_75%)] pointer-events-none" />
        {/* Glow */}
        <motion.div
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/20 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          animate={{ opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 left-1/5 w-[350px] h-[350px] bg-cyan-400/10 rounded-full blur-[110px] pointer-events-none"
        />

        <motion.div style={{ opacity: opacityHero }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div variants={container} initial="hidden" animate="show" className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <div>
              <motion.div variants={item}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium bg-sky-500/10 text-sky-400 border border-sky-500/25 mb-7 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  {profile.title || t('badge')}
                </span>
              </motion.div>

              <motion.h1 variants={item} className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight mb-3">
                <span className="text-white">{firstName}</span>
                <br />
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">
                  {lastName}
                </span>
              </motion.h1>

              {/* Cyan underline accent */}
              <motion.div variants={item} className="w-16 h-[3px] rounded-full bg-gradient-to-r from-sky-400 to-transparent mb-6" />

              <motion.p variants={item} className="text-slate-400 text-[15px] sm:text-[16px] max-w-md mb-9 leading-relaxed">
                {profile.bio}
              </motion.p>

              <motion.div variants={item} className="flex flex-wrap gap-3 mb-12">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#020617] text-sm font-semibold transition-all hover:bg-sky-400 hover:text-white shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                >
                  {t('btn_contact')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/sites"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 hover:border-sky-500/50 hover:bg-sky-500/5 text-sm font-medium transition-all text-slate-300"
                >
                  {t('btn_projects')}
                </Link>
              </motion.div>

              <motion.div variants={item} className="flex gap-10 sm:gap-14">
                {[
                  { value: '1+', label: t('stat_years') },
                  { value: `${Math.max(projects.length, 3)}+`, label: t('stat_projects') },
                  { value: '40+', label: t('stat_bots') },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-sky-300 to-sky-500 bg-clip-text text-transparent">{s.value}</div>
                    <div className="text-[11px] text-slate-500 mt-1 tracking-wide">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Photo — damirbek style oval + stronger rings */}
            <motion.div variants={item} className="flex justify-center lg:justify-end" style={{ y: yPhoto }}>
              <div className="relative">
                {/* Outer glow pulse */}
                <motion.div
                  animate={{ scale: [1, 1.06, 1], opacity: [0.25, 0.45, 0.25] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-8 rounded-[50%] bg-sky-500/20 blur-3xl"
                />
                {/* Rotating rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-4 rounded-[50%] border border-dashed border-sky-400/35"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 rounded-[50%] border border-dotted border-sky-500/20"
                />
                {/* Oval frame like damirbek */}
                <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] rounded-[50%] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.15)] bg-slate-900">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950">
                      <User className="w-24 h-24 text-slate-600" />
                    </div>
                  )}
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020617]/80 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 rounded-full bg-sky-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== TECH MARQUEE ===== */}
      <div className="relative border-y border-white/5 py-4 overflow-hidden bg-[#020617]/95">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-8"
        >
          {[...techs, ...techs].map((tech, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-slate-500 font-medium shrink-0 hover:text-sky-400 transition-colors">
              <span className="text-sky-500">✦</span> {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ===== SERVICES ===== */}
      <section className="relative py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('services_title')}</h2>
            <div className="w-12 h-[2px] bg-sky-500 rounded-full mb-3" />
            <p className="text-slate-500 text-sm">{t('services_sub')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="group relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-sky-500/40 hover:bg-sky-500/[0.04] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_40px_rgba(56,189,248,0.1)] pointer-events-none" />
                <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:bg-sky-500/20 group-hover:scale-110 transition-all">
                  <s.icon className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-sky-300 transition-colors">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED ===== */}
      {featuredProjects.length > 0 && (
        <section className="relative py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                <span className="text-white">{t('featured_title')} </span>
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">{t('featured_title2')}</span>
              </h2>
              <p className="text-slate-500 text-sm">{t('featured_sub')}</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                to="/sites"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/5 text-sm transition-all"
              >
                {t('all_projects')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
