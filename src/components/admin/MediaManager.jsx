import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, Image as ImageIcon, ExternalLink, RefreshCw, Upload, Cloud } from 'lucide-react'
import { uploadToCloudinary } from '../../utils/cloudinary'

export default function MediaManager() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const fileInputRef = useRef(null)

  const fetchImages = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/images')
      const data = await res.json()
      if (Array.isArray(data)) {
        setImages(data)
      } else {
        console.error("API returned non-array:", data);
        setImages([])
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const addImage = async (e) => {
    e && e.preventDefault()
    if (!newUrl) return
    try {
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl, title: newTitle || 'New Gallery Item' }),
      })
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save to database');
      }
      setNewUrl('')
      setNewTitle('')
      fetchImages()
    } catch (err) { 
      alert(`Save Failed: ${err.message}`);
      console.error(err); 
    }
  }

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setUploading(true)
    try {
      // Use a sequential approach or map to promises that check response.ok
      for (const file of files) {
        const secureUrl = await uploadToCloudinary(file)
        const res = await fetch('/api/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: secureUrl, title: file.name }),
        })
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Failed to save ${file.name} to database`);
        }
      }
      setNewTitle('')
      await fetchImages()
    } catch (err) {
      alert(`Upload/Save Failed: ${err.message}`)
      console.error(err)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const deleteImage = async (id) => {
    try {
      await fetch(`/api/images/${id}`, { method: 'DELETE' })
      fetchImages()
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="media-manager">
      <div className="content-header">
        <div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>Gallery Controller</h3>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.85rem' }}>Update your portfolio instantly across the platform.</p>
        </div>
        
        <div className="admin-toolbar">
          <form onSubmit={addImage} style={{ display: 'flex', gap: '0.8rem' }}>
            <input 
              placeholder="Image URL" className="input-field" style={{ width: '220px', padding: '0.6rem 1rem', fontSize: '0.8rem' }}
              value={newUrl} onChange={e => setNewUrl(e.target.value)}
            />
            <input 
              placeholder="Label" className="input-field" style={{ width: '120px', padding: '0.6rem 1rem', fontSize: '0.8rem' }}
              value={newTitle} onChange={e => setNewTitle(e.target.value)}
            />
            <button type="submit" disabled={uploading} className="btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', gap: '0.3rem', opacity: uploading ? 0.5 : 1 }}>
              <Plus size={14} /> Add URL
            </button>
          </form>

          <div className="divider" style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>

          <input 
            type="file" 
            multiple
            hidden 
            ref={fileInputRef} 
            accept="image/*"
            onChange={handleFileUpload}
          />
          <button 
            type="button" 
            className="btn-gold" 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', gap: '0.5rem', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--gold)', opacity: uploading ? 0.5 : 1 }}
          >
            {uploading ? <RefreshCw className="spin-slow" size={14} /> : <Upload size={14} />}
            {uploading ? 'Processing...' : 'Upload Local'}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}><RefreshCw className="spin-slow" /></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {images.map(img => (
            <div key={img.id} className="glass" style={{ padding: '0.75rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '0.6rem', overflow: 'hidden', marginBottom: '0.75rem' }}>
                <img src={img.url} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{img.title}</span>
                <button 
                  onClick={() => deleteImage(img.id)}
                  style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          
          {/* Placeholder for no images */}
          {images.length === 0 && (
            <div style={{ gridColumn: '1 / -1', border: '2px dashed rgba(255,255,255,0.05)', borderRadius: '1rem', height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,240,232,0.2)' }}>
              <ImageIcon size={32} />
              <p style={{ marginTop: '0.5rem' }}>No gallery items uploaded yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
