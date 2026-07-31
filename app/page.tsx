'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() })

  // Redirect authenticated users to dashboard
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">OF</span>
            </div>
            <span className="font-bold text-xl text-white">OptiFi</span>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard?guest=true" className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition font-medium">
              Continue as Guest
            </Link>
            <Link href="/sign-in" className="text-slate-300 hover:text-white transition">
              Sign In
            </Link>
            <Link href="/sign-up" className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition font-medium">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Your AI-Powered Financial <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Planning Assistant</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Make smarter financial decisions with OptiFi. Get personalized recommendations, analyze your portfolio, and plan for your future with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/sign-up" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition text-center">
              Start Free
            </Link>
            <Link href="/dashboard?guest=true" className="px-8 py-4 border border-slate-600 hover:border-slate-400 text-white rounded-lg font-semibold transition">
              Try Demo
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 text-xl">
              📊
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Portfolio Analysis</h3>
            <p className="text-slate-400">Track all your investments and get a complete view of your asset allocation.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 text-xl">
              🤖
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Recommendations</h3>
            <p className="text-slate-400">Receive personalized investment recommendations powered by advanced AI algorithms.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 text-xl">
              🎯
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Goal Planning</h3>
            <p className="text-slate-400">Set and track financial goals with AI-powered progress monitoring.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-orange-500/50 transition">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 text-xl">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">What-If Simulator</h3>
            <p className="text-slate-400">Explore scenarios in real-time and see how different decisions impact your wealth.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-pink-500/50 transition">
            <div className="w-12 h-12 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mb-4 text-xl">
              💡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Smart Insights</h3>
            <p className="text-slate-400">Discover opportunities to optimize your investments and maximize returns.</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 text-xl">
              🔒
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
            <p className="text-slate-400">Your financial data is encrypted and protected with enterprise-grade security.</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-20 border-t border-slate-700 py-16">
        <div className="mx-auto max-w-2xl px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to take control of your financial future?</h2>
          <Link href="/sign-up" className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition">
            Start Your Journey
          </Link>
        </div>
      </div>
    </main>
  )
}
