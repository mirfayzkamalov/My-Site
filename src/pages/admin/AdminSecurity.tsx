import { Shield } from 'lucide-react'

export default function AdminSecurity() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Xavfsizlik va parol</h1>

      <div className="max-w-md glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h2 className="font-semibold">Admin parol</h2>
            <p className="text-xs text-[var(--text-secondary)]">Hozirgi rejim: lokal parol</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 text-sm text-[var(--text-secondary)] space-y-2">
          <p>Joriy parol: <span className="text-violet-400 font-mono font-semibold">mirfayzbek2016mirfayzm</span></p>
          <p className="text-xs">Parolni o'zgartirish uchun <code className="text-violet-400">src/contexts/AuthContext.tsx</code> faylida <code className="text-violet-400">ADMIN_PASSWORD</code> qiymatini o'zgartiring.</p>
        </div>
      </div>
    </div>
  )
}
