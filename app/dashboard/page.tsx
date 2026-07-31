"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { GuestBanner } from "@/components/guest-banner"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useGuest } from "@/lib/guest-context"
import { useAuth } from "@/lib/use-auth"
import DashboardClient from "@/components/dashboard-client"

function DashboardContent() {
  const searchParams = useSearchParams()
  const isGuestParam = searchParams.get("guest") === "true"
  const { guestData } = useGuest()
  const { user, isLoading } = useAuth()
  const [authenticatedAssets] = useState<any[]>([])
  const [authenticatedGoals] = useState<any[]>([])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const isGuest = isGuestParam && !user
  const assets = isGuest ? guestData.assets : authenticatedAssets
  const goals = isGuest ? guestData.goals : authenticatedGoals
  const totalValue = assets.reduce(
    (sum, asset) => sum + (parseFloat(asset.totalValue || "0")),
    0
  )
  const userName = user?.name || "Investor"

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 dark:bg-slate-950">
      {isGuest && <GuestBanner />}

      {/* Header */}
      <header className={`border-b border-slate-700 bg-slate-800/50 backdrop-blur`}>
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NX</span>
              </div>
              <span className="font-bold text-xl text-white">NEXUS</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard?guest=true" className="text-emerald-400 font-medium">
                Dashboard
              </Link>
              <Link href={isGuest ? "/portfolio?guest=true" : "/portfolio"} className="text-slate-300 hover:text-white transition">
                Portfolio
              </Link>
              <Link href={isGuest ? "/goals?guest=true" : "/goals"} className="text-slate-300 hover:text-white transition">
                Goals
              </Link>
              <Link href={isGuest ? "/simulator?guest=true" : "/simulator"} className="text-slate-300 hover:text-white transition">
                What-If
              </Link>
              <Link href={isGuest ? "/insights?guest=true" : "/insights"} className="text-slate-300 hover:text-white transition">
                Insights
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            {isGuest ? (
              <>
                <Link href="/sign-in" className="text-slate-300 hover:text-white transition">
                  Sign In
                </Link>
                <Link href="/sign-up" className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition font-medium">
                  Get Started
                </Link>
              </>
            ) : (
              <button className="text-slate-300 hover:text-white transition">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 mx-auto max-w-7xl px-6 w-full ${isGuest ? "py-8" : "py-12"}`}>
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            {isGuest ? "Welcome to NEXUS" : `Welcome back, ${userName}`}
          </h1>
          <p className="text-slate-400">
            {isGuest
              ? "Explore our demo with realistic portfolio data and personalized recommendations."
              : "Here's your financial overview and personalized recommendations."}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Portfolio Value</p>
            <p className="text-3xl font-bold text-white">
              ${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </p>
            <p className="text-sm text-emerald-400 mt-2">+2.5% this month</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Total Assets</p>
            <p className="text-3xl font-bold text-white">{assets.length}</p>
            <p className="text-sm text-slate-400 mt-2">Holdings tracked</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Active Goals</p>
            <p className="text-3xl font-bold text-white">{goals.length}</p>
            <p className="text-sm text-blue-400 mt-2">On track</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Risk Score</p>
            <p className="text-3xl font-bold text-white">{guestData.profile.riskTolerance}</p>
            <p className="text-sm text-slate-400 mt-2">Risk tolerance</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <DashboardClient assets={assets} goals={goals} isGuest={isGuest} />
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
      <DashboardContent />
    </Suspense>
  )
}
