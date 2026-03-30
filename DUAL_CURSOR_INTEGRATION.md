# Dual Cursor System - Integration Guide

## Quick Start

The dual cursor system is already integrated into your portfolio. Here's how to use it with new elements.

## Adding Custom Cursor to Elements

### For Buttons

```tsx
import { motion } from 'framer-motion'

export const MyButton = () => {
  return (
    <motion.button
      data-cursor="click"
      onClick={() => console.log('Clicked!')}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Click Me
    </motion.button>
  )
}
```

### For Cards/Interactive Divs

```tsx
<motion.div
  data-cursor="view"
  className="group cursor-pointer p-6 bg-gray-900 rounded-lg"
>
  <h3 className="text-lg font-bold">Clickable Card</h3>
  <p>Hover to see the cursor change</p>
</motion.div>
```

### For Links

```tsx
<a
  data-cursor="open"
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-400 hover:text-blue-300"
>
  External Link
</a>
```

## Cursor Types Reference

| Type | Usage | Text Label | Example |
|---|---|---|---|
| `click` | Primary actions | CLICK | Submit buttons, primary CTAs |
| `view` | Exploratory actions | VIEW | Project cards, content cards |
| `open` | Navigation/external | OPEN | Links, external resources |

## Data Attribute Syntax

```tsx
{/* Basic usage */}
<button data-cursor="click">Action</button>

{/* With Framer Motion */}
<motion.button data-cursor="view">Card</motion.button>

{/* With nested elements (delegates to parent) */}
<div data-cursor="view">
  <button>Nested Button</button>
  {/* Cursor detects parent's data-cursor */}
</div>
```

## How It Works

1. User hovers over element with `data-cursor` attribute
2. Mouse enter event triggers
3. Cursor component checks for `data-cursor` attribute
4. Outer follower expands to 60px
5. Text label appears (CLICK/VIEW/OPEN)
6. Smooth animation plays
7. On mouse leave, cursor returns to default state

## Fallback Behavior

If an element doesn't have `data-cursor`, the system falls back to checking:

```typescript
// Automatic detection
if (
  target.tagName === 'BUTTON' ||
  target.tagName === 'A' ||
  target.classList.contains('interactive') ||
  target.classList.contains('hover-grow') ||
  target.closest('button') ||
  target.closest('a')
)
```

So existing buttons and links work automatically without adding `data-cursor`.

## Examples from Your Portfolio

### Hero Section
```tsx
{/* View Work - exploratory action */}
<motion.button data-cursor="view">
  View My Work
</motion.button>

{/* Work Together - primary action */}
<motion.button data-cursor="click">
  Let's Work Together
</motion.button>
```

### Projects Section
```tsx
{/* Each project card shows "VIEW" on hover */}
<motion.button data-cursor="view" onClick={() => onOpen(project)}>
  {/* Project content */}
</motion.button>
```

### Contact Section
```tsx
{/* Send message - primary action */}
<motion.button data-cursor="click" type="submit">
  Send Message
</motion.button>
```

### Services & Skills
```tsx
{/* Every card is explorable */}
<motion.div data-cursor="view" className="cursor-pointer">
  {/* Card content */}
</motion.div>
```

## Mobile Behavior

The cursor **automatically disables** on mobile devices:

```javascript
// Mobile detection
const isTouchDevice = () => {
  return (
    !!(
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0)
    )
  )
}

const isDeviceMobile = isTouchDevice()
setIsMobile(isDeviceMobile)

// If mobile, component returns null
if (isMobile) {
  return null
}
```

Users on mobile/tablet see the standard cursor.

## Styling Tips

### Make Elements Cursor-Aware

Add visual feedback to match cursor behavior:

```tsx
<motion.button
  data-cursor="click"
  className="group px-6 py-3 bg-blue-600 rounded-lg"
  whileHover={{ scale: 1.05 }}
>
  Hover brings both cursor and button to life
</motion.button>
```

### Add Pointer Class (Optional)

```tsx
<div data-cursor="view" className="cursor-pointer">
  {/* On mobile, shows pointer; on desktop, custom cursor */}
</div>
```

## Customization

### Change Text Labels

Edit `src/components/CustomCursor.tsx`, `getTextForCursor` function:

```typescript
const getTextForCursor = (type: string): string => {
  const textMap: Record<string, string> = {
    click: 'CLICK',      // Change to 'TAP'
    view: 'VIEW',        // Change to 'EXPLORE'
    open: 'OPEN',        // Change to 'GO'
  }
  return textMap[type.toLowerCase()] || 'CLICK'
}
```

### Change Colors

Edit global color (currently blue):

```typescript
// Default: rgba(59, 130, 246, ...)
// Change to: rgba(168, 85, 247, ...) for purple
// Or: rgba(34, 197, 94, ...) for green
```

### Adjust Smoothness

Edit interpolation factor (currently 0.15):

```typescript
// In animateFollower function
followerPos.current.x += dx * 0.15  // Lower = smoother
followerPos.current.y += dy * 0.15
```

## Testing

Test the cursor system in different scenarios:

### Desktop
```bash
npm run dev
# Open http://localhost:5174
# Move cursor over buttons, cards, links
# Should see cursor expand with text
```

### Mobile
```bash
# Test in Chrome DevTools > Device Emulation
# Cursor should be disabled (not visible)
# Should see standard pointer cursor
```

## Performance Checklist

- ✅ 60fps animation maintained
- ✅ No lag or jitter
- ✅ Smooth easing applied
- ✅ Mobile detection working
- ✅ No memory leaks from event listeners
- ✅ Text renders clearly

## Common Issues & Solutions

### Cursor not expanding on hover
- **Check**: Element has `data-cursor` attribute
- **Check**: Not on a mobile device
- **Check**: Element is visible and not `pointer-events-none`

### Text not visible
- **Check**: Cursor is in active state (check DevTools)
- **Check**: Text value matches `getTextForCursor` mapping

### Cursor disappears on page load
- **Check**: Browser console for errors
- **Check**: CustomCursor component is imported in App
- **Check**: `cursor: none !important` is applied to all elements

## API Reference

### Data Attributes

```tsx
// Supported attributes
data-cursor="click"   // Primary actions
data-cursor="view"    // Content/cards
data-cursor="open"    // Links/navigation
```

### Files

```
src/components/CustomCursor.tsx    // Main cursor component
src/components/Hero.tsx             // Updated buttons
src/components/Projects.tsx         // Updated projects
src/components/Contact.tsx          // Updated form
src/components/Services.tsx         // Updated services
src/components/Skills.tsx           // Updated skills
```

## Next Steps

1. ✅ Review the cursor behavior on your site
2. ✅ Test on mobile devices
3. ✅ Customize colors/text if desired
4. ✅ Deploy to production
5. ✅ Share with others - it's a cool feature!

---

**Questions?** Check [DUAL_CURSOR_SYSTEM.md](./DUAL_CURSOR_SYSTEM.md) for detailed documentation.
