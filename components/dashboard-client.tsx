'use client'

import { useState } from 'react'
import Link from 'next/link'
import PortfolioChart from './portfolio-chart'
import AddAssetModal from './add-asset-modal'
import GoalsWidget from './goals-widget'
import { AuthUpgradeModal } from './auth-upgrade-modal'

export default function DashboardClient({ assets, goals, isGuest }: any) {
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [showAuthUpgrade, setShowAuthUpgrade] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState<'save' | 'sync' | 'export' | 'profile' | 'history'>('save')

  const handleProtectedAction = (feature: 'save' | 'sync' | 'export' | 'profile' | 'history') => {
    if (isGuest) {
      setUpgradeFeature(feature)
      setShowAuthUpgrade(true)
    }
  }

  const handleAddAsset = () => {
    if (isGuest) {
      handleProtectedAction('save')
    } else {
      setShowAddAsset(true)
    }
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Portfolio Allocation</h2>
              <Link href="/portfolio" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                View Details →
              </Link>
            </div>
            <PortfolioChart assets={assets} />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">Diversification Score</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
              </div>
              <p className="text-sm font-bold text-white">75%</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-1">YTD Return</p>
            <p className="text-2xl font-bold text-emerald-400">+8.2%</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-sm text-slate-400 mb-3">Quick Actions</p>
            <button
              onClick={handleAddAsset}
              className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition font-medium text-sm mb-2"
            >
              {isGuest ? 'Add Asset (Demo)' : 'Add Asset'}
            </button>
            <Link href={isGuest ? '/simulator?guest=true' : '/simulator'} className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm text-center">
              What-If Analysis
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Assets & Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Assets */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Holdings</h3>
            <Link href="/portfolio" className="text-emerald-400 hover:text-emerald-300 text-sm">
              View all
            </Link>
          </div>

          {assets.length > 0 ? (
            <div className="space-y-3">
              {assets.slice(0, 5).map((asset: any) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
                  <div>
                    <p className="font-semibold text-white">{asset.name}</p>
                    <p className="text-sm text-slate-400">{asset.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">${parseFloat(asset.totalValue || '0').toLocaleString()}</p>
                    <p className="text-sm text-emerald-400">{asset.allocation}%</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="mb-4">No assets added yet</p>
              <button onClick={() => setShowAddAsset(true)} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition font-medium text-sm">
                Add Your First Asset
              </button>
            </div>
          )}
        </div>

        {/* Goals Widget */}
        <GoalsWidget goals={goals} />
      </div>

      {/* Add Asset Modal */}
      {showAddAsset && <AddAssetModal onClose={() => setShowAddAsset(false)} />}

      {/* Auth Upgrade Modal */}
      <AuthUpgradeModal
        isOpen={showAuthUpgrade}
        onClose={() => setShowAuthUpgrade(false)}
        feature={upgradeFeature}
      />
    </div>
  )
}
