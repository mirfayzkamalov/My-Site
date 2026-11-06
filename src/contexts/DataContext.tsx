import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { Profile, AboutInfo, Project, SocialLink, SiteSettings, Skill, BotItem, ResumeItem } from '../types'

const STORAGE_KEY = 'mysite_data_v1'

const defaultProfile: Profile = {
  id: '1',
  full_name: 'Mirfayz Kamolov',
  title: 'Frontend Developer',
  bio: "HTML, CSS, JavaScript, React va Git yordamida zamonaviy, tez va chiroyli veb-saytlar yarataman.",
  avatar_url: null,
  age: 22,
  location: "O'zbekiston",
  email: 'mirfayz@example.com'
}

const defaultAbout: AboutInfo[] = [
  { id: '1', section: 'about', title: 'Men haqimda', content: 'Salom! Men Mirfayz Kamolovman — Frontend Developer. HTML, CSS, JavaScript, React va Git yordamida zamonaviy, tez va chiroyli veb-saytlar yarataman. Portfolio, landing, interaktiv platformalar va admin panelli loyihalar ustida ishlayman. Har bir loyihada toza kod, responsive dizayn va yaxshi UX ga e\'tibor beraman.', order_index: 1 },
  { id: '2', section: 'experience', title: 'Tajriba', content: 'Freelance frontend dasturchi sifatida bir nechta real va demo loyihalarni yakunlaganman: NeuroSphere (NOVA), Orbit X, English AI va boshqalar. React, HTML/CSS/JS, Git, deploy (Vercel) bilan ishlayman. Mijoz talablariga mos UI va funksional yechimlar tayyorlayman.', order_index: 2 },
  { id: '3', section: 'goals', title: 'Maqsadlar', content: 'Eng yaxshi dasturchilardan biri bo\'lish va foydali mahsulotlar yaratish.', order_index: 3 },
]

const defaultSkills: Skill[] = [
  { id: '1', name: 'HTML', level: 95, category: 'Frontend' },
  { id: '2', name: 'CSS', level: 92, category: 'Frontend' },
  { id: '3', name: 'JavaScript', level: 90, category: 'Frontend' },
  { id: '4', name: 'React', level: 90, category: 'Frontend' },
  { id: '5', name: 'Git', level: 85, category: 'Tools' },
]

const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'NeuroSphere — NOVA',
    description: 'NOVA haqida interaktiv platforma. Ma\'lumotlar, Explore va zamonaviy animatsiyalar bilan to\'liq interaktiv tajriba.',
    image_url: null,
    technologies: ['React', 'Vite', 'Framer Motion', 'Tailwind'],
    project_url: 'https://neurosphere-neon.vercel.app/',
    github_url: null,
    featured: true,
    order_index: 1
  },
  {
    id: 'p2',
    image_url: '/coding-setup.png',
    title: 'Orbit X — Countries of the World',
    description: 'Dunyo davlatlari haqida ma\'lumot olish va sayohat uchun yo\'nalishlarni kashf qilish platformasi. Davlatlar, faktlar, xarita va quiz.',
    
    technologies: ['React', 'Maps', 'Tailwind', 'Vite'],
    project_url: 'https://orbit-x-no1.vercel.app/',
    github_url: null,
    featured: true,
    order_index: 2
  },
  {
    id: 'p3',
    title: 'English AI — IELTS & CEFR',
    description: 'IELTS va CEFR imtihon simulyatori. Reading, Listening, Writing, Speaking va AI examiner bilan interaktiv o\'rganish.',
    image_url: null,
    technologies: ['React', 'AI', 'TypeScript', 'Tailwind'],
    project_url: 'https://english-ai-henna.vercel.app/',
    github_url: null,
    featured: true,
    order_index: 3
  },
]



