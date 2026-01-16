import { Router } from 'express'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

const router = Router()

// POST /api/auth/profile - Save user onboarding data
router.post('/profile', async (req, res) => {
    try {
        const {
            walletAddress,
            email,
            name,
            age,
            gender,
            height,
            weight,
            bodyFatPercentage,
            muscleMass,
            medicalHistory,
            goals
        } = req.body

        // Validation
        if (!walletAddress) {
            return res.status(400).json({ error: 'Wallet address is required' })
        }

        // Convert arrays to JSON strings for SQLite
        const userData = {
            wallet_address: walletAddress,
            email,
            name,
            age,
            gender,
            height,
            weight,
            body_fat_percentage: bodyFatPercentage,
            muscle_mass: muscleMass,
            medical_history: medicalHistory ? JSON.stringify(medicalHistory) : null,
            goals: goals ? JSON.stringify(goals) : null
        }

        // Check if user exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.wallet_address, walletAddress))
            .limit(1)

        let user

        if (existingUser.length > 0) {
            // Update existing user
            const [updated] = await db
                .update(users)
                .set(userData)
                .where(eq(users.wallet_address, walletAddress))
                .returning()
            user = updated
        } else {
            // Insert new user
            const [inserted] = await db
                .insert(users)
                .values(userData)
                .returning()
            user = inserted
        }

        console.log('✅ User profile saved:', walletAddress)

        res.json({
            success: true,
            message: 'Profile saved successfully',
            user
        })
    } catch (error) {
        console.error('Error saving profile:', error)
        res.status(500).json({ error: 'Failed to save profile' })
    }
})

// GET /api/auth/profile/:walletAddress - Get user profile
router.get('/profile/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params

        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.wallet_address, walletAddress))

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.json({ user })
    } catch (error) {
        console.error('Error fetching profile:', error)
        res.status(500).json({ error: 'Failed to fetch profile' })
    }
})

export default router
