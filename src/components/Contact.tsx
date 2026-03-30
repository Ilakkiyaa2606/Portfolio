import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  phone: string
  projectType: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  projectType?: string
  message?: string
}

const projectTypes = [
  { value: '', label: 'Select a project type' },
  { value: 'ai-chatbot', label: 'AI Chatbot Development' },
  { value: 'website', label: 'Website Development' },
  { value: 'app', label: 'App Development' },
  { value: 'social-media', label: 'Social Media Management' },
  { value: 'content', label: 'Content Creation' },
  { value: 'other', label: 'Other' },
]

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Memoize form handlers to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }))
  }, [])

  // Memoize submit handler
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      setSubmitStatus('error')
      setStatusMessage('Please fix the errors above')
      return
    }

    try {
      // Initialize EmailJS (replace with your public key)
      emailjs.init('wEzKGiMyVvQtAOk2m')

      const templateParams = {
        to_email: 'ilakkiyaaslm@gmail.com',
        name: formData.name || 'Not provided',
        from_name: formData.name || 'Not provided',
        from_email: formData.email || 'Not provided',
        phone: formData.phone || 'Not provided',
        project_type: projectTypes.find((p) => p.value === formData.projectType)?.label || 'Not provided',
        message: formData.message || 'No message',
        time: new Date().toLocaleString(),
      }

      await emailjs.send(
        'service_zwbevdh', // Replace with your Email Service ID
        'template_6xuyysl', // Replace with your Email Template ID
        templateParams
      )

      setSubmitStatus('success')
      setStatusMessage("Message sent successfully! I'll get back to you soon.")
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      })

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try again or contact me directly.')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }, [formData])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-gray-950 py-24 md:py-32 px-6 md:px-8 border-t border-gray-800/50"
    >
      {/* Background gradient accents */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Let's Work Together
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Have a project idea? I'd love to hear about it. Fill out the form below and I'll get back to you within 24 hours.
          </motion.p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-950 rounded-2xl border border-gray-700/50 p-8 md:p-12 shadow-2xl backdrop-blur-sm"
        >
          {/* Status messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{statusMessage}</span>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{statusMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-gray-800/70 ${
                  errors.name ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-gray-800/70 ${
                  errors.email ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-200 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-gray-800/70 ${
                  errors.phone ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </motion.div>

            {/* Project Type */}
            <motion.div variants={itemVariants}>
              <label htmlFor="projectType" className="block text-sm font-semibold text-gray-200 mb-2">
                Project Type
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all hover:bg-gray-800/70 ${
                  errors.projectType ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {projectTypes.map((type) => (
                  <option key={type.value} value={type.value} disabled={type.value === ''}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.projectType && <p className="text-red-400 text-sm mt-1">{errors.projectType}</p>}
            </motion.div>
          </div>

          {/* Message */}
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={6}
              className={`w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none hover:bg-gray-800/70 ${
                errors.message ? 'border-red-500' : 'border-gray-700 hover:border-gray-600'
              }`}
            />
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
          </motion.div>
        </motion.form>
      </div>
    </motion.section>
  )
}
