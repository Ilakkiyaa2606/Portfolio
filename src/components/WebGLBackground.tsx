import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * WebGL Animated Gradient Background
 *
 * A premium, fluid gradient animation using Three.js shaders.
 * Features smooth color blending (purple, blue, pink, red) with
 * subtle motion and organic distortion.
 *
 * Performance optimized:
 * - Respects prefers-reduced-motion
 * - Pauses on visibility change (tab inactive)
 * - Responsive canvas sizing with devicePixelRatio cap
 * - Efficient shader-based rendering
 *
 * @component
 */
export const WebGLBackground = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const meshRef = useRef<THREE.Mesh | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const uniformsRef = useRef<Record<string, THREE.IUniform> | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  // Detect if user prefers reduced motion
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  // Handle visibility changes (pause animation when tab is inactive)
  const handleVisibilityChange = () => {
    if (document.hidden) {
      // Tab is hidden - pause animation
      startTimeRef.current -= Date.now() - startTimeRef.current
    } else {
      // Tab is visible - resume animation
      startTimeRef.current = Date.now()
    }
  }

  // Fragment shader with smooth noise-based distortion
  const fragmentShader = `
    precision highp float;

    uniform float uTime;
    uniform vec2 uResolution;

    // Simple noise function for organic motion
    float noise(vec3 p) {
      return sin(p.x * 0.1) * cos(p.y * 0.1) * sin(p.z * 0.05);
    }

    // Smooth color interpolation
    vec3 colorGradient(vec2 uv, float time) {
      // Create flowing gradients with time-based offset
      float t = time * 0.02;

      // Main color centers that flow organically
      vec3 pos1 = vec3(sin(t * 0.5) * 0.5 + 0.5, cos(t * 0.3) * 0.5 + 0.5, sin(t * 0.4));
      vec3 pos2 = vec3(cos(t * 0.4) * 0.5 + 0.5, sin(t * 0.6) * 0.5 + 0.5, cos(t * 0.3));
      vec3 pos3 = vec3(sin(t * 0.3) * 0.5 + 0.5, sin(t * 0.5) * 0.5 + 0.5, sin(t * 0.2));

      // Distance to color centers
      float dist1 = distance(uv, pos1.xy) + noise(pos1) * 0.1;
      float dist2 = distance(uv, pos2.xy) + noise(pos2) * 0.1;
      float dist3 = distance(uv, pos3.xy) + noise(pos3) * 0.1;

      // Smooth falloff for blending
      float blend1 = pow(1.0 - dist1, 2.0) * 0.8;
      float blend2 = pow(1.0 - dist2, 2.0) * 0.7;
      float blend3 = pow(1.0 - dist3, 2.0) * 0.6;

      // Color palette: Purple → Blue → Pink/Red
      vec3 color1 = vec3(0.68, 0.33, 0.96);     // Purple
      vec3 color2 = vec3(0.23, 0.51, 0.98);     // Blue
      vec3 color3 = vec3(0.93, 0.27, 0.60);     // Pink/Red

      // Blend colors based on distance
      vec3 finalColor = color1 * blend1 + color2 * blend2 + color3 * blend3;

      // Add subtle radial gradient for depth
      float radialGradient = length(uv - vec2(0.5)) * 0.3;
      finalColor *= (1.0 - radialGradient * 0.5);

      return finalColor;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution.xy;

      // Apply subtle distortion with sine waves
      float distortion = sin(uv.x * 5.0 + uTime * 0.02) * cos(uv.y * 5.0 + uTime * 0.015) * 0.02;
      uv += vec2(distortion, distortion * 0.5);

      // Get color from gradient function
      vec3 color = colorGradient(uv, uTime);

      // Add very subtle noise for organic feel
      float noiseAmount = sin(uTime * 0.01 + uv.x * 20.0 + uv.y * 20.0) * 0.01;
      color += vec3(noiseAmount);

      // Smooth the colors with slight blur
      vec3 blurred = color;
      for (int i = 1; i < 3; i++) {
        float angle = float(i) * 2.0;
        vec2 offset = vec2(cos(angle), sin(angle)) * 0.02;
        blurred += colorGradient(uv + offset, uTime) * 0.3;
      }
      color = mix(color, blurred, 0.4);

      gl_FragColor = vec4(color, 1.0);
    }
  `

  // Vertex shader (simple passthrough)
  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `

  useEffect(() => {
    if (!containerRef.current) return

    // Skip animation on reduced motion preference
    const shouldReduceMotion = prefersReducedMotion()

    // Setup Three.js scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera covering full screen
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
    camera.position.z = 1

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    rendererRef.current = renderer

    // Cap pixel ratio for performance
    const dpr = Math.min(window.devicePixelRatio, 2)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x0f172a, 0) // Dark background (gray-950)

    // Positioning
    renderer.domElement.style.position = 'fixed'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.zIndex = '-1'
    renderer.domElement.style.pointerEvents = 'none'

    containerRef.current.appendChild(renderer.domElement)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return

      const width = window.innerWidth
      const height = window.innerHeight

      renderer.setSize(width, height)
      camera.left = -1
      camera.right = 1
      camera.top = 1
      camera.bottom = -1
      camera.updateProjectionMatrix()
    }

    // Geometry and material
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }
    uniformsRef.current = uniforms

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })

    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // Handle initial sizing
    handleResize()

    // Resize listener
    window.addEventListener('resize', handleResize)

    // Visibility listener for pause on tab switch
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!shouldReduceMotion && !document.hidden && uniformsRef.current) {
        const elapsed = Date.now() - startTimeRef.current
        uniformsRef.current.uTime.value = elapsed
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current)
      }

      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />
})

WebGLBackground.displayName = 'WebGLBackground'
