import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { GuestProvider } from '@/lib/guest-context'

export const metadata: Metadata = {
  title: 'NEXUS - Where Every Financial Decision Connects',
  description: 'Your AI Financial Command Center. Connect your goals, spending, savings, investments, and future plans into one intelligent platform with personalized AI insights.',
  generator: 'v0.app',
  icons: {
    icon: '/nexus-favicon.png',
    apple: '/nexus-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1020' },
  ],
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-slate-950">
        <GuestProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </GuestProvider>
      </body>
    </html>
  )
}
