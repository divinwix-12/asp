import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

// Initialize socket once
const socket = io('/')

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config')
      const data = await res.json()
      setSiteConfig(data)
    } catch (err) { 
      console.error(err)
      setSiteConfig({
        hero: { bg: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000' },
        services: { protocol: 'https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=1000' }
      })
    }
    setLoading(false)
  }

  const updateConfig = async (newConfig) => {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      })
      const data = await res.json()
      setSiteConfig(data)
    } catch (err) { console.error(err) }
  }

  useEffect(() => {
    fetchConfig()

    // Listen for real-time site updates
    socket.on('site-update', (payload) => {
      console.log('Real-time update received:', payload)
      if (payload.type === 'config') {
        setSiteConfig(payload.data)
      }
    })

    return () => {
      socket.off('site-update')
    }
  }, [])

  return { siteConfig, updateConfig, refresh: fetchConfig, loading }
}

// Separate hook for real-time events like bookings or gallery
export function useRealtimeEvents(effectCallback) {
  useEffect(() => {
    socket.on('site-update', effectCallback)
    return () => socket.off('site-update')
  }, [effectCallback])
}
