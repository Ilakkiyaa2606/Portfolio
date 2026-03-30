import { memo } from 'react'
import { motion } from 'framer-motion'

interface HeaderProps {
  title: string
}

export const Header = memo(({ title }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-900 border-b border-gray-800 py-6 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>
    </motion.header>
  )
})
