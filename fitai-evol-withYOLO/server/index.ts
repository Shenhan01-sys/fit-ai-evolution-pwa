// IMPORTANT: Load environment variables FIRST before any imports
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load .env from project root
dotenv.config({ path: resolve(__dirname, '../.env') })

console.log('✅ Environment loaded:', {
    DATABASE_URL: process.env.DATABASE_URL ? '***HIDDEN***' : 'NOT SET',
    PORT: process.env.PORT
})

// Now import everything else
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import workoutRoutes from './routes/workouts.js'
import nftRoutes from './routes/nft.js'
import aiRoutes from './routes/ai.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/workouts', workoutRoutes)
app.use('/api/nft', nftRoutes)
app.use('/api/ai', aiRoutes)

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err)
    res.status(500).json({ error: 'Internal server error', message: err.message })
})

// Start server
app.listen(PORT, () => {
    console.log(`🚀 FitAI Backend running on http://localhost:${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})

export default app
