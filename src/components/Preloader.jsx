import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Elegant reveal after assets/fonts are likely loaded
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -100,
            filter: 'blur(30px) brightness(2)',
          }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#050810',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Atmospheric Glows */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', zIndex: 0 }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', zIndex: 0 }} />

          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: 'blur(10px)' }}
            animate={{ 
              scale: [0.95, 1.05, 0.95], 
              opacity: 1, 
              filter: 'blur(0px)',
              boxShadow: [
                  '0 0 40px rgba(201,168,76,0)',
                  '0 0 80px rgba(201,168,76,0.15)',
                  '0 0 40px rgba(201,168,76,0)'
              ]
            }}
            transition={{ 
                opacity: { duration: 1.2 },
                scale: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                filter: { duration: 1 }
            }}
            style={{ 
                position: 'relative', zIndex: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <img 
              src="/logo.png" 
              alt="Alpha Protocol" 
              style={{ width: '180px', height: '180px', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(201,168,76,0.3))' }} 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.8em' }}
            transition={{ delay: 0.4, duration: 2, ease: 'easeOut' }}
            style={{ 
                marginTop: '3.5rem', 
                color: 'var(--gold)', 
                fontSize: '0.75rem', 
                textTransform: 'uppercase',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 300,
                position: 'relative', zIndex: 1,
                textAlign: 'center'
            }}
          >
            ALPHA SERVICE PROTOCOL
            <div style={{ 
                fontSize: '0.6rem', color: 'rgba(245,240,232,0.4)', 
                letterSpacing: '0.3em', marginTop: '1rem',
                fontWeight: 400
            }}>
              Initializing Weightless Experience
            </div>
          </motion.div>
          
          {/* Subtle Scanning Line */}
          <motion.div 
            animate={{ top: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
            style={{
                position: 'absolute', left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
                zIndex: 2, pointerEvents: 'none'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
