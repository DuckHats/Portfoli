import { m } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Content tips up into place, slightly turned away in depth, the first time it scrolls into view.
 * Only opacity and transform change, so it never shifts layout; with reduced motion the
 * transform is skipped and it simply fades in.
 */
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 48, rotateX: 14, transformPerspective: 1000 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay }}
      style={{ transformOrigin: '50% 100%' }}
    >
      {children}
    </m.div>
  )
}
