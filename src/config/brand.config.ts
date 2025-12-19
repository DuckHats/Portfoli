export const brandConfig = {
  name: 'DuckHats',
  tagline: "Desenvolupant amb passió i un toc d'humor",
  email: 'hello@duckhats.cat',
  social: '@duckhats',
  established: '2020',
  logo: {
    url: "/logo_(2).png",
    alt: 'Duckhats Logo'
  },
  colors: {
    primary: {
      black: '#1a1a1a',
      white: '#f5f5f5'
    },
    accent: {
      red: '#e63946'
    },
    neutral: {
      gray50: '#f9fafb',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      gray500: '#6b7280',
      gray600: '#4b5563',
      gray700: '#374151',
      gray800: '#1f2937',
      gray900: '#111827'
    }
  },
  typography: {
    fontFamily: {
      display: 'Space Grotesk, sans-serif',
      body: 'Inter, sans-serif',
      mono: 'monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    }
  },
  spacing: {
    section: {
      py: 'py-24',
      px: 'px-4 md:px-8'
    },
    container: {
      maxWidth: 'max-w-7xl',
      maxWidthNarrow: 'max-w-4xl'
    }
  },
  animation: {
    duration: {
      fast: 0.3,
      normal: 0.5,
      slow: 0.8
    },
    easing: {
      default: 'easeInOut',
      smooth: 'easeOut',
      spring: 'circOut'
    }
  }
};
export type BrandConfig = typeof brandConfig;