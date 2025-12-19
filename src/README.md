
# DuckHats - Creative Digital Solutions

> Desenvolupant amb passió i un toc d'humor

A modern, multi-language portfolio website built with React, TypeScript, and Framer Motion. Features a distinctive design system with centralized configuration for branding, content, and styling.

## 🦆 Features

- **Multi-language Support:** Catalan (default), Spanish, English
- **Centralized Configuration:** All colors, text, and branding in config files
- **Smooth Animations:** Framer Motion for delightful interactions
- **Responsive Design:** Mobile-first approach
- **Manual Carousel:** Scroll or arrow-controlled hero section
- **Fixed Preview Projects:** Split-screen layout with sticky preview
- **Scroll-based Animations:** Team image scales on scroll

## 🎨 Design System

### Brand Colors
- **Primary:** Black (#1a1a1a), White (#f5f5f5)
- **Accent:** Red (#e63946)
- **Neutrals:** Gray scale from 50-900

### Typography
- **Display:** Space Grotesk (headers, bold statements)
- **Body:** Inter (readable, modern)
- **Mono:** Monospace (technical elements)

### Animation Principles
- **Fast:** 0.3s (interactions)
- **Normal:** 0.5s (transitions)
- **Slow:** 0.8s (page loads)

## 📁 Project Structure

```
duckhats/
├── config/
│   ├── brand.config.ts      # Colors, typography, spacing, animations
│   ├── content.config.ts    # All text content (CA/ES/EN)
│   └── team.config.ts       # Team member data
├── hooks/
│   ├── useLanguage.ts       # Language state management (Zustand)
│   └── useContent.ts        # Access translated content
├── components/
│   ├── Navbar.tsx           # Pill-shaped navigation
│   ├── Hero.tsx             # Manual carousel hero section
│   ├── Projects.tsx         # Split-screen project showcase
│   ├── About.tsx            # Company story
│   ├── Team.tsx             # Team photo with scroll animation
│   ├── Members.tsx          # Team member grid
│   ├── Footer.tsx           # Site footer
│   ├── FullScreenMenu.tsx   # Mobile/hamburger menu
│   └── JoinUs.tsx           # CTA section
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── TeamPage.tsx
│   ├── ProjectsPage.tsx
│   └── JoinUsPage.tsx
└── App.tsx                  # Main app with routing
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/duckhats.git

# Navigate to project
cd duckhats

# Install dependencies
npm install

# Start development server
npm start
```

### Build for Production

```bash
npm run build
```

## 🌐 Language Configuration

Languages are managed through Zustand with localStorage persistence:

```typescript
import { useLanguage } from './hooks/useLanguage'
import { useContent } from './hooks/useContent'

function Component() {
  const { language, setLanguage } = useLanguage()
  const content = useContent()
  
  return <h1>{content.nav.home}</h1>
}
```

### Adding New Languages

1. Add language code to `config/content.config.ts`
2. Translate all content keys
3. Update `Language` type
4. Add language toggle in Navbar

## 🎨 Customizing Brand

All branding is centralized in `config/brand.config.ts`:

```typescript
export const brandConfig = {
  name: 'DuckHats',
  colors: {
    primary: { black: '#1a1a1a', white: '#f5f5f5' },
    accent: { red: '#e63946' },
    // ...
  },
  typography: { /* ... */ },
  animation: { /* ... */ }
}
```

### Using Brand Config

```typescript
import { brandConfig } from '../config/brand.config'

// In JSX:
<div style={{ 
  backgroundColor: brandConfig.colors.primary.white,
  color: brandConfig.colors.primary.black 
}}>
  {brandConfig.name}
</div>
```

## 📝 Content Management

All text content lives in `config/content.config.ts`:

```typescript
export const contentConfig = {
  ca: {
    nav: { home: 'Inici', about: 'Qui Som', /* ... */ },
    hero: { tagline: 'Desenvolupant amb passió...', /* ... */ },
    // ...
  },
  es: { /* Spanish translations */ },
  en: { /* English translations */ }
}
```

## 🔧 Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Routing:** React Router v6
- **State:** Zustand (language management)
- **Build:** Create React App / Vite

## 📦 Key Dependencies

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.x",
  "framer-motion": "^10.x",
  "zustand": "^4.x",
  "lucide-react": "^0.x"
}
```

## 🎯 Component Patterns

### Consistent Styling
Always use brandConfig for colors:

```typescript
// ❌ Don't
<div className="bg-black text-white">

// ✅ Do
<div style={{ 
  backgroundColor: brandConfig.colors.primary.black,
  color: brandConfig.colors.primary.white 
}}>
```

### Animations
Use brandConfig durations and easing:

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ 
    duration: brandConfig.animation.duration.normal,
    ease: brandConfig.animation.easing.default
  }}
/>
```

### Content
Always use content hooks:

```typescript
const content = useContent()
return <h1>{content.hero.tagline}</h1>
```

## 🚧 Development Guidelines

1. **Never hardcode colors** - Use `brandConfig.colors`
2. **Never hardcode text** - Use `contentConfig` via `useContent()`
3. **Use named exports** - No default exports
4. **Mobile-first** - Design for mobile, enhance for desktop
5. **Semantic HTML** - Use proper tags (header, nav, section, etc.)
6. **Accessibility** - ARIA labels, keyboard navigation
7. **Consistent spacing** - Use brandConfig spacing values

## 📄 License

© 2024 DuckHats. All rights reserved.

## 🤝 Contributing

We're always looking for new ducks to join our pond! Designers, developers, and dreamers welcome.

Contact: hello@duckhats.cat

---

Built with ❤️ and code from the pond 🦆
