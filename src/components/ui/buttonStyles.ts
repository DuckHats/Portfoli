const base =
  'inline-flex items-center justify-center gap-2 border border-ink font-semibold transition duration-200 ease-out disabled:pointer-events-none disabled:opacity-60'

const sizes = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
} as const

// Fills slide in from the left edge; only the background position changes.
const fill =
  'bg-[linear-gradient(rgb(var(--color-ink)),rgb(var(--color-ink)))] bg-[length:0%_100%] bg-no-repeat hover:bg-[length:100%_100%] hover:text-canvas'

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-ink hover:text-canvas',
  secondary: `bg-transparent text-ink ${fill}`,
  ghost: 'border-transparent text-ink hover:border-ink',
} as const

export interface ButtonStyleProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const buttonStyles = ({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) =>
  `${base} ${sizes[size]} ${variants[variant]}`
