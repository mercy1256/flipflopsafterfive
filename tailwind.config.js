/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F8F4F0',
        accent: '#D4845C',
        'accent-dark': '#8B5A3C',
        'accent-light': '#E8C4B0',
        background: '#FAFAF8',
        text: '#1a1a1a',
        'text-muted': '#6B6B6B',
        'text-light': '#9A9A9A',
        'ocean': '#1e5a8e',
        'sand': '#E8D5B7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #D4845C 0%, #8B5A3C 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #1e5a8e 0%, #2E7BA6 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(212, 132, 92, 0.05) 0%, transparent 100%)',
      },
      boxShadow: {
        'elevated': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#1a1a1a',
            a: {
              color: '#D4845C',
              '&:hover': {
                color: '#8B5A3C',
              },
            },
            h1: { color: '#1a1a1a', fontFamily: 'Georgia, serif', fontWeight: '700' },
            h2: { color: '#1a1a1a', fontFamily: 'Georgia, serif' },
            h3: { color: '#1a1a1a', fontFamily: 'Georgia, serif' },
            strong: { color: '#1a1a1a' },
            code: { color: '#D4845C', backgroundColor: '#F8F4F0', padding: '0.25rem 0.5rem', borderRadius: '0.375rem' },
            blockquote: { color: '#6B6B6B', borderLeftColor: '#D4845C', fontStyle: 'italic' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 