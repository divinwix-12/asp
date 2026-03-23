import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Users, Image as ImageIcon, MessageSquare, LogOut, ExternalLink, RefreshCw, Trash2, Check, X, Clock, Edit3 } from 'lucide-react'

// Sub-components
import BookingTable from '../../components/admin/BookingTable'
import MediaManager from '../../components/admin/MediaManager'
import SiteEditor from '../../components/admin/SiteEditor'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('bookings')
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 })
  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      if (Array.isArray(data)) {
        setBookings(data)
        setStats({
          total: data.length,
          pending: data.filter(b => b.status === 'Pending').length,
          completed: data.filter(b => b.status === 'Completed').length,
        })
      } else {
        console.error("API returned non-array:", data);
        setBookings([])
      }
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="admin-layout">
      
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header" style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div className="sidebar-logo" style={{ width: 32, height: 32, borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/logo.png" style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="AlphaAdmin" />
          </div>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>ALPHA <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>ADMIN</span></h2>
        </div>

        <nav className="admin-nav" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'bookings', label: 'Booking Inbox', icon: MessageSquare },
            { id: 'site', label: 'Site Editor', icon: Edit3 },
            { id: 'media', label: 'Gallery Admin', icon: ImageIcon },
            { id: 'clients', label: 'Elite Clients', icon: Users },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem',
                borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
                transition: '0.3s',
                background: activeTab === item.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                color: activeTab === item.id ? 'var(--gold)' : 'rgba(245,240,232,0.5)',
                textAlign: 'left', fontSize: '0.9rem', width: '100%'
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="sign-out-btn" style={{ 
          marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1rem', 
          padding: '1rem', color: '#ef4444', background: 'none', border: 'none', 
          cursor: 'pointer', fontSize: '0.9rem'
        }}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        
        {/* Header */}
        <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', marginBottom: '0.5rem' }}>
              Welcome back, <span className="gold-text">Alpha Admin</span>
            </h1>
            <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.9rem' }}>Managing elite service requests for Kabuga & Kigali.</p>
          </div>
          
          <button onClick={fetchBookings} className="btn-outline" style={{ padding: '0.6rem 1.2rem', gap: '0.5rem' }}>
            <RefreshCw size={16} />
            Refresh Data
          </button>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          {[
            { label: 'Total Requests', value: stats.total, icon: MessageSquare, color: 'var(--gold)' },
            { label: 'Pending Auth', value: stats.pending, icon: Clock, color: '#eab308' },
            { label: 'Completed', value: stats.completed, icon: Check, color: '#22c55e' },
          ].map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div>
                <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-dark" style={{ minHeight: '500px', padding: '2rem' }}>
          {activeTab === 'bookings' && <BookingTable bookings={bookings} onUpdate={fetchBookings} />}
          {activeTab === 'site' && <SiteEditor />}
          {activeTab === 'media' && <MediaManager />}
          {activeTab === 'clients' && <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.5 }}><Users size={48} style={{ margin: '0 auto 1rem' }} /><p>Client management coming soon...</p></div>}
        </div>

      </main>
    </div>
  )
}
