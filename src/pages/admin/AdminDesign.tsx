export default function AdminDesign() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dizayn sozlamalari</h1>
      <div className="glass rounded-2xl p-6">
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          Hozirda sayt dark mode asosida ishlaydi. Tema o'zgartirish navbar orqali amalga oshiriladi.
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-500" />
            <span className="text-sm">Primary — #8b5cf6 (Violet)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-dark-950 border border-white/10" />
            <span className="text-sm">Background — #020617</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-600 to-indigo-600" />
            <span className="text-sm">Gradient</span>
          </div>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mt-6">
          Kelajakda ranglar va shriftlarni o'zgartirish imkoniyati qo'shiladi.
        </p>
      </div>
    </div>
  )
}
