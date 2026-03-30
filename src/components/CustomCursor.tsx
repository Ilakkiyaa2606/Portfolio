import { useEffect, useRef, useState } from 'react'

export const CustomCursor = () => {
  // Detect mobile/touch devices on mount
  const [isMobile, setIsMobile] = useState(false)

  // Inner dot cursor (precise)
  const dotRef = useRef<HTMLDivElement>(null)

  // Outer follower circle (smooth)
  const followerRef = useRef<HTMLDivElement>(null)

  // Use refs for all position and state tracking to avoid re-renders
  // Only state managed by React is isMobile (set once on mount)
  const cursorStateRef = useRef({
    x: 0,
    y: 0,
    isActive: false,
    text: '',
    scale: 1,
    prevIsActive: false, // Track previous state to batch updates
    prevScale: 1,
    prevText: '',
  })

  // Position refs for smooth animation
  const followerPos = useRef({ x: 0, y: 0 })
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)
  const velocityRef = useRef({ x: 0, y: 0 }) // Track velocity for natural physics

  // Initialize mobile detection and event listeners
  useEffect(() => {
    // Check for touch/mobile devices
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

    // If mobile, don't set up custom cursor
    if (isDeviceMobile) {
      return
    }

    // ===== MOUSE MOVEMENT HANDLER =====
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e

      // Update refs directly - no state update needed
      mousePos.current = { x: clientX, y: clientY }
      cursorStateRef.current.x = clientX
      cursorStateRef.current.y = clientY

      // Update dot cursor immediately via DOM, not state
      if (dotRef.current) {
        dotRef.current.style.left = `${clientX}px`
        dotRef.current.style.top = `${clientY}px`
      }
    }

    // ===== SMOOTH FOLLOWER ANIMATION WITH NATURAL PHYSICS =====
    // All DOM updates batched in single requestAnimationFrame
    const animateFollower = () => {
      const state = cursorStateRef.current

      if (followerRef.current) {
        // Calculate distance to mouse
        const dx = mousePos.current.x - followerPos.current.x
        const dy = mousePos.current.y - followerPos.current.y

        // Adaptive easing: slower (more responsive) when active, smoother overall
        const easing = state.isActive ? 0.18 : 0.12

        // Apply easing with velocity damping for natural physics
        velocityRef.current.x = dx * easing
        velocityRef.current.y = dy * easing

        // Update position with smooth incremental movement
        followerPos.current.x += velocityRef.current.x
        followerPos.current.y += velocityRef.current.y

        // Apply subtle friction for natural deceleration
        velocityRef.current.x *= 0.95
        velocityRef.current.y *= 0.95

        // Update follower position
        followerRef.current.style.left = `${followerPos.current.x}px`
        followerRef.current.style.top = `${followerPos.current.y}px`

        // Batch style updates only when state changes (visual diff)
        if (
          state.isActive !== state.prevIsActive ||
          state.scale !== state.prevScale ||
          state.text !== state.prevText
        ) {
          const followerSize = state.isActive ? 60 : 24

          followerRef.current.style.width = `${followerSize}px`
          followerRef.current.style.height = `${followerSize}px`
          followerRef.current.style.border = `2px solid ${
            state.isActive ? 'rgba(59, 130, 246, 1)' : 'rgba(59, 130, 246, 0.4)'
          }`
          followerRef.current.style.scale = state.isActive ? '1' : '0.95'
          followerRef.current.style.backgroundColor = state.isActive
            ? 'rgba(59, 130, 246, 0.08)'
            : 'rgba(59, 130, 246, 0.02)'
          followerRef.current.style.backdropFilter = state.isActive ? 'blur(12px)' : 'blur(4px)'
          followerRef.current.style.boxShadow = state.isActive
            ? `0 0 8px rgba(59, 130, 246, 0.3),
               0 0 16px rgba(59, 130, 246, 0.4),
               0 0 32px rgba(59, 130, 246, 0.2),
               inset 0 0 20px rgba(59, 130, 246, 0.15)`
            : `0 0 12px rgba(59, 130, 246, 0.3),
               0 0 20px rgba(59, 130, 246, 0.1)`
          followerRef.current.style.filter = state.isActive
            ? 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
            : 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))'
          followerRef.current.style.fontSize = state.isActive ? '11px' : '10px'
          followerRef.current.style.color = `rgba(59, 130, 246, ${state.isActive ? 1 : 0.8})`

          // Update text content and visibility
          if (followerRef.current.firstChild) {
            const span = followerRef.current.firstChild as HTMLElement
            span.textContent = state.text
            span.style.opacity = state.isActive ? '1' : '0'
            span.style.transform = state.isActive ? 'scale(1)' : 'scale(0.8)'
          }

          // Mark as processed
          state.prevIsActive = state.isActive
          state.prevScale = state.scale
          state.prevText = state.text
        }

        // Also update inner dot glow when state changes
        if (state.isActive !== state.prevIsActive && dotRef.current) {
          dotRef.current.style.boxShadow = `0 0 8px rgba(59, 130, 246, 0.8), 
                      0 0 16px rgba(59, 130, 246, ${state.isActive ? 0.4 : 0.2})`
        }
      }

      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animateFollower)
    }

    // ===== HOVER STATE DETECTION =====
    // Debounce timer to prevent excessive updates
    let hoverDebounceTimer: number | undefined

    const handleMouseEnter = (e: MouseEvent) => {
      clearTimeout(hoverDebounceTimer)
      const target = e.target as HTMLElement

      // Check for data-cursor attribute first
      const cursorType = target.getAttribute('data-cursor')
      const closestCursor = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      const dataAttribute = cursorType || closestCursor

      if (dataAttribute) {
        cursorStateRef.current.isActive = true
        cursorStateRef.current.text = getTextForCursor(dataAttribute)
        cursorStateRef.current.scale = 4
        return
      }

      // Fallback: check for button, link, or interactive classes
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('interactive') ||
        target.classList.contains('hover-grow') ||
        target.closest('button') ||
        target.closest('a')
      ) {
        cursorStateRef.current.isActive = true
        cursorStateRef.current.text = target.tagName === 'BUTTON' ? 'CLICK' : 'OPEN'
        cursorStateRef.current.scale = 4
      }
    }

    // ===== MOUSE LEAVE HANDLER =====
    const handleMouseLeave = () => {
      cursorStateRef.current.isActive = false
      cursorStateRef.current.text = ''
      cursorStateRef.current.scale = 1
    }

    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateFollower)

    // Attach listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, []) // Empty dependency array - no state changes trigger re-setup

  // Helper function to get text based on cursor type
  const getTextForCursor = (type: string): string => {
    const textMap: Record<string, string> = {
      click: 'CLICK',
      view: 'VIEW',
      open: 'OPEN',
    }
    return textMap[type.toLowerCase()] || 'CLICK'
  }

  // Don't render custom cursor on mobile
  if (isMobile) {
    return null
  }

  const baseSize = 12 // Inner dot size

  return (
    <>
      {/* INNER DOT - Precise cursor position */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          backgroundColor: 'rgba(59, 130, 246, 0.9)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 8px rgba(59, 130, 246, 0.8), 
                      0 0 16px rgba(59, 130, 246, 0.2)`,
          transition: 'all 0.15s ease-out',
          willChange: 'transform',
        }}
      />

      {/* OUTER FOLLOWER - Smooth trailing circle with premium effects */}
      <div
        ref={followerRef}
        className="fixed pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          width: '24px',
          height: '24px',
          border: `2px solid rgba(59, 130, 246, 0.4)`,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          scale: 0.95,
          backgroundColor: 'rgba(59, 130, 246, 0.02)',
          backdropFilter: 'blur(4px)',
          boxShadow: `0 0 12px rgba(59, 130, 246, 0.3),
             0 0 20px rgba(59, 130, 246, 0.1)`,
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          fontSize: '10px',
          fontWeight: '800',
          letterSpacing: '0.08em',
          color: 'rgba(59, 130, 246, 0.8)',
          textAlign: 'center',
          filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))',
          willChange: 'transform',
        }}
      >
        <span
          style={{
            display: 'block',
            opacity: 0,
            transform: 'scale(0.8)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>

      {/* Enhanced global cursor hide */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
