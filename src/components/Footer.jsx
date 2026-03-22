import { motion } from 'framer-motion'
import { MapPin, Phone, Instagram, Facebook, Mail, Star } from 'lucide-react'
import { useSiteConfig } from '../hooks/useSiteConfig'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { siteConfig } = useSiteConfig()
  
  const social = siteConfig?.social || { instagram: '#', facebook: '#', mail: '#' }
  const contact = siteConfig?.contact || { phone: '+250 7XX XXX XXX', address: 'Kigali, Rwanda' }

  return (
    <footer className="noise" style={{ background: '#050810', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '6rem 1.5rem 3rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
          
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              <img src="/logo.png" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'contain' }} alt="Alpha" />
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#F5F0E8', letterSpacing: '0.05em' }}>ALPHA</div>
                <div style={{ fontSize: '0.55rem', color: 'rgba(201,168,76,0.8)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Service Protocol</div>
              </div>
            </div>
            <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '300px' }}>
              Elite hospitality, Wedding planning, and Cultural ceremonies in Kigali. Culturally rooted protocols for the modern world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#F5F0E8', marginBottom: '1.5rem', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                { label: 'Services', href: '#services' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'About Us', href: '#about' },
                { label: 'Contact', href: '#cultural' }
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} style={{ color: 'rgba(245,240,232,0.6)', textDecoration: 'none', fontSize: '0.9rem', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#C9A84C'} onMouseLeave={e => e.target.style.color = 'rgba(245,240,232,0.6)'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 style={{ color: '#F5F0E8', marginBottom: '1.5rem', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>Our Location</h4>
            <div style={{ display: 'flex', gap: '1rem', color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <MapPin size={20} style={{ color: 'var(--gold)', shrink: 0 }} />
              <p>{contact.address}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem' }}>
              <Phone size={20} style={{ color: 'var(--gold)', shrink: 0 }} />
              <p>{contact.phone}</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ color: '#F5F0E8', marginBottom: '1.5rem', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              {[
                { Icon: Instagram, href: social.instagram },
                { Icon: Facebook, href: social.facebook },
                { Icon: Mail, href: social.mail }
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', border: '1px solid rgba(255,255,255,0.1)', transition: '0.3s' }} onMouseEnter={e => e.target.style.background = 'rgba(201,168,76,0.1)'} onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.05)'}>
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '2.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1.5rem', color: 'rgba(245,240,232,0.4)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <p>© {currentYear} Alpha Service Protocol. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
