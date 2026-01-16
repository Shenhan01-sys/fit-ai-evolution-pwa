import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, ExternalLink, Trophy, Loader2 } from 'lucide-react'

interface AchievementData {
    id: string
    title: string
    description: string
    icon_emoji: string
    is_unlocked: boolean
    is_minted: boolean
    mint_tx_hash?: string | null
    unlocked_at?: string
}

interface SmartAchievementCardProps {
    achievement: AchievementData
    walletAddress: string | null
    onMintSuccess: (id: string, txHash: string) => void
}

export function SmartAchievementCard({
    achievement,
    walletAddress,
    onMintSuccess
}: SmartAchievementCardProps) {
    const [isMinting, setIsMinting] = useState(false)

    const handleMint = async () => {
        if (!walletAddress) {
            alert('Wallet not connected')
            return
        }

        setIsMinting(true)
        try {
            const response = await fetch('/api/nft/mint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    walletAddress,
                    badgeType: achievement.id,
                    rarity: 'common' // Placeholder
                })
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Minting failed')

            alert('Achievement Minted! Check your wallet.')
            onMintSuccess(achievement.id, data.tx_hash)

        } catch (error) {
            console.error('Mint error:', error)
            alert('Minting failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
        } finally {
            setIsMinting(false)
        }
    }

    // === LOCKED STATE ===
    if (!achievement.is_unlocked) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 opacity-60 relative overflow-hidden">
                <div className="flex flex-col items-center  text-center grayscale">
                    <div className="text-4xl mb-3 opacity-50">{achievement.icon_emoji}</div>
                    <h3 className="font-bold text-sm text-slate-400">{achievement.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{achievement.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-slate-500 font-mono">
                        <Lock className="w-3 h-3" /> LOCKED
                    </div>
                </div>
            </div>
        )
    }

    // === MINTED STATE (ON-CHAIN) ===
    if (achievement.is_minted) {
        return (
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="bg-gradient-to-br from-slate-900 to-blue-900/40 border border-blue-500/50 rounded-2xl p-4 relative overflow-hidden shadow-[0_0_15px_rgba(0,82,255,0.3)]">
                    {/* Badge */}
                    <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded text-[10px] font-bold">
                            NFT OWNED
                        </span>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="text-5xl mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            {achievement.icon_emoji}
                        </div>
                        <h3 className="font-bold text-white text-sm mb-1">{achievement.title}</h3>
                        <p className="text-xs text-blue-200/70">{achievement.description}</p>

                        <button
                            className="mt-4 w-full text-xs py-2 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2"
                            onClick={() => window.open(`https://sepolia.basescan.org/tx/${achievement.mint_tx_hash}`, '_blank')}
                        >
                            View on BaseScan <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </motion.div>
        )
    }

    // === UNLOCKED BUT NOT MINTED (READY TO CLAIM) ===
    return (
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
            <div className="bg-slate-900 border border-[#80EE98] rounded-2xl p-4 relative overflow-hidden ring-1 ring-[#80EE98]/50">
                <div className="flex flex-col items-center text-center">
                    <div className="text-5xl mb-3">{achievement.icon_emoji}</div>
                    <h3 className="font-bold text-[#80EE98] text-sm">{achievement.title}</h3>
                    <p className="text-xs text-slate-400 mb-4">{achievement.description}</p>

                    <button
                        onClick={handleMint}
                        disabled={isMinting}
                        className="w-full bg-[#46DFB1] hover:bg-[#80EE98] disabled:bg-gray-600 text-slate-900 font-bold text-sm py-2 rounded-lg shadow-[0_0_10px_rgba(70,223,177,0.4)] transition-colors flex items-center justify-center gap-2"
                    >
                        {isMinting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Minting...</>
                        ) : (
                            <><Trophy className="w-4 h-4" /> Claim NFT</>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
