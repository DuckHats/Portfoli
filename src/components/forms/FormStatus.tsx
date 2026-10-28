import type { SubmitStatus } from '@/hooks/useFormSubmit'

interface FormStatusProps {
  status: SubmitStatus
  success: string
  error: string
}

export function FormStatus({ status, success, error }: FormStatusProps) {
  return (
    <div aria-live="polite" className="min-h-6 text-sm">
      {status === 'success' && <p className="text-green-700 dark:text-green-400">{success}</p>}
      {status === 'error' && <p className="text-red-700 dark:text-red-400">{error}</p>}
    </div>
  )
}
