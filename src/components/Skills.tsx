import { memo } from 'react'
import { motion } from 'framer-motion'
import { FaRobot, FaBrain, FaCog, FaBook, FaGlobe, FaAtom, FaFire, FaPlug, FaStar, FaFilm, FaBullhorn } from 'react-icons/fa'

interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  title: string
  color: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'AI & ML',
    color: 'from-blue-600 to-cyan-500',
    skills: [
      { name: 'AI Chatbot Development', icon: 'robot' },
      { name: 'RAG (Retrieval-Augmented Generation)', icon: 'brain' },
      { name: 'AI Model Integration', icon: 'cog' },
      { name: 'Basic NLP Training', icon: 'book' },
    ],
  },
  {
    title: 'Development',
    color: 'from-purple-600 to-pink-500',
    skills: [
      { name: 'HTML, CSS, JavaScript', icon: 'globe' },
      { name: 'React', icon: 'atom' },
      { name: 'Firebase', icon: 'fire' },
      { name: 'APIs', icon: 'plug' },
    ],
  },
  {
    title: 'Creative',
    color: 'from-orange-600 to-red-500',
    skills: [
      { name: 'Content Creation', icon: 'star' },
      { name: 'Video Editing', icon: 'film' },
      { name: 'Social Media Management', icon: 'megaphone' },
    ],
  },
]

const iconMap: Record<string, React.ReactNode> = {
  robot: <FaRobot />,
  brain: <FaBrain />,
  cog: <FaCog />,
  book: <FaBook />,
  globe: <FaGlobe />,
  atom: <FaAtom />,
  fire: <FaFire />,
  plug: <FaPlug />,
  star: <FaStar />,
  film: <FaFilm />,
  megaphone: <FaBullhorn />,
}

const SkillCard = memo(({ skill, delay, color }: { skill: Skill; delay: number; color: string }) => {
  return (
    <motion.div
      data-cursor="view"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative cursor-pointer"
    >
      <div className={`relative bg-gradient-to-br ${color} p-1 rounded-xl transition-all duration-300 group-hover:shadow-lg`}>
        <div className="bg-gray-950 rounded-lg p-6 h-full flex flex-col items-center justify-center text-center hover:bg-gray-900/80 transition-colors duration-300">
          <span className="text-4xl mb-3 text-blue-400">
            {iconMap[skill.icon]}
          </span>
          <p className="text-gray-200 font-semibold text-sm leading-snug">{skill.name}</p>
        </div>
      </div>
    </motion.div>
  )
})

export const Skills = memo(() => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-gray-950 py-24 md:py-32 px-6 md:px-8 border-t border-gray-800/50"
    >  {/* Background gradient accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

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
            What I Do
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Skills & Expertise
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A diverse skill set spanning AI/ML, web development, and creative technology
          </motion.p>
        </motion.div>

        {/* Skills grid */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: categoryIndex * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              {/* Category title */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.1 + 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-center gap-4"
              >
                <div className={`w-1 h-12 bg-gradient-to-b ${category.color} rounded`} />
                <h3 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h3>
              </motion.div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.15 + skillIndex * 0.08}
                    color={category.color}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </motion.section>
  )
})
