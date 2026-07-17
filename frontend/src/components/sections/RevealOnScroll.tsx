import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface RevealOnScrollProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function RevealOnScroll({ children, className = '', delayMs = 0 }: RevealOnScrollProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: delayMs / 1000 }}
    >
      {children}
    </motion.div>
  )
}
