import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useLanguage } from '../contexts/LanguageContext'
import * as LucideIcons from 'lucide-react'

export default function Contact() {
  const { profile, socials } = useData()
  const { t, lang } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const labels = {
    uz: {
      title: 'Aloqa',
      subtitle: "Keling, gaplashamiz",
      desc: "Saytlarim. Botlarim. Ijodim. Loyiha yoki hamkorlik bo'yicha yozing.",
      name: 'Ism',
      email: 'Email',
      subject: 'Mavzu',
      message: 'Xabar',
      send: 'Yuborish',
      success: 'Xabaringiz qabul qilindi! Tez orada javob beraman.',
      location: 'Joylashuv',
      write: "Menga yozing",
    },
    en: {
      title: 'Contact',
      subtitle: "Let's talk",
      desc: 'My sites. My bots. My work. Write about a project or collaboration.',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      success: 'Message received! I will reply soon.',
      location: 'Location',
      write: 'Write to me',
    },
    ru: {
      title: 'Контакты',
      subtitle: 'Давайте поговорим',
      desc: 'Мои сайты. Мои боты. Моё творчество. Напишите о проекте или сотрудничестве.',
      name: 'Имя',
      email: 'Email',
      subject: 'Тема',
      message: 'Сообщение',
      send: 'Отправить',
      success: 'Сообщение получено! Скоро отвечу.',
      location: 'Местоположение',
      write: 'Напишите мне',
    },
  }[lang]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // localStorage ga saqlash (demo)
    try {
      const prev = JSON.parse(localStorage.getItem('mysite_messages') || '[]')
      prev.push({ ...form, date: new Date().toISOString() })
      localStorage.setItem('mysite_messages', JSON.stringify(prev))
    } catch (_) {}
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 600)
  }

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Link
    return <Icon className="w-5 h-5" />
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-sky-400 text-sm font-medium tracking-wide uppercase mb-2">{labels.title}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            {labels.subtitle.split(' ').map((w, i) =>
              i === 0 ? <span key={i}>{w} </span> : <span key={i} className="text-sky-400">{w} </span>
            )}
          </h1>
          <p className="text-slate-500 max-w-lg">{labels.desc}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {profile.email && (
              <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-sm text-white hover:text-sky-400 transition-colors">
                    {profile.email}
                  </a>
                </div>
              </div>
            )}

            {profile.location && (
              <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/8 bg-slate-900/40">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{labels.location}</p>
                  <p className="text-sm text-white">{profile.location}</p>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-slate-500 mb-3">{labels.write}</p>
              <div className="flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all"
                    aria-label={s.platform}
                  >
                    {getIcon(s.icon)}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-white/8 bg-slate-900/50 backdrop-blur-sm">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-14 h-14 text-sky-400 mb-4" />
                  <p className="text-white font-medium mb-2">{labels.success}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 text-sm text-sky-400 hover:underline"
                  >
                    OK
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">{labels.name}</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none text-sm text-white placeholder:text-slate-600"
                        placeholder={labels.name}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1.5">{labels.email}</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none text-sm text-white placeholder:text-slate-600"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">{labels.subject}</label>
                    <input
                      required
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none text-sm text-white placeholder:text-slate-600"
                      placeholder={labels.subject}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-1.5">{labels.message}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-500 focus:outline-none text-sm text-white placeholder:text-slate-600 resize-none"
                      placeholder={labels.message}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="spinner w-5 h-5 border-2" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {labels.send}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
