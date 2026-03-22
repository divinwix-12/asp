import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff, Star } from 'lucide-react'

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Elite Credentials for Alpha Service Protocol Rwanda
    const MASTER_USER = 'alpha'
    const MASTER_KEY = 'rwanda2026'

    if (formData.username === MASTER_USER && formData.password === MASTER_KEY) {
      setError('')
      navigate('/admin')
    } else {
      setError('Invalid Alpha Identifier or Access Key.')
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050810' }} className="noise">
      
      {/* Background Ambience */}
      <div className="orb pulse-gold" style={{ top: '10%', right: '15%', width: '300px', height: '300px', background: 'rgba(201,168,76,0.1)' }} />
      <div className="orb" style={{ bottom: '5%', left: '10%', width: '400px', height: '400px', background: 'rgba(56,189,248,0.05)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '3rem',
          textAlign: 'center',
          position: 'relative'
        }}
        className="glass-dark"
      >
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 2rem', boxShadow: '0 0 24px rgba(201,168,76,0.3)',
        }}>
          <img src="/logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="AlphaLogo" />
        </div>

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#F5F0E8' }}>Elite <span className="gold-text">Portal</span></h1>
        <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.9rem', marginBottom: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>Alpha Service Protocol Admin Access</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', top: '1.2rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
            <input 
              required placeholder="Alpha Identifier" className="input-field" 
              style={{ paddingLeft: '3rem' }}
              value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', top: '1.2rem', left: '1rem', color: 'rgba(245,240,232,0.3)' }} />
            <input 
              required type={showPassword ? 'text' : 'password'} placeholder="Access Key" className="input-field" 
              style={{ paddingLeft: '3rem' }}
              value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <button 
              type="button" onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', top: '1.2rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(245,240,232,0.3)', cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="btn-gold" style={{ marginTop: '1rem', justifyContent: 'center', padding: '1.1rem' }}>
            Authenticate Access
          </button>
          
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '1rem' }}>{error}</p>}
        </form>

        <p style={{ marginTop: '2.5rem', color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          Kabuga | Kigali | Elite Security
        </p>
      </motion.div>
    </div>
  )
}
