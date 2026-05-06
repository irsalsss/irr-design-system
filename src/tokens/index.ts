export const colors = {
  teal: {
    50: '#ecfdf6', 100: '#d1fae8', 200: '#a7f3d2', 300: '#6ee7b8',
    400: '#34d39a', 500: '#14b87f', 600: '#0f6e56', 700: '#0c5945',
    800: '#0a4838', 900: '#083a2e', 950: '#042419',
  },
  stone: {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
    400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c',
    800: '#292524', 900: '#1c1917', 950: '#0c0a09',
  },
  amber: {
    50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d',
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
    800: '#92400e', 900: '#78350f', 950: '#451a03',
  },
  semantic: {
    success: '#15803d',
    warning: '#b45309',
    danger:  '#b91c1c',
    info:    '#0369a1',
  },
} as const

export const spacing = {
  1: '4px',  2: '8px',  3: '12px', 4: '16px',
  5: '20px', 6: '24px', 8: '32px', 10: '40px',
  12: '48px', 16: '64px', 20: '80px', 24: '96px',
} as const

export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  full: '9999px',
} as const

export const fontSize = {
  'display-2xl': '4.5rem',
  'display-xl':  '3.75rem',
  'display-lg':  '3rem',
  'display-md':  '2.25rem',
  'display-sm':  '1.875rem',
  xl: '1.25rem',
  lg: '1.125rem',
  md: '1rem',
  sm: '0.875rem',
  xs: '0.75rem',
} as const

export const duration = {
  fast: '120ms',
  base: '180ms',
  slow: '280ms',
} as const

export const easing = {
  out:   'cubic-bezier(0.16, 1, 0.3, 1)',
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const
