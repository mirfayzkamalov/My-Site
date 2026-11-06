import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Save, Upload } from 'lucide-react'

export default function AdminHome() {
  const { profile, settings, updateProfile, updateSettings, uploadImage } = useData()
  const [form, setForm] = useState({
    full_name: profile.full_name,
    title: profile.title,
    bio: profile.bio,
    age: profile.age || '',
    location: profile.location || '',
    email: profile.email || '',
    hero_title: settings.hero_title,
    hero_subtitle: settings.hero_subtitle,
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    await updateProfile({
      full_name: form.full_name,
      title: form.title,
      bio: form.bio,
      age: form.age ? Number(form.age) : null,
      location: form.location || null,
      email: form.email || null,
    })
    await updateSettings({
      hero_title: form.hero_title,
      hero_subtitle: form.hero_subtitle,
    })
    setMessage('Saqlandi!')
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { url, error } = await uploadImage(file, 'profile-images')
    if (url) {
      await updateProfile({ avatar_url: url })
      setMessage('Rasm yuklandi!')
    } else if (error) {
      setMessage('Xato: ' + error.message)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Bosh sahifa sozlamalari</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold mb-2">Profil ma'lumotlari</h2>
          
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Ism</label>
            <input
              value={form.full_name}
              onChange={e => setForm({ ...form, full_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Kasb / Unvon</label>
            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Bio</label>
            <textarea
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Yosh</label>
              <input
                type="number"
                value={form.age}
                onChange={e => setForm({ ...form, age: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Joylashuv</label>
              <input
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
            <input
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold mb-2">Hero sozlamalari</h2>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Hero sarlavha</label>
              <input
                value={form.hero_title}
                onChange={e => setForm({ ...form, hero_title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Hero pastki matn</label>
              <input
                value={form.hero_subtitle}
                onChange={e => setForm({ ...form, hero_subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold mb-4">Profil rasmi</h2>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-primary-500/50 transition-colors">
              <Upload className="w-8 h-8 text-[var(--text-secondary)] mb-2" />
              <span className="text-sm text-[var(--text-secondary)]">Rasm yuklash</span>
              <input type="file" accept="image/*" onChange={handleAvatar} className="hidden" />
            </label>
            {profile.avatar_url && (
              <img src={profile.avatar_url} alt="Avatar" className="mt-4 w-24 h-24 rounded-xl object-cover" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
