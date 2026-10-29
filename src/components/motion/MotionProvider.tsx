import { LazyMotion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

const loadFeatures = () => import('./features').then((module) => module.default)

/**
 * One place for motion settings: features load lazily (`m.*` components render their initial
 * style until then) and `reducedMotion="user"` drops transform animations for people who ask.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ type: 'spring', stiffness: 140, damping: 22 }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
