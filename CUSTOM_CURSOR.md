# Custom Cursor Implementation

The portfolio features a custom, smooth cursor that enhances the user experience across the entire website.

## Features

### Visual Design
- **Main Cursor Circle**: 12px diameter with blue border (expands to 40px on hover)
- **Trail Effect**: 8px glowing circle that follows the main cursor with smooth trailing
- **Color**: Blue accent color (`rgba(59, 130, 246, 0.6)`) that matches the design theme
- **Glow Effect**: Subtle glow shadow for better visibility

### Smooth Performance
- **60+ FPS**: Uses `requestAnimationFrame` for smooth animations
- **No Lag**: Optimized position updates with 0.3 damping factor
- **Low Impact**: Minimal CPU usage with efficient event handling
- **Responsive**: Works smoothly across all devices and browsers

### Interactive Behavior
- **Smart Detection**: Automatically detects buttons, links, and interactive elements
- **Growth Animation**: Cursor expands when hovering over:
  - Buttons (all `<button>` elements)
  - Links (all `<a>` elements)
  - Elements with `hover-grow` class
  - Elements with `interactive` class
- **Spring Animation**: Smooth Framer Motion spring transition on size change
- **Color Change**: Border color intensifies on hover (opacity 0.8 vs 0.6)

## How It Works

### Component Structure
Located at `src/components/CustomCursor.tsx`, the custom cursor:

1. **Tracks Mouse Movement**
   ```typescript
   document.addEventListener('mousemove', handleMouseMove)
   ```
   Updates cursor position in real-time

2. **Detects Hover States**
   ```typescript
   document.addEventListener('mouseenter', handleMouseEnter, true)
   ```
   Detects when user hovers over interactive elements

3. **Hides Default Cursor**
   ```css
   * {
     cursor: none !important;
   }
   ```
   Globally hides the system cursor

### Trail Animation
- Main cursor position updates immediately
- Trail position lags behind by ~30% (`0.3 damping`)
- Creates a smooth "following" effect
- Uses `requestAnimationFrame` for optimal performance

## Customization

### Change Cursor Size
In `CustomCursor.tsx`, modify the `animate` values:

```typescript
animate={{
  width: isHovering ? 40 : 12,    // Change these values
  height: isHovering ? 40 : 12,
}}
```

### Change Cursor Color
Modify the border color:

```typescript
borderColor: isHovering ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.6)',
```

### Change Trail Effect
Adjust the trail decay factor (currently `0.3`):

```typescript
trailPosition.current.x += dx * 0.3  // Lower = slower trail, Higher = faster trail
```

### Add More Interactive Elements
The cursor automatically detects:
- All `<button>` elements
- All `<a>` links
- Elements with `hover-grow` class
- Elements with `interactive` class

To make any element trigger the cursor growth, add the class:

```jsx
<div className="hover-grow">
  This will grow the cursor on hover
</div>
```

## Browser Support

The custom cursor works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

Note: Some older browsers may fall back to the default cursor.

## Performance Considerations

- **Event Delegation**: Uses capture phase for efficient event handling
- **Animation Frames**: Optimized with `requestAnimationFrame` for 60 FPS
- **Memory**: Fixed-size DOM elements (only 2 divs)
- **CSS**: Uses `mix-blend-screen` for GPU acceleration

## Accessibility

The custom cursor maintains full accessibility:
- All interactive elements remain functionally accessible
- Keyboard navigation works normally
- Screen readers are unaffected
- Touch devices show their native behavior

## Troubleshooting

### Cursor not appearing
- Check browser console for errors
- Ensure `CustomCursor` component is rendered in `App.tsx`
- Try clearing browser cache

### Cursor lag on low-end devices
- Reduce animation frame rate (modify damping factor)
- Simplify trail effect
- Disable some visual effects

### Cursor visibility issues
- Adjust border width (currently 2px)
- Change color opacity values
- Add outline for better contrast

## Code Location

- **Component**: `src/components/CustomCursor.tsx`
- **Integration**: `src/App.tsx` (renders at root level)
- **Styling**: `src/index.css` (global cursor-hidden)
