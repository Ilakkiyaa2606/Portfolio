# Dual Cursor System - Code Examples

## Complete Implementation Examples

### Example 1: Simple Button with Cursor

```tsx
import { motion } from 'framer-motion'

export const CtaButton = () => {
  return (
    <motion.button
      data-cursor="click"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg"
      onClick={() => console.log('Button clicked!')}
    >
      Get Started
    </motion.button>
  )
}
```

### Example 2: Interactive Card with Cursor

```tsx
import { motion } from 'framer-motion'

interface CardProps {
  title: string
  description: string
  onOpen: () => void
}

export const InteractiveCard = ({ title, description, onOpen }: CardProps) => {
  return (
    <motion.button
      data-cursor="view"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -8 }}
      onClick={onOpen}
      className="text-left group w-full"
    >
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 group-hover:border-blue-500 transition-colors">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
        
        {/* Hover indicator */}
        <motion.div
          className="mt-4 inline-flex items-center gap-2 text-blue-400"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <span>View Details</span>
          <motion.svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.div>
      </div>
    </motion.button>
  )
}
```

### Example 3: External Link with Cursor

```tsx
import { motion } from 'framer-motion'

interface ExternalLinkProps {
  href: string
  label: string
  icon?: React.ReactNode
}

export const ExternalLink = ({ href, label, icon }: ExternalLinkProps) => {
  return (
    <motion.a
      data-cursor="open"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
      whileHover={{ x: 4 }}
    >
      {label}
      {icon || (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </motion.a>
  )
}
```

### Example 4: Form with Cursor

```tsx
import { motion } from 'framer-motion'
import { useState } from 'react'

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Name Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
          placeholder="Your name"
        />
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all"
          placeholder="your@email.com"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-200 mb-2">
          Message
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-all resize-none"
          placeholder="Your message..."
        />
      </div>

      {/* Submit Button */}
      <motion.button
        data-cursor="click"
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
      >
        Send Message
      </motion.button>
    </motion.form>
  )
}
```

### Example 5: Blog Post Card Grid

```tsx
import { motion } from 'framer-motion'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
}

interface BlogCardProps {
  post: BlogPost
  onOpen: (post: BlogPost) => void
}

const BlogCard = ({ post, onOpen }: BlogCardProps) => {
  return (
    <motion.button
      data-cursor="view"
      onClick={() => onOpen(post)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="text-left w-full group"
    >
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 group-hover:border-blue-500 transition-colors">
        {/* Category Badge */}
        <div className="inline-block mb-3">
          <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Date */}
        <p className="text-gray-500 text-xs">{post.date}</p>
      </div>
    </motion.button>
  )
}

export const BlogGrid = ({ posts }: { posts: BlogPost[] }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          onOpen={setSelectedPost}
        />
      ))}
    </div>
  )
}
```

### Example 6: Portfolio Gallery with Cursor

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Portfolio {
  id: number
  title: string
  image: string
  category: string
}

export const PortfolioGallery = ({ items }: { items: Portfolio[] }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.button
            key={item.id}
            data-cursor="view"
            onClick={() => setSelectedId(item.id)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-xl aspect-square group"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-blue-400 text-sm">{item.category}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <img
                src={items.find((i) => i.id === selectedId)?.image}
                alt="Portfolio item"
                className="w-full rounded-xl"
              />
              
              {/* Close button */}
              <motion.button
                data-cursor="click"
                onClick={() => setSelectedId(null)}
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ✕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

### Example 7: Navigation with Cursor

```tsx
import { motion } from 'framer-motion'

const navItems = ['Home', 'About', 'Projects', 'Contact']

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          data-cursor="click"
          className="text-2xl font-bold text-white cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Portfolio
        </motion.div>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item}
              data-cursor="open"
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
              whileHover={{ scale: 1.1 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          data-cursor="click"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          Hire Me
        </motion.button>
      </div>
    </nav>
  )
}
```

## Testing Tips

### 1. Test Each Cursor Type
```bash
# Test "CLICK" cursor
npm run dev
# Hover over buttons with data-cursor="click"

# Test "VIEW" cursor
# Hover over project cards and service cards

# Test "OPEN" cursor
# Hover over links
```

### 2. Test Mobile
```bash
# Chrome DevTools
# Device Emulation > iPhone 12
# Cursor should be disabled
# Standard pointer should show
```

### 3. Check Performance
```bash
# Open DevTools > Performance
# Move cursor around
# Should see 60fps consistently
# No frame drops
```

## Accessibility Considerations

All examples maintain accessibility:

- ✅ Semantic HTML (`<button>`, `<a>`, `<form>`)
- ✅ Keyboard navigation works naturally
- ✅ Screen reader compatible
- ✅ Focus states maintained
- ✅ Mobile fallback to default cursor

---

These examples show the flexibility and power of the dual cursor system in real-world scenarios. Adapt them to your specific needs!
