import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import ExecutiveLeadership from '../components/ExecutiveLeadership'
import DynamicGallery from '../components/DynamicGallery'
import Footer from '../components/Footer'
import BookingModal from '../components/BookingModal'
import Preloader from '../components/Preloader'

export default function LandingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <main style={{ position: 'relative' }}>
      <Preloader />
      <Navbar onBookingOpen={() => setIsBookingOpen(true)} />
      
      <Hero onBookingOpen={() => setIsBookingOpen(true)} />
      
      <Services />

      <ExecutiveLeadership />

      <DynamicGallery />
      
      {/* Short CTA Section */}
      <section className="section" id="cultural" style={{ textAlign: 'center', backgroundColor: '#0A0F1E' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem' }}>Ready for <br /><span className="gold-text">Excellence?</span></h2>
          <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '3rem', fontSize: '1.2rem', fontWeight: 300 }}>
            Every event is a signature. Contact our elite booking team to reserve your date at Kabuga or Kigali.
          </p>
          <button className="btn-gold" onClick={() => setIsBookingOpen(true)} style={{ padding: '1.2rem 3rem' }}>
            Begin Alpha Protocol
          </button>
        </div>
      </section>

      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </main>
  )
}
