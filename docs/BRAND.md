# Brand and design system

## Positioning

A small, direct software studio shown as an engineer's workbook: the design exposes the process
(measure, draw, test, deliver) instead of describing it. Adult voice, never childish. The red of the
original identity is kept as the single accent. The duck lives in the logo, used as a silhouette
rather than a mascot; no animal metaphors in the copy.

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
| `canvas`      | `#EFEBE3` | `#14130F` | Page background                             |
| `surface`     | `#F7F4EE` | `#1D1C17` | Inputs, browser frames                      |
| `tint`        | `#E4DFD4` | `#26241E` | Alternate sections, page headers            |
| `ink`         | `#14130F` | `#EFEBE3` | Text and borders                            |
| `muted`       | `#58544B` | `#ACA79C` | Secondary text                              |
| `line`        | `#BEB8AB` | `#4A473F` | Hairline dividers between rows              |
| `accent`      | `#E63946` | `#FF5964` | Buttons, marks, graphics (never small text) |
| `accent-text` | `#B01E2B` | `#FF8A92` | Accent colour for text and links            |
| `on-accent`   | `#080704` | `#14130F` | Text on the accent colour                   |
| `inverse`     | `#14130F` | `#1D1C17` | Call-to-action band and footer              |
| `on-inverse`  | `#EFEBE3` | `#EFEBE3` | Text on `inverse`                           |

White text on `#E63946` is only 4.2:1, so text on the accent is ink.

## Typography

- **Archivo** (variable, width axis at 72%) for headlines and the wordmark: extra bold, set globally
  on `h1`-`h3` and on `.font-display`. Headlines are very large; sentence case, balanced wrapping.
- **Inter** (variable) for body text, measure under 70ch.
- **JetBrains Mono** only for the annotation layer (`.meta`: section indexes, dimension labels,
  tags). Small, uppercase, muted. Never for body text.

## Components and layout

- Square corners, 1px ink rules, no shadows. Depth comes from scale and overlap.
- **Sheet**: the home hero sits on a faint 12-column grid (`.sheet-grid`, desktop only) and the
  featured project overlaps the headline column.
- **Dimension** (`ui/Dimension`): a drafting dimension line with end ticks and a mono label; draws
  itself once. Used under the hero and every page title. Decorative.
- **Section index** (`Section no="02 / 06"`): sits in the margin, aria-hidden.
- Services are an index table (`.row-shift`), the method is a vertical timeline with accent nodes,
  the team is a list with small greyscale portraits. No grids of identical cards.
- Buttons (`buttonStyles`): primary fills ink on hover, secondary wipes ink in from the left.
- **Project showcase**: real screenshots inside a browser frame with a live carousel; the home hero
  features Sushi Sudoku (`featuredProject`), the others follow with a gentle parallax.
- **Keyboard**: on the home page ←/→ (or J/K) jump between sections (`hooks/useSectionKeys`).
- **Colour with purpose**: the accent fills the technology marquee band and the timeline nodes, and
  is the primary button. Nothing else is filled red.
- Notices are a tint block with a full ink border; never a coloured left border.
- The cookie notice is a small card in the bottom-left corner.
- The footer ends with the wordmark oversized and cropped by the bottom edge (decorative).
- The logo mark is a silhouette (`.mark-mask`) on the call-to-action band.
- Browser surfaces are themed too: selection colour, caret, thin scrollbar, focus ring (3px accent).

## Motion

Only opacity and transform, ease-out. The hero entrance and the dimension line drawing are the
authored moments; then scroll reveals (`ui/Reveal`), the row shift on index tables, page crossfade
through the View Transitions API (`@view-transition`, ignored where unsupported), the carousel
cross-fade, the showcase parallax and the technology marquee. Everything stops or shows its final
state under `prefers-reduced-motion`, and the carousel pauses on hover, focus and when off screen.
