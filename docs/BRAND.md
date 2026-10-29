# Brand and design system

## Positioning

A small, direct software studio presented as a stage: directed light, full-bleed acts of colour
and work that floats in depth. The silhouette in the logo gives the mood; the copy never plays a
role or tells a story. Adult voice, never childish. The red of the original identity is kept.

## Voice

- Short, concrete sentences. Prefer "custom software for businesses that have to work" over generic
  claims ("end-to-end solutions", "passion", "cutting-edge").
- Headlines carry their own weight: no emphasised single word, no eyebrow labels above headings.
- Never invent clients, numbers, prices or testimonials. Mark gaps with `TODO(client)`.
- Every string exists in ca, es and en with the same meaning. No `*` markers anywhere (tested).

## Colour and acts

All colours are tokens (`src/index.css`). Never hardcode hex values; use the Tailwind names.
`test/contrast.test.ts` enforces WCAG AA for every theme and every act.

The page is built in **acts**: full-bleed sections with their own palette, declared with
`data-act` (`paper`, `ink`, `red`). An act redefines the tokens locally, so `bg-canvas text-ink`
always does the right thing and components never know which act they are in. Every top-level block
declares its act (paper included) because the sticky header takes the colours of the act under it
(`hooks/useActiveAct`).

| Act     | Light theme                    | Dark theme          | Used for                           |
| ------- | ------------------------------ | ------------------- | ---------------------------------- |
| `paper` | `#F3EFE6` paper, `#0D0D0C` ink | `#1E1D1A` warm grey | Reading content, projects, team    |
| `ink`   | `#0D0D0C` stage, paper text    | same                | Hero, page headers, method, footer |
| `red`   | `#E63946`, ink text            | same                | Services, closing call to action   |

Inside the red act the "accent" is ink (buttons, graphics); white on `#E63946` is only 4.2:1.
Home rhythm: ink → paper → red → paper → ink → paper → red → ink.

## Typography

- **Archivo** (variable) at its widest (`font-stretch: 125%`), black weight, uppercase, for
  headlines and the wordmark; set on `h1`-`h3` and `.font-display`. Phones narrow it to 100% so
  long Catalan and Spanish words fit.
- **Inter** (variable) for body text, measure under 70ch. `.label` is Inter in small spaced
  capitals for indexes and categories.

## Components and layout

- `Section` (`act`, `label`, oversized `Headline` title) and `PageHeader` (always the ink act) are
  the two building blocks. Rounded 16px panels (`bg-surface ring-1 ring-ink/10`) group content on
  paper; pills (`rounded-full`) for buttons and tags.
- **Hero**: the featured project (`featuredProject`, Sushi Sudoku) floats in a browser window in
  3D perspective, with its caption lifted off the window in depth.
- **Services**: giant type rows that are real disclosure buttons; the open one faces the viewer.
- **Projects**: a stack of pages (`sections/ProjectStack`) on wide screens, a list on phones.
- **Method**: four large outlined numerals on the dark stage. **Team**: a strip of portraits where
  the active one widens and turns to colour (`sections/TeamStrip`); a list on phones.
- **Keyboard**: on the home page ←/→ (or J/K) jump between sections (`hooks/useSectionKeys`).
- The logo is drawn as a mask (`.mark-mask`) so it takes the act's ink colour, and appears as a
  large faint silhouette on page headers and the closing act.
- Notices are tinted panels; never a coloured left border. The cookie notice is a small dark card.
- Shadows exist only where they explain depth: windows that float in 3D and floating cards.

## Motion

Library: `motion` (Framer Motion), loaded through `components/motion/MotionProvider`: `LazyMotion`
with the `domMax` features in a lazy chunk, `m.*` components only (`strict`), and
`MotionConfig reducedMotion="user"`. Only transform and opacity are animated.

- Headlines turn up word by word (`ui/Headline`, CSS `.line-up`), so the LCP text never waits for
  script.
- Hero: the window tilts toward the mouse (springs, at most 10°) and settles flat as you scroll; a
  soft light follows the pointer. Touch gets the scroll settle only; reduced motion, nothing.
- `ui/Reveal` tips content up in depth when it first scrolls into view; the method steps turn in
  from the side; covered project pages sink back in the stack.
- Page transitions: the old page sinks back and the new one rises (`Layout`, `AnimatePresence`);
  scroll and focus reset once the old page has left. The first load is not animated.
- Primary calls to action are magnetic (`ui/Magnetic`, mouse only). Form results animate in.
- The technology marquee and the carousel keep their pause rules (hover, focus, off screen,
  reduced motion).
