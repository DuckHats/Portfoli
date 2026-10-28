# Brand and design system

## Positioning

A small, direct software studio. Warm and editorial, never childish: say what we do, for whom and
how, with a human voice. The duck lives in the logo, used as a large soft silhouette rather than a
mascot; no animal metaphors in the copy.

## Voice

- Short, concrete sentences. Prefer "we build the software your business actually needs" over
  generic claims ("end-to-end solutions", "passion", "cutting-edge").
- One or two emphasised words per headline, marked as `*word*` in the locale files (rendered in
  italic and the accent colour by `Emphasis`). Never emphasise SEO titles.
- Never invent clients, numbers, prices or testimonials. Mark gaps with `TODO(client)`.
- Every string exists in ca, es and en with the same meaning and the same number of `*` markers.

## Colour

All colours are tokens (`src/index.css`, light and dark). Never hardcode hex values; use the
Tailwind names. `test/contrast.test.ts` enforces WCAG AA for every text pairing.

| Token         | Light     | Dark      | Use                                   |
| ------------- | --------- | --------- | ------------------------------------- |
| `canvas`      | `#F6F1E7` | `#0F1512` | Page background (warm paper)          |
| `surface`     | `#FBF8F1` | `#161E1A` | Inputs, browser frames                |
| `tint`        | `#EAE2D0` | `#1B2520` | Alternate sections, footer, blocks    |
| `ink`         | `#17140F` | `#EDE8DC` | Text                                  |
| `muted`       | `#5E574B` | `#A3AB9F` | Secondary text                        |
| `line`        | `#DDD5C4` | `#26312B` | Dividers                              |
| `accent`      | `#1F4D3A` | `#7FC4A0` | Primary action, links, emphasis       |
| `accent-soft` | `#DCE8DF` | `#1E3329` | Depth blocks behind frames, logo mark |
| `on-accent`   | `#F6F1E7` | `#0F1512` | Text on the accent colour             |

Forest green is the only accent.

## Typography

- **Fraunces** (variable, upright and italic) for headlines, numerals and the wordmark: weight 500,
  tight tracking. Set globally on `h1`-`h3`.
- **Inter** (variable) for everything else.
- No monospace, no all-caps labels (language codes excepted), no decorative numbering like 01/02.

## Components and layout

- Pill buttons (`buttonStyles`); secondary actions are underlined links (`.link-underline`).
- Tinted blocks and hairlines instead of bordered card grids; asymmetric rhythm (staggered
  columns, alternating showcase sides).
- **Project showcase** (the signature piece): real screenshots inside a browser frame with a live
  carousel, a soft block behind it and a gentle scroll parallax.
- Team portraits use an arch crop and a shared grayscale treatment (colour on hover).
- The logo mark is shown as a silhouette (`.mark-mask`) in hero and footer call-to-action.

## Motion

Only opacity and transform, 300-700 ms, ease-out: hero entrance (`animate-rise`), `Reveal`,
showcase parallax and cross-fade, and the technology marquee. Everything stops or shows its final
state under `prefers-reduced-motion`, and the carousel pauses on hover, focus and when off screen.
