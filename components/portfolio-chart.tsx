'use client'

export default function PortfolioChart({ assets }: any) {
  const total = assets.reduce((sum: number, asset: any) => sum + parseFloat(asset.totalValue || '0'), 0)
  const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4', '#6366f1']

  return (
    <div className="space-y-4">
      {/* Pie Chart Placeholder */}
      <div className="flex items-center justify-center py-8">
        <div className="relative w-48 h-48 rounded-full bg-gradient-conic from-emerald-400 via-blue-500 to-emerald-400 p-1">
          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{assets.length}</p>
              <p className="text-sm text-slate-400">Holdings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Breakdown */}
      <div className="space-y-2">
        {assets.length > 0 ? (
          assets.map((asset: any, index: number) => {
            const percentage = total > 0 ? ((parseFloat(asset.totalValue || '0') / total) * 100).toFixed(1) : '0'
            return (
              <div key={asset.id} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-white">{asset.name}</p>
                    <p className="text-sm text-slate-400">{percentage}%</p>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: colors[index % colors.length],
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <p className="text-center text-slate-400 py-4">Add assets to see allocation</p>
        )}
      </div>
    </div>
  )
}
