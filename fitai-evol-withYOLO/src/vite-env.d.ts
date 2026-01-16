/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PRIVY_APP_ID: string
    readonly VITE_BASE_SEPOLIA_RPC_URL: string
    readonly VITE_CHAIN_ID: string
    readonly VITE_GROQ_API_KEY: string
    readonly VITE_TEACHABLE_MACHINE_URL: string
    readonly VITE_CONTRACT_ADDRESS: `0x${string}`
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
