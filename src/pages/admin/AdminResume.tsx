import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Plus, Trash2, Save, GraduationCap, Briefcase } from 'lucide-react'
import type { ResumeItem } from '../../types'

export default function AdminResume() {
  const { resume, upsertResume, deleteResume } = useData()
  const [editing, setEditing] = useState<Partial<ResumeItem> | null>(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const education = resume.filter(r => r.type === 'education').sort((a, b) => a.order_index - b.order_index)
  const experience = resume.filter(r => r.type === 'experience').sort((a, b) => a.order_index - b.order_index)

  const handleSave = async () => {
    if (!editing || !editing.title?.trim()) {
      setMessage('Sarlavhani kiriting!')
      return
    }
    setSaving(true)
    await upsertResume({
      id: editing.id,
      type: editing.type || 'experience',
      title: editing.title.trim(),
      place: editing.place || '',
      period: editing.period || '',
      description: editing.description || '',
      order_index: editing.order_index || resume.length + 1,
    })
    setSaving(false)
    setMessage('Saqlandi!')
    setEditing(null)
    setTimeout(() => setMessage(''), 2500)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("O'chirishni tasdiqlaysizmi?")) return
    await deleteResume(id)
    setMessage("O'chirildi")
    setTimeout(() => setMessage(''), 2500)
  }

  const Card = ({ item }: { item: ResumeItem }) => (
    <div className="glass rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
            {item.type === 'education' ? <GraduationCap className="w-4 h-4 text-sky-400" /> : <Briefcase className="w-4 h-4 text-sky-400" />}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-sky-400 font-medium mb-0.5">{item.period}</p>
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-xs text-[var(--text-secondary)]">{item.place}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">{item.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button onClick={() => setEditing(item)} className="px-3 py-1 rounded-lg text-xs glass hover:bg-sky-500/10">Tahrirlash</button>
          <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Rezyume</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Ta'lim va ish tajribasini boshqarish</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing({ type: 'education', title: '', place: '', period: '', description: '', order_index: education.length + 1 })}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-sm hover:bg-sky-500/10"
          >
            <Plus className="w-4 h-4" /> Ta'lim
          </button>
          <button
            onClick={() => setEditing({ type: 'experience', title: '', place: '', period: '', description: '', order_index: experience.length + 1 })}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm"
          >
            <Plus className="w-4 h-4" /> Tajriba
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm">{message}</div>
      )}

      {editing && (
        <div className="glass rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold">{editing.id ? 'Tahrirlash' : 'Yangi yozuv'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Turi</label>
              <select
                value={editing.type || 'experience'}
                onChange={e => setEditing({ ...editing, type: e.target.value as 'education' | 'experience' })}
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm bg-transparent"
              >
                <option value="education">Ta'lim</option>
                <option value="experience">Ish tajribasi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Davr</label>
              <input
                value={editing.period || ''}
                onChange={e => setEditing({ ...editing, period: e.target.value })}
                placeholder="2024 — 2026"
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Sarlavha *</label>
              <input
                value={editing.title || ''}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
                placeholder="Frontend Developer"
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Joy / Tashkilot</label>
              <input
                value={editing.place || ''}
                onChange={e => setEditing({ ...editing, place: e.target.value })}
                placeholder="Freelance"
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Tavsif</label>
            <textarea
              value={editing.description || ''}
              onChange={e => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm disabled:opacity-50">
              <Save className="w-4 h-4" /> {saving ? '...' : 'Saqlash'}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl glass text-sm">Bekor qilish</button>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-semibold text-sky-400 mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" /> Ta'lim ({education.length})
          </h2>
          <div className="space-y-3">
            {education.map(item => <Card key={item.id} item={item} />)}
            {education.length === 0 && <p className="text-sm text-[var(--text-secondary)]">Hali yozuv yo'q</p>}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-sky-400 mb-3 flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Ish tajribasi ({experience.length})
          </h2>
          <div className="space-y-3">
            {experience.map(item => <Card key={item.id} item={item} />)}
            {experience.length === 0 && <p className="text-sm text-[var(--text-secondary)]">Hali yozuv yo'q</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
