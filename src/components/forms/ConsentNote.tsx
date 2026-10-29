import { useMessages } from '@/lib/i18n'
import { AppLink } from '../ui/AppLink'

export function ConsentNote() {
  const { consent } = useMessages()
  return (
    <p className="text-sm text-muted">
      {consent.prefix}{' '}
      <AppLink to="privacy" className="link-underline pb-0.5 text-ink">
        {consent.link}
      </AppLink>
      .
    </p>
  )
}
