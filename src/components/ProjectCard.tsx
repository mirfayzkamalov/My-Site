import { motion } from 'framer-motion'
import { ExternalLink, Github, Globe, Rocket, GraduationCap, Sparkles } from 'lucide-react'
import type { Project } from '../types'
import { useLanguage } from '../contexts/LanguageContext'

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectIcon({ project }: { project: Project }) {
  const t = `${project.title} ${project.project_url || ''}`.toLowerCase()

  if (t.includes('neuro') || t.includes('nova')) {
    return (
      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-violet-950 via-indigo-950 to-slate-950">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(139,92,246,0.4), transparent 50%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.3), transparent 45%)'
        }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-violet-400/50 shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border border-sky-400/40 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-violet-300" />
            </div>
          </div>
        </motion.div>
        <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-bold tracking-widest text-violet-300/80">NOVA</span>
      </div>
    )
  }

  if (t.includes('orbit') || t.includes('countries') || t.includes('world')) {
    return (
      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-950 via-sky-950 to-slate-950">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.35), transparent 55%)'
        }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
          <Globe className="w-16 h-16 text-sky-400 drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]" />
        </motion.div>
        <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-bold tracking-widest text-sky-300/80">ORBIT X</span>
      </div>
    )
  }

  if (t.includes('english') || t.includes('ielts') || t.includes('cefr')) {
    return (
      <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-950 via-blue-950 to-slate-950">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(99,102,241,0.4), transparent 50%)'
        }} />
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
          <GraduationCap className="w-16 h-16 text-indigo-300 drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]" />
        </motion.div>
        <span className="absolute bottom-3 left-0 right-0 text-center text-[10px] font-bold tracking-widest text-indigo-300/80">ENGLISH AI</span>
      </div>
    )
  }

  return (
    <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-slate-800 to-slate-950">
      <Sparkles className="w-14 h-14 text-sky-500/40" />
    </div>
  )
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden border border-white/8 bg-slate-900/50 backdrop-blur-sm hover:border-sky-500/30 transition-colors duration-400"
    >
      <div className="relative h-44 overflow-hidden">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <ProjectIcon project={project} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky-500/90 text-white z-10">
            ★ {t('selected')}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-1.5 group-hover:text-sky-400 transition-colors">{project.title}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies?.slice(0, 4).map((tech) => (
            <span key={tech} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/15">{tech}</span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {project.project_url && (
            <a href={project.project_url} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              {t('visit_site')}
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-xl border border-white/10 hover:border-sky-500/30 transition-colors">
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
