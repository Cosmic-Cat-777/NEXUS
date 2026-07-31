'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme-switcher'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-cyan-500/5 dark:from-violet-500/10 dark:via-transparent dark:to-cyan-500/10"></div>
        <svg className="absolute w-full h-full dark:opacity-20 opacity-5" viewBox="0 0 1200 800">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400/10 dark:bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-amber-400/10 dark:bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-200/50 dark:border-slate-700/50 bg-white/30 dark:bg-slate-950 dark:bg-slate-950/30 backdrop-blur-lg sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition"></div>
              <div className="relative w-10 h-10 bg-white dark:bg-slate-950 rounded-xl flex items-center justify-center">
                <span className="text-lg font-black bg-gradient-to-br from-violet-600 to-cyan-500 bg-clip-text text-transparent">N</span>
              </div>
            </div>
            <span className="hidden sm:inline font-bold text-xl bg-gradient-to-r from-violet-600 dark:from-violet-400 to-cyan-600 dark:to-cyan-400 bg-clip-text text-transparent">NEXUS</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeSwitcher />
            <Link href="/dashboard?guest=true" className="hidden md:inline-block px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition font-medium">
              Explore Demo
            </Link>
            <Link href="/sign-in" className="hidden md:inline-block text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition">
              Sign In
            </Link>
            <Link href="/sign-up" className="px-4 md:px-6 py-2.5 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-lg transition font-semibold shadow-lg hover:shadow-xl hover:shadow-violet-500/25 dark:hover:shadow-violet-600/25">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black leading-tight text-slate-900 dark:text-white">
                  NEXUS
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 dark:from-violet-400 via-cyan-600 dark:via-cyan-400 to-amber-500 dark:to-amber-400 bg-clip-text text-transparent">
                  Your AI Financial Command Center
                </h2>
              </div>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Connect your goals, spending, savings, investments, and future plans into one intelligent platform that analyzes every financial decision and guides you toward long-term wealth with personalized AI insights.
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Where Every Financial Decision Connects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/sign-up" className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl hover:shadow-violet-500/25 dark:hover:shadow-violet-600/25">
                  Get Started
                </Link>
                <Link href="/dashboard?guest=true" className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  Explore Live Demo
                </Link>
              </div>
            </div>

            {/* Hero Visual - Network Visualization */}
            <div className="relative h-96 md:h-full flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full h-full max-w-md">
                {/* Outer glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-3xl blur-2xl"></div>

                {/* Inner card with gradient border effect */}
                <div className="relative h-full bg-gradient-to-br from-white/10 dark:from-white/5 to-white/5 dark:to-white/0 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center overflow-hidden">
                  {/* Animated network grid */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 300">
                    <defs>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#7C3AED', stopOpacity: 0.5 }} />
                        <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 0.5 }} />
                      </linearGradient>
                    </defs>
                    <circle cx="150" cy="80" r="8" fill="#7C3AED" />
                    <circle cx="100" cy="180" r="8" fill="#06B6D4" />
                    <circle cx="200" cy="180" r="8" fill="#F59E0B" />
                    <circle cx="150" cy="250" r="8" fill="#7C3AED" />
                    <line x1="150" y1="80" x2="100" y2="180" stroke="url(#lineGradient)" strokeWidth="2" />
                    <line x1="150" y1="80" x2="200" y2="180" stroke="url(#lineGradient)" strokeWidth="2" />
                    <line x1="100" y1="180" x2="150" y2="250" stroke="url(#lineGradient)" strokeWidth="2" />
                    <line x1="200" y1="180" x2="150" y2="250" stroke="url(#lineGradient)" strokeWidth="2" />
                  </svg>

                  {/* Content */}
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">🧠</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Powered by AI</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Advanced analytics meeting human insight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative border-t border-slate-200/50 dark:border-slate-700/50 py-20">
          <div className="mx-auto max-w-7xl px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">Powerful Features</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need for intelligent financial management</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Portfolio Mastery',
                  desc: 'Track, analyze, and optimize your entire investment portfolio in real-time.',
                  icon: '📊',
                  color: 'from-violet-600 to-purple-600'
                },
                {
                  title: 'AI Intelligence',
                  desc: 'Get personalized recommendations powered by advanced machine learning algorithms.',
                  icon: '🤖',
                  color: 'from-cyan-600 to-blue-600'
                },
                {
                  title: 'Goal Planning',
                  desc: 'Set, track, and achieve your financial goals with AI-powered guidance.',
                  icon: '🎯',
                  color: 'from-amber-500 to-orange-600'
                },
                {
                  title: 'What-If Analysis',
                  desc: 'Simulate scenarios and explore how decisions impact your wealth.',
                  icon: '⚡',
                  color: 'from-pink-600 to-red-600'
                },
                {
                  title: 'Live Insights',
                  desc: 'Discover optimization opportunities and investment insights instantly.',
                  icon: '💡',
                  color: 'from-lime-600 to-green-600'
                },
                {
                  title: 'Enterprise Security',
                  desc: 'Your data is encrypted and protected with military-grade security.',
                  icon: '🔒',
                  color: 'from-indigo-600 to-violet-600'
                }
              ].map((feature, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 transition cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:to-cyan-500/5 dark:group-hover:from-violet-500/10 dark:group-hover:to-cyan-500/10 rounded-2xl transition"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative border-t border-slate-200/50 dark:border-slate-700/50 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
                Ready to Connect Your Financial Future?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Join thousands of users making smarter financial decisions with NEXUS.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up" className="px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl hover:shadow-violet-500/25">
                Start Free Today
              </Link>
              <Link href="/dashboard?guest=true" className="px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                Continue as Guest
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-slate-200/50 dark:border-slate-700/50 py-8">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <p>© 2024 NEXUS. All rights reserved.</p>
          <p>Where Every Financial Decision Connects.</p>
        </div>
      </footer>
    </div>
  )
}
