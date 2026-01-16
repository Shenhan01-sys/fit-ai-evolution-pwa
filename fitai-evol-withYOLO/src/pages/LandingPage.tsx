import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Dumbbell, Zap, Award, Sparkles, ChevronRight, Shield } from 'lucide-react'

export function LandingPage() {
    const navigate = useNavigate()

    const features = [
        {
            icon: Zap,
            title: 'AI-Powered Form Detection',
            description: 'Real-time pose analysis ensures perfect form with every rep',
            gradient: 'from-yellow-500 to-orange-500'
        },
        {
            icon: Award,
            title: 'Verifiable NFT Badges',
            description: 'Earn exclusive on-chain achievements for your milestones',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Dumbbell,
            title: 'Personalized Workouts',
            description: 'Custom plans tailored to your goals and fitness level',
            gradient: 'from-green-500 to-teal-500'
        },
        {
            icon: Shield,
            title: 'Privacy First',
            description: 'Your data stays yours. Secure authentication with Privy',
            gradient: 'from-blue-500 to-cyan-500'
        }
    ]

    const stats = [
        { value: '10K+', label: 'Active Users' },
        { value: '50K+', label: 'Workouts Verified' },
        { value: '5K+', label: 'NFTs Minted' },
        { value: '98%', label: 'Accuracy Rate' }
    ]

    return (
        <div className="min-h-screen bg-slate-deep overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-base-blue/10 via-slate-deep to-success-green/10" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="container mx-auto px-4 pt-20 pb-16">
                    {/* Logo & Nav */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex justify-between items-center mb-20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-4xl">💪</div>
                            <h1 className="text-2xl font-bold text-white">FitAI Evolution</h1>
                        </div>
                    </motion.div>

                    {/* Hero Content */}
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-blue/20 rounded-full mb-6 border border-base-blue/30">
                                <Sparkles className="text-base-blue" size={16} />
                                <span className="text-sm text-gray-300">Base Indonesia Hackathon 2025</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                Your Fitness,
                                <br />
                                <span className="bg-gradient-to-r from-base-blue via-purple-500 to-success-green bg-clip-text text-transparent">
                                    Verified On-Chain
                                </span>
                            </h2>

                            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                                AI-powered workout tracking meets Web3. Get real-time form feedback,
                                earn verifiable NFT badges, and own your fitness journey on Base L2.
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/onboarding')}
                                className="group px-8 py-4 bg-gradient-to-r from-base-blue to-success-green hover:opacity-90 text-white font-bold rounded-xl transition-all duration-200 flex items-center gap-2 mx-auto shadow-2xl shadow-base-blue/50"
                            >
                                Start Your Journey
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </motion.button>

                            <p className="text-sm text-gray-500 mt-4">
                                No wallet? No problem. Sign in with Google or Email.
                            </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                        >
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="text-center glass rounded-2xl p-6 border border-white/10"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Features Grid */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h3 className="text-3xl font-bold text-white text-center mb-12">
                                Why FitAI Evolution?
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ x: index % 2 === 0 ? -20 : 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        whileHover={{ scale: 1.02, y: -5 }}
                                        className="gradient-card rounded-2xl p-6 cursor-default group"
                                    >
                                        <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="text-white" size={28} />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-400">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-20 text-center glass rounded-3xl p-12 border border-base-blue/30"
                        >
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Ready to Transform Your Fitness?
                            </h3>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                Join thousands using AI-powered form detection and earning verifiable achievements.
                                Your journey starts now.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/onboarding')}
                                className="px-8 py-4 bg-white text-slate-deep font-bold rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-white/20"
                            >
                                Get Started Free
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-center pb-10 pt-20"
                >
                    <p className="text-gray-500 text-sm">
                        Built on <span className="text-base-blue font-semibold">Base L2</span> • Powered by{' '}
                        <span className="text-success-green font-semibold">AI</span>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
