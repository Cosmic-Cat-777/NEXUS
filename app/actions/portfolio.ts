'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { assets, userProfiles, financialGoals, scenarios, recommendations } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

// User Profile Actions
export async function getUserProfile() {
  const userId = await getUserId()
  const profile = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1)
  return profile[0] || null
}

export async function updateUserProfile(data: {
  age?: number
  income?: string
  riskTolerance?: string
  investmentHorizon?: number
}) {
  const userId = await getUserId()
  const existing = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId)).limit(1)

  if (existing.length > 0) {
    await db.update(userProfiles).set(data).where(eq(userProfiles.userId, userId))
  } else {
    await db.insert(userProfiles).values({
      id: `profile_${userId}_${Date.now()}`,
      userId,
      ...data,
    })
  }
  revalidatePath('/dashboard')
}

// Asset Actions
export async function getAssets() {
  const userId = await getUserId()
  return db.select().from(assets).where(eq(assets.userId, userId)).orderBy(desc(assets.updatedAt))
}

export async function addAsset(data: {
  name: string
  type: string
  symbol?: string
  quantity: string
  currentPrice: string
  totalValue?: string
  allocation?: string
}) {
  const userId = await getUserId()
  const assetId = `asset_${userId}_${Date.now()}`
  
  await db.insert(assets).values({
    id: assetId,
    userId,
    ...data,
  })
  revalidatePath('/dashboard')
  return assetId
}

export async function updateAsset(assetId: string, data: Partial<typeof assets.$inferInsert>) {
  const userId = await getUserId()
  await db.update(assets).set(data).where(and(eq(assets.id, assetId), eq(assets.userId, userId)))
  revalidatePath('/dashboard')
}

export async function deleteAsset(assetId: string) {
  const userId = await getUserId()
  await db.delete(assets).where(and(eq(assets.id, assetId), eq(assets.userId, userId)))
  revalidatePath('/dashboard')
}

// Financial Goals Actions
export async function getGoals() {
  const userId = await getUserId()
  return db.select().from(financialGoals).where(eq(financialGoals.userId, userId)).orderBy(desc(financialGoals.createdAt))
}

export async function addGoal(data: {
  name: string
  description?: string
  goalType: string
  targetAmount?: string
  currentAmount?: string
  targetDate?: Date
  priority?: string
}) {
  const userId = await getUserId()
  const goalId = `goal_${userId}_${Date.now()}`
  
  await db.insert(financialGoals).values({
    id: goalId,
    userId,
    ...data,
  })
  revalidatePath('/dashboard')
  return goalId
}

export async function updateGoal(goalId: string, data: Partial<typeof financialGoals.$inferInsert>) {
  const userId = await getUserId()
  await db.update(financialGoals).set(data).where(and(eq(financialGoals.id, goalId), eq(financialGoals.userId, userId)))
  revalidatePath('/dashboard')
}

// Scenario Actions
export async function getScenarios() {
  const userId = await getUserId()
  return db.select().from(scenarios).where(eq(scenarios.userId, userId)).orderBy(desc(scenarios.updatedAt))
}

export async function createScenario(data: {
  name: string
  description?: string
  baselineAllocation?: any
  adjustedAllocation?: any
  projectedReturn?: string
  projectedRisk?: string
}) {
  const userId = await getUserId()
  const scenarioId = `scenario_${userId}_${Date.now()}`
  
  await db.insert(scenarios).values({
    id: scenarioId,
    userId,
    ...data,
  })
  revalidatePath('/dashboard')
  return scenarioId
}

// Recommendations Actions
export async function getRecommendations() {
  const userId = await getUserId()
  return db.select().from(recommendations).where(eq(recommendations.userId, userId)).orderBy(desc(recommendations.createdAt))
}

export async function markRecommendationAsRead(recommendationId: string) {
  const userId = await getUserId()
  await db.update(recommendations).set({ isRead: true }).where(and(eq(recommendations.id, recommendationId), eq(recommendations.userId, userId)))
  revalidatePath('/dashboard')
}

export async function createRecommendation(data: {
  type: string
  title: string
  description?: string
  impact?: any
  reasoning?: string
  priority?: string
}) {
  const userId = await getUserId()
  const recommendationId = `rec_${userId}_${Date.now()}`
  
  await db.insert(recommendations).values({
    id: recommendationId,
    userId,
    isRead: false,
    ...data,
  })
  revalidatePath('/dashboard')
  return recommendationId
}
