'use server'

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getGoals } from '@/app/actions/portfolio'
import GoalsManagement from '@/components/goals-management'

export default async function GoalsPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const goals = await getGoals()

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
              <Link href="/goals" className="text-emerald-400 font-medium">Goals</Link>
              <Link href="/simulator" className="text-slate-300 hover:text-white transition">What-If</Link>
              <Link href="/insights" className="text-slate-300 hover:text-white transition">Insights</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Financial Goals</h1>
          <p className="text-slate-400">Set and track your financial goals with AI-powered guidance.</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Total Goals</p>
            <p className="text-3xl font-bold text-white">{goals.length}</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Combined Target</p>
            <p className="text-3xl font-bold text-white">
              ${goals.reduce((sum, g) => sum + parseFloat(g.targetAmount || '0'), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Total Saved</p>
            <p className="text-3xl font-bold text-emerald-400">
              ${goals.reduce((sum, g) => sum + parseFloat(g.currentAmount || '0'), 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Overall Progress</p>
            <p className="text-3xl font-bold text-blue-400">
              {goals.length > 0
                ? Math.round(
                    (goals.reduce((sum, g) => sum + parseFloat(g.currentAmount || '0'), 0) /
                      goals.reduce((sum, g) => sum + parseFloat(g.targetAmount || '1'), 0)) *
                      100
                  )
                : 0}%
            </p>
          </div>
        </div>

        {/* Goals Management */}
        <GoalsManagement goals={goals} />
      </main>
    </div>
  )
}
