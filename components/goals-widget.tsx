'use client'

import Link from 'next/link'

export default function GoalsWidget({ goals }: any) {
  const progressPercentage = goals.length > 0
    ? Math.round((goals.filter((g: any) => parseFloat(g.currentAmount || '0') > 0).length / goals.length) * 100)
    : 0

  return (
    <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Financial Goals</h3>
        <Link href="/goals" className="text-blue-400 hover:text-blue-300 text-sm">
          Manage
        </Link>
      </div>

      {goals.length > 0 ? (
        <div className="space-y-4">
          {goals.slice(0, 4).map((goal: any) => {
            const target = parseFloat(goal.targetAmount || '0')
            const current = parseFloat(goal.currentAmount || '0')
            const percent = target > 0 ? Math.min((current / target) * 100, 100) : 0

            return (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">{goal.name}</p>
                    <p className="text-xs text-slate-400">{goal.goalType}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-300">{Math.round(percent)}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>
            )
          })}

          {goals.length > 4 && (
            <p className="text-xs text-slate-400 pt-2">+{goals.length - 4} more goals</p>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-slate-400">
          <p className="mb-3">No goals created yet</p>
          <Link href="/goals" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm">
            Create Goal
          </Link>
        </div>
      )}
    </div>
  )
}
