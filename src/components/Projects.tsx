import { useState, useCallback, memo } from 'react'
import { motion } from 'framer-motion'
import { ProjectModal } from './ProjectModal'
import type { ProjectData } from './ProjectModal'

const projects: ProjectData[] = [
  {
    id: 1,
    title: 'AI Chatbot System',
    description: 'Intelligent conversational AI with RAG capabilities',
    icon: '🤖',
    gradient: 'from-blue-600 to-cyan-500',
    problem:
      'Users needed an intelligent assistant that could provide accurate, context-aware responses by retrieving and referencing specific information from large knowledge bases in real-time.',
    solution:
      'Built a sophisticated AI chatbot system leveraging Retrieval-Augmented Generation (RAG) to combine large language models with dynamic document retrieval. Implemented vector embeddings for semantic search, allowing the system to fetch relevant context before generating responses.',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'Pinecone', 'FastAPI', 'React'],
    outcome:
      'Deployed a chatbot that achieved 95% accuracy in retrieving relevant documents and significantly reduced response time. Users reported 40% faster problem-solving and improved satisfaction with contextually accurate answers.',
  },
  {
    id: 2,
    title: 'Event Discovery App',
    description: 'Real-time event discovery and booking platform',
    icon: '🎪',
    gradient: 'from-purple-600 to-pink-500',
    problem:
      'Users struggled to discover local events that matched their interests, with fragmented information spread across multiple platforms causing missed opportunities and poor event discovery experience.',
    solution:
      'Developed a cross-platform event discovery application that aggregates events from multiple sources, provides personalized recommendations using machine learning, and enables seamless booking. Built with real-time filtering, location-based search, and smart notifications.',
    techStack: ['React', 'Firebase', 'Google Maps API', 'Machine Learning', 'Node.js', 'MongoDB'],
    outcome:
      'Deployed to 50K+ users, generating 200K+ event bookings. Users saved average 30 minutes per month discovering events, and platform saw 85% retention rate with 4.8/5 app rating.',
  },
  {
    id: 3,
    title: 'WhatsApp Expense Tracker',
    description: 'Automated expense tracking via WhatsApp bot',
    icon: '💰',
    gradient: 'from-green-600 to-emerald-500',
    problem:
      'People found it tedious to manually log expenses, leading to poor financial tracking and inability to analyze spending patterns. Existing solutions required switching apps and complex interfaces.',
    solution:
      'Created a WhatsApp chatbot that captures expenses through simple text messages, automatically categorizes spending, and provides insights through data visualization. Integrated with banking APIs for real-time balance checks and spending categorization.',
    techStack: ['Twilio', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'Google Cloud'],
    outcome:
      'Users tracked expenses 3x more consistently, with 70% increase in spending awareness. Platform processed 5M+ transactions and helped users identify and reduce unnecessary spending by average 20%.',
  },
]

const ProjectCard = memo(({
  project,
  onOpen,
  delay,
}: {
  project: ProjectData
  onOpen: (project: ProjectData) => void
  delay: number
}) => {
  return (
    <motion.button
      data-cursor="view"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true, amount: 0.5 }}
      onClick={() => onOpen(project)}
      className="text-left group h-full"
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative h-full"
      >
        {/* Gradient border */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${project.gradient} p-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Card content */}
        <div className="relative h-full bg-gray-900 rounded-2xl p-8 border border-gray-800 group-hover:border-gray-700 transition-colors duration-300">
          {/* Icon */}
          <div className="text-5xl mb-4">
            {project.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 mb-6 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* CTA */}
          <motion.div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
            <span>View Details</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.div>
        </div>
      </motion.div>
    </motion.button>
  )
})

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)

  // Memoize callback to prevent unnecessary re-renders of ProjectCard
  const handleOpenProject = useCallback((project: ProjectData) => {
    setSelectedProject(project)
  }, [])

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-gray-950 py-24 md:py-32 px-6 md:px-8 border-t border-gray-800/50"
    >
      {/* Background gradient accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-4"
          >
            Portfolio
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Featured Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Innovative solutions combining AI, development, and creative technology
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={handleOpenProject}
              delay={index * 0.1}
            />
          ))}
        </div>


      </div>

      {/* Modal */}
      <ProjectModal project={selectedProject} onClose={handleCloseProject} />
    </motion.section>
  )
}
