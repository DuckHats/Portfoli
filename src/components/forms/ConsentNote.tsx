import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'

export function ConsentNote() {
  const { consent } = useMessages()
  return (
    <p className="text-sm text-muted">
      {consent.prefix}{' '}
      <AppLink to="privacy" className="text-ink underline underline-offset-2">
        {consent.link}
      </AppLink>
      .
    </p>
  )
}
