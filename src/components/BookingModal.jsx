import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Calendar, MapPin, Briefcase, Mail, User, Phone } from 'lucide-react'

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    eventDate: '',
    location: 'Kabuga/Kigali',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          onClose()
          setStatus('idle')
          setFormData({
            name: '',
            email: '',
            serviceType: '',
            eventDate: '',
            location: 'Kabuga/Kigali',
            message: ''
          })
        }, 2000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Booking error:', error)
      setStatus('error')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            background: 'rgba(5,8,16,0.6)',
            backdropFilter: 'blur(12px)',
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              padding: '2.5rem',
              width: '100%',
              maxWidth: '560px',
              position: 'relative',
              borderRadius: '2rem',
              boxShadow: '0 20px 80px rgba(0,0,0,0.6)',
              overflow: 'hidden'
            }}
            className="glass-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="orb" style={{ top: '-10%', right: '-10%', width: '200px', height: '200px', background: 'rgba(201,168,76,0.1)' }} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', position: 'relative' }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', color: '#F5F0E8' }}>Request <span className="gold-text">Protocol</span></h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.5)', fontFamily: 'Outfit, sans-serif' }}>Kabuga, Kigali | Elite Hospitality</p>
              </div>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <div style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>
                  <Send size={48} style={{ margin: '0 auto' }} />
                </div>
                <h3>Request Sent Successfully</h3>
                <p style={{ color: 'rgba(245,240,232,0.6)' }}>An elite representative will contact you via WhatsApp or Email shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <User size={16} style={{ position: 'absolute', top: '1.1rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
                    <input 
                      required name="name" placeholder="Full Name" className="input-field" 
                      style={{ paddingLeft: '2.8rem' }}
                      value={formData.name} onChange={handleChange}
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', top: '1.1rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
                    <input 
                      required name="phone" placeholder="Phone Number" className="input-field" 
                      style={{ paddingLeft: '2.8rem' }}
                      value={formData.phone} onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', top: '1.1rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
                  <input 
                    required type="email" name="email" placeholder="Email Address" className="input-field" 
                    style={{ paddingLeft: '2.8rem' }}
                    value={formData.email} onChange={handleChange}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <Briefcase size={16} style={{ position: 'absolute', top: '1.1rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
                  <select 
                    required name="serviceType" className="input-field" 
                    style={{ paddingLeft: '2.8rem', appearance: 'none' }}
                    value={formData.serviceType} onChange={handleChange}
                  >
                    <option value="" disabled>Select Service Type</option>
                    <option value="Service & Protocol">Service & Protocol</option>
                    <option value="Catering">Catering</option>
                    <option value="Groomsmen & Bridesmaids">Groomsmen & Bridesmaids</option>
                    <option value="Coffee & Traditional Dance">Coffee & Traditional Dance</option>
                    <option value="Saxo & Band">Saxo & Band</option>
                    <option value="Wedding Planning">Wedding Planning</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={16} style={{ position: 'absolute', top: '1.1rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
                    <input 
                      required type="date" name="eventDate" className="input-field" 
                      style={{ paddingLeft: '2.8rem' }}
                      value={formData.eventDate} onChange={handleChange}
                    />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} style={{ position: 'absolute', top: '1.1rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
                    <input 
                      required name="location" placeholder="Location" className="input-field" 
                      style={{ paddingLeft: '2.8rem' }}
                      value={formData.location} onChange={handleChange}
                    />
                  </div>
                </div>

                <textarea 
                  required name="message" placeholder="Event details and specific requests..." className="input-field" 
                  style={{ minHeight: '120px', resize: 'none' }}
                  value={formData.message} onChange={handleChange}
                ></textarea>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-gold" 
                  style={{ marginTop: '0.5rem', justifyContent: 'center', width: '100%', padding: '1.1rem' }}
                >
                  {status === 'submitting' ? 'Authenticating...' : 'Confirm Request'}
                </button>
                {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.8rem', textAlign: 'center' }}>Error sending request. Please try again.</p>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
