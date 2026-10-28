const base =
  'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-60'

const sizes = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
} as const

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent/90',
  secondary: 'border border-line bg-surface text-ink hover:border-ink/40',
  ghost: 'text-ink hover:bg-ink/5',
} as const

export interface ButtonStyleProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const buttonStyles = ({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) =>
  `${base} ${sizes[size]} ${variants[variant]}`
