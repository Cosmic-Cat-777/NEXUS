'use client'

import { useEffect } from 'react'

const applyTheme = (theme: 'light' | 'dark') => {
  const htmlElement = document.documentElement
  if (theme === 'dark') {
    htmlElement.classList.add('dark')
  } else {
    htmlElement.classList.remove('dark')
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // On mount, immediately check stored theme preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (storedTheme) {
      applyTheme(storedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      applyTheme(systemTheme)
      localStorage.setItem('theme', systemTheme)
    }
  }, [])

  // Listen for storage changes from theme switcher on other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        applyTheme(e.newValue as 'light' | 'dark')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return <>{children}</>
}
