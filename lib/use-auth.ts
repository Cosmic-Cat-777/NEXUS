'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { useGuest } from '@/lib/guest-context'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isGuest } = useGuest()

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await authClient.getSession()
        setUser(session?.user || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch session')
      } finally {
        setIsLoading(false)
      }
    }

    getSession()
  }, [])

  const isAuthenticated = !!user
  const isInDemoMode = isGuest && !isAuthenticated

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isInDemoMode,
  }
}
