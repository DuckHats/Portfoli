import { LazyMotion, MotionConfig } from 'motion/react'
import type { FeatureBundle } from 'motion/react'
import type { ReactNode } from 'react'
import { loadFeatures } from './loadFeatures'

/**
 * One place for motion settings and `reducedMotion="user"` (transform animations drop for people
 * who ask). Built pages pass the engine already loaded (`features`), so nothing updates while the
 * prerendered HTML hydrates; elsewhere it loads lazily and `m.*` render their initial style until.
 */
export function MotionProvider({
  children,
  features = loadFeatures,
}: {
  children: ReactNode
  features?: FeatureBundle | typeof loadFeatures
}) {
  return (
    <LazyMotion features={features} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ type: 'spring', stiffness: 140, damping: 22 }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
}
