import { useMessages } from '@/lib/i18n'

/** Explains the asterisk on required labels (the controls also carry `required`). */
export function RequiredNote() {
  const { a11y } = useMessages()
  return (
    <p className="text-sm text-muted">
      <span aria-hidden className="mr-1 text-accent-text">
        *
      </span>
      {a11y.requiredNote}
    </p>
  )
}
