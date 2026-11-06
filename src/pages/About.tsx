import { motion } from 'framer-motion'
import {
  User, Target, Briefcase, Code, MapPin, Calendar, Mail,
  GraduationCap, Download, FileText, Sparkles
} from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useLanguage } from '../contexts/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }
  })
}

export default function About() {
  const { profile, about, skills, settings, resume, projects, bots } = useData()
  const { lang } = useLanguage()

  const aboutSection = about.find(a => a.section === 'about')
  const experienceSection = about.find(a => a.section === 'experience')
  const goalsSection = about.find(a => a.section === 'goals')

  const education = resume.filter(r => r.type === 'education').sort((a, b) => a.order_index - b.order_index)
  const experience = resume.filter(r => r.type === 'experience').sort((a, b) => a.order_index - b.order_index)
  const skillNames = skills.length ? skills.map(s => s.name) : ['HTML', 'CSS', 'JavaScript', 'React', 'Git']
  const topProjects = projects.filter(p => p.featured).slice(0, 4)

  const labels = {
    uz: {
      about: 'Men haqimda',
      badge: 'MEN HAQIMDA',
      detail: "Batafsil ma'lumot",
      skills: "Ko'nikmalar",
      topProjects: "Eng zo'r loyihalar",
      resume: 'Rezyume',
      resumeSub: "Ta'lim, tajriba va texnik ko'nikmalar",
      education: "Ta'lim",
      experience: 'Ish tajribasi',
      tech: 'Texnologiyalar',
      download: 'Rezyumeni yuklab olish',
      years: 'yosh',
      empty: "Hali ma'lumot qo'shilmagan",
      statSites: 'Saytlar',
      statBots: 'Telegram botlar',
      statSold: 'Loyihalar',
      statSkills: "Ko'nikmalar",
    },
    en: {
      about: 'About me',
      badge: 'ABOUT ME',
      detail: 'Detailed information',
      skills: 'Skills',
      topProjects: 'Top projects',
      resume: 'Resume',
      resumeSub: 'Education, experience and tech stack',
      education: 'Education',
      experience: 'Work experience',
      tech: 'Technologies',
      download: 'Download resume',
      years: 'years old',
      empty: 'No entries yet',
      statSites: 'Websites',
      statBots: 'Telegram bots',
      statSold: 'Projects',
      statSkills: 'Skills',
    },
    ru: {
      about: 'Обо мне',
      badge: 'ОБО МНЕ',
      detail: 'Подробная информация',
      skills: 'Навыки',
      topProjects: 'Лучшие проекты',
      resume: 'Резюме',
      resumeSub: 'Образование, опыт и стек',
      education: 'Образование',
      experience: 'Опыт работы',
      tech: 'Технологии',
      download: 'Скачать резюме',
      years: 'лет',
      empty: 'Пока нет записей',
      statSites: 'Сайты',
      statBots: 'Telegram-боты',
      statSold: 'Проекты',
      statSkills: 'Навыки',
    },
  }[lang]

  const stats = [
    { value: Math.max(projects.length, 3), label: labels.statSites },
    { value: Math.max(bots.length, 2), label: labels.statBots },
    { value: projects.filter(p => p.featured).length || projects.length, label: labels.statSold },
    { value: skillNames.length, label: labels.statSkills },
  ]

  const handleDownload = () => {
    try {
      const lines = [
        profile.full_name || 'Mirfayz Kamolov',
        profile.title || 'Frontend Developer',
        [profile.email, profile.location].filter(Boolean).join(' | '),
        '',
        '--- ' + labels.detail + ' ---',
        aboutSection?.content || profile.bio || '',
        experienceSection ? '\n' + experienceSection.content : '',
        goalsSection ? '\n' + goalsSection.content : '',
        '',
        '--- ' + labels.education + ' ---',
        ...education.map(e => `${e.period} | ${e.title}\n${e.place}\n${e.description}\n`),
        '--- ' + labels.experience + ' ---',
        ...experience.map(e => `${e.period} | ${e.title}\n${e.place}\n${e.description}\n`),
        '--- ' + labels.skills + ' ---',
        skillNames.join(', '),
        '',
        '--- ' + labels.topProjects + ' ---',
        ...topProjects.map(p => `${p.title}${p.project_url ? ' — ' + p.project_url : ''}`),
      ]

      const text = lines.join('\n')
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Mirfayz_Kamolov_Resume.txt'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 500)
    } catch (e) {
      console.error(e)
      alert("Yuklab olishda xato. Qayta urinib ko'ring.")
    }
  }

  const detailText = [
    aboutSection?.content,
    experienceSection?.content,
    goalsSection?.content,
  ].filter(Boolean).join('\n\n') || profile.bio

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HERO ABOUT (reference style) ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start mb-16"
        >
          {/* Photo — same as homepage avatar */}
          <div className="relative mx-auto lg:mx-0">
            <div className="absolute -inset-3 rounded-3xl bg-sky-500/10 blur-2xl" />
            <div className="relative w-56 h-72 sm:w-64 sm:h-80 lg:w-full lg:h-[340px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-500/10">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950">
                  <User className="w-20 h-20 text-slate-600" />
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-sky-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">{labels.badge}</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
              {profile.full_name}
            </h1>
            <p className="text-sky-400 text-base font-medium mb-4">
              {profile.title || 'Frontend Developer'}
            </p>
            <p className="text-slate-400 text-[15px] leading-relaxed max-w-xl mb-8">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-center"
                >
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              {settings.show_age && profile.age && (
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-sky-400" />{profile.age} {labels.years}</span>
              )}
              {settings.show_location && profile.location && (
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-sky-400" />{profile.location}</span>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                  <Mail className="w-4 h-4 text-sky-400" />{profile.email}
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* ===== BATAFSIL ===== */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 sm:p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">{labels.detail}</h2>
          <div className="space-y-4 text-slate-400 text-[15px] leading-relaxed whitespace-pre-line">
            {detailText}
          </div>
        </motion.div>

        {/* ===== SKILLS PILLS ===== */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h3 className="text-lg font-bold text-white mb-4">{labels.skills}</h3>
          <div className="flex flex-wrap gap-2">
            {skillNames.map((name) => (
              <span
                key={name}
                className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/[0.03] text-slate-300 hover:border-sky-500/40 hover:text-sky-400 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ===== TOP PROJECTS ===== */}
        {topProjects.length > 0 && (
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mb-16">
            <h3 className="text-lg font-bold text-white mb-4">{labels.topProjects}</h3>
            <div className="flex flex-wrap gap-2">
              {topProjects.map((p) => (
                <a
                  key={p.id}
                  href={p.project_url || '#'}
                  target={p.project_url ? '_blank' : undefined}
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/[0.03] text-slate-300 hover:border-sky-500/40 hover:text-sky-400 transition-colors"
                >
                  {p.title.split('—')[0].trim()}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===== RESUME TIMELINE ===== */}
        <motion.section
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
          id="resume"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Professional CV
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <FileText className="w-7 h-7 text-sky-400" />
                {labels.resume}
              </h2>
              <p className="text-slate-500 text-sm">{labels.resumeSub}</p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-sky-500/20 w-fit"
            >
              <Download className="w-4 h-4" />
              {labels.download}
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold">{labels.education}</h3>
              </div>
              {education.length === 0 ? (
                <p className="text-sm text-slate-500">{labels.empty}</p>
              ) : (
                <div>
                  {education.map((item, i) => (
                    <div key={item.id} className="relative pl-6 pb-8 last:pb-0">
                      {i < education.length - 1 && (
                        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-sky-500/30" />
                      )}
                      <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-sky-400 bg-[#020617]" />
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-500/15 text-sky-400 mb-2">
                        {item.period}
                      </span>
                      <h4 className="font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-sm text-sky-400/80 mb-2">{item.place}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold">{labels.experience}</h3>
              </div>
              {experience.length === 0 ? (
                <p className="text-sm text-slate-500">{labels.empty}</p>
              ) : (
                <div>
                  {experience.map((item, i) => (
                    <div key={item.id} className="relative pl-6 pb-8 last:pb-0">
                      {i < experience.length - 1 && (
                        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-sky-500/30" />
                      )}
                      <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-sky-400 bg-[#020617]" />
                      <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-sky-500/15 text-sky-400 mb-2">
                        {item.period}
                      </span>
                      <h4 className="font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-sm text-sky-400/80 mb-2">{item.place}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
