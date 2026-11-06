import { motion } from 'framer-motion'
import { Bot, Send } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Bots() {
  const { bots } = useData()
  const { lang } = useLanguage()

  const labels = {
    uz: { title: 'Botlarim', sub: 'Yaratgan Telegram botlarim', open: 'Telegramda ochish', active: 'Faol', empty: "Hozircha botlar yo'q" },
    en: { title: 'My Bots', sub: 'Telegram bots I built', open: 'Open in Telegram', active: 'Active', empty: 'No bots yet' },
    ru: { title: 'Мои боты', sub: 'Telegram-боты, которые я создал', open: 'Открыть в Telegram', active: 'Активен', empty: 'Пока нет ботов' },
  }[lang]

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="text-white">{labels.title}</span>
          </h1>
          <p className="text-slate-500 text-sm">{labels.sub}</p>
        </motion.div>

        {bots.length === 0 ? (
          <p className="text-center text-slate-500 py-16">{labels.empty}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bots.map((bot, i) => (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group relative p-6 rounded-2xl border border-white/8 bg-slate-900/50 hover:border-sky-500/35 transition-all"
              >
                {bot.status === 'active' && (
                  <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {labels.active}
                  </span>
                )}
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5 group-hover:bg-sky-500/20 transition-colors">
                  <Bot className="w-7 h-7 text-sky-400" />
                </div>
                <p className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1">Telegram</p>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{bot.name}</h3>
                <p className="text-sm text-slate-500 mb-5 leading-relaxed">{bot.description}</p>
                {bot.url && (
                  <a href={bot.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-colors">
                    <Send className="w-3.5 h-3.5" />
                    {labels.open}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
