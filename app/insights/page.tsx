'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAssets, getGoals, getRecommendations } from '@/app/actions/portfolio'
import InsightsClient from '@/components/insights-client'

export default async function InsightsPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const [assets, goals, recommendations] = await Promise.all([getAssets(), getGoals(), getRecommendations()])

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 sticky top-0 z-40 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">OF</span>
              </div>
              <span className="font-bold text-xl text-white">OptiFi</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-slate-300 hover:text-white transition">Dashboard</Link>
              <Link href="/portfolio" className="text-slate-300 hover:text-white transition">Portfolio</Link>
              <Link href="/goals" className="text-slate-300 hover:text-white transition">Goals</Link>
              <Link href="/simulator" className="text-slate-300 hover:text-white transition">What-If</Link>
              <Link href="/insights" className="text-emerald-400 font-medium">Insights</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI-Powered Insights</h1>
          <p className="text-slate-400">Get personalized recommendations to optimize your portfolio and achieve your goals faster.</p>
        </div>

        {/* Insights Client Component */}
        <InsightsClient assets={assets} goals={goals} initialRecommendations={recommendations} />
      </main>
    </div>
  )
}
