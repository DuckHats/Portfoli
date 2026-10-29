/** Hours and minutes in Catalonia, whatever the visitor's own time zone. */
export const catalanTime = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(date)
