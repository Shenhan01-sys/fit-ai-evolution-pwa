import { Router } from 'express'
import { db } from '../db'
import { workouts, achievements } from '../db/schema'
import { eq, and, gte, sql } from 'drizzle-orm'

const router = Router()

// POST /api/workouts/verify - Verify and save workout
router.post('/verify', async (req, res) => {
    try {
        const { walletAddress, exerciseType, reps, accuracy, duration } = req.body

        // Validation
        if (!walletAddress || !exerciseType || reps === undefined || accuracy === undefined) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        // Save workout to database
        const verified = accuracy >= 85 // 85%+ accuracy = verified

        const [workout] = await db
            .insert(workouts)
            .values({
                user_wallet: walletAddress,
                exercise_type: exerciseType,
                reps_completed: reps,
                accuracy: Math.round(accuracy),
                duration: duration || 0,
                verified
            })
            .returning()

        console.log(`✅ Workout verified: ${exerciseType} x${reps} (${accuracy}% accuracy)`)

        // Check for achievements
        const achievementEarned = await checkAchievements(walletAddress, reps, exerciseType)

        res.json({
            verified,
            workout,
            achievement: achievementEarned,
            message: verified ? 'Workout verified!' : 'Workout saved (below 85% accuracy threshold)'
        })
    } catch (error) {
        console.error('Error verifying workout:', error)
        res.status(500).json({ error: 'Failed to verify workout' })
    }
})

// GET /api/workouts/history/:walletAddress - Get workout history
router.get('/history/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params
        const limit = parseInt(req.query.limit as string) || 20

        const workoutHistory = await db
            .select()
            .from(workouts)
            .where(eq(workouts.user_wallet, walletAddress))
            .orderBy(sql`${workouts.created_at} DESC`)
            .limit(limit)

        // Calculate stats
        const totalWorkouts = workoutHistory.length
        const totalReps = workoutHistory.reduce((sum, w) => sum + w.reps_completed, 0)
        const avgAccuracy = totalWorkouts > 0
            ? Math.round(workoutHistory.reduce((sum, w) => sum + w.accuracy, 0) / totalWorkouts)
            : 0

        res.json({
            workouts: workoutHistory,
            stats: {
                totalWorkouts,
                totalReps,
                avgAccuracy
            }
        })
    } catch (error) {
        console.error('Error fetching workout history:', error)
        res.status(500).json({ error: 'Failed to fetch workout history' })
    }
})

// Helper: Check if user earned an achievement
async function checkAchievements(walletAddress: string, reps: number, exerciseType: string) {
    try {
        // Get user's total verified reps
        const result = await db
            .select({
                totalReps: sql<number>`CAST(SUM(${workouts.reps_completed}) AS INTEGER)`
            })
            .from(workouts)
            .where(and(
                eq(workouts.user_wallet, walletAddress),
                eq(workouts.verified, true)
            ))

        const totalReps = result[0]?.totalReps || 0

        let badgeType: string | null = null
        let rarity: string = 'common'

        // Achievement logic
        if (totalReps === 1) {
            badgeType = 'first_step'
            rarity = 'common'
        } else if (totalReps === 100) {
            badgeType = 'hundred_club'
            rarity = 'epic'
        } else if (totalReps >= 50 && totalReps < 100) {
            // Check weekly streak (simplified)
            const weekAgo = new Date()
            weekAgo.setDate(weekAgo.getDate() - 7)

            const weeklyWorkouts = await db
                .select()
                .from(workouts)
                .where(and(
                    eq(workouts.user_wallet, walletAddress),
                    gte(workouts.created_at, weekAgo)
                ))

            if (weeklyWorkouts.length >= 7) {
                badgeType = 'week_warrior'
                rarity = 'rare'
            }
        }

        // Trigger NFT mint if achievement earned
        if (badgeType) {
            console.log(`🏆 Achievement earned: ${badgeType} (${rarity})`)

            // Call NFT minting endpoint
            // In production, this would be an async queue job
            await fetch('http://localhost:3001/api/nft/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress, badgeType, rarity })
            })

            return { badgeType, rarity }
        }

        return null
    } catch (error) {
        console.error('Error checking achievements:', error)
        return null
    }
}

export default router
