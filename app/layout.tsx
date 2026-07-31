import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { GuestProvider } from '@/lib/guest-context'
import { ThemeProvider } from '@/lib/theme-provider'

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  // Use system preference
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                  }
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-white dark:bg-slate-950 bg-cover bg-fixed dark:bg-none" style={{ backgroundImage: 'url(/light-bg-pattern.png)' }}>
        <ThemeProvider>
          <GuestProvider>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
          </GuestProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
