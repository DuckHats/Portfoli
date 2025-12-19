
# DUCKHATS Brand Guidelines

## Identity
**Name:** DUCKHATS  
**Tagline:** Desenvolupant amb passió i un toc d'humor  
**Established:** 2020  
**Contact:** hello@duckhats.cat  
**Social:** @duckhats

## Brand Philosophy
The "Duck" philosophy: Calm on the surface, paddling furiously underneath. We balance playful professionalism—where serious code meets creative chaos.

## Visual Language

### Logo
- Duck with a hat (Noir/Detective style)
- URL: `https://cdn.magicpatterns.com/uploads/3bs1BNudrejbo5etwijhrg/logo_(2).png`
- Usage: Centered, prominent, with subtle animations on load

### Typography
- **Display Font:** `Space Grotesk` - Bold, tall, impactful (headers, titles)
- **Body Font:** `Inter` - Clean, readable, modern (paragraphs, UI text)
- **Mono Font:** `monospace` - Technical, precise (code, dates, labels)

### Color Palette

#### Primary Colors
- **Black:** `#1a1a1a` - Main text, borders, strong elements
- **White:** `#f5f5f5` - Backgrounds, light surfaces

#### Accent Color
- **Red:** `#e63946` - Emphasis, hover states, CTAs, highlights

#### Neutral Grays
- `gray50`: `#f9fafb` - Lightest backgrounds
- `gray100`: `#f3f4f6` - Section backgrounds
- `gray200`: `#e5e7eb` - Borders, dividers
- `gray300`: `#d1d5db` - Subtle borders
- `gray400`: `#9ca3af` - Muted elements
- `gray500`: `#6b7280` - Secondary text
- `gray600`: `#4b5563` - Body text
- `gray700`: `#374151` - Dark text
- `gray800`: `#1f2937` - Very dark elements
- `gray900`: `#111827` - Near black

### Spacing & Layout
- **Section Padding:** `py-24` (vertical), `px-4 md:px-8` (horizontal)
- **Container Max Width:** `max-w-7xl` (wide), `max-w-4xl` (narrow content)
- **Consistent Gaps:** Use 4, 6, 8, 12, 16, 24 for spacing scale

## Motion Principles

### Animation Durations
- **Fast:** `0.3s` - Quick interactions, hover states
- **Normal:** `0.5s` - Standard transitions, reveals
- **Slow:** `0.8s` - Page loads, major state changes

### Easing Functions
- **Default:** `easeInOut` - Balanced, smooth
- **Smooth:** `easeOut` - Natural deceleration
- **Spring:** `circOut` - Playful, bouncy

### Animation Guidelines
- **Smoothness:** All transitions should feel fluid (spring physics preferred)
- **Playfulness:** Elements can scale, rotate slightly, or bounce
- **Context:** Animations should guide the user (e.g., project previews appearing as you scroll)
- **Purpose:** Motion should delight and guide, not just decorate

## Component Patterns

### Projects Showcase
- Split-screen layout (preview left, titles right)
- Fixed preview, scrolling titles
- Grayscale images with color on hover
- Bold, large typography for project names

### Team Members
- Grid layout (2 cols mobile, 4 cols desktop)
- Square aspect ratio images
- Grayscale to color on hover
- Bold borders with shadow effects
- Shadow changes color on hover (black → red)

### Navigation
- Pill-shaped navbar (rounded-full)
- White background with backdrop blur
- Centered, contained width
- Language toggle (CA / ES / EN)
- Smooth fade-in on home page (2s delay)

### Buttons & CTAs
- Black background, white text
- Red hover state
- Rectangular (no border-radius)
- Icon animations on hover
- Clear, action-oriented labels

## Content Tone

### Voice
- **Friendly:** Approachable, conversational
- **Professional:** Competent, reliable
- **Playful:** Witty, creative, not too serious
- **Confident:** Clear, direct, no jargon

### Language Support
- **Primary:** Catalan (CA)
- **Secondary:** Spanish (ES), English (EN)
- All content centralized in `config/content.config.ts`

## Technical Implementation

### Config Structure
```
config/
  ├── brand.config.ts    # Colors, typography, spacing, animations
  ├── content.config.ts  # All text content (i18n)
  └── team.config.ts     # Team member data
```

### Hooks
```
hooks/
  ├── useLanguage.ts     # Language state management
  └── useContent.ts      # Access translated content
```

### Usage Example
```typescript
import { brandConfig } from '../config/brand.config'
import { useContent } from '../hooks/useContent'

// In component:
const content = useContent()
style={{ color: brandConfig.colors.primary.black }}
```

## Design Principles

1. **Consistency:** Use config values, never hardcode colors/text
2. **Accessibility:** Semantic HTML, ARIA labels, keyboard navigation
3. **Responsiveness:** Mobile-first approach, test all breakpoints
4. **Performance:** Optimize images, lazy load, smooth animations
5. **Craft:** Every pixel placed with intention, every animation purposeful

## Don'ts

❌ Purple/blue gradients (unless specifically requested)  
❌ Random hover effects on non-interactive elements  
❌ Hardcoded colors or text  
❌ Generic layouts that ignore brand personality  
❌ Motion without purpose  
❌ Default exports (use named exports only)  
❌ Mixing light and dark themes (stick to light theme)

## Do's

✅ Use brandConfig for all colors  
✅ Use contentConfig for all text  
✅ Smooth, purposeful animations  
✅ Bold, distinctive layouts  
✅ Grayscale images with color on interaction  
✅ Strong borders and shadows  
✅ Clear visual hierarchy  
✅ Named exports throughout codebase
