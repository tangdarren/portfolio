/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep, calm slate/navy panel palette
        ink: {
          950: '#070b12',
          900: '#0b1220',
          850: '#0f172a',
          800: '#111a2c',
          700: '#172033',
          600: '#1f2a44',
          500: '#2a3654',
        },
        mist: {
          50: '#f4f6fb',
          100: '#e6ebf3',
          200: '#c8d2e2',
          300: '#94a3b8',
          400: '#64748b',
        },
        accent: {
          // Soft cyan / green highlights
          cyan: '#5eead4',
          green: '#86efac',
          blue: '#7dd3fc',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Space Grotesk',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      boxShadow: {
        panel:
          '0 1px 0 0 rgba(148, 163, 184, 0.06) inset, 0 20px 40px -20px rgba(2, 6, 23, 0.6)',
        glow: '0 0 0 1px rgba(94, 234, 212, 0.25), 0 8px 30px -12px rgba(94, 234, 212, 0.35)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(7,11,18,0) 0%, rgba(7,11,18,0.85) 70%, rgba(7,11,18,1) 100%)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '55%, 100%': { opacity: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        blink: 'blink 1.1s steps(1) infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
