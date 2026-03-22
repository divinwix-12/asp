import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useSiteConfig } from '../hooks/useSiteConfig'

const FALLBACK_SLIDES = [
  'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000',
  'https://images.unsplash.com/photo-1519225495810-7517c31230d6?q=80&w=1000',
  'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1000',
  'https://images.unsplash.com/photo-1623944889288-cd147dbb517c?q=80&w=1000'
]

export default function Hero({ onBookingOpen }) {
  const { siteConfig } = useSiteConfig()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Integrate user-provided hero images with our elite fallbacks
  const userSlides = siteConfig?.hero?.slides || []
  const userBg = siteConfig?.hero?.bg
  
  // Combine single bg and slides array if they exist, otherwise use fallbacks
  let slides = [...userSlides]
  if (userBg && !slides.includes(userBg)) slides.unshift(userBg)
  if (slides.length === 0) slides = FALLBACK_SLIDES

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Cinematic Slideshow Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${slides[currentSlide]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>


      {/* Hero Content */}
      <motion.div
        style={{
          zIndex: 10,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '1000px',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      >
        <h1 style={{ marginBottom: '1.5rem', color: '#F5F0E8', letterSpacing: '-0.02em' }}>
          {siteConfig?.hero?.title || 'The Standard of Elite Service in Kigali'}
        </h1>

        <p style={{
          color: 'rgba(245,240,232,0.85)',
          fontSize: '1.25rem',
          maxWidth: '800px',
          margin: '0 auto 3.5rem',
          fontWeight: 300,
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: '0.012em',
          lineHeight: 1.7
        }}>
          {siteConfig?.hero?.subtitle || 'Weddings, protocol, and cultural experiences delivered with discipline, beauty, and excellence.'}
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-gold" onClick={onBookingOpen} style={{ padding: '1.2rem 2.8rem' }}>
            Schedule Your Event
            <ArrowRight size={20} />
          </button>
          <a href="#services" className="btn-outline" style={{ textDecoration: 'none', padding: '1.2rem 2.4rem' }}>
            View Our Process
          </a>
        </div>
      </motion.div>

      {/* Slide Navigation Progress Indicators */}
      <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.8rem', zIndex: 11 }}>
        {slides.map((_, i) => (
          <div 
            key={i} 
            style={{ 
              width: i === currentSlide ? '24px' : '8px', 
              height: '4px', 
              borderRadius: '2px', 
              background: i === currentSlide ? 'var(--gold)' : 'rgba(255,255,255,0.2)', 
              transition: '0.4s all ease' 
            }} 
          />
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: '0', left: '0', right: '0', height: '180px',
        background: 'linear-gradient(to top, var(--midnight), transparent)', zIndex: 5
      }} />
    </section>
  )
}
