'use client'

import { useState, FormEvent } from 'react'
import { addAsset } from '@/app/actions/portfolio'
import { useRouter } from 'next/navigation'

interface AddAssetModalProps {
  onClose: () => void
}

export default function AddAssetModal({ onClose }: AddAssetModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'stock',
    symbol: '',
    quantity: '',
    currentPrice: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const totalValue = (parseFloat(formData.quantity) * parseFloat(formData.currentPrice)).toString()
      await addAsset({
        name: formData.name,
        type: formData.type,
        symbol: formData.symbol,
        quantity: formData.quantity,
        currentPrice: formData.currentPrice,
        totalValue,
      })
      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error adding asset:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6">Add Asset</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Asset Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Apple Stock"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Asset Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-violet-500"
            >
              <option value="stock">Stock</option>
              <option value="bond">Bond</option>
              <option value="etf">ETF</option>
              <option value="crypto">Crypto</option>
              <option value="cash">Cash</option>
              <option value="real_estate">Real Estate</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              placeholder="e.g., AAPL"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                step="0.00000001"
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Price per Unit</label>
              <input
                type="number"
                name="currentPrice"
                value={formData.currentPrice}
                onChange={handleChange}
                required
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {formData.quantity && formData.currentPrice && (
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <p className="text-sm text-slate-400">Total Value</p>
              <p className="text-lg font-bold text-emerald-400">
                ${(parseFloat(formData.quantity) * parseFloat(formData.currentPrice)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-600 hover:border-slate-400 text-white rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-600 text-white rounded-lg transition font-medium"
            >
              {loading ? 'Adding...' : 'Add Asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
