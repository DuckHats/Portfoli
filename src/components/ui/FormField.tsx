import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}

export function FormField({ id, label, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {/* A focus line draws in from the left under whichever control has focus. */}
      <div className="relative after:pointer-events-none after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 focus-within:after:scale-x-100">
        {children}
      </div>
      {hint && !error && <p className="mt-1.5 text-sm text-muted">{hint}</p>}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="error-in mt-1.5 text-sm text-red-700 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}
