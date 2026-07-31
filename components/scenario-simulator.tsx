'use client'

import { useState, useEffect } from 'react'

// Financial algorithm functions
const calculatePortfolioMetrics = (allocation: { [key: string]: number }) => {
  // Simplified financial calculations
  const stockWeight = allocation.stocks || 0.6
  const bondWeight = allocation.bonds || 0.3
  const cashWeight = allocation.cash || 0.1

  // Expected returns based on historical averages
  const stockReturn = 0.10 // 10% annual
  const bondReturn = 0.04 // 4% annual
  const cashReturn = 0.02 // 2% annual

  const expectedReturn = stockWeight * stockReturn + bondWeight * bondReturn + cashWeight * cashReturn

  // Risk calculation (standard deviation proxy)
  const stockRisk = 0.18 // 18% volatility
  const bondRisk = 0.05 // 5% volatility
  const cashRisk = 0.001 // 0.1% volatility

  const variance =
    stockWeight * stockWeight * stockRisk * stockRisk +
    bondWeight * bondWeight * bondRisk * bondRisk +
    cashWeight * cashWeight * cashRisk * cashRisk +
    2 * stockWeight * bondWeight * 0.2 * stockRisk * bondRisk // correlation factor

  const expectedRisk = Math.sqrt(Math.max(variance, 0))

  return {
    expectedReturn: (expectedReturn * 100).toFixed(2),
    expectedRisk: (expectedRisk * 100).toFixed(2),
    sharpeRatio: ((expectedReturn - 0.02) / expectedRisk).toFixed(2),
  }
}

const project5YearReturns = (initialValue: number, allocation: { [key: string]: number }) => {
  const metrics = calculatePortfolioMetrics(allocation)
  const annualReturn = parseFloat(metrics.expectedReturn) / 100
  const years = 5
  const projectedValue = initialValue * Math.pow(1 + annualReturn, years)
  const totalReturn = projectedValue - initialValue

  return {
    projectedValue: projectedValue.toFixed(2),
    totalReturn: totalReturn.toFixed(2),
    annualReturn: metrics.expectedReturn,
  }
}

export default function ScenarioSimulator({ assets }: any) {
  const [allocation, setAllocation] = useState({
    stocks: 60,
    bonds: 30,
    cash: 10,
  })

  const [metrics, setMetrics] = useState({
    expectedReturn: '0',
    expectedRisk: '0',
    sharpeRatio: '0',
  })

  const [projection, setProjection] = useState({
    projectedValue: '0',
    totalReturn: '0',
    annualReturn: '0',
  })

  const totalValue = assets.reduce((sum: number, asset: any) => sum + parseFloat(asset.totalValue || '0'), 0)

  useEffect(() => {
    // Calculate metrics whenever allocation changes
    const newMetrics = calculatePortfolioMetrics(allocation)
    setMetrics(newMetrics)

    // Calculate 5-year projection
    const projection5Y = project5YearReturns(totalValue || 100000, allocation)
    setProjection(projection5Y)
  }, [allocation, totalValue])

  const handleAllocationChange = (key: string, value: number) => {
    const newAllocation = { ...allocation, [key]: value }

    // Normalize so total is 100
    const total = newAllocation.stocks + newAllocation.bonds + newAllocation.cash
    if (total !== 100) {
      Object.keys(newAllocation).forEach(k => {
        newAllocation[k as keyof typeof newAllocation] = Math.round((newAllocation[k as keyof typeof newAllocation] / total) * 100)
      })
    }

    setAllocation(newAllocation)
  }

  return (
    <div className="space-y-8">
      {/* Current vs Adjusted */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Allocation */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <h2 className="text-xl font-bold text-white mb-6">Current Portfolio Value</h2>

          <div className="space-y-4 mb-8">
            <div>
              <p className="text-sm text-slate-400 mb-2">Total Portfolio</p>
              <p className="text-4xl font-bold text-emerald-400">
                ${(totalValue || 100000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">YTD Performance</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-emerald-400">+8.2%</p>
                <span className="text-sm text-slate-400">($6,720)</span>
              </div>
            </div>
          </div>

          {/* Current Allocation Chart */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-300 mb-4">Current Allocation</p>
            {[
              { name: 'Stocks', value: 60, color: 'from-emerald-400' },
              { name: 'Bonds', value: 25, color: 'from-blue-400' },
              { name: 'Cash', value: 15, color: 'from-slate-400' },
            ].map(item => (
              <div key={item.name}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${item.color} to-transparent`} style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adjusted Allocation */}
        <div className="p-6 rounded-xl bg-slate-800/50 border border-blue-500/30">
          <h2 className="text-xl font-bold text-white mb-6">Adjusted Scenario</h2>

          <div className="space-y-6">
            {Object.entries(allocation).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-300 capitalize">{key}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={e => handleAllocationChange(key, parseInt(e.target.value))}
                      className="w-32"
                    />
                    <span className="text-white font-bold w-12 text-right">{value}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-xs text-blue-300 mb-2">Total Allocation</p>
            <p className="text-2xl font-bold text-blue-400">
              {allocation.stocks + allocation.bonds + allocation.cash}%
            </p>
          </div>
        </div>
      </div>

      {/* Risk & Return Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Expected Annual Return</p>
          <p className="text-3xl font-bold text-emerald-400">{metrics.expectedReturn}%</p>
          <p className="text-xs text-slate-400 mt-2">Based on historical averages</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Expected Risk (Volatility)</p>
          <p className="text-3xl font-bold text-orange-400">{metrics.expectedRisk}%</p>
          <p className="text-xs text-slate-400 mt-2">Standard deviation</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Sharpe Ratio</p>
          <p className="text-3xl font-bold text-blue-400">{metrics.sharpeRatio}</p>
          <p className="text-xs text-slate-400 mt-2">Risk-adjusted returns</p>
        </div>
      </div>

      {/* 5-Year Projection */}
      <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30">
        <h2 className="text-2xl font-bold text-white mb-6">5-Year Projection</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-slate-400 mb-2">Current Value</p>
            <p className="text-4xl font-bold text-white">
              ${(totalValue || 100000).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">Growth</p>
              <div className="text-5xl font-bold text-emerald-400 flex items-center justify-center gap-2">
                <span>→</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400 mb-2">Projected Value (5Y)</p>
            <p className="text-4xl font-bold text-emerald-400">
              ${parseFloat(projection.projectedValue).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
            <p className="text-sm text-emerald-300 mt-2">
              +${parseFloat(projection.totalReturn).toLocaleString('en-US', { maximumFractionDigits: 0 })} ({projection.annualReturn}% annually)
            </p>
          </div>
        </div>

        {/* Growth Chart Visualization */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-sm font-semibold text-slate-300 mb-4">Projected Growth Over 5 Years</p>
          <div className="h-40 flex items-end gap-1">
            {Array.from({ length: 6 }).map((_, year) => {
              const yearValue = (totalValue || 100000) * Math.pow(1 + parseFloat(metrics.expectedReturn) / 100, year)
              const maxValue = (totalValue || 100000) * Math.pow(1 + parseFloat(metrics.expectedReturn) / 100, 5)
              const percentage = (yearValue / maxValue) * 100

              return (
                <div key={year} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-t" style={{ height: `${percentage * 1.25}px` }}></div>
                  <p className="text-xs text-slate-400 mt-2">Year {year}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
