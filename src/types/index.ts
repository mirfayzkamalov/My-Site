export interface Profile {
  id: string
  full_name: string
  title: string
  bio: string
  avatar_url: string | null
  age: number | null
  location: string | null
  email: string | null
  created_at?: string
  updated_at?: string
}

export interface AboutInfo {
  id: string
  section: string
  title: string
  content: string
  order_index: number
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  technologies: string[]
  project_url: string | null
  github_url: string | null
  featured: boolean
  order_index: number
  created_at?: string
  updated_at?: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  order_index: number
}

export interface SiteSettings {
  id: string
  site_title: string
  site_description: string
  hero_title: string
  hero_subtitle: string
  primary_color: string
  show_age: boolean
  show_location: boolean
  maintenance_mode: boolean
}

export interface SiteStats {
  total_projects: number
  total_views: number
  featured_projects: number
}

export interface BotItem {
  id: string
  name: string
  description: string
  url: string
  status: 'active' | 'inactive'
  order_index: number
}

export interface ResumeItem {
  id: string
  type: 'education' | 'experience'
  title: string
  place: string
  period: string
  description: string
  order_index: number
}
