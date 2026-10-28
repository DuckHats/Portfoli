import { Fragment } from 'react'
import { EMPHASIS_SPLIT, isEmphasis } from '@/lib/emphasis'

/** Renders `*word*` markers as <em>. Plain text passes through untouched. */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text
        .split(EMPHASIS_SPLIT)
        .map((part, index) =>
          isEmphasis(part) ? (
            <em key={index}>{part.slice(1, -1)}</em>
          ) : (
            <Fragment key={index}>{part}</Fragment>
          ),
        )}
    </>
  )
}
