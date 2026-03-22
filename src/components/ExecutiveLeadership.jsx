import { motion } from 'framer-motion'
import { useSiteConfig } from '../hooks/useSiteConfig'

export default function ExecutiveLeadership() {
  const { siteConfig } = useSiteConfig()
  const director = siteConfig?.leadership || { 
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000',
    name: 'Executive Director',
    vision: 'In the heart of Kabuga, elite service is more than a protocol—it’s an art form.'
  }

  return (
    <section id="about" className="section noise section-authority" style={{ background: '#050810', overflow: 'hidden' }}>
      
      {/* Visual Background Text */}
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        fontSize: 'clamp(5rem, 15vw, 20rem)', 
        fontWeight: 900, 
        color: 'rgba(255,255,255,0.02)', 
        zIndex: 0,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'Outfit, sans-serif'
      }}>
        LEADERSHIP
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Profile Image - Floated for "Surround" Effect */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="leadership-image-wrapper"
          style={{ 
            float: 'left',
            marginRight: '3rem',
            marginBottom: '2rem',
            shapeOutside: 'inset(0% round 2rem)', /* Crucial for text surrounding */
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Geometric Underlay */}
          <div style={{ position: 'absolute', inset: '-1rem', border: '1px solid var(--gold)', opacity: 0.2, borderRadius: '2rem', transform: 'rotate(-3deg)' }} />
          
          <div style={{ 
            width: '100%', 
            aspectRatio: '0.82', 
            borderRadius: '2rem', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <img 
              src={director.photo} 
              alt={director.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Floating Mini Badge */}
          <motion.div 
            style={{ position: 'absolute', bottom: '2rem', right: '-1rem', padding: '1.2rem', borderRadius: '1.2rem', boxShadow: 'var(--shadow-glow)', zIndex: 2 }}
            className="glass float-slow"
          >
            <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Certified Planner</div>
            <div style={{ fontSize: '1rem', fontWeight: 300 }}>Rwanda Event Council</div>
          </motion.div>
        </motion.div>

        {/* Content Section - Floats naturally around image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative' }}
        >
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Authority & Vision</div>
          <h2 style={{ marginBottom: '1.5rem' }}>Meet Our <span className="gold-text">Executive Director</span></h2>
          <div className="gold-line" style={{ margin: '0 0 2rem' }} />
          
          <p style={{ color: 'rgba(245,240,232,0.9)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>
            {director.vision}
          </p>

          <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Under the direction of <span className="gold-text">{director.name}</span>, Alpha has transformed the landscape of weightless hospitality in Rwanda. By blending disciplined protocol with the deep-rooted cultural artistry of Kigali, we ensure every engagement is delivered with unprecedented excellence and an unwavering commitment to the "Standard of Elite Service."
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>10+</div>
              <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years in Kigali Events</p>
            </div>
            <div>
              <div style={{ color: 'var(--gold)', fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>500+</div>
              <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Elite Protocols Managed</p>
            </div>
          </div>

          <button className="btn-outline">
            Read Full Vision
          </button>
        </motion.div>

        {/* Clearfix for floats */}
        <div style={{ clear: 'both' }} />

      </div>

    </section>

  )
}
