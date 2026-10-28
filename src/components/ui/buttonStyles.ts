const base =
  'inline-flex items-center justify-center gap-2 border-2 border-ink font-semibold transition duration-150 ease-out disabled:pointer-events-none disabled:opacity-60'

const sizes = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base',
} as const

// Primary and secondary share the hard shadow: it lifts toward the pointer and presses flat on click.
const lift =
  'shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard active:translate-x-0 active:translate-y-0 active:shadow-none'

const variants = {
  primary: `bg-accent text-on-accent ${lift}`,
  secondary: `bg-canvas text-ink ${lift}`,
  ghost: 'border-transparent text-ink hover:border-ink',
} as const

export interface ButtonStyleProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const buttonStyles = ({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) =>
  `${base} ${sizes[size]} ${variants[variant]}`
