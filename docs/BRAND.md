# Brand and design system

## Positioning

A small, direct software studio. Bold and exact, never childish: say what we do, for whom and how,
with an adult voice. The look keeps the original black, white and red identity (condensed
headlines, hard shadows) and drops the playful narrative. The duck lives in the logo, used as a
silhouette rather than a mascot; no animal metaphors in the copy.

## Voice

- Short, concrete sentences. Prefer "custom software for businesses that have to work" over generic
  claims ("end-to-end solutions", "passion", "cutting-edge").
- Headlines carry their own weight: no emphasised single word, no eyebrow labels above headings.
- Never invent clients, numbers, prices or testimonials. Mark gaps with `TODO(client)`.
- Every string exists in ca, es and en with the same meaning. No `*` markers anywhere (tested).

## Colour

All colours are tokens (`src/index.css`, light and dark). Never hardcode hex values; use the
Tailwind names. `test/contrast.test.ts` enforces WCAG AA for every text pairing.

| Token         | Light     | Dark      | Use                                         |
| ------------- | --------- | --------- | ------------------------------------------- |
| `canvas`      | `#FFFFFF` | `#0E0E0E` | Page background                             |
| `surface`     | `#FFFFFF` | `#171717` | Inputs, browser frames                      |
| `tint`        | `#F1F0EC` | `#202020` | Alternate sections, page headers            |
| `ink`         | `#0F0F0F` | `#F4F4F2` | Text, borders, hard shadows                 |
| `muted`       | `#55524C` | `#A8A6A0` | Secondary text                              |
| `line`        | `#D0CDC5` | `#424240` | Hairline dividers between rows              |
| `accent`      | `#E63946` | `#FF5964` | Buttons, marks, graphics (never small text) |
| `accent-text` | `#B8222F` | `#FF8A92` | Accent colour for text and links            |
| `on-accent`   | `#0F0F0F` | `#0E0E0E` | Text on the accent colour                   |
| `inverse`     | `#0F0F0F` | `#171717` | Call-to-action band and footer              |
| `on-inverse`  | `#FFFFFF` | `#F4F4F2` | Text on `inverse`                           |

White text on `#E63946` is only 4.2:1, so text on the accent is ink.

## Typography

- **Oswald** (variable) for headlines, numerals and the wordmark: bold, sentence case, balanced
  wrapping. Set globally on `h1`-`h3`.
- **Inter** (variable) for everything else, measure under 70ch.
- No monospace, no all-caps labels (language codes excepted), no decorative numbering. The method
  steps are numbered because they are a real sequence.

## Components and layout

- Square corners and 2px ink borders. The hard shadow (`shadow-hard`) is spent on three things:
  buttons, browser frames and team portraits. Everything else is separated by lines and tint.
- Buttons (`buttonStyles`) lift toward the pointer on hover and press flat on click.
- **Hero and project showcase** (the signature piece): real screenshots inside a browser frame with
  a live carousel; the home hero opens with the first project, the rest scroll with a gentle
  parallax.
- **Scribble** (`ui/Scribble`): one hand-drawn underline under the hero headline and one arrow
  towards the final call to action. Single clean stroke, decorative, nothing else is hand-drawn.
- **Keyboard**: on the home page ←/→ (or J/K) jump between sections (`hooks/useSectionKeys`). It
  never captures Tab, Space, modified keys or form fields.
- Team portraits are square, grayscale, colour on hover.
- The logo mark is a silhouette (`.mark-mask`) on the call-to-action band.
- Browser surfaces are themed too: selection colour, caret, thin scrollbar, focus ring (3px accent).

## Motion

Only opacity and transform, ease-out. One authored moment: the hero entrance and the underline
drawing itself. Then the carousel cross-fade, the scroll parallax of the showcase and the
technology marquee. Everything stops or shows its final state under `prefers-reduced-motion`, and
the carousel pauses on hover, focus and when off screen.
