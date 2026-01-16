import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
    children: ReactNode
}

const pageVariants = {
    initial: {
        opacity: 0,
        x: 20
    },
    enter: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        x: -20,
        transition: {
            duration: 0.2,
            ease: 'easeIn'
        }
    }
}

export function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    )
}
