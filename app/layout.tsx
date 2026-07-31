import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { GuestProvider } from '@/lib/guest-context'

export const metadata: Metadata = {
  title: 'OptiFi - AI-Powered Financial Planning',
  description: 'Get personalized financial recommendations, analyze your portfolio, and plan for your future with OptiFi&apos;s AI-powered financial planning assistant.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-slate-900">
      <body className="antialiased bg-slate-900">
        <GuestProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </GuestProvider>
      </body>
    </html>
  )
}
