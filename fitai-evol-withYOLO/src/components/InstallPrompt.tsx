import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Smartphone } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [showPrompt, setShowPrompt] = useState(false)
    const [isIOS, setIsIOS] = useState(false)
    const [isInstalled, setIsInstalled] = useState(false)

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log('🔵 InstallPrompt: App already installed')
            setIsInstalled(true)
            return
        }

        // Check if iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        setIsIOS(iOS)
        console.log('🔵 InstallPrompt: Platform detected -', iOS ? 'iOS' : 'Desktop/Android')

        // Listen for install prompt event (Android/Desktop)
        const handleBeforeInstall = (e: Event) => {
            console.log('🟢 InstallPrompt: beforeinstallprompt event fired!')
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)

            // Show prompt after 1 second delay (faster for testing)
            setTimeout(() => {
                console.log('🟢 InstallPrompt: Showing prompt now')
                setShowPrompt(true)
            }, 1000)
        }

        window.addEventListener('beforeinstallprompt', handleBeforeInstall)

        // For iOS, show prompt after delay if not installed
        if (iOS && !isInstalled) {
            console.log('🟡 InstallPrompt: iOS detected, showing manual instructions in 2s')
            setTimeout(() => {
                setShowPrompt(true)
            }, 2000)
        }

        // DEV MODE: Force show prompt if event doesn't fire (for testing)
        // In production, beforeinstallprompt will handle this
        if (!iOS && import.meta.env.DEV) {
            console.log('🟠 InstallPrompt: DEV MODE - Forcing prompt in 3s for testing')
            setTimeout(() => {
                if (!deferredPrompt) {
                    console.log('🟠 InstallPrompt: Event didnt fire, showing anyway for demo')
                    setShowPrompt(true)
                }
            }, 3000)
        }

        // Check if dismissed before
        const dismissed = localStorage.getItem('pwa-install-dismissed')
        console.log('🔵 InstallPrompt: Dismissed before?', dismissed)

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
        }
    }, [isInstalled, deferredPrompt])

    const handleInstallClick = async () => {
        if (!deferredPrompt && !isIOS) {
            setShowPrompt(false)
            return
        }

        // Android/Desktop: Use native prompt
        if (deferredPrompt) {
            await deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice

            if (outcome === 'accepted') {
                setDeferredPrompt(null)
                setShowPrompt(false)
            }
        }
        // iOS: Show instructions (can't programmatically install on iOS)
        // Kept open to show instructions
    }

    const handleDismiss = () => {
        setShowPrompt(false)
        // Remember user dismissed (localStorage)
        localStorage.setItem('pwa-install-dismissed', 'true')
    }

    // Don't show if already installed or user dismissed
    if (isInstalled || localStorage.getItem('pwa-install-dismissed')) {
        return null
    }

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
                >
                    <div className="gradient-card rounded-2xl p-6 shadow-2xl border border-base-blue/30">
                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Icon */}
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-base-blue to-success-green rounded-xl flex items-center justify-center">
                                <Smartphone className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Install FitAI</h3>
                                <p className="text-sm text-gray-400">Get the full app experience</p>
                            </div>
                        </div>

                        {/* Instructions based on platform */}
                        {isIOS ? (
                            <div className="mb-4">
                                <p className="text-sm text-gray-300 mb-3">
                                    Install this app on your iPhone:
                                </p>
                                <ol className="text-sm text-gray-400 space-y-2 ml-4 list-decimal">
                                    <li>Tap the <span className="font-semibold text-base-blue">Share</span> button (⬆️)</li>
                                    <li>Scroll and tap <span className="font-semibold text-base-blue">"Add to Home Screen"</span></li>
                                    <li>Tap <span className="font-semibold text-base-blue">"Add"</span> in the top right</li>
                                </ol>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-300 mb-4">
                                Install FitAI for offline access, faster performance, and a native app experience!
                            </p>
                        )}

                        {/* Install button (only for non-iOS) */}
                        {!isIOS && deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className="w-full py-3 bg-gradient-to-r from-base-blue to-success-green hover:opacity-90 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <Download size={20} />
                                Install App
                            </button>
                        )}

                        {/* Fallback button for development mode */}
                        {!isIOS && !deferredPrompt && import.meta.env.DEV && (
                            <div>
                                <button
                                    onClick={() => {
                                        alert('In development mode, install via:\n\n1. Click Chrome menu (⋮)\n2. Click "Install FitAI..."\n\nOR deploy to production for full PWA install!')
                                        console.log('💡 Install manually via Chrome menu > Install FitAI')
                                    }}
                                    className="w-full py-3 bg-gradient-to-r from-base-blue to-success-green hover:opacity-90 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <Download size={20} />
                                    Install App (Dev Mode)
                                </button>
                                <p className="text-xs text-gray-500 mt-2 text-center">
                                    Deploy to see native install prompt
                                </p>
                            </div>
                        )}

                        {/* Dismiss button for iOS */}
                        {isIOS && (
                            <button
                                onClick={handleDismiss}
                                className="w-full py-2 text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Maybe later
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
