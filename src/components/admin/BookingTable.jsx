import { MessageCircle, Check, Clock, CheckCircle } from 'lucide-react'

export default function BookingTable({ bookings, onUpdate }) {
  
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) onUpdate()
    } catch (err) { console.error(err) }
  }

  const handleWhatsApp = (booking) => {
    // Basic formatting for Rwanda numbers or full international if provided
    let phoneNum = booking.phone.replace(/\D/g, '')
    if (phoneNum.startsWith('0')) phoneNum = '250' + phoneNum.substring(1)
    
    const text = encodeURIComponent(`Hello ${booking.name}, this is Alpha Service Protocol. We have received your request for ${booking.serviceType} on ${booking.eventDate}. How can we assist you further?`)
    window.open(`https://wa.me/${phoneNum}?text=${text}`, '_blank')
  }

  if (!bookings || bookings.length === 0) {
    return <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(245,240,232,0.4)' }}>No bookings found. Try refreshing.</div>
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Service Type</th>
            <th>Event Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Message Center</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <div style={{ fontWeight: 600 }}>{booking.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', marginTop: '0.1rem' }}>{booking.phone}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', marginTop: '0.1rem' }}>{booking.email}</div>
              </td>
              <td>
                <span style={{ 
                  padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.4rem', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.8rem' 
                }}>
                  {booking.serviceType}
                </span>
              </td>
              <td style={{ fontSize: '0.85rem' }}>{booking.eventDate}</td>
              <td style={{ fontSize: '0.85rem' }}>{booking.location}</td>
              <td>
                <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                  {booking.status}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleWhatsApp(booking)}
                  style={{ 
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E', 
                    padding: '0.4rem 0.8rem', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem'
                  }}
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>
              </td>
              <td style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  title="Confirm" 
                  onClick={() => handleStatusChange(booking.id, 'Confirmed')}
                  style={{ width: '32px', height: '32px', border: 'none', background: 'rgba(56,189,248,0.1)', color: '#38bdf8', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Clock size={16} />
                </button>
                <button 
                  title="Complete"
                  onClick={() => handleStatusChange(booking.id, 'Completed')}
                  style={{ width: '32px', height: '32px', border: 'none', background: 'rgba(34,197,94,0.1)', color: '#22C55E', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CheckCircle size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
