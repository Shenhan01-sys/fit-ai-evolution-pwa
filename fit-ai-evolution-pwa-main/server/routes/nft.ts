import { Router } from 'express'
import { db } from '../db'
import { achievements } from '../db/schema'

const router = Router()

// POST /api/nft/mint - Mint achievement NFT (PLACEHOLDER)
router.post('/mint', async (req, res) => {
    try {
        const { walletAddress, badgeType, rarity } = req.body

        // Validation
        if (!walletAddress || !badgeType || !rarity) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        console.log(`🎨 Minting NFT: ${badgeType} (${rarity}) for ${walletAddress}`)

        // TODO: In production, this would:
        // 1. Connect to smart contract
        // 2. Call mint function with badge metadata
        // 3. Wait for transaction confirmation
        // 4. Return real tx hash and token ID
        //
        // Example with ethers.js:
        // const contract = new Contract(CONTRACT_ADDRESS, ABI, signer)
        // const tx = await contract.mint(walletAddress, tokenId, amount, metadata)
        // const receipt = await tx.wait()

        // PLACEHOLDER: Save to database without actual blockchain minting
        const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`
        const mockTokenId = Math.floor(Math.random() * 10000)

        const [achievement] = await db
            .insert(achievements)
            .values({
                user_wallet: walletAddress,
                badge_type: badgeType,
                rarity,
                tx_hash: mockTxHash,
                token_id: mockTokenId
            })
            .returning()

        console.log(`✅ Mock NFT minted: Token ID ${mockTokenId}`)

        res.json({
            success: true,
            achievement,
            tx_hash: mockTxHash,
            token_id: mockTokenId,
            message: '⚠️ Mock mint successful (deploy smart contract for real minting)',
            note: 'This is a placeholder. In production, this would mint an actual NFT on Base Sepolia.'
        })
    } catch (error) {
        console.error('Error minting NFT:', error)
        res.status(500).json({ error: 'Failed to mint NFT' })
    }
})

// GET /api/nft/achievements/:walletAddress - Get user's achievements
router.get('/achievements/:walletAddress', async (req, res) => {
    try {
        const { walletAddress } = req.params

        const userAchievements = await db.query.achievements.findMany({
            where: (achievements, { eq }) => eq(achievements.user_wallet, walletAddress),
            orderBy: (achievements, { desc }) => [desc(achievements.minted_at)]
        })

        res.json({
            achievements: userAchievements,
            total: userAchievements.length
        })
    } catch (error) {
        console.error('Error fetching achievements:', error)
        res.status(500).json({ error: 'Failed to fetch achievements' })
    }
})

export default router
