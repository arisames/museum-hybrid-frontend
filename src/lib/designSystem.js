// Museum Collection Platform Design System
// Comprehensive design tokens and component specifications

export const designTokens = {
  // Color Palette
  colors: {
    // Primary Colors
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    
    // Secondary Colors
    secondary: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c', // Main secondary
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
    
    // Semantic Colors
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },
    
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    
    // Neutral Colors
    neutral: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },

  // Spacing
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
    40: '10rem',
    48: '12rem',
    56: '14rem',
    64: '16rem',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Breakpoints
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-Index
  zIndex: {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    auto: 'auto',
  },
};

// Component Specifications
export const componentSpecs = {
  // Button Component
  button: {
    base: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
    
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-600',
        destructive: 'bg-error-500 text-white hover:bg-error-600',
        outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-100',
        secondary: 'bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
        ghost: 'hover:bg-neutral-100 hover:text-neutral-900',
        link: 'underline-offset-4 hover:underline text-primary-500',
      },
      
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },

  // Input Component
  input: {
    base: 'flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    
    variants: {
      variant: {
        default: '',
        error: 'border-error-500 focus-visible:ring-error-500',
        success: 'border-success-500 focus-visible:ring-success-500',
      },
      
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-11',
      },
    },
  },

  // Card Component
  card: {
    base: 'rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm',
    header: 'flex flex-col space-y-1.5 p-6',
    title: 'text-2xl font-semibold leading-none tracking-tight',
    description: 'text-sm text-neutral-500',
    content: 'p-6 pt-0',
    footer: 'flex items-center p-6 pt-0',
  },

  // Badge Component
  badge: {
    base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    
    variants: {
      variant: {
        default: 'border-transparent bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'border-transparent bg-secondary-100 text-secondary-900 hover:bg-secondary-200',
        destructive: 'border-transparent bg-error-500 text-white hover:bg-error-600',
        outline: 'text-neutral-950',
        success: 'border-transparent bg-success-500 text-white hover:bg-success-600',
        warning: 'border-transparent bg-warning-500 text-white hover:bg-warning-600',
      },
    },
  },
};

// Accessibility Guidelines
export const accessibilityGuidelines = {
  // Color Contrast Requirements
  colorContrast: {
    normalText: '4.5:1', // WCAG AA
    largeText: '3:1',    // WCAG AA
    enhanced: '7:1',     // WCAG AAA
  },

  // Focus Management
  focus: {
    ringWidth: '2px',
    ringColor: 'primary-500',
    ringOffset: '2px',
    ringOpacity: '0.5',
  },

  // Interactive Element Sizes
  touchTargets: {
    minimum: '44px', // WCAG AA
    recommended: '48px',
  },

  // Typography Accessibility
  typography: {
    minimumFontSize: '16px',
    maximumLineLength: '80ch',
    minimumLineHeight: '1.5',
  },

  // ARIA Labels and Roles
  aria: {
    requiredLabels: ['button', 'input', 'select', 'textarea'],
    landmarkRoles: ['banner', 'main', 'navigation', 'contentinfo'],
    liveRegions: ['polite', 'assertive'],
  },
};

// Performance Guidelines
export const performanceGuidelines = {
  // Bundle Size Targets
  bundleSize: {
    initial: '250kb', // Gzipped
    chunks: '100kb',  // Individual chunks
    images: '500kb',  // Maximum image size
  },

  // Performance Metrics Targets
  metrics: {
    fcp: '1.8s',      // First Contentful Paint
    lcp: '2.5s',      // Largest Contentful Paint
    fid: '100ms',     // First Input Delay
    cls: '0.1',       // Cumulative Layout Shift
    tti: '3.8s',      // Time to Interactive
  },

  // Code Splitting Strategy
  codeSplitting: {
    routes: true,
    vendors: true,
    components: 'lazy',
    utilities: 'shared',
  },
};

// Export default design system configuration
export default {
  designTokens,
  componentSpecs,
  accessibilityGuidelines,
  performanceGuidelines,
};

