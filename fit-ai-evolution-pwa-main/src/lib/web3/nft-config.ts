export interface NFTBadge {
    id: number
    name: string
    description: string
    image: string
    requirement: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export const NFT_CONFIG: Record<string, NFTBadge> = {
    FIRST_STEP: {
        id: 1,
        name: 'First Step',
        description: 'Completed your first workout',
        image: '/nfts/first-step.png',
        requirement: 'Complete 1 workout',
        rarity: 'common'
    },
    FORM_MASTER: {
        id: 2,
        name: 'Form Master',
        description: 'Achieved 95%+ accuracy in 10 workouts',
        image: '/nfts/form-master.png',
        requirement: '10 workouts with 95%+ form accuracy',
        rarity: 'rare'
    },
    WEEK_WARRIOR: {
        id: 3,
        name: 'Week Warrior',
        description: 'Worked out 7 consecutive days',
        image: '/nfts/week-warrior.png',
        requirement: '7 consecutive days of workouts',
        rarity: 'rare'
    },
    HUNDRED_CLUB: {
        id: 4,
        name: 'Hundred Club',
        description: 'Completed 100 total reps in one session',
        image: '/nfts/hundred-club.png',
        requirement: '100 reps in a single workout',
        rarity: 'epic'
    },
    CONSISTENCY_KING: {
        id: 5,
        name: 'Consistency King',
        description: 'Maintained a 30-day workout streak',
        image: '/nfts/consistency-king.png',
        requirement: '30 consecutive days of workouts',
        rarity: 'epic'
    },
    EVOLUTION_COMPLETE: {
        id: 6,
        name: 'Evolution Complete',
        description: 'Unlocked all achievements',
        image: '/nfts/evolution-complete.png',
        requirement: 'Unlock all other badges',
        rarity: 'legendary'
    }
}

export const RARITY_COLORS = {
    common: 'from-gray-500 to-gray-700',
    rare: 'from-blue-500 to-blue-700',
    epic: 'from-purple-500 to-purple-700',
    legendary: 'from-amber-500 to-amber-700'
}

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`
