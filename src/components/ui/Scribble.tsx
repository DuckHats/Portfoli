interface ScribbleProps {
  variant: 'underline' | 'arrow'
  className?: string
}

/**
 * Single-stroke hand-drawn mark, decorative only. The underline draws itself once on load
 * (`.scribble-path` in index.css); reduced motion shows it already drawn.
 */
export function Scribble({ variant, className = '' }: ScribbleProps) {
  const common = {
    fill: 'none',
    stroke: 'rgb(var(--color-accent))',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    pathLength: 1,
  } as const

  if (variant === 'arrow') {
    return (
      <svg aria-hidden viewBox="0 0 120 70" className={className}>
        <path {...common} strokeWidth={5} d="M6 62 C 20 12, 70 4, 108 30" />
        <path {...common} strokeWidth={5} d="M88 14 L110 31 L84 42" />
      </svg>
    )
  }
  return (
    <svg aria-hidden viewBox="0 0 320 18" preserveAspectRatio="none" className={className}>
      <path
        {...common}
        className="scribble-path"
        strokeWidth={6}
        d="M3 12 C 54 3, 98 15, 158 8 S 262 5, 317 11"
      />
    </svg>
  )
}
