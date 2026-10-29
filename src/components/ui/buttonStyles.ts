const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60'

const sizes = {
  md: 'h-10 px-5 text-sm',
  lg: 'h-14 px-8 text-base',
} as const

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-ink hover:text-canvas',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-canvas',
  ghost: 'text-ink hover:bg-ink/10',
} as const

export interface ButtonStyleProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const buttonStyles = ({ variant = 'primary', size = 'md' }: ButtonStyleProps = {}) =>
  `${base} ${sizes[size]} ${variants[variant]}`
