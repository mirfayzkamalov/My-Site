import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] overflow-hidden dark">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,0.6) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
        }}
      />
      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] rounded-full bg-sky-500/20 blur-[120px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute w-[300px] h-[300px] rounded-full bg-violet-600/15 blur-[100px] translate-x-32 -translate-y-20"
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(56,189,248,0.3)',
              '0 0 50px rgba(56,189,248,0.55)',
              '0 0 20px rgba(56,189,248,0.3)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center mb-8"
        >
          <Code2 className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-2xl font-bold tracking-tight mb-2"
        >
          <span style={{color:"#fff"}}>My</span>
          <span className="text-sky-400">Site</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-500 text-sm mb-10"
        >
          Mirfayz Kamolov
        </motion.p>

        {/* Progress bar */}
        <div className="w-48 h-[3px] rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4.6, ease: 'easeInOut' }}
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 4.5, times: [0, 0.1, 0.85, 1] }}
          className="text-[11px] text-slate-600 mt-4 tracking-widest uppercase"
        >
          Loading experience
        </motion.p>
      </motion.div>
    </div>
  )
}
