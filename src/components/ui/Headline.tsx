import { Fragment } from 'react'
import type { ElementType } from 'react'

interface HeadlineProps {
  text: string
  as?: ElementType
  id?: string
  className?: string
  /** Seconds before the first word turns up. */
  delay?: number
  /** Words lift and take the accent under the mouse (hero only). */
  lively?: boolean
}

/**
 * Oversized headline whose words turn up one after another (`.line-up` in index.css). CSS only,
 * so the largest text on the page paints without waiting for any script.
 */
export function Headline({
  text,
  as: Tag = 'h1',
  id,
  className = '',
  delay = 0,
  lively = false,
}: HeadlineProps) {
  const words = text.split(' ')
  return (
    <Tag id={id} className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 && ' '}
          {/* The outer span takes the hover lift; the inner one keeps the entrance animation. */}
          <span className={lively ? 'word-lift' : 'inline-block'}>
            <span
              className="line-up inline-block"
              style={{ animationDelay: `${delay + index * 0.06}s` }}
            >
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
