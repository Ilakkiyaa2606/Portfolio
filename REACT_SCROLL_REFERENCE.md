# React-Scroll Quick Reference

## Basic Link Component

```tsx
import { Link } from 'react-scroll'

// Simple link
<Link to="projects" spy smooth duration={500} offset={-80}>
  Projects
</Link>

// Link as part of a button-like element
<Link 
  to="contact"
  spy 
  smooth 
  duration={500}
  offset={-80}
  className="px-4 py-2 bg-blue-600 rounded"
>
  Contact Us
</Link>
```

## Props Explained

| Prop | Type | Purpose | Example |
|---|---|---|---|
| `to` | string | Target section ID | `to="projects"` |
| `spy` | boolean | Highlight active link | `spy` |
| `smooth` | boolean | Smooth scroll animation | `smooth` |
| `duration` | number | Animation duration (ms) | `duration={500}` |
| `offset` | number | Scroll offset (negative) | `offset={-80}` |
| `onClick` | function | Click handler | `onClick={handleClick}` |
| `className` | string | CSS classes | `className="text-blue-400"` |

## Common Patterns

### Navigation Menu Item

```tsx
<Link
  to="skills"
  spy
  smooth
  duration={500}
  offset={-80}
  className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
  data-cursor="open"
>
  Skills
</Link>
```

### CTA Button

```tsx
<Link
  to="contact"
  spy
  smooth
  duration={500}
  offset={-80}
  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
  data-cursor="click"
>
  Get In Touch
</Link>
```

### Mobile Menu Item

```tsx
<Link
  to="about"
  spy
  smooth
  duration={500}
  offset={-80}
  onClick={() => setIsOpen(false)}  // Close menu after click
  className="block py-2 px-3 hover:bg-gray-900 rounded"
  data-cursor="view"
>
  About
</Link>
```

### With Framer Motion

```tsx
<Link to="projects" smooth duration={500} offset={-80}>
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="px-4 py-2 bg-blue-600 rounded"
  >
    View Projects
  </motion.div>
</Link>
```

### With State Management

```tsx
const [activeSection, setActiveSection] = useState('hero')

<Link
  to="skills"
  spy
  smooth
  duration={500}
  offset={-80}
  onSetActive={() => setActiveSection('skills')}
  className={activeSection === 'skills' ? 'text-blue-400' : 'text-gray-300'}
>
  Skills
</Link>
```

## Section Setup

### Basic Section

```tsx
<section id="projects">
  <YourComponent />
</section>
```

### With Wrapper

```tsx
<section id="about" className="py-20 bg-gray-950">
  <div className="max-w-6xl mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

### With Framer Motion

```tsx
<section id="skills">
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
  >
    {/* Animated content */}
  </motion.div>
</section>
```

## Navbar Setup

### Fixed Navbar

```tsx
<nav className="fixed top-0 left-0 right-0 z-40 bg-gray-950/80 backdrop-blur-md">
  {/* Navigation items */}
</nav>

{/* Add top padding to main content */}
<main className="pt-16">
  {/* Sections */}
</main>
```

### Adjust Padding for Navbar

```tsx
{/* If navbar is 60px: use pt-15 (60px) */}
{/* If navbar is 80px: use pt-20 (80px) */}
{/* If navbar is 100px: use pt-24 (96px) */}
<main className="pt-20">
```

## Scroll Offset Reference

```
Navbar Height → Offset Value
60px         → offset={-60}
80px         → offset={-80}
100px        → offset={-100}
120px        → offset={-120}
140px        → offset={-140}
```

## Advanced Examples

### Scroll to Section with Delay

```tsx
import { scroller } from 'react-scroll'

const scrollWithDelay = () => {
  setTimeout(() => {
    scroller.scrollTo('contact', {
      smooth: true,
      duration: 500,
      offset: -80,
    })
  }, 1000)
}

<button onClick={scrollWithDelay}>Scroll after 1s</button>
```

### Multiple Scroll Speeds

```tsx
{/* Fast scroll */}
<Link to="about" smooth duration={300} offset={-80}>
  Quick Jump
</Link>

{/* Normal scroll */}
<Link to="projects" smooth duration={500} offset={-80}>
  Normal
</Link>

{/* Slow scroll */}
<Link to="contact" smooth duration={1000} offset={-80}>
  Slow Scroll
</Link>
```

### Conditional Navigation

```tsx
<Link
  to={isLoggedIn ? 'dashboard' : 'login'}
  smooth
  duration={500}
  offset={-80}
>
  {isLoggedIn ? 'Dashboard' : 'Login'}
</Link>
```

### Scroll with Custom Handler

```tsx
<Link
  to="projects"
  smooth
  duration={500}
  offset={-80}
  onClick={() => {
    console.log('Scrolling to projects')
    // Track analytics
    trackEvent('scroll_to_projects')
  }}
>
  Projects
</Link>
```

## Troubleshooting Checklist

```
□ Section has matching ID (e.g., id="projects")
□ Link has matching 'to' prop (e.g., to="projects")
□ 'smooth' prop is present
□ 'offset' accounts for navbar height
□ Main content has top padding (pt-* class)
□ No z-index conflicts with navbar
□ Navbar is position: fixed
□ No CSS hiding content behind navbar
```

## Performance Tips

✅ Use stable section IDs
✅ Set appropriate scroll duration (300-800ms)
✅ Use offset to prevent content overlap
✅ Test on mobile and desktop
✅ Monitor smooth scrolling performance

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile Safari
✅ Chrome Mobile

---

**Reference Guide**: react-scroll Integration
**Last Updated**: March 30, 2026
