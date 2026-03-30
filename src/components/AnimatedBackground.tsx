import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const AnimatedBackground = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="fixed inset-0 bg-black -z-10 overflow-hidden">
      {/* Deep black base */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      {/* Aurora Layer 1 - Purple glow (optimized) */}
      {!isMobile && (
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1/4 -left-1/4 w-full h-full"
          style={{
            background: `radial-gradient(ellipse 150% 80% at 20% 80%,
              rgba(168, 85, 247, 0.3) 0%,
              rgba(168, 85, 247, 0.12) 30%,
              transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Aurora Layer 2 - Blue glow (optimized) */}
      {!isMobile && (
        <motion.div
          animate={{
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute -top-1/4 -right-1/4 w-full h-full"
          style={{
            background: `radial-gradient(ellipse 140% 90% at 80% 20%,
              rgba(59, 130, 246, 0.25) 0%,
              rgba(59, 130, 246, 0.08) 30%,
              transparent 70%)`,
            filter: 'blur(35px)',
          }}
        />
      )}

      {/* Subtle noise texture (very faint) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' fill='white'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep vignette for cinematic edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)`,
        }}
      />

      {/* Reduced motion support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
