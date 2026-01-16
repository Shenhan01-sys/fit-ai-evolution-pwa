import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export function OnboardingPage() {
    const { login, authenticated, user, logout } = usePrivy()
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        bodyFat: '',
        muscleMass: '',
        medicalHistory: [] as string[],
        goals: [] as string[]
    })

    // Reset step to 0 when user logs out
    useEffect(() => {
        if (!authenticated) {
            setStep(0)
        }
    }, [authenticated])

    const medicalOptions = [
        'Knee Injury',
        'Back Pain',
        'Asthma',
        'Diabetes',
        'Heart Condition',
        'Joint Issues',
        'None'
    ]

    const goalOptions = [
        'Weight Loss',
        'Muscle Gain',
        'Strength (Powerlifting)',
        'Hypertrophy',
        'Endurance',
        'Flexibility',
        'Rehabilitation',
        'General Fitness'
    ]

    const handleMedicalToggle = (option: string) => {
        if (option === 'None') {
            setFormData(prev => ({ ...prev, medicalHistory: ['None'] }))
        } else {
            setFormData(prev => ({
                ...prev,
                medicalHistory: prev.medicalHistory.includes(option)
                    ? prev.medicalHistory.filter(h => h !== option && h !== 'None')
                    : [...prev.medicalHistory.filter(h => h !== 'None'), option]
            }))
        }
    }

    const handleGoalToggle = (option: string) => {
        setFormData(prev => ({
            ...prev,
            goals: prev.goals.includes(option)
                ? prev.goals.filter(g => g !== option)
                : [...prev.goals, option]
        }))
    }

    const handleSubmit = async () => {
        try {
            // Send profile data to backend
            const walletAddress = user?.wallet?.address || user?.email?.address || 'temp_' + Date.now()

            const response = await fetch('/api/auth/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,  // camelCase to match backend
                    email: user?.email?.address,
                    name: formData.name,
                    age: formData.age ? parseInt(formData.age) : undefined,
                    gender: formData.gender,
                    height: formData.height ? parseInt(formData.height) : undefined,
                    weight: formData.weight ? parseInt(formData.weight) : undefined,
                    bodyFatPercentage: formData.bodyFat ? parseInt(formData.bodyFat) : undefined,
                    muscleMass: formData.muscleMass ? parseInt(formData.muscleMass) : undefined,
                    medicalHistory: formData.medicalHistory,
                    goals: formData.goals
                })
            })

            if (response.ok) {
                console.log('✅ Profile saved successfully')
                navigate('/home')
            } else {
                const error = await response.json()
                console.error('Failed to save profile:', error)
                alert('Failed to save profile: ' + (error.error || 'Unknown error'))
            }
        } catch (error) {
            console.error('Failed to save profile:', error)
            alert('Failed to save profile. Check console for details.')
        }
    }

    const steps = [
        // Step 0: Login
        <div key="login" className="text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-8"
            >
                <div className="text-6xl mb-4">💪</div>
                <h1 className="text-4xl font-bold text-white mb-4">FitAI Evolution</h1>
                <p className="text-gray-400 text-lg">
                    AI-Powered Fitness • Web3 Achievements
                </p>
            </motion.div>

            <button
                onClick={() => login()}
                className="w-full py-4 bg-base-blue hover:bg-base-blue/80 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105"
            >
                Get Started
            </button>

            <p className="text-gray-500 text-sm mt-4">
                Sign in with Google or Email • No seed phrases required
            </p>
        </div>,

        // Step 1: Basic Info
        <div key="basic" className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h2>
                <p className="text-gray-400">This helps us personalize your experience</p>
            </div>

            <div>
                <label className="block text-white font-semibold mb-2">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-base-blue"
                    placeholder="Your name"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-white font-semibold mb-2">Age</label>
                    <input
                        type="number"
                        value={formData.age}
                        onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-base-blue"
                        placeholder="25"
                    />
                </div>
                <div>
                    <label className="block text-white font-semibold mb-2">Gender</label>
                    <select
                        value={formData.gender}
                        onChange={e => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-base-blue"
                        style={{ colorScheme: 'dark' }}
                    >
                        <option value="" className="bg-slate-dark text-white">Select</option>
                        <option value="male" className="bg-slate-dark text-white">Male</option>
                        <option value="female" className="bg-slate-dark text-white">Female</option>
                        <option value="other" className="bg-slate-dark text-white">Other</option>
                    </select>
                </div>
            </div>
        </div>,

        // Step 2: Physical Metrics
        <div key="metrics" className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Physical Metrics</h2>
                <p className="text-gray-400">Help us track your progress accurately</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-white font-semibold mb-2">Height (cm)</label>
                    <input
                        type="number"
                        value={formData.height}
                        onChange={e => setFormData(prev => ({ ...prev, height: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-base-blue"
                        placeholder="170"
                    />
                </div>
                <div>
                    <label className="block text-white font-semibold mb-2">Weight (kg)</label>
                    <input
                        type="number"
                        value={formData.weight}
                        onChange={e => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-base-blue"
                        placeholder="70"
                    />
                </div>
                <div>
                    <label className="block text-white font-semibold mb-2">Body Fat %</label>
                    <input
                        type="number"
                        value={formData.bodyFat}
                        onChange={e => setFormData(prev => ({ ...prev, bodyFat: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-base-blue"
                        placeholder="20"
                    />
                </div>
                <div>
                    <label className="block text-white font-semibold mb-2">Muscle Mass (kg)</label>
                    <input
                        type="number"
                        value={formData.muscleMass}
                        onChange={e => setFormData(prev => ({ ...prev, muscleMass: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-base-blue"
                        placeholder="30"
                    />
                </div>
            </div>
        </div>,

        // Step 3: Medical History
        <div key="medical" className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Medical History</h2>
                <p className="text-gray-400">This helps us recommend safe exercises</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {medicalOptions.map(option => (
                    <button
                        key={option}
                        onClick={() => handleMedicalToggle(option)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${formData.medicalHistory.includes(option)
                            ? 'bg-base-blue text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>,

        // Step 4: Goals
        <div key="goals" className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Your Fitness Goals</h2>
                <p className="text-gray-400">Select all that apply</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {goalOptions.map(option => (
                    <button
                        key={option}
                        onClick={() => handleGoalToggle(option)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all ${formData.goals.includes(option)
                            ? 'bg-success-green text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    ]

    return (
        <div className="min-h-screen bg-slate-deep flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg">
                {/* Logout Button - Only show when authenticated and in forms */}
                {authenticated && (
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to logout? Your progress will be lost.')) {
                                setStep(0)  // Reset to landing page
                                logout()
                            }
                        }}
                        className="mb-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <span>←</span> Logout
                    </button>
                )}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="gradient-card rounded-3xl p-8"
                    >
                        {steps[authenticated ? step + 1 : 0]}

                        {authenticated && (
                            <div className="mt-8 flex items-center justify-between">
                                {step > 0 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                        Back
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        if (step === steps.length - 2) {
                                            handleSubmit()
                                        } else {
                                            setStep(step + 1)
                                        }
                                    }}
                                    disabled={!formData.name && step === 0}
                                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-base-blue hover:bg-base-blue/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                                >
                                    {step === steps.length - 2 ? 'Complete' : 'Next'}
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}

                        {authenticated && (
                            <div className="mt-6 flex gap-2 justify-center">
                                {Array.from({ length: steps.length - 1 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2 rounded-full transition-all ${i === step
                                            ? 'w-8 bg-base-blue'
                                            : 'w-2 bg-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
