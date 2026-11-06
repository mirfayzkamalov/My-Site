import { useData } from '../../contexts/DataContext'
import { Image as ImageIcon } from 'lucide-react'

export default function AdminImages() {
  const { profile, projects } = useData()

  const images = [
    ...(profile.avatar_url ? [{ url: profile.avatar_url, label: 'Profil rasmi', type: 'profile' }] : []),
    ...projects.filter(p => p.image_url).map(p => ({ url: p.image_url!, label: p.title, type: 'project' })),
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rasmlar boshqaruvi</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        Rasmlarni yuklash uchun tegishli bo'limlarga (Bosh sahifa yoki Loyihalar) o'ting.
      </p>

      {images.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <ImageIcon className="w-12 h-12 text-primary-500/30 mx-auto mb-3" />
          <p className="text-[var(--text-secondary)]">Hozircha yuklangan rasmlar yo'q</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="glass rounded-xl overflow-hidden">
              <img src={img.url} alt={img.label} className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium truncate">{img.label}</p>
                <p className="text-xs text-[var(--text-secondary)]">{img.type === 'profile' ? 'Profil' : 'Loyiha'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
