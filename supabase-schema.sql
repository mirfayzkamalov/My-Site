-- =============================================
-- MY SITE — Supabase Schema + RLS
-- =============================================

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Mirfayz',
  title TEXT DEFAULT 'Full-Stack Developer',
  bio TEXT,
  avatar_url TEXT,
  age INTEGER,
  location TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. About info
CREATE TABLE IF NOT EXISTS about_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Social links
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT DEFAULT 'Link',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT DEFAULT 'My Site — Mirfayz',
  site_description TEXT DEFAULT 'Premium shaxsiy portfolio',
  hero_title TEXT DEFAULT 'Salom, men Mirfayzman',
  hero_subtitle TEXT DEFAULT 'Full-Stack Developer & Digital Creator',
  primary_color TEXT DEFAULT '#8b5cf6',
  show_age BOOLEAN DEFAULT TRUE,
  show_location BOOLEAN DEFAULT TRUE,
  maintenance_mode BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read about" ON about_info FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read socials" ON social_links FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Authenticated (admin) full access
CREATE POLICY "Admin all profiles" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all about" ON about_info FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all socials" ON social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKETS
-- =============================================
-- Run these in Supabase Dashboard > Storage or via SQL:

-- INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);

-- Storage policies (public read, auth write)
-- CREATE POLICY "Public read profile images" ON storage.objects FOR SELECT USING (bucket_id = 'profile-images');
-- CREATE POLICY "Auth upload profile images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Auth update profile images" ON storage.objects FOR UPDATE USING (bucket_id = 'profile-images' AND auth.role() = 'authenticated');
-- CREATE POLICY "Auth delete profile images" ON storage.objects FOR DELETE USING (bucket_id = 'profile-images' AND auth.role() = 'authenticated');

-- Same for project-images...

-- =============================================
-- SEED DATA (optional)
-- =============================================
INSERT INTO profiles (full_name, title, bio, age, location, email)
VALUES (
  'Mirfayz',
  'Full-Stack Developer & Digital Creator',
  'Zamonaviy web texnologiyalar bilan ishlovchi professional dasturchi. Premium dizayn va yuqori sifatli kod yozishga e''tibor beraman.',
  22,
  'O''zbekiston',
  'mirfayz@example.com'
) ON CONFLICT DO NOTHING;

INSERT INTO about_info (section, title, content, order_index) VALUES
  ('about', 'Men haqimda', 'Salom! Men Mirfayzman. Web dasturlash sohasida faoliyat yuritaman. React, TypeScript, Node.js va zamonaviy texnologiyalar bilan ishlayman.', 1),
  ('experience', 'Tajriba', 'Bir necha yillik tajribaga ega full-stack dasturchi. Ko''plab loyihalarni muvaffaqiyatli yakunlaganman.', 2),
  ('goals', 'Maqsadlar', 'Eng yaxshi dasturchilardan biri bo''lish va o''z bilimlarimni boshqalar bilan bo''lishish.', 3)
ON CONFLICT DO NOTHING;

INSERT INTO site_settings (site_title, hero_title, hero_subtitle)
VALUES ('My Site — Mirfayz', 'Salom, men Mirfayzman', 'Full-Stack Developer & Digital Creator')
ON CONFLICT DO NOTHING;

-- =============================================
-- ADMIN USER
-- =============================================
-- Supabase Dashboard > Authentication > Users > Add user
-- Email: admin@mysite.com
-- Password: 2016mirfayz
-- (Yoki istalgan email/parol)
