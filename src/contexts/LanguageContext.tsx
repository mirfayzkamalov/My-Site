import React, { createContext, useContext, useState, useEffect } from 'react'

export type Lang = 'uz' | 'en' | 'ru'

const translations = {
  uz: {
    nav_home: 'Bosh sahifa',
    nav_about: 'Men haqimda',
    nav_bots: 'Botlarim',
    nav_projects: 'Loyihalar',
    nav_contact: 'Aloqa',
    badge: 'Frontend Developer & Bot Creator',
    btn_contact: "Bog'lanish",
    btn_projects: 'Loyihalar',
    stat_years: 'Yillik tajriba',
    stat_projects: 'Loyihalar',
    stat_bots: 'Botlar',
    services_title: 'Nima qila olaman',
    services_sub: 'Xizmatlarim',
    featured_title: 'Tanlangan',
    featured_title2: 'loyihalar',
    featured_sub: "Eng so'nggi ishlarimdan namunalar",
    all_projects: 'Barcha loyihalar',
    visit_site: "Saytga o'tish",
    selected: 'Tanlangan',
    about_title: 'Men haqimda',
    about_sub: "Mening shaxsiy ma'lumotlarim, qobiliyatlarim va maqsadlarim",
    skills: 'Qobiliyatlar',
    projects_title: 'Mening saytlarim',
    projects_sub: "Yaratgan loyihalarim va ishlarim to'plami",
    no_projects: "Hozircha loyihalar yo'q",
    years_old: 'yosh',
    footer_pages: 'Sahifalar',
    footer_social: 'Ijtimoiy tarmoqlar',
    footer_rights: 'Barcha huquqlar himoyalangan',
    service_web: 'Veb-saytlar',
    service_web_desc: 'Landing, portfolio, korporativ saytlar — tez, chiroyli va mobilga mos.',
    service_bot: 'Telegram botlar',
    service_bot_desc: "Buyurtma, to'lov, savol-javob va avtomatlashtirish botlari.",
    service_admin: 'Admin panellar',
    service_admin_desc: "Kontentni o'zingiz boshqaradigan qulay boshqaruv panellari.",
    service_ui: 'UI/UX dizayn',
    service_ui_desc: "Figma'da maket va uni pikselma-piksel kodga aylantirish.",
    service_support: "Qo'llab-quvvatlash",
    service_support_desc: 'Ishga tushirgandan keyin ham yangilash va yordam.',
    service_api: 'Integratsiyalar',
    service_api_desc: "To'lov tizimlari, API va boshqa xizmatlarni ulash.",
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_bots: 'My Bots',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    badge: 'Frontend Developer & Bot Creator',
    btn_contact: 'Contact',
    btn_projects: 'Projects',
    stat_years: 'Years experience',
    stat_projects: 'Projects',
    stat_bots: 'Bots',
    services_title: 'What I can do',
    services_sub: 'My services',
    featured_title: 'Featured',
    featured_title2: 'projects',
    featured_sub: 'Some of my latest work',
    all_projects: 'All projects',
    visit_site: 'Visit site',
    selected: 'Featured',
    about_title: 'About me',
    about_sub: 'My personal info, skills and goals',
    skills: 'Skills',
    projects_title: 'My projects',
    projects_sub: 'Collection of sites and work I built',
    no_projects: 'No projects yet',
    years_old: 'years old',
    footer_pages: 'Pages',
    footer_social: 'Social links',
    footer_rights: 'All rights reserved',
    service_web: 'Websites',
    service_web_desc: 'Landing, portfolio, corporate sites — fast, beautiful and mobile-ready.',
    service_bot: 'Telegram bots',
    service_bot_desc: 'Order, payment, Q&A and automation bots.',
    service_admin: 'Admin panels',
    service_admin_desc: 'Easy control panels so you manage your own content.',
    service_ui: 'UI/UX design',
    service_ui_desc: 'Figma mockups turned into pixel-perfect code.',
    service_support: 'Support',
    service_support_desc: 'Updates and help even after launch.',
    service_api: 'Integrations',
    service_api_desc: 'Payment systems, APIs and other services.',
  },
  ru: {
    nav_home: 'Главная',
    nav_about: 'Обо мне',
    nav_bots: 'Мои боты',
    nav_projects: 'Проекты',
    nav_contact: 'Контакты',
    badge: 'Frontend Developer & Bot Creator',
    btn_contact: 'Связаться',
    btn_projects: 'Проекты',
    stat_years: 'Лет опыта',
    stat_projects: 'Проекты',
    stat_bots: 'Боты',
    services_title: 'Что я умею',
    services_sub: 'Мои услуги',
    featured_title: 'Избранные',
    featured_title2: 'проекты',
    featured_sub: 'Некоторые из моих последних работ',
    all_projects: 'Все проекты',
    visit_site: 'Открыть сайт',
    selected: 'Избранное',
    about_title: 'Обо мне',
    about_sub: 'Личная информация, навыки и цели',
    skills: 'Навыки',
    projects_title: 'Мои проекты',
    projects_sub: 'Сайты и работы, которые я создал',
    no_projects: 'Пока нет проектов',
    years_old: 'лет',
    footer_pages: 'Страницы',
    footer_social: 'Соцсети',
    footer_rights: 'Все права защищены',
    service_web: 'Веб-сайты',
    service_web_desc: 'Лендинги, портфолио, корпоративные сайты — быстро, красиво и адаптивно.',
    service_bot: 'Telegram-боты',
    service_bot_desc: 'Заказы, оплата, FAQ и боты автоматизации.',
    service_admin: 'Админ-панели',
    service_admin_desc: 'Удобные панели, чтобы вы сами управляли контентом.',
    service_ui: 'UI/UX дизайн',
    service_ui_desc: 'Макеты в Figma и перевод в идеальный код.',
    service_support: 'Поддержка',
    service_support_desc: 'Обновления и помощь после запуска.',
    service_api: 'Интеграции',
    service_api_desc: 'Платёжные системы, API и другие сервисы.',
  },
} as const

type TranslationKey = keyof typeof translations.uz

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem('mysite_lang') as Lang
      if (saved === 'uz' || saved === 'en' || saved === 'ru') return saved
    } catch (_) {}
    return 'uz'
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('mysite_lang', l) } catch (_) {}
  }

  const t = (key: TranslationKey) => translations[lang][key] || translations.uz[key] || key

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
