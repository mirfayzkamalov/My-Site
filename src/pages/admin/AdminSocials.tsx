import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Plus, Trash2, Save } from 'lucide-react'
import type { SocialLink } from '../../types'

export default function AdminSocials() {
  const { socials, upsertSocial, deleteSocial } = useData()
  const [editing, setEditing] = useState<Partial<SocialLink> | null>(null)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    if (!editing || !editing.platform || !editing.url) return
    const { error } = await upsertSocial({
      id: editing.id,
      platform: editing.platform,
      url: editing.url,
      icon: editing.icon || 'Link',
      order_index: editing.order_index || socials.length + 1,
    })
    if (!error) {
      setMessage('Saqlandi!')
      setEditing(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('O\'chirishni tasdiqlaysizmi?')) return
    await deleteSocial(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ijtimoiy tarmoqlar</h1>
        <button
          onClick={() => setEditing({ platform: '', url: '', icon: 'Link', order_index: socials.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Qo'shish
        </button>
      </div>

      {message && <div className="mb-4 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">{message}</div>}

      {editing && (
        <div className="glass rounded-2xl p-6 mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Platforma</label>
              <input value={editing.platform || ''} onChange={e => setEditing({ ...editing, platform: e.target.value })}
                placeholder="GitHub, Telegram..." className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">URL</label>
              <input value={editing.url || ''} onChange={e => setEditing({ ...editing, url: e.target.value })}
                placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Icon (Lucide nomi)</label>
              <input value={editing.icon || ''} onChange={e => setEditing({ ...editing, icon: e.target.value })}
                placeholder="Github, Send, Linkedin..." className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm">
              <Save className="w-4 h-4" /> Saqlash
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl glass text-sm">Bekor qilish</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {socials.map(s => (
          <div key={s.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{s.platform}</p>
              <p className="text-sm text-[var(--text-secondary)] truncate max-w-md">{s.url}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(s)} className="px-3 py-1 rounded-lg text-xs glass hover:bg-primary-500/10">Tahrirlash</button>
              <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
