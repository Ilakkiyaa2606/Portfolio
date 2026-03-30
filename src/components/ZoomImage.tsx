import { memo, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import profileImg from '../assets/Ilakkiyaa.jpeg'

/**
 * ZoomImage Component
 * 
 * A reusable profile image component with premium click-to-spin animation.
 * Features:
 * - Smooth scale and rotation animation on click
 * - Subtle, non-intrusive interaction (no fullscreen modal)
 * - Premium easeInOut motion
 * - Keyboard accessible
 * - Performance optimized with useAnimation
 * - No state bloat or unnecessary re-renders
 */
export const ZoomImage = memo(() => {
  const controls = useAnimation()

  // Trigger animation on click - scale + rotation with easeInOut
  const handleImageClick = useCallback(async () => {
    await controls.start({
      scale: [1, 1.1, 1],           // Zoom in then back to normal
      rotate: [0, 5, -5, 0],        // Spin effect: 0 → 5 → -5 → 0 degrees
      transition: {
        duration: 0.6,               // Total animation duration
        ease: 'easeInOut',          // Smooth acceleration and deceleration
      },
    })
  }, [controls])

  return (
    <>
      {/* Profile Image - Animated on Click */}
      <motion.div
        animate={controls}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative w-32 h-32 md:w-44 md:h-44 mx-auto mb-8 cursor-pointer group"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
        aria-label="Profile image - click to spin"
      >
        {/* Outer glow effect container */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.15) 100%)',
          }}
        />

        {/* Animated gradient border container */}
        <div
          className="absolute inset-0 rounded-full p-1 shadow-2xl"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6)',
          }}
        >
          {/* Soft inner glow */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.5), transparent)',
            }}
          />

          {/* Image container */}
          <div className="relative w-full h-full rounded-full bg-gray-950 p-1 overflow-hidden">
            {/* Glassmorphism overlay for premium feel */}
            <div className="absolute inset-0 rounded-full backdrop-blur-0 bg-gradient-to-br from-gray-900/0 via-transparent to-gray-950/20 pointer-events-none" />

            {/* Actual profile image */}
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full rounded-full object-cover shadow-inner transition-transform duration-300 group-hover:scale-105"
            />

            {/* Premium shine effect on top-left */}
            <div
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.8), transparent 50%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>

        {/* Soft ring shadow (always visible) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow: `
              0 0 20px rgba(59, 130, 246, 0.3),
              0 0 40px rgba(168, 85, 247, 0.15),
              inset 0 0 20px rgba(59, 130, 246, 0.1)
            `,
          }}
        />

        {/* Hover hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100"
        >
          Click to spin
        </motion.div>
      </motion.div>
    </>
  )
})

ZoomImage.displayName = 'ZoomImage'
