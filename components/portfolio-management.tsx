'use client'

import { useState } from 'react'
import { deleteAsset, updateAsset } from '@/app/actions/portfolio'
import { useRouter } from 'next/navigation'
import AddAssetModal from './add-asset-modal'

export default function PortfolioManagement({ assets }: any) {
  const router = useRouter()
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const total = assets.reduce((sum: number, asset: any) => sum + parseFloat(asset.totalValue || '0'), 0)

  const handleDelete = async (assetId: string) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return

    setLoading(true)
    try {
      await deleteAsset(assetId)
      router.refresh()
    } catch (error) {
      console.error('Error deleting asset:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Holdings</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition font-medium"
        >
          Add Asset
        </button>
      </div>

      {assets.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-slate-700">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-slate-300">Asset</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-300">Type</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-300">Quantity</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-300">Price</th>
                <th className="text-right px-6 py-4 font-semibold text-slate-300">Value</th>
                <th className="text-center px-6 py-4 font-semibold text-slate-300">Allocation</th>
                <th className="text-center px-6 py-4 font-semibold text-slate-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {assets.map((asset: any) => {
                const value = parseFloat(asset.totalValue || '0')
                const alloc = total > 0 ? ((value / total) * 100).toFixed(1) : '0'

                return (
                  <tr key={asset.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{asset.name}</p>
                        {asset.symbol && <p className="text-sm text-slate-400">{asset.symbol}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-300 capitalize">{asset.type}</td>
                    <td className="px-6 py-4 text-right text-slate-300">{parseFloat(asset.quantity || '0').toFixed(8)}</td>
                    <td className="px-6 py-4 text-right text-slate-300">${parseFloat(asset.currentPrice || '0').toFixed(2)}</td>
                    <td className="px-6 py-4 text-right font-semibold text-white">${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500"
                            style={{ width: `${alloc}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-300 w-10 text-right">{alloc}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleDelete(asset.id)}
                        disabled={loading}
                        className="px-3 py-1 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded transition disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-slate-700 bg-slate-800/30">
          <p className="text-slate-400 mb-6">No assets in your portfolio yet</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-block px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition font-medium"
          >
            Add Your First Asset
          </button>
        </div>
      )}

      {showAddModal && <AddAssetModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}
