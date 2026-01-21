import { useState } from 'react'
import { PageTransition } from '@/components/PageTransition'
import { CameraWorkout, ExerciseType } from '@/components/CameraWorkout'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'

export function WorkoutPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user } = usePrivy()

    // Get exercise from navigation state (from Plan page) or default selection
    const stateData = location.state as { exerciseName?: string; category?: ExerciseType } | null
    const [selectedExercise, setSelectedExercise] = useState<ExerciseType | null>(
        stateData?.category || null
    )
    const [isWorkoutComplete, setIsWorkoutComplete] = useState(false)

    const exercises: { type: ExerciseType; label: string; emoji: string }[] = [
        { type: 'squats', label: 'Squats', emoji: '🦵' },
        { type: 'pushups', label: 'Push-ups', emoji: '💪' },
        { type: 'planks', label: 'Planks', emoji: '🧘' }
    ]

    const handleWorkoutComplete = async (data: { reps: number; accuracy: number; duration: number }) => {
        console.log('Workout completed:', data)

        // Send to backend for verification
        try {
            const walletAddress = user?.wallet?.address || user?.email?.address || 'temp_' + Date.now()

            const response = await fetch('/api/workouts/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,  // camelCase to match backend
                    exerciseType: selectedExercise,  // camelCase
                    reps: data.reps,  // backend expects 'reps'
                    accuracy: Math.round(data.accuracy),
                    duration: data.duration
                })
            })

            const result = await response.json()
            console.log('Workout verification result:', result)

            if (result.verified) {
                setIsWorkoutComplete(true)

                // Show success message then navigate
                setTimeout(() => {
                    navigate('/', { state: { workoutCompleted: true } })
                }, 3000)
            } else {
                console.error('Workout not verified:', result.message)
                alert('Workout verification failed: ' + (result.message || 'Unknown error'))
            }
        } catch (error) {
            console.error('Failed to verify workout:', error)
            alert('Failed to verify workout. Check console for details.')
        }
    }

    if (isWorkoutComplete) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-slate-deep flex items-center justify-center px-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: 3, duration: 0.5 }}
                            className="text-8xl mb-6"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white mb-4">Workout Complete!</h2>
                        <p className="text-gray-400 mb-6">Your achievement NFT is being minted...</p>
                        <div className="w-16 h-16 border-4 border-base-blue border-t-transparent rounded-full animate-spin mx-auto" />
                    </motion.div>
                </div>
            </PageTransition>
        )
    }

    if (selectedExercise) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 safe-area-top">
                    <button
                        onClick={() => setSelectedExercise(null)}
                        className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Change Exercise</span>
                    </button>

                    <CameraWorkout
                        exerciseType={selectedExercise}
                        onWorkoutComplete={handleWorkoutComplete}
                    />
                </div>
            </PageTransition>
        )
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 safe-area-top">
                <div className="max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Select Exercise</h1>
                            {stateData?.exerciseName && (
                                <p className="text-sm text-blue-400">
                                    💡 From your AI plan: <span className="font-semibold">{stateData.exerciseName}</span>
                                </p>
                            )}
                        </div>
                        <p className="text-gray-400">Choose what you want to work on today</p>
                    </motion.div>

                    <div className="space-y-4">
                        {exercises.map((exercise, index) => (
                            <motion.button
                                key={exercise.type}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedExercise(exercise.type)}
                                className="w-full gradient-card rounded-2xl p-6 hover:scale-105 transition-transform duration-200 text-left group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl">{exercise.emoji}</div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-1">{exercise.label}</h3>
                                        <p className="text-gray-400">AI-verified form detection</p>
                                    </div>
                                    <div className="text-base-blue text-2xl group-hover:translate-x-2 transition-transform">
                                        →
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 glass rounded-2xl p-6 border border-base-blue/30"
                    >
                        <h3 className="text-lg font-bold text-white mb-3">💡 How it works</h3>
                        <ul className="space-y-2 text-gray-300 text-sm">
                            <li>• Position yourself in front of the camera</li>
                            <li>• AI will detect your form in real-time</li>
                            <li>• Green skeleton = Good form (90%+ accuracy)</li>
                            <li>• Complete your set and earn verifiable NFT badges</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
