/**
 * Headlines mark their emphasised words as `*word*`. Like Markdown, the opening asterisk must be
 * followed by a non-space and the closing one preceded by a non-space, so stray asterisks
 * ("2 * 3", "**") stay plain text.
 */
const SOURCE = String.raw`\*(?=\S)[^*]+?(?<=\S)\*`

export const EMPHASIS_SPLIT = new RegExp(`(${SOURCE})`, 'g')
const WHOLE = new RegExp(`^${SOURCE}$`)
const GLOBAL = new RegExp(SOURCE, 'g')

export const isEmphasis = (part: string) => WHOLE.test(part)

export const stripEmphasis = (text: string) => text.replace(GLOBAL, (match) => match.slice(1, -1))

export const countEmphasis = (text: string) => (text.match(GLOBAL) ?? []).length
