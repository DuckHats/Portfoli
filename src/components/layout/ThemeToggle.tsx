import { Moon, Sun } from 'lucide-react'
import { useMessages } from '@/lib/i18n'
import { toggleTheme, useTheme } from '@/lib/theme'

export function ThemeToggle() {
  const { a11y } = useMessages()
  const theme = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={a11y.switchTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/10"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  )
}
