import { Link } from 'react-scroll'
import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  // Memoize toggle callback
  const handleToggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const navItems = [
    { label: 'Home', to: 'hero' },
    { label: 'About', to: 'about' },
    { label: 'Skills', to: 'skills' },
    { label: 'Projects', to: 'projects' },
    { label: 'Contact', to: 'contact' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white cursor-pointer"
          >
            <Link to="hero" spy smooth duration={500} className="cursor-pointer">
              Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <motion.div key={item.to} variants={itemVariants}>
                <Link
                  to={item.to}
                  spy
                  smooth
                  duration={500}
                  offset={-80}
                  className="text-gray-300 hover:text-blue-400 transition-colors font-medium cursor-pointer relative group"
                  data-cursor="open"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block"
          >
            <Link
              to="contact"
              spy
              smooth
              duration={500}
              offset={-80}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all font-semibold cursor-pointer"
              data-cursor="click"
            >
              Hire Me
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleToggleMenu}
            className="md:hidden text-white p-2"
            data-cursor="click"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isOpen ? 1 : 0,
            height: isOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 space-y-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy
                smooth
                duration={500}
                offset={-80}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-blue-400 transition-colors font-medium py-2 px-3 rounded hover:bg-gray-900 cursor-pointer"
                data-cursor="view"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="contact"
              spy
              smooth
              duration={500}
              offset={-80}
              onClick={() => setIsOpen(false)}
              className="block w-full mt-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-center cursor-pointer"
              data-cursor="click"
            >
              Hire Me
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  )
}
