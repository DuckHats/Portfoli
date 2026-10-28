import { useState } from 'react'

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

/** POSTs multipart form data and tracks the request state. */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const submit = async (data: FormData): Promise<boolean> => {
    setStatus('submitting')
    try {
      const response = await fetch(endpoint, { method: 'POST', body: data })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      setStatus('success')
      return true
    } catch {
      setStatus('error')
      return false
    }
  }

  return { status, submit, reset: () => setStatus('idle') }
}
