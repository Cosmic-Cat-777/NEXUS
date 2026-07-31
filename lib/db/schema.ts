import { pgTable, text, timestamp, boolean, numeric, integer, jsonb } from 'drizzle-orm/pg-core'

// --- Better Auth required tables -------------------------------------------
// Column names are camelCase to match Better Auth's defaults. Do not rename.

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

// --- App tables ------------------------------------------------------------
// Add your app tables below. Always include a plain `userId` column so queries
// can be scoped per user — the security model depends on this column existing,
// not on a foreign key. Do NOT add a foreign key constraint
// (`.references(() => user.id, ...)`) unless the user explicitly asks for
// foreign keys or referential integrity; FK constraints make iterating on the
// schema harder.
//
// Example:
//
// import { serial } from "drizzle-orm/pg-core"
//
// export const todos = pgTable("todos", {
//   id: serial("id").primaryKey(),
//   userId: text("userId").notNull(),
//   title: text("title").notNull(),
//   completed: boolean("completed").notNull().default(false),
//   createdAt: timestamp("createdAt").notNull().defaultNow(),
// })
//
// If the user asks for foreign keys, add the reference back in:
//   userId: text("userId")
//     .notNull()
//     .references(() => user.id, { onDelete: "cascade" }),

// OptiFi app tables
export const userProfiles = pgTable('user_profiles', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  age: integer('age'),
  income: numeric('income', { precision: 15, scale: 2 }),
  riskTolerance: text('riskTolerance'),
  investmentHorizon: integer('investmentHorizon'),
  totalAssets: numeric('totalAssets', { precision: 15, scale: 2 }).default('0'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const assets = pgTable('assets', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  symbol: text('symbol'),
  quantity: numeric('quantity', { precision: 15, scale: 8 }),
  currentPrice: numeric('currentPrice', { precision: 15, scale: 2 }),
  totalValue: numeric('totalValue', { precision: 15, scale: 2 }),
  allocation: numeric('allocation', { precision: 5, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const financialGoals = pgTable('financial_goals', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  goalType: text('goalType').notNull(),
  targetAmount: numeric('targetAmount', { precision: 15, scale: 2 }),
  currentAmount: numeric('currentAmount', { precision: 15, scale: 2 }),
  targetDate: timestamp('targetDate'),
  priority: text('priority'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const scenarios = pgTable('scenarios', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  baselineAllocation: jsonb('baselineAllocation'),
  adjustedAllocation: jsonb('adjustedAllocation'),
  projectedReturn: numeric('projectedReturn', { precision: 10, scale: 2 }),
  projectedRisk: numeric('projectedRisk', { precision: 10, scale: 2 }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const recommendations = pgTable('recommendations', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  type: text('type').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  impact: jsonb('impact'),
  reasoning: text('reasoning'),
  priority: text('priority'),
  isRead: boolean('isRead').default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})
