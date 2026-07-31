'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface GuestAsset {
  id: string
  name: string
  type: 'stock' | 'bond' | 'etf' | 'crypto' | 'cash' | 'real_estate' | 'other'
  symbol: string
  quantity: number
  currentPrice: number
  totalValue: number
  allocation: number
}

export interface GuestGoal {
  id: string
  name: string
  description: string
  goalType: 'retirement' | 'education' | 'home' | 'vacation' | 'emergency_fund' | 'other'
  targetAmount: number
  currentAmount: number
  targetDate: string
  priority: 'low' | 'medium' | 'high'
  progress: number
}

export interface GuestProfile {
  age: number
  income: number
  riskTolerance: 'conservative' | 'moderate' | 'aggressive'
  investmentHorizon: number
  totalAssets: number
}

export interface GuestData {
  profile: GuestProfile
  assets: GuestAsset[]
  goals: GuestGoal[]
}

interface GuestContextType {
  isGuest: boolean
  guestData: GuestData
  updateGuestAssets: (assets: GuestAsset[]) => void
  updateGuestGoals: (goals: GuestGoal[]) => void
  updateGuestProfile: (profile: GuestProfile) => void
  clearGuestMode: () => void
}

const GuestContext = createContext<GuestContextType | undefined>(undefined)

// Realistic demo data
const DEMO_DATA: GuestData = {
  profile: {
    age: 35,
    income: 95000,
    riskTolerance: 'moderate',
    investmentHorizon: 25,
    totalAssets: 185500,
  },
  assets: [
    {
      id: '1',
      name: 'VOO - Vanguard S&P 500 ETF',
      type: 'etf',
      symbol: 'VOO',
      quantity: 42,
      currentPrice: 425.50,
      totalValue: 17871,
      allocation: 40,
    },
    {
      id: '2',
      name: 'BND - Vanguard Bond ETF',
      type: 'bond',
      symbol: 'BND',
      quantity: 55,
      currentPrice: 75.30,
      totalValue: 4141.50,
      allocation: 10,
    },
    {
      id: '3',
      name: 'Apple Inc.',
      type: 'stock',
      symbol: 'AAPL',
      quantity: 28,
      currentPrice: 195.75,
      totalValue: 5481,
      allocation: 15,
    },
    {
      id: '4',
      name: 'Bitcoin',
      type: 'crypto',
      symbol: 'BTC',
      quantity: 0.35,
      currentPrice: 42500,
      totalValue: 14875,
      allocation: 8,
    },
    {
      id: '5',
      name: 'Savings Account',
      type: 'cash',
      symbol: 'CASH',
      quantity: 1,
      currentPrice: 142990.50,
      totalValue: 142990.50,
      allocation: 27,
    },
  ],
  goals: [
    {
      id: '1',
      name: 'Retirement',
      description: 'Build a secure retirement fund',
      goalType: 'retirement',
      targetAmount: 1000000,
      currentAmount: 185500,
      targetDate: '2050-12-31',
      priority: 'high',
      progress: 18.55,
    },
    {
      id: '2',
      name: 'Home Down Payment',
      description: 'Save for a down payment on a home',
      goalType: 'home',
      targetAmount: 150000,
      currentAmount: 65000,
      targetDate: '2027-12-31',
      priority: 'high',
      progress: 43.33,
    },
    {
      id: '3',
      name: 'Emergency Fund',
      description: '6 months of living expenses',
      goalType: 'emergency_fund',
      targetAmount: 35000,
      currentAmount: 32500,
      targetDate: '2025-12-31',
      priority: 'medium',
      progress: 92.86,
    },
  ],
}

export function GuestProvider({ children }: { children: ReactNode }) {
  const [isGuest, setIsGuest] = useState(false)
  const [guestData, setGuestData] = useState<GuestData>(DEMO_DATA)

  const updateGuestAssets = (assets: GuestAsset[]) => {
    setGuestData((prev) => ({ ...prev, assets }))
  }

  const updateGuestGoals = (goals: GuestGoal[]) => {
    setGuestData((prev) => ({ ...prev, goals }))
  }

  const updateGuestProfile = (profile: GuestProfile) => {
    setGuestData((prev) => ({ ...prev, profile }))
  }

  const clearGuestMode = () => {
    setIsGuest(false)
    setGuestData(DEMO_DATA)
  }

  const toggleGuestMode = (enabled: boolean) => {
    setIsGuest(enabled)
    if (enabled) {
      setGuestData(DEMO_DATA)
    }
  }

  return (
    <GuestContext.Provider
      value={{
        isGuest,
        guestData,
        updateGuestAssets,
        updateGuestGoals,
        updateGuestProfile,
        clearGuestMode,
      }}
    >
      {/* Store toggleGuestMode in window for auth flow */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            guestToggle: toggleGuestMode,
          } as any)
        }
        return child
      })}
      {children}
    </GuestContext.Provider>
  )
}

export function useGuest() {
  const context = useContext(GuestContext)
  if (!context) {
    throw new Error('useGuest must be used within a GuestProvider')
  }
  return context
}
