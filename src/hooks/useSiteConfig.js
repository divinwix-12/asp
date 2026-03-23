import { useState, useEffect } from 'react'

export function useSiteConfig() {
  const [siteConfig, setSiteConfig] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config')
      const data = await res.json()
      if (res.ok && data && !data.error) {
        setSiteConfig(data)
      } else {
        throw new Error(data.error || 'Failed to load configuration')
      }
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
      if (res.ok && !data.error) {
        setSiteConfig(data)
      } else {
        alert(`Update Failed: ${data.error || 'Unknown error'}`)
      }
    } catch (err) { 
        alert(`Update Failed: ${err.message}`)
        console.error(err) 
    }
  }

  useEffect(() => {
    fetchConfig()

  }, [])

  return { siteConfig, updateConfig, refresh: fetchConfig, loading }
}

