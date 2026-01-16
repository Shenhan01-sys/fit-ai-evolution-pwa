import { baseSepolia } from 'viem/chains'
import { http } from 'viem'
import { createConfig } from 'wagmi'

export const config = createConfig({
    chains: [baseSepolia],
    transports: {
        [baseSepolia.id]: http(import.meta.env.VITE_BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org')
    }
})
