import { memo } from 'react'
import { motion } from 'framer-motion'

export const About = memo(() => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-gray-950 py-24 md:py-32 px-6 md:px-8 flex items-center justify-center border-t border-gray-800/50"
    >
      {/* Gradient accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div
        className="relative z-10 max-w-3xl"
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4"
        >
          About Me
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-3xl md:text-5xl font-bold text-white mb-8"
        >
          Building the Future with Code & AI
        </motion.h2>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-3">Education</h3>
          <div className="flex items-start gap-4">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded" />
            <div>
              <p className="text-lg text-white font-medium">BE Electrical & Computer Engineering</p>
              <p className="text-gray-400">2nd Year</p>
            </div>
          </div>
        </motion.div>

        {/* Passion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Passion</h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            I'm deeply passionate about{' '}
            <span className="text-blue-400 font-semibold">artificial intelligence</span>, cutting-edge{' '}
            <span className="text-blue-400 font-semibold">development</span>, and{' '}
            <span className="text-blue-400 font-semibold">creative technology</span>. I believe in leveraging
            technology to solve real problems and create meaningful digital experiences that make an impact.
          </p>
        </motion.div>

        {/* Stats or highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center gap-12 md:gap-16 border-t border-gray-800 pt-8"
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">20+</p>
            <p className="text-sm text-gray-400">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">100%</p>
            <p className="text-sm text-gray-400">Client Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
})
