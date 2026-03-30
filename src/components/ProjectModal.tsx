import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRobot, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa'

export interface ProjectData {
  id: number
  title: string
  description: string
  icon: string
  gradient: string
  problem: string
  solution: string
  techStack: string[]
  outcome: string
}

const iconMap: Record<string, React.ReactNode> = {
  robot: <FaRobot />,
  calendar: <FaCalendarAlt />,
  money: <FaMoneyBillWave />,
}

interface ProjectModalProps {
  project: ProjectData | null
  onClose: () => void
}

export const ProjectModal = memo(({ project, onClose }: ProjectModalProps) => {
  if (!project) return null

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-gray-700/50 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${project.gradient} p-8 relative`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-start gap-4">
                <span className="text-5xl text-white">{iconMap[project.icon]}</span>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                  <p className="text-white/90">{project.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Problem */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-red-400">⚠️</span> Problem
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.problem}</p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-green-400">✅</span> Solution
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.solution}</p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-blue-400">⚙️</span> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Outcome */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-yellow-400">🎯</span> Outcome
                </h3>
                <p className="text-gray-300 leading-relaxed">{project.outcome}</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})
