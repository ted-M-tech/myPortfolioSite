"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  pulse: number
  pulseSpeed: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 10000)) // More particles

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2, // Faster movement
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 3 + 1.5, // Larger particles
          opacity: Math.random() * 0.7 + 0.3, // Higher opacity
          color: `hsl(${Math.random() * 80 + 180}, 80%, 65%)`, // Brighter colors
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
      particlesRef.current = particles
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Update pulse for breathing effect
        particle.pulse += particle.pulseSpeed
        const pulseMultiplier = 1 + Math.sin(particle.pulse) * 0.3

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Keep particles in bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))

        // Draw particle with glow effect
        const currentSize = particle.size * pulseMultiplier
        const currentOpacity = particle.opacity * (0.8 + Math.sin(particle.pulse) * 0.2)

        // Outer glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, currentSize * 2)
        gradient.addColorStop(0, particle.color.replace("65%)", `${currentOpacity * 30}%)`))
        gradient.addColorStop(1, particle.color.replace("65%)", "0%)"))
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace("65%)", `${currentOpacity * 80}%)`)
        ctx.fill()

        // Draw connections to nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              // Longer connection distance
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              const connectionOpacity = (1 - distance / 150) * 0.3 // More visible connections
              ctx.strokeStyle = `rgba(120, 180, 255, ${connectionOpacity})`
              ctx.lineWidth = 1.5 // Thicker lines
              ctx.stroke()
            }
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90 dark:opacity-70" // Higher opacity
      style={{ background: "transparent" }}
    />
  )
}
