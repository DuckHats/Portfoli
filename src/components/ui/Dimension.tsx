interface DimensionProps {
  label: string
  className?: string
}

/**
 * Drafting-style dimension mark: a line with end ticks and a monospaced label. Decorative only.
 * The line draws itself once on load (`.draw-line` in index.css); reduced motion shows it drawn.
 */
export function Dimension({ label, className = '' }: DimensionProps) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="draw-line relative block h-px flex-1 bg-accent before:absolute before:-top-1.5 before:left-0 before:h-3 before:w-px before:bg-accent after:absolute after:-top-1.5 after:right-0 after:h-3 after:w-px after:bg-accent" />
      <span className="meta shrink-0">{label}</span>
    </div>
  )
}