const defaultResume: ResumeItem[] = [
  {
    id: 'r1',
    type: 'education',
    title: 'Frontend dasturlash',
    place: "Mustaqil o'qish / Amaliy loyihalar",
    period: '2024 — 2026',
    description: "HTML, CSS, JavaScript, React va Git asoslarini chuqur o'zlashtirish. Responsive dizayn, komponentli arxitektura, animatsiyalar (Framer Motion) va real loyihalar orqali amaliy tajriba. Portfolio, landing va interaktiv platformalar yasash.",
    order_index: 1
  },
  {
    id: 'r2',
    type: 'education',
    title: 'Web asoslari va UI/UX',
    place: 'Online kurslar + amaliyot',
    period: '2024',
    description: "Semantik HTML, zamonaviy CSS (Flexbox, Grid, animatsiyalar), JavaScript ES6+, figma'dan kodga o'tish. Foydalanuvchi interfeysi va mobil moslikka alohida e'tibor.",
    order_index: 2
  },
  {
    id: 'r3',
    type: 'experience',
    title: 'Frontend Developer',
    place: 'Freelance',
    period: '2025 — Hozir',
    description: "Mijozlar uchun portfolio, korporativ saytlar va interaktiv web-platformalar ishlab chiqish. React + TypeScript/JavaScript, Tailwind CSS, Git. Loyihalarni Vercel/Netlify ga deploy qilish, admin panel va dinamik kontent.",
    order_index: 1
  },
  {
    id: 'r4',
    type: 'experience',
    title: 'Web loyihalar (NeuroSphere, Orbit X, English AI)',
    place: 'Shaxsiy / demo loyihalar',
    period: '2025 — 2026',
    description: "NeuroSphere — NOVA interaktiv platforma; Orbit X — davlatlar va sayohat; English AI — IELTS/CEFR simulyator. Zamonaviy UI, animatsiyalar, responsive dizayn va toza komponent arxitekturasi.",
    order_index: 2
  },
  {
    id: 'r5',
    type: 'experience',
    title: 'Telegram botlar va mini-ilovalar',
    place: 'Shaxsiy loyihalar',
    period: '2024 — 2025',
    description: "Telegram botlar (buyurtma, savol-javob, avtomatlashtirish), landing sahifalar va kichik veb-ilovalar. Git orqali versiya nazorati, oddiy integratsiyalar va foydalanuvchi uchun qulay interfeys.",
    order_index: 3
  },
]

const defaultBots: BotItem[] = [
  {
    id: 'b1',
    name: '@workliy_uz_bot',
    description: 'Telegram bot — buyurtma va avtomatlashtirish.',
    url: 'https://t.me/workliy_uz_bot',
    status: 'active',
    order_index: 1
  },
  {
    id: 'b2',
    name: '@WorkliyUz_bot',
    description: 'Telegram bot — savol-javob va yordam.',
    url: 'https://t.me/WorkliyUz_bot',
    status: 'active',
    order_index: 2
  },
]

