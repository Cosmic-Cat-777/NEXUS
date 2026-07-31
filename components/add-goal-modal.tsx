'use client'

import { useState, FormEvent } from 'react'
import { addGoal } from '@/app/actions/portfolio'
import { useRouter } from 'next/navigation'

interface AddGoalModalProps {
  onClose: () => void
}

export default function AddGoalModal({ onClose }: AddGoalModalProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goalType: 'retirement',
    targetAmount: '',
    currentAmount: '0',
    targetDate: '',
    priority: 'medium',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addGoal({
        name: formData.name,
        description: formData.description || undefined,
        goalType: formData.goalType,
        targetAmount: formData.targetAmount,
        currentAmount: formData.currentAmount,
        targetDate: formData.targetDate ? new Date(formData.targetDate) : undefined,
        priority: formData.priority,
      })
      router.refresh()
      onClose()
    } catch (error) {
      console.error('Error adding goal:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-8 max-w-md w-full mx-4 border border-slate-700 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Create Goal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Goal Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Retirement Fund"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="What is this goal for?"
              rows={2}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Goal Type</label>
            <select
              name="goalType"
              value={formData.goalType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="retirement">Retirement</option>
              <option value="education">Education</option>
              <option value="home">Home Purchase</option>
              <option value="vacation">Vacation</option>
              <option value="emergency_fund">Emergency Fund</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Amount</label>
              <input
                type="number"
                name="targetAmount"
                value={formData.targetAmount}
                onChange={handleChange}
                required
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Current Amount</label>
              <input
                type="number"
                name="currentAmount"
                value={formData.currentAmount}
                onChange={handleChange}
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Date</label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

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
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg transition font-medium"
            >
              {loading ? 'Creating...' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
