import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'
import { ReactNode } from 'react'
import { baseSepolia } from 'viem/chains'

const queryClient = new QueryClient()

interface Props {
    children: ReactNode
}

export function PrivyWagmiProvider({ children }: Props) {
    const appId = import.meta.env.VITE_PRIVY_APP_ID

    if (!appId) {
        console.warn('VITE_PRIVY_APP_ID not set. Using placeholder.')
    }

    return (
        <PrivyProvider
            appId={appId || 'placeholder-app-id'}
            config={{
                loginMethods: ['email', 'google', 'wallet'],
                appearance: {
                    theme: 'dark',
                    accentColor: '#0052FF',
                    logo: '/logo.png'
                },
                embeddedWallets: {
                    createOnLogin: 'users-without-wallets',
                    requireUserPasswordOnCreate: false
                },
                defaultChain: baseSepolia,
                supportedChains: [baseSepolia]
            }}
        >
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>
                    {children}
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    )
}
