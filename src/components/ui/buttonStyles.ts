const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-60'

const sizes = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
} as const

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent/90',
  secondary: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/5',
  ghost: 'text-ink hover:bg-ink/5',
} as const

export interface ButtonStyleProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const buttonStyles = ({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) =>
  `${base} ${sizes[size]} ${variants[variant]}`
