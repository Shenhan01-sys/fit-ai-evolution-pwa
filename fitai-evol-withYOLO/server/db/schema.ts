import { sqliteTable, text, integer, blob } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// Users table - stores onboarding data
export const users = sqliteTable('users', {
    wallet_address: text('wallet_address').primaryKey(),
    email: text('email'),
    name: text('name'),
    age: integer('age'),
    gender: text('gender'),
    height: integer('height'),
    weight: integer('weight'),
    body_fat_percentage: integer('body_fat_percentage'),
    muscle_mass: integer('muscle_mass'),
    medical_history: text('medical_history'), // JSON string
    goals: text('goals'), // JSON string
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
})

// Workouts table - verification history
export const workouts = sqliteTable('workouts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_wallet: text('user_wallet').references(() => users.wallet_address),
    exercise_type: text('exercise_type').notNull(),
    reps_completed: integer('reps_completed').notNull(),
    accuracy: integer('accuracy').notNull(), // 0-100
    duration: integer('duration').notNull(), // seconds
    verified: integer('verified', { mode: 'boolean' }).default(false),
    created_at: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
})

// Achievements table - NFT tracking
export const achievements = sqliteTable('achievements', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    user_wallet: text('user_wallet').references(() => users.wallet_address),
    badge_type: text('badge_type').notNull(),
    rarity: text('rarity').notNull(),
    tx_hash: text('tx_hash'),
    token_id: integer('token_id'),
    minted_at: integer('minted_at', { mode: 'timestamp' }).default(sql`(unixepoch())`)
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Workout = typeof workouts.$inferSelect
export type NewWorkout = typeof workouts.$inferInsert
export type Achievement = typeof achievements.$inferSelect
export type NewAchievement = typeof achievements.$inferInsert
