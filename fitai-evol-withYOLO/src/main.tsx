import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { PrivyWagmiProvider } from './providers/PrivyWagmiProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PrivyWagmiProvider>
            <App />
        </PrivyWagmiProvider>
    </React.StrictMode>
)
