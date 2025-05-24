'use client'

import { useEffect, useState } from 'react'
import { Sample } from '@/types'
import { fetchWithAuth, getApiBaseUrl } from '@/lib/api/config'

export const useSample = () => {
  const [data, setData] = useState<Sample | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const baseUrl = getApiBaseUrl()
        const response = await fetchWithAuth(`${baseUrl}/api/sample`)
        if (!response.ok) {
          throw new Error('Failed to fetch sample data')
        }
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      } finally {
        setLoading(false)
      }
    }

    fetchSample()
  }, [])

  return { data, loading, error }
}
