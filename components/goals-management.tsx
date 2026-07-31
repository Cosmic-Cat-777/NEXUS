'use client'

import { useState } from 'react'
import { addGoal, updateGoal } from '@/app/actions/portfolio'
import { useRouter } from 'next/navigation'
import AddGoalModal from './add-goal-modal'

export default function GoalsManagement({ goals }: any) {
  const router = useRouter()
  const [showAddModal, setShowAddModal] = useState(false)

  const handleUpdateProgress = async (goalId: string, newAmount: string) => {
    try {
      await updateGoal(goalId, { currentAmount: newAmount })
      router.refresh()
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Goals</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
        >
          Create Goal
        </button>
      </div>

      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.map((goal: any) => {
            const target = parseFloat(goal.targetAmount || '0')
            const current = parseFloat(goal.currentAmount || '0')
            const percent = target > 0 ? Math.min((current / target) * 100, 100) : 0
            const remaining = Math.max(target - current, 0)

            return (
              <div key={goal.id} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{goal.name}</h3>
                    <p className="text-sm text-slate-400 capitalize">{goal.goalType}</p>
                    {goal.description && <p className="text-sm text-slate-400 mt-1">{goal.description}</p>}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{Math.round(percent)}%</p>
                    <p className="text-sm text-slate-400">Complete</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold">${current.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      <span className="text-slate-400"> / ${target.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                    </p>
                    <p className="text-sm text-emerald-400">
                      ${remaining.toLocaleString('en-US', { maximumFractionDigits: 0 })} to go
                    </p>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Target Date */}
                {goal.targetDate && (
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                  </div>
                )}

                {/* Priority Badge */}
                <div className="flex items-center gap-3">
                  {goal.priority && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      goal.priority === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : goal.priority === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {goal.priority} Priority
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border border-slate-700 bg-slate-800/30">
          <p className="text-slate-400 mb-6">No goals created yet. Start planning your financial future!</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Create Your First Goal
          </button>
        </div>
      )}

      {showAddModal && <AddGoalModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}