const defaultSocials: SocialLink[] = [
  { id: '1', platform: 'GitHub', url: 'https://github.com', icon: 'Github', order_index: 1 },
  { id: '2', platform: 'Telegram', url: 'https://t.me', icon: 'Send', order_index: 2 },
  { id: '3', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', order_index: 3 },
]

const defaultSettings: SiteSettings = {
  id: '1',
  site_title: 'My Site — Mirfayz Kamolov',
  site_description: 'Premium shaxsiy portfolio',
  hero_title: 'Mirfayz Kamolov',
  hero_subtitle: 'Frontend Developer',
  primary_color: '#38bdf8',
  show_age: true,
  show_location: true,
  maintenance_mode: false
}

interface StoredData {
  profile: Profile
  about: AboutInfo[]
  skills: Skill[]
  projects: Project[]
  bots: BotItem[]
  resume: ResumeItem[]
  socials: SocialLink[]
  settings: SiteSettings
}

function loadStored(): StoredData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveStored(data: StoredData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('localStorage save error', e)
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

interface DataContextType {
  profile: Profile
  about: AboutInfo[]
  skills: Skill[]
  projects: Project[]
  bots: BotItem[]
  resume: ResumeItem[]
  socials: SocialLink[]
  settings: SiteSettings
  loading: boolean
  refreshData: () => Promise<void>
  updateProfile: (data: Partial<Profile>) => Promise<{ error: Error | null }>
  upsertAbout: (item: Partial<AboutInfo> & { section: string; title: string; content: string }) => Promise<{ error: Error | null }>
  deleteAbout: (id: string) => Promise<{ error: Error | null }>
  upsertProject: (project: Partial<Project>) => Promise<{ error: Error | null }>
  deleteProject: (id: string) => Promise<{ error: Error | null }>
  upsertBot: (bot: Partial<BotItem>) => Promise<{ error: Error | null }>
  deleteBot: (id: string) => Promise<{ error: Error | null }>
  upsertResume: (item: Partial<ResumeItem>) => Promise<{ error: Error | null }>
  deleteResume: (id: string) => Promise<{ error: Error | null }>
  upsertSocial: (social: Partial<SocialLink>) => Promise<{ error: Error | null }>
  deleteSocial: (id: string) => Promise<{ error: Error | null }>
  updateSettings: (data: Partial<SiteSettings>) => Promise<{ error: Error | null }>
  uploadImage: (file: File, bucket?: string) => Promise<{ url: string | null; error: Error | null }>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

function write(partial: Partial<StoredData>, fallback: StoredData) {
  const s = loadStored()
  saveStored({
    profile: partial.profile ?? s?.profile ?? fallback.profile,
    about: partial.about ?? s?.about ?? fallback.about,
    skills: partial.skills ?? s?.skills ?? fallback.skills,
    projects: partial.projects ?? s?.projects ?? fallback.projects,
    bots: partial.bots ?? s?.bots ?? fallback.bots ?? defaultBots,
    resume: partial.resume ?? s?.resume ?? fallback.resume ?? defaultResume,
    socials: partial.socials ?? s?.socials ?? fallback.socials,
    settings: partial.settings ?? s?.settings ?? fallback.settings,
  })
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const stored = loadStored()
  // Agar eski demo loyihalar bo'lsa — yangi 3 ta loyihaga almashtirish
  const initialProjects = (() => {
    if (!stored?.projects?.length) return defaultProjects
    const hasNew = stored.projects.some(p =>
      p.project_url?.includes('neurosphere') ||
      p.project_url?.includes('orbit-x') ||
      p.project_url?.includes('english-ai')
    )
    return hasNew ? stored.projects : defaultProjects
  })()

  const [profile, setProfile] = useState<Profile>(stored?.profile || defaultProfile)
  const [about, setAbout] = useState<AboutInfo[]>(stored?.about || defaultAbout)
  const [skills] = useState<Skill[]>(() => {
    const s = stored?.skills
    if (!s?.length) return defaultSkills
    const hasBackend = s.some(x => /node|backend|supabase|telegram bot/i.test(x.name + x.category))
    return hasBackend ? defaultSkills : s
  })
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [bots, setBots] = useState<BotItem[]>(stored?.bots?.length ? stored.bots : defaultBots)
  const [resume, setResume] = useState<ResumeItem[]>(stored?.resume && stored.resume.length >= 4 ? stored.resume : defaultResume)
  const [socials, setSocials] = useState<SocialLink[]>(stored?.socials || defaultSocials)
  const [settings, setSettings] = useState<SiteSettings>(stored?.settings || defaultSettings)
  const [loading] = useState(false)

  const base = () => ({
    profile, about, skills, projects, bots, resume, socials, settings
  })

  useEffect(() => {
    const s = loadStored()
    if (!s || !s.projects?.some(p => p.project_url?.includes('neurosphere'))) {
      saveStored({
        profile: s?.profile || defaultProfile,
        about: s?.about || defaultAbout,
        skills: s?.skills || defaultSkills,
        projects: defaultProjects,
        bots: s?.bots?.length ? s.bots : defaultBots,
        resume: s?.resume && s.resume.length >= 4 ? s.resume : defaultResume,
        socials: s?.socials || defaultSocials,
        settings: s?.settings || defaultSettings,
      })
      setProjects(defaultProjects)
    } else {
      // Orbit X rasmni yangilash
      const patched = s.projects.map(p =>
        p.project_url?.includes('orbit-x') ? { ...p, image_url: '/coding-setup.png' } : p
      )
      setProjects(patched)
      saveStored({ ...s, projects: patched })
    }
  }, [])

  const refreshData = useCallback(async () => {
    const s = loadStored()
    if (s) {
      setProfile(s.profile)
      setAbout(s.about)
      setProjects(s.projects)
      setBots(s.bots?.length ? s.bots : defaultBots)
      setResume(s.resume && s.resume.length >= 4 ? s.resume : defaultResume)
      setSocials(s.socials)
      setSettings(s.settings)
    }
  }, [])

  const updateProfile = async (data: Partial<Profile>) => {
    const next = { ...profile, ...data }
    setProfile(next)
    write({ profile: next }, base())
    return { error: null }
  }

  const upsertAbout = async (item: Partial<AboutInfo> & { section: string; title: string; content: string }) => {
    let next: AboutInfo[]
    if (item.id) {
      next = about.map(a => a.id === item.id ? { ...a, ...item } as AboutInfo : a)
    } else {
      next = [...about, { id: uid(), section: item.section, title: item.title, content: item.content, order_index: item.order_index || about.length + 1 }]
    }
    setAbout(next)
    write({ about: next }, base())
    return { error: null }
  }

  const deleteAbout = async (id: string) => {
    const next = about.filter(a => a.id !== id)
    setAbout(next)
    write({ about: next }, base())
    return { error: null }
  }

  const upsertProject = async (project: Partial<Project>) => {
    let next: Project[]
    if (project.id && projects.some(p => p.id === project.id)) {
      next = projects.map(p => p.id === project.id ? { ...p, ...project } as Project : p)
    } else {
      next = [...projects, {
        id: project.id || uid(),
        title: project.title || 'Yangi loyiha',
        description: project.description || '',
        image_url: project.image_url ?? null,
        technologies: project.technologies || [],
        project_url: project.project_url ?? null,
        github_url: project.github_url ?? null,
        featured: project.featured ?? true,
        order_index: project.order_index || projects.length + 1,
      }]
    }
    setProjects(next)
    write({ projects: next }, base())
    return { error: null }
  }

  const deleteProject = async (id: string) => {
    const next = projects.filter(p => p.id !== id)
    setProjects(next)
    write({ projects: next }, base())
    return { error: null }
  }

  const upsertBot = async (bot: Partial<BotItem>) => {
    let next: BotItem[]
    if (bot.id && bots.some(b => b.id === bot.id)) {
      next = bots.map(b => b.id === bot.id ? { ...b, ...bot } as BotItem : b)
    } else {
      next = [...bots, {
        id: bot.id || uid(),
        name: bot.name || 'Yangi bot',
        description: bot.description || '',
        url: bot.url || '',
        status: bot.status || 'active',
        order_index: bot.order_index || bots.length + 1,
      }]
    }
    setBots(next)
    write({ bots: next }, base())
    return { error: null }
  }

  const deleteBot = async (id: string) => {
    const next = bots.filter(b => b.id !== id)
    setBots(next)
    write({ bots: next }, base())
    return { error: null }
  }

  const upsertResume = async (item: Partial<ResumeItem>) => {
    let next: ResumeItem[]
    if (item.id && resume.some(r => r.id === item.id)) {
      next = resume.map(r => r.id === item.id ? { ...r, ...item } as ResumeItem : r)
    } else {
      next = [...resume, {
        id: item.id || uid(),
        type: item.type || 'experience',
        title: item.title || '',
        place: item.place || '',
        period: item.period || '',
        description: item.description || '',
        order_index: item.order_index || resume.length + 1,
      }]
    }
    setResume(next)
    write({ resume: next }, base())
    return { error: null }
  }

  const deleteResume = async (id: string) => {
    const next = resume.filter(r => r.id !== id)
    setResume(next)
    write({ resume: next }, base())
    return { error: null }
  }

  const upsertSocial = async (social: Partial<SocialLink>) => {
    let next: SocialLink[]
    if (social.id && socials.some(s => s.id === social.id)) {
      next = socials.map(s => s.id === social.id ? { ...s, ...social } as SocialLink : s)
    } else {
      next = [...socials, {
        id: social.id || uid(),
        platform: social.platform || '',
        url: social.url || '',
        icon: social.icon || 'Link',
        order_index: social.order_index || socials.length + 1,
      }]
    }
    setSocials(next)
    write({ socials: next }, base())
    return { error: null }
  }

  const deleteSocial = async (id: string) => {
    const next = socials.filter(s => s.id !== id)
    setSocials(next)
    write({ socials: next }, base())
    return { error: null }
  }

  const updateSettings = async (data: Partial<SiteSettings>) => {
    const next = { ...settings, ...data }
    setSettings(next)
    write({ settings: next }, base())
    return { error: null }
  }

  const uploadImage = async (file: File) => {
    return new Promise<{ url: string | null; error: Error | null }>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve({ url: reader.result as string, error: null })
      reader.onerror = () => resolve({ url: null, error: new Error("Rasm o'qib bo'lmadi") })
      reader.readAsDataURL(file)
    })
  }

  return (
    <DataContext.Provider value={{
      profile, about, skills, projects, bots, resume, socials, settings, loading,
      refreshData, updateProfile, upsertAbout, deleteAbout,
      upsertProject, deleteProject, upsertBot, deleteBot, upsertResume, deleteResume, upsertSocial, deleteSocial,
      updateSettings, uploadImage
    }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
