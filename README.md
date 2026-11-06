# My Site — Premium Personal Portfolio

Mirfayz uchun premium, futuristik, dark-mode asosidagi shaxsiy portfolio veb-sayti.

## Texnologiyalar

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion** (animatsiyalar)
- **Supabase** (Auth + Database + Storage)
- **Lucide React** (ikonkalar)
- **React Router**

## Xususiyatlar

- Premium dark/light mode dizayn
- Glassmorphism + gradient effektlar
- To'liq admin panel (`/admin`)
- Supabase Auth bilan xavfsiz autentifikatsiya
- CRUD: loyihalar, ma'lumotlar, ijtimoiy tarmoqlar, sozlamalar
- Rasm yuklash (Storage)
- Responsive (mobil, planshet, desktop)
- Silliq animatsiyalar

## O'rnatish

### 1. Loyihani yuklab oling va o'rnating

```bash
cd my-site-portfolio
npm install
```

### 2. Supabase loyihasini yarating

1. [supabase.com](https://supabase.com) ga kiring va yangi loyiha yarating.
2. **SQL Editor** ga o'ting va `supabase-schema.sql` faylidagi barcha SQL kodni ishga tushiring.
3. **Storage** bo'limida ikkita bucket yarating:
   - `profile-images` (Public)
   - `project-images` (Public)
4. Har bir bucket uchun Policies:
   - SELECT: public
   - INSERT / UPDATE / DELETE: authenticated
5. **Authentication → Users → Add user**:
   - Email: `admin@mysite.com`
   - Password: `2016mirfayz`
   - (Yoki o'zingiz xohlagan email/parol)

### 3. Environment sozlamalari

`.env.example` ni `.env` ga nusxalang:

```bash
cp .env.example .env
```

`.env` faylini to'ldiring:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

(Supabase Dashboard → Settings → API dan oling)

### 4. Ishga tushirish

```bash
npm run dev
```

Brauzerda ochiladi: `http://localhost:5173`

### 5. Admin panel

- Manzil: `http://localhost:5173/admin`
- Email: `admin@mysite.com`
- Parol: `2016mirfayz`

## Build (production)

```bash
npm run build
npm run preview
```

## Muhim eslatmalar

- Agar Supabase sozlanmagan bo'lsa, sayt default (demo) ma'lumotlar bilan ishlaydi.
- Parol hech qachon frontend kodida saqlanmaydi — faqat Supabase Auth orqali.
- RLS siyosatlari faqat autentifikatsiyadan o'tgan foydalanuvchiga yozishga ruxsat beradi.
- Admin panelda parolni o'zgartirish mumkin (`Xavfsizlik` bo'limi).

## Loyiha tuzilishi

```
src/
├── components/     # Navbar, Footer, ProjectCard, LoadingScreen
├── contexts/       # Theme, Auth, Data
├── pages/          # Home, About, Sites + admin/*
├── lib/            # Supabase client
└── types/          # TypeScript interfeyslar
```

---

Made with ❤️ for Mirfayz
