import { PageTransition } from '@/components/PageTransition'
import { usePrivy } from '@privy-io/react-auth'
import { motion } from 'framer-motion'
import { Activity, Target, Flame, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export function HomePage() {
    const { user } = usePrivy()

    const quickStats = [
        { icon: Flame, label: 'Streak', value: '7 days', color: 'text-orange-500' },
        { icon: Activity, label: 'Total Reps', value: '450', color: 'text-base-blue' },
        { icon: Target, label: 'Accuracy', value: '94%', color: 'text-success-green' },
        { icon: TrendingUp, label: 'Progress', value: '+12%', color: 'text-purple-500' }
    ]

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 safe-area-top">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome back{user?.email?.address ? `, ${user.email.address.split('@')[0]}` : ''}! 👋
                        </h1>
                        <p className="text-gray-400">Ready to level up your fitness game?</p>
                    </motion.div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {quickStats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="gradient-card rounded-2xl p-4"
                            >
                                <stat.icon className={`w-8 h-8 mb-2 ${stat.color}`} />
                                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Action: Start Workout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/workout">
                            <div className="relative overflow-hidden rounded-3xl p-8 mb-6 cursor-pointer group">
                                {/* Animated Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-base-blue via-purple-600 to-success-green opacity-90 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold text-white mb-2">Start Your Workout</h2>
                                    <p className="text-white/80 mb-4">AI-verified, on-chain rewarded</p>
                                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold">
                                        <span>Let's go</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Today's Plan Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="gradient-card rounded-2xl p-6 mb-6"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">Today's Plan</h3>
                        <div className="space-y-3">
                            {['Squats: 3 sets × 15 reps', 'Push-ups: 3 sets × 12 reps', 'Planks: 3 sets × 45s'].map((exercise, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                                    <div className="w-2 h-2 rounded-full bg-base-blue" />
                                    <p className="text-white">{exercise}</p>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/plan"
                            className="block mt-4 text-center text-base-blue font-semibold hover:underline"
                        >
                            View Full Plan →
                        </Link>
                    </motion.div>

                    {/* Recent Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="gradient-card rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Recent Achievements</h3>
                            <Link
                                to="/achievements"
                                className="text-base-blue text-sm font-semibold hover:underline"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {['First Step', 'Week Warrior', 'Form Master'].map((_achievement, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-base-blue to-success-green rounded-xl flex items-center justify-center"
                                >
                                    <span className="text-3xl">🏆</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
