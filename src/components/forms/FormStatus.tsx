import { AnimatePresence, m } from 'motion/react'
import type { SubmitStatus } from '@/hooks/useFormSubmit'

interface FormStatusProps {
  status: SubmitStatus
  success: string
  error: string
}

export function FormStatus({ status, success, error }: FormStatusProps) {
  const message =
    status === 'success'
      ? { text: success, className: 'bg-green-700/10 text-green-800 dark:text-green-300' }
      : status === 'error'
        ? { text: error, className: 'bg-red-700/10 text-red-800 dark:text-red-300' }
        : null
  return (
    <div aria-live="polite" className="min-h-6 text-sm">
      <AnimatePresence mode="wait">
        {message && (
          <m.p
            key={status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-xl px-4 py-3 font-medium ${message.className}`}
          >
            {message.text}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}
