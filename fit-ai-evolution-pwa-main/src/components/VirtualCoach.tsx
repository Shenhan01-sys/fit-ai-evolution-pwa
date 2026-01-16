import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export type CoachState = 'idle' | 'counting' | 'success' | 'motivating'

interface VirtualCoachProps {
    state: CoachState
    repCount?: number
}

export function VirtualCoach({ state, repCount = 0 }: VirtualCoachProps) {
    const [message, setMessage] = useState('Ready when you are!')

    useEffect(() => {
        switch (state) {
            case 'idle':
                setMessage('Ready when you are!')
                break
            case 'counting':
                setMessage(`${repCount} reps! Keep going!`)
                break
            case 'success':
                setMessage('Awesome work! 🎉')
                break
            case 'motivating':
                setMessage('You got this! 💪')
                break
        }
    }, [state, repCount])

    return (
        <motion.div
            className="fixed bottom-24 right-4 z-50 flex flex-col items-end gap-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
            {/* Speech Bubble */}
            <motion.div
                className="glass rounded-2xl px-4 py-2 text-sm font-medium text-white shadow-lg border border-base-blue/30"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                key={message} // Re-animate when message changes
            >
                {message}
            </motion.div>

            {/* AI Coach Character */}
            <motion.div
                animate={
                    state === 'idle'
                        ? { scale: [1, 1.05, 1] }
                        : state === 'counting'
                            ? { y: [0, -10, 0] }
                            : state === 'success'
                                ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }
                                : {}
                }
                transition={
                    state === 'idle'
                        ? { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                        : state === 'counting'
                            ? { duration: 0.5 }
                            : state === 'success'
                                ? { duration: 0.6 }
                                : {}
                }
                className="relative"
            >
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    className="drop-shadow-2xl"
                >
                    {/* Background Circle with Gradient */}
                    <defs>
                        <linearGradient id="coachGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#0052FF" />
                            <stop offset="100%" stopColor="#22C55E" />
                        </linearGradient>
                    </defs>

                    {/* Body */}
                    <circle cx="50" cy="50" r="45" fill="url(#coachGradient)" opacity="0.9" />

                    {/* Face */}
                    <circle cx="50" cy="45" r="35" fill="#1E293B" />

                    {/* Eyes */}
                    <motion.circle
                        cx="40"
                        cy="40"
                        r="4"
                        fill="#0052FF"
                        animate={state === 'success' ? { scaleY: [1, 0.2, 1] } : {}}
                        transition={{ repeat: state === 'success' ? 2 : 0, duration: 0.2 }}
                    />
                    <motion.circle
                        cx="60"
                        cy="40"
                        r="4"
                        fill="#0052FF"
                        animate={state === 'success' ? { scaleY: [1, 0.2, 1] } : {}}
                        transition={{ repeat: state === 'success' ? 2 : 0, duration: 0.2 }}
                    />

                    {/* Mouth */}
                    {state === 'success' ? (
                        <path
                            d="M 35 55 Q 50 65 65 55"
                            stroke="#22C55E"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                    ) : (
                        <path
                            d="M 35 55 Q 50 58 65 55"
                            stroke="#0052FF"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                        />
                    )}

                    {/* Arms */}
                    <motion.rect
                        x="10"
                        y="60"
                        width="30"
                        height="8"
                        rx="4"
                        fill="#0052FF"
                        animate={state === 'motivating' ? { rotate: [-5, 5, -5] } : {}}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ transformOrigin: '25px 64px' }}
                    />
                    <motion.rect
                        x="60"
                        y="60"
                        width="30"
                        height="8"
                        rx="4"
                        fill="#0052FF"
                        animate={state === 'motivating' ? { rotate: [5, -5, 5] } : {}}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ transformOrigin: '75px 64px' }}
                    />
                </svg>

                {/* Pulse Ring on Success */}
                {state === 'success' && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-4 border-success-green"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: 2 }}
                    />
                )}
            </motion.div>
        </motion.div>
    )
}
