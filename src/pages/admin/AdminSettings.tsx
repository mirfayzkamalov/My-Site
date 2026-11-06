import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Save } from 'lucide-react'

export default function AdminSettings() {
  const { settings, updateSettings } = useData()
  const [form, setForm] = useState({
    site_title: settings.site_title,
    site_description: settings.site_description,
    show_age: settings.show_age,
    show_location: settings.show_location,
    maintenance_mode: settings.maintenance_mode,
  })
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await updateSettings(form)
    setMessage('Sozlamalar saqlandi!')
    setSaving(false)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sayt sozlamalari</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
      </div>

      {message && <div className="mb-4 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">{message}</div>}

      <div className="max-w-lg glass rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Sayt nomi</label>
          <input
            value={form.site_title}
            onChange={e => setForm({ ...form, site_title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm text-[var(--text-secondary)] mb-1">Tavsif</label>
          <textarea
            value={form.site_description}
            onChange={e => setForm({ ...form, site_description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm resize-none"
          />
        </div>
        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={form.show_age} onChange={e => setForm({ ...form, show_age: e.target.checked })} className="rounded" />
            Yoshni ko'rsatish
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={form.show_location} onChange={e => setForm({ ...form, show_location: e.target.checked })} className="rounded" />
            Joylashuvni ko'rsatish
          </label>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={form.maintenance_mode} onChange={e => setForm({ ...form, maintenance_mode: e.target.checked })} className="rounded" />
            Texnik ishlar rejimi
          </label>
        </div>
      </div>
    </div>
  )
}
