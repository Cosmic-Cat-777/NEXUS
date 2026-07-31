'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardClient from '@/components/dashboard-client'
import { getAssets, getGoals, getUserProfile } from '@/app/actions/portfolio'

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const [assets, goals, profile] = await Promise.all([getAssets(), getGoals(), getUserProfile()])

  // Calculate portfolio stats
  const totalValue = assets.reduce((sum, asset) => sum + (parseFloat(asset.totalValue || '0')), 0)
  const assetsCount = assets.length
  const goalsCount = goals.length

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
              <Link href="/dashboard" className="text-emerald-400 font-medium">Dashboard</Link>
              <Link href="/portfolio" className="text-slate-300 hover:text-white transition">Portfolio</Link>
              <Link href="/goals" className="text-slate-300 hover:text-white transition">Goals</Link>
              <Link href="/simulator" className="text-slate-300 hover:text-white transition">What-If</Link>
              <Link href="/insights" className="text-slate-300 hover:text-white transition">Insights</Link>
            </nav>
          </div>
          <form action={async () => {
            'use server'
            await auth.api.signOut({ headers: await headers() })
            redirect('/sign-in')
          }}>
            <button type="submit" className="text-slate-300 hover:text-white transition">Sign Out</button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {session.user.name || 'Investor'}</h1>
          <p className="text-slate-400">Here&apos;s your financial overview and personalized recommendations.</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Portfolio Value</p>
            <p className="text-3xl font-bold text-white">${totalValue.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-emerald-400 mt-2">+2.5% this month</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Total Assets</p>
            <p className="text-3xl font-bold text-white">{assetsCount}</p>
            <p className="text-sm text-slate-400 mt-2">Holdings tracked</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Active Goals</p>
            <p className="text-3xl font-bold text-white">{goalsCount}</p>
            <p className="text-sm text-blue-400 mt-2">On track</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Risk Score</p>
            <p className="text-3xl font-bold text-white">{profile?.riskTolerance || 'Not set'}</p>
            <p className="text-sm text-slate-400 mt-2">Risk tolerance</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <DashboardClient assets={assets} goals={goals} />
      </main>
    </div>
  )
}
