import { AnimatePresence, m } from 'motion/react'
import type { SubmitStatus } from '@/hooks/useFormSubmit'
import { buttonStyles } from './buttonStyles'

interface SubmitButtonProps {
  status: SubmitStatus
  label: string
  sendingLabel: string
}

/**
 * The form's submit button as a small status display: label, then a spinner while sending, a
 * check that draws itself on success and a short shake on error. The text announced to screen
 * readers stays the label or "sending"; the result itself is announced by FormStatus.
 */
export function SubmitButton({ status, label, sendingLabel }: SubmitButtonProps) {
  const sending = status === 'submitting'
  return (
    <m.button
      type="submit"
      disabled={sending}
      animate={status === 'error' ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className={`${buttonStyles({ size: 'lg' })} min-w-48 overflow-hidden`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={status === 'success' || sending ? status : 'idle'}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-2"
        >
          {sending && (
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            />
          )}
          {status === 'success' && (
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
              <m.path
                d="M4 12.5l5 5L20 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
            </svg>
          )}
          {sending ? sendingLabel : label}
        </m.span>
      </AnimatePresence>
    </m.button>
  )
}
