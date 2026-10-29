import type { Language } from '@/lib/languages'
import type { Messages } from './locales/ca'
import { ca } from './locales/ca'
import { en } from './locales/en'
import { es } from './locales/es'

export type { Messages }

export const messages: Record<Language, Messages> = { ca, es, en }

type Leaves<T, P extends string = ''> = T extends string
  ? P
  : T extends readonly unknown[]
    ? never
    : { [K in keyof T & string]: Leaves<T[K], P extends '' ? K : `${P}.${K}`> }[keyof T & string]

/** Dot-separated path to any string in `Messages`, e.g. `home.hero.title`. */
export type MessageKey = Leaves<Messages>

export function resolveMessage(table: Messages, key: MessageKey): string {
  let node: unknown = table
  for (const part of key.split('.')) {
    node = (node as Record<string, unknown>)[part]
  }
  return typeof node === 'string' ? node : key
}

/** Replace `{name}` placeholders. */
export function interpolate(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`))
}
