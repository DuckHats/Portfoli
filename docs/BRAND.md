# Brand and design system

## Positioning

A small, direct software studio. The tone is professional, concrete and calm: say what we do,
for whom, and how. No jokes in functional copy, no animal metaphors (the duck lives in the logo only).

## Voice

- Short sentences, active verbs, no hype ("passion", "magic", "disruptive").
- Never invent clients, numbers, prices or testimonials. Mark gaps with `TODO(client)`.
- Every string exists in ca, es and en with the same meaning.

## Colour

All colours are tokens (`src/index.css`), light and dark. Never hardcode hex values.

| Token     | Light     | Dark      | Use                   |
| --------- | --------- | --------- | --------------------- |
| `canvas`  | `#FAFAF9` | `#0B0D10` | Page background       |
| `surface` | `#FFFFFF` | `#12151A` | Cards, panels         |
| `ink`     | `#0F1115` | `#ECEEF1` | Text                  |
| `muted`   | `#5B616C` | `#969DA8` | Secondary text        |
| `line`    | `#E5E5E3` | `#262B33` | Borders               |
| `accent`  | `#1E40AF` | `#82A0FF` | Primary action, links |

One accent only. Text/background pairs must meet WCAG AA (enforced by axe in e2e).

## Typography

Inter Variable for text and headings (semibold, tight tracking), JetBrains Mono for small
labels and numbering. Headings do not exceed `text-6xl`; no all-caps display type.

## Components and motion

- Flat controls, 1px borders, small radius, visible `focus-visible` ring. No offset shadows,
  thick borders, rotations or decorative glyphs.
- Motion is limited to 150-250 ms fades and short translations (`Reveal`), always disabled
  under `prefers-reduced-motion`.
- Logo: the mark is rendered small and monochrome (`dark:invert` in dark mode).
