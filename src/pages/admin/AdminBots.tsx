import { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Plus, Trash2, Save, Bot as BotIcon } from 'lucide-react'
import type { BotItem } from '../../types'

export default function AdminBots() {
  const { bots, upsertBot, deleteBot } = useData()
  const [editing, setEditing] = useState<Partial<BotItem> | null>(null)
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    if (!editing || !editing.name?.trim()) {
      setMessage('Bot nomini kiriting!')
      return
    }
    setSaving(true)
    const { error } = await upsertBot({
      id: editing.id,
      name: editing.name.trim(),
      description: editing.description || '',
      url: editing.url || '',
      status: editing.status || 'active',
      order_index: editing.order_index || bots.length + 1,
    })
    setSaving(false)
    if (!error) {
      setMessage('Saqlandi!')
      setEditing(null)
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Botni o'chirishni tasdiqlaysizmi?")) return
    await deleteBot(id)
    setMessage("O'chirildi")
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Botlarim</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Jami: <span className="text-sky-400 font-semibold">{bots.length}</span> ta bot
          </p>
        </div>
        <button
          onClick={() => setEditing({ name: '', description: '', url: '', status: 'active', order_index: bots.length + 1 })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Yangi bot
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm">
          {message}
        </div>
      )}

      {editing && (
        <div className="glass rounded-2xl p-6 mb-6 space-y-4">
          <h2 className="font-semibold">{editing.id ? 'Tahrirlash' : 'Yangi bot'}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Nomi *</label>
              <input
                value={editing.name || ''}
                onChange={e => setEditing({ ...editing, name: e.target.value })}
                placeholder="@my_bot"
                className="w-full px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">Telegram URL</label>
              <input
                value={editing.url || ''}
                onChange={e => setEditing({ ...editing, url: e.target.value })}
                placeholder="https://t.me/..."
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
            <label className="block text-sm text-[var(--text-secondary)] mb-1">Holat</label>
            <select
              value={editing.status || 'active'}
              onChange={e => setEditing({ ...editing, status: e.target.value as 'active' | 'inactive' })}
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl glass border border-white/10 focus:border-sky-500 focus:outline-none text-sm bg-transparent"
            >
              <option value="active">Faol</option>
              <option value="inactive">Nofaol</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm disabled:opacity-50">
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
        {bots.map((b) => (
          <div key={b.id} className="glass rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                  <BotIcon className="w-5 h-5 text-sky-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium truncate">{b.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${b.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                      {b.status === 'active' ? 'Faol' : 'Nofaol'}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-1">{b.description}</p>
                  {b.url && <a href={b.url} target="_blank" rel="noreferrer" className="text-xs text-sky-400 truncate block">{b.url}</a>}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => setEditing(b)} className="px-3 py-1 rounded-lg text-xs glass hover:bg-sky-500/10">Tahrirlash</button>
                <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bots.length === 0 && (
        <p className="text-center text-[var(--text-secondary)] py-10">Hali bot yo'q. "Yangi bot" bosing.</p>
      )}
    </div>
  )
}
