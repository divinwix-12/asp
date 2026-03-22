import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, Save, Edit, X, Type, Image as ImageIcon, Upload, Trash2, Phone, MapPin, Instagram, Facebook } from 'lucide-react'
import { useSiteConfig } from '../../hooks/useSiteConfig'
import { uploadToCloudinary } from '../../utils/cloudinary'

export default function SiteEditor() {
  const { siteConfig, updateConfig, loading } = useSiteConfig()
  const [editingField, setEditingField] = useState(null) // { section, field, label }
  const [tempValue, setTempValue] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleEditInit = (section, field, label, current) => {
    setEditingField({ section, field, label })
    setTempValue(current)
  }

  const handleSave = async () => {
    if (!editingField) return
    // Deep copy to ensure nested changes trigger React re-renders and clean updates
    const newConfig = JSON.parse(JSON.stringify(siteConfig))
    newConfig[editingField.section][editingField.field] = tempValue
    await updateConfig(newConfig)
    setEditingField(null)
    setTempValue('')
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setUploading(true)
    try {
      const url = await uploadToCloudinary(file)
      setTempValue(url)
    } catch (err) {
      alert(`Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
    }
  }

  if (loading || !siteConfig) return <div style={{ textAlign: 'center', padding: '100px 0' }}><RefreshCw className="spin-slow" style={{ margin: '0 auto' }} /><p style={{ marginTop: '1rem', color: 'rgba(245,240,232,0.4)' }}>Authenticating Alpha Mannequin...</p></div>

  const editorSections = [
    {
      id: 'hero',
      label: 'Hero Atmosphere',
      fields: [
        { key: 'bg', label: 'Background Image (URL)', type: 'image', icon: <ImageIcon size={18} /> },
        { key: 'title', label: 'Main Headline', type: 'text', icon: <Type size={18} /> },
        { key: 'subtitle', label: 'Subtext / Vision', type: 'text', icon: <Type size={18} /> },
      ]
    },
    {
      id: 'services',
      label: 'Catering Display',
      fields: [
        { key: 'protocol', label: 'Protocol Image (URL)', type: 'image', icon: <ImageIcon size={18} /> }
      ]
    },
    {
      id: 'leadership',
      label: 'Leadership Vision',
      fields: [
        { key: 'photo', label: 'Director Photo', type: 'image', icon: <ImageIcon size={18} /> },
        { key: 'name', label: 'Director Name', type: 'text', icon: <Type size={18} /> },
        { key: 'vision', label: 'Director Vision', type: 'text', icon: <Type size={18} /> },
      ]
    },
    {
        id: 'contact',
        label: 'Contact Info',
        fields: [
          { key: 'phone', label: 'Phone Number', type: 'text', icon: <Phone size={18} /> },
          { key: 'address', label: 'Business Address', type: 'text', icon: <MapPin size={18} /> },
        ]
    },
    {
        id: 'social',
        label: 'Social Media',
        fields: [
          { key: 'instagram', label: 'Instagram URL', type: 'text', icon: <Instagram size={18} /> },
          { key: 'facebook', label: 'Facebook URL', type: 'text', icon: <Facebook size={18} /> },
        ]
    },
    {
        id: 'hero_slides',
        label: 'Hero Slideshow',
        type: 'slideshow',
        fields: []
    }
  ]

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: 'var(--gold)', marginBottom: '0.5rem' }}>Visual Mannequin</h3>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Directly edit the front-end components and sync in real-time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        {editorSections.map((sec) => (
          <div key={sec.id} className="glass" style={{ padding: '1.5rem', borderRadius: '1.5rem' }}>
            <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--gold)' }}>●</span> {sec.label}
            </h4>
            
            {sec.type === 'slideshow' ? (
                <SlideshowManager siteConfig={siteConfig} updateConfig={updateConfig} />
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  {sec.fields.map((f) => {
                const isEditing = editingField?.section === sec.id && editingField?.field === f.key
                const currentValue = siteConfig[sec.id]?.[f.key] || ''

                return (
                  <div key={f.key} style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {f.icon} {f.label}
                      </label>
                      {!isEditing && (
                        <button 
                          onClick={() => handleEditInit(sec.id, f.key, f.label, currentValue)}
                          style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', padding: '5px' }}
                        >
                          <Edit size={16} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div 
                          key="edit"
                          initial={{ opacity: 0, scaleY: 0.9 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0.9 }}
                          style={{ display: 'flex', gap: '0.5rem' }}
                        >
                          {f.type === 'text' ? (
                            <textarea 
                              value={tempValue}
                              onChange={(e) => setTempValue(e.target.value)}
                              style={{ 
                                flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--gold)', 
                                color: '#fff', borderRadius: '0.8rem', padding: '0.8rem',
                                fontSize: '0.9rem', outline: 'none', minHeight: '80px', fontFamily: 'Inter, sans-serif'
                              }}
                            />
                          ) : (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                              <input 
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                placeholder="Enter HTTPS URL..."
                                style={{ 
                                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--gold)', 
                                  color: '#fff', borderRadius: '0.8rem', padding: '0.8rem',
                                  fontSize: '0.9rem', outline: 'none'
                                }}
                              />
                              <input 
                                type="file" 
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
                                style={{ 
                                  fontSize: '0.7rem', padding: '0.5rem', background: 'rgba(212,175,55,0.05)', 
                                  border: '1px solid rgba(212,175,55,0.2)', gap: '0.4rem', justifyContent: 'center'
                                }}
                              >
                                {uploading ? <RefreshCw className="spin-slow" size={12} /> : <Upload size={12} />}
                                {uploading ? 'Uploading to Cloudinary...' : 'Upload Local Image'}
                              </button>
                            </div>
                          )}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <button onClick={handleSave} className="btn-gold" style={{ padding: '0.8rem' }}><Save size={18} /></button>
                            <button onClick={() => setEditingField(null)} style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.8rem', cursor: 'pointer', padding: '0.8rem' }}>
                              <X size={18} />
                            </button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="preview"
                          style={{ 
                            background: 'rgba(255,255,255,0.03)', borderRadius: '0.8rem', padding: '1rem',
                            border: '1px solid rgba(255,255,255,0.05)', minHeight: '45px'
                          }}
                        >
                           {f.type === 'image' && (
                             <img src={currentValue} alt="Preview" style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '0.4rem', marginBottom: '0.5rem' }} />
                           )}
                           <p style={{ fontSize: '0.9rem', opacity: 0.8, wordBreak: 'break-all', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {currentValue}
                           </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SlideshowManager({ siteConfig, updateConfig }) {
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)
    const currentSlides = siteConfig?.hero?.slides || []

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files)
        if (files.length === 0) return
        setUploading(true)
        try {
            const urls = await Promise.all(files.map(f => uploadToCloudinary(f)))
            const newConfig = JSON.parse(JSON.stringify(siteConfig))
            newConfig.hero.slides = [...currentSlides, ...urls]
            await updateConfig(newConfig)
            if (fileInputRef.current) fileInputRef.current.value = ''
        } catch (err) {
            console.error(err)
        } finally {
            setUploading(false)
        }
    }

    const removeItem = async (index) => {
        const newConfig = JSON.parse(JSON.stringify(siteConfig))
        newConfig.hero.slides = currentSlides.filter((_, i) => i !== index)
        await updateConfig(newConfig)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {currentSlides.map((url, i) => (
                    <motion.div 
                        layout
                        key={url} 
                        style={{ position: 'relative', width: '90px', height: '90px', borderRadius: '0.8rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Slide" />
                        <button 
                            onClick={() => removeItem(i)}
                            style={{ position: 'absolute', top: 5, right: 5, background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Trash2 size={12} />
                        </button>
                    </motion.div>
                ))}
            </div>

            <input type="file" multiple hidden ref={fileInputRef} accept="image/*" onChange={handleFileUpload} />
            
            <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '0.5rem' }}
            >
                {uploading ? <RefreshCw className="spin-slow" size={16} /> : <Upload size={16} />}
                {uploading ? 'Processing Elite Asset...' : 'Upload New Hero Slide'}
            </button>

            <p style={{ fontSize: '0.7rem', opacity: 0.4, fontStyle: 'italic', textAlign: 'center' }}>
                * High-resolution cinematic visuals recommended for the best weightless experience.
            </p>
        </div>
    )
}
