import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { useMessages } from '@/lib/i18n'
import type { ValidationKey } from '@/lib/schemas'
import { CAREER_ROLES, LIMITS, careersSchema, fieldErrors } from '@/lib/schemas'
import { buttonStyles } from '../ui/buttonStyles'
import { FormField } from '../ui/FormField'
import { inputStyles } from '../ui/inputStyles'
import { ConsentNote } from './ConsentNote'
import { FormStatus } from './FormStatus'
import { Honeypot } from './Honeypot'

export function CareersForm() {
  const { careers, validation } = useMessages()
  const copy = careers.form
  const { status, submit } = useFormSubmit('/api/submit-join-us')
  const [errors, setErrors] = useState<Record<string, ValidationKey>>({})
  const [role, setRole] = useState('')
  const [links, setLinks] = useState<string[]>([''])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const data = new FormData(formElement)
    const cv = data.get('cv')
    const cleanLinks = links.map((l) => l.trim()).filter(Boolean)

    const parsed = careersSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      role: data.get('role'),
      customRole: data.get('customRole') ?? undefined,
      links: cleanLinks,
      message: data.get('message'),
      website: data.get('website') ?? undefined,
    })
    const next: Record<string, ValidationKey> = parsed.success ? {} : fieldErrors(parsed.error)
    if (cv instanceof File && cv.size > 0) {
      if (cv.type !== 'application/pdf') next.cv = 'fileType'
      else if (cv.size > LIMITS.cvBytes) next.cv = 'fileSize'
    }
    setErrors(next)
    if (Object.keys(next).length > 0) return

    data.delete('links')
    data.append('links', JSON.stringify(cleanLinks))
    if (await submit(data)) {
      formElement.reset()
      setRole('')
      setLinks([''])
    }
  }

  const error = (field: string) => (errors[field] ? validation[errors[field]] : undefined)
  const aria = (field: string) => ({
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `${field}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

      <FormField id="role" label={copy.role} error={error('role')}>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputStyles}
          {...aria('role')}
        >
          <option value="">{copy.rolePlaceholder}</option>
          {CAREER_ROLES.map((key) => (
            <option key={key} value={key}>
              {copy.roles[key]}
            </option>
          ))}
        </select>
      </FormField>

      {role === 'other' && (
        <FormField id="customRole" label={copy.otherRole} error={error('customRole')}>
          <input
            id="customRole"
            name="customRole"
            type="text"
            className={inputStyles}
            {...aria('customRole')}
          />
        </FormField>
      )}

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">{copy.links}</legend>
        <div className="space-y-2">
          {links.map((value, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={value}
                aria-label={`${copy.links} ${index + 1}`}
                placeholder={copy.linkPlaceholder}
                onChange={(e) => setLinks(links.map((l, i) => (i === index ? e.target.value : l)))}
                className={inputStyles}
              />
              {links.length > 1 && (
                <button
                  type="button"
                  aria-label={copy.removeLink}
                  onClick={() => setLinks(links.filter((_, i) => i !== index))}
                  className={buttonStyles({ variant: 'secondary' })}
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              )}
            </div>
          ))}
        </div>
        {error('links') && (
          <p role="alert" className="mt-1.5 text-sm text-red-700 dark:text-red-400">
            {error('links')}
          </p>
        )}
        {links.length < LIMITS.links && (
          <button
            type="button"
            onClick={() => setLinks([...links, ''])}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <Plus size={14} aria-hidden /> {copy.addLink}
          </button>
        )}
      </fieldset>

      <FormField id="cv" label={copy.cv} hint={copy.cvHint} error={error('cv')}>
        <input
          id="cv"
          name="cv"
          type="file"
          accept="application/pdf"
          className={`${inputStyles} file:mr-3 file:rounded file:border-0 file:bg-ink/5 file:px-3 file:py-1.5 file:text-sm`}
          {...aria('cv')}
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
      <button
        type="submit"
        disabled={status === 'submitting'}
        className={buttonStyles({ size: 'lg' })}
      >
        {status === 'submitting' ? copy.sending : copy.submit}
      </button>
      <FormStatus status={status} success={copy.success} error={copy.error} />
    </form>
  )
}
