import { Link } from 'react-router-dom'
import { Code2, Heart } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useLanguage } from '../contexts/LanguageContext'
import * as LucideIcons from 'lucide-react'

export default function Footer() {
  const { socials, profile } = useData()
  const { t } = useLanguage()

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Link
    return <Icon className="w-5 h-5" />
  }

  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/20 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">&lt;Mysite <span className="text-sky-400">/&gt;</span></span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {profile.bio?.slice(0, 120)}...
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[var(--text-primary)]">{t('footer_pages')}</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-[var(--text-secondary)] hover:text-sky-400 transition-colors">{t('nav_home')}</Link>
              <Link to="/about" className="block text-sm text-[var(--text-secondary)] hover:text-sky-400 transition-colors">{t('nav_about')}</Link>
              <Link to="/bots" className="block text-sm text-[var(--text-secondary)] hover:text-sky-400 transition-colors">{t('nav_bots')}</Link>
              <Link to="/sites" className="block text-sm text-[var(--text-secondary)] hover:text-sky-400 transition-colors">{t('nav_projects')}</Link>
              <Link to="/contact" className="block text-sm text-[var(--text-secondary)] hover:text-sky-400 transition-colors">{t('nav_contact')}</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[var(--text-primary)]">{t('footer_social')}</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[var(--text-secondary)] hover:text-sky-400 hover:bg-sky-500/10 transition-all"
                  aria-label={social.platform}>
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()} My Site. {t('footer_rights')}.
          </p>
          <p className="text-sm text-[var(--text-secondary)] flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Mirfayz Kamolov
          </p>
        </div>
      </div>
    </footer>
  )
}
