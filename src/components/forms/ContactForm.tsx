import { useState } from 'react'
import type { FormEvent } from 'react'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useMessages } from '@/lib/i18n'
import type { ValidationKey } from '@/lib/schemas'
import { contactSchema, fieldErrors } from '@/lib/schemas'
import { SubmitButton } from '../ui/SubmitButton'
import { FormField } from '../ui/FormField'
import { inputStyles } from '../ui/inputStyles'
import { ConsentNote } from './ConsentNote'
import { FormStatus } from './FormStatus'
import { Honeypot } from './Honeypot'

export function ContactForm() {
  const { contact, validation } = useMessages()
  const { form: copy } = contact
  const { status, submit } = useFormSubmit('/api/submit-contact')
  const [errors, setErrors] = useState<Record<string, ValidationKey>>({})

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const data = new FormData(formElement)
    const parsed = contactSchema.safeParse(Object.fromEntries(data))
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error))
      return
    }
    setErrors({})
    if (await submit(data)) formElement.reset()
  }

  const error = (field: string) => (errors[field] ? validation[errors[field]] : undefined)
  const aria = (field: string) => ({
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <FormField id="name" label={copy.name} error={error('name')}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={copy.namePlaceholder}
          className={inputStyles}
          {...aria('name')}
        />
      </FormField>
      <FormField id="email" label={copy.email} error={error('email')}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          className={inputStyles}
          {...aria('email')}
        />
      </FormField>
      <FormField id="message" label={copy.message} error={error('message')}>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder={copy.messagePlaceholder}
          className={inputStyles}
          {...aria('message')}
        />
      </FormField>
      <ConsentNote />
      <SubmitButton status={status} label={copy.submit} sendingLabel={copy.sending} />
      <FormStatus status={status} success={copy.success} error={copy.error} />
    </form>
  )
}
