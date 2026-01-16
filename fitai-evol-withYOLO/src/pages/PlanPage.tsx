import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageTransition } from '@/components/PageTransition'
import { Dumbbell, Calendar, Zap, ChevronDown, ChevronUp, Loader2, RefreshCw } from 'lucide-react'
import { mapExerciseToCategory } from '@/lib/exerciseMapping'

interface Exercise {
    name: string
    sets: number
    reps: number
    duration_seconds: number
}

interface WorkoutDay {
    day: number
    focus: string
    exercises: Exercise[]
}

interface WorkoutPlan {
    plan_name: string
    duration_weeks: number
    days: WorkoutDay[]
}

export function PlanPage() {
    const { user } = usePrivy()
    const navigate = useNavigate()
    const [plan, setPlan] = useState<WorkoutPlan | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [expandedDay, setExpandedDay] = useState<number | null>(1)
    const [isGenerating, setIsGenerating] = useState(false)

    const generatePlan = async () => {
        setIsGenerating(true)
        try {
            const walletAddress = user?.wallet?.address || user?.email?.address

            const response = await fetch('/api/ai/generate-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress })
            })

            if (!response.ok) {
                throw new Error('Failed to generate plan')
            }

            const data = await response.json()
            setPlan(data.plan)
        } catch (error) {
            console.error('Error generating plan:', error)
            alert('Failed to generate plan. Using fallback.')
            // Fallback plan
            setPlan({
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
            })
        } finally {
            setIsGenerating(false)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            generatePlan()
        }
    }, [user])

    if (isLoading) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 text-base-blue animate-spin mx-auto mb-4" />
                        <h2 className="text-xl text-white font-bold">Generating your AI plan...</h2>
                        <p className="text-gray-400 text-sm mt-2">This may take a few seconds</p>
                    </div>
                </div>
            </PageTransition>
        )
    }

    if (!plan) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <Dumbbell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-xl text-white font-bold mb-2">No Plan Yet</h2>
                        <p className="text-gray-400 mb-6">Let AI create your personalized workout plan</p>
                        <button
                            onClick={generatePlan}
                            disabled={isGenerating}
                            className="px-6 py-3 bg-base-blue hover:bg-base-blue/80 disabled:bg-gray-600 text-white font-bold rounded-lg"
                        >
                            {isGenerating ? 'Generating...' : 'Generate Plan'}
                        </button>
                    </div>
                </div>
            </PageTransition>
        )
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 safe-area-top">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-3xl font-bold text-white">{plan.plan_name}</h1>
                            <button
                                onClick={generatePlan}
                                disabled={isGenerating}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                title="Regenerate plan"
                            >
                                <RefreshCw className={`w-5 h-5 text-gray-400 ${isGenerating ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                                <Calendar size={16} />
                                <span>{plan.duration_weeks} Week{plan.duration_weeks > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Zap size={16} />
                                <span>AI-Powered</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Days List */}
                    <div className="space-y-3">
                        {plan.days.map((day, index) => (
                            <motion.div
                                key={day.day}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="gradient-card rounded-2xl overflow-hidden">
                                    {/* Day Header */}
                                    <button
                                        onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                                        className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                    >
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Day {day.day}</h3>
                                            <p className="text-sm text-gray-400">{day.focus}</p>
                                        </div>
                                        {expandedDay === day.day ? (
                                            <ChevronUp className="text-gray-400" size={20} />
                                        ) : (
                                            <ChevronDown className="text-gray-400" size={20} />
                                        )}
                                    </button>

                                    {/* Exercises List (Expandable) */}
                                    {expandedDay === day.day && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-white/10"
                                        >
                                            <div className="p-4 space-y-3">
                                                {day.exercises.map((exercise, idx) => {
                                                    // Map exercise to detection category
                                                    const mapped = mapExerciseToCategory(exercise.name)

                                                    return (
                                                        <div
                                                            key={idx}
                                                            className="p-3 bg-white/5 rounded-lg"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="font-semibold text-white">{exercise.name}</h4>
                                                                <span className="text-xs text-gray-500">
                                                                    ~{Math.floor(exercise.duration_seconds / 60)}min
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-400 mt-1">
                                                                {exercise.sets} sets × {exercise.reps} reps
                                                            </p>
                                                            {mapped.category !== exercise.name.toLowerCase() && (
                                                                <p className="text-xs text-blue-400 mt-1">
                                                                    💡 Detected as: {mapped.category}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )
                                                })}

                                                {/* Start Workout Button */}
                                                <button
                                                    onClick={() => {
                                                        const firstExercise = day.exercises[0]
                                                        const mapped = mapExerciseToCategory(firstExercise.name)
                                                        navigate('/workout', {
                                                            state: {
                                                                exerciseName: firstExercise.name,
                                                                category: mapped.category
                                                            }
                                                        })
                                                    }}
                                                    className="w-full mt-3 px-4 py-3 bg-success-green hover:bg-success-green/80 text-white font-bold rounded-lg transition-colors"
                                                >
                                                    Start Workout
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Info Footer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 glass rounded-2xl p-4 border border-base-blue/30"
                    >
                        <h4 className="text-sm font-bold text-white mb-2">💡 Pro Tips</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Warm up for 5-10 minutes before starting</li>
                            <li>• Use AI form detection for perfect technique</li>
                            <li>• Complete workouts to earn NFT achievements</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
