import { memo } from 'react'
import { motion } from 'framer-motion'

interface Service {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'AI Chatbot Development',
    description: 'Intelligent conversational AI systems with NLP, RAG, and real-time integration capabilities',
    icon: '🤖',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 2,
    title: 'Website Development',
    description: 'Modern, responsive websites built with React, Next.js, and optimized for performance',
    icon: '🌐',
    color: 'from-purple-600 to-pink-500',
  },
  {
    id: 4,
    title: 'Social Media Management',
    description: 'Strategic content planning, community engagement, and growth optimization',
    icon: '📢',
    color: 'from-orange-600 to-red-500',
  },
  {
    id: 5,
    title: 'Content Creation',
    description: 'Engaging visual and written content, video production, and brand storytelling',
    icon: '✨',
    color: 'from-pink-600 to-rose-500',
  },
]

const ServiceCard = memo(({ service, delay }: { service: Service; delay: number }) => {
  return (
    <motion.div
      data-cursor="view"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ y: -8 }}
      className="group h-full cursor-pointer"
    >
      <div className={`relative bg-gradient-to-br ${service.color} p-1 rounded-2xl h-full transition-all duration-300 group-hover:shadow-lg`}>
        <div className="relative h-full bg-gray-950 rounded-2xl p-8 flex flex-col items-center text-center group-hover:bg-gradient-to-br group-hover:from-gray-900 group-hover:to-gray-950 transition-all duration-300">
          {/* Icon */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="text-5xl mb-4"
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed flex-grow">{service.description}</p>

          {/* Divider */}
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded mt-6 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Learn more link */}
          <motion.button
            whileHover={{ x: 4 }}
            className="text-blue-400 font-semibold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Learn More →
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
})

export const Services = memo(() => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-gray-950 py-24 md:py-32 px-6 md:px-8 border-t border-gray-800/50"
    >
      {/* Background gradient accents */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

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
            Services
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            What I Offer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            End-to-end solutions combining technology, creativity, and strategic thinking
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </motion.section>
  )
})
