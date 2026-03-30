import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-scroll'
import { useTypewriter } from '../hooks/useTypewriter'
import { ZoomImage } from './ZoomImage'

export const Hero = () => {
  const { scrollY } = useScroll()

  // Parallax transforms - background moves slower than content (0.5x speed)
  const bgGlow1Y = useTransform(scrollY, [0, 500], [0, -15])
  const bgGlow2Y = useTransform(scrollY, [0, 500], [0, -20])
  const bgGlow3Y = useTransform(scrollY, [0, 500], [0, -10])

  const { displayText } = useTypewriter({
    text: 'I design intelligent systems, craft digital experiences, and turn ideas into scalable products.',
    speed: 30,
    delay: 500,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative min-h-screen w-full bg-gray-950 overflow-hidden flex items-center justify-center pt-20 md:pt-32 pb-20"
    >
      {/* Gradient glow background with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: bgGlow1Y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          style={{ y: bgGlow2Y }}
          className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl opacity-40"
        />
        <motion.div
          style={{ y: bgGlow3Y }}
          className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl opacity-30"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 text-center"
      >
        {/* Profile Image with Zoom */}
        <motion.div variants={itemVariants}>
          <ZoomImage />
        </motion.div>

        {/* Name and Role */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Ilakkiyaa Jaisankar</h1>
          <p className="text-lg md:text-xl text-blue-400 font-semibold">
            AI Developer | Creative Technologist | Freelancer
          </p>
        </motion.div>

        {/* Tagline with typing animation */}
        <motion.div variants={itemVariants} className="mb-12 min-h-24">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            {displayText}
            <span className="inline-block w-0.5 h-6 md:h-7 bg-blue-500 ml-1 animate-pulse" />
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <Link
            to="projects"
            spy
            smooth
            duration={500}
            offset={-80}
            className="hover-grow px-8 py-3 md:px-10 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 cursor-pointer inline-block"
            data-cursor="view"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full"
            >
              View My Work
            </motion.div>
          </Link>
          <Link
            to="contact"
            spy
            smooth
            duration={500}
            offset={-80}
            className="hover-grow px-8 py-3 md:px-10 md:py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300 cursor-pointer inline-block"
            data-cursor="click"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-full"
            >
              Let's Work Together
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
