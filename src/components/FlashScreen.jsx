import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './FlashScreen.css'

export default function FlashScreen({ onFinish }) {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence onExitComplete={onFinish}>
            {visible && (
                <motion.div
                    className="flash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <img src="/icons/logo.svg" alt="Anatomy of Flight" className="flash-logo" />
                </motion.div>
            )}
        </AnimatePresence>
    )
}