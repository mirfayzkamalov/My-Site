import { motion } from 'framer-motion'
import { useData } from '../contexts/DataContext'
import { useLanguage } from '../contexts/LanguageContext'
import ProjectCard from '../components/ProjectCard'
import { Code2 } from 'lucide-react'

export default function Sites() {
  const { projects } = useData()
  const { t } = useLanguage()

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">{t('projects_title')}</span>
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">{t('projects_sub')}</p>
        </motion.div>

        {projects.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Code2 className="w-16 h-16 text-sky-500/30 mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">{t('no_projects')}</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
