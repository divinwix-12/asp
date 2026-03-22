import { motion } from 'framer-motion'
import { Shield, Coffee, Users, Calendar, Utensils } from 'lucide-react'

const services = [
  { id: '01', title: 'Service & Protocol', icon: <Shield size={22} />, description: 'Elite hospitality with seamless synchronization and world-class etiquette.' },
  { id: '02', title: 'Catering', icon: <Utensils size={22} />, description: 'Modern Rwandan cuisine presented with gravity-defying precision.' },
  { id: '03', title: 'Wedding Support', icon: <Users size={22} />, description: 'Coordination of wedding parties with effortless traditional respect.' },
  { id: '04', title: 'Coffee & Trad', icon: <Coffee size={22} />, description: 'Traditional coffee ceremonies and performative Ingenzi dancers.' },
  { id: '05', title: 'Planning & Ops', icon: <Calendar size={22} />, description: 'Concept-to-execution via our signature anti-gravity method.' },
]

export default function Services() {
  return (
    <section id="services" className="section noise" style={{ backgroundColor: '#050810' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="badge"
          >
            Our Expertise
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginTop: '1rem' }}
          >
            Elite <span className="gold-text">Protocols</span>
          </motion.h2>
          <div className="gold-line" />
        </div>

        <div className="protocols-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{ 
                padding: '1.2rem 1.8rem', 
                textAlign: 'left', 
                minHeight: '210px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
              whileHover={{ 
                y: -10,
                borderColor: 'var(--gold)',
                boxShadow: 'var(--shadow-glow), var(--shadow-card)'
              }}
            >
              {/* Background Number Accent */}
              <div style={{ 
                position: 'absolute', top: '-1rem', right: '-1rem', 
                fontSize: '6.5rem', fontWeight: 900, 
                color: 'rgba(212,175,55,0.03)', zIndex: 0, 
                pointerEvents: 'none', userSelect: 'none',
                fontFamily: 'Outfit, sans-serif'
              }}>{service.id}</div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '0.6rem', 
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 0 0.8rem',
                  color: 'var(--gold)',
                  border: '1px solid rgba(201,168,76,0.2)'
                }}>
                  {service.icon}
                </div>
                
                <h3 style={{ marginBottom: '0.3rem', fontSize: '1.4rem', fontWeight: 300, letterSpacing: '-0.01em' }}>{service.title}</h3>
                <div className="gold-line" style={{ margin: '0 0 0.8rem', width: '25px', background: 'var(--gold)' }} />
                
                <p style={{ 
                  color: 'rgba(245,240,232,0.6)', 
                  fontSize: '0.875rem', 
                  lineHeight: 1.5,
                  fontWeight: 300,
                  fontFamily: 'Inter, sans-serif' 
                }}>
                  {service.description}
                </p>

                <a 
                  href="#cultural"
                  style={{ 
                    marginTop: '1.2rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em', 
                    color: 'var(--gold)',
                    fontWeight: 600,
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                  className="protocol-link"
                >
                  Explore <span style={{ transition: '0.3s transform' }}>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


  )
}
