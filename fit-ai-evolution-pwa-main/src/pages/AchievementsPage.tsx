import { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { PageTransition } from '@/components/PageTransition'
import { SmartAchievementCard } from '@/components/SmartAchievementCard'
import { motion } from 'framer-motion'
import { Trophy, Loader2 } from 'lucide-react'

interface Achievement {
    id: string
    title: string
    description: string
    icon_emoji: string
    is_unlocked: boolean
    is_minted: boolean
    mint_tx_hash?: string | null
}

// Static achievement definitions (with unlock criteria)
const ACHIEVEMENT_DEFINITIONS = [
    {
        id: 'first_step',
        title: 'First Step',
        description: 'Complete your first workout',
        icon_emoji: '🎯',
    },
    {
        id: 'week_warrior',
        title: 'Week Warrior',
        description: '7 workouts in 7 days',
        icon_emoji: '🔥',
    },
    {
        id: 'hundred_club',
        title: 'Hundred Club',
        description: 'Complete 100 total reps',
        icon_emoji: '💯',
    },
    {
        id: 'perfect_form',
        title: 'Perfect Form',
        description: '95%+ accuracy for 10 workouts',
        icon_emoji: '⭐',
    }
]

export function AchievementsPage() {
    const { user } = usePrivy()
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const walletAddress = user?.wallet?.address || user?.email?.address
                if (!walletAddress) return

                const response = await fetch(`/api/nft/achievements/${walletAddress}`)
                if (!response.ok) throw new Error('Failed to fetch')

                const data = await response.json()

                // Merge dengan definitions untuk handle yang belum ada di DB
                const merged = ACHIEVEMENT_DEFINITIONS.map(def => {
                    const userAch = data.achievements.find((a: any) => a.badge_type === def.id)
                    return {
                        ...def,
                        is_unlocked: !!userAch,
                        is_minted: !!userAch?.tx_hash,
                        mint_tx_hash: userAch?.tx_hash || null
                    }
                })

                setAchievements(merged)
            } catch (error) {
                console.error('Error fetching achievements:', error)
                // Fallback: Show all locked
                setAchievements(ACHIEVEMENT_DEFINITIONS.map(def => ({
                    ...def,
                    is_unlocked: false,
                    is_minted: false
                })))
            } finally {
                setIsLoading(false)
            }
        }

        if (user) {
            fetchAchievements()
        }
    }, [user])

    const handleMintUpdate = (id: string, txHash: string) => {
        setAchievements(prev => prev.map(ach =>
            ach.id === id
                ? { ...ach, is_minted: true, mint_tx_hash: txHash }
                : ach
        ))
    }

    if (isLoading) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-base-blue animate-spin" />
                </div>
            </PageTransition>
        )
    }

    const walletAddress = user?.wallet?.address || user?.email?.address || null
    const mintedCount = achievements.filter(a => a.is_minted).length
    const unlockedCount = achievements.filter(a => a.is_unlocked).length

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4 safe-area-top">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6"
                    >
                        <div className="flex items-center justify-between mb-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                            <div>
                                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <Trophy className="text-yellow-500" size={28} />
                                    Trophy Case
                                </h1>
                                <p className="text-xs text-slate-400 mt-1">Mint unlocked achievements to Base L2</p>
                            </div>
                            <div className="flex gap-3">
                                <div className="text-center">
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Unlocked</p>
                                    <div className="px-3 py-1 border border-[#80EE98] text-[#80EE98] rounded font-bold">
                                        {unlockedCount}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] uppercase text-slate-500 font-bold">Minted</p>
                                    <div className="px-3 py-1 bg-blue-600 text-white rounded font-bold">
                                        {mintedCount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {achievements.map((ach, index) => (
                            <motion.div
                                key={ach.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <SmartAchievementCard
                                    walletAddress={walletAddress}
                                    onMintSuccess={handleMintUpdate}
                                    achievement={ach}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 glass rounded-2xl p-4 border border-base-blue/30"
                    >
                        <h4 className="text-sm font-bold text-white mb-2">🏅 How to Unlock</h4>
                        <ul className="text-xs text-gray-300 space-y-1">
                            <li>• Complete workouts to unlock achievements</li>
                            <li>• Claim NFT to prove your progress on-chain</li>
                            <li>• Trade or showcase your fitness journey</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    )
}
