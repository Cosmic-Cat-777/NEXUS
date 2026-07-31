'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { GuestBanner } from '@/components/guest-banner'
import { useGuest } from '@/lib/guest-context'
import { useAuth } from '@/lib/use-auth'
import ScenarioSimulator from '@/components/scenario-simulator'

function SimulatorContent() {
  const searchParams = useSearchParams()
  const isGuestParam = searchParams.get('guest') === 'true'
  const { guestData } = useGuest()
  const { isLoading } = useAuth()
  const isGuest = isGuestParam

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 dark:bg-slate-950">
      {isGuest && <GuestBanner />}

      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NX</span>
              </div>
              <span className="font-bold text-xl text-white">NEXUS</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href={isGuest ? '/dashboard?guest=true' : '/dashboard'} className="text-slate-300 hover:text-white transition">
                Dashboard
              </Link>
              <Link href={isGuest ? '/portfolio?guest=true' : '/portfolio'} className="text-slate-300 hover:text-white transition">
                Portfolio
              </Link>
              <Link href={isGuest ? '/goals?guest=true' : '/goals'} className="text-slate-300 hover:text-white transition">
                Goals
              </Link>
              <Link href={isGuest ? '/simulator?guest=true' : '/simulator'} className="text-emerald-400 font-medium">
                What-If
              </Link>
              <Link href={isGuest ? '/insights?guest=true' : '/insights'} className="text-slate-300 hover:text-white transition">
                Insights
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 mx-auto max-w-7xl px-6 w-full ${isGuest ? 'py-8' : 'py-12'}`}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">What-If Scenario Simulator</h1>
          <p className="text-slate-400">
            {isGuest
              ? 'Explore different portfolio adjustments and see real-time projections for returns and risk. (Demo mode)'
              : 'Explore different portfolio adjustments and see real-time projections for returns and risk.'}
          </p>
        </div>

        {/* Simulator */}
        <ScenarioSimulator assets={guestData.assets} isGuest={isGuest} />
      </main>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 dark:bg-slate-950 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <SimulatorContent />
    </Suspense>
  )
}
