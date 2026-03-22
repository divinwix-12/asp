import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Star } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About Us', href: '#about' },
  { label: 'Cultural', href: '#cultural' },
]

export default function Navbar({ onBookingOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 1.5rem',
          transition: 'all 0.4s ease',
          background: scrolled
            ? 'rgba(5,8,16,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img 
              src="/logo.png" 
              alt="Alpha Logo" 
              style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
            />
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontWeight: 600, color: '#F5F0E8', letterSpacing: '0.05em', lineHeight: 1 }}>ALPHA</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(201,168,76,0.8)', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Outfit,sans-serif' }}>Service Protocol</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="hidden-mobile">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} style={{
                color: 'rgba(245,240,232,0.75)',
                textDecoration: 'none',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.target.style.color = '#C9A84C'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.75)'}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="btn-gold" onClick={onBookingOpen} style={{ padding: '0.6rem 1.5rem', fontSize: '0.78rem' }}>
              Schedule a Protocol Consultation
            </button>
            <button
              style={{ background: 'none', border: 'none', color: '#F5F0E8', cursor: 'pointer', display: 'none' }}
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(5,8,16,0.97)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '2rem',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#F5F0E8', cursor: 'pointer' }}
            >
              <X size={28} />
            </button>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ color: '#F5F0E8', textDecoration: 'none', fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 300 }}
              >
                {link.label}
              </a>
            ))}
            <button className="btn-gold" onClick={() => { setMobileOpen(false); onBookingOpen(); }}>Book Now</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
