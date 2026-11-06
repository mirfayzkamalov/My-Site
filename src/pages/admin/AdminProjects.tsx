import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Plus, Trash2, Save, Upload, ExternalLink } from 'lucide-react'
import type { Project } from '../../types'

export default function AdminProjects() {
  const { projects, upsertProject, deleteProject, uploadImage } = useData()
  const [editing, setEditing] = useState<Partial<Project> | null>(null)
  const [techInput, setTechInput] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!editing || !editing.title?.trim()) {
      setMessage("Loyiha nomini kiriting!")
      return
    }
    setSaving(true)
    const { error } = await upsertProject({
      id: editing.id,
      title: editing.title.trim(),
      description: editing.description || '',
      image_url: editing.image_url || null,
      technologies: editing.technologies || [],
      project_url: editing.project_url || null,
      github_url: editing.github_url || null,
      featured: editing.featured !== false,
      order_index: editing.order_index || projects.length + 1,
    })
    setSaving(false)
    if (!error) {
      setMessage(`Saqlandi! Jami loyihalar: ${editing.id ? projects.length : projects.length + 1}`)
      setEditing(null)
      setTechInput('')
      setTimeout(() => setMessage(''), 3000)
    } else {
      setMessage('Xato: ' + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Loyihani o'chirishni tasdiqlaysizmi?")) return
    await deleteProject(id)
    setMessage("O'chirildi")
    setTimeout(() => setMessage(''), 3000)
  }

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editing) return
    const { url, error } = await uploadImage(file, 'project-images')
    if (url) {
      setEditing({ ...editing, image_url: url })
      setMessage('Rasm yuklandi')
    } else if (error) {
      setMessage(error.message)
    }
  }

  const addTech = () => {
    if (!techInput.trim() || !editing) return
    const techs = [...(editing.technologies || []), techInput.trim()]
    setEditing({ ...editing, technologies: techs })
    setTechInput('')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Mening saytlarim</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Jami: <span className="text-sky-400 font-semibold">{projects.length}</span> ta loyiha
          </p>
        </div>
        <button
          onClick={() => setEditing({
            title: '',
            description: '',
            technologies: [],
            featured: true,
            order_index: projects.length + 1
          })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Yangi loyiha
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm">
          {message}
        </div>
      )}

      {editing && (
        <div className="glass rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold">{editing.id ? 'Tahrirlash' : 'Yangi loyiha'}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Nomi *</label>
              <input
                value={editing.title || ''}
                onChange={e => setEditing({ ...editing, title: e.target.value })}
                placeholder="Masalan: Mening portfolio"
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">URL</label>
              <input
                value={editing.project_url || ''}
                onChange={e => setEditing({ ...editing, project_url: e.target.value })}
                placeholder="https://..."
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

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Texnologiyalar</label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
                placeholder="React, TypeScript..."
                className="flex-1 px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm"
              />
              <button type="button" onClick={addTech} className="px-4 py-2 rounded-xl glass text-sm">+</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(editing.technologies || []).map((t, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-sky-500/10 text-sky-400 flex items-center gap-1">
                  {t}
                  <button
                    type="button"
                    onClick={() => setEditing({
                      ...editing,
                      technologies: editing.technologies?.filter((_, idx) => idx !== i)
                    })}
                    className="hover:text-red-400"
                  >×</button>
                </span>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={editing.featured !== false}
              onChange={e => setEditing({ ...editing, featured: e.target.checked })}
              className="rounded"
            />
            Bosh sahifada ko'rsatish (Tanlangan)
          </label>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">Rasm</label>
            <label className="flex items-center gap-2 px-4 py-2 rounded-xl glass cursor-pointer hover:bg-white/5 w-fit text-sm">
              <Upload className="w-4 h-4" />
              Rasm yuklash
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
            {editing.image_url && (
              <img src={editing.image_url} alt="" className="mt-2 w-32 h-20 object-cover rounded-lg" />
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl glass text-sm">
              Bekor qilish
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{p.title}</h3>
                  {p.featured && (
                    <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-400">Tanlangan</span>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {p.technologies?.slice(0, 3).map(t => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400">{t}</span>
                  ))}
                </div>
                {p.project_url && (
                  <a href={p.project_url} target="_blank" rel="noreferrer" className="text-xs text-sky-400 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> Link
                  </a>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => setEditing(p)} className="px-3 py-1 rounded-lg text-xs glass hover:bg-sky-500/10">
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-[var(--text-secondary)] py-10">Hali loyiha yo'q. "Yangi loyiha" bosing.</p>
      )}
    </div>
  )
}
