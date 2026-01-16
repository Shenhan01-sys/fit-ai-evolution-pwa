import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import { BottomNav } from './components/BottomNav'
import { InstallPrompt } from './components/InstallPrompt'
import { LandingPage } from './pages/LandingPage'
import { HomePage } from './pages/HomePage'
import { WorkoutPage } from './pages/WorkoutPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PlanPage } from './pages/PlanPage'
import { AchievementsPage } from './pages/AchievementsPage'

// Placeholder pages (to be implemented)
function ProfilePage() {
    const { user, logout } = usePrivy()

    return (
        <div className="min-h-screen bg-slate-deep pb-24 pt-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
                <div className="gradient-card rounded-2xl p-6 mb-4">
                    <p className="text-gray-400 mb-2">Email</p>
                    <p className="text-white font-semibold">{user?.email?.address || 'Not set'}</p>
                </div>
                <div className="gradient-card rounded-2xl p-6 mb-4">
                    <p className="text-gray-400 mb-2">Wallet Address</p>
                    <p className="text-white font-mono text-sm break-all">
                        {user?.wallet?.address || 'No wallet'}
                    </p>
                </div>
                <button
                    onClick={() => logout()}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { authenticated, ready } = usePrivy()

    if (!ready) {
        return (
            <div className="min-h-screen bg-slate-deep flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-base-blue border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!authenticated) {
        return <Navigate to="/home" replace />
    }

    return <>{children}</>
}

function AppRoutes() {
    const { authenticated, ready } = usePrivy()

    if (!ready) {
        return (
            <div className="min-h-screen bg-slate-deep flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-base-blue border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <>
            <Routes>
                {/* Landing Page - Public */}
                <Route path="/" element={<LandingPage />} />

                {/* Onboarding - Public */}
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Home - Protected */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/plan"
                    element={
                        <ProtectedRoute>
                            <PlanPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/workout"
                    element={
                        <ProtectedRoute>
                            <WorkoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/achievements"
                    element={
                        <ProtectedRoute>
                            <AchievementsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>

            {authenticated && <BottomNav />}
            <InstallPrompt />
        </>
    )
}

export function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}
