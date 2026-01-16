import { Home, Calendar, Camera, Trophy, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Plan', path: '/plan' },
    { icon: Camera, label: 'Workout', path: '/workout' },
    { icon: Trophy, label: 'Achievements', path: '/achievements' },
    { icon: User, label: 'Profile', path: '/profile' }
]

export function BottomNav() {
    const location = useLocation()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-base-blue/20 safe-area-bottom">
            <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto px-4">
                {navItems.map(({ icon: Icon, label, path }) => {
                    const isActive = location.pathname === path

                    return (
                        <Link
                            key={path}
                            to={path}
                            className={cn(
                                'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200',
                                isActive
                                    ? 'text-base-blue'
                                    : 'text-gray-400 hover:text-white'
                            )}
                        >
                            <div className="relative">
                                <Icon
                                    size={24}
                                    className={cn(
                                        'transition-transform duration-200',
                                        isActive && 'scale-110'
                                    )}
                                />
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-base-blue rounded-full animate-pulse" />
                                )}
                            </div>
                            <span className={cn(
                                'text-xs font-medium transition-all duration-200',
                                isActive && 'scale-105'
                            )}>
                                {label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
