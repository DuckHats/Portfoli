import { Check, ChevronDown, Plus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { FormField } from '../ui/FormField'
import { inputStyles } from '../ui/inputStyles'

export interface ChoiceOption {
  value: string
  label: string
  description: string
  Icon: LucideIcon
}

/**
 * One answer out of a few, as large cards over real radio inputs (arrow keys move, Space picks).
 * `onChange` also says whether the pick came from a pointer, so the brief can move on by itself
 * for a click without jumping ahead while a keyboard user is still browsing the options.
 */
export function ChoiceCards({
  name,
  options,
  value,
  onChange,
  error,
}: {
  name: string
  options: ChoiceOption[]
  value: string
  onChange: (value: string, byPointer: boolean) => void
  error?: string
}) {
  const pointer = useRef(false)
  return (
    <div>
      {/* Only notes how the next pick happens; the radios inside do all the interaction. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="grid gap-3 sm:grid-cols-2"
        onPointerDown={() => (pointer.current = true)}
        onKeyDown={() => (pointer.current = false)}
      >
        {options.map(({ value: option, label, description, Icon }) => {
          const checked = value === option
          return (
            <label
              key={option}
              className={`group relative flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-[border-color,background-color,transform] duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent active:scale-[0.98] ${
                checked
                  ? 'border-accent bg-accent/10'
                  : 'border-ink/20 bg-surface hover:border-ink/50'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option, pointer.current)}
                required
                aria-describedby={error ? `${name}-error` : undefined}
                className="sr-only"
              />
              <span
                aria-hidden
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${
                  checked ? 'bg-accent text-on-accent' : 'bg-ink/10 text-ink'
                }`}
              >
                <Icon size={20} />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">{label}</span>
                <span className="mt-0.5 block text-sm text-muted">{description}</span>
              </span>
              <Check
                aria-hidden
                size={18}
                className={`absolute right-4 top-4 text-accent-text transition-[opacity,transform] duration-200 ${
                  checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                }`}
              />
            </label>
          )
        })}
      </div>
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="error-in mt-2 text-sm text-red-700 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  )
}

/** Any number of answers, as pills over real checkboxes. */
export function ChipGroup({
  legend,
  options,
  values,
  onChange,
}: {
  legend: string
  options: { value: string; label: string }[]
  values: string[]
  onChange: (values: string[]) => void
}) {
  const toggle = (option: string) =>
    onChange(values.includes(option) ? values.filter((v) => v !== option) : [...values, option])
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map(({ value, label }) => {
          const checked = values.includes(value)
          return (
            <label
              key={value}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                checked
                  ? 'border-ink bg-ink text-canvas'
                  : 'border-ink/25 bg-surface hover:border-ink/60'
              }`}
            >
              <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={() => toggle(value)}
                className="sr-only"
              />
              {checked ? <Check aria-hidden size={15} /> : <Plus aria-hidden size={15} />}
              {label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/** A dropdown with the same look as the text fields. */
export function SelectField({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  error,
}: {
  id: string
  label: string
  placeholder: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <FormField id={id} label={label} error={error} required>
      <select
        id={id}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputStyles} cursor-pointer appearance-none pr-11 ${value ? '' : 'text-muted'}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
      />
    </FormField>
  )
}
