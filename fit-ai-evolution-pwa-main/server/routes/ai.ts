import { Router } from 'express'
import { db } from '../db'
import { users } from '../db/schema'
import { eq } from 'drizzle-orm'

const router = Router()

// POST /api/ai/generate-plan - Generate AI workout plan
router.post('/generate-plan', async (req, res) => {
    try {
        const { walletAddress } = req.body

        if (!walletAddress) {
            return res.status(400).json({ error: 'Wallet address required' })
        }

        // Fetch user profile for context
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.wallet_address, walletAddress))

        if (!user) {
            return res.status(404).json({ error: 'User not found. Complete onboarding first.' })
        }

        // Parse JSON fields
        const medicalHistory = user.medical_history ? JSON.parse(user.medical_history) : []
        const goals = user.goals ? JSON.parse(user.goals) : []

        // Calculate BMI if height and weight available
        let bmi = 'N/A'
        if (user.height && user.weight) {
            const heightInMeters = user.height / 100
            bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(1)
        }

        // Build system prompt with user context
        const systemPrompt = `You are FitAI Coach, an expert fitness trainer. Create a personalized 7-day workout plan.

            User Profile:
            - Age: ${user.age || 'N/A'}
            - Gender: ${user.gender || 'N/A'}
            - Height: ${user.height || 'N/A'} cm
            - Weight: ${user.weight || 'N/A'} kg
            - BMI: ${bmi}
            - Body Fat: ${user.body_fat_percentage || 'N/A'}%
            - Muscle Mass: ${user.muscle_mass || 'N/A'}%
            - Goals: ${goals.join(', ') || 'General Fitness'}
            - Medical History: ${medicalHistory.join(', ') || 'None'}

            IMPORTANT INSTRUCTIONS:
            1. Adjust exercises considering medical history (e.g., avoid high impact if knee injury, low weight if back pain)
            2. Scale intensity based on current fitness level (BMI, body fat %, muscle mass)
            3. Focus on goals: ${goals.join(', ')}
            4. Include 3-5 exercises per day
            5. Provide realistic rep ranges for beginners
            
            ⚠️ CRITICAL: PREFER HOME/BODYWEIGHT EXERCISES ONLY!
            - ✅ GOOD: Push-ups, Squats, Lunges, Planks, Burpees, Mountain Climbers
            - ❌ AVOID: Bench Press, Lat Pulldown, Cable exercises, Machine exercises
            - Reason: User will use AI camera tracking (can't detect gym equipment)
            - Only suggest gym exercises if explicitly needed for goals AND user has equipment access

            Respond ONLY with valid JSON in this EXACT format:
            {
            "plan_name": "Beginner Muscle Gain Plan",
            "d,
            "days"uration_weeks": 1: [
                {
                "day": 1,
                "focus": "Upper Body",
                "exercises": [
                    {"name": "Push-ups", "sets": 3, "reps": 10, "duration_seconds": 120},
                    {"name": "Dumbbell Rows", "sets": 3, "reps": 12, "duration_seconds": 150}
                ]
                }
            ]
            }`

        // Call Groq API
        const groqApiKey = process.env.VITE_GROQ_API_KEY

        if (!groqApiKey) {
            throw new Error('VITE_GROQ_API_KEY not found in environment variables')
        }

        console.log('🤖 Calling Groq API for:', walletAddress)

        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${groqApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile', // Updated from deprecated llama3-70b-8192
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: 'Generate my personalized 7-day workout plan now.' }
                ],
                temperature: 0.7,
                max_tokens: 2048
            })
        })

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text()
            console.error('Groq API error:', errorText)
            throw new Error('Groq API error: ' + errorText)
        }

        const groqData = await groqResponse.json()
        const aiResponse = groqData.choices[0].message.content

        // Parse AI response (try to extract JSON if wrapped in markdown)
        let plan
        try {
            // Remove markdown code blocks if present
            const jsonMatch = aiResponse.match(/```json\n?([\s\S]*?)\n?```/) || aiResponse.match(/```\n?([\s\S]*?)\n?```/)
            const cleanJson = jsonMatch ? jsonMatch[1] : aiResponse
            plan = JSON.parse(cleanJson.trim())
        } catch (parseError) {
            console.error('Failed to parse AI response:', aiResponse)
            // Fallback plan
            plan = {
                plan_name: "Beginner Full Body Plan",
                duration_weeks: 1,
                days: [
                    {
                        day: 1,
                        focus: "Full Body",
                        exercises: [
                            { name: "Squats", sets: 3, reps: 10, duration_seconds: 180 },
                            { name: "Push-ups", sets: 3, reps: 8, duration_seconds: 120 }
                        ]
                    }
                ]
            }
        }

        console.log('✅ AI Plan generated for:', walletAddress)

        res.json({
            success: true,
            plan,
            generated_at: new Date().toISOString()
        })

    } catch (error) {
        console.error('Error generating plan:', error)
        res.status(500).json({
            error: 'Failed to generate plan',
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
})

export default router
