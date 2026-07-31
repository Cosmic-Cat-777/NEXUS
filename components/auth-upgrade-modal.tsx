'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, Lock, ArrowRight, X } from 'lucide-react'

interface AuthUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature: 'save' | 'sync' | 'export' | 'profile' | 'history'
}

const featureMessages: Record<string, { title: string; description: string }> = {
  save: {
    title: 'Sign In to Save Your Portfolio',
    description: 'Create an account to securely save your financial profile, assets, and goals. Your data will be encrypted and accessible from any device.',
  },
  sync: {
    title: 'Sign In to Sync Across Devices',
    description: 'Keep your portfolio synchronized across all your devices. Access OptiFi on your phone, tablet, or desktop anytime.',
  },
  export: {
    title: 'Sign In to Export Reports',
    description: 'Generate and export comprehensive financial reports as PDF or CSV for sharing with advisors or your records.',
  },
  profile: {
    title: 'Sign In to Create Your Profile',
    description: 'Set up your personal financial profile to receive tailored recommendations based on your goals and risk tolerance.',
  },
  history: {
    title: 'Sign In to Access Your History',
    description: 'View your complete portfolio history, past decisions, and how your investments have performed over time.',
  },
}

export function AuthUpgradeModal({ isOpen, onClose, feature }: AuthUpgradeModalProps) {
  const message = featureMessages[feature]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">{message.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <div className="flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-slate-300">{message.description}</p>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-6">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">With OptiFi Plus, you get:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Secure portfolio storage
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Cross-device synchronization
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                AI-powered recommendations
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Export and reporting tools
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Complete financial history
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              href="/sign-up"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Create Free Account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-center">
              <p className="text-sm text-slate-400">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full text-slate-400 hover:text-slate-300 text-sm font-medium transition-colors"
          >
            Continue exploring as guest
          </button>
        </div>
      </div>
    </div>
  )
}
