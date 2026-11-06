import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Plus, Trash2, Save } from 'lucide-react'
import type { AboutInfo } from '../../types'

export default function AdminAbout() {
  const { about, upsertAbout, deleteAbout } = useData()
  const [editing, setEditing] = useState<Partial<AboutInfo> | null>(null)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    if (!editing || !editing.section || !editing.title || !editing.content) return
    const { error } = await upsertAbout({
      id: editing.id,
      section: editing.section,
      title: editing.title,
      content: editing.content,
      order_index: editing.order_index || about.length + 1,
    })
    if (!error) {
      setMessage('Saqlandi!')
      setEditing(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return
    await deleteAbout(id)
    setMessage("O'chirildi")
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Men haqimda</h1>
        <button
          onClick={() => setEditing({ section: '', title: '', content: '', order_index: about.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Qo'shish
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm">
          {message}
        </div>
      )}

      {editing && (
        <div className="glass rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold">{editing.id ? 'Tahrirlash' : "Yangi bo'lim"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Section (kalit)</label>
              <input
                value={editing.section || ''}
                onChange={e => setEditing({ ...editing, section: e.target.value })}
                placeholder="about, experience, goals..."
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Sarlavha</label>
              <input
                value={editing.title || ''}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Matn</label>
            <textarea
              value={editing.content || ''}
              onChange={e => setEditing({ ...editing, content: e.target.value })}
              rows={5}
              className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-primary-500 focus:outline-none text-sm resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-sm">
              <Save className="w-4 h-4" /> Saqlash
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl glass text-sm">
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {about.map((item) => (
          <div key={item.id} className="glass rounded-xl p-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-0.5 rounded bg-primary-500/20 text-primary-400">{item.section}</span>
                <h3 className="font-medium">{item.title}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{item.content}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setEditing(item)}
                className="px-3 py-1.5 rounded-lg text-xs glass hover:bg-primary-500/10"
              >
                Tahrirlash
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
