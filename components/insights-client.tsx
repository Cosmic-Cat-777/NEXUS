'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthUpgradeModal } from './auth-upgrade-modal'

export default function InsightsClient({ assets, goals, initialRecommendations, isGuest }: any) {
  const router = useRouter()
  const [recommendations, setRecommendations] = useState(initialRecommendations || [])
  const [loading, setLoading] = useState(false)
  const [aiSummary, setAiSummary] = useState('')
  const [generateInProgress, setGenerateInProgress] = useState(false)
  const [showAuthUpgrade, setShowAuthUpgrade] = useState(false)

  const handleMarkAsRead = async (recId: string) => {
    if (isGuest) {
      setShowAuthUpgrade(true)
      return
    }
    // Original mark as read logic for authenticated users
  }

  const totalValue = assets.reduce((sum: number, asset: any) => sum + parseFloat(asset.totalValue || '0'), 0)
  const readCount = recommendations.filter((r: any) => r.isRead).length

  // Generate AI recommendations on mount or when data changes
  useEffect(() => {
    generateRecommendations()
  }, [assets.length])

  const generateRecommendations = async () => {
    setGenerateInProgress(true)
    try {
      // Generate algorithm-based recommendations
      const newRecs = []

      // Check diversification
      if (assets.length > 0) {
        const hasStocks = assets.some((a: any) => a.type === 'stock')
        const hasBonds = assets.some((a: any) => a.type === 'bond')
        const hasCash = assets.some((a: any) => a.type === 'cash')

        if (!hasBonds && totalValue > 10000) {
          newRecs.push({
            type: 'allocation',
            title: 'Add Bond Allocation',
            description: 'Your portfolio is missing bonds. Consider adding 20-30% bonds for better risk management.',
            priority: 'high',
            reasoning:
              'Bonds provide stability and income, helping reduce portfolio volatility during market downturns.',
          })
        }

        if (assets.length < 5) {
          newRecs.push({
            type: 'allocation',
            title: 'Increase Diversification',
            description: 'You only have ' + assets.length + ' holdings. Aim for 8-12 different assets to reduce risk.',
            priority: 'medium',
            reasoning:
              'A well-diversified portfolio spreads risk across different sectors and asset classes, improving long-term returns.',
          })
        }
      }

      // Check goal progress
      if (goals.length > 0) {
        const slowGoals = goals.filter((g: any) => {
          const target = parseFloat(g.targetAmount || '0')
          const current = parseFloat(g.currentAmount || '0')
          const percent = target > 0 ? (current / target) * 100 : 0
          return percent < 25 && percent > 0
        })

        if (slowGoals.length > 0) {
          newRecs.push({
            type: 'goal_progress',
            title: 'Accelerate Goal Savings',
            description: `${slowGoals.length} of your goals are progressing slowly. Consider increasing contributions.`,
            priority: 'medium',
            reasoning: 'Increasing savings early can help you reach your goals faster due to compound returns.',
          })
        }
      }

      // Rebalancing recommendation
      if (assets.length > 2) {
        const topAsset = assets.reduce((max: any, a: any) => {
          const maxVal = parseFloat(max.totalValue || '0')
          const aVal = parseFloat(a.totalValue || '0')
          return aVal > maxVal ? a : max
        })

        const topPercent = (parseFloat(topAsset.totalValue || '0') / totalValue) * 100
        if (topPercent > 40) {
          newRecs.push({
            type: 'rebalance',
            title: 'Rebalance Portfolio',
            description: `${topAsset.name} represents ${topPercent.toFixed(1)}% of your portfolio. Consider rebalancing.`,
            priority: 'medium',
            reasoning: 'Portfolio rebalancing helps maintain your target asset allocation and manage risk.',
          })
        }
      }

      setRecommendations(newRecs)

      // Generate AI summary via streaming
      try {
        const response = await fetch('/api/insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assets: assets.slice(0, 5),
            goals: goals.slice(0, 3),
            totalValue,
            recommendations: newRecs.slice(0, 3),
          }),
        })

        if (response.ok && response.body) {
          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          let summary = ''

          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            summary += decoder.decode(value)
            setAiSummary(summary)
          }
        }
      } catch (error) {
        console.error('Error generating AI summary:', error)
        setAiSummary(
          'Here are algorithmic insights for your portfolio based on diversification, goal progress, and rebalancing analysis.'
        )
      }
    } finally {
      setGenerateInProgress(false)
    }
  }



  return (
    <div className="space-y-8">
      {/* AI Summary */}
      <div className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30">
        <div className="flex items-start gap-3 mb-4">
          <div className="text-3xl">🤖</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">AI Portfolio Summary</h2>
            <p className="text-slate-300 leading-relaxed">
              {generateInProgress ? (
                <span className="inline-flex items-center gap-2">
                  <span className="animate-pulse">Analyzing your portfolio...</span>
                </span>
              ) : aiSummary ? (
                aiSummary
              ) : (
                'Your portfolio analysis will appear here.'
              )}
            </p>
          </div>
        </div>
        <button
          onClick={generateRecommendations}
          disabled={generateInProgress}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white rounded-lg transition font-medium text-sm"
        >
          {generateInProgress ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Personalized Recommendations</h2>
          <span className="text-sm text-slate-400">
            {readCount} of {recommendations.length} viewed
          </span>
        </div>

        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec: any) => {
              const priorityColor =
                rec.priority === 'high'
                  ? 'border-red-500/50 bg-red-500/10'
                  : rec.priority === 'medium'
                    ? 'border-yellow-500/50 bg-yellow-500/10'
                    : 'border-blue-500/50 bg-blue-500/10'

              const priorityBg =
                rec.priority === 'high'
                  ? 'bg-red-500/20 text-red-400'
                  : rec.priority === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-blue-500/20 text-blue-400'

              return (
                <div
                  key={rec.id}
                  className={`p-6 rounded-xl border transition cursor-pointer ${
                    rec.isRead ? 'border-slate-700 bg-slate-800/30' : `${priorityColor}`
                  }`}
                  onClick={() => !rec.isRead && handleMarkAsRead(rec.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">
                      {rec.type === 'allocation'
                        ? '📊'
                        : rec.type === 'goal_progress'
                          ? '🎯'
                          : rec.type === 'rebalance'
                            ? '⚖️'
                            : rec.type === 'tax_loss'
                              ? '📉'
                              : '💡'}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white">{rec.title}</h3>
                        {!rec.isRead && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        )}
                      </div>
                      <p className="text-slate-300 mb-3">{rec.description}</p>

                      {rec.reasoning && (
                        <p className="text-sm text-slate-400 italic mb-3">
                          <strong>Why:</strong> {rec.reasoning}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${priorityBg}`}>
                          {rec.priority} Priority
                        </span>
                        {!rec.isRead && (
                          <button className="text-sm text-emerald-400 hover:text-emerald-300 transition">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12 rounded-xl border border-slate-700 bg-slate-800/30">
            <p className="text-slate-400 mb-4">No recommendations yet</p>
            <p className="text-sm text-slate-500">Add more assets to your portfolio to get personalized recommendations</p>
          </div>
        )}
      </div>

      {/* Portfolio Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Diversification Score</p>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-white">
              {Math.min(assets.length * 15, 100)}%
            </p>
            <div className="flex-1 h-12 flex items-end gap-1">
              {Array.from({ length: Math.min(assets.length, 8) }).map((_, i) => (
                <div key={i} className="flex-1 h-8 bg-emerald-500/30 rounded-t"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Portfolio Size</p>
          <p className="text-3xl font-bold text-white">
            ${(totalValue / 1000).toFixed(1)}K
          </p>
          <p className="text-sm text-slate-400 mt-2">{assets.length} assets tracked</p>
        </div>

        <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
          <p className="text-sm text-slate-400 mb-2">Goal Progress</p>
          <p className="text-3xl font-bold text-blue-400">
            {goals.length > 0
              ? Math.round(
                  (goals.filter((g: any) => parseFloat(g.currentAmount || '0') > 0).length / goals.length) * 100
                )
              : 0}%
          </p>
          <p className="text-sm text-slate-400 mt-2">{goals.length} goals</p>
        </div>
      </div>

      {/* Auth Upgrade Modal for Guest Mode */}
      <AuthUpgradeModal
        isOpen={showAuthUpgrade}
        onClose={() => setShowAuthUpgrade(false)}
        feature="profile"
      />
    </div>
  )
}
