import { Fragment } from 'react'
import type { ElementType } from 'react'

interface HeadlineProps {
  text: string
  as?: ElementType
  id?: string
  className?: string
  /** Seconds before the first word turns up. */
  delay?: number
}

/**
 * Oversized headline whose words turn up one after another (`.line-up` in index.css). CSS only,
 * so the largest text on the page paints without waiting for any script.
 */
export function Headline({ text, as: Tag = 'h1', id, className = '', delay = 0 }: HeadlineProps) {
  const words = text.split(' ')
  return (
    <Tag id={id} className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 && ' '}
          <span
            className="line-up inline-block"
            style={{ animationDelay: `${delay + index * 0.06}s` }}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
