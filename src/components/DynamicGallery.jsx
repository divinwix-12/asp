import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'


export default function DynamicGallery() {
  const [images, setImages] = useState([])

  const fetchImages = () => {
    fetch('/api/images')
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchImages()
  }, [])


  if (images.length === 0) return null

  return (
    <section id="gallery" className="section noise" style={{ background: '#050810' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="badge">Portfolio</div>
          <h2 style={{ marginTop: '1rem' }}>Elite <span className="gold-text">Gallery</span></h2>
          <div className="gold-line" />
        </div>

        <div className="masonry-grid">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className="masonry-item"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 5) * 0.1 }}
            >
              <img src={img.url} alt={img.title} />
              
              {/* Subtle hover overlay to match reference image context if needed */}
              <div style={{ 
                position: 'absolute', inset: 0, 
                background: 'rgba(5,8,16,0.1)', 
                opacity: 0, transition: '0.3s' 
              }} className="hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
